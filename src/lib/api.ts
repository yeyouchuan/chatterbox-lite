import type { BilibiliGetEmoticonsResponse } from '../types'

import { BASE_URL } from './const'
import { isEmoticonUnique } from './emoticon'
import { buildReplacementMap } from './replacement'
import { cachedEmoticonPackages, cachedRoomId, cachedStreamerUid } from './store'
import { extractRoomNumber } from './utils'
import { cachedWbiKeys, encodeWbi } from './wbi'

function getCookie(name: string): string | undefined {
  const prefix = `${name}=`
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith(prefix))
    ?.slice(prefix.length)
}

export function getSpmPrefix(): string {
  const metaTag = document.querySelector('meta[name="spm_prefix"]')
  return metaTag?.getAttribute('content') ?? '444.8'
}

export function getCsrfToken(): string | undefined {
  return getCookie('bili_jct')
}

export async function getRoomId(url = window.location.href): Promise<number> {
  const shortUid = extractRoomNumber(url)
  if (!shortUid) throw new Error('无法从当前 URL 解析直播间号')

  const room = await fetch(`${BASE_URL.BILIBILI_ROOM_INIT}?id=${shortUid}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!room.ok) {
    throw new Error(`HTTP ${room.status}: ${room.statusText}`)
  }

  const roomData: { data: { room_id: number; uid: number } } = await room.json()
  cachedStreamerUid.value = roomData.data.uid
  return roomData.data.room_id
}

export async function ensureRoomId(): Promise<number> {
  let roomId = cachedRoomId.value
  if (roomId === null) {
    roomId = await getRoomId()
    cachedRoomId.value = roomId
    buildReplacementMap()
  }
  return roomId
}

export async function fetchEmoticons(roomId: number): Promise<void> {
  const resp = await fetch(`${BASE_URL.BILIBILI_GET_EMOTICONS}?platform=pc&room_id=${roomId}`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`)
  const json: BilibiliGetEmoticonsResponse = await resp.json()
  if (json?.code === 0 && json.data?.data) {
    cachedEmoticonPackages.value = json.data.data.filter(pkg => pkg.pkg_id !== 100)
  }
}

export interface SendDanmakuResult {
  success: boolean
  message: string
  isEmoticon: boolean
  error?: string
  cancelled?: boolean
}

export async function sendDanmaku(message: string, roomId: number, csrfToken: string): Promise<SendDanmakuResult> {
  const emoticon = isEmoticonUnique(message)

  const form = new FormData()
  form.append('bubble', '2')
  form.append('msg', message)
  form.append('color', '16777215')
  form.append('mode', '1')
  form.append('room_type', '0')
  form.append('jumpfrom', '0')
  form.append('reply_mid', '0')
  form.append('reply_attr', '0')
  form.append('replay_dmid', '')
  form.append('statistics', '{"appId":100,"platform":5}')
  form.append('fontsize', '25')
  form.append('rnd', String(Math.floor(Date.now() / 1000)))
  form.append('roomid', String(roomId))
  form.append('csrf', csrfToken)
  form.append('csrf_token', csrfToken)

  if (emoticon) {
    form.append('dm_type', '1')
    form.append('emoticon_options', '{}')
  }

  try {
    let query = ''
    if (cachedWbiKeys) {
      query = encodeWbi({ web_location: getSpmPrefix() }, cachedWbiKeys)
    }

    const resp = await fetch(`${BASE_URL.BILIBILI_MSG_SEND}?${query}`, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })

    const json: { message?: string } = await resp.json()
    if (json.message) {
      return { success: false, message, isEmoticon: emoticon, error: json.message }
    }

    return { success: true, message, isEmoticon: emoticon }
  } catch (err) {
    return {
      success: false,
      message,
      isEmoticon: emoticon,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}
