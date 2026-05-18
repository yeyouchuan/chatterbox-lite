import { getRoomCacheKey, shouldRefreshRoomCache } from '../src/lib/room-cache'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(getRoomCacheKey('https://live.bilibili.com/12345?spm_id_from=1') === '12345', 'should use room id path segment')
assert(getRoomCacheKey('https://live.bilibili.com/blanc/12345') === '12345', 'should find room id in nested paths')
assert(getRoomCacheKey('https://live.bilibili.com/') === null, 'should return null when no room id exists')

assert(shouldRefreshRoomCache(null, '12345'), 'empty cache should refresh')
assert(!shouldRefreshRoomCache('12345', '12345'), 'same room should reuse cache')
assert(shouldRefreshRoomCache('12345', '67890'), 'different room should refresh cache')
assert(shouldRefreshRoomCache('12345', null), 'unknown current room should refresh cache')

console.log('Room cache tests passed')
