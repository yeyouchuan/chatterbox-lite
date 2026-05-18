import type { ButtonHTMLAttributes } from 'preact'

import { cn } from '../../lib/cn'

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

// `class` is omitted to forbid the React-style `class={...}` form (consumers
// must use `className`). `className` is omitted from the base and re-declared
// as plain `string` so it can flow into cn() — the inherited Preact type is
// `Signalish<string | undefined>` which clsx/tailwind-merge can't handle.
// `style` keeps its inherited Signalish typing; we just forward it.
type ButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'class' | 'className'>

export interface ButtonProps extends ButtonBase {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const BASE_CLASS = [
  'inline-flex items-center justify-center',
  'gap-1.5 rounded-md',
  'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  'font-medium leading-[1.2]',
  'select-none whitespace-nowrap box-border',
  'outline-none',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3.5',
  'transition-[background-color,border-color,color,filter,outline-color,scale,box-shadow] duration-150 ease-out',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
  'focus-visible:ring-2 focus-visible:ring-brand/20',
  '[&:not(:disabled):hover]:brightness-[.96]',
  '[&:not(:disabled):active]:brightness-[.9]',
  'active:scale-[0.96]',
].join(' ')

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-1.5 py-px min-h-[18px] text-[12px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3',
  default: 'px-2.5 py-1 min-h-6 text-[13px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3',
  lg: 'px-3.5 py-1.5 min-h-7 text-[13px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-4',
  icon: 'p-0 w-6 h-6 [@media(pointer:coarse)]:size-11',
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: 'border border-brand border-solid bg-brand text-white shadow-[0_1px_0_rgba(0,0,0,.06)]',
  secondary: 'border border-ga3 border-solid bg-ga1s text-inherit shadow-[0_1px_0_rgba(0,0,0,.04)]',
  destructive: 'bg-transparent text-danger border border-solid border-danger',
  outline: 'border border-ga4 border-solid bg-bg1 text-inherit shadow-[0_1px_0_rgba(0,0,0,.04)]',
  ghost: 'bg-transparent text-inherit border border-solid border-transparent',
  link: 'border border-transparent border-solid bg-transparent p-0 text-link underline underline-offset-2 min-h-[auto]',
}

export function Button({
  variant = 'default',
  size = 'default',
  type = 'button',
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      class={cn(BASE_CLASS, SIZE_CLASS[size], VARIANT_CLASS[variant], className)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  )
}
