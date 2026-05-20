import { randomUUID } from 'node:crypto'
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'

import {
  BRIDGE_HOST,
  BRIDGE_PORTS,
  BRIDGE_PROTOCOL_VERSION,
  type BridgeAgentHelloRequest,
  type BridgeCommand,
  type BridgeCommandPayloads,
  type BridgeCommandResults,
  type BridgeCommandType,
  type BridgeEvent,
  type BridgeResultRequest,
  type BridgeRoomState,
  type BridgeSettingsSnapshot,
  type BridgeState,
} from '../lib/bridge-protocol'

const POLL_TIMEOUT_MS = 25_000
const COMMAND_TIMEOUT_MS = 30_000
const AGENT_STALE_MS = 45_000

interface BridgeAgent {
  id: string
  lastSeenAt: number
  roomState: BridgeRoomState
  settingsSnapshot: BridgeSettingsSnapshot
}

interface PendingCommand {
  type: BridgeCommandType
  resolve: (value: unknown) => void
  reject: (error: Error) => void
  timeout: NodeJS.Timeout
}

interface PollWaiter {
  response: ServerResponse
  timeout: NodeJS.Timeout
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(body))
}

function sendError(response: ServerResponse, status: number, message: string): void {
  sendJson(response, status, { ok: false, error: message })
}

function readBody<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    request.on('data', chunk => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    })
    request.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? (JSON.parse(raw) as T) : ({} as T))
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)))
      }
    })
    request.on('error', reject)
  })
}

export class BridgeServer {
  private server: Server | null = null
  private staleTimer: NodeJS.Timeout | null = null
  private port: number | null = null
  private activeAgentId: string | null = null
  private readonly agents = new Map<string, BridgeAgent>()
  private readonly commandQueues = new Map<string, BridgeCommand[]>()
  private readonly pendingCommands = new Map<string, PendingCommand>()
  private readonly pollWaiters = new Map<string, PollWaiter>()
  private readonly eventListeners = new Set<(event: BridgeEvent) => void>()

  onEvent(listener: (event: BridgeEvent) => void): () => void {
    this.eventListeners.add(listener)
    return () => this.eventListeners.delete(listener)
  }

  async start(): Promise<number> {
    if (this.server && this.port !== null) return this.port

    for (const port of BRIDGE_PORTS) {
      try {
        await this.listenOnPort(port)
        this.port = port
        this.staleTimer = setInterval(() => this.dropStaleAgent(), 5_000)
        return port
      } catch {
        this.server = null
      }
    }

    throw new Error(`No bridge port available: ${BRIDGE_PORTS.join(', ')}`)
  }

  stop(): void {
    if (this.staleTimer) clearInterval(this.staleTimer)
    this.staleTimer = null

    for (const waiter of this.pollWaiters.values()) {
      clearTimeout(waiter.timeout)
      sendJson(waiter.response, 200, { ok: true })
    }
    this.pollWaiters.clear()

    for (const [commandId, pending] of this.pendingCommands.entries()) {
      clearTimeout(pending.timeout)
      pending.reject(new Error('Bridge server stopped'))
      this.pendingCommands.delete(commandId)
    }

    this.server?.close()
    this.server = null
    this.port = null
  }

  getState(): BridgeState {
    const agent = this.activeAgentId ? this.agents.get(this.activeAgentId) : null
    return {
      port: this.port,
      connected: Boolean(agent),
      agentId: agent?.id ?? null,
      roomState: agent?.roomState ?? null,
      settingsSnapshot: agent?.settingsSnapshot ?? null,
    }
  }

  reconnect(): void {
    this.rejectPendingCommands('Reconnect requested')
    this.agents.clear()
    this.commandQueues.clear()
    this.activeAgentId = null
    this.emit({ type: 'disconnected', reason: 'Reconnect requested' })
  }

