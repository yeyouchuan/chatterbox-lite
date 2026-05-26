import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const queueSource = readFileSync('src/lib/send-queue.ts', 'utf8')
const normalSendSource = readFileSync('src/components/normal-send-tab.tsx', 'utf8')
const interpolationStart = '$' + '{'
const waitLabelNeedle = `等待 ${interpolationStart}(waitMs / 1000).toFixed(1)}s`
const depthLabelNeedle = `队列 ${interpolationStart}status.depth}`

assert(queueSource.includes('sendQueueStatus = signal'), 'send queue should expose status as a signal')
assert(queueSource.includes('waitingUntil'), 'send queue status should expose the next send time')
assert(queueSource.includes('publishQueueStatus'), 'send queue should publish state changes')
assert(normalSendSource.includes('function QueueStatusBadge'), 'send panel should render queue status')
assert(normalSendSource.includes(waitLabelNeedle), 'queue status should show remaining wait time')
assert(normalSendSource.includes(depthLabelNeedle), 'queue status should show queued message count')
assert(normalSendSource.includes('<QueueStatusBadge />'), 'queue status should sit near the send controls')

console.log('Send queue status tests passed')
