import type { BilibiliEmoticonPackage, SendDanmakuResult } from '../types'
import type { BridgeLiveLikeResult, BridgeRoomState, BridgeSettingsSnapshot } from './bridge-protocol'

export interface ChatterboxRuntime {
  mode: 'userscript' | 'desktop'
  ensureRoomState: () => Promise<BridgeRoomState>
  sendDanmaku: (message: string) => Promise<SendDanmakuResult>
  sendLiveLike: () => Promise<BridgeLiveLikeResult>
  fetchEmoticons: () => Promise<BilibiliEmoticonPackage[]>
  getSettingsSnapshot?: () => BridgeSettingsSnapshot
}

let runtime: ChatterboxRuntime | null = null

export function setRuntimeAdapter(adapter: ChatterboxRuntime): void {
  runtime = adapter
}

export function getRuntimeAdapter(): ChatterboxRuntime {
  if (!runtime) throw new Error('Chatterbox runtime has not been initialized')
  return runtime
}
