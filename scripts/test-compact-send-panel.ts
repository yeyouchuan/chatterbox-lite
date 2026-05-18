import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/components/normal-send-tab.tsx', 'utf8')

assert(!source.includes('AccordionTrigger'), 'send panel should not render an accordion title row')
assert(!source.includes('normalSendPanelOpen'), 'send panel should not keep its own collapse state')
assert(!source.includes('Enter 发送'), 'send panel should not show Enter shortcut copy')
assert(!source.includes('Shift+Enter'), 'send panel should not show Shift+Enter shortcut copy')
assert(source.includes("className='h-12 resize-none pr-10'"), 'send textarea should use the compact height')

console.log('Compact send panel tests passed')
