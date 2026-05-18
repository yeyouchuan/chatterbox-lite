import { DIALOG_DEFAULT_WIDTH, getInitialDialogWidth, OLD_DIALOG_DEFAULT_WIDTH } from '../src/lib/dialog-width'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(DIALOG_DEFAULT_WIDTH - OLD_DIALOG_DEFAULT_WIDTH === 40, 'new default width should be 40px wider')
assert(getInitialDialogWidth(undefined) === DIALOG_DEFAULT_WIDTH, 'fresh installs should use the new default width')
assert(
  getInitialDialogWidth(OLD_DIALOG_DEFAULT_WIDTH) === DIALOG_DEFAULT_WIDTH,
  'old default width should migrate to the new default'
)
assert(getInitialDialogWidth(420) === 420, 'custom resized widths should be preserved')

console.log('Dialog width tests passed')
