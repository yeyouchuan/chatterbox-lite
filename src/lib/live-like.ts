import type { ResponseMeta } from './send-danmaku-response'

export const LIVE_LIKE_COUNT = 30
export const LIVE_LIKE_ENDPOINT = 'https://api.live.bilibili.com/xlive/app-ucenter/v1/like_info_v3/like/likeReportV3'

export interface BuildLiveLikeBodyOptions {
  roomId: number
  anchorId: number
  userId: string
  csrfToken: string
  count?: number
}

export interface BilibiliLiveLikeResponse {
  code?: number
  message?: string
  msg?: string
}

export interface LiveLikeResult {
  success: boolean
  count: number
  error?: string
}

function getResponseMessage(body: BilibiliLiveLikeResponse): string {
  return body.message?.trim() || body.msg?.trim() || 'unknown API error'
}

export function buildLiveLikeBody({
  roomId,
  anchorId,
  userId,
  csrfToken,
  count = LIVE_LIKE_COUNT,
}: BuildLiveLikeBodyOptions): URLSearchParams {
  return new URLSearchParams({
    click_time: String(count),
    room_id: String(roomId),
    anchor_id: String(anchorId),
    uid: userId,
    csrf: csrfToken,
    csrf_token: csrfToken,
    visit_id: '',
  })
}

export function buildLiveLikeResult(
  response: ResponseMeta,
  body: BilibiliLiveLikeResponse,
  count: number
): LiveLikeResult {
  if (!response.ok) {
    return {
      success: false,
      count,
      error: `HTTP ${response.status}: ${response.statusText || 'request failed'}`,
    }
  }

  if (body.code !== 0) {
    const detail = body.code === undefined ? 'missing code' : `code=${body.code}`
    return {
      success: false,
      count,
      error: `${detail}: ${getResponseMessage(body)}`,
    }
  }

  return { success: true, count }
}
