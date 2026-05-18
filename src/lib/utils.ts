export function getGraphemes(str: string): string[] {
  const segmenter = new Intl.Segmenter('zh', { granularity: 'grapheme' })
  return Array.from(segmenter.segment(str), ({ segment }) => segment)
}

export function trimText(text: string, maxLength: number): string[] {
  if (!text) return [text]

  const graphemes = getGraphemes(text)
  if (graphemes.length <= maxLength) return [text]

  const parts: string[] = []
  let currentPart: string[] = []

  for (const char of graphemes) {
    if (currentPart.length >= maxLength) {
      parts.push(currentPart.join(''))
      currentPart = [char]
    } else {
      currentPart.push(char)
    }
  }

  if (currentPart.length > 0) {
    parts.push(currentPart.join(''))
  }

  return parts
}

export function extractRoomNumber(url: string): string | undefined {
  const urlObj = new URL(url)
  const pathSegments = urlObj.pathname.split('/').filter(segment => segment !== '')
  return pathSegments.find(segment => Number.isInteger(Number(segment)))
}

export function formatDanmakuError(error: string | undefined): string {
  if (!error) return '未知错误'
  if (error === 'f') return 'f - 包含全局屏蔽词'
  if (error === 'k') return 'k - 包含房间屏蔽词'
  return error
}

export function processMessages(text: string, maxLength: number): string[] {
  return text
    .split('\n')
    .flatMap(line => trimText(line, maxLength))
    .filter(line => line?.trim())
}
