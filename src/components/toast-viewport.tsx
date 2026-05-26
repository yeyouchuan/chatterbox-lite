import { CheckCircleIcon, InfoIcon, WarningCircleIcon, XCircleIcon, XIcon } from '@phosphor-icons/react'

import { cn } from '../lib/cn'
import { dismissToast, type ToastType, toastMessages } from '../lib/toast'

const ICONS = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: WarningCircleIcon,
  info: InfoIcon,
} as const

const TYPE_CLASS: Record<ToastType, string> = {
  success: 'text-[color:var(--chatterbox-lite-status-success)]',
  error: 'text-[color:var(--chatterbox-lite-status-danger)]',
  warning: 'text-[color:var(--chatterbox-lite-status-warning)]',
  info: 'text-brand',
}

export function ToastViewport() {
  const toasts = toastMessages.value
  if (toasts.length === 0) return null

  return (
    <div
      class='pointer-events-none fixed right-3 bottom-3 z-2147483647 flex w-[min(320px,calc(100vw-24px))] flex-col gap-2'
      aria-live='polite'
      aria-atomic='false'
    >
      {toasts.map(toast => {
        const Icon = ICONS[toast.type]
        return (
          <div
            key={toast.id}
            class='pointer-events-auto flex items-start gap-2 rounded-lg border border-[color:var(--chatterbox-lite-toast-border)] border-solid bg-[color:var(--chatterbox-lite-toast-surface)] p-2.5 text-[12px] text-[color:var(--chatterbox-lite-text)] shadow-[var(--chatterbox-lite-toast-shadow)] backdrop-blur-xl backdrop-saturate-150'
          >
            <Icon className={cn('mt-0.5 size-4 shrink-0', TYPE_CLASS[toast.type])} weight='bold' aria-hidden='true' />
            <div class='min-w-0 flex-1'>
              <div class='truncate font-semibold leading-snug'>{toast.title}</div>
              {toast.description && (
                <div class='mt-0.5 line-clamp-2 text-[color:var(--chatterbox-lite-muted)] leading-snug'>
                  {toast.description}
                </div>
              )}
            </div>
            <button
              type='button'
              class='m-0 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent border-solid bg-transparent p-0 text-[color:var(--chatterbox-lite-subtle)] transition-colors hover:bg-acrylic-control hover:text-[color:var(--chatterbox-lite-text)]'
              aria-label='关闭提示'
              onClick={() => dismissToast(toast.id)}
            >
              <XIcon size={12} weight='bold' aria-hidden='true' />
            </button>
          </div>
        )
      })}
    </div>
  )
}
