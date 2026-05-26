import { GearSixIcon } from '@phosphor-icons/react'

import { settingsPanelOpen } from '../lib/store'
import { SettingsPanel } from './settings-panel'
import { Button } from './ui/button'
import { Popover, type PopoverAlign, PopoverContent, type PopoverSide, PopoverTrigger } from './ui/popover'

export function SettingsPopoverButton({ side = 'top', align = 'end' }: { side?: PopoverSide; align?: PopoverAlign }) {
  return (
    <Popover
      open={settingsPanelOpen.value}
      onOpenChange={v => {
        settingsPanelOpen.value = v
      }}
    >
      <PopoverTrigger>
        <Button
          variant={settingsPanelOpen.value ? 'default' : 'outline'}
          size='sm'
          className='w-6 px-0'
          aria-label='打开设置'
          title='设置'
        >
          <GearSixIcon size={15} weight='bold' aria-hidden='true' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} portal className='w-[230px]'>
        <div
          class='overflow-y-auto p-2'
          style={{ maxHeight: 'min(320px, var(--chatterbox-lite-popover-max-height, 44vh))' }}
        >
          <SettingsPanel />
        </div>
      </PopoverContent>
    </Popover>
  )
}
