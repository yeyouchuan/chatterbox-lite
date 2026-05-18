type ScheduleFocus = (callback: () => void) => number

const scheduleNextFrame: ScheduleFocus = callback => window.requestAnimationFrame(callback)

export function focusTextareaAfterSend(
  textarea: HTMLTextAreaElement | null,
  schedule: ScheduleFocus = scheduleNextFrame
): void {
  if (!textarea) return

  schedule(() => {
    if (!textarea.isConnected || textarea.disabled) return

    textarea.focus()

    const cursor = textarea.value.length
    try {
      textarea.setSelectionRange(cursor, cursor)
    } catch {
      // Some browser/input states can reject selection changes; focus is the important part.
    }
  })
}
