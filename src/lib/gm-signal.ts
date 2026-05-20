import { effect, signal } from '@preact/signals'

const STORAGE_PREFIX = 'chatterbox-lite:'

function canUseGmStorage(): boolean {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function'
}

function readLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return raw === null ? defaultValue : (JSON.parse(raw) as T)
  } catch {
    return defaultValue
  }
}

function writeLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
  } catch {
    // localStorage may be unavailable in restricted contexts.
  }
}

export function getStoredValue<T>(key: string, defaultValue: T): T {
  if (canUseGmStorage()) return GM_getValue(key, defaultValue)
  return readLocalStorage(key, defaultValue)
}

export function setStoredValue<T>(key: string, value: T): void {
  if (canUseGmStorage()) {
    GM_setValue(key, value)
    return
  }
  writeLocalStorage(key, value)
}

/**
 * Creates a signal whose value is read from and persisted to GM storage
 * under the given key. Desktop renderer builds fall back to localStorage.
 */
export function gmSignal<T>(key: string, defaultValue: T) {
  const s = signal<T>(getStoredValue(key, defaultValue))
  effect(() => setStoredValue(key, s.value))
  return s
}
