import { useEffect } from 'preact/hooks'

import { ensureRoomId, fetchEmoticons } from '../lib/api'
import { startAudioOnly, stopAudioOnly } from '../lib/audio-only'
import { appendLog } from '../lib/log'
import { Configurator } from './configurator'
import { ToggleButton } from './toggle-button'

export function App() {
  useEffect(() => {
    void (async () => {
      try {
        const roomId = await ensureRoomId()
        await fetchEmoticons(roomId)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        appendLog(`❌ 初始化失败：${msg}`)
      }
    })()

    startAudioOnly()
    return () => stopAudioOnly()
  }, [])

  return (
    <>
      <ToggleButton />
      <Configurator />
    </>
  )
}
