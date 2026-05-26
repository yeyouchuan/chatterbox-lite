import { app } from 'electron'

import { BridgeServer } from './bridge-server'

const bridgeServer = new BridgeServer()

async function startHelper(): Promise<void> {
  try {
    app.setName('Arclight Helper')
    const port = await bridgeServer.start()
    console.info(`Arclight helper bridge listening on 127.0.0.1:${port}`)
  } catch (err) {
    console.error(`Arclight helper failed to start: ${err instanceof Error ? err.message : String(err)}`)
    app.exit(1)
  }
}

app.whenReady().then(() => {
  void startHelper()
})

app.on('window-all-closed', event => {
  event.preventDefault()
})

app.on('will-quit', () => {
  bridgeServer.stop()
})

process.on('SIGINT', () => {
  app.quit()
})

process.on('SIGTERM', () => {
  app.quit()
})
