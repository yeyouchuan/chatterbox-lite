const STORAGE_KEY = "chatterbox-lite:raycast:state:v1";

export const RECENT_TEXT_LIMIT = 8;
export const RECENT_EMOTE_LIMIT = 16;
export const FAVORITE_EMOTE_LIMIT = 24;
export const DEFAULT_MODE_VALUE = "emote:all";

export interface ChatterboxStorageState {
  recentTextMessages: string[];
  recentEmoteUniques: string[];
  favoriteEmoteUniques: string[];
  lastModeValue: string;
}

export const DEFAULT_CHATTERBOX_STORAGE: ChatterboxStorageState = {
  recentTextMessages: [],
  recentEmoteUniques: [],
  favoriteEmoteUniques: [],
  lastModeValue: DEFAULT_MODE_VALUE,
};

function cloneDefaultStorage(): ChatterboxStorageState {
  return {
    recentTextMessages: [],
    recentEmoteUniques: [],
    favoriteEmoteUniques: [],
    lastModeValue: DEFAULT_MODE_VALUE,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeModeValue(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_MODE_VALUE;

  const trimmed = value.trim();
  if (trimmed === "emote:all" || trimmed.startsWith("emote:")) {
    return trimmed;
  }

  return DEFAULT_MODE_VALUE;
}

export function normalizeStoredStringList(
  value: unknown,
  limit: number,
): string[] {
  if (!Array.isArray(value)) return [];

  const result: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") continue;

    const trimmed = item.trim();
    if (!trimmed || result.includes(trimmed)) continue;

    result.push(trimmed);
    if (result.length >= limit) break;
  }

  return result;
}

export function addRecentItem(
  items: string[],
  item: string,
  limit: number,
): string[] {
  const trimmed = item.trim();
  const normalized = normalizeStoredStringList(items, limit);
  if (!trimmed) return normalized;

  return [
    trimmed,
    ...normalized.filter((existing) => existing !== trimmed),
  ].slice(0, limit);
}

export function toggleStoredItem(
  items: string[],
  item: string,
  limit: number,
): string[] {
  const trimmed = item.trim();
  const normalized = normalizeStoredStringList(items, limit);
  if (!trimmed) return normalized;

  if (normalized.includes(trimmed)) {
    return normalized.filter((existing) => existing !== trimmed);
  }

  return [trimmed, ...normalized].slice(0, limit);
}

export function parseChatterboxStorage(raw: unknown): ChatterboxStorageState {
  if (typeof raw !== "string") return cloneDefaultStorage();

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed)) return cloneDefaultStorage();

    return {
      recentTextMessages: normalizeStoredStringList(
        parsed.recentTextMessages,
        RECENT_TEXT_LIMIT,
      ),
      recentEmoteUniques: normalizeStoredStringList(
        parsed.recentEmoteUniques,
        RECENT_EMOTE_LIMIT,
      ),
      favoriteEmoteUniques: normalizeStoredStringList(
        parsed.favoriteEmoteUniques,
        FAVORITE_EMOTE_LIMIT,
      ),
      lastModeValue: normalizeModeValue(parsed.lastModeValue),
    };
  } catch {
    return cloneDefaultStorage();
  }
}

function normalizeChatterboxStorage(
  state: ChatterboxStorageState,
): ChatterboxStorageState {
  return {
    recentTextMessages: normalizeStoredStringList(
      state.recentTextMessages,
      RECENT_TEXT_LIMIT,
    ),
    recentEmoteUniques: normalizeStoredStringList(
      state.recentEmoteUniques,
      RECENT_EMOTE_LIMIT,
    ),
    favoriteEmoteUniques: normalizeStoredStringList(
      state.favoriteEmoteUniques,
      FAVORITE_EMOTE_LIMIT,
    ),
    lastModeValue: normalizeModeValue(state.lastModeValue),
  };
}

export async function loadChatterboxStorage(): Promise<ChatterboxStorageState> {
  const { LocalStorage } = await import("@raycast/api");
  return parseChatterboxStorage(
    await LocalStorage.getItem<string>(STORAGE_KEY),
  );
}

export async function saveChatterboxStorage(
  state: ChatterboxStorageState,
): Promise<void> {
  const { LocalStorage } = await import("@raycast/api");
  await LocalStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(normalizeChatterboxStorage(state)),
  );
}
