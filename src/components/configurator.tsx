import type { TargetedPointerEvent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { cn } from '../lib/cn'
import { getDesktopApi } from '../lib/desktop-api'
import {
  dialogLeft,
  dialogOpen,
  dialogTop,
  dialogWidth,
  showLogPanel,
  showNormalSendPanel,
  showReplacementPanel,
} from '../lib/store'
import { LogPanel } from './log-panel'
import { NormalSendTab } from './normal-send-tab'
import { ReplacementPanel } from './replacement-panel'
import { SettingsPopoverButton } from './settings-popover-button'

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

function clampDesktopWidth(raw: number): number {
  return Math.max(DIALOG_MIN_WIDTH, Math.min(raw, DIALOG_MAX_WIDTH))
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(
      target.closest('button, input, textarea, select, a, label, summary, [role="button"], [contenteditable="true"]')
    )
  )
}

export function Configurator({ desktop = false }: { desktop?: boolean }) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [, setViewportVersion] = useState(0)
  const visible = dialogOpen.value
  const width = desktop ? clampDesktopWidth(dialogWidth.value) : clampWidth(dialogWidth.value)
  const customPosition = dialogLeft.value !== null && dialogTop.value !== null
  const positionStyle = desktop
    ? {
        left: '0',
        top: 'var(--chatterbox-lite-desktop-content-top, 0px)',
      }
    : customPosition
      ? {
          left: `${clamp(dialogLeft.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerWidth - width - DIALOG_EDGE_MARGIN)}px`,
          top: `${clamp(dialogTop.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerHeight - 120)}px`,
        }
      : {
          right: '1rem',
          bottom: `${DIALOG_DEFAULT_BOTTOM}px`,
        }

  useEffect(() => {
    const rerenderForViewport = () => {
      setViewportVersion(version => version + 1)
    }

    window.addEventListener('resize', rerenderForViewport)
    window.addEventListener('orientationchange', rerenderForViewport)
    return () => {
      window.removeEventListener('resize', rerenderForViewport)
      window.removeEventListener('orientationchange', rerenderForViewport)
    }
  }, [])

  useEffect(() => {
    const root = dialogRef.current?.getRootNode()
    if (!(root instanceof ShadowRoot)) return

    root
      .getElementById('chatterbox-lite-portal-root')
      ?.style.setProperty('--chatterbox-lite-dialog-width', `${width}px`)
  }, [width])

  const startDrag = (e: TargetedPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if (isInteractiveTarget(e.target)) return

    const dragSurface =
      e.target === e.currentTarget ||
      (e.target instanceof HTMLElement && e.target.closest('[data-chatterbox-lite-drag-surface="true"]'))
    if (!dragSurface) return

    e.preventDefault()

    const target = e.currentTarget
    if (desktop) {
      target.setPointerCapture(e.pointerId)
      void getDesktopApi().beginWindowDrag({ screenX: e.screenX, screenY: e.screenY })

      const previousCursor = document.body.style.cursor
      const previousUserSelect = document.body.style.userSelect
      document.body.style.cursor = 'move'
      document.body.style.userSelect = 'none'

      const onMove = (ev: PointerEvent) => {
        void getDesktopApi().dragWindow({ screenX: ev.screenX, screenY: ev.screenY })
      }

      const onEnd = (ev: PointerEvent) => {
        target.releasePointerCapture(ev.pointerId)
        target.removeEventListener('pointermove', onMove)
        target.removeEventListener('pointerup', onEnd)
        target.removeEventListener('pointercancel', onEnd)
        document.body.style.cursor = previousCursor
        document.body.style.userSelect = previousUserSelect
        void getDesktopApi().endWindowDrag()
      }

      target.addEventListener('pointermove', onMove)
      target.addEventListener('pointerup', onEnd)
      target.addEventListener('pointercancel', onEnd)
      return
    }

    const dialog = dialogRef.current
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
      ref={dialogRef}
      id='chatterbox-lite-dialog'
      data-chatterbox-lite-desktop={desktop ? 'true' : undefined}
      data-chatterbox-lite-window-drag={desktop ? 'true' : undefined}
      className={cn(
        'pointer-events-auto fixed z-2147483647',
        desktop ? 'max-h-none overflow-visible' : 'max-h-[calc(100vh-112px)] overflow-y-auto',
        'rounded-xl border border-ga2 border-solid bg-bg1 text-[13px] text-[var(--Ga10,#18191c)]',
        'shadow-[0_18px_48px_rgba(15,23,42,.22)]',
        !desktop && !visible && 'hidden'
      )}
      style={{ ...positionStyle, width: `${width}px`, '--chatterbox-lite-dialog-width': `${width}px` }}
    >
      <ResizeHandle desktop={desktop} />
      <div
        class='absolute top-0 right-3 left-3 z-10 h-3 cursor-move select-none'
        style={{ touchAction: 'none' }}
        data-chatterbox-lite-window-drag={desktop ? 'true' : undefined}
        onPointerDown={startDrag}
        title='拖动移动窗口'
      />

      <div
        class='space-y-3 p-3'
        data-chatterbox-lite-window-drag={desktop ? 'true' : undefined}
        onPointerDown={startDrag}
      >
        {showNormalSendPanel.value ? (
          <NormalSendTab desktop={desktop} />
        ) : (
          <div class='flex justify-end'>
            <SettingsPopoverButton side='bottom' />
          </div>
        )}
        {showReplacementPanel.value && <ReplacementPanel />}
        {showLogPanel.value && <LogPanel />}
      </div>
    </div>
  )
}

function ResizeHandle({ desktop = false }: { desktop?: boolean }) {
  const onPointerDown = (e: TargetedPointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const target = e.currentTarget
    const startX = e.clientX
    const startWidth = desktop ? clampDesktopWidth(dialogWidth.value) : clampWidth(dialogWidth.value)
    target.setPointerCapture(e.pointerId)

    const previousCursor = document.body.style.cursor
    const previousUserSelect = document.body.style.userSelect
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev: PointerEvent) => {
      const delta = startX - ev.clientX
      dialogWidth.value = desktop ? clampDesktopWidth(startWidth + delta) : clampWidth(startWidth + delta)
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
      data-chatterbox-lite-no-drag='true'
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      title='拖动以调整面板宽度'
    />
  )
}
