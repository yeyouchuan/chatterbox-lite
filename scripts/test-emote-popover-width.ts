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
assert(
  source.includes('grid grid-cols-[repeat(auto-fit,minmax(52px,1fr))] gap-x-1 gap-y-0.5'),
  'emote grid should keep compact default density and expand as the dialog widens'
)
assert(!source.includes('grid grid-cols-6'), 'emote grid should not stay locked to six fixed columns')
assert(source.includes('size-[52px]'), 'emote buttons should be compact enough for six columns')
assert(source.includes('[scrollbar-width:thin]'), 'emote popover should use a thinner scrollbar')
assert(source.includes('[&::-webkit-scrollbar]:w-1.5'), 'emote popover should thin WebKit scrollbars')
assert(source.includes('--chatterbox-lite-pin-active'), 'pinned emote buttons should use a muted pin color')
assert(
  !source.includes("isPinned ? 'border-brand text-brand'"),
  'pinned emote buttons should not use the full brand blue'
)

console.log('Emote popover width tests passed')
