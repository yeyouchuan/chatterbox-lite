import { signal } from '@preact/signals'

import type { SendDanmakuResult } from '../types'

import { formatDanmakuError } from './utils'

export const MAX_LOG_LINES = 300
export const logLines = signal<string[]>([])

export function appendLog(message: string): void
export function appendLog(result: SendDanmakuResult, label: string, display: string): void
export function appendLog(arg: string | SendDanmakuResult, label?: string, display?: string): void {
  const message =
    typeof arg === 'string'
      ? arg
      : arg.cancelled
        ? `⏭ ${label}: ${display}（已跳过）`
        : arg.success
          ? `✅ ${label}: ${display}`
          : `❌ ${label}: ${display}，原因：${formatDanmakuError(arg.error)}`

  const lines = logLines.value
  logLines.value =
    lines.length >= MAX_LOG_LINES ? [...lines.slice(lines.length - MAX_LOG_LINES + 1), message] : [...lines, message]
}
