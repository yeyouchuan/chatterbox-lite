import { signal } from '@preact/signals'

import type { BilibiliUser, FertilityStatus, FertilityUserResponse } from '../types'

import { BASE_URL } from './const'
import { infoFertilityEnabled, infoGuildEnabled, infoMcnEnabled } from './store'

export type FertilityData = FertilityUserResponse
export type BilibiliUserData = BilibiliUser

export const infoCurrentUid = signal<number | null>(null)

export const fertilityData = signal<FertilityData | null>(null)
export const fertilityLoading = signal(false)
export const fertilityError = signal<string | null>(null)

export const bilibiliUserData = signal<BilibiliUserData | null>(null)
export const bilibiliUserLoading = signal(false)
export const bilibiliUserError = signal<string | null>(null)

const fertilityInFlight = new Map<number, Promise<void>>()
const bilibiliUserInFlight = new Map<number, Promise<void>>()

const fertilityCache = new Map<number, FertilityData | null>()
const bilibiliUserCache = new Map<number, BilibiliUserData | null>()

async function fetchFertility(uid: number): Promise<void> {
  if (fertilityCache.has(uid)) {
    fertilityData.value = fertilityCache.get(uid) ?? null
    return
  }

  const existing = fertilityInFlight.get(uid)
  if (existing) return existing

  fertilityLoading.value = true
  fertilityError.value = null

  const request = (async () => {
    try {
      const resp = await fetch(`${BASE_URL.LAPLACE_FERTILITY}/${uid}`)
      if (resp.status === 404) {
        fertilityCache.set(uid, null)
        fertilityData.value = null
        return
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`)
      const json = (await resp.json()) as FertilityData
      fertilityCache.set(uid, json)
      fertilityData.value = json
    } catch (err) {
      fertilityError.value = err instanceof Error ? err.message : String(err)
      fertilityData.value = null
    } finally {
      fertilityLoading.value = false
      fertilityInFlight.delete(uid)
    }
  })()

  fertilityInFlight.set(uid, request)
  return request
}

async function fetchBilibiliUser(uid: number): Promise<void> {
  if (bilibiliUserCache.has(uid)) {
    bilibiliUserData.value = bilibiliUserCache.get(uid) ?? null
    return
  }

  const existing = bilibiliUserInFlight.get(uid)
  if (existing) return existing

  bilibiliUserLoading.value = true
  bilibiliUserError.value = null

  const request = (async () => {
    try {
      const resp = await fetch(`${BASE_URL.LAPLACE_BILIBILI_USER}/${uid}`)
      if (resp.status === 404) {
        bilibiliUserCache.set(uid, null)
        bilibiliUserData.value = null
        return
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`)
      const json = (await resp.json()) as BilibiliUserData
      bilibiliUserCache.set(uid, json)
      bilibiliUserData.value = json
    } catch (err) {
      bilibiliUserError.value = err instanceof Error ? err.message : String(err)
      bilibiliUserData.value = null
    } finally {
      bilibiliUserLoading.value = false
      bilibiliUserInFlight.delete(uid)
    }
  })()

  bilibiliUserInFlight.set(uid, request)
  return request
}

export function ensureInfoData(uid: number | null): void {
  if (uid === null) return
  if (infoFertilityEnabled.value) void fetchFertility(uid)
  if (infoGuildEnabled.value || infoMcnEnabled.value) void fetchBilibiliUser(uid)
}

export function resetInfoData(): void {
  fertilityData.value = null
  fertilityError.value = null
  bilibiliUserData.value = null
  bilibiliUserError.value = null
}

interface FertilityDisplay {
  label: string
  emoji: string
  color: string
  bg: string
}

const FERTILITY_DISPLAY: Record<FertilityStatus, FertilityDisplay> = {
  menstruating: { label: '魔法期', emoji: '🩸', color: '#e74c3c', bg: 'rgba(231,76,60,.15)' },
  ovulating: { label: '排卵期', emoji: '🥚', color: '#f39c12', bg: 'rgba(243,156,18,.15)' },
  fertile: { label: '易孕期', emoji: '🌸', color: '#e91e63', bg: 'rgba(233,30,99,.15)' },
  normal: { label: '安全期', emoji: '💚', color: '#2ecc71', bg: 'rgba(46,204,113,.15)' },
}

export function getFertilityDisplay(status: FertilityStatus): FertilityDisplay {
  return FERTILITY_DISPLAY[status] ?? FERTILITY_DISPLAY.normal
}
