import { signal } from '@preact/signals'

import type { SendDanmakuResult } from '../types'

import { sendDanmaku } from './api'

export const SendPriority = {
  MANUAL: 0,
} as const

export type SendPriority = (typeof SendPriority)[keyof typeof SendPriority]

interface QueueItem {
  message: string
  roomId: number
  csrfToken: string
  resolve: (result: SendDanmakuResult) => void
  reject: (err: unknown) => void
}

export interface SendQueueStatus {
  depth: number
  processing: boolean
  waitingUntil: number | null
}

const HARD_MIN_GAP_MS = 1010

const queue: QueueItem[] = []
let processing = false
let lastSendCompletedAt = 0
export const sendQueueStatus = signal<SendQueueStatus>({ depth: 0, processing: false, waitingUntil: null })

function publishQueueStatus(waitingUntil = sendQueueStatus.peek().waitingUntil): void {
  sendQueueStatus.value = {
    depth: queue.length,
    processing,
    waitingUntil,
  }
}

async function processQueue(): Promise<void> {
  if (processing) return
  processing = true
  publishQueueStatus(null)
  try {
    while (queue.length > 0) {
      const item = queue.shift()
      if (!item) break
      publishQueueStatus(null)

      if (lastSendCompletedAt > 0) {
        const sinceLast = Date.now() - lastSendCompletedAt
        if (sinceLast < HARD_MIN_GAP_MS) {
          const waitMs = HARD_MIN_GAP_MS - sinceLast
          publishQueueStatus(Date.now() + waitMs)
          await new Promise(r => setTimeout(r, waitMs))
          publishQueueStatus(null)
        }
      }

      try {
        const result = await sendDanmaku(item.message, item.roomId, item.csrfToken)
        lastSendCompletedAt = Date.now()
        item.resolve(result)
      } catch (err) {
        lastSendCompletedAt = Date.now()
        item.reject(err)
      }
    }
  } finally {
    processing = false
    publishQueueStatus(null)
  }
}

export function enqueueDanmaku(
  message: string,
  roomId: number,
  csrfToken: string,
  _priority: SendPriority = SendPriority.MANUAL
): Promise<SendDanmakuResult> {
  return new Promise((resolve, reject) => {
    queue.push({ message, roomId, csrfToken, resolve, reject })
    publishQueueStatus()
    void processQueue()
  })
}

export function getQueueDepth(): number {
  return queue.length
}
