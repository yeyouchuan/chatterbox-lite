import type { BridgeSettingsSnapshot } from './bridge-protocol'

import {
  blockedRetryEnabled,
  dialogWidth,
  localGlobalRules,
  localRoomRules,
  maxLength,
  msgSendInterval,
  pinnedEmoticonUniques,
  sendHistory,
  showLogPanel,
  showNormalSendPanel,
  showReplacementPanel,
} from './store'

export function getSettingsSnapshot(): BridgeSettingsSnapshot {
  return {
    msgSendInterval: msgSendInterval.value,
    maxLength: maxLength.value,
    dialogWidth: dialogWidth.value,
    pageDevicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    pageRootFontSize:
      typeof window !== 'undefined'
        ? Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 12
        : 12,
    showNormalSendPanel: showNormalSendPanel.value,
    showReplacementPanel: showReplacementPanel.value,
    showLogPanel: showLogPanel.value,
    blockedRetryEnabled: blockedRetryEnabled.value,
    pinnedEmoticonUniques: pinnedEmoticonUniques.value,
    sendHistory: sendHistory.value,
    localGlobalRules: localGlobalRules.value,
    localRoomRules: localRoomRules.value,
  }
}

export function applySettingsSnapshot(snapshot: BridgeSettingsSnapshot): void {
  msgSendInterval.value = snapshot.msgSendInterval
  maxLength.value = snapshot.maxLength
  dialogWidth.value = snapshot.dialogWidth
  showNormalSendPanel.value = snapshot.showNormalSendPanel
  showReplacementPanel.value = snapshot.showReplacementPanel
  showLogPanel.value = snapshot.showLogPanel
  blockedRetryEnabled.value = snapshot.blockedRetryEnabled
  pinnedEmoticonUniques.value = snapshot.pinnedEmoticonUniques
  sendHistory.value = snapshot.sendHistory
  localGlobalRules.value = snapshot.localGlobalRules
  localRoomRules.value = snapshot.localRoomRules
}
