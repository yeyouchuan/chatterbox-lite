import { render } from 'preact'

import css from './styles.css?inline'
import './lib/wbi'

import { App } from './components/app'
import { dialogOpen } from './lib/store'
import { isBilibiliLiveRoomPage } from './lib/utils'

function mount() {
  const host = document.createElement('div')
  host.id = 'chatterbox-lite-host'
  Object.assign(host.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483647',
    pointerEvents: 'none',
  })

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
