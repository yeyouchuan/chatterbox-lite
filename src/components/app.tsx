import { useEffect } from 'preact/hooks'

import { ensureRoomId, fetchEmoticons } from '../lib/api'
import { startAudioOnly, stopAudioOnly } from '../lib/audio-only'
import { startAutoSeek, stopAutoSeek } from '../lib/auto-seek'
import { startDanmakuDirect, stopDanmakuDirect } from '../lib/danmaku-direct'
import { startDesktopBridgeAgent } from '../lib/desktop-bridge-agent'
import { appendLog } from '../lib/log'
import { ensureRemoteKeywordsSynced } from '../lib/replacement'
import { setRuntimeAdapter } from '../lib/runtime'
import { userscriptRuntime } from '../lib/userscript-runtime'
import { Configurator } from './configurator'
import { ToggleButton } from './toggle-button'

export function App() {
  useEffect(() => {
    setRuntimeAdapter(userscriptRuntime)

    void (async () => {
      try {
        const roomId = await ensureRoomId()
        try {
          await ensureRemoteKeywordsSynced()
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          appendLog(`⚠️ 云端词库同步失败，将使用本地词库：${msg}`)
        }
        await fetchEmoticons(roomId)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        appendLog(`❌ 初始化失败：${msg}`)
      }
    })()

    const desktopBridgeAgent = startDesktopBridgeAgent()
    startAudioOnly()
    startAutoSeek()
    startDanmakuDirect()
    return () => {
      desktopBridgeAgent.stop()
      stopAudioOnly()
      stopAutoSeek()
      stopDanmakuDirect()
    }
  }, [])

  return (
    <>
      <ToggleButton />
      <Configurator />
    </>
  )
}
