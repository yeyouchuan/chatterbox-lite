import { effect as signalEffect } from '@preact/signals'

import { ensureRoomId, getCsrfToken } from './api'
import { buildSendableDanmakuMessage } from './danmaku-direct-message'
import { appendLog } from './log'
import { applyReplacements } from './replacement'
import { addSendHistoryEntry } from './send-history'
import { enqueueDanmaku, SendPriority } from './send-queue'
import { danmakuDirectEnabled, dialogOpen, fasongText, sendHistory } from './store'

const MARKER = 'chatterbox-lite-dm-direct'
const STYLE_ID = 'chatterbox-lite-dm-direct-style'

const STYLE = `
.${MARKER} {
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  gap: 3px;
  opacity: 0;
  transition: opacity .12s;
  user-select: none;
}
.chat-item.danmaku-item:hover .${MARKER},
html.chatterbox-lite-dm-direct-always .${MARKER} {
  opacity: 1;
}
.${MARKER} button {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.36);
  color: inherit;
  font-size: 11px;
  line-height: 1;
  opacity: .72;
}
.${MARKER} button:hover {
  opacity: 1;
  border-color: currentColor;
}
`

function isValidDanmakuNode(node: HTMLElement): boolean {
  return node.classList.contains('chat-item') && node.classList.contains('danmaku-item')
}

function extractMessageFromNode(node: HTMLElement): string | null {
  const text = node.dataset.danmaku
  if (text === undefined) return null

  return buildSendableDanmakuMessage({
    text,
    isReply: node.dataset.replymid !== undefined && node.dataset.replymid !== '0',
    uname: node.dataset.uname ?? node.querySelector<HTMLElement>('[data-uname]')?.dataset.uname ?? null,
    hasLargeEmote: node.querySelector('.danmaku-item-right.emoticon.bulge img') !== null,
  })
}

function injectButtons(node: HTMLElement, message: string): void {
  if (node.querySelector(`.${MARKER}`)) return

  const anchor = node.querySelector('.danmaku-item-right') ?? node
  const container = document.createElement('span')
  container.className = MARKER
  container.dataset.message = message

  const copyButton = document.createElement('button')
  copyButton.type = 'button'
  copyButton.textContent = '复制'
  copyButton.title = '复制到 Chatterbox Lite 发送框'
  copyButton.dataset.action = 'copy'

  const repeatButton = document.createElement('button')
  repeatButton.type = 'button'
  repeatButton.textContent = '+1'
  repeatButton.title = '+1 发送这条弹幕'
  repeatButton.dataset.action = 'repeat'

  container.append(copyButton, repeatButton)
  anchor.after(container)
}

function scanExisting(container: HTMLElement): void {
  for (const node of container.querySelectorAll<HTMLElement>('.chat-item.danmaku-item')) {
    if (!isValidDanmakuNode(node)) continue
    const message = extractMessageFromNode(node)
    if (message) injectButtons(node, message)
  }
}

function handleCopy(message: string): void {
  fasongText.value = message
  dialogOpen.value = true
  appendLog(`复制弹幕：${message}`)
}

async function handleRepeat(message: string): Promise<void> {
  try {
    const roomId = await ensureRoomId()
    const csrfToken = getCsrfToken()
    if (!csrfToken) {
      appendLog('❌ 未找到登录信息，请先登录 Bilibili')
      return
    }

    const processed = applyReplacements(message)
    const result = await enqueueDanmaku(processed, roomId, csrfToken, SendPriority.MANUAL)
    sendHistory.value = addSendHistoryEntry(sendHistory.value, message)
    appendLog(result, '+1', message !== processed ? `${message} → ${processed}` : processed)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    appendLog(`🔴 +1 出错：${msg}`)
  }
}

function handleClick(e: MouseEvent): void {
  const target = e.target
  if (!(target instanceof HTMLElement)) return

  const button = target.closest<HTMLButtonElement>(`.${MARKER} button`)
  if (!button) return

  e.preventDefault()
  e.stopPropagation()

  const message = button.closest<HTMLElement>(`.${MARKER}`)?.dataset.message
  if (!message) return

  if (button.dataset.action === 'copy') {
    handleCopy(message)
  } else if (button.dataset.action === 'repeat') {
    void handleRepeat(message)
  }
}

let observer: MutationObserver | null = null
let pollTimer: ReturnType<typeof setInterval> | null = null
let container: HTMLElement | null = null
let styleEl: HTMLStyleElement | null = null
let settingsDispose: (() => void) | null = null

function removeInjectedButtons(): void {
  for (const el of document.querySelectorAll(`.${MARKER}`)) {
    el.remove()
  }
}

function attach(nextContainer: HTMLElement): void {
  container = nextContainer

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    styleEl.textContent = STYLE
    document.head.appendChild(styleEl)
  }

  if (danmakuDirectEnabled.value) scanExisting(nextContainer)
  nextContainer.addEventListener('click', handleClick, true)

  observer = new MutationObserver(mutations => {
    if (!danmakuDirectEnabled.value) return
    for (const mutation of mutations) {
      for (const added of mutation.addedNodes) {
        if (!(added instanceof HTMLElement) || !isValidDanmakuNode(added)) continue
        const message = extractMessageFromNode(added)
        if (message) injectButtons(added, message)
      }
    }
  })
  observer.observe(nextContainer, { childList: true })
}

function detachContainer(): void {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (container) {
    container.removeEventListener('click', handleClick, true)
    container = null
  }
}

function reattachIfNeeded(): boolean {
  const nextContainer = document.querySelector<HTMLElement>('.chat-items')
  if (!nextContainer) {
    if (container && !container.isConnected) detachContainer()
    return false
  }

  if (container === nextContainer && container.isConnected) return true

  detachContainer()
  attach(nextContainer)
  return true
}

export function startDanmakuDirect(): void {
  if (pollTimer) return

  settingsDispose = signalEffect(() => {
    if (!container) return
    if (danmakuDirectEnabled.value) {
      scanExisting(container)
    } else {
      removeInjectedButtons()
    }
  })

  reattachIfNeeded()
  pollTimer = setInterval(() => {
    reattachIfNeeded()
  }, 1000)
}

export function stopDanmakuDirect(): void {
  if (settingsDispose) {
    settingsDispose()
    settingsDispose = null
  }
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  detachContainer()
  styleEl?.remove()
  styleEl = null

  removeInjectedButtons()
}
