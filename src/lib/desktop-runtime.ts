import { signal } from '@preact/signals'

import type { BilibiliEmoticonPackage, SendDanmakuResult } from '../types'
import type {
  BridgeCommandPayloads,
  BridgeCommandResults,
  BridgeCommandType,
  BridgeEvent,
  BridgeLiveLikeResult,
  BridgeRoomState,
  BridgeState,
} from './bridge-protocol'
import type { ChatterboxRuntime } from './runtime'

import { getDesktopApi } from './desktop-api'
import { appendLog } from './log'
import { applySettingsSnapshot } from './settings-snapshot'
import {
  autoSeekBufferThreshold,
  autoSeekEnabled,
  cachedEmoticonPackages,
  cachedRoomId,
  cachedStreamerUid,
} from './store'

const IMPORT_MARKER_KEY = 'chatterbox-lite:desktopSettingsImported'

let started = false

export const desktopBridgeState = signal<BridgeState>({
  port: null,
  connected: false,
  agentId: null,
  roomState: null,
  settingsSnapshot: null,
})

function applyDesktopUiScale(pageDevicePixelRatio: number): void {
  const desktopDevicePixelRatio = window.devicePixelRatio || 1
  const rawScale = pageDevicePixelRatio / desktopDevicePixelRatio
  const scale = Math.max(0.6, Math.min(rawScale, 1.25))
  document.documentElement.style.setProperty('--chatterbox-lite-desktop-ui-scale', String(scale))
  window.dispatchEvent(new CustomEvent('chatterbox-lite:layout-change'))
}

function applyDesktopPageMetrics(settingsSnapshot: { pageDevicePixelRatio?: number; pageRootFontSize?: number }): void {
  const rootFontSize =
    typeof settingsSnapshot.pageRootFontSize === 'number' && settingsSnapshot.pageRootFontSize > 0
      ? settingsSnapshot.pageRootFontSize
      : 12
  document.documentElement.style.setProperty('--chatterbox-lite-desktop-root-font-size', `${rootFontSize}px`)

  if (typeof settingsSnapshot.pageDevicePixelRatio === 'number' && settingsSnapshot.pageDevicePixelRatio > 0) {
    applyDesktopUiScale(settingsSnapshot.pageDevicePixelRatio)
  } else {
    document.documentElement.style.setProperty('--chatterbox-lite-desktop-ui-scale', '1')
    window.dispatchEvent(new CustomEvent('chatterbox-lite:layout-change'))
  }
}

function applyRoomState(roomState: BridgeRoomState): void {
  cachedRoomId.value = roomState.roomId
  cachedStreamerUid.value = roomState.streamerUid
}

function importSettingsOnce(event: BridgeEvent): void {
  if (event.type !== 'connected' && event.type !== 'settingsSnapshot') return
  applyDesktopPageMetrics(event.settingsSnapshot)
  if (window.localStorage.getItem(IMPORT_MARKER_KEY)) return

  applySettingsSnapshot(event.settingsSnapshot)
  window.localStorage.setItem(IMPORT_MARKER_KEY, '1')
}

async function sendDesktopCommand<T extends BridgeCommandType>(
  type: T,
  payload: BridgeCommandPayloads[T]
): Promise<BridgeCommandResults[T]> {
  return await getDesktopApi().command({ type, payload })
}

export function startDesktopRuntime(): void {
  if (started) return
  started = true

  getDesktopApi().onBridgeEvent(event => {
    if (event.type === 'connected') {
      applyRoomState(event.roomState)
      desktopBridgeState.value = {
        ...desktopBridgeState.value,
        connected: true,
        agentId: event.agentId,
        roomState: event.roomState,
        settingsSnapshot: event.settingsSnapshot,
      }
      importSettingsOnce(event)
      appendLog(`桌面桥接已连接：房间 ${event.roomState.roomId ?? 'unknown'}`)
      return
    }

    if (event.type === 'disconnected') {
      cachedRoomId.value = null
      cachedStreamerUid.value = null
      desktopBridgeState.value = {
        ...desktopBridgeState.value,
        connected: false,
        agentId: null,
        roomState: null,
        settingsSnapshot: null,
      }
      appendLog(`桌面桥接已断开：${event.reason}`)
      return
    }

    if (event.type === 'roomState') {
      applyRoomState(event.roomState)
      desktopBridgeState.value = {
        ...desktopBridgeState.value,
        connected: true,
        roomState: event.roomState,
      }
      return
    }

    if (event.type === 'settingsSnapshot') {
      importSettingsOnce(event)
      return
    }

    if (event.type === 'log') {
      appendLog(event.message)
    }
  })

  void getDesktopApi()
    .getBridgeState()
    .then(state => {
      desktopBridgeState.value = state
      if (state.roomState) applyRoomState(state.roomState)
      if (state.settingsSnapshot) applyDesktopPageMetrics(state.settingsSnapshot)
    })
    .catch(err => {
      appendLog(`桌面桥接状态读取失败：${err instanceof Error ? err.message : String(err)}`)
    })
}

export function syncDesktopAutoSeekSettings(): void {
  if (!desktopBridgeState.value.connected) return
  void sendDesktopCommand('updateAutoSeekSettings', {
    enabled: autoSeekEnabled.value,
    bufferThreshold: autoSeekBufferThreshold.value,
  })
    .then(snapshot => {
      desktopBridgeState.value = {
        ...desktopBridgeState.value,
        settingsSnapshot: snapshot,
      }
    })
    .catch(err => {
      appendLog(`自动追帧设置同步失败：${err instanceof Error ? err.message : String(err)}`)
    })
}

export const desktopRuntime: ChatterboxRuntime = {
  mode: 'desktop',

  async ensureRoomState(): Promise<BridgeRoomState> {
    const roomState = await sendDesktopCommand('getRoomState', {})
    applyRoomState(roomState)
    return roomState
  },

  async sendDanmaku(message: string): Promise<SendDanmakuResult> {
    return await sendDesktopCommand('sendDanmaku', { message })
  },

  async sendLiveLike(): Promise<BridgeLiveLikeResult> {
    return await sendDesktopCommand('sendLiveLike', {})
  },

  async fetchEmoticons(): Promise<BilibiliEmoticonPackage[]> {
    const packages = await sendDesktopCommand('fetchEmoticons', {})
    cachedEmoticonPackages.value = packages
    return packages
  },
}
