import { signal } from '@preact/signals'

import type { BilibiliEmoticonPackage, RemoteKeywords, ReplacementRule } from '../types'

import {
  DIALOG_DEFAULT_WIDTH,
  getInitialDialogWidth,
  OLD_DIALOG_DEFAULT_WIDTH,
  PREVIOUS_DIALOG_DEFAULT_WIDTH,
} from './dialog-width'
import { getStoredValue, gmSignal, setStoredValue } from './gm-signal'

const storedDialogWidth = getStoredValue<number | undefined>('dialogWidth', undefined)
const initialDialogWidth = getInitialDialogWidth(storedDialogWidth)
if (
  storedDialogWidth === OLD_DIALOG_DEFAULT_WIDTH ||
  storedDialogWidth === PREVIOUS_DIALOG_DEFAULT_WIDTH ||
  storedDialogWidth === 382
) {
  setStoredValue('dialogWidth', DIALOG_DEFAULT_WIDTH)
}

export const msgSendInterval = gmSignal('msgSendInterval', 1)
export const maxLength = gmSignal('maxLength', 38)
export const audioOnlyEnabled = gmSignal('audioOnlyEnabled', false)
export const dialogOpen = gmSignal('dialogOpen', false)
export const dialogWidth = gmSignal('dialogWidth', initialDialogWidth)
export const dialogLeft = gmSignal<number | null>('dialogLeft', null)
export const dialogTop = gmSignal<number | null>('dialogTop', null)
export const normalSendPanelOpen = gmSignal('normalSendPanelOpen', true)
export const replacementPanelOpen = gmSignal('replacementPanelOpen', true)
export const logPanelOpen = gmSignal('logPanelOpen', false)
export const settingsPanelOpen = gmSignal('settingsPanelOpen', false)
export const showAudioOnlyButton = gmSignal('showAudioOnlyButton', true)
export const showNormalSendPanel = gmSignal('showNormalSendPanel', true)
export const showReplacementPanel = gmSignal('showReplacementPanel', true)
export const showLogPanel = gmSignal('showLogPanel', true)
export const blockedRetryEnabled = gmSignal('blockedRetryEnabled', false)
export const pinnedEmoticonUniques = gmSignal<string[]>('pinnedEmoticonUniques', [])
export const danmakuDirectEnabled = gmSignal('danmakuDirectEnabled', true)
export const sendHistory = gmSignal<string[]>('sendHistory', [])
export const infoFertilityEnabled = gmSignal('infoFertilityEnabled', false)
export const infoGuildEnabled = gmSignal('infoGuildEnabled', false)
export const infoMcnEnabled = gmSignal('infoMcnEnabled', false)

export const localGlobalRules = gmSignal<ReplacementRule[]>('localGlobalRules', [])
export const localRoomRules = gmSignal<Record<string, ReplacementRule[]>>('localRoomRules', {})
export const remoteKeywords = gmSignal<RemoteKeywords | null>('remoteKeywords', null)
export const remoteKeywordsLastSync = gmSignal<number | null>('remoteKeywordsLastSync', null)

export const cachedRoomId = signal<number | null>(null)
export const cachedStreamerUid = signal<number | null>(null)
export const cachedEmoticonPackages = signal<BilibiliEmoticonPackage[]>([])
export const replacementMap = signal<Map<string, string> | null>(null)
export const fasongText = signal('')
