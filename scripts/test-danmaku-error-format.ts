import { formatDanmakuError } from '../src/lib/utils'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(formatDanmakuError(undefined) === '未知错误', 'missing error should use fallback copy')
assert(formatDanmakuError('f') === 'f - 包含全局屏蔽词', 'server f code should map to global block copy')
assert(formatDanmakuError('k') === 'k - 包含房间屏蔽词', 'server k code should map to room block copy')
assert(formatDanmakuError('fetch failed') === 'fetch failed', 'ordinary fetch errors should not map to block copy')

console.log('Danmaku error format tests passed')
