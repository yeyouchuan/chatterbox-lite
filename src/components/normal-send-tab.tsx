import { CircleNotchIcon, HeartIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'
import { useRef } from 'preact/hooks'

import { tryAiEvasion } from '../lib/ai-evasion'
import { buildBlockedRetryMessages, buildReplacementRetryMessage, isBlockedDanmakuError } from '../lib/blocked-retry'
import { desktopBridgeState } from '../lib/desktop-runtime'
import {
  formatLockedEmoticonReject,
  formatUnavailableEmoticonReject,
  isEmoticonUnique,
  isLockedEmoticon,
  isUnavailableEmoticon,
} from '../lib/emoticon'
import { focusTextareaAfterSend } from '../lib/focus-after-send'
import { appendLog } from '../lib/log'
import {
  applyReplacements,
  ensureRemoteKeywordsSynced,
  getReplacementEntries,
  warmRemoteKeywordsInBackground,
} from '../lib/replacement'
import { getRuntimeAdapter } from '../lib/runtime'
import { addSendHistoryEntry, navigateSendHistory, type SendHistoryState } from '../lib/send-history'
import { blockedRetryEnabled, fasongText, maxLength, msgSendInterval, sendHistory } from '../lib/store'
import { formatDanmakuError, processMessages } from '../lib/utils'
import { EmoteSelector } from './emote-selector'
import { SettingsPopoverButton } from './settings-popover-button'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

function BridgeIndicator() {
  const connected = desktopBridgeState.value.connected
  return (
    <span
      role='status'
      aria-label={connected ? '已连接直播页' : '未连接直播页'}
      title={connected ? '已连接直播页' : '未连接直播页'}
      class='flex h-[18px] w-3 items-center justify-center self-center'
    >
      <span class={connected ? 'size-2.5 rounded-full bg-brand' : 'size-2.5 rounded-full bg-danger'} />
    </span>
  )
}

export function NormalSendTab({ inputOnly = false, desktop = false }: { inputOnly?: boolean; desktop?: boolean }) {
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
      const runtime = getRuntimeAdapter()

      const isEmote = isEmoticonUnique(originalMessage)
      if (!isEmote) {
        warmRemoteKeywordsInBackground()
      }

      const processedMessage = isEmote ? originalMessage : applyReplacements(originalMessage)
      const segments = isEmote ? [processedMessage] : processMessages(processedMessage, maxLength.value)
      const total = segments.length
      let allSegmentsSent = true

      for (let i = 0; i < total; i++) {
        const segment = segments[i]
        const result = await runtime.sendDanmaku(segment)
        let segmentSent = result.success
        const baseLabel = result.isEmoticon ? '手动表情' : '手动'
        const label = total > 1 ? `${baseLabel} [${i + 1}/${total}]` : baseLabel
        const displayMsg =
          !isEmote && originalMessage !== processedMessage && total === 1 ? `${originalMessage} -> ${segment}` : segment

        appendLog(result, label, displayMsg)

        if (!result.success && !result.isEmoticon && blockedRetryEnabled.value && isBlockedDanmakuError(result.error)) {
          let retryStillBlocked = true
          const aiResult = await tryAiEvasion(segment, label, message => runtime.sendDanmaku(message))

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
              appendLog(`-> ${label} 词库重试：${replacementRetry.matched.join(', ')}`)
              const retryResult = await runtime.sendDanmaku(replacementRetry.message)
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
              appendLog(`-> ${label} 软字符重试 ${retryIndex + 1}/${retryMessages.length}`)
              const retryResult = await runtime.sendDanmaku(retryMessage)
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
      const result = await getRuntimeAdapter().sendLiveLike()
      if (result.success) {
        appendLog(`👍 点赞x${result.count} 已发送`)
      } else {
        appendLog(`❌ 点赞失败：${formatDanmakuError(result.error)}`)
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
        <div
          class='flex min-w-0 flex-1 cursor-move items-center gap-2 self-stretch'
          data-chatterbox-lite-drag-surface='true'
        >
          <EmoteSelector side='top' />
          {desktop && <BridgeIndicator />}
        </div>
        <div class='flex shrink-0 items-center gap-1'>
          <SettingsPopoverButton side='top' />
          <Button
            size='sm'
            variant='outline'
            disabled={liking.value}
            className='px-2 leading-[1.2] [&_svg]:block [&_svg]:size-3.5'
            aria-label='点赞 30 次'
            title='点赞 30 次'
            onClick={() => void sendLike()}
          >
            {liking.value ? (
              <CircleNotchIcon className='animate-spin' aria-hidden='true' />
            ) : (
              <HeartIcon weight='fill' aria-hidden='true' />
            )}
            <span class='inline-flex items-center leading-none'>x30</span>
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
