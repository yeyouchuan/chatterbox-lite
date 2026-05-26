import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const packageSource = readFileSync('package.json', 'utf8')
const appSource = readFileSync('src/components/app.tsx', 'utf8')
const toastSource = readFileSync('src/lib/toast.ts', 'utf8')
const viewportSource = readFileSync('src/components/toast-viewport.tsx', 'utf8')
const emoteSource = readFileSync('src/components/emote-selector.tsx', 'utf8')
const normalSendSource = readFileSync('src/components/normal-send-tab.tsx', 'utf8')
const directSource = readFileSync('src/lib/danmaku-direct.ts', 'utf8')

assert(!packageSource.includes('"sonner"'), 'native toast should not add sonner dependency')
assert(appSource.includes('<ToastViewport />'), 'app should mount the native toast viewport')
assert(toastSource.includes('toastMessages = signal'), 'toast store should use Preact signals')
assert(toastSource.includes('showToast'), 'toast store should expose showToast helper')
assert(viewportSource.includes('bottom-3'), 'toast viewport should sit in the bottom-right corner')
assert(viewportSource.includes('--chatterbox-lite-toast-surface'), 'toast viewport should use acrylic toast tokens')
assert(!emoteSource.includes('alert('), 'emote copy failure should not use blocking alert')

for (const [name, source] of [
  ['emote selector', emoteSource],
  ['normal send tab', normalSendSource],
  ['direct danmaku', directSource],
] as const) {
  assert(source.includes('showToast'), `${name} should surface immediate toast feedback`)
}

console.log('Toast source tests passed')
