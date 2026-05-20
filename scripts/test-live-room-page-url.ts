import { readFileSync } from 'node:fs'

import { isBilibiliLiveRoomPage } from '../src/lib/utils'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const mainSource = readFileSync('src/main.tsx', 'utf8')
const viteConfig = readFileSync('vite.config.ts', 'utf8')

assert(isBilibiliLiveRoomPage('https://live.bilibili.com/23369248'), 'numeric live room path should be allowed')
assert(
  isBilibiliLiveRoomPage('https://live.bilibili.com/23369248?spm_id_from=333.1007'),
  'numeric live room path with query should be allowed'
)
assert(!isBilibiliLiveRoomPage('http://live.bilibili.com/23369248'), 'non-HTTPS live room URL should be ignored')
assert(!isBilibiliLiveRoomPage('https://live.bilibili.com/'), 'live home should be ignored')
assert(!isBilibiliLiveRoomPage('https://live.bilibili.com/blanc/23369248'), 'nested room paths should be ignored')
assert(
  !isBilibiliLiveRoomPage('https://live.bilibili.com/p/html/live-app-activity/index.html'),
  'activity iframe paths should be ignored'
)
assert(!isBilibiliLiveRoomPage('https://live.bilibili.com/23369248', false), 'embedded frames should be ignored')

assert(
  !mainSource.includes("location.hostname === 'live.bilibili.com'"),
  'main entry should not mount on every live.bilibili.com path'
)
assert(mainSource.includes('isBilibiliLiveRoomPage'), 'main entry should use the strict live room page guard')
assert(mainSource.includes('window.self === window.top'), 'main entry should skip embedded activity iframes')
assert(
  viteConfig.includes("match: ['https://live.bilibili.com/*']"),
  'userscript metadata should only match HTTPS live pages'
)
assert(viteConfig.includes('noframes: true'), 'userscript metadata should opt out of frames')

console.log('Live room page URL tests passed')
