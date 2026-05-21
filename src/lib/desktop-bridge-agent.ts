import type {
  BridgeAgentHelloResponse,
  BridgeCommand,
  BridgeCommandResults,
  BridgePollResponse,
  BridgeResultRequest,
} from './bridge-protocol'

import { BRIDGE_HOST, BRIDGE_PORTS, BRIDGE_PROTOCOL_VERSION } from './bridge-protocol'
import { appendLog } from './log'
import { getSettingsSnapshot } from './settings-snapshot'
import { autoSeekBufferThreshold, autoSeekEnabled } from './store'
import { getUserscriptRoomState, userscriptRuntime } from './userscript-runtime'

const RETRY_DELAY_MS = 2_000

interface BridgeAgentController {
  stop: () => void
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function gmJsonRequest<T>(method: 'GET' | 'POST', url: string, body?: unknown, timeout = 30_000): Promise<T> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method,
      url,
      timeout,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      data: body ? JSON.stringify(body) : undefined,
      onload: response => {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`HTTP ${response.status}: ${response.responseText}`))
          return
        }

        try {
          resolve(JSON.parse(response.responseText || '{}') as T)
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)))
        }
      },
      onerror: () => reject(new Error('Bridge request failed')),
      ontimeout: () => reject(new Error('Bridge request timed out')),
    })
  })
}

async function findBridgeBaseUrl(): Promise<string | null> {
  for (const port of BRIDGE_PORTS) {
    const baseUrl = `http://${BRIDGE_HOST}:${port}`
    try {
      await gmJsonRequest('GET', `${baseUrl}/ping`, undefined, 800)
      return baseUrl
    } catch {
      // Try the next configured bridge port.
    }
  }

  return null
}

async function executeCommand(command: BridgeCommand): Promise<BridgeCommandResults[typeof command.type]> {
  if (command.type === 'getRoomState') return await getUserscriptRoomState()
  if (command.type === 'sendDanmaku') return await userscriptRuntime.sendDanmaku(command.payload.message)
  if (command.type === 'sendLiveLike') return await userscriptRuntime.sendLiveLike()
  if (command.type === 'fetchEmoticons') return await userscriptRuntime.fetchEmoticons()
  if (command.type === 'updateAutoSeekSettings') {
    const { enabled, bufferThreshold } = command.payload
    if (typeof enabled === 'boolean') autoSeekEnabled.value = enabled
    if (typeof bufferThreshold === 'number' && Number.isFinite(bufferThreshold)) {
      autoSeekBufferThreshold.value = Math.max(0.3, Math.min(bufferThreshold, 10))
    }
    return getSettingsSnapshot()
  }
  return getSettingsSnapshot()
}

async function postCommandResult(
  baseUrl: string,
  agentId: string,
  command: BridgeCommand,
  ok: boolean,
  result?: unknown,
  error?: string
): Promise<void> {
  const body: BridgeResultRequest = {
    agentId,
    commandId: command.id,
    ok,
    result: result as BridgeResultRequest['result'],
    error,
  }
  await gmJsonRequest('POST', `${baseUrl}/agent/result`, body, 5_000)
}

export function startDesktopBridgeAgent(): BridgeAgentController {
  let stopped = false
  let baseUrl: string | null = null
  let agentId: string | undefined
  let connected = false

  const run = async () => {
    while (!stopped) {
      try {
        baseUrl ??= await findBridgeBaseUrl()
        if (!baseUrl) {
          if (connected) appendLog('桌面桥接已断开')
          connected = false
          await sleep(RETRY_DELAY_MS)
          continue
        }

        const hello = await gmJsonRequest<BridgeAgentHelloResponse>(
          'POST',
          `${baseUrl}/agent/hello`,
          {
            protocolVersion: BRIDGE_PROTOCOL_VERSION,
            agentId,
            roomState: await getUserscriptRoomState(),
            settingsSnapshot: getSettingsSnapshot(),
          },
          5_000
        )
        agentId = hello.agentId

        if (!connected) {
          connected = true
          appendLog('桌面桥接已连接')
        }

        const poll = await gmJsonRequest<BridgePollResponse>(
          'GET',
          `${baseUrl}/agent/poll?agentId=${encodeURIComponent(agentId)}`,
          undefined,
          30_000
        )

        if (!poll.command) continue

        try {
          const result = await executeCommand(poll.command)
          await postCommandResult(baseUrl, agentId, poll.command, true, result)
        } catch (err) {
          await postCommandResult(
            baseUrl,
            agentId,
            poll.command,
            false,
            undefined,
            err instanceof Error ? err.message : String(err)
          )
        }
      } catch {
        baseUrl = null
        if (connected) appendLog('桌面桥接已断开')
        connected = false
        await sleep(RETRY_DELAY_MS)
      }
    }
  }

  if (typeof GM_xmlhttpRequest === 'function') {
    void run()
  }

  return {
    stop: () => {
      stopped = true
    },
  }
}
