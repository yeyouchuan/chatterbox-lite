import type { TextareaHTMLAttributes } from 'preact'
import { forwardRef } from 'preact/compat'

import { cn } from '../../lib/cn'

type TextareaBase = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'class' | 'className'>

export interface TextareaProps extends TextareaBase {
  className?: string
}

// Wrapped in `forwardRef` so consumers (e.g. LogPanel's auto-scroll
// useEffect) can attach a ref to the underlying <textarea>. Preact 10
// strips `ref` from the props of a plain function component during
// `createElement`, so without forwardRef the ref silently never reaches
// the DOM and `ref.current` stays null.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { disabled, className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      disabled={disabled}
      class={cn(
        'box-border w-full',
        'px-2 py-1.5',
        'rounded-lg border border-ga3 border-solid',
        'bg-bg1 text-inherit',
        'leading-[1.4] outline-none',
        'placeholder:text-ga5',
        'min-h-10 resize-y',
        'cursor-text disabled:cursor-not-allowed disabled:opacity-60',
        'shadow-[inset_0_1px_0_rgba(0,0,0,.03)]',
        'transition-[border-color,outline-color,box-shadow] duration-150 ease-out',
        'focus:border-brand',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        'focus-visible:ring-2 focus-visible:ring-brand/15',
        className
      )}
      {...props}
    />
  )
})
