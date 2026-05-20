import type { BilibiliEmoticonPackage, ReplacementRule, SendDanmakuResult } from '../types'

export const BRIDGE_PORTS = [31873, 31874, 31875] as const
export const BRIDGE_HOST = '127.0.0.1'
export const BRIDGE_PROTOCOL_VERSION = 1

export type BridgeCommandType =
  | 'getRoomState'
  | 'sendDanmaku'
  | 'sendLiveLike'
  | 'fetchEmoticons'
  | 'getSettingsSnapshot'

export interface BridgeRoomState {
  roomId: number | null
  streamerUid: number | null
  roomUrl: string
  title: string
  connectedAt: number
}

export interface BridgeLiveLikeResult {
  success: boolean
  count: number
  error?: string
}

export interface BridgeSettingsSnapshot {
  msgSendInterval: number
  maxLength: number
  dialogWidth: number
  pageDevicePixelRatio?: number
  pageRootFontSize?: number
  showNormalSendPanel: boolean
  showReplacementPanel: boolean
  showLogPanel: boolean
  blockedRetryEnabled: boolean
  pinnedEmoticonUniques: string[]
  sendHistory: string[]
  localGlobalRules: ReplacementRule[]
  localRoomRules: Record<string, ReplacementRule[]>
}

export interface BridgeCommandPayloads {
  getRoomState: Record<string, never>
  sendDanmaku: { message: string }
  sendLiveLike: Record<string, never>
  fetchEmoticons: Record<string, never>
  getSettingsSnapshot: Record<string, never>
}

export interface BridgeCommandResults {
  getRoomState: BridgeRoomState
  sendDanmaku: SendDanmakuResult
  sendLiveLike: BridgeLiveLikeResult
  fetchEmoticons: BilibiliEmoticonPackage[]
  getSettingsSnapshot: BridgeSettingsSnapshot
}

export interface BridgeCommand<T extends BridgeCommandType = BridgeCommandType> {
  id: string
  type: T
  payload: BridgeCommandPayloads[T]
  createdAt: number
}

export interface BridgeAgentHelloRequest {
  protocolVersion: number
  agentId?: string
  roomState: BridgeRoomState
  settingsSnapshot: BridgeSettingsSnapshot
}

export interface BridgeAgentHelloResponse {
  ok: true
  agentId: string
}

export interface BridgePollResponse {
  ok: true
  command?: BridgeCommand
}

export interface BridgeResultRequest<T extends BridgeCommandType = BridgeCommandType> {
  agentId: string
  commandId: string
  ok: boolean
  result?: BridgeCommandResults[T]
  error?: string
}

export type BridgeEvent =
  | { type: 'connected'; agentId: string; roomState: BridgeRoomState; settingsSnapshot: BridgeSettingsSnapshot }
  | { type: 'disconnected'; reason: string }
  | { type: 'roomState'; roomState: BridgeRoomState }
  | { type: 'settingsSnapshot'; settingsSnapshot: BridgeSettingsSnapshot }
  | { type: 'log'; message: string }

export interface BridgeState {
  port: number | null
  connected: boolean
  agentId: string | null
  roomState: BridgeRoomState | null
  settingsSnapshot: BridgeSettingsSnapshot | null
}

export interface BridgeCommandEnvelope<T extends BridgeCommandType = BridgeCommandType> {
  type: T
  payload: BridgeCommandPayloads[T]
}

export function emptyPayload<T extends BridgeCommandType>(): BridgeCommandPayloads[T] {
  return {} as BridgeCommandPayloads[T]
}
