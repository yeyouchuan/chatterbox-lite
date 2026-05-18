import {
  type BilibiliSendDanmakuResponse,
  buildSendDanmakuResult,
  fetchWithTimeout,
} from '../src/lib/send-danmaku-response'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const okResponse = { ok: true, status: 200, statusText: 'OK' }

assert(
  buildSendDanmakuResult(okResponse, { code: 0 }, 'hello', false).success,
  'code=0 with an ok HTTP response should be success'
)

const httpFailure = buildSendDanmakuResult(
  { ok: false, status: 502, statusText: 'Bad Gateway' },
  { code: 0 },
  'hello',
  false
)
assert(!httpFailure.success, 'non-2xx HTTP should not be success')
assert(httpFailure.error?.includes('HTTP 502'), 'non-2xx HTTP failure should include status')

const apiFailure = buildSendDanmakuResult(okResponse, { code: -101, message: '账号未登录' }, 'hello', false)
assert(!apiFailure.success, 'non-zero API code should not be success')
assert(apiFailure.error?.includes('code=-101'), 'API failure should include code')
assert(apiFailure.error?.includes('账号未登录'), 'API failure should include message')

const missingCode = buildSendDanmakuResult(okResponse, { message: '' } as BilibiliSendDanmakuResponse, 'hello', false)
assert(!missingCode.success, 'missing API code should not be success')

let aborted = false
try {
  await fetchWithTimeout(
    (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          aborted = true
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        })
      }),
    'https://example.com/send',
    {},
    5
  )
} catch (err) {
  assert(err instanceof DOMException && err.name === 'AbortError', 'timeout should reject with AbortError')
}

assert(aborted, 'fetchWithTimeout should abort hanging requests')

console.log('Send danmaku response tests passed')
