import { getGraphemes } from './utils'

const SOFT_HYPHEN = '\u00ad'

export function isBlockedDanmakuError(error: string | undefined): boolean {
  if (!error) return false
  const text = error.toLowerCase()
  if (text === 'f' || text === 'k') return true
  return ['屏蔽', '敏感', '违禁', '违规', 'blocked', 'sensitive'].some(keyword => text.includes(keyword))
}

function getBracketSafePositions(graphemes: string[]): number[] {
  const forbidden = new Set<number>()
  let openAt = -1

  for (let i = 0; i < graphemes.length; i++) {
    const grapheme = graphemes[i]
    if (grapheme === '[') {
      openAt = i
    } else if (grapheme === ']' && openAt !== -1) {
      for (let pos = openAt + 1; pos <= i; pos++) forbidden.add(pos)
      openAt = -1
    }
  }

  const positions: number[] = []
  for (let pos = 1; pos <= graphemes.length; pos++) {
    if (!forbidden.has(pos)) positions.push(pos)
  }
  return positions.length > 0 ? positions : [graphemes.length]
}

function insertSoftHyphens(text: string, count: number): string {
  const graphemes = getGraphemes(text)
  if (graphemes.length === 0) return text

  const positions = getBracketSafePositions(graphemes)
  const insertCount = Math.max(1, Math.min(count, positions.length))
  const selected = new Set<number>()

  for (let i = 0; i < insertCount; i++) {
    const index = Math.floor(((i + 1) * positions.length) / (insertCount + 1))
    selected.add(positions[Math.min(index, positions.length - 1)])
  }

  let result = ''
  for (let i = 0; i < graphemes.length; i++) {
    if (selected.has(i)) result += SOFT_HYPHEN
    result += graphemes[i]
  }
  if (selected.has(graphemes.length)) result += SOFT_HYPHEN
  return result
}

export function buildBlockedRetryMessages(message: string, maxAttempts = 3): string[] {
  const attempts = Math.max(0, Math.floor(maxAttempts))
  const candidates: string[] = []

  for (let i = 1; i <= attempts; i++) {
    const candidate = insertSoftHyphens(message, i)
    if (candidate !== message && !candidates.includes(candidate)) {
      candidates.push(candidate)
    }
  }

  return candidates
}

export interface ReplacementRetryMessage {
  message: string
  matched: string[]
}

export function buildReplacementRetryMessage(
  message: string,
  replacements: Iterable<[string, string]>
): ReplacementRetryMessage | null {
  let result = message
  const matched: string[] = []

  for (const [from, to] of replacements) {
    if (!from || !result.includes(from)) continue
    matched.push(from)
    result = result.split(from).join(to)
  }

  if (result === message) return null
  return { message: result, matched }
}
