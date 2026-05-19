import {
  DIALOG_DEFAULT_WIDTH,
  getInitialDialogWidth,
  OLD_DIALOG_DEFAULT_WIDTH,
  PREVIOUS_DIALOG_DEFAULT_WIDTH,
} from '../src/lib/dialog-width'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(DIALOG_DEFAULT_WIDTH === 382, 'dialog default width should be 382px')
assert(DIALOG_DEFAULT_WIDTH - PREVIOUS_DIALOG_DEFAULT_WIDTH === 2, 'new default width should be 2px wider')
assert(getInitialDialogWidth(undefined) === DIALOG_DEFAULT_WIDTH, 'fresh installs should use the new default width')
assert(
  getInitialDialogWidth(OLD_DIALOG_DEFAULT_WIDTH) === DIALOG_DEFAULT_WIDTH,
  'old 340px default width should migrate to the new default'
)
assert(
  getInitialDialogWidth(PREVIOUS_DIALOG_DEFAULT_WIDTH) === DIALOG_DEFAULT_WIDTH,
  'previous 380px default width should migrate to the new default'
)
assert(getInitialDialogWidth(420) === 420, 'custom resized widths should be preserved')

console.log('Dialog width tests passed')
