import { readFileSync } from 'node:fs'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const viteConfig = readFileSync('vite.config.ts', 'utf8')
const releaseWorkflow = readFileSync('.github/workflows/release.yml', 'utf8')
const readme = readFileSync('README.md', 'utf8')
const githubPagesBaseUrl =
  'USERSCRIPT_BASE_URL: https://$' + '{{ github.repository_owner }}.github.io/$' + '{{ github.event.repository.name }}'

assert(viteConfig.includes('USERSCRIPT_BASE_URL'), 'vite config should accept a hosted userscript base URL')
assert(viteConfig.includes('downloadURL'), 'vite config should emit @downloadURL for hosted builds')
assert(viteConfig.includes('updateURL'), 'vite config should emit @updateURL for hosted builds')
assert(
  releaseWorkflow.includes('branches: [main, master]'),
  'GitHub Pages workflow should run on both common default branches'
)
assert(releaseWorkflow.includes('workflow_dispatch:'), 'GitHub Pages workflow should support manual deploys')
assert(
  !releaseWorkflow.includes('oven-sh/setup-bun'),
  'GitHub Pages workflow should not depend on the setup-bun action tarball being downloadable'
)
assert(
  releaseWorkflow.includes('https://bun.sh/install') && releaseWorkflow.includes('$HOME/.bun/bin'),
  'GitHub Pages workflow should install Bun directly and put it on PATH'
)
assert(
  releaseWorkflow.includes(githubPagesBaseUrl),
  'GitHub Pages workflow should publish builds with a stable hosted userscript URL'
)
assert(readme.includes('Hosted install'), 'README should document the hosted install flow')

console.log('Hosted userscript config tests passed')
