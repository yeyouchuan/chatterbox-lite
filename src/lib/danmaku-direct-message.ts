export interface DanmakuMessageLike {
  text: string
  isReply: boolean
  uname?: string | null
  hasLargeEmote?: boolean
}

export function buildSendableDanmakuMessage(info: DanmakuMessageLike): string | null {
  const text = info.text.trim()
  if (!text || info.hasLargeEmote) return null
  if (!info.isReply) return text

  const uname = info.uname?.trim()
  return uname ? `@${uname} ${text}` : null
}