  async sendCommand<T extends BridgeCommandType>(
    type: T,
    payload: BridgeCommandPayloads[T]
  ): Promise<BridgeCommandResults[T]> {
    const agentId = this.activeAgentId
    if (!agentId || !this.agents.has(agentId)) throw new Error('No Bilibili live page bridge connected')

    const command: BridgeCommand<T> = {
      id: randomUUID(),
      type,
      payload,
      createdAt: Date.now(),
    }

    return await new Promise<BridgeCommandResults[T]>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingCommands.delete(command.id)
        reject(new Error(`Bridge command timed out: ${type}`))
      }, COMMAND_TIMEOUT_MS)

      this.pendingCommands.set(command.id, {
        type,
        resolve: value => resolve(value as BridgeCommandResults[T]),
        reject,
        timeout,
      })

      const queue = this.commandQueues.get(agentId) ?? []
      queue.push(command)
      this.commandQueues.set(agentId, queue)

      this.flushPoll(agentId)
    })
  }

  private async listenOnPort(port: number): Promise<void> {
    this.server = createServer((request, response) => {
      void this.handleRequest(request, response)
    })

    await new Promise<void>((resolve, reject) => {
      const server = this.server
      if (!server) {
        reject(new Error('Server was not created'))
        return
      }

      const onError = (error: Error) => {
        server.off('listening', onListening)
        reject(error)
      }
      const onListening = () => {
        server.off('error', onError)
        resolve()
      }

      server.once('error', onError)
      server.once('listening', onListening)
      server.listen(port, BRIDGE_HOST)
    })
  }

  private async handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
    if (request.method === 'OPTIONS') {
      sendJson(response, 200, { ok: true })
      return
    }

    const url = new URL(request.url ?? '/', `http://${BRIDGE_HOST}`)

    try {
      if (request.method === 'GET' && url.pathname === '/ping') {
        sendJson(response, 200, {
          ok: true,
          app: 'chatterbox-lite',
          protocolVersion: BRIDGE_PROTOCOL_VERSION,
        })
        return
      }

      if (request.method === 'GET' && url.pathname === '/state') {
        sendJson(response, 200, { ok: true, state: this.getState() })
        return
      }

      if (request.method === 'POST' && url.pathname === '/agent/hello') {
        await this.handleHello(request, response)
        return
      }

      if (request.method === 'GET' && url.pathname === '/agent/poll') {
        this.handlePoll(url, response)
        return
      }

      if (request.method === 'POST' && url.pathname === '/agent/result') {
        await this.handleResult(request, response)
        return
      }

      sendError(response, 404, 'Not found')
    } catch (err) {
      sendError(response, 500, err instanceof Error ? err.message : String(err))
    }
  }

  private async handleHello(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const body = await readBody<BridgeAgentHelloRequest>(request)
    if (body.protocolVersion !== BRIDGE_PROTOCOL_VERSION) {
      sendError(response, 400, 'Unsupported bridge protocol version')
      return
    }

    const id = body.agentId || randomUUID()
    const agent: BridgeAgent = {
      id,
      lastSeenAt: Date.now(),
      roomState: body.roomState,
      settingsSnapshot: body.settingsSnapshot,
    }
    const wasConnected = this.activeAgentId === id && this.agents.has(id)

    this.agents.set(id, agent)
    this.activeAgentId = id

    sendJson(response, 200, { ok: true, agentId: id })

    if (!wasConnected) {
      this.emit({ type: 'connected', agentId: id, roomState: body.roomState, settingsSnapshot: body.settingsSnapshot })
    } else {
      this.emit({ type: 'roomState', roomState: body.roomState })
      this.emit({ type: 'settingsSnapshot', settingsSnapshot: body.settingsSnapshot })
    }
  }

  private handlePoll(url: URL, response: ServerResponse): void {
    const agentId = url.searchParams.get('agentId')
    if (!agentId || !this.agents.has(agentId)) {
      sendError(response, 404, 'Unknown bridge agent')
      return
    }

    const agent = this.agents.get(agentId)
    if (agent) agent.lastSeenAt = Date.now()

    const existingWaiter = this.pollWaiters.get(agentId)
    if (existingWaiter) {
      clearTimeout(existingWaiter.timeout)
      sendJson(existingWaiter.response, 200, { ok: true })
    }

    const queue = this.commandQueues.get(agentId) ?? []
    const command = queue.shift()
    if (command) {
      sendJson(response, 200, { ok: true, command })
      return
    }

    const timeout = setTimeout(() => {
      this.pollWaiters.delete(agentId)
      sendJson(response, 200, { ok: true })
    }, POLL_TIMEOUT_MS)

    this.pollWaiters.set(agentId, { response, timeout })
  }

  private async handleResult(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const body = await readBody<BridgeResultRequest>(request)
    if (!body.agentId || !this.agents.has(body.agentId)) {
      sendError(response, 404, 'Unknown bridge agent')
      return
    }

    const agent = this.agents.get(body.agentId)
    if (agent) agent.lastSeenAt = Date.now()

    const pending = this.pendingCommands.get(body.commandId)
    if (!pending) {
      sendJson(response, 200, { ok: true })
      return
    }

    clearTimeout(pending.timeout)
    this.pendingCommands.delete(body.commandId)

    if (body.ok) pending.resolve(body.result)
    else pending.reject(new Error(body.error || `Bridge command failed: ${pending.type}`))

    sendJson(response, 200, { ok: true })
  }

  private flushPoll(agentId: string): void {
    const waiter = this.pollWaiters.get(agentId)
    if (!waiter) return

    const queue = this.commandQueues.get(agentId) ?? []
    const command = queue.shift()
    if (!command) return

    clearTimeout(waiter.timeout)
    this.pollWaiters.delete(agentId)
    sendJson(waiter.response, 200, { ok: true, command })
  }

  private dropStaleAgent(): void {
    if (!this.activeAgentId) return

    const agent = this.agents.get(this.activeAgentId)
    if (!agent) return
    if (Date.now() - agent.lastSeenAt < AGENT_STALE_MS) return

    const staleAgentId = agent.id
    this.agents.delete(staleAgentId)
    this.commandQueues.delete(staleAgentId)
    const waiter = this.pollWaiters.get(staleAgentId)
    if (waiter) {
      clearTimeout(waiter.timeout)
      sendJson(waiter.response, 200, { ok: true })
      this.pollWaiters.delete(staleAgentId)
    }
    this.activeAgentId = null
    this.rejectPendingCommands('Bilibili live page bridge disconnected')
    this.emit({ type: 'disconnected', reason: 'Bilibili live page bridge disconnected' })
  }

  private rejectPendingCommands(message: string): void {
    for (const [commandId, pending] of this.pendingCommands.entries()) {
      clearTimeout(pending.timeout)
      pending.reject(new Error(message))
      this.pendingCommands.delete(commandId)
    }
  }

  private emit(event: BridgeEvent): void {
    for (const listener of this.eventListeners) {
      listener(event)
    }
  }
}
