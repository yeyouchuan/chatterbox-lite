import { addSendHistoryEntry, navigateSendHistory } from '../src/lib/send-history'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const first = addSendHistoryEntry([], ' hello ')
assert(first.length === 1 && first[0] === 'hello', 'should trim and store sent messages')

const deduped = addSendHistoryEntry(['old', 'hello', 'older'], 'hello')
assert(deduped.join('|') === 'hello|old|older', 'should move duplicate messages to the top')

const capped = addSendHistoryEntry(['1', '2', '3'], '4', 3)
assert(capped.join('|') === '4|1|2', 'should cap history length')

const empty = addSendHistoryEntry(['1'], '   ')
assert(empty.join('|') === '1', 'should ignore empty messages')

let nav = navigateSendHistory(['newest', 'older'], 'draft', { index: -1, draft: '' }, 'older')
assert(nav.text === 'newest', 'ArrowUp should show the newest history item first')
assert(nav.state.index === 0 && nav.state.draft === 'draft', 'first ArrowUp should preserve current draft')

nav = navigateSendHistory(['newest', 'older'], nav.text, nav.state, 'older')
assert(nav.text === 'older' && nav.state.index === 1, 'repeated ArrowUp should move to older items')

nav = navigateSendHistory(['newest', 'older'], nav.text, nav.state, 'newer')
assert(nav.text === 'newest' && nav.state.index === 0, 'ArrowDown should move toward newer items')

nav = navigateSendHistory(['newest', 'older'], nav.text, nav.state, 'newer')
assert(nav.text === 'draft' && nav.state.index === -1, 'ArrowDown from newest should restore the draft')

console.log('Send history tests passed')
