import { readFileSync } from 'node:fs'

import { buildLiveLikeBody, buildLiveLikeResult, LIVE_LIKE_COUNT, LIVE_LIKE_ENDPOINT } from '../src/lib/live-like'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const body = buildLiveLikeBody({
  roomId: 123,
  anchorId: 456,
  userId: '789',
  csrfToken: 'csrf-token',
})

assert(LIVE_LIKE_COUNT === 30, 'live like count should stay at 30')
assert(
  LIVE_LIKE_ENDPOINT.endsWith('/xlive/app-ucenter/v1/like_info_v3/like/likeReportV3'),
  'endpoint should target live like report v3'
)
assert(body.get('click_time') === '30', 'body should request 30 likes')
assert(body.get('room_id') === '123', 'body should include room id')
assert(body.get('anchor_id') === '456', 'body should include anchor id')
assert(body.get('uid') === '789', 'body should include current user id')
assert(body.get('csrf') === 'csrf-token', 'body should include csrf')
assert(body.get('csrf_token') === 'csrf-token', 'body should include csrf_token')
assert(body.get('visit_id') === '', 'body should keep visit_id compatible with Bilibili live')

const okResponse = { ok: true, status: 200, statusText: 'OK' }
const success = buildLiveLikeResult(okResponse, { code: 0 }, LIVE_LIKE_COUNT)
assert(success.success, 'code=0 with ok HTTP should be success')
assert(success.count === 30, 'success result should keep like count')

const httpFailure = buildLiveLikeResult({ ok: false, status: 502, statusText: 'Bad Gateway' }, { code: 0 }, 30)
assert(!httpFailure.success, 'non-2xx HTTP should fail')
assert(httpFailure.error?.includes('HTTP 502'), 'HTTP failure should include status')

const apiFailure = buildLiveLikeResult(okResponse, { code: -101, message: '账号未登录' }, 30)
assert(!apiFailure.success, 'non-zero API code should fail')
assert(apiFailure.error?.includes('code=-101'), 'API failure should include code')
assert(apiFailure.error?.includes('账号未登录'), 'API failure should include message')

const missingCode = buildLiveLikeResult(okResponse, { message: '' }, 30)
assert(!missingCode.success, 'missing API code should fail')

const apiSource = readFileSync('src/lib/api.ts', 'utf8')
assert(apiSource.includes('export async function sendLiveLike'), 'api should export live like sender')
assert(apiSource.includes('LIVE_LIKE_ENDPOINT'), 'api sender should use the live like endpoint constant')
assert(
  apiSource.includes("'Content-Type': 'application/x-www-form-urlencoded'"),
  'api sender should post urlencoded form data'
)

console.log('Live like tests passed')
