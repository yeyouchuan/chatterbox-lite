export type FixedPopoverSide = 'top' | 'bottom'
export type FixedPopoverAlign = 'start' | 'center' | 'end'

export interface RectLike {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export interface FixedPopoverOptions {
  triggerRect: RectLike
  side: FixedPopoverSide
  align: FixedPopoverAlign
  viewportWidth: number
  viewportHeight: number
  offset?: number
  viewportMargin?: number
}

export function getFixedPopoverStyle({
  triggerRect,
  side,
  align,
  viewportWidth,
  viewportHeight,
  offset = 4,
  viewportMargin = 8,
}: FixedPopoverOptions): Record<string, string> {
  const style: Record<string, string> = {
    position: 'fixed',
  }

  if (align === 'end') {
    style.right = `${Math.max(viewportMargin, viewportWidth - triggerRect.right)}px`
  } else if (align === 'center') {
    const center = Math.max(
      viewportMargin,
      Math.min(triggerRect.left + triggerRect.width / 2, viewportWidth - viewportMargin)
    )
    style.left = `${center}px`
    style.transform = 'translateX(-50%)'
  } else {
    style.left = `${Math.max(viewportMargin, Math.min(triggerRect.left, viewportWidth - viewportMargin))}px`
  }

  if (side === 'top') {
    style.bottom = `${Math.max(viewportMargin, viewportHeight - triggerRect.top + offset)}px`
    style.maxHeight = `${Math.max(80, triggerRect.top - viewportMargin - offset)}px`
  } else {
    style.top = `${Math.min(triggerRect.bottom + offset, viewportHeight - viewportMargin)}px`
    style.maxHeight = `${Math.max(80, viewportHeight - triggerRect.bottom - viewportMargin - offset)}px`
  }

  return style
}
