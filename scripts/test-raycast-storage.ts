import {
  addRecentItem,
  DEFAULT_CHATTERBOX_STORAGE,
  FAVORITE_EMOTE_LIMIT,
  parseChatterboxStorage,
  RECENT_EMOTE_LIMIT,
  RECENT_TEXT_LIMIT,
  toggleStoredItem,
} from '../raycast/src/storage'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const recentTexts = [...Array.from({ length: RECENT_TEXT_LIMIT }, (_, index) => `msg-${index}`), 'old']
const dedupedTexts = addRecentItem(recentTexts, 'msg-3', RECENT_TEXT_LIMIT)
assert(dedupedTexts[0] === 'msg-3', 'recent text should move duplicates to the top')
assert(dedupedTexts.length === RECENT_TEXT_LIMIT, 'recent text should be capped')
assert(!dedupedTexts.includes('old'), 'recent text should drop stale entries past the cap')

const trimmedTexts = addRecentItem(['a'], '  b  ', RECENT_TEXT_LIMIT)
assert(trimmedTexts[0] === 'b', 'recent text should trim values before storing')
assert(addRecentItem(['a'], '   ', RECENT_TEXT_LIMIT).join(',') === 'a', 'blank recent text should be ignored')

const recentEmotes = addRecentItem(
  Array.from({ length: RECENT_EMOTE_LIMIT + 2 }, (_, index) => `emote-${index}`),
  'emote-new',
  RECENT_EMOTE_LIMIT
)
assert(recentEmotes.length === RECENT_EMOTE_LIMIT, 'recent emotes should be capped')
assert(recentEmotes[0] === 'emote-new', 'recent emotes should put the latest unique first')

const favorites = toggleStoredItem(['a', 'b'], 'c', FAVORITE_EMOTE_LIMIT)
assert(favorites.join(',') === 'c,a,b', 'favorite toggle should pin new items to the top')
assert(
  toggleStoredItem(favorites, 'a', FAVORITE_EMOTE_LIMIT).join(',') === 'c,b',
  'favorite toggle should unpin existing items'
)

const manyFavorites = toggleStoredItem(
  Array.from({ length: FAVORITE_EMOTE_LIMIT + 3 }, (_, index) => `fav-${index}`),
  'fav-new',
  FAVORITE_EMOTE_LIMIT
)
assert(manyFavorites.length === FAVORITE_EMOTE_LIMIT, 'favorites should be capped')

const parsed = parseChatterboxStorage(
  JSON.stringify({
    recentTextMessages: ['hello', 1, '', 'world'],
    recentEmoteUniques: ['e1', null, 'e2'],
    favoriteEmoteUniques: ['f1', false, 'f2'],
    lastModeValue: 'emote:123',
  })
)
assert(parsed.recentTextMessages.join(',') === 'hello,world', 'storage parser should ignore invalid text values')
assert(parsed.recentEmoteUniques.join(',') === 'e1,e2', 'storage parser should ignore invalid recent emotes')
assert(parsed.favoriteEmoteUniques.join(',') === 'f1,f2', 'storage parser should ignore invalid favorites')
assert(parsed.lastModeValue === 'emote:123', 'storage parser should keep valid mode values')

const fallback = parseChatterboxStorage('{bad-json')
assert(
  fallback.lastModeValue === DEFAULT_CHATTERBOX_STORAGE.lastModeValue,
  'storage parser should fall back on invalid JSON'
)

console.log('Raycast storage tests passed')
