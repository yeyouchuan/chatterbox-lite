import { ChatCircleTextIcon, CircleNotchIcon, HeartIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'

import { ensureRoomId, getCsrfToken, getCurrentUserId, sendLiveLike } from '../lib/api'
import { cn } from '../lib/cn'
import { appendLog } from '../lib/log'
import { cachedStreamerUid, dialogOpen, showAudioOnlyButton } from '../lib/store'
import { AudioOnlyButton } from './audio-only-button'
import { Button } from './ui/button'

export function ToggleButton() {
  const liking = useSignal(false)

  const handleLike = async () => {
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

  return (
    <div class='pointer-events-auto fixed right-4 bottom-6 z-2147483647 flex items-center gap-1'>
      {showAudioOnlyButton.value && <AudioOnlyButton />}
      <Button
        type='button'
        variant='secondary'
        disabled={liking.value}
        aria-label='点赞 30 次'
        title='点赞 30 次'
        onClick={() => void handleLike()}
        className={cn(
          'px-2 py-1 text-white',
          'active:scale-[0.96]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          '[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3',
          'border-[#ff5c8a] bg-[#ff5c8a]'
        )}
      >
        {liking.value ? (
          <CircleNotchIcon size={14} className='animate-spin' aria-hidden='true' />
        ) : (
          <HeartIcon size={14} weight='fill' aria-hidden='true' />
        )}
        {liking.value ? '点赞中' : '点赞x30'}
      </Button>
      <Button
        type='button'
        id='chatterbox-lite-toggle'
        variant='secondary'
        onClick={() => {
          dialogOpen.value = !dialogOpen.value
        }}
        className={cn(
          'px-2 py-1 text-white',
          'active:scale-[0.96]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          '[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3',
          dialogOpen.value ? 'border-brand bg-brand' : 'border-ga6 bg-ga6'
        )}
      >
        <ChatCircleTextIcon size={14} weight='bold' aria-hidden='true' />
        弹幕助手
      </Button>
    </div>
  )
}
