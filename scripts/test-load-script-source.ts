import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/lib/load-script.ts', 'utf8')
const onloadBranch = source.match(/script\.onload = \(\) => \{([\s\S]*?)\n\s*\}/)?.[1] ?? ''

assert(onloadBranch.includes('inFlight.delete(url)'), 'onload failure should evict the cached promise')

console.log('Load script source tests passed')
