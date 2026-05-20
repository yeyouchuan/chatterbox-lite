import type { BilibiliEmoticonPackage, SendDanmakuResult } from '../types'
import type { BridgeLiveLikeResult, BridgeRoomState } from './bridge-protocol'
import type { ChatterboxRuntime } from './runtime'

import { ensureRoomId, fetchEmoticons as fetchRoomEmoticons, getCsrfToken, getCurrentUserId, sendLiveLike } from './api'
import { enqueueDanmaku, SendPriority } from './send-queue'
import { getSettingsSnapshot } from './settings-snapshot'
import { cachedEmoticonPackages, cachedStreamerUid } from './store'

export async function getUserscriptRoomState(): Promise<BridgeRoomState> {
  const roomId = await ensureRoomId()
  return {
    roomId,
    streamerUid: cachedStreamerUid.value,
    roomUrl: window.location.href,
    title: document.title,
    connectedAt: Date.now(),
  }
}

export const userscriptRuntime: ChatterboxRuntime = {
  mode: 'userscript',

  ensureRoomState: getUserscriptRoomState,

  async sendDanmaku(message: string): Promise<SendDanmakuResult> {
    const roomId = await ensureRoomId()
    const csrfToken = getCsrfToken()
    if (!csrfToken) {
      return {
        success: false,
        message,
        isEmoticon: false,
        error: '未找到登录信息，请先登录 Bilibili',
      }
    }
    return await enqueueDanmaku(message, roomId, csrfToken, SendPriority.MANUAL)
  },

  async sendLiveLike(): Promise<BridgeLiveLikeResult> {
    const roomId = await ensureRoomId()
    const anchorId = cachedStreamerUid.value
    const csrfToken = getCsrfToken()
    const userId = getCurrentUserId()

    if (!csrfToken || !userId) {
      return { success: false, count: 30, error: '未找到登录信息，请先登录 Bilibili' }
    }

    if (anchorId === null) {
      return { success: false, count: 30, error: '未识别到主播 UID，无法点赞' }
    }

    return await sendLiveLike(roomId, anchorId, userId, csrfToken)
  },

  async fetchEmoticons(): Promise<BilibiliEmoticonPackage[]> {
    const roomId = await ensureRoomId()
    await fetchRoomEmoticons(roomId)
    return cachedEmoticonPackages.value
  },

  getSettingsSnapshot,
}
