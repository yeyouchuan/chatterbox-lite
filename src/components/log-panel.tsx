import { useEffect, useRef } from 'preact/hooks'

import { logLines, MAX_LOG_LINES } from '../lib/log'
import { logPanelOpen } from '../lib/store'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Textarea } from './ui/textarea'

export function LogPanel() {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [logLines.value])

  return (
    <AccordionItem
      open={logPanelOpen.value}
      onOpenChange={v => {
        logPanelOpen.value = v
      }}
      className='border-[color:var(--chatterbox-lite-acrylic-divider)] border-t border-solid pt-3'
    >
      <AccordionTrigger>日志</AccordionTrigger>
      <AccordionContent className='pt-2'>
        <Textarea
          ref={ref}
          readOnly
          value={logLines.value.join('\n')}
          placeholder={`此处将输出日志（最多保留 ${MAX_LOG_LINES} 条）`}
          className='h-20 resize-none text-[12px]'
        />
      </AccordionContent>
    </AccordionItem>
  )
}
