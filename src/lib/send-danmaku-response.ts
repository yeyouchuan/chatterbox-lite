import type { BilibiliSendDanmakuResponse, SendDanmakuResult } from '../types'

export type { BilibiliSendDanmakuResponse }

export const SEND_DANMAKU_TIMEOUT_MS = 10000

export interface ResponseMeta {
  ok: boolean
  status: number
  statusText: string
}

export type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Response>

function getResponseMessage(body: BilibiliSendDanmakuResponse): string {
  return body.message?.trim() || body.msg?.trim() || 'unknown API error'
}

export function buildSendDanmakuResult(
  response: ResponseMeta,
  body: BilibiliSendDanmakuResponse,
  message: string,
  isEmoticon: boolean
): SendDanmakuResult {
  if (!response.ok) {
    return {
      success: false,
      message,
      isEmoticon,
      error: `HTTP ${response.status}: ${response.statusText || 'request failed'}`,
    }
  }

  if (body.code !== 0) {
    const detail = body.code === undefined ? 'missing code' : `code=${body.code}`
    return {
      success: false,
      message,
      isEmoticon,
      error: `${detail}: ${getResponseMessage(body)}`,
    }
  }

  return { success: true, message, isEmoticon }
}

export async function fetchWithTimeout(
  fetcher: FetchLike,
  input: string | URL,
  init: RequestInit = {},
  timeoutMs = SEND_DANMAKU_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    return await fetcher(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}
