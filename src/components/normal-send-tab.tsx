import { CircleNotchIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'
import { useRef } from 'preact/hooks'

import { ensureRoomId, getCsrfToken } from '../lib/api'
import { buildBlockedRetryMessages, isBlockedDanmakuError } from '../lib/blocked-retry'
import {
  formatLockedEmoticonReject,
  formatUnavailableEmoticonReject,
  isEmoticonUnique,
  isLockedEmoticon,
  isUnavailableEmoticon,
} from '../lib/emoticon'
import { focusTextareaAfterSend } from '../lib/focus-after-send'
import { appendLog } from '../lib/log'
import { applyReplacements } from '../lib/replacement'
import { addSendHistoryEntry, navigateSendHistory, type SendHistoryState } from '../lib/send-history'
import { enqueueDanmaku, SendPriority } from '../lib/send-queue'
import { blockedRetryEnabled, fasongText, maxLength, msgSendInterval, sendHistory } from '../lib/store'
import { processMessages } from '../lib/utils'
import { EmoteSelector } from './emote-selector'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export function NormalSendTab({ inputOnly = false }: { inputOnly?: boolean }) {
  const sending = useSignal(false)
  const historyState = useSignal<SendHistoryState>({ index: -1, draft: '' })
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const sendMessage = async () => {
    if (sending.value) return

    const originalMessage = fasongText.value.trim()
    if (!originalMessage) {
      appendLog('⚠️ 消息内容不能为空')
      return
    }

    if (isLockedEmoticon(originalMessage)) {
      appendLog(formatLockedEmoticonReject(originalMessage, '手动表情'))
      fasongText.value = ''
      focusTextareaAfterSend(textareaRef.current)
      return
    }

    if (isUnavailableEmoticon(originalMessage)) {
      appendLog(formatUnavailableEmoticonReject(originalMessage, '手动表情'))
      fasongText.value = ''
      focusTextareaAfterSend(textareaRef.current)
      return
    }

    const isEmote = isEmoticonUnique(originalMessage)
    const processedMessage = isEmote ? originalMessage : applyReplacements(originalMessage)
    sending.value = true

    try {
      const roomId = await ensureRoomId()
      const csrfToken = getCsrfToken()
      if (!csrfToken) {
        appendLog('❌ 未找到登录信息，请先登录 Bilibili')
        return
      }

      const segments = isEmote ? [processedMessage] : processMessages(processedMessage, maxLength.value)
      const total = segments.length
      let allSegmentsSent = true

      for (let i = 0; i < total; i++) {
        const segment = segments[i]
        const result = await enqueueDanmaku(segment, roomId, csrfToken, SendPriority.MANUAL)
        let segmentSent = result.success
        const baseLabel = result.isEmoticon ? '手动表情' : '手动'
        const label = total > 1 ? `${baseLabel} [${i + 1}/${total}]` : baseLabel
        const displayMsg =
          !isEmote && originalMessage !== processedMessage && total === 1 ? `${originalMessage} → ${segment}` : segment

        appendLog(result, label, displayMsg)

        if (!result.success && !result.isEmoticon && blockedRetryEnabled.value && isBlockedDanmakuError(result.error)) {
          const retryMessages = buildBlockedRetryMessages(segment, 3)
          for (let retryIndex = 0; retryIndex < retryMessages.length; retryIndex++) {
            const retryMessage = retryMessages[retryIndex]
            appendLog(`↻ ${label} 屏蔽词重试 ${retryIndex + 1}/${retryMessages.length}`)
            const retryResult = await enqueueDanmaku(retryMessage, roomId, csrfToken, SendPriority.MANUAL)
            appendLog(retryResult, `${label} 重试 ${retryIndex + 1}`, retryMessage)
            if (retryResult.success) {
              segmentSent = true
              break
            }
            if (!isBlockedDanmakuError(retryResult.error)) break
          }
        }

        if (!segmentSent) allSegmentsSent = false

        if (i < total - 1) {
          await new Promise(r => setTimeout(r, msgSendInterval.value * 1000))
        }
      }

      if (allSegmentsSent) {
        fasongText.value = ''
        historyState.value = { index: -1, draft: '' }
        sendHistory.value = addSendHistoryEntry(sendHistory.value, originalMessage)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      appendLog(`🔴 发送出错：${msg}`)
    } finally {
      sending.value = false
      focusTextareaAfterSend(textareaRef.current)
    }
  }

  const handleInput = (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => {
    fasongText.value = e.currentTarget.value
    historyState.value = { index: -1, draft: '' }
  }

  const handleKeyDown = (e: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) => {
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.isComposing && sendHistory.value.length > 0) {
      e.preventDefault()
      const next = navigateSendHistory(
        sendHistory.value,
        fasongText.value,
        historyState.value,
        e.key === 'ArrowUp' ? 'older' : 'newer'
      )
      fasongText.value = next.text
      historyState.value = next.state
      return
    }

    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault()
      void sendMessage()
    }
  }

  if (inputOnly) {
    return (
      <div class='relative'>
        <Textarea
          ref={textareaRef}
          value={fasongText.value}
          disabled={sending.value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder='输入弹幕内容'
          className='h-12 resize-none pr-10'
        />
        <div class='pointer-events-none absolute right-2 bottom-1.5 text-[11px] text-[var(--Ga7,#5f6670)] tabular-nums'>
          {fasongText.value.length}
        </div>
      </div>
    )
  }

  return (
    <div class='space-y-2'>
      <div class='relative'>
        <Textarea
          ref={textareaRef}
          value={fasongText.value}
          disabled={sending.value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder='输入弹幕内容'
          className='h-12 resize-none pr-10'
        />
        <div class='pointer-events-none absolute right-2 bottom-1.5 text-[11px] text-[var(--Ga7,#5f6670)] tabular-nums'>
          {fasongText.value.length}
        </div>
      </div>
      <div class='flex items-center justify-between gap-2'>
        <div class='flex min-w-0 items-center gap-1'>
          <EmoteSelector />
          <span class='truncate text-[11px] text-[var(--Ga7,#5f6670)]'>词库会在发送前替换</span>
        </div>
        <Button size='sm' disabled={sending.value || !fasongText.value.trim()} onClick={() => void sendMessage()}>
          {sending.value ? (
            <>
              <CircleNotchIcon className='animate-spin' aria-hidden='true' />
              发送中…
            </>
          ) : (
            <>
              <PaperPlaneTiltIcon weight='bold' aria-hidden='true' />
              发送
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
