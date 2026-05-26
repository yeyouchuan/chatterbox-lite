import type { InputHTMLAttributes } from 'preact'

import { cn } from '../../lib/cn'

// `size` on a native <input> is the rendered character-count attribute (e.g.
// <input size={20}>). Drop it from the surface API to avoid confusion with
// shadcn-style `size` props on other components.
type InputBase = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'class' | 'className'>

export interface InputProps extends InputBase {
  className?: string
}

export function Input({ type = 'text', disabled, className, ...props }: InputProps) {
  return (
    <input
      type={type}
      disabled={disabled}
      class={cn(
        'box-border w-full min-w-0',
        'px-1 py-px',
        'rounded-lg border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid',
        'bg-acrylic-control text-inherit backdrop-blur-md',
        'min-h-5 leading-none outline-none',
        'placeholder:text-ga5',
        'cursor-text disabled:cursor-not-allowed disabled:opacity-60',
        'shadow-none',
        'transition-[border-color,outline-color,box-shadow] duration-150 ease-out',
        'focus:border-brand',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        'focus-visible:ring-2 focus-visible:ring-brand/15',
        className
      )}
      {...props}
    />
  )
}
