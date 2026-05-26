import type { BilibiliEmoticon, BilibiliEmoticonPackage } from "./protocol";

export interface RaycastEmote extends BilibiliEmoticon {
  packageName: string;
  packageId: string;
  title: string;
  subtitle: string;
  unique: string;
}

export function flattenSendableEmotes(
  packages: BilibiliEmoticonPackage[],
): RaycastEmote[] {
  return packages.slice(1).flatMap((pkg) =>
    pkg.emoticons.map((emoticon) => ({
      ...emoticon,
      packageName: pkg.pkg_name,
      packageId: String(pkg.pkg_id),
      title:
        emoticon.descript.trim() ||
        emoticon.emoji.trim() ||
        emoticon.emoticon_unique,
      subtitle: `${pkg.pkg_name} · ${emoticon.emoticon_unique}`,
      unique: emoticon.emoticon_unique,
    })),
  );
}

export interface RaycastEmoteGroup {
  id: string;
  packageId: string;
  packageName: string;
  emotes: RaycastEmote[];
}

function matchesEmoteQuery(emote: RaycastEmote, query: string): boolean {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return (
    emote.title.toLowerCase().includes(normalized) ||
    emote.unique.toLowerCase().includes(normalized) ||
    emote.packageName.toLowerCase().includes(normalized) ||
    emote.emoji.toLowerCase().includes(normalized) ||
    emote.descript.toLowerCase().includes(normalized)
  );
}

export function groupEmotesForGrid(
  packages: BilibiliEmoticonPackage[],
  query = "",
  packageId = "all",
): RaycastEmoteGroup[] {
  const grouped = new Map<string, RaycastEmoteGroup>();
  for (const emote of flattenSendableEmotes(packages)) {
    if (packageId !== "all" && emote.packageId !== packageId) continue;
    if (!matchesEmoteQuery(emote, query.trim())) continue;

    const existing = grouped.get(emote.packageId);
    if (existing) {
      existing.emotes.push(emote);
    } else {
      grouped.set(emote.packageId, {
        id: emote.packageId,
        packageId: emote.packageId,
        packageName: emote.packageName,
        emotes: [emote],
      });
    }
  }

  return Array.from(grouped.values());
}

export function getEmotePackageOptions(
  packages: BilibiliEmoticonPackage[],
): Array<{ id: string; name: string }> {
  return packages
    .slice(1)
    .filter((pkg) => pkg.emoticons.length > 0)
    .map((pkg) => ({ id: String(pkg.pkg_id), name: pkg.pkg_name }));
}

export function resolveEmotesByUnique(
  packages: BilibiliEmoticonPackage[],
  uniques: string[],
): RaycastEmote[] {
  const indexed = new Map(
    flattenSendableEmotes(packages).map((emote) => [emote.unique, emote]),
  );
  const seen = new Set<string>();
  const resolved: RaycastEmote[] = [];

  for (const unique of uniques) {
    if (seen.has(unique)) continue;

    seen.add(unique);
    const emote = indexed.get(unique);
    if (emote) resolved.push(emote);
  }

  return resolved;
}

function getPackageIdFromMode(modeValue: string): string {
  if (!modeValue.startsWith("emote:")) return "all";

  const packageId = modeValue.slice("emote:".length);
  return packageId || "all";
}

function filterEmotesForSection(
  emotes: RaycastEmote[],
  query: string,
  packageId: string,
): RaycastEmote[] {
  const trimmedQuery = query.trim();
  return emotes.filter(
    (emote) =>
      (packageId === "all" || emote.packageId === packageId) &&
      matchesEmoteQuery(emote, trimmedQuery),
  );
}

export interface BuildEmoteSectionsInput {
  packages: BilibiliEmoticonPackage[];
  query: string;
  modeValue: string;
  recent: string[];
  favorites: string[];
}

export function buildEmoteSections({
  packages,
  query,
  modeValue,
  recent,
  favorites,
}: BuildEmoteSectionsInput): RaycastEmoteGroup[] {
  const packageId = getPackageIdFromMode(modeValue);
  const sections: RaycastEmoteGroup[] = [];

  const favoriteEmotes = filterEmotesForSection(
    resolveEmotesByUnique(packages, favorites),
    query,
    packageId,
  );
  if (favoriteEmotes.length > 0) {
    sections.push({
      id: "favorites",
      packageId: "favorites",
      packageName: "收藏表情",
      emotes: favoriteEmotes,
    });
  }

  const recentEmotes = filterEmotesForSection(
    resolveEmotesByUnique(packages, recent),
    query,
    packageId,
  );
  if (recentEmotes.length > 0) {
    sections.push({
      id: "recent",
      packageId: "recent",
      packageName: "最近表情",
      emotes: recentEmotes,
    });
  }

  sections.push(...groupEmotesForGrid(packages, query, packageId));

  return sections;
}

export function toggleFavoriteEmote(
  favorites: string[],
  unique: string,
  limit = 24,
): string[] {
  const trimmed = unique.trim();
  const normalized = favorites
    .map((favorite) => favorite.trim())
    .filter(
      (favorite, index, all) => favorite && all.indexOf(favorite) === index,
    );

  if (!trimmed) return normalized.slice(0, limit);

  if (normalized.includes(trimmed)) {
    return normalized.filter((favorite) => favorite !== trimmed);
  }

  return [trimmed, ...normalized].slice(0, limit);
}

export function isLockedEmote(emote: Pick<BilibiliEmoticon, "perm">): boolean {
  return emote.perm === 0;
}

export function getLockedEmoteReason(
  emote: Pick<BilibiliEmoticon, "unlock_show_text">,
): string {
  const unlockText = emote.unlock_show_text?.trim();
  return unlockText ? `需要${unlockText}` : "权限不足";
}
