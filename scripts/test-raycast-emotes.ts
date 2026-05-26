import type { BilibiliEmoticonPackage } from '../src/types'

import {
  buildEmoteSections,
  flattenSendableEmotes,
  getLockedEmoteReason,
  isLockedEmote,
  resolveEmotesByUnique,
  toggleFavoriteEmote,
} from '../raycast/src/emotes'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const packages: BilibiliEmoticonPackage[] = [
  {
    pkg_id: 1,
    pkg_name: 'first hidden package',
    pkg_type: 0,
    pkg_descript: '',
    emoticons: [
      {
        emoji: 'hidden',
        descript: 'Hidden',
        url: 'https://example.com/hidden.png',
        emoticon_unique: 'hidden_1',
        emoticon_id: 1,
      },
    ],
  },
  {
    pkg_id: 2,
    pkg_name: 'room',
    pkg_type: 0,
    pkg_descript: '',
    emoticons: [
      {
        emoji: 'ok',
        descript: 'Unlocked',
        url: 'https://example.com/ok.png',
        emoticon_unique: 'room_1_1',
        emoticon_id: 2,
        perm: 1,
      },
      {
        emoji: 'locked',
        descript: 'Locked',
        url: 'https://example.com/locked.png',
        emoticon_unique: 'room_1_2',
        emoticon_id: 3,
        perm: 0,
        unlock_show_text: '舰长',
      },
      {
        emoji: 'wave',
        descript: '中文挥手',
        url: 'https://example.com/wave.png',
        emoticon_unique: 'room_1_3',
        emoticon_id: 4,
        perm: 1,
      },
    ],
  },
  {
    pkg_id: 3,
    pkg_name: 'guard pack',
    pkg_type: 0,
    pkg_descript: '',
    emoticons: [
      {
        emoji: 'guard',
        descript: 'Guard',
        url: 'https://example.com/guard.png',
        emoticon_unique: 'guard_1',
        emoticon_id: 5,
        perm: 1,
      },
    ],
  },
]

const flattened = flattenSendableEmotes(packages)
assert(flattened.length === 4, 'raycast emote list should hide the first source package')
assert(flattened[0]?.packageName === 'room', 'raycast emote list should retain package names')
assert(flattened[0]?.title === 'Unlocked', 'raycast emote title should prefer descript')
assert(flattened[1] && isLockedEmote(flattened[1]), 'raycast emote helper should detect locked emotes')
assert(getLockedEmoteReason(flattened[1]) === '需要舰长', 'raycast emote helper should expose the unlock requirement')

const resolved = resolveEmotesByUnique(packages, ['guard_1', 'missing', 'room_1_1', 'guard_1'])
assert(resolved.length === 2, 'raycast emote resolver should skip missing and duplicate uniques')
assert(resolved[0]?.unique === 'guard_1', 'raycast emote resolver should preserve stored order')

assert(
  toggleFavoriteEmote(['room_1_1'], 'guard_1').join(',') === 'guard_1,room_1_1',
  'raycast emote favorite toggle should pin new favorites'
)
assert(
  toggleFavoriteEmote(['guard_1', 'room_1_1'], 'guard_1').join(',') === 'room_1_1',
  'raycast emote favorite toggle should unpin favorites'
)

const allSections = buildEmoteSections({
  packages,
  query: '',
  modeValue: 'emote:all',
  recent: ['room_1_3', 'missing'],
  favorites: ['guard_1'],
})
assert(allSections[0]?.id === 'favorites', 'raycast emote sections should put favorites first')
assert(allSections[1]?.id === 'recent', 'raycast emote sections should put recent emotes below favorites')
assert(
  allSections.some(section => section.packageName === 'room'),
  'raycast emote sections should include package groups'
)

const packageSections = buildEmoteSections({
  packages,
  query: '',
  modeValue: 'emote:2',
  recent: ['guard_1', 'room_1_3'],
  favorites: ['guard_1', 'room_1_1'],
})
assert(
  packageSections.every(section => section.emotes.every(emote => emote.packageId === '2')),
  'raycast emote package mode should filter favorites, recent, and package sections'
)

const searchSections = buildEmoteSections({
  packages,
  query: '中文',
  modeValue: 'emote:all',
  recent: [],
  favorites: [],
})
assert(searchSections.length === 1, 'raycast emote search should match Chinese descriptions')
assert(searchSections[0]?.emotes[0]?.unique === 'room_1_3', 'raycast emote search should keep matched emotes')

console.log('Raycast emote tests passed')
