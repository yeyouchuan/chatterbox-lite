import type { RemoteKeywords } from '../types'

import { BASE_URL } from './const'
import {
  cachedRoomId,
  localGlobalRules,
  localRoomRules,
  remoteKeywords,
  remoteKeywordsLastSync,
  replacementMap,
} from './store'

export const REMOTE_KEYWORDS_SYNC_INTERVAL_MS = 10 * 60 * 1000

let backgroundSyncPromise: Promise<void> | null = null

export async function fetchRemoteKeywords(): Promise<RemoteKeywords> {
  const response = await fetch(BASE_URL.REMOTE_KEYWORDS)
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  return await response.json()
}

export async function syncRemoteKeywords(): Promise<void> {
  remoteKeywords.value = await fetchRemoteKeywords()
  remoteKeywordsLastSync.value = Date.now()
  buildReplacementMap()
}

export async function ensureRemoteKeywordsSynced(force = false): Promise<void> {
  const last = remoteKeywordsLastSync.value
  if (force || !last || Date.now() - last > REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
    await syncRemoteKeywords()
    return
  }

  buildReplacementMap()
}

export function warmRemoteKeywordsInBackground(force = false): void {
  const last = remoteKeywordsLastSync.value
  if (!force && last && Date.now() - last <= REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
    buildReplacementMap()
    return
  }

  if (backgroundSyncPromise) return
  backgroundSyncPromise = syncRemoteKeywords()
    .catch(() => {
      buildReplacementMap()
    })
    .finally(() => {
      backgroundSyncPromise = null
    })
}

/**
 * Builds the replacement map from remote and local rules.
 * Priority: remote global < remote room < local global < local room.
 */
export function buildReplacementMap(): void {
  const map = new Map<string, string>()

  const rk = remoteKeywords.value
  if (rk) {
    const globalKeywords = rk.global?.keywords ?? {}
    for (const [from, to] of Object.entries(globalKeywords)) {
      if (from) map.set(from, to)
    }

    const rid = cachedRoomId.value
    if (rid !== null) {
      const roomData = rk.rooms?.find(r => String(r.room) === String(rid))
      const roomKeywords = roomData?.keywords ?? {}
      for (const [from, to] of Object.entries(roomKeywords)) {
        if (from) map.set(from, to)
      }
    }
  }

  for (const rule of localGlobalRules.value) {
    if (rule.from) map.set(rule.from, rule.to ?? '')
  }

  const rid = cachedRoomId.value
  if (rid !== null) {
    const roomRules = localRoomRules.value[String(rid)] ?? []
    for (const rule of roomRules) {
      if (rule.from) map.set(rule.from, rule.to ?? '')
    }
  }

  replacementMap.value = map
}

/**
 * Applies all replacement rules to the given text using the cached map.
 */
export function applyReplacements(text: string): string {
  if (replacementMap.value === null) {
    buildReplacementMap()
  }
  let result = text
  for (const [from, to] of (replacementMap.value ?? new Map<string, string>()).entries()) {
    result = result.split(from).join(to)
  }
  return result
}

export function getReplacementEntries(): Array<[string, string]> {
  if (replacementMap.value === null) {
    buildReplacementMap()
  }
  return Array.from((replacementMap.value ?? new Map<string, string>()).entries())
}
