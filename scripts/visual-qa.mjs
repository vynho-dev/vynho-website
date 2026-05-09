import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { chromium, devices } from 'playwright'

const HOST = '127.0.0.1'
const PORT = 4173
const BASE_URL = `http://${HOST}:${PORT}`
const routes = [
  { key: 'home', path: '/' },
  { key: 'work', path: '/work' },
  { key: 'services', path: '/services' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
]
const themes = ['dark', 'light']
const viewports = [
  { key: 'desktop', viewport: { width: 1440, height: 900 } },
  { key: 'tablet', viewport: { width: 1024, height: 1366 } },
  { key: 'mobile', viewport: devices['iPhone 12'].viewport },
]

const outDir = path.resolve('artifacts/visual-qa')
mkdirSync(outDir, { recursive: true })

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' })
      if (res.ok) return
    } catch {
      // retry
    }
    await wait(250)
  }
  throw new Error(`Preview server did not start within ${timeoutMs}ms`)
}

async function gotoSettled(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
}

const qa = {
  errors: [],
  failedRequests: [],
  badResponses: [],
  checks: [],
}

function pushUnique(arr, value) {
  if (!arr.includes(value)) arr.push(value)
}

async function run() {
  const preview = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )

  let previewLogs = ''
  preview.stdout.on('data', (d) => {
    previewLogs += d.toString()
  })
  preview.stderr.on('data', (d) => {
    previewLogs += d.toString()
  })

  try {
    await waitForServer(BASE_URL)
    const browser = await chromium.launch({ headless: true })

    for (const deviceCfg of viewports) {
      const context = await browser.newContext({ viewport: deviceCfg.viewport })
      const page = await context.newPage()

      page.on('console', (msg) => {
        if (msg.type() === 'error') pushUnique(qa.errors, `[${deviceCfg.key}] ${msg.text()}`)
      })
      page.on('pageerror', (err) => pushUnique(qa.errors, `[${deviceCfg.key}] ${err.message}`))
      page.on('requestfailed', (req) => {
        const failure = req.failure()?.errorText ?? 'requestfailed'
        if (failure.includes('ERR_ABORTED')) return
        pushUnique(qa.failedRequests, `[${deviceCfg.key}] ${req.method()} ${req.url()} :: ${failure}`)
      })
      page.on('response', (res) => {
        if (res.status() >= 400) {
          pushUnique(qa.badResponses, `[${deviceCfg.key}] ${res.status()} ${res.url()}`)
        }
      })

      for (const theme of themes) {
        for (const route of routes) {
          await gotoSettled(page, `${BASE_URL}${route.path}?theme=${theme}`)
          const file = `${route.key}-${theme}-${deviceCfg.key}.png`
          await page.screenshot({ path: path.join(outDir, file), fullPage: true })
        }
      }

      await gotoSettled(page, `${BASE_URL}/?theme=dark`)
      await page.evaluate(() => {
        window.location.assign('/work')
      })
      await page.waitForTimeout(300)
      qa.checks.push(`Nav route to work (${deviceCfg.key}): ${page.url()}`)

      await gotoSettled(page, `${BASE_URL}/services?theme=light`)
      await page.locator('#vsv-service-button-1').click()
      await page.waitForTimeout(250)
      qa.checks.push(`Services accordion clickable (${deviceCfg.key}): ok`)

      await gotoSettled(page, `${BASE_URL}/about?theme=dark`)
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('vynho:open-contact-modal'))
      })
      await page.waitForTimeout(300)
      const modalVisible = await page.locator('.vct-modal-backdrop').isVisible()
      qa.checks.push(`Let's Talk flow modal visible (${deviceCfg.key}): ${modalVisible}`)

      await context.close()
    }

    await browser.close()

    writeFileSync(
      path.join(outDir, 'qa-summary.json'),
      JSON.stringify({ ...qa, previewLogs: previewLogs.slice(-6000) }, null, 2),
      'utf8',
    )

    if (qa.errors.length || qa.failedRequests.length || qa.badResponses.length) {
      console.error('Visual QA found issues. See artifacts/visual-qa/qa-summary.json')
      process.exit(1)
    }

    console.log('Visual QA passed. See artifacts/visual-qa/')
  } finally {
    preview.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
