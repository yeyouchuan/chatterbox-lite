import type { BilibiliEmoticonPackage } from '../src/types'

import {
  addRecentEmoticon,
  getPinnedEmoticons,
  getRecentEmoticons,
  getVisibleEmoticonPackages,
  RECENT_EMOTE_LIMIT,
  togglePinnedEmoticon,
} from '../src/lib/emote-picker'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
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

const packages = [
  pkg(1, 'first group', ['first_a', 'first_b']),
  pkg(2, 'room', ['room_a', 'room_b']),
  pkg(3, 'guard', ['guard_a']),
]

const visible = getVisibleEmoticonPackages(packages)
assert(visible.length === 2, 'should hide the first package from the picker')
assert(visible[0]?.pkg_id === 2, 'first visible package should be the second source package')
assert(packages.length === 3, 'should not mutate the original package list')

const pinned = getPinnedEmoticons(packages, ['guard_a', 'missing', 'first_a', 'room_a'])
assert(pinned.length === 2, 'should only resolve pinned emotes from visible packages')
assert(pinned[0]?.emoticon_unique === 'guard_a', 'should preserve pinned order')
assert(pinned[1]?.emoticon_unique === 'room_a', 'should drop hidden first-group emotes')

const withPinned = togglePinnedEmoticon(['room_a'], 'guard_a')
assert(withPinned[0] === 'guard_a' && withPinned[1] === 'room_a', 'newly pinned emotes should move to the top')

const withoutPinned = togglePinnedEmoticon(withPinned, 'guard_a')
assert(withoutPinned.length === 1 && withoutPinned[0] === 'room_a', 'existing pinned emotes should be removed')

const recent = getRecentEmoticons(packages, ['room_b', 'guard_a', 'room_a', 'missing'], ['guard_a'])
assert(recent.length === 2, 'recent emotes should skip pinned and missing emotes')
assert(recent[0]?.emoticon_unique === 'room_b', 'recent emotes should preserve recent order')
assert(recent[1]?.emoticon_unique === 'room_a', 'recent emotes should include visible unpinned emotes')

const nextRecent = addRecentEmoticon(['room_a', 'room_b'], 'room_a')
assert(nextRecent.join('|') === 'room_a|room_b', 'recent emotes should dedupe and move the latest to the top')
assert(
  addRecentEmoticon(
    Array.from({ length: RECENT_EMOTE_LIMIT }, (_, index) => `e${index}`),
    'new'
  ).length === RECENT_EMOTE_LIMIT,
  'recent emotes should be capped'
)

console.log('Emote picker tests passed')
