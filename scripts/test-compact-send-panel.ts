import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/components/normal-send-tab.tsx', 'utf8')
const configuratorSource = readFileSync('src/components/configurator.tsx', 'utf8')
const settingsButtonSource = readFileSync('src/components/settings-popover-button.tsx', 'utf8')

assert(!source.includes('AccordionTrigger'), 'send panel should not render an accordion title row')
assert(!source.includes('normalSendPanelOpen'), 'send panel should not keep its own collapse state')
assert(!source.includes('Enter 发送'), 'send panel should not show Enter shortcut copy')
assert(!source.includes('Shift+Enter'), 'send panel should not show Shift+Enter shortcut copy')
assert(source.includes("className='h-20 resize-none pr-10'"), 'send textarea should extend into the former title area')

const inputOnlyMatch = source.match(/if \(inputOnly\) \{\s*return \(([\s\S]*?)\n\s*\)\s*\n\s*\}/)
assert(inputOnlyMatch, 'send panel should expose an input-only render path')

const inputOnlyBlock = inputOnlyMatch?.[1] ?? ''
assert(inputOnlyBlock.includes('<Textarea'), 'input-only mode should render the textarea')
assert(
  inputOnlyBlock.includes("className='h-20 resize-none pr-10'"),
  'input-only textarea should preserve the expanded height'
)
assert(!inputOnlyBlock.includes('<EmoteSelector'), 'input-only mode should not render the emote selector')
assert(!inputOnlyBlock.includes('<Button'), 'input-only mode should not render a send button')
assert(!source.includes('词库会在发送前替换'), 'send panel should not render helper copy')
assert(!inputOnlyBlock.includes('发送中'), 'input-only mode should not render send-button status text')

assert(
  !configuratorSource.includes('showNormalSendPanel.value && !showReplacementPanel.value && !showLogPanel.value'),
  'main dialog should not collapse into input-only mode when only the send panel is enabled'
)
assert(
  !configuratorSource.includes('<NormalSendTab inputOnly />'),
  'main dialog should not render the input-only send tab'
)
assert(!configuratorSource.includes('Chatterbox Lite'), 'main dialog should not render a title row')
assert(
  source.indexOf('<SettingsPopoverButton />') < source.indexOf('onClick={() => void sendLike()}'),
  'settings button should sit before the live-like button'
)
assert(
  settingsButtonSource.includes('<SettingsPanel />'),
  'main dialog should keep the settings entry so hidden panels can be restored'
)

const sendStart = source.indexOf('const isEmote = isEmoticonUnique(originalMessage)')
assert(sendStart !== -1, 'send flow should still detect emotes')
const firstClearAfterSendStart = source.indexOf("fasongText.value = ''", sendStart)
const csrfLookup = source.indexOf('const csrfToken = getCsrfToken()', sendStart)
const historyWrite = source.indexOf('sendHistory.value = addSendHistoryEntry', sendStart)

assert(csrfLookup !== -1, 'send flow should look up csrf before sending')
assert(
  firstClearAfterSendStart > csrfLookup,
  'send flow should not clear the draft before room/csrf validation succeeds'
)
assert(historyWrite > csrfLookup, 'send flow should not add history before room/csrf validation succeeds')

console.log('Compact send panel tests passed')
