export interface BilibiliWbiKeys {
  img_key: string
  sub_key: string
}

export interface BilibiliEmoticon {
  emoji: string
  descript: string
  url: string
  emoticon_unique: string
  emoticon_id: number
  perm?: number
  identity?: number
  unlock_need_level?: number
  unlock_need_gift?: number
  unlock_show_text?: string
  unlock_show_color?: string
}

export interface BilibiliEmoticonPackage {
  pkg_id: number
  pkg_name: string
  pkg_type: number
  pkg_descript: string
  emoticons: BilibiliEmoticon[]
}

export interface BilibiliGetEmoticonsResponse {
  code: number
  data: {
    data: BilibiliEmoticonPackage[]
  }
}

export interface BilibiliSendDanmakuResponse {
  code?: number
  message?: string
  msg?: string
  data?: unknown
}

export interface SendDanmakuResult {
  success: boolean
  message: string
  isEmoticon: boolean
  error?: string
  cancelled?: boolean
}

export interface ReplacementRule {
  from?: string
  to?: string
}

export interface RemoteKeywords {
  global?: { keywords?: Record<string, string> }
  rooms?: Array<{ room: string; keywords?: Record<string, string> }>
}

export type FertilityStatus = 'menstruating' | 'fertile' | 'ovulating' | 'normal'

export interface FertilityUserResponse {
  status: FertilityStatus
  nextPeriod: string
  cyclesElapsedSinceObservation: number
  dayInCycle: number
  effectiveCycleLength: number
  dataPoints: number
}

export interface BilibiliUser {
  guildInfo?: {
    history?: Array<{ name: string; updatedAt: number }>
  }
  mcnInfo?: {
    history?: Array<{ mcnName: string; updatedAt: number }>
  }
}
