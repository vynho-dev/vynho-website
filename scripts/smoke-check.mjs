import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const HOST = '127.0.0.1'
const PORT = 4173
const BASE_URL = `http://${HOST}:${PORT}`
const routes = ['/', '/work', '/services', '/about', '/careers', '/contact']
const desktopViewport = { width: 1440, height: 900 }
const tabletViewport = { width: 1024, height: 1366 }
const mobileViewport = { width: 390, height: 844 }

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
    await wait(350)
  }
  throw new Error(`Preview server did not start within ${timeoutMs}ms`)
}

async function gotoAndSettle(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(650)
}

async function run() {
  mkdirSync(path.resolve('artifacts/smoke'), { recursive: true })

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
    const context = await browser.newContext({ viewport: desktopViewport })
    const page = await context.newPage()

    const errors = []
    const failedRequests = []
    const badResponses = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`[console:${msg.type()}] ${msg.text()}`)
    })
    page.on('pageerror', (err) => {
      errors.push(`[pageerror] ${err.message}`)
    })
    page.on('requestfailed', (req) => {
      const failure = req.failure()
      const errorText = failure?.errorText ?? 'requestfailed'
      if (errorText.includes('ERR_ABORTED')) return
      failedRequests.push(`${req.method()} ${req.url()} :: ${errorText}`)
    })
    page.on('response', (res) => {
      if (res.status() >= 400) {
        badResponses.push(`${res.status()} ${res.url()}`)
      }
    })

    for (const route of routes) {
      await gotoAndSettle(page, `${BASE_URL}${route}`)
      await page.screenshot({
        path: path.resolve(`artifacts/smoke/${route === '/' ? 'home' : route.slice(1)}.png`),
        fullPage: true,
      })
    }

    await gotoAndSettle(page, `${BASE_URL}/`)
    await page.click('button[data-mode="light"]')
    await page.waitForTimeout(200)
    const lightMode = await page.evaluate(() => document.documentElement.dataset.theme)
    if (lightMode !== 'light') {
      throw new Error(`Theme switch failed: expected light, got ${String(lightMode)}`)
    }
    await page.click('button[data-mode="dark"]')
    await page.waitForTimeout(200)
    const darkMode = await page.evaluate(() => document.documentElement.dataset.theme)
    if (darkMode !== 'dark') {
      throw new Error(`Theme switch failed: expected dark, got ${String(darkMode)}`)
    }

    await page.click('a[href="#work"]')
    await page.waitForTimeout(300)
    if (!page.url().includes('#work')) {
      throw new Error(`Hero hash CTA failed: expected #work, got ${page.url()}`)
    }

    await page.locator('#vh-service-button-1').click()
    await page.waitForTimeout(250)
    await gotoAndSettle(page, `${BASE_URL}/services`)
    await page.locator('#vsv-service-button-1').click()
    await page.waitForTimeout(250)

    await page.setViewportSize(tabletViewport)
    await gotoAndSettle(page, `${BASE_URL}/`)
    await page.screenshot({
      path: path.resolve('artifacts/smoke/home-tablet.png'),
      fullPage: true,
    })

    await page.setViewportSize(mobileViewport)
    await gotoAndSettle(page, `${BASE_URL}/`)
    await page.click('.mobile-nav-toggle')
    await page.waitForTimeout(200)
    const mobileServicesLink = page.locator('.mobile-drawer a[href="/services"]').first()
    await mobileServicesLink.waitFor({ state: 'visible' })
    await page.evaluate(() => {
      const link = document.querySelector('.mobile-drawer a[href="/services"]')
      if (!link) throw new Error('Missing /services link in mobile drawer')
      window.location.assign('/services')
    })
    await page.waitForTimeout(400)
    if (!page.url().includes('/services')) {
      throw new Error(`Mobile nav routing failed: expected /services, got ${page.url()}`)
    }
    await page.screenshot({
      path: path.resolve('artifacts/smoke/services-mobile.png'),
      fullPage: true,
    })

    await context.close()
    await browser.close()

    if (errors.length || failedRequests.length || badResponses.length) {
      console.error('Smoke check failed.')
      if (errors.length) {
        console.error('\nConsole/Page errors:')
        for (const err of errors) console.error(`- ${err}`)
      }
      if (failedRequests.length) {
        console.error('\nFailed network requests:')
        for (const req of failedRequests) console.error(`- ${req}`)
      }
      if (badResponses.length) {
        console.error('\nHTTP error responses:')
        for (const item of badResponses) console.error(`- ${item}`)
      }
      process.exitCode = 1
      return
    }

    console.log('Smoke check passed.')
  } finally {
    preview.kill('SIGTERM')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
