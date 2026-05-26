import { signal } from '@preact/signals'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  description?: string
}

export interface ShowToastInput {
  type?: ToastType
  title: string
  description?: string
  duration?: number
}

const TOAST_LIMIT = 4
const DEFAULT_DURATION_MS = 3200

let nextToastId = 1

export const toastMessages = signal<ToastMessage[]>([])

export function dismissToast(id: string): void {
  toastMessages.value = toastMessages.value.filter(toast => toast.id !== id)
}

export function showToast({
  type = 'info',
  title,
  description,
  duration = DEFAULT_DURATION_MS,
}: ShowToastInput): string {
  const id = `toast-${nextToastId++}`
  toastMessages.value = [{ id, type, title, description }, ...toastMessages.value].slice(0, TOAST_LIMIT)

  window.setTimeout(() => {
    dismissToast(id)
  }, duration)

  return id
}
