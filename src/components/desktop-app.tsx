import { useEffect } from 'preact/hooks'

import { getDesktopApi } from '../lib/desktop-api'
import { desktopRuntime, startDesktopRuntime } from '../lib/desktop-runtime'
import { appendLog } from '../lib/log'
import { ensureRemoteKeywordsSynced } from '../lib/replacement'
import { setRuntimeAdapter } from '../lib/runtime'
import { dialogOpen } from '../lib/store'
import { Configurator } from './configurator'

const MIN_WINDOW_WIDTH = 280
const MIN_WINDOW_HEIGHT = 148
const MAX_WINDOW_HEIGHT = 720
const POPOVER_TOP_SPACE = 360

let lastResizePayload = ''

function getDesktopUiScale(): number {
  const rawScale = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--chatterbox-lite-desktop-ui-scale')
  )
  return Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1
}

function resizeDesktopWindow(): void {
  const dialog = document.getElementById('chatterbox-lite-dialog')
  if (!dialog) return

  const hasPopover = Boolean(document.querySelector('[data-chatterbox-lite-popover="true"]'))
  const contentTop = hasPopover ? Math.ceil(POPOVER_TOP_SPACE * getDesktopUiScale()) : 0
  document.documentElement.style.setProperty('--chatterbox-lite-desktop-content-top', `${contentTop}px`)

  const rect = dialog.getBoundingClientRect()
  const popoverRects = Array.from(document.querySelectorAll<HTMLElement>('[data-chatterbox-lite-popover="true"]')).map(
    element => element.getBoundingClientRect()
  )
  const contentBottom = Math.max(rect.bottom, ...popoverRects.map(popoverRect => popoverRect.bottom), contentTop)
  const width = Math.max(MIN_WINDOW_WIDTH, Math.ceil(rect.width))
  const height = Math.min(MAX_WINDOW_HEIGHT, Math.max(MIN_WINDOW_HEIGHT, Math.ceil(contentBottom)))
  const nextPayload = `${width}:${height}:${contentTop}`
  if (nextPayload === lastResizePayload) return
  lastResizePayload = nextPayload

  void getDesktopApi().resizeWindow({ width, height, contentTop })
}

export function DesktopApp() {
  setRuntimeAdapter(desktopRuntime)
  dialogOpen.value = true

  useEffect(() => {
    startDesktopRuntime()

    void (async () => {
      try {
        await desktopRuntime.ensureRoomState()
        await ensureRemoteKeywordsSynced()
        await desktopRuntime.fetchEmoticons()
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        appendLog(`等待直播页桥接连接：${msg}`)
      }
    })()
  }, [])

  useEffect(() => {
    let frame = 0
    const scheduleResize = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(resizeDesktopWindow)
    }

    const observer = new ResizeObserver(scheduleResize)
    observer.observe(document.body)

    const dialog = document.getElementById('chatterbox-lite-dialog')
    if (dialog) observer.observe(dialog)

    window.addEventListener('resize', scheduleResize)
    window.addEventListener('chatterbox-lite:layout-change', scheduleResize)
    scheduleResize()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', scheduleResize)
      window.removeEventListener('chatterbox-lite:layout-change', scheduleResize)
    }
  }, [])

  return <Configurator desktop />
}
