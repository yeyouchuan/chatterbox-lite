import type {
  BridgeCommandEnvelope,
  BridgeCommandResults,
  BridgeCommandType,
  BridgeEvent,
  BridgeState,
} from './bridge-protocol'

export interface ResizeWindowPayload {
  width: number
  height: number
  contentTop?: number
}

export interface WindowDragPointPayload {
  screenX: number
  screenY: number
}

export interface ChatterboxDesktopApi {
  getBridgeState: () => Promise<BridgeState>
  command: <T extends BridgeCommandType>(envelope: BridgeCommandEnvelope<T>) => Promise<BridgeCommandResults[T]>
  resizeWindow: (payload: ResizeWindowPayload) => Promise<void>
  beginWindowDrag: (payload: WindowDragPointPayload) => Promise<void>
  dragWindow: (payload: WindowDragPointPayload) => Promise<void>
  endWindowDrag: () => Promise<void>
  reconnect: () => Promise<void>
  onBridgeEvent: (callback: (event: BridgeEvent) => void) => () => void
}

declare global {
  interface Window {
    chatterboxDesktop?: ChatterboxDesktopApi
  }
}

export function getDesktopApi(): ChatterboxDesktopApi {
  if (!window.chatterboxDesktop) throw new Error('Desktop bridge is unavailable')
  return window.chatterboxDesktop
}
