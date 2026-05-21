const SPEEDUP_LADDER: ReadonlyArray<readonly [number, number]> = [
  [2, 1.3],
  [1, 1.2],
  [0, 1.1],
]

const SLOWDOWN_LADDER: ReadonlyArray<readonly [number, number]> = [
  [0.2, 0.1],
  [0.3, 0.3],
  [0.6, 0.6],
]

export interface AutoSeekRateInput {
  bufferLen: number
  threshold: number
  currentRate: number
}

export function getAutoSeekPlaybackRate({ bufferLen, threshold, currentRate }: AutoSeekRateInput): number {
  if (!Number.isFinite(threshold) || threshold <= 0) return currentRate

  for (const [bufferLimit, rate] of SLOWDOWN_LADDER) {
    if (bufferLen < bufferLimit) return rate
  }

  const over = bufferLen - threshold
  for (const [delta, rate] of SPEEDUP_LADDER) {
    if (over > delta) return rate
  }

  return 1
}
