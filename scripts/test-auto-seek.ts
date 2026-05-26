import { readFileSync } from 'node:fs'

import { getAutoSeekPlaybackRate } from '../src/lib/auto-seek-rate'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(
  getAutoSeekPlaybackRate({ bufferLen: 4.1, threshold: 1.7, currentRate: 1 }) === 1.3,
  'large latency should use 1.3x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 3.0, threshold: 1.7, currentRate: 1 }) === 1.2,
  'medium latency should use 1.2x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 2.0, threshold: 1.7, currentRate: 1 }) === 1.1,
  'small latency should use 1.1x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 1.6, threshold: 1.7, currentRate: 1.2 }) === 1,
  'near target latency should restore 1x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 0.5, threshold: 1.7, currentRate: 1.2 }) === 0.6,
  'low buffer should slow to 0.6x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 0.25, threshold: 1.7, currentRate: 1.2 }) === 0.3,
  'very low buffer should slow to 0.3x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 0.1, threshold: 1.7, currentRate: 1.2 }) === 0.1,
  'critical buffer should slow to 0.1x'
)
assert(
  getAutoSeekPlaybackRate({ bufferLen: 5, threshold: 0, currentRate: 1.2 }) === 1.2,
  'invalid threshold should keep current rate'
)

const autoSeekSource = readFileSync('src/lib/auto-seek.ts', 'utf8')
const autoSeekRateSource = readFileSync('src/lib/auto-seek-rate.ts', 'utf8')
const appSource = readFileSync('src/components/app.tsx', 'utf8')
const settingsSource = readFileSync('src/components/settings-panel.tsx', 'utf8')
const storeSource = readFileSync('src/lib/store.ts', 'utf8')
const audioOnlySource = readFileSync('src/lib/audio-only.ts', 'utf8')
const bridgeProtocolSource = readFileSync('src/lib/bridge-protocol.ts', 'utf8')
const bridgeAgentSource = readFileSync('src/lib/desktop-bridge-agent.ts', 'utf8')
const settingsSnapshotSource = readFileSync('src/lib/settings-snapshot.ts', 'utf8')

assert(
  autoSeekSource.includes('MutationObserver'),
  'auto-seek should reattach when Bilibili replaces the media element'
)
assert(
  autoSeekSource.includes('getAutoSeekPlaybackRate'),
  'auto-seek runtime should use the tested playback-rate ladder'
)
assert(autoSeekRateSource.includes('SPEEDUP_LADDER'), 'auto-seek rate helper should keep the speedup ladder explicit')
assert(autoSeekSource.includes('visibilitychange'), 'auto-seek should resync when a hidden tab becomes visible again')
assert(
  autoSeekSource.includes("querySelector<HTMLVideoElement>('#live-player video')"),
  'auto-seek should target the live player video'
)
assert(
  autoSeekSource.includes('audioOnlyEnabled.value'),
  'auto-seek should follow the hidden audio stream in audio-only mode'
)
assert(appSource.includes('startAutoSeek()'), 'app should mount auto-seek once on live pages')
assert(appSource.includes('stopAutoSeek()'), 'app should clean up auto-seek on unmount')
assert(settingsSource.includes('autoSeekEnabled'), 'settings should expose the auto-seek toggle')
assert(settingsSource.includes('autoSeekBufferThreshold'), 'settings should expose the target latency input')
assert(storeSource.includes("gmSignal('autoSeekEnabled'"), 'auto-seek enabled state should persist')
assert(storeSource.includes("gmSignal('autoSeekBufferThreshold'"), 'auto-seek target latency should persist')
assert(audioOnlySource.includes('export const AUDIO_EL_ID'), 'audio-only stream id should be shared with auto-seek')
assert(
  bridgeProtocolSource.includes('updateAutoSeekSettings'),
  'desktop bridge should define an auto-seek settings sync command'
)
assert(
  bridgeAgentSource.includes('updateAutoSeekSettings'),
  'live page bridge agent should apply desktop auto-seek setting updates'
)
assert(
  !settingsSource.includes('syncDesktopAutoSeekSettings'),
  'settings panel should not depend on the removed desktop renderer runtime'
)
assert(settingsSnapshotSource.includes('autoSeekEnabled'), 'settings snapshot should include auto-seek enabled state')
assert(
  settingsSnapshotSource.includes('autoSeekBufferThreshold'),
  'settings snapshot should include auto-seek target latency'
)

console.log('Auto-seek tests passed')
