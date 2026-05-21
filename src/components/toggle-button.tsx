import { cn } from '../lib/cn'
import { dialogOpen, showAudioOnlyButton } from '../lib/store'
import { AudioOnlyButton } from './audio-only-button'
import { InfoButton } from './info-button'
import { Button } from './ui/button'

export function ToggleButton() {
  return (
    <div class='pointer-events-auto fixed right-2 bottom-3 z-2147483647 flex items-center gap-1'>
      {showAudioOnlyButton.value && <AudioOnlyButton />}
      <InfoButton />
      <Button
        type='button'
        id='chatterbox-lite-toggle'
        variant='secondary'
        onClick={() => {
          dialogOpen.value = !dialogOpen.value
        }}
        className={cn(
          'px-2 py-1 text-white',
          'active:scale-[0.96]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          '[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3',
          dialogOpen.value ? 'border-brand bg-brand' : 'border-ga6 bg-ga6'
        )}
      >
        弹幕助手
      </Button>
    </div>
  )
}
