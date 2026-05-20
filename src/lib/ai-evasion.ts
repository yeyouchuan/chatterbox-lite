import type { SendDanmakuResult } from '../types'

import { appendLog } from './log'
import { getGraphemes } from './utils'

export const LAPLACE_CHAT_AUDIT_URL = 'https://edge-workers.laplace.cn/laplace/chat-audit'

export interface DetectionResult {
  hasSensitiveContent: boolean
  sensitiveWords?: string[]
}

interface ChatAuditResponse {
  completion?: Partial<DetectionResult>
}

type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Response>

function sanitizeDetectionResult(input: string, value: Partial<DetectionResult> | undefined): DetectionResult {
  const rawWords = Array.isArray(value?.sensitiveWords) ? value.sensitiveWords : []
  const sensitiveWords = Array.from(
    new Set(
      rawWords.filter((word): word is string => typeof word === 'string' && word.length > 0 && input.includes(word))
    )
  )

  return {
    hasSensitiveContent: Boolean(value?.hasSensitiveContent) && sensitiveWords.length > 0,
    sensitiveWords,
  }
}

export async function detectSensitiveWords(text: string, fetcher: FetchLike = fetch): Promise<DetectionResult> {
  try {
    const response = await fetcher(LAPLACE_CHAT_AUDIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completionMetadata: { input: text },
      }),
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText || 'chat-audit request failed'}`)

    const body = (await response.json()) as ChatAuditResponse
    return sanitizeDetectionResult(text, body.completion)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    appendLog(`⚠️ AI检测服务出错：${msg}`)
    return { hasSensitiveContent: false, sensitiveWords: [] }
  }
}

function insertInvisibleChars(word: string): string {
  return getGraphemes(word).join('­')
}

export function replaceSensitiveWords(text: string, sensitiveWords: string[]): string {
  let result = text
  for (const word of sensitiveWords) {
    result = result.split(word).join(insertInvisibleChars(word))
  }
  return result
}

export interface TryAiEvasionResult {
  success: boolean
  evadedMessage?: string
  error?: string
}

export async function tryAiEvasion(
  message: string,
  logPrefix: string,
  sendRetry: (message: string) => Promise<SendDanmakuResult>
): Promise<TryAiEvasionResult> {
  const prefix = logPrefix ? `${logPrefix} ` : ''
  appendLog(`🤖 ${prefix}AI规避：正在检测敏感词…`)

  const detection = await detectSensitiveWords(message)
  const sensitiveWords = detection.sensitiveWords ?? []
  if (!detection.hasSensitiveContent || sensitiveWords.length === 0) {
    appendLog(`⚠️ ${prefix}无法检测到敏感词，请手动检查`)
    return { success: false }
  }

  appendLog(`🤖 ${prefix}检测到敏感词：${sensitiveWords.join(', ')}，正在尝试规避…`)

  const evadedMessage = replaceSensitiveWords(message, sensitiveWords)
  const retryResult = await sendRetry(evadedMessage)
  if (retryResult.success) {
    appendLog(`✅ ${prefix}AI规避成功: ${evadedMessage}`)
    return { success: true, evadedMessage }
  }

  appendLog(`❌ ${prefix}AI规避失败: ${evadedMessage}，原因：${retryResult.error}`)
  return { success: false, evadedMessage, error: retryResult.error }
}
