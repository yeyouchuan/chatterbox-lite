import { BridgeServer } from '../src/electron/bridge-server'
import { BRIDGE_HOST, BRIDGE_PORTS } from '../src/lib/bridge-protocol'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function postCommand(
  port: number,
  origin?: string
): Promise<{ status: number; body: { ok?: boolean; error?: string } }> {
  const response = await fetch(`http://${BRIDGE_HOST}:${port}/command`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify({
      type: 'getRoomState',
      payload: {},
    }),
  })

  return {
    status: response.status,
    body: (await response.json()) as { ok?: boolean; error?: string },
  }
}

const server = new BridgeServer()
const port = await server.start()

try {
  assert(BRIDGE_PORTS.includes(port as (typeof BRIDGE_PORTS)[number]), 'bridge should start on a configured port')

  const browserOrigin = await postCommand(port, 'https://live.bilibili.com')
  assert(browserOrigin.status === 403, 'POST /command should reject browser-origin requests')
  assert(browserOrigin.body.ok === false, 'browser-origin rejection should be an error response')
  assert(
    browserOrigin.body.error?.includes('browser Origin'),
    'browser-origin rejection should explain the origin block'
  )

  const localClient = await postCommand(port)
  assert(localClient.status === 503, 'POST /command without Origin should reach command handling and report no agent')
  assert(localClient.body.ok === false, 'missing live page agent should be an error response')
  assert(
    localClient.body.error?.includes('No Bilibili live page bridge connected'),
    'local command error should come from bridge state'
  )
} finally {
  server.stop()
}

console.log('Bridge command API tests passed')
