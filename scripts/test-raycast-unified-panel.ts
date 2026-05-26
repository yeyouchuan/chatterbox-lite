import { existsSync, readFileSync, statSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

import type { BilibiliEmoticonPackage } from '../src/types'

import { buildEmoteSections } from '../raycast/src/emotes'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

function readRgbaPng(path: string): { width: number; height: number; rgba: Buffer } {
  const png = readFileSync(path)
  assert(png.slice(0, 8).toString('hex') === '89504e470d0a1a0a', `${path} should be a PNG file`)

  let offset = 8
  let width = 0
  let height = 0
  const idatChunks: Buffer[] = []
  while (offset < png.length) {
    const length = png.readUInt32BE(offset)
    const type = png.slice(offset + 4, offset + 8).toString('ascii')
    const data = png.slice(offset + 8, offset + 8 + length)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      assert(data[8] === 8 && data[9] === 6, `${path} should use 8-bit RGBA color`)
    }
    if (type === 'IDAT') idatChunks.push(data)
    offset += 12 + length
  }

  const raw = inflateSync(Buffer.concat(idatChunks))
  const stride = width * 4
  const rgba = Buffer.alloc(width * height * 4)
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)]
    assert(filter === 0, `${path} should use unfiltered scanlines`)
    raw.copy(rgba, y * stride, y * (stride + 1) + 1, y * (stride + 1) + 1 + stride)
  }

  return { width, height, rgba }
}

function pixelAt(image: { width: number; rgba: Buffer }, x: number, y: number): [number, number, number, number] {
  const offset = (y * image.width + x) * 4
  return [image.rgba[offset], image.rgba[offset + 1], image.rgba[offset + 2], image.rgba[offset + 3]]
}

function pkg(pkg_id: number, pkg_name: string, uniques: string[]): BilibiliEmoticonPackage {
  return {
    pkg_id,
    pkg_name,
    pkg_type: 0,
    pkg_descript: '',
    emoticons: uniques.map((unique, index) => ({
      emoji: unique,
      descript: unique,
      url: `https://example.com/${unique}.png`,
      emoticon_unique: unique,
      emoticon_id: pkg_id * 100 + index,
    })),
  }
}

const grouped = buildEmoteSections({
  packages: [pkg(1, 'hidden', ['hidden_1']), pkg(2, 'room', ['room_1', 'room_2']), pkg(3, 'guard', ['guard_1'])],
  query: 'room_2',
  modeValue: 'emote:all',
  recent: [],
  favorites: [],
})

assert(grouped.length === 1, 'unified panel should filter emotes by title or unique id')
assert(grouped[0]?.packageName === 'room', 'unified panel should preserve the matching package')
assert(grouped[0]?.emotes[0]?.unique === 'room_2', 'unified panel should keep matching emotes inside a package section')

const manifest = JSON.parse(readFileSync('raycast/package.json', 'utf8')) as {
  title: string
  commands: Array<{ name: string; title: string }>
}
assert(manifest.title === 'Arclight', 'raycast extension title should be Arclight')
assert(manifest.commands.length === 1, 'raycast extension should expose one combined command')
assert(manifest.commands[0]?.name === 'chatterbox', 'combined command should be the single Raycast entry')
assert(manifest.commands[0]?.title === 'Arclight', 'raycast command title should be Arclight')
assert(manifest.commands[0]?.icon === 'icon.png', 'raycast command should use the extension icon')
assert(existsSync('raycast/assets/icon.png'), 'raycast extension should include an asset icon file')
assert(statSync('raycast/assets/icon.png').size > 0, 'raycast extension icon should not be empty')
const icon = readRgbaPng('raycast/assets/icon.png')
assert(icon.width === 512 && icon.height === 512, 'raycast extension icon should be 512x512')
assert(
  pixelAt(icon, 256, 256).join(',') === '77,170,229,255',
  'raycast extension icon should use #4DAAE5 at the center'
)
assert(pixelAt(icon, 256 + 176, 256)[3] === 255, 'raycast extension icon circle should cover the intended radius')
assert(
  pixelAt(icon, 256 + 196, 256)[3] === 0,
  'raycast extension icon circle should be smaller than the old large disk'
)

const source = readFileSync('raycast/src/chatterbox.tsx', 'utf8')
assert(source.includes('<Grid'), 'combined panel should use Raycast Grid')
assert(source.includes('navigationTitle="Arclight"'), 'combined panel title should be Arclight')
assert(source.includes('columns={8}'), 'combined panel should preview more emotes with eight columns')
assert(source.includes('<Grid.Section'), 'combined panel should group emotes by package')
assert(
  !source.includes('title="Text"') && !source.includes("title='Text'"),
  'combined panel should not spend grid space on a Text section'
)
assert(
  !source.includes("id='send-text'") && !source.includes('id="send-text"'),
  'combined panel should not render a text send grid item'
)
assert(
  source.includes('title={`' + '$' + '{connectionStatusMark} Send Danmaku' + '`}'),
  'combined panel should keep a first-class text send action'
)
assert(!source.includes('id="status"'), 'combined panel should not spend grid space on a status tile')
assert(!source.includes('columns={1}'), 'combined panel should not render giant single-column grid tiles')
assert(source.includes('Refresh Connection'), 'combined panel should provide a refresh connection action')
assert(source.includes('getConnectionStatusMark'), 'combined panel should show connection state in action titles')
assert(
  source.includes('🔴') && source.includes('🟢'),
  'combined panel action titles should include visible status dots'
)
assert(source.includes('Emote: All'), 'combined panel should expose an emote package filter')
assert(
  source.includes('searchBarPlaceholder="输入弹幕，Enter 发送"'),
  'combined panel search box should act as danmaku input'
)
assert(!source.includes('searchBarPlaceholder="搜索表情"'), 'combined panel search box should not become emote search')
assert(source.includes('recentTextMessages'), 'combined panel should read recent text messages')
assert(!source.includes('title="最近弹幕"'), 'combined panel should not render a recent text section')
assert(source.includes('recentEmoteUniques'), 'combined panel should read recent emotes')
assert(source.includes('favoriteEmoteUniques'), 'combined panel should read favorite emotes')
assert(
  !source.includes('subtitle={locked ? getLockedEmoteReason(emote) : emote.packageName}'),
  'combined panel should not show emote package descriptions under names'
)
assert(
  source.includes('Pin Favorite') && source.includes('Unpin Favorite'),
  'combined panel should support pinning emotes'
)
assert(
  !source.includes('setSelectedItemId(isPinned') && !source.includes('emoteItemId("favorites"'),
  'pinning an emote should not force-select the top favorites section'
)
assert(
  !source.includes('setSelectedItemId(emoteItemId("recent"'),
  'sending an emote should keep focus on the selected emote instead of jumping to recent emotes'
)
assert(
  !source.includes('return <Detail markdown={errorMessage}'),
  'combined panel should not replace the grid with an error detail'
)

console.log('Raycast unified panel tests passed')
