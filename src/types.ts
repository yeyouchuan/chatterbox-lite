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

export interface ReplacementRule {
  from?: string
  to?: string
}

export interface RemoteKeywords {
  global?: { keywords?: Record<string, string> }
  rooms?: Array<{ room: string; keywords?: Record<string, string> }>
}
