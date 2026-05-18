import { cn } from '../lib/cn'
import { dialogOpen, showAudioOnlyButton } from '../lib/store'
import { AudioOnlyButton } from './audio-only-button'

export function ToggleButton() {
  return (
    <div class='pointer-events-auto fixed right-4 bottom-6 z-2147483647 flex items-center gap-1'>
      {showAudioOnlyButton.value && <AudioOnlyButton />}
      <button
        type='button'
        id='chatterbox-lite-toggle'
        onClick={() => {
          dialogOpen.value = !dialogOpen.value
        }}
        class={cn(
          'appearance-none border-none outline-none',
          'cursor-pointer select-none',
          'rounded px-2 py-1 text-white',
          dialogOpen.value ? 'bg-brand' : 'bg-ga6'
        )}
      >
        弹幕助手
      </button>
    </div>
  )
}
