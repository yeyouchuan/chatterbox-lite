import { getFixedPopoverStyle } from '../src/lib/popover-position'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const topStyle = getFixedPopoverStyle({
  triggerRect: { top: 300, right: 160, bottom: 330, left: 100, width: 60, height: 30 },
  side: 'top',
  align: 'start',
  viewportWidth: 800,
  viewportHeight: 600,
  offset: 4,
  viewportMargin: 8,
})

assert(topStyle.position === 'fixed', 'portal popovers should use fixed positioning')
assert(topStyle.left === '100px', 'start-aligned popovers should align to the trigger left edge')
assert(topStyle.bottom === '304px', 'top popovers should grow upward from the trigger')
assert(topStyle.maxHeight === '288px', 'top popovers should stay inside the viewport')

const bottomEndStyle = getFixedPopoverStyle({
  triggerRect: { top: 12, right: 790, bottom: 42, left: 730, width: 60, height: 30 },
  side: 'bottom',
  align: 'end',
  viewportWidth: 800,
  viewportHeight: 600,
  offset: 4,
  viewportMargin: 8,
})

assert(bottomEndStyle.top === '46px', 'bottom popovers should grow downward from the trigger')
assert(bottomEndStyle.right === '10px', 'end-aligned popovers should align to the trigger right edge')
assert(bottomEndStyle.maxHeight === '546px', 'bottom popovers should cap height to the viewport')

console.log('Popover position tests passed')
