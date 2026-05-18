import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/components/configurator.tsx', 'utf8')

assert(
  /<PopoverContent\s+side='bottom'\s+align='end'\s+portal\s+className='w-\[230px\]'>/.test(source),
  'settings popover should use the portal layer so it is not clipped by the dialog'
)
assert(
  source.includes("class='overflow-y-auto p-2'"),
  'settings popover should scroll its own content when viewport space is short'
)
assert(
  source.includes("maxHeight: 'min(320px, var(--chatterbox-lite-popover-max-height, 44vh))'"),
  'settings popover should cap height to the available portal viewport space'
)

console.log('Settings popover tests passed')
