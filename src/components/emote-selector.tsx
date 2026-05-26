import { PushPinIcon, SmileyIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'

import type { BilibiliEmoticon } from '../types'

import { cn } from '../lib/cn'
import { getPinnedEmoticons, getVisibleEmoticonPackages, togglePinnedEmoticon } from '../lib/emote-picker'
import { formatLockedEmoticonReject, isLockedEmoticon } from '../lib/emoticon'
import { appendLog } from '../lib/log'
import { getRuntimeAdapter } from '../lib/runtime'
import { cachedEmoticonPackages, pinnedEmoticonUniques } from '../lib/store'
import { Button } from './ui/button'
import { Popover, PopoverContent, type PopoverSide, PopoverTrigger } from './ui/popover'

const EMOTE_GRID_CLASS = 'grid grid-cols-[repeat(auto-fit,minmax(52px,1fr))] gap-x-1 gap-y-0.5'

function normalizeImageUrl(url: string): string {
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('http://')) return `https://${url.slice('http://'.length)}`
  return url
}

export function EmoteSelector({ side = 'top' }: { side?: PopoverSide }) {
  const open = useSignal(false)
  const copiedId = useSignal<string | null>(null)
  const packages = cachedEmoticonPackages.value
  const visiblePackages = getVisibleEmoticonPackages(packages)
  const pinnedEmoticons = getPinnedEmoticons(packages, pinnedEmoticonUniques.value)

  const handleSend = async (unique: string) => {
    open.value = false

    if (isLockedEmoticon(unique)) {
      appendLog(formatLockedEmoticonReject(unique, '手动表情'))
      return
    }

    try {
      const result = await getRuntimeAdapter().sendDanmaku(unique)
      appendLog(result, '手动表情', unique)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      appendLog(`🔴 发送出错：${msg}`)
    }
  }

  const handleCopy = async (unique: string) => {
    try {
      await navigator.clipboard.writeText(unique)
    } catch {
      alert(`复制失败，请手动复制：${unique}`)
      return
    }

    copiedId.value = unique
    setTimeout(() => {
      if (copiedId.peek() === unique) copiedId.value = null
    }, 1500)
  }

  const handleTogglePin = (unique: string) => {
    pinnedEmoticonUniques.value = togglePinnedEmoticon(pinnedEmoticonUniques.value, unique)
  }

  const handleOpenChange = (value: boolean) => {
    open.value = value
    if (!value || cachedEmoticonPackages.value.length > 0) return

    void (async () => {
      try {
        await getRuntimeAdapter().fetchEmoticons()
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        appendLog(`⚠️ 表情数据加载失败：${msg}`)
      }
    })()
  }

  const renderEmote = (emo: BilibiliEmoticon) => {
    const unique = emo.emoticon_unique
    const isLocked = emo.perm === 0
    const isCopied = copiedId.value === unique
    const isPinned = pinnedEmoticonUniques.value.includes(unique)
    const lockText = emo.unlock_show_text?.trim() || ''

    return (
      <div
        key={unique}
        class='relative flex min-w-0 flex-col items-center gap-0.5 [contain-intrinsic-size:58px_68px] [content-visibility:auto]'
      >
        <button
          type='button'
          title={isPinned ? '取消置顶' : '置顶到常用'}
          aria-label={isPinned ? '取消置顶' : '置顶到常用'}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            handleTogglePin(unique)
          }}
          class={cn(
            'absolute top-px left-px z-10 m-0 flex size-4 items-center justify-center',
            'rounded-sm border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control p-0 text-[11px] leading-none backdrop-blur-md',
            'cursor-pointer transition hover:border-[color:var(--chatterbox-lite-pin-border)] hover:text-[color:var(--chatterbox-lite-pin-active)]',
            isPinned
              ? 'border-[color:var(--chatterbox-lite-pin-border)] text-[color:var(--chatterbox-lite-pin-active)]'
              : 'text-ga5'
          )}
        >
          <PushPinIcon size={11} weight={isPinned ? 'fill' : 'regular'} aria-hidden='true' />
        </button>
        <Button
          type='button'
          variant='outline'
          title={`${emo.emoji}\n点击发送: ${unique}`}
          onClick={() => void handleSend(unique)}
          className={cn('relative size-[52px] p-0.5', isLocked && 'opacity-60')}
        >
          <img
            src={normalizeImageUrl(emo.url)}
            alt={emo.emoji}
            class='size-full object-contain'
            decoding='async'
            draggable={false}
            fetchPriority='low'
            loading='lazy'
            referrerPolicy='no-referrer'
          />
          {isLocked && (
            <span
              class='pointer-events-none absolute top-px right-px rounded-sm p-0.5 text-[9px] text-white leading-none'
              style={{ background: emo.unlock_show_color || 'rgba(0, 0, 0, 0.6)' }}
            >
              {lockText || '锁'}
            </span>
          )}
        </Button>
        <button
          type='button'
          title={`点击复制: ${unique}`}
          onClick={() => void handleCopy(unique)}
          class={cn(
            'm-0 w-full truncate border-none bg-transparent p-0 text-[10px] leading-tight',
            'cursor-pointer transition hover:text-brand',
            isCopied && 'font-bold text-brand'
          )}
        >
          {isCopied ? '已复制' : emo.emoji}
        </button>
      </div>
    )
  }

  return (
    <Popover open={open.value} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button variant={open.value ? 'default' : 'outline'} size='sm' title='表情' aria-label='表情'>
          <SmileyIcon weight='bold' aria-hidden='true' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={side} align='start' portal className='w-[calc(var(--chatterbox-lite-dialog-width)-24px)]'>
        <div
          class='overflow-y-auto p-1.5 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/35 [&::-webkit-scrollbar]:w-1.5'
          style={{ maxHeight: 'min(360px, var(--chatterbox-lite-popover-max-height, 44vh))' }}
        >
          {packages.length === 0 ? (
            <div class='text-ga6'>表情数据加载中…</div>
          ) : visiblePackages.length === 0 ? (
            <div class='text-ga6'>暂无可用表情</div>
          ) : (
            <>
              {pinnedEmoticons.length > 0 && (
                <div class='mb-3 border-[color:var(--chatterbox-lite-acrylic-divider)] border-b border-solid pb-3'>
                  <div class='mb-1 font-bold text-[11px] text-ga6'>
                    常用置顶
                    <span class='ml-2 font-normal'>({pinnedEmoticons.length})</span>
                  </div>
                  <div class={EMOTE_GRID_CLASS}>{pinnedEmoticons.map(renderEmote)}</div>
                </div>
              )}

              {visiblePackages.map(pkg => (
                <div key={pkg.pkg_id} class='mb-3 last:mb-0'>
                  <div class='mb-1 font-bold text-[11px] text-ga6'>
                    {pkg.pkg_name}
                    <span class='ml-2 font-normal'>({pkg.emoticons.length})</span>
                  </div>
                  <div class={EMOTE_GRID_CLASS}>{pkg.emoticons.map(renderEmote)}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
