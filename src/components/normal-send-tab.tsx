import { CircleNotchIcon, HeartIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'
import { useRef } from 'preact/hooks'

import { tryAiEvasion } from '../lib/ai-evasion'
import { ensureRoomId, getCsrfToken, getCurrentUserId, sendLiveLike } from '../lib/api'
import { buildBlockedRetryMessages, buildReplacementRetryMessage, isBlockedDanmakuError } from '../lib/blocked-retry'
import {
  formatLockedEmoticonReject,
  formatUnavailableEmoticonReject,
  isEmoticonUnique,
  isLockedEmoticon,
  isUnavailableEmoticon,
} from '../lib/emoticon'
import { focusTextareaAfterSend } from '../lib/focus-after-send'
import { appendLog } from '../lib/log'
import { applyReplacements, ensureRemoteKeywordsSynced, getReplacementEntries } from '../lib/replacement'
import { addSendHistoryEntry, navigateSendHistory, type SendHistoryState } from '../lib/send-history'
import { enqueueDanmaku, SendPriority } from '../lib/send-queue'
import {
  blockedRetryEnabled,
  cachedStreamerUid,
  fasongText,
  maxLength,
  msgSendInterval,
  sendHistory,
} from '../lib/store'
import { processMessages } from '../lib/utils'
import { EmoteSelector } from './emote-selector'
import { SettingsPopoverButton } from './settings-popover-button'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export function NormalSendTab({ inputOnly = false }: { inputOnly?: boolean }) {
  const sending = useSignal(false)
  const liking = useSignal(false)
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

    sending.value = true

    try {
      const roomId = await ensureRoomId()
      const isEmote = isEmoticonUnique(originalMessage)
      if (!isEmote) {
        try {
          await ensureRemoteKeywordsSynced()
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          appendLog(`⚠️ 云端词库同步失败，将使用已有词库：${msg}`)
        }
      }

      const processedMessage = isEmote ? originalMessage : applyReplacements(originalMessage)
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
          let retryStillBlocked = true
          const aiResult = await tryAiEvasion(
            segment,
            roomId,
            csrfToken,
            label,
            (message, retryRoomId, retryCsrfToken) =>
              enqueueDanmaku(message, retryRoomId, retryCsrfToken, SendPriority.MANUAL)
          )

          if (aiResult.success) {
            segmentSent = true
          } else if (aiResult.error && !isBlockedDanmakuError(aiResult.error)) {
            retryStillBlocked = false
          }

          if (!segmentSent && retryStillBlocked) {
            try {
              await ensureRemoteKeywordsSynced(true)
            } catch (err) {
              const msg = err instanceof Error ? err.message : String(err)
              appendLog(`⚠️ ${label} 重试前同步云端词库失败：${msg}`)
            }

            const replacementRetry = buildReplacementRetryMessage(segment, getReplacementEntries())
            if (replacementRetry) {
              appendLog(`↻ ${label} 词库重试：${replacementRetry.matched.join(', ')}`)
              const retryResult = await enqueueDanmaku(replacementRetry.message, roomId, csrfToken, SendPriority.MANUAL)
              appendLog(retryResult, `${label} 词库重试`, replacementRetry.message)
              if (retryResult.success) {
                segmentSent = true
              } else {
                retryStillBlocked = isBlockedDanmakuError(retryResult.error)
              }
            }
          }

          if (!segmentSent && retryStillBlocked) {
            const retryMessages = buildBlockedRetryMessages(segment, 3)
            for (let retryIndex = 0; retryIndex < retryMessages.length; retryIndex++) {
              const retryMessage = retryMessages[retryIndex]
              appendLog(`↻ ${label} 软字符重试 ${retryIndex + 1}/${retryMessages.length}`)
              const retryResult = await enqueueDanmaku(retryMessage, roomId, csrfToken, SendPriority.MANUAL)
              appendLog(retryResult, `${label} 软字符重试 ${retryIndex + 1}`, retryMessage)
              if (retryResult.success) {
                segmentSent = true
                break
              }
              if (!isBlockedDanmakuError(retryResult.error)) break
            }
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

  const sendLike = async () => {
    if (liking.value) return

    liking.value = true
    try {
      const roomId = await ensureRoomId()
      const anchorId = cachedStreamerUid.value
      const csrfToken = getCsrfToken()
      const userId = getCurrentUserId()

      if (!csrfToken || !userId) {
        appendLog('❌ 未找到登录信息，请先登录 Bilibili')
        return
      }

      if (anchorId === null) {
        appendLog('❌ 未识别到主播 UID，无法点赞')
        return
      }

      const result = await sendLiveLike(roomId, anchorId, userId, csrfToken)
      if (result.success) {
        appendLog(`👍 点赞x${result.count} 已发送`)
      } else {
        appendLog(`❌ 点赞失败：${result.error ?? 'unknown error'}`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      appendLog(`🔴 点赞出错：${msg}`)
    } finally {
      liking.value = false
    }
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
          className='h-20 resize-none pr-10'
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
          className='h-20 resize-none pr-10'
        />
        <div class='pointer-events-none absolute right-2 bottom-1.5 text-[11px] text-[var(--Ga7,#5f6670)] tabular-nums'>
          {fasongText.value.length}
        </div>
      </div>
      <div class='flex items-center justify-between gap-2'>
        <div class='flex min-w-0 items-center gap-1'>
          <EmoteSelector />
        </div>
        <div class='flex shrink-0 items-center gap-1'>
          <SettingsPopoverButton />
          <Button
            size='sm'
            variant='outline'
            disabled={liking.value}
            aria-label='点赞 30 次'
            title='点赞 30 次'
            onClick={() => void sendLike()}
          >
            {liking.value ? (
              <CircleNotchIcon className='animate-spin' aria-hidden='true' />
            ) : (
              <HeartIcon weight='fill' aria-hidden='true' />
            )}
            x30
          </Button>
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
    </div>
  )
}
