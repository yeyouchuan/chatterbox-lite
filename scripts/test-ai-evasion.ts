import { detectSensitiveWords, LAPLACE_CHAT_AUDIT_URL, replaceSensitiveWords } from '../src/lib/ai-evasion'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const evaded = replaceSensitiveWords('测试屏蔽词[doge]', ['屏蔽词'])
assert(evaded === '测试屏­蔽­词[doge]', 'should only insert invisible chars inside detected sensitive words')
assert(evaded.includes('[doge]'), 'should not alter unrelated bracket emotes')

const calls: Array<{ input: string | URL; init?: RequestInit }> = []
const fetcher = async (input: string | URL, init?: RequestInit): Promise<Response> => {
  calls.push({ input, init })
  return new Response(
    JSON.stringify({
      completion: {
        hasSensitiveContent: true,
        sensitiveWords: ['屏蔽词', '不存在'],
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

const detection = await detectSensitiveWords('测试屏蔽词', fetcher)

assert(detection.hasSensitiveContent, 'audit detection should preserve hasSensitiveContent')
assert(detection.sensitiveWords?.join('|') === '屏蔽词', 'audit detection should keep exact input substrings only')
assert(calls.length === 1, 'audit detection should call fetch once')
assert(String(calls[0].input) === LAPLACE_CHAT_AUDIT_URL, 'audit detection should call original chat-audit endpoint')
assert(calls[0].init?.method === 'POST', 'audit detection should use POST')

const body = JSON.parse(String(calls[0].init?.body))
assert(body.completionMetadata?.input === '测试屏蔽词', 'audit detection should send input in completionMetadata')

console.log('AI evasion tests passed')
