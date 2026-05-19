import {
  buildBlockedRetryMessages,
  buildReplacementRetryMessage,
  isBlockedDanmakuError,
} from '../src/lib/blocked-retry'

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

const replacementRetry = buildReplacementRetryMessage('测试屏蔽词[doge]', [['屏蔽词', '屏避词']])
assert(replacementRetry?.message === '测试屏避词[doge]', 'replacement retry should replace matching keyword')
assert(replacementRetry?.matched.join('|') === '屏蔽词', 'replacement retry should report matched keyword')

const noReplacementRetry = buildReplacementRetryMessage('测试屏蔽词', [['敏感词', '敏感伺']])
assert(noReplacementRetry === null, 'replacement retry should return null when no keyword matches')

console.log('Blocked retry tests passed')
