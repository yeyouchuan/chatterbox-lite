import { buildSendableDanmakuMessage } from '../src/lib/danmaku-direct-message'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(buildSendableDanmakuMessage({ text: '  hello  ', isReply: false }) === 'hello', 'should trim normal danmaku')
assert(
  buildSendableDanmakuMessage({ text: '收到', isReply: true, uname: '船Chuan' }) === '@船Chuan 收到',
  'should preserve reply context by prefixing the username'
)
assert(
  buildSendableDanmakuMessage({ text: '收到', isReply: true }) === null,
  'should skip replies when username is unavailable'
)
assert(
  buildSendableDanmakuMessage({ text: '干杯', isReply: false, hasLargeEmote: true }) === null,
  'should skip large emotes that cannot be faithfully re-sent as text'
)
assert(buildSendableDanmakuMessage({ text: '   ', isReply: false }) === null, 'should skip empty danmaku')

console.log('Danmaku direct tests passed')
