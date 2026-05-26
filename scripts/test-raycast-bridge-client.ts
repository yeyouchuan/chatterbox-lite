import { findBridgeBaseUrl, formatBridgeClientError } from '../raycast/src/bridge-client'
import { BRIDGE_PORTS } from '../src/lib/bridge-protocol'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const attempts: string[] = []
const baseUrl = await findBridgeBaseUrl(async url => {
  attempts.push(url)
  return {
    ok: url.includes(String(BRIDGE_PORTS[1])),
    json: async () => ({ ok: true }),
  }
})

assert(baseUrl?.endsWith(String(BRIDGE_PORTS[1])), 'bridge client should return the first reachable configured port')
assert(attempts.length === 2, 'bridge client should stop scanning after the first reachable bridge')

const missingBridge = await findBridgeBaseUrl(async () => {
  throw new Error('connection refused')
})
assert(missingBridge === null, 'bridge client should return null when every configured port fails')

assert(
  formatBridgeClientError(new Error('No Bilibili live page bridge connected')).includes('直播间页面'),
  'bridge client should format disconnected live page errors for users'
)
assert(
  formatBridgeClientError(new Error('fetch failed')).includes('Chatterbox Lite helper'),
  'bridge client should format helper connectivity errors for users'
)

console.log('Raycast bridge client tests passed')
