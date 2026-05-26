export type ChatterboxLiteTheme = 'light' | 'dark'

export const THEME_ATTRIBUTE = 'data-chatterbox-lite-theme'

const THEME_OBSERVED_ATTRIBUTES = ['class', 'style', 'data-theme', 'theme', 'lab-style', 'data-color-mode']
const DARK_THEME_RE = /\b(dark|black|night|dim)\b/i
const LIGHT_THEME_RE = /\b(light|white|day)\b/i

type Rgba = [number, number, number, number]

function getThemeFromText(value: string | null): ChatterboxLiteTheme | null {
  const text = value?.trim()
  if (!text) return null
  if (DARK_THEME_RE.test(text)) return 'dark'
  if (LIGHT_THEME_RE.test(text)) return 'light'
  return null
}

function parseNumber(value: string): number | null {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : null
}

function parseColorChannel(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed.endsWith('%')) {
    const parsed = parseNumber(trimmed)
    return parsed === null ? null : Math.max(0, Math.min(255, (parsed / 100) * 255))
  }

  const parsed = parseNumber(trimmed)
  return parsed === null ? null : Math.max(0, Math.min(255, parsed))
}

function parseAlpha(value: string | undefined): number {
  if (value === undefined) return 1

  const trimmed = value.trim()
  if (!trimmed) return 1
  if (trimmed.endsWith('%')) {
    const parsed = parseNumber(trimmed)
    return parsed === null ? 1 : Math.max(0, Math.min(1, parsed / 100))
  }

  const parsed = parseNumber(trimmed)
  return parsed === null ? 1 : Math.max(0, Math.min(1, parsed))
}

function parseRgbFunction(text: string): Rgba | null {
  const match = text.match(/^rgba?\((.+)\)$/i)
  if (!match) return null

  const body = match[1].trim()
  const parts = body.includes(',')
    ? body.split(',').map(part => part.trim())
    : body
        .replace(/\s*\/\s*/, ' / ')
        .split(/\s+/)
        .filter(Boolean)

  const slash = parts.indexOf('/')
  const colorParts = slash === -1 ? parts.slice(0, 3) : parts.slice(0, slash)
  const alphaPart = slash === -1 ? parts[3] : parts[slash + 1]
  if (colorParts.length !== 3) return null

  const channels = colorParts.map(parseColorChannel)
  if (channels.some(channel => channel === null)) return null
  return [channels[0] as number, channels[1] as number, channels[2] as number, parseAlpha(alphaPart)]
}

export function parseCssColor(value: string | null): Rgba | null {
  const text = value?.trim()
  if (!text) return null
  if (text.toLowerCase() === 'transparent') return [0, 0, 0, 0]

  const hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const raw = hex[1]
    const normalized =
      raw.length === 3
        ? raw
            .split('')
            .map(char => `${char}${char}`)
            .join('')
        : raw
    return [
      Number.parseInt(normalized.slice(0, 2), 16),
      Number.parseInt(normalized.slice(2, 4), 16),
      Number.parseInt(normalized.slice(4, 6), 16),
      1,
    ]
  }

  return parseRgbFunction(text)
}

export function getThemeFromColor(value: string | null): ChatterboxLiteTheme | null {
  const color = parseCssColor(value)
  if (!color || color[3] < 0.1) return null

  const [r, g, b] = color
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luminance < 0.42) return 'dark'
  if (luminance > 0.68) return 'light'
  return null
}

function getBackgroundTheme(element: HTMLElement): ChatterboxLiteTheme | null {
  let current: HTMLElement | null = element
  while (current) {
    const theme = getThemeFromColor(getComputedStyle(current).backgroundColor)
    if (theme) return theme
    current = current.parentElement
  }
  return null
}

export function getPageTheme(): ChatterboxLiteTheme | null {
  const elements = [document.documentElement, document.body].filter(Boolean) as HTMLElement[]

  for (const element of elements) {
    for (const attribute of THEME_OBSERVED_ATTRIBUTES) {
      const theme = getThemeFromText(element.getAttribute(attribute))
      if (theme) return theme
    }
  }

  for (const element of elements) {
    const style = getComputedStyle(element)
    const schemeTheme = getThemeFromText(style.colorScheme)
    if (schemeTheme) return schemeTheme

    for (const token of ['--bg1', '--bg2', '--Ga0', '--Ga1']) {
      const tokenTheme = getThemeFromColor(style.getPropertyValue(token))
      if (tokenTheme) return tokenTheme
    }

    const backgroundTheme = getBackgroundTheme(element)
    if (backgroundTheme) return backgroundTheme
  }

  return null
}

export function syncHostTheme(host: HTMLElement): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const applyTheme = () => {
    const theme = getPageTheme() ?? (media.matches ? 'dark' : 'light')
    host.setAttribute(THEME_ATTRIBUTE, theme)
  }

  const observer = new MutationObserver(applyTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: THEME_OBSERVED_ATTRIBUTES })
  observer.observe(document.body, { attributes: true, attributeFilter: THEME_OBSERVED_ATTRIBUTES })

  media.addEventListener('change', applyTheme)
  applyTheme()

  return () => {
    observer.disconnect()
    media.removeEventListener('change', applyTheme)
  }
}
