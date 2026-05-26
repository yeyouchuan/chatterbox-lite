import { render } from 'preact'

import css from './styles.css?inline'
import './lib/wbi'

import { App } from './components/app'
import { dialogOpen } from './lib/store'
import { isBilibiliLiveRoomPage } from './lib/utils'

type ChatterboxLiteTheme = 'light' | 'dark'

const THEME_ATTRIBUTE = 'data-chatterbox-lite-theme'
const THEME_OBSERVED_ATTRIBUTES = ['class', 'style', 'data-theme', 'theme', 'lab-style', 'data-color-mode']
const DARK_THEME_RE = /\b(dark|black|night|dim)\b/i
const LIGHT_THEME_RE = /\b(light|white|day)\b/i

function getThemeFromText(value: string | null): ChatterboxLiteTheme | null {
  const text = value?.trim()
  if (!text) return null
  if (DARK_THEME_RE.test(text)) return 'dark'
  if (LIGHT_THEME_RE.test(text)) return 'light'
  return null
}

function parseColor(value: string | null): [number, number, number, number] | null {
  const text = value?.trim()
  if (!text) return null

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

  const rgb = text.match(
    /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d?(?:\.\d+)?))?\s*\)$/i
  )
  if (!rgb) return null

  return [
    Number.parseFloat(rgb[1]),
    Number.parseFloat(rgb[2]),
    Number.parseFloat(rgb[3]),
    rgb[4] === undefined ? 1 : Number.parseFloat(rgb[4]),
  ]
}

function getThemeFromColor(value: string | null): ChatterboxLiteTheme | null {
  const color = parseColor(value)
  if (!color || color[3] < 0.1) return null

  const [r, g, b] = color
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luminance < 0.42) return 'dark'
  if (luminance > 0.68) return 'light'
  return null
}

function getPageTheme(): ChatterboxLiteTheme | null {
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

    const backgroundTheme = getThemeFromColor(style.backgroundColor)
    if (backgroundTheme) return backgroundTheme
  }

  return null
}

function syncHostTheme(host: HTMLElement): void {
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
}

function mount() {
  const host = document.createElement('div')
  host.id = 'chatterbox-lite-host'
  Object.assign(host.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483647',
    pointerEvents: 'none',
  })
  syncHostTheme(host)

  const root = host.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.textContent = css
  root.appendChild(style)

  const app = document.createElement('div')
  root.appendChild(app)

  const portalRoot = document.createElement('div')
  portalRoot.id = 'chatterbox-lite-portal-root'
  root.appendChild(portalRoot)

  document.body.appendChild(host)
  render(<App />, app)
}

if (isBilibiliLiveRoomPage(window.location.href, window.self === window.top)) {
  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('Open Chatterbox Lite', () => {
      dialogOpen.value = true
    })
  }

  if (document.body) {
    mount()
  } else {
    const observer = new MutationObserver(() => {
      if (!document.body) return
      observer.disconnect()
      mount()
    })
    observer.observe(document.documentElement, { childList: true })
  }
}
