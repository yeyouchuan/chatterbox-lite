import { effect } from '@preact/signals'

import { AUDIO_EL_ID } from './audio-only'
import { getAutoSeekPlaybackRate } from './auto-seek-rate'
import {
  audioOnlyEnabled,
  autoSeekBufferThreshold,
  autoSeekCurrentBufferLen,
  autoSeekCurrentRate,
  autoSeekEnabled,
} from './store'

const TICK_THROTTLE_MS = 80
const RATE_EPSILON = 0.005
const EVENTS_OF_INTEREST: ReadonlyArray<keyof HTMLMediaElementEventMap> = [
  'progress',
  'waiting',
  'timeupdate',
  'playing',
  'ratechange',
]

let attachedMedia: HTMLMediaElement | null = null
let containerObserver: MutationObserver | null = null
let lastTickAt = 0
let pendingTickTimer: ReturnType<typeof setTimeout> | null = null
let stateEffectDispose: (() => void) | null = null

function getMediaTarget(): HTMLMediaElement | null {
  if (audioOnlyEnabled.value) {
    const el = document.getElementById(AUDIO_EL_ID)
    return el instanceof HTMLAudioElement ? el : null
  }
  return document.querySelector<HTMLVideoElement>('#live-player video')
}

function getBufferLen(media: HTMLMediaElement): number | null {
  try {
    if (media.buffered.length === 0) return null
    const len = media.buffered.end(media.buffered.length - 1) - media.currentTime
    return Number.isFinite(len) ? len : null
  } catch {
    return null
  }
}

function setRate(media: HTMLMediaElement, rate: number): void {
  if (Math.abs(media.playbackRate - rate) < RATE_EPSILON) {
    autoSeekCurrentRate.value = media.playbackRate
    return
  }
  media.playbackRate = rate
  autoSeekCurrentRate.value = rate
}

function tick(): void {
  if (document.hidden) return

  const media = getMediaTarget()
  if (!media) return

  const bufferLen = getBufferLen(media)
  if (bufferLen !== null) autoSeekCurrentBufferLen.value = bufferLen

  if (media.paused || bufferLen === null) {
    autoSeekCurrentRate.value = media.playbackRate
    return
  }

  setRate(
    media,
    getAutoSeekPlaybackRate({
      bufferLen,
      threshold: autoSeekBufferThreshold.value,
      currentRate: media.playbackRate,
    })
  )
}

function scheduleTick(): void {
  const now = Date.now()
  const elapsed = now - lastTickAt
  if (elapsed >= TICK_THROTTLE_MS) {
    lastTickAt = now
    tick()
    return
  }

  if (pendingTickTimer !== null) return
  pendingTickTimer = setTimeout(() => {
    pendingTickTimer = null
    lastTickAt = Date.now()
    tick()
  }, TICK_THROTTLE_MS - elapsed)
}

function attachListeners(media: HTMLMediaElement): void {
  if (attachedMedia === media) return
  detachListeners()
  for (const evt of EVENTS_OF_INTEREST) {
    media.addEventListener(evt, scheduleTick, { passive: true })
  }
  attachedMedia = media
  scheduleTick()
}

function detachListeners(): void {
  if (!attachedMedia) return
  for (const evt of EVENTS_OF_INTEREST) {
    attachedMedia.removeEventListener(evt, scheduleTick)
  }
  attachedMedia = null
}

function resetMetrics(): void {
  autoSeekCurrentBufferLen.value = 0
  autoSeekCurrentRate.value = 1
}

function applyCurrentTarget(): void {
  const target = getMediaTarget()
  if (target) {
    attachListeners(target)
    return
  }

  if (attachedMedia) detachListeners()
  resetMetrics()
}

function ensureContainerObserver(): void {
  if (containerObserver) return
  applyCurrentTarget()
  containerObserver = new MutationObserver(applyCurrentTarget)
  containerObserver.observe(document.documentElement, { childList: true, subtree: true })
}

function destroyContainerObserver(): void {
  containerObserver?.disconnect()
  containerObserver = null
}

function clearPendingTick(): void {
  if (pendingTickTimer === null) return
  clearTimeout(pendingTickTimer)
  pendingTickTimer = null
}

function resetMediaRate(): void {
  const video = document.querySelector<HTMLVideoElement>('#live-player video')
  if (video && Math.abs(video.playbackRate - 1) > RATE_EPSILON) video.playbackRate = 1

  const audio = document.getElementById(AUDIO_EL_ID)
  if (audio instanceof HTMLAudioElement && Math.abs(audio.playbackRate - 1) > RATE_EPSILON) audio.playbackRate = 1
}

function onVisibilityChange(): void {
  if (!document.hidden) scheduleTick()
}

export function startAutoSeek(): void {
  if (stateEffectDispose) return
  stateEffectDispose = effect(() => {
    const enabled = autoSeekEnabled.value
    void audioOnlyEnabled.value

    if (enabled) {
      ensureContainerObserver()
      applyCurrentTarget()
      document.addEventListener('visibilitychange', onVisibilityChange)
      return
    }

    destroyContainerObserver()
    detachListeners()
    clearPendingTick()
    document.removeEventListener('visibilitychange', onVisibilityChange)
    resetMetrics()
    resetMediaRate()
  })
}

export function stopAutoSeek(): void {
  stateEffectDispose?.()
  stateEffectDispose = null
  destroyContainerObserver()
  detachListeners()
  clearPendingTick()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  resetMetrics()
  resetMediaRate()
}
