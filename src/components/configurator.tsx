import type { TargetedPointerEvent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import { cn } from '../lib/cn'
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

export function Configurator() {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [, setViewportVersion] = useState(0)
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

  return (
    <div
      ref={dialogRef}
      id='chatterbox-lite-dialog'
      className={cn(
        'pointer-events-auto fixed z-2147483647',
        'max-h-[calc(100vh-112px)] overflow-y-auto',
        'rounded-xl border border-ga3 border-solid bg-bg1 text-[13px] text-[var(--Ga10,#18191c)]',
        'shadow-[0_18px_48px_rgba(15,23,42,.22)]',
        !visible && 'hidden'
      )}
      style={{ ...positionStyle, width: `${width}px`, '--chatterbox-lite-dialog-width': `${width}px` }}
    >
      <ResizeHandle />

      <div class='space-y-3 p-3'>
        {showNormalSendPanel.value ? (
          <NormalSendTab />
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
