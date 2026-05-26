export const BRIDGE_HOST = "127.0.0.1";
export const BRIDGE_PORTS = [31873, 31874, 31875] as const;

export interface BridgeRoomState {
  roomId: number | null;
  streamerUid: number | null;
  roomUrl: string;
  title: string;
  connectedAt: number;
}

export interface BridgeState {
  port: number | null;
  connected: boolean;
  agentId: string | null;
  roomState: BridgeRoomState | null;
  settingsSnapshot: unknown | null;
}

export interface SendDanmakuResult {
  success: boolean;
  message: string;
  isEmoticon: boolean;
  error?: string;
  cancelled?: boolean;
}

export interface BilibiliEmoticon {
  emoji: string;
  descript: string;
  url: string;
  emoticon_unique: string;
  emoticon_id: number;
  perm?: number;
  identity?: number;
  unlock_need_level?: number;
  unlock_need_gift?: number;
  unlock_show_text?: string;
  unlock_show_color?: string;
}

export interface BilibiliEmoticonPackage {
  pkg_id: number;
  pkg_name: string;
  pkg_type: number;
  pkg_descript: string;
  emoticons: BilibiliEmoticon[];
}

export interface BridgeCommandPayloads {
  getRoomState: Record<string, never>;
  sendDanmaku: { message: string };
  fetchEmoticons: Record<string, never>;
}

export interface BridgeCommandResults {
  getRoomState: BridgeRoomState;
  sendDanmaku: SendDanmakuResult;
  fetchEmoticons: BilibiliEmoticonPackage[];
}

export type BridgeCommandType = keyof BridgeCommandPayloads;
