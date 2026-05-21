import { InfoIcon } from '@phosphor-icons/react'
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

import {
  bilibiliUserData,
  bilibiliUserError,
  bilibiliUserLoading,
  ensureInfoData,
  fertilityData,
  fertilityError,
  fertilityLoading,
  getFertilityDisplay,
  infoCurrentUid,
  resetInfoData,
} from '../lib/info-status'
import { cachedStreamerUid, infoFertilityEnabled, infoGuildEnabled, infoMcnEnabled } from '../lib/store'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function InfoButton() {
  const open = useSignal(false)
  const anyEnabled = infoFertilityEnabled.value || infoGuildEnabled.value || infoMcnEnabled.value

  useEffect(() => {
    const uid = cachedStreamerUid.value
    if (uid !== infoCurrentUid.value) {
      resetInfoData()
      infoCurrentUid.value = uid
    }
  }, [cachedStreamerUid.value])

  useEffect(() => {
    if (!anyEnabled) return
    ensureInfoData(infoCurrentUid.value)
  }, [anyEnabled, infoCurrentUid.value, infoFertilityEnabled.value, infoGuildEnabled.value, infoMcnEnabled.value])

  if (!anyEnabled) return null

  const fertilityEmoji =
    infoFertilityEnabled.value && fertilityData.value ? getFertilityDisplay(fertilityData.value.status).emoji : null

  return (
    <Popover
      open={open.value}
      onOpenChange={v => {
        open.value = v
      }}
    >
      <PopoverTrigger>
        <Button
          id='chatterbox-lite-info-toggle'
          variant='secondary'
          size='icon'
          aria-label='主播额外信息'
          title='主播额外信息'
          className='border-ga6 bg-ga6 text-white'
        >
          {fertilityEmoji ? (
            <span class='text-base leading-none'>{fertilityEmoji}</span>
          ) : (
            <InfoIcon size={15} weight='bold' aria-hidden='true' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' align='end' className='w-80 max-w-[calc(100vw-24px)] p-3 text-[13px]'>
        <InfoPopoverBody />
      </PopoverContent>
    </Popover>
  )
}

function InfoPopoverBody() {
  const uid = infoCurrentUid.value
  if (uid === null) {
    return <div class='text-ga6'>正在解析当前直播间 UID…</div>
  }

  return (
    <div class='flex flex-col gap-3'>
      <div class='flex items-center justify-between gap-2'>
        <div class='font-bold'>主播额外信息</div>
        <a href={`https://laplace.live/user/${uid}`} target='_blank' rel='noopener' class='text-link no-underline'>
          UID {uid} ↗
        </a>
      </div>

      {infoFertilityEnabled.value && <FertilitySection />}
      {infoGuildEnabled.value && <GuildSection />}
      {infoMcnEnabled.value && <McnSection />}
    </div>
  )
}

function SectionHeading({ children }: { children: preact.ComponentChildren }) {
  return <div class='font-bold text-ga6 uppercase'>{children}</div>
}

function StatusLine({ children, color }: { children: preact.ComponentChildren; color?: string }) {
  return <div style={color ? { color } : undefined}>{children}</div>
}

function FertilitySection() {
  const data = fertilityData.value
  const loading = fertilityLoading.value
  const error = fertilityError.value

  return (
    <section class='flex flex-col gap-1'>
      <SectionHeading>
        魔法期{' '}
        <a href='https://laplace.live/ovu' target='_blank' class='font-mono font-normal text-brand' rel='noopener'>
          /ovu
        </a>
      </SectionHeading>
      {loading && !data ? (
        <StatusLine color='var(--Ga6,#666)'>正在加载…</StatusLine>
      ) : error ? (
        <StatusLine color='#f44'>加载失败：{error}</StatusLine>
      ) : !data ? (
        <StatusLine color='var(--Ga6,#666)'>暂无数据</StatusLine>
      ) : (
        <FertilityCard data={data} />
      )}
    </section>
  )
}

function FertilityCard({ data }: { data: NonNullable<typeof fertilityData.value> }) {
  const display = getFertilityDisplay(data.status)
  let nextPeriodText = data.nextPeriod
  const parsed = new Date(data.nextPeriod)
  if (!Number.isNaN(parsed.getTime())) {
    nextPeriodText = parsed.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  const cyclesElapsed = data.cyclesElapsedSinceObservation
  const stale = cyclesElapsed > 0

  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-1'>
        <span
          class='inline-flex items-center gap-1 rounded px-1.5 py-0.5'
          style={{ color: display.color, background: display.bg }}
        >
          <span>{display.emoji}</span>
          <span>{display.label}</span>
          {stale && <span class='text-ga6'>(推测)</span>}
        </span>
      </div>
      <div class='text-ga6'>
        周期第 {data.dayInCycle} 天 / 共 {data.effectiveCycleLength} 天 · 下次预计 {nextPeriodText}
      </div>
      <div class='text-ga6'>
        数据来源 {data.dataPoints} 条{stale && ` · 已推测 ${cyclesElapsed} 个周期`}
      </div>
    </div>
  )
}

function GuildSection() {
  const data = bilibiliUserData.value
  const loading = bilibiliUserLoading.value
  const error = bilibiliUserError.value

  return (
    <section class='flex flex-col gap-1'>
      <SectionHeading>公会</SectionHeading>
      {loading && !data ? (
        <StatusLine color='var(--Ga6,#666)'>正在加载…</StatusLine>
      ) : error ? (
        <StatusLine color='#f44'>加载失败：{error}</StatusLine>
      ) : !data ? (
        <StatusLine color='var(--Ga6,#666)'>暂无数据</StatusLine>
      ) : (
        <GuildList history={data.guildInfo?.history ?? []} />
      )}
    </section>
  )
}

function GuildList({ history }: { history: { name: string; updatedAt: number }[] }) {
  if (history.length === 0) {
    return <StatusLine color='var(--Ga6,#666)'>暂无公会记录</StatusLine>
  }

  const recent = history.slice(0, 5)
  return (
    <ul class='m-0 flex list-none flex-col gap-1 p-0'>
      {recent.map((entry, i) => (
        <li key={`${entry.name}-${entry.updatedAt}`} class='flex items-baseline justify-between gap-2'>
          <span class={i === 0 ? 'font-medium' : 'text-ga6'}>{entry.name}</span>
          <span class='text-[11px] text-ga6'>{formatRelativeDate(entry.updatedAt)}</span>
        </li>
      ))}
      {history.length > recent.length && (
        <li class='text-[11px] text-ga6'>… 还有 {history.length - recent.length} 条历史记录</li>
      )}
    </ul>
  )
}

function McnSection() {
  const data = bilibiliUserData.value
  const loading = bilibiliUserLoading.value
  const error = bilibiliUserError.value

  return (
    <section class='flex flex-col gap-1'>
      <SectionHeading>MCN</SectionHeading>
      {loading && !data ? (
        <StatusLine color='var(--Ga6,#666)'>正在加载…</StatusLine>
      ) : error ? (
        <StatusLine color='#f44'>加载失败：{error}</StatusLine>
      ) : !data?.mcnInfo ? (
        <StatusLine color='var(--Ga6,#666)'>暂无 MCN 记录</StatusLine>
      ) : (
        <McnList history={data.mcnInfo.history ?? []} />
      )}
    </section>
  )
}

function McnList({ history }: { history: { mcnName: string; updatedAt: number }[] }) {
  if (history.length === 0) {
    return <StatusLine color='var(--Ga6,#666)'>暂无 MCN 记录</StatusLine>
  }

  const recent = history.slice(0, 5)
  return (
    <ul class='m-0 flex list-none flex-col gap-1 p-0'>
      {recent.map((entry, i) => (
        <li key={`${entry.mcnName}-${entry.updatedAt}`} class='flex items-baseline justify-between gap-2'>
          <span class={i === 0 ? 'font-medium' : 'text-ga6'}>{entry.mcnName}</span>
          <span class='text-[11px] text-ga6'>{formatRelativeDate(entry.updatedAt)}</span>
        </li>
      ))}
      {history.length > recent.length && (
        <li class='text-[11px] text-ga6'>… 还有 {history.length - recent.length} 条历史记录</li>
      )}
    </ul>
  )
}

function formatRelativeDate(ts: number): string {
  if (!Number.isFinite(ts) || ts <= 0) return '未知'
  const diff = Date.now() - ts
  if (diff < 0) return '未来'
  const day = 86400_000
  const days = Math.floor(diff / day)
  if (days < 1) return '今天'
  if (days < 30) return `${days} 天前`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} 个月前`
  const years = Math.floor(days / 365)
  return `${years} 年前`
}
