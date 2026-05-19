export const OLD_DIALOG_DEFAULT_WIDTH = 340
export const PREVIOUS_DIALOG_DEFAULT_WIDTH = 380
export const DIALOG_DEFAULT_WIDTH = 382

export function getInitialDialogWidth(storedWidth: unknown): number {
  if (storedWidth === OLD_DIALOG_DEFAULT_WIDTH || storedWidth === PREVIOUS_DIALOG_DEFAULT_WIDTH) {
    return DIALOG_DEFAULT_WIDTH
  }
  return typeof storedWidth === 'number' ? storedWidth : DIALOG_DEFAULT_WIDTH
}
