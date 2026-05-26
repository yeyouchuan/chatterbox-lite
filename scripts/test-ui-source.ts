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
const settingsButtonSource = readFileSync('src/components/settings-popover-button.tsx', 'utf8')
const directSource = readFileSync('src/lib/danmaku-direct.ts', 'utf8')
const stylesSource = readFileSync('src/styles.css', 'utf8')

assert(
  configuratorSource.includes("setProperty('--chatterbox-lite-dialog-width'"),
  'portal root should receive dialog width CSS variable'
)
assert(
  configuratorSource.includes('const DIALOG_MAX_WIDTH = 680'),
  'main dialog should allow a wider manually resized Raycast-style panel'
)
assert(configuratorSource.includes('bg-acrylic-panel'), 'main dialog should use the acrylic panel surface')
assert(
  configuratorSource.includes('border-b-[color:var(--chatterbox-lite-acrylic-border-bottom)]'),
  'main dialog should weaken the bottom border'
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
assert(buttonSource.includes('gap-1.5 rounded-lg'), 'buttons should use the softer control radius')
assert(buttonSource.includes('bg-acrylic-control'), 'secondary buttons should use acrylic control surfaces')
assert(buttonSource.includes('bg-brand text-white'), 'primary buttons should keep a blue branded fill')
assert(
  textareaSource.includes('bg-acrylic-control text-inherit backdrop-blur-md'),
  'textareas should use acrylic control surfaces'
)
assert(textareaSource.includes('px-2 py-1.5'), 'textareas should keep content comfortably away from the border')
assert(
  inputSource.includes('bg-acrylic-control text-inherit backdrop-blur-md'),
  'inputs should use acrylic control surfaces'
)
assert(popoverSource.includes('bg-acrylic-popover'), 'popovers should use the acrylic popover surface')
assert(
  popoverSource.includes('border-b-[color:var(--chatterbox-lite-acrylic-border-bottom)]'),
  'popovers should weaken the bottom border'
)
assert(popoverSource.includes('overflow-visible'), 'popover content should not clip focus rings')
assert(!popoverSource.includes('pointer-events-auto overflow-hidden'), 'popover content should not clip focus rings')
assert(
  stylesSource.includes('--chatterbox-lite-text: #172033'),
  'styles should pin plugin text color away from page theme variables'
)
assert(
  stylesSource.includes('--Ga10: var(--chatterbox-lite-text)'),
  'styles should override inherited Bilibili text tokens'
)
assert(
  stylesSource.includes('--Ga6: var(--chatterbox-lite-muted)'),
  'styles should override inherited Bilibili muted tokens'
)
assert(stylesSource.includes('--chatterbox-lite-acrylic-panel'), 'styles should define the acrylic panel token')
assert(stylesSource.includes('--chatterbox-lite-acrylic-control'), 'styles should define the acrylic control token')
assert(stylesSource.includes('--color-brand: #479fd1'), 'styles should use the requested Arclight blue brand color')
assert(
  configuratorSource.includes('text-[color:var(--chatterbox-lite-text)]'),
  'main dialog should force readable plugin text'
)
assert(popoverSource.includes('text-[color:var(--chatterbox-lite-text)]'), 'popovers should force readable plugin text')
assert(
  settingsButtonSource.includes("variant={settingsPanelOpen.value ? 'default' : 'outline'}"),
  'settings button should show an active color while its popover is open'
)
assert(
  normalSendSource.includes('text-[color:var(--chatterbox-lite-muted)]'),
  'send character count should use a readable muted color'
)
assert(
  !normalSendSource.includes('text-[var(--Ga7,#5f6670)]'),
  'send character count should not inherit page-provided muted tokens'
)
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
assert(
  normalSendSource.includes('text-[color:var(--chatterbox-lite-control-icon)]'),
  'icon-only actions should keep readable icons'
)
assert(!normalSendSource.includes('>x30</span>'), 'live like button should not render the 30-like text label')
assert(normalSendSource.includes("className='w-6 px-0"), 'live like button should match the settings icon size')
assert(normalSendSource.includes('<SettingsPopoverButton'), 'send panel should render the settings action next to like')
assert(settingsButtonSource.includes('GearSixIcon'), 'settings action should use a recognizable settings icon')
assert(!configuratorSource.includes('XIcon'), 'main dialog should not render a close button')
assert(configuratorSource.includes('const startDrag'), 'main dialog should keep a drag handler without the title row')
assert(configuratorSource.includes("title='拖动移动窗口'"), 'main dialog should expose a non-title drag surface')
assert(configuratorSource.includes('isInteractiveTarget'), 'dialog dragging should ignore interactive controls')
assert(
  normalSendSource.includes("data-chatterbox-lite-drag-surface='true'"),
  'send row blank space should drag the dialog'
)
assert(
  !configuratorSource.includes('cursor-move border-ga2 border-b'),
  'main dialog should not render a draggable title bar'
)
assert(!normalSendSource.includes("'点赞x30'"), 'live like button should omit the like text label')
assert(!normalSendSource.includes("'点赞中'"), 'live like button should omit loading text')
assert(normalSendSource.includes('liking.value'), 'live like button should guard repeated clicks while sending')
assert(!toggleSource.includes('sendLiveLike'), 'floating toggle area should not own the live like action')
assert(!toggleSource.includes('ChatCircleTextIcon'), 'floating toggle should not render an icon')
assert(!audioOnlySource.includes('SpeakerHighIcon'), 'audio-only button should not render an active-state icon')
assert(!audioOnlySource.includes('SpeakerSlashIcon'), 'audio-only button should not render an inactive-state icon')

console.log('UI source tests passed')
