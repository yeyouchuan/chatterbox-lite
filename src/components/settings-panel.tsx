import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react'

import {
  autoSeekBufferThreshold,
  autoSeekCurrentBufferLen,
  autoSeekCurrentRate,
  autoSeekEnabled,
  blockedRetryEnabled,
  danmakuDirectEnabled,
  dialogLeft,
  dialogTop,
  showAudioOnlyButton,
  showLogPanel,
  showNormalSendPanel,
  showReplacementPanel,
} from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'

function SettingCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label class='flex cursor-pointer items-center gap-2 text-[12px]'>
      <input
        type='checkbox'
        checked={checked}
        class='h-3.5 w-3.5 accent-brand'
        onInput={e => {
          onChange(e.currentTarget.checked)
        }}
      />
      <span>{label}</span>
    </label>
  )
}

export function SettingsPanel() {
  const autoSeekDelayDelta = autoSeekCurrentBufferLen.value - autoSeekBufferThreshold.value
  const autoSeekDelayColor =
    autoSeekCurrentBufferLen.value < 0.2
      ? 'var(--chatterbox-lite-status-danger)'
      : autoSeekDelayDelta > 1
        ? 'var(--chatterbox-lite-status-warning)'
        : 'var(--chatterbox-lite-status-success)'
  const autoSeekRateColor =
    Math.abs(autoSeekCurrentRate.value - 1) < 0.005
      ? 'var(--chatterbox-lite-status-neutral)'
      : autoSeekCurrentRate.value > 1
        ? 'var(--chatterbox-lite-status-warning)'
        : 'var(--chatterbox-lite-status-danger)'
  const updateAutoSeekEnabled = (value: boolean) => {
    autoSeekEnabled.value = value
  }
  const updateAutoSeekBufferThreshold = (value: number) => {
    autoSeekBufferThreshold.value = value
  }

  return (
    <div class='space-y-2'>
      <div class='flex items-center justify-between gap-2'>
        <div class='font-bold text-[12px]'>显示与行为</div>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            dialogLeft.value = null
            dialogTop.value = null
          }}
        >
          <ArrowCounterClockwiseIcon weight='bold' aria-hidden='true' />
          重置位置
        </Button>
      </div>
      <div class='grid gap-1'>
        <SettingCheckbox
          label='显示仅音频按钮'
          checked={showAudioOnlyButton.value}
          onChange={v => {
            showAudioOnlyButton.value = v
          }}
        />
        <SettingCheckbox
          label='显示发送功能'
          checked={showNormalSendPanel.value}
          onChange={v => {
            showNormalSendPanel.value = v
          }}
        />
        <SettingCheckbox
          label='显示词库功能'
          checked={showReplacementPanel.value}
          onChange={v => {
            showReplacementPanel.value = v
          }}
        />
        <SettingCheckbox
          label='显示日志功能'
          checked={showLogPanel.value}
          onChange={v => {
            showLogPanel.value = v
          }}
        />
        <SettingCheckbox
          label='屏蔽词失败后自动重试'
          checked={blockedRetryEnabled.value}
          onChange={v => {
            blockedRetryEnabled.value = v
          }}
        />
        <SettingCheckbox
          label='显示弹幕 +1 / 复制'
          checked={danmakuDirectEnabled.value}
          onChange={v => {
            danmakuDirectEnabled.value = v
          }}
        />
        <div class='mt-1 border-[color:var(--chatterbox-lite-acrylic-divider)] border-t border-t-solid pt-1 font-bold text-[12px]'>
          播放器追帧
        </div>
        <SettingCheckbox
          label='启用自动追帧'
          checked={autoSeekEnabled.value}
          onChange={v => {
            updateAutoSeekEnabled(v)
          }}
        />
        <label htmlFor='autoSeekBufferThreshold' class='flex items-center gap-1 text-[12px]'>
          <span>目标延迟</span>
          <Input
            id='autoSeekBufferThreshold'
            type='number'
            min='0.3'
            max='10'
            step='0.1'
            disabled={!autoSeekEnabled.value}
            value={autoSeekBufferThreshold.value}
            className='w-16'
            onInput={e => {
              const value = Number.parseFloat(e.currentTarget.value)
              if (Number.isFinite(value) && value >= 0.3 && value <= 10) {
                updateAutoSeekBufferThreshold(value)
              }
            }}
            onBlur={e => {
              let value = Number.parseFloat(e.currentTarget.value)
              if (!Number.isFinite(value) || value < 0.3) value = 0.3
              if (value > 10) value = 10
              updateAutoSeekBufferThreshold(value)
            }}
          />
          <span>秒</span>
        </label>
        {autoSeekEnabled.value && (
          <div class='rounded border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control p-1.5 text-[12px] backdrop-blur-md'>
            <div>
              当前延迟{' '}
              <span style={{ color: autoSeekDelayColor, fontWeight: 600 }}>
                {autoSeekCurrentBufferLen.value.toFixed(2)} 秒
              </span>
            </div>
            <div>
              播放速度{' '}
              <span style={{ color: autoSeekRateColor, fontWeight: 600 }}>{autoSeekCurrentRate.value.toFixed(2)}×</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
