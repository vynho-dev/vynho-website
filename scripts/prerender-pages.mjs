import { spawn } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputDir = join(repoRoot, 'dist')
const seoPages = JSON.parse(await readFile(join(repoRoot, 'src/content/seo-pages.json'), 'utf8'))
const port = 4174
const baseUrl = `http://127.0.0.1:${port}`

function waitForPreview() {
  return new Promise((resolve, reject) => {
    const preview = spawn(process.execPath, [
      join(repoRoot, 'node_modules', 'vite', 'bin', 'vite.js'),
      'preview',
      '--host',
      '127.0.0.1',
      '--port',
      String(port),
      '--strictPort',
    ], {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let settled = false
    let output = ''
    const settle = (error) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      clearInterval(poll)
      if (error) reject(error)
      else resolve(preview)
    }
    const pollPreview = async () => {
      try {
        const response = await fetch(baseUrl)
        if (response.ok) settle()
      } catch {
        // The preview process is still starting.
      }
    }
    const poll = setInterval(() => void pollPreview(), 200)
    const timer = setTimeout(() => settle(new Error(`Timed out waiting for the Vite preview server. ${output}`)), 15_000)
    preview.stdout.on('data', (chunk) => { output += chunk.toString() })
    preview.stderr.on('data', (chunk) => { output += chunk.toString() })
    preview.on('error', (error) => {
      settle(error)
    })
    preview.on('exit', (code) => {
      if (settled) return
      settle(new Error(`Vite preview exited before it was ready (${code ?? 'unknown'}). ${output}`))
    })
    void pollPreview()
  })
}

function outputFile(path) {
  return path === '/' ? join(outputDir, 'index.html') : join(outputDir, path.slice(1), 'index.html')
}

const preview = await waitForPreview()
const browser = await chromium.launch({ headless: true })

try {
  for (const pageMeta of seoPages) {
    const page = await browser.newPage()
    await page.goto(`${baseUrl}${pageMeta.path}`, { waitUntil: 'domcontentloaded' })
    await page.locator('#root h1').waitFor({ state: 'visible' })
    await page.evaluate(async () => { await document.fonts?.ready })
    await page.waitForTimeout(150)
    await writeFile(outputFile(pageMeta.path), await page.content())
    await page.close()
  }

  const notFound = await browser.newPage()
  await notFound.goto(`${baseUrl}/404.html`, { waitUntil: 'domcontentloaded' })
  await notFound.locator('#root h1').waitFor({ state: 'visible' })
  await notFound.waitForTimeout(150)
  await writeFile(join(outputDir, '404.html'), await notFound.content())
  await notFound.close()
} finally {
  await browser.close()
  preview.kill('SIGTERM')
}
