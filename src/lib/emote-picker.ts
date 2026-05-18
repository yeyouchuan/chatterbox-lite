import type { BilibiliEmoticon, BilibiliEmoticonPackage } from '../types'

export function getVisibleEmoticonPackages(packages: BilibiliEmoticonPackage[]): BilibiliEmoticonPackage[] {
  return packages.slice(1).filter(pkg => pkg.emoticons.length > 0)
}

export function getPinnedEmoticons(packages: BilibiliEmoticonPackage[], pinnedUniques: string[]): BilibiliEmoticon[] {
  const byUnique = new Map<string, BilibiliEmoticon>()
  for (const pkg of getVisibleEmoticonPackages(packages)) {
    for (const emoticon of pkg.emoticons) {
      if (!byUnique.has(emoticon.emoticon_unique)) byUnique.set(emoticon.emoticon_unique, emoticon)
    }
  }

  const seen = new Set<string>()
  const result: BilibiliEmoticon[] = []
  for (const unique of pinnedUniques) {
    if (seen.has(unique)) continue
    seen.add(unique)

    const emoticon = byUnique.get(unique)
    if (emoticon) result.push(emoticon)
  }
  return result
}

export function togglePinnedEmoticon(pinnedUniques: string[], unique: string): string[] {
  if (pinnedUniques.includes(unique)) {
    return pinnedUniques.filter(item => item !== unique)
  }
  return [unique, ...pinnedUniques.filter(item => item !== unique)]
}
