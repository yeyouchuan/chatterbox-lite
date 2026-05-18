import type { TargetedPointerEvent } from 'preact'

import { cn } from '../lib/cn'
import {
  dialogLeft,
  dialogOpen,
  dialogTop,
  dialogWidth,
  settingsPanelOpen,
  showLogPanel,
  showNormalSendPanel,
  showReplacementPanel,
} from '../lib/store'
import { LogPanel } from './log-panel'
import { NormalSendTab } from './normal-send-tab'
import { ReplacementPanel } from './replacement-panel'
import { SettingsPanel } from './settings-panel'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const DIALOG_MIN_WIDTH = 280
const DIALOG_MAX_WIDTH = 520
const DIALOG_VIEWPORT_MARGIN = 40
const DIALOG_DEFAULT_BOTTOM = 88
const DIALOG_EDGE_MARGIN = 8

function clamp(raw: number, min: number, max: number): number {
  return Math.max(min, Math.min(raw, max))
}

function clampWidth(raw: number): number {
  const viewportMax = Math.min(DIALOG_MAX_WIDTH, window.innerWidth - DIALOG_VIEWPORT_MARGIN)
  return Math.max(DIALOG_MIN_WIDTH, Math.min(raw, viewportMax))
}

export function Configurator() {
  const visible = dialogOpen.value
  const width = clampWidth(dialogWidth.value)
  const customPosition = dialogLeft.value !== null && dialogTop.value !== null
  const positionStyle = customPosition
    ? {
        left: `${clamp(dialogLeft.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerWidth - width - DIALOG_EDGE_MARGIN)}px`,
        top: `${clamp(dialogTop.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerHeight - 120)}px`,
      }
    : {
        right: '1rem',
        bottom: `${DIALOG_DEFAULT_BOTTOM}px`,
      }

  const startDrag = (e: TargetedPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.preventDefault()

    const target = e.currentTarget
    const dialog = target.parentElement as HTMLDivElement | null
    if (!dialog) return

    const rect = dialog.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const startLeft = rect.left
    const startTop = rect.top
    const maxLeft = Math.max(DIALOG_EDGE_MARGIN, window.innerWidth - rect.width - DIALOG_EDGE_MARGIN)
    const maxTop = Math.max(
      DIALOG_EDGE_MARGIN,
      window.innerHeight - Math.min(rect.height, window.innerHeight) - DIALOG_EDGE_MARGIN
    )

    target.setPointerCapture(e.pointerId)

    const previousCursor = document.body.style.cursor
    const previousUserSelect = document.body.style.userSelect
    document.body.style.cursor = 'move'
    document.body.style.userSelect = 'none'

    const onMove = (ev: PointerEvent) => {
      dialogLeft.value = clamp(startLeft + ev.clientX - startX, DIALOG_EDGE_MARGIN, maxLeft)
      dialogTop.value = clamp(startTop + ev.clientY - startY, DIALOG_EDGE_MARGIN, maxTop)
    }

    const onEnd = (ev: PointerEvent) => {
      target.releasePointerCapture(ev.pointerId)
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerup', onEnd)
      target.removeEventListener('pointercancel', onEnd)
      document.body.style.cursor = previousCursor
      document.body.style.userSelect = previousUserSelect
    }

    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerup', onEnd)
    target.addEventListener('pointercancel', onEnd)
  }

  return (
    <div
      id='chatterbox-lite-dialog'
      className={cn(
        'pointer-events-auto fixed z-2147483647',
        'max-h-[calc(100vh-112px)] overflow-y-auto',
        'rounded-md border border-ga3 border-solid bg-bg1 text-[13px] text-[var(--Ga10,#18191c)]',
        'shadow-[0_18px_48px_rgba(15,23,42,.22)]',
        !visible && 'hidden'
      )}
      style={{ ...positionStyle, width: `${width}px`, '--chatterbox-lite-dialog-width': `${width}px` }}
    >
      <ResizeHandle />
      <div
        class='sticky top-0 z-1 cursor-move border-ga2 border-b border-solid bg-bg1 px-2 py-1'
        onPointerDown={startDrag}
      >
        <div class='flex items-center justify-between gap-2'>
          <div class='min-w-0 truncate font-bold text-[13px]' title='拖动标题栏移动窗口'>
            Chatterbox Lite
          </div>
          <div class='flex shrink-0 items-center gap-1'>
            <Popover
              open={settingsPanelOpen.value}
              onOpenChange={v => {
                settingsPanelOpen.value = v
              }}
            >
              <PopoverTrigger>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label='打开设置'
                  title='设置'
                  onPointerDown={e => {
                    e.stopPropagation()
                  }}
                >
                  ⚙
                </Button>
              </PopoverTrigger>
              <PopoverContent side='bottom' align='end' portal className='w-[230px]'>
                <div
                  class='overflow-y-auto p-2'
                  style={{ maxHeight: 'min(320px, var(--chatterbox-lite-popover-max-height, 44vh))' }}
                >
                  <SettingsPanel />
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant='ghost'
              size='icon'
              aria-label='关闭'
              title='关闭'
              onPointerDown={e => {
                e.stopPropagation()
              }}
              onClick={() => {
                dialogOpen.value = false
              }}
            >
              ×
            </Button>
          </div>
        </div>
      </div>

      <div class='space-y-3 p-3'>
        {showNormalSendPanel.value && <NormalSendTab />}
        {showReplacementPanel.value && <ReplacementPanel />}
        {showLogPanel.value && <LogPanel />}
      </div>
    </div>
  )
}

function ResizeHandle() {
  const onPointerDown = (e: TargetedPointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const target = e.currentTarget
    const startX = e.clientX
    const startWidth = clampWidth(dialogWidth.value)
    target.setPointerCapture(e.pointerId)

    const previousCursor = document.body.style.cursor
    const previousUserSelect = document.body.style.userSelect
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev: PointerEvent) => {
      const delta = startX - ev.clientX
      dialogWidth.value = clampWidth(startWidth + delta)
    }

    const onEnd = (ev: PointerEvent) => {
      target.releasePointerCapture(ev.pointerId)
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerup', onEnd)
      target.removeEventListener('pointercancel', onEnd)
      document.body.style.cursor = previousCursor
      document.body.style.userSelect = previousUserSelect
    }

    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerup', onEnd)
    target.addEventListener('pointercancel', onEnd)
  }

  return (
    <div
      class={cn(
        'absolute top-0 bottom-0 left-0 z-10 w-0.75 cursor-ew-resize select-none',
        'hover:bg-ga3 active:bg-ga4'
      )}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      title='拖动以调整面板宽度'
    />
  )
}
