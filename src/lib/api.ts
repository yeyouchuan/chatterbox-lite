import type { BilibiliGetEmoticonsResponse, BilibiliSendDanmakuResponse, SendDanmakuResult } from '../types'

import { BASE_URL } from './const'
import { isEmoticonUnique } from './emoticon'
import { buildReplacementMap } from './replacement'
import { getRoomCacheKey, shouldRefreshRoomCache } from './room-cache'
import { buildSendDanmakuResult, fetchWithTimeout, SEND_DANMAKU_TIMEOUT_MS } from './send-danmaku-response'
import { cachedEmoticonPackages, cachedRoomId, cachedStreamerUid, replacementMap } from './store'
import { extractRoomNumber } from './utils'
import { cachedWbiKeys, encodeWbi, waitForWbiKeys } from './wbi'

let cachedRoomKey: string | null = null

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

function resetRoomScopedCache(): void {
  cachedRoomId.value = null
  cachedStreamerUid.value = null
  cachedEmoticonPackages.value = []
  replacementMap.value = null
}

export async function ensureRoomId(url = window.location.href): Promise<number> {
  const currentRoomKey = getRoomCacheKey(url)
  if (shouldRefreshRoomCache(cachedRoomKey, currentRoomKey)) {
    resetRoomScopedCache()
  }

  let roomId = cachedRoomId.value
  if (roomId === null) {
    roomId = await getRoomId(url)
    cachedRoomId.value = roomId
    cachedRoomKey = currentRoomKey
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
    if (!cachedWbiKeys) {
      await waitForWbiKeys(800, 100)
    }

    let query = ''
    if (cachedWbiKeys) {
      query = encodeWbi({ web_location: getSpmPrefix() }, cachedWbiKeys)
    }
    const querySuffix = query ? `?${query}` : ''

    const resp = await fetchWithTimeout(
      fetch,
      `${BASE_URL.BILIBILI_MSG_SEND}${querySuffix}`,
      {
        method: 'POST',
        credentials: 'include',
        body: form,
      },
      SEND_DANMAKU_TIMEOUT_MS
    )

    let json: BilibiliSendDanmakuResponse
    try {
      json = await resp.json()
    } catch (err) {
      return {
        success: false,
        message,
        isEmoticon: emoticon,
        error: err instanceof Error ? `Invalid JSON response: ${err.message}` : 'Invalid JSON response',
      }
    }

    return buildSendDanmakuResult(
      { ok: resp.ok, status: resp.status, statusText: resp.statusText },
      json,
      message,
      emoticon
    )
  } catch (err) {
    return {
      success: false,
      message,
      isEmoticon: emoticon,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}
