export interface SendHistoryState {
  index: number
  draft: string
}

export type SendHistoryDirection = 'older' | 'newer'

export const SEND_HISTORY_LIMIT = 30

export function addSendHistoryEntry(history: string[], message: string, limit = SEND_HISTORY_LIMIT): string[] {
  const trimmed = message.trim()
  if (!trimmed) return history
  return [trimmed, ...history.filter(item => item !== trimmed)].slice(0, limit)
}

export function navigateSendHistory(
  history: string[],
  currentText: string,
  state: SendHistoryState,
  direction: SendHistoryDirection
): { text: string; state: SendHistoryState } {
  if (history.length === 0) return { text: currentText, state }

  if (direction === 'older') {
    const nextIndex = state.index < 0 ? 0 : Math.min(state.index + 1, history.length - 1)
    return {
      text: history[nextIndex] ?? currentText,
      state: {
        index: nextIndex,
        draft: state.index < 0 ? currentText : state.draft,
      },
    }
  }

  if (state.index < 0) return { text: currentText, state }
  if (state.index === 0) {
    return {
      text: state.draft,
      state: { index: -1, draft: '' },
    }
  }

  const nextIndex = state.index - 1
  return {
    text: history[nextIndex] ?? currentText,
    state: { ...state, index: nextIndex },
  }
}
