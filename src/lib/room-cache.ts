import { extractRoomNumber } from './utils'

export function getRoomCacheKey(url: string): string | null {
  return extractRoomNumber(url) ?? null
}

export function shouldRefreshRoomCache(cachedRoomKey: string | null, currentRoomKey: string | null): boolean {
  return cachedRoomKey !== currentRoomKey
}
