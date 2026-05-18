import {
  blockedRetryEnabled,
  dialogLeft,
  dialogTop,
  showAudioOnlyButton,
  showLogPanel,
  showNormalSendPanel,
  showReplacementPanel,
} from '../lib/store'
import { Button } from './ui/button'

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
      </div>
    </div>
  )
}
