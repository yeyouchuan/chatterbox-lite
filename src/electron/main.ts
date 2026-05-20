import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, globalShortcut, ipcMain, Menu, nativeImage, Tray } from 'electron'

import type { BridgeCommandEnvelope } from '../lib/bridge-protocol'
import type { ResizeWindowPayload, WindowDragPointPayload } from '../lib/desktop-api'

import { BridgeServer } from './bridge-server'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const TOGGLE_SHORTCUT = 'Ctrl+Alt+C'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isQuitting = false
let windowDragState: {
  startScreenX: number
  startScreenY: number
  startWindowX: number
  startWindowY: number
} | null = null
let rendererContentTop = 0

const bridgeServer = new BridgeServer()

function createTrayIcon() {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill="#167d68"/>
      <path d="M8 10h16v8.5c0 3.6-2.9 6.5-6.5 6.5h-3C10.9 25 8 22.1 8 18.5V10Z" fill="white"/>
      <path d="M11 7l3 3M21 7l-3 3" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `)
  return nativeImage.createFromDataURL(`data:image/svg+xml;charset=utf-8,${svg}`)
}

function updateTrayMenu(): void {
  if (!tray) return

  const visible = mainWindow?.isVisible() ?? false
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: visible ? 'Hide' : 'Show',
        click: () => toggleMainWindow(),
      },
      {
        label: 'Reconnect',
        click: () => bridgeServer.reconnect(),
      },
      { type: 'separator' },
      {
        label: 'Exit',
        click: () => {
          isQuitting = true
          app.quit()
        },
      },
    ])
  )
}

function createTray(): void {
  tray = new Tray(createTrayIcon())
  tray.setToolTip('Chatterbox Lite')
  tray.on('click', () => toggleMainWindow())
  updateTrayMenu()
}

function toggleMainWindow(): void {
  if (!mainWindow) return

  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
    mainWindow.focus()
  }

  updateTrayMenu()
}

function resizeMainWindow({ width, height, contentTop = 0 }: ResizeWindowPayload): void {
  if (!mainWindow) return
  const bounds = mainWindow.getBounds()
  const nextY = Math.round(bounds.y + rendererContentTop - contentTop)
  rendererContentTop = contentTop
  if (bounds.width === width && bounds.height === height && bounds.y === nextY) return
  mainWindow.setBounds({ x: bounds.x, y: nextY, width, height }, false)
}

function beginWindowDrag({ screenX, screenY }: WindowDragPointPayload): void {
  if (!mainWindow) return
  const bounds = mainWindow.getBounds()
  windowDragState = {
    startScreenX: screenX,
    startScreenY: screenY,
    startWindowX: bounds.x,
    startWindowY: bounds.y,
  }
}

function dragWindow({ screenX, screenY }: WindowDragPointPayload): void {
  if (!mainWindow || !windowDragState) return
  mainWindow.setPosition(
    Math.round(windowDragState.startWindowX + screenX - windowDragState.startScreenX),
    Math.round(windowDragState.startWindowY + screenY - windowDragState.startScreenY),
    false
  )
}

function createMainWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 520,
    height: 180,
    minWidth: 280,
    minHeight: 148,
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  })

  window.setAlwaysOnTop(true)
  window.once('ready-to-show', () => {
    window.show()
    updateTrayMenu()
  })
  window.on('close', event => {
    if (isQuitting) return
    event.preventDefault()
    window.hide()
    updateTrayMenu()
  })
  window.on('show', updateTrayMenu)
  window.on('hide', updateTrayMenu)

  if (process.env.ELECTRON_RENDERER_URL) {
    void window.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return window
}

function registerIpc(): void {
  ipcMain.handle('bridge:get-state', () => bridgeServer.getState())
  ipcMain.handle('bridge:reconnect', () => {
    bridgeServer.reconnect()
  })
  ipcMain.handle('bridge:command', (_event, envelope: BridgeCommandEnvelope) =>
    bridgeServer.sendCommand(envelope.type, envelope.payload)
  )
  ipcMain.handle('window:resize', (_event, payload: ResizeWindowPayload) => {
    resizeMainWindow(payload)
  })
  ipcMain.handle('window:begin-drag', (_event, payload: WindowDragPointPayload) => {
    beginWindowDrag(payload)
  })
  ipcMain.handle('window:drag', (_event, payload: WindowDragPointPayload) => {
    dragWindow(payload)
  })
  ipcMain.handle('window:end-drag', () => {
    windowDragState = null
  })
}

app.whenReady().then(async () => {
  registerIpc()
  mainWindow = createMainWindow()
  createTray()

  const port = await bridgeServer.start()
  bridgeServer.onEvent(event => {
    mainWindow?.webContents.send('bridge:event', event)
  })
  bridgeServer.onEvent(event => {
    if (event.type === 'connected') return
    if (event.type === 'disconnected') updateTrayMenu()
  })
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow?.webContents.send('bridge:event', { type: 'log', message: `桌面桥接端口：${port}` })
  })

  globalShortcut.register(TOGGLE_SHORTCUT, toggleMainWindow)
})

app.on('window-all-closed', () => {})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  bridgeServer.stop()
})
