import { ArrowsClockwiseIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

import type { ReplacementRule } from '../types'

import { appendLog } from '../lib/log'
import { buildReplacementMap, REMOTE_KEYWORDS_SYNC_INTERVAL_MS, syncRemoteKeywords } from '../lib/replacement'
import { getRuntimeAdapter } from '../lib/runtime'
import {
  cachedRoomId,
  localGlobalRules,
  localRoomRules,
  remoteKeywords,
  remoteKeywordsLastSync,
  replacementPanelOpen,
} from '../lib/store'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'
import { Input } from './ui/input'

function formatSyncStatus(): string {
  const data = remoteKeywords.value
  const syncedAt = remoteKeywordsLastSync.value
  if (!data || !syncedAt) return '未同步'

  const globalCount = Object.keys(data.global?.keywords ?? {}).length
  const roomId = cachedRoomId.value
  const roomKeywords =
    roomId === null ? {} : (data.rooms?.find(room => String(room.room) === String(roomId))?.keywords ?? {})
  const roomCount = Object.keys(roomKeywords).length
  const time = new Date(syncedAt).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${time} · 全局 ${globalCount} / 本房间 ${roomCount}`
}

function RuleList({
  rules,
  empty,
  onRemove,
}: {
  rules: ReplacementRule[]
  empty: string
  onRemove: (index: number) => void
}) {
  if (rules.length === 0) {
    return <div class='rounded bg-ga1 px-2 py-2 text-[12px] text-ga6'>{empty}</div>
  }

  return (
    <div class='max-h-24 space-y-1 overflow-y-auto'>
      {rules.map((rule, index) => (
        <div key={`${rule.from}-${index}`} class='flex items-center gap-2 rounded bg-ga1 px-2 py-1'>
          <span class='min-w-0 flex-1 truncate text-[12px]'>
            {rule.from || '(空)'} {'->'} {rule.to || '(空)'}
          </span>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='h-5 px-1 text-danger'
            onClick={() => onRemove(index)}
          >
            <TrashIcon weight='bold' aria-hidden='true' />
            删除
          </Button>
        </div>
      ))}
    </div>
  )
}

export function ReplacementPanel() {
  const syncing = useSignal(false)
  const status = useSignal(formatSyncStatus())
  const globalFrom = useSignal('')
  const globalTo = useSignal('')
  const roomFrom = useSignal('')
  const roomTo = useSignal('')

  const syncRemote = async () => {
    if (syncing.value) return
    syncing.value = true
    status.value = '正在同步…'
    try {
      await syncRemoteKeywords()
      status.value = formatSyncStatus()
      appendLog('✅ 云端词库同步完成')
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      status.value = `同步失败：${msg}`
      appendLog(`❌ 云端词库同步失败：${msg}`)
    } finally {
      syncing.value = false
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        await getRuntimeAdapter().ensureRoomState()
      } catch {
        return
      }

      const last = remoteKeywordsLastSync.value
      if (!last || Date.now() - last > REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
        await syncRemote()
      } else {
        buildReplacementMap()
        status.value = formatSyncStatus()
      }
    })()
  }, [])

  const addGlobalRule = () => {
    const from = globalFrom.value.trim()
    if (!from) {
      appendLog('⚠️ 替换前内容不能为空')
      return
    }
    localGlobalRules.value = [...localGlobalRules.value, { from, to: globalTo.value }]
    buildReplacementMap()
    globalFrom.value = ''
    globalTo.value = ''
  }

  const addRoomRule = () => {
    const from = roomFrom.value.trim()
    const roomId = cachedRoomId.value
    if (!from) {
      appendLog('⚠️ 替换前内容不能为空')
      return
    }
    if (roomId === null) {
      appendLog('⚠️ 尚未识别当前直播间')
      return
    }

    const key = String(roomId)
    const next = { ...localRoomRules.value }
    next[key] = [...(next[key] ?? []), { from, to: roomTo.value }]
    localRoomRules.value = next
    buildReplacementMap()
    roomFrom.value = ''
    roomTo.value = ''
  }

  const removeGlobalRule = (index: number) => {
    const next = [...localGlobalRules.value]
    next.splice(index, 1)
    localGlobalRules.value = next
    buildReplacementMap()
  }

  const removeRoomRule = (index: number) => {
    const roomId = cachedRoomId.value
    if (roomId === null) return
    const key = String(roomId)
    const rules = [...(localRoomRules.value[key] ?? [])]
    rules.splice(index, 1)

    const next = { ...localRoomRules.value }
    if (rules.length === 0) delete next[key]
    else next[key] = rules
    localRoomRules.value = next
    buildReplacementMap()
  }

  const roomKey = cachedRoomId.value === null ? null : String(cachedRoomId.value)
  const roomRules = roomKey === null ? [] : (localRoomRules.value[roomKey] ?? [])

  return (
    <AccordionItem
      open={replacementPanelOpen.value}
      onOpenChange={v => {
        replacementPanelOpen.value = v
      }}
      className='border-ga2 border-t border-solid pt-3'
    >
      <AccordionTrigger>词库</AccordionTrigger>
      <AccordionContent className='pt-2'>
        <div class='mb-2 flex items-center justify-between gap-2'>
          <div class='min-w-0 truncate text-[11px] text-ga6'>{status.value}</div>
          <Button variant='outline' size='sm' disabled={syncing.value} onClick={() => void syncRemote()}>
            <ArrowsClockwiseIcon className={syncing.value ? 'animate-spin' : undefined} aria-hidden='true' />
            {syncing.value ? '同步中…' : '同步云端'}
          </Button>
        </div>

        <div class='space-y-3'>
          <div>
            <div class='mb-1 font-bold text-[12px]'>本地全局</div>
            <RuleList rules={localGlobalRules.value} empty='暂无全局替换规则' onRemove={removeGlobalRule} />
            <div class='mt-2 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1'>
              <Input
                placeholder='替换前'
                value={globalFrom.value}
                onInput={e => {
                  globalFrom.value = e.currentTarget.value
                }}
              />
              <span class='text-ga6'>{'->'}</span>
              <Input
                placeholder='替换后'
                value={globalTo.value}
                onInput={e => {
                  globalTo.value = e.currentTarget.value
                }}
              />
              <Button size='sm' onClick={addGlobalRule}>
                <PlusIcon weight='bold' aria-hidden='true' />加
              </Button>
            </div>
          </div>

          <div>
            <div class='mb-1 flex items-center justify-between gap-2'>
              <span class='font-bold text-[12px]'>当前房间</span>
              <span class='text-[11px] text-ga6'>{roomKey ? `房间 ${roomKey}` : '识别中'}</span>
            </div>
            <RuleList rules={roomRules} empty='暂无当前房间替换规则' onRemove={removeRoomRule} />
            <div class='mt-2 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1'>
              <Input
                placeholder='替换前'
                value={roomFrom.value}
                onInput={e => {
                  roomFrom.value = e.currentTarget.value
                }}
              />
              <span class='text-ga6'>{'->'}</span>
              <Input
                placeholder='替换后'
                value={roomTo.value}
                onInput={e => {
                  roomTo.value = e.currentTarget.value
                }}
              />
              <Button size='sm' onClick={addRoomRule}>
                <PlusIcon weight='bold' aria-hidden='true' />加
              </Button>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
