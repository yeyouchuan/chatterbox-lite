import { getThemeFromColor, parseCssColor } from '../src/lib/theme'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const shortHex = parseCssColor('#abc')
assert(
  shortHex?.[0] === 170 && shortHex[1] === 187 && shortHex[2] === 204 && shortHex[3] === 1,
  'should parse short hex colors'
)

const commaRgb = parseCssColor('rgba(12, 34, 56, 0.25)')
assert(
  commaRgb?.[0] === 12 && commaRgb[1] === 34 && commaRgb[2] === 56 && commaRgb[3] === 0.25,
  'should parse comma rgba colors'
)

const modernRgb = parseCssColor('rgb(12 34 56 / 50%)')
assert(
  modernRgb?.[0] === 12 && modernRgb[1] === 34 && modernRgb[2] === 56 && modernRgb[3] === 0.5,
  'should parse modern rgb slash alpha colors'
)

assert(parseCssColor('transparent')?.[3] === 0, 'transparent should parse as alpha zero')
assert(getThemeFromColor('rgba(0, 0, 0, 0)') === null, 'transparent colors should not decide theme')
assert(getThemeFromColor('rgb(20 24 30)') === 'dark', 'dark colors should resolve dark theme')
assert(getThemeFromColor('rgb(245 248 252)') === 'light', 'light colors should resolve light theme')

console.log('Theme tests passed')
