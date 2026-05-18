import { buildBlockedRetryMessages, isBlockedDanmakuError } from '../src/lib/blocked-retry'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(isBlockedDanmakuError('f'), 'global blocked code should be retried')
assert(isBlockedDanmakuError('k'), 'room blocked code should be retried')
assert(isBlockedDanmakuError('包含屏蔽词'), 'blocked word message should be retried')
assert(!isBlockedDanmakuError('未登录'), 'login error should not be retried')

const retries = buildBlockedRetryMessages('测试屏蔽词[doge]', 3)
assert(retries.length === 3, 'should build three retry candidates')
assert(
  retries.every(item => item.includes('\u00ad')),
  'retry candidates should contain soft hyphen'
)
assert(
  retries.every(item => item.includes('[doge]')),
  'retry candidates must not split bracket emotes'
)
assert(new Set(retries).size === retries.length, 'retry candidates should be unique')

console.log('Blocked retry tests passed')
