import { existsSync, readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const source = readFileSync('src/electron/main.ts', 'utf8')
const electronConfigSource = readFileSync('electron.vite.config.ts', 'utf8')
const packageSource = readFileSync('package.json', 'utf8')
const installSource = readFileSync('scripts/install-raycast-local.ps1', 'utf8')

assert(source.includes('BridgeServer'), 'helper main should keep the bridge server')
assert(source.includes('bridgeServer.start()'), 'helper main should start the bridge server')
assert(!source.includes('BrowserWindow'), 'helper main should not create a desktop window')
assert(!source.includes('Tray'), 'helper main should not keep a tray UI')
assert(!source.includes('globalShortcut'), 'helper main should not register desktop window shortcuts')
assert(!source.includes('ipcMain'), 'helper main should not expose renderer IPC')
assert(!source.includes('renderer/index.html'), 'helper main should not load a renderer')
assert(!source.includes('preload'), 'helper main should not load a preload script')

assert(!electronConfigSource.includes('renderer:'), 'helper build should not include a renderer target')
assert(!electronConfigSource.includes('preload:'), 'helper build should not include a preload target')
assert(!electronConfigSource.includes('@preact/preset-vite'), 'helper build should not include Preact renderer plugins')
assert(!electronConfigSource.includes('@tailwindcss/vite'), 'helper build should not include Tailwind renderer plugins')

assert(!existsSync('src/desktop'), 'desktop renderer directory should be removed')
assert(!existsSync('src/components/desktop-app.tsx'), 'desktop app component should be removed')
assert(!existsSync('src/electron/preload.ts'), 'desktop preload should be removed')
assert(!existsSync('src/lib/desktop-api.ts'), 'desktop renderer API should be removed')
assert(!existsSync('src/lib/desktop-runtime.ts'), 'desktop renderer runtime should be removed')

assert(packageSource.includes('"helper:build"'), 'package scripts should expose a helper build command')
assert(packageSource.includes('"helper:clean"'), 'package scripts should clean stale desktop renderer output')
assert(packageSource.includes('out/preload'), 'helper clean should remove stale preload output')
assert(packageSource.includes('out/renderer'), 'helper clean should remove stale renderer output')
assert(packageSource.includes('"out/main/**/*"'), 'packaged helper should only include the main helper output')
assert(!packageSource.includes('"out/**/*"'), 'packaged helper should not include stale renderer output')
assert(installSource.includes('bun run helper:build'), 'Raycast installer should build the helper, not a desktop app')

console.log('Helper-only mode tests passed')
