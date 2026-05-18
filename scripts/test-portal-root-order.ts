import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/main.tsx', 'utf8')
const appAppendIndex = source.indexOf('root.appendChild(app)')
const portalAppendIndex = source.indexOf('root.appendChild(portalRoot)')

assert(appAppendIndex !== -1, 'main should append the app root into the shadow root')
assert(portalAppendIndex !== -1, 'main should append the portal root into the shadow root')
assert(
  appAppendIndex < portalAppendIndex,
  'portal root should be appended after the app root so portal popovers paint above the dialog'
)

console.log('Portal root order tests passed')
