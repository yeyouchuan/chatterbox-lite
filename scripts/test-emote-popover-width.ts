import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/components/emote-selector.tsx', 'utf8')

assert(
  source.includes("className='w-[calc(var(--chatterbox-lite-dialog-width)-24px)]'"),
  'emote popover should match the dialog content width instead of using a wide fixed cap'
)
assert(!source.includes('w-[min(460px'), 'emote popover should not use the wide 460px cap')
assert(source.includes('portal'), 'emote popover should still use portal positioning')

console.log('Emote popover width tests passed')
