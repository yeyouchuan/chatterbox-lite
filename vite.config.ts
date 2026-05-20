import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

const userscriptBaseUrl = process.env.USERSCRIPT_BASE_URL?.replace(/\/$/, '')
const hostedUserscriptUrls = userscriptBaseUrl
  ? {
      downloadURL: `${userscriptBaseUrl}/chatterbox-lite.user.js`,
      updateURL: `${userscriptBaseUrl}/chatterbox-lite.meta.js`,
    }
  : {}

export default defineConfig({
  plugins: [
    tailwindcss(),
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'Chatterbox Lite',
        namespace: 'https://greasyfork.org/users/1524935',
        description:
          'A slim Bilibili Live danmaku helper with audio-only mode, keyword replacement, and manual sending.',
        author: 'laplace-live; Chatterbox Lite fork',
        license: 'AGPL-3.0',
        icon: 'https://laplace.live/favicon.ico',
        match: ['https://live.bilibili.com/*'],
        noframes: true,
        'run-at': 'document-start',
        ...hostedUserscriptUrls,
      },
      build: {
        metaFileName: true,
      },
    }),
  ],
})
