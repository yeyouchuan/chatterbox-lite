import type { BilibiliEmoticon, BilibiliEmoticonPackage } from '../types'

export const RECENT_EMOTE_LIMIT = 12

export function getVisibleEmoticonPackages(packages: BilibiliEmoticonPackage[]): BilibiliEmoticonPackage[] {
  return packages.slice(1).filter(pkg => pkg.emoticons.length > 0)
}

function getEmoticonsByUnique(packages: BilibiliEmoticonPackage[]): Map<string, BilibiliEmoticon> {
  const byUnique = new Map<string, BilibiliEmoticon>()
  for (const pkg of getVisibleEmoticonPackages(packages)) {
    for (const emoticon of pkg.emoticons) {
      if (!byUnique.has(emoticon.emoticon_unique)) byUnique.set(emoticon.emoticon_unique, emoticon)
    }
  }
  return byUnique
}

function resolveEmoticons(
  packages: BilibiliEmoticonPackage[],
  uniques: string[],
  excludedUniques: string[] = []
): BilibiliEmoticon[] {
  const byUnique = getEmoticonsByUnique(packages)
  const excluded = new Set(excludedUniques)
  const seen = new Set<string>()
  const result: BilibiliEmoticon[] = []
  for (const unique of uniques) {
    if (seen.has(unique) || excluded.has(unique)) continue
    seen.add(unique)

    const emoticon = byUnique.get(unique)
    if (emoticon) result.push(emoticon)
  }
  return result
}

export function getPinnedEmoticons(packages: BilibiliEmoticonPackage[], pinnedUniques: string[]): BilibiliEmoticon[] {
  return resolveEmoticons(packages, pinnedUniques)
}

export function getRecentEmoticons(
  packages: BilibiliEmoticonPackage[],
  recentUniques: string[],
  pinnedUniques: string[]
): BilibiliEmoticon[] {
  return resolveEmoticons(packages, recentUniques, pinnedUniques)
}

export function togglePinnedEmoticon(pinnedUniques: string[], unique: string): string[] {
  if (pinnedUniques.includes(unique)) {
    return pinnedUniques.filter(item => item !== unique)
  }
  return [unique, ...pinnedUniques.filter(item => item !== unique)]
}

export function addRecentEmoticon(recentUniques: string[], unique: string): string[] {
  const trimmed = unique.trim()
  if (!trimmed) return recentUniques
  return [trimmed, ...recentUniques.filter(item => item !== trimmed)].slice(0, RECENT_EMOTE_LIMIT)
}
