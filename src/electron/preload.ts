import { contextBridge, ipcRenderer } from 'electron'

import type {
  BridgeCommandEnvelope,
  BridgeCommandResults,
  BridgeCommandType,
  BridgeEvent,
  BridgeState,
} from '../lib/bridge-protocol'
import type { ChatterboxDesktopApi, ResizeWindowPayload, WindowDragPointPayload } from '../lib/desktop-api'

const api: ChatterboxDesktopApi = {
  getBridgeState: () => ipcRenderer.invoke('bridge:get-state') as Promise<BridgeState>,
  command: <T extends BridgeCommandType>(envelope: BridgeCommandEnvelope<T>) =>
    ipcRenderer.invoke('bridge:command', envelope) as Promise<BridgeCommandResults[T]>,
  resizeWindow: (payload: ResizeWindowPayload) => ipcRenderer.invoke('window:resize', payload) as Promise<void>,
  beginWindowDrag: (payload: WindowDragPointPayload) =>
    ipcRenderer.invoke('window:begin-drag', payload) as Promise<void>,
  dragWindow: (payload: WindowDragPointPayload) => ipcRenderer.invoke('window:drag', payload) as Promise<void>,
  endWindowDrag: () => ipcRenderer.invoke('window:end-drag') as Promise<void>,
  reconnect: () => ipcRenderer.invoke('bridge:reconnect') as Promise<void>,
  onBridgeEvent: (callback: (event: BridgeEvent) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, bridgeEvent: BridgeEvent) => callback(bridgeEvent)
    ipcRenderer.on('bridge:event', listener)
    return () => ipcRenderer.removeListener('bridge:event', listener)
  },
}

contextBridge.exposeInMainWorld('chatterboxDesktop', api)
