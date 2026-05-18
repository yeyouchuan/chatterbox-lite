import { focusTextareaAfterSend } from '../src/lib/focus-after-send'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

let scheduled: (() => void) | null = null
const calls: string[] = []
const textarea = {
  disabled: false,
  isConnected: true,
  value: 'next message',
  focus: () => calls.push('focus'),
  setSelectionRange: (start: number, end: number) => calls.push(`selection:${start}:${end}`),
} as HTMLTextAreaElement

focusTextareaAfterSend(textarea, cb => {
  scheduled = cb
  return 1
})

assert(scheduled !== null, 'should defer focus until the textarea is enabled again')
scheduled()
assert(calls[0] === 'focus', 'should restore textarea focus')
assert(calls[1] === 'selection:12:12', 'should move the cursor to the end of the current draft')

calls.length = 0
focusTextareaAfterSend({ ...textarea, disabled: true } as HTMLTextAreaElement, cb => {
  cb()
  return 1
})
assert(calls.length === 0, 'should not focus while the textarea is still disabled')

console.log('Focus after send tests passed')
