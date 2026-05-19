import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const configuratorSource = readFileSync('src/components/configurator.tsx', 'utf8')
const buttonSource = readFileSync('src/components/ui/button.tsx', 'utf8')
const textareaSource = readFileSync('src/components/ui/textarea.tsx', 'utf8')
const inputSource = readFileSync('src/components/ui/input.tsx', 'utf8')
const popoverSource = readFileSync('src/components/ui/popover.tsx', 'utf8')
const toggleSource = readFileSync('src/components/toggle-button.tsx', 'utf8')
const audioOnlySource = readFileSync('src/components/audio-only-button.tsx', 'utf8')
const normalSendSource = readFileSync('src/components/normal-send-tab.tsx', 'utf8')
const directSource = readFileSync('src/lib/danmaku-direct.ts', 'utf8')
const stylesSource = readFileSync('src/styles.css', 'utf8')

assert(
  configuratorSource.includes("setProperty('--chatterbox-lite-dialog-width'"),
  'portal root should receive dialog width CSS variable'
)
assert(configuratorSource.includes("addEventListener('resize'"), 'dialog should re-clamp on viewport resize')
assert(
  configuratorSource.includes("addEventListener('orientationchange'"),
  'dialog should re-clamp on orientation change'
)

for (const [name, source] of [
  ['button', buttonSource],
  ['textarea', textareaSource],
  ['input', inputSource],
  ['toggle button', toggleSource],
  ['audio-only button', audioOnlySource],
] as const) {
  assert(source.includes('focus-visible:'), `${name} should expose a visible keyboard focus state`)
}

for (const [name, source] of [
  ['button', buttonSource],
  ['textarea', textareaSource],
  ['input', inputSource],
] as const) {
  assert(!source.includes("'transition',"), `${name} should avoid broad transition-all behavior`)
  assert(source.includes('transition-['), `${name} should scope transition properties`)
}

for (const [name, source] of [
  ['button', buttonSource],
  ['toggle button', toggleSource],
  ['audio-only button', audioOnlySource],
] as const) {
  assert(source.includes('active:scale-[0.96]'), `${name} should provide tactile press feedback`)
}

assert(normalSendSource.includes('tabular-nums'), 'send character count should use stable tabular numbers')
assert(popoverSource.includes('overflow-visible'), 'popover content should not clip focus rings')
assert(!popoverSource.includes('pointer-events-auto overflow-hidden'), 'popover content should not clip focus rings')
assert(stylesSource.includes('-webkit-font-smoothing: antialiased'), 'shadow root should enable font smoothing')
assert(
  stylesSource.includes('text-rendering: optimizeLegibility'),
  'shadow root should optimize text rendering legibility'
)
assert(directSource.includes('isConnected'), 'direct danmaku binding should detect detached chat containers')
assert(directSource.includes('reattach'), 'direct danmaku binding should reattach when the chat container changes')
assert(toggleSource.includes('right-2 bottom-3'), 'floating buttons should sit closer to the bottom-right corner')
assert(normalSendSource.includes('sendLiveLike'), 'send panel should expose the live like action')
assert(normalSendSource.includes('HeartIcon'), 'live like button should use a recognizable like icon')
assert(normalSendSource.includes('x30'), 'send panel should keep the one-click 30-like count')
assert(!normalSendSource.includes("'点赞x30'"), 'live like button should omit the like text label')
assert(!normalSendSource.includes("'点赞中'"), 'live like button should omit loading text')
assert(normalSendSource.includes('liking.value'), 'live like button should guard repeated clicks while sending')
assert(!toggleSource.includes('sendLiveLike'), 'floating toggle area should not own the live like action')
assert(!toggleSource.includes('ChatCircleTextIcon'), 'floating toggle should not render an icon')
assert(!audioOnlySource.includes('SpeakerHighIcon'), 'audio-only button should not render an active-state icon')
assert(!audioOnlySource.includes('SpeakerSlashIcon'), 'audio-only button should not render an inactive-state icon')

console.log('UI source tests passed')
