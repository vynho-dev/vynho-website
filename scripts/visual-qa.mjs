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
  { key: 'careers', path: '/careers' },
  { key: 'contact', path: '/contact' },
  { key: 'privacy', path: '/privacy' },
  { key: 'terms', path: '/terms' },
  { key: 'cookies', path: '/cookies' },
  { key: 'not-found', path: '/this-page-does-not-exist' },
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
  await page.waitForTimeout(500)
}

async function prepareScreenshot(page) {
  await page.addStyleTag({
    content: `
      .motion-reveal, .motion-wave, .vh-work-card, .vh-char-inner,
      .hero-anim-char, .hero-anim-copy-line {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
        animation: none !important;
        transition: none !important;
      }
    `,
  })
  await page.evaluate(() => {
    document.querySelectorAll('video').forEach((video) => video.pause())
  })
}

async function inspectPage(page, deviceKey, theme, route) {
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id)
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
    const brokenImages = [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src)

    return {
      h1Count: document.querySelectorAll('h1').length,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      duplicateIds: [...new Set(duplicateIds)],
      brokenImages,
      title: document.title,
      theme: document.documentElement.dataset.theme,
    }
  })

  const prefix = `[${deviceKey}/${theme}/${route.key}]`
  if (result.h1Count !== 1) qa.errors.push(`${prefix} expected one h1, found ${result.h1Count}`)
  if (result.horizontalOverflow > 1) qa.errors.push(`${prefix} horizontal overflow: ${result.horizontalOverflow}px`)
  if (result.duplicateIds.length) qa.errors.push(`${prefix} duplicate ids: ${result.duplicateIds.join(', ')}`)
  if (result.brokenImages.length) qa.errors.push(`${prefix} broken images: ${result.brokenImages.join(', ')}`)
  if (result.theme !== theme) qa.errors.push(`${prefix} expected ${theme} theme, found ${result.theme}`)
  if (!result.title.trim()) qa.errors.push(`${prefix} missing document title`)
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
          await inspectPage(page, deviceCfg.key, theme, route)
          await prepareScreenshot(page)
          const file = `${route.key}-${theme}-${deviceCfg.key}.png`
          await page.screenshot({ path: path.join(outDir, file), fullPage: true })
        }
      }

      await gotoSettled(page, `${BASE_URL}/?theme=dark`)
      if (deviceCfg.key === 'desktop') {
        await page.locator('.nav-links a[href="/work"]').click()
      } else {
        await page.locator('.mobile-nav-toggle').click()
        await page.locator('.mobile-drawer a[href="/work"]').click()
      }
      await page.waitForTimeout(350)
      qa.checks.push(`Nav route to work (${deviceCfg.key}): ${page.url()}`)

      await gotoSettled(page, `${BASE_URL}/services?theme=light`)
      const serviceTriggers = page.locator('.vsv-accordion-item > button')
      for (let index = 0; index < await serviceTriggers.count(); index += 1) {
        const trigger = serviceTriggers.nth(index)
        await trigger.click()
        if ((await trigger.getAttribute('aria-expanded')) !== 'true') qa.errors.push(`[${deviceCfg.key}] Services accordion ${index + 1} did not open`)
      }
      qa.checks.push(`All services accordions clickable (${deviceCfg.key}): ok`)

      await gotoSettled(page, `${BASE_URL}/?theme=dark`)
      const homeServiceTriggers = page.locator('.vh-service-trigger')
      for (let index = 0; index < await homeServiceTriggers.count(); index += 1) {
        const trigger = homeServiceTriggers.nth(index)
        await trigger.click()
        if ((await trigger.getAttribute('aria-expanded')) !== 'true') qa.errors.push(`[${deviceCfg.key}] Home service accordion ${index + 1} did not open`)
      }
      const faqTriggers = page.locator('.vh-faq-trigger')
      for (let index = 0; index < await faqTriggers.count(); index += 1) {
        const trigger = faqTriggers.nth(index)
        const before = await trigger.getAttribute('aria-expanded')
        await trigger.click()
        if ((await trigger.getAttribute('aria-expanded')) === before) qa.errors.push(`[${deviceCfg.key}] FAQ ${index + 1} did not toggle`)
      }
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await page.locator('.footer-top-btn').click()
      await page.waitForFunction(() => window.scrollY < 10)
      qa.checks.push(`Home accordions and back-to-top control (${deviceCfg.key}): ok`)

      await gotoSettled(page, `${BASE_URL}/work?theme=dark`)
      for (const filter of ['Platforms', 'Apps', 'Products', 'Commerce', 'Immersive', 'All']) {
        await page.getByRole('tab', { name: filter, exact: true }).click()
        const cards = await page.locator('.vwk-project-card').count()
        if (cards < 1) qa.errors.push(`[${deviceCfg.key}] Work filter ${filter} returned no cards`)
      }
      qa.checks.push(`All work filters clickable (${deviceCfg.key}): ok`)

      await gotoSettled(page, `${BASE_URL}/about?theme=dark`)
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('vynho:open-contact-modal'))
      })
      await page.waitForTimeout(300)
      const modalVisible = await page.locator('.vct-modal-backdrop').isVisible()
      qa.checks.push(`Let's Talk flow modal visible (${deviceCfg.key}): ${modalVisible}`)
      await page.keyboard.press('Escape')
      if (await page.locator('.vct-modal-backdrop').count()) qa.errors.push(`[${deviceCfg.key}] Contact modal did not close with Escape`)

      await gotoSettled(page, `${BASE_URL}/contact?theme=dark`)
      await page.locator('.vct-form button[type="submit"]').click()
      const validationErrors = await page.locator('.vct-form [role="alert"]').count()
      if (validationErrors !== 4) qa.errors.push(`[${deviceCfg.key}] Contact validation expected 4 errors, found ${validationErrors}`)
      qa.checks.push(`Contact form validation (${deviceCfg.key}): ${validationErrors} errors shown`)

      await gotoSettled(page, `${BASE_URL}/this-page-does-not-exist?theme=light`)
      if (!(await page.getByRole('link', { name: /return home/i }).isVisible())) qa.errors.push(`[${deviceCfg.key}] 404 recovery link is missing`)

      await gotoSettled(page, `${BASE_URL}/?theme=light`)
      await page.reload({ waitUntil: 'domcontentloaded' })
      await page.waitForFunction(() => document.documentElement.dataset.theme === 'light')
      const persistedTheme = await page.evaluate(() => document.documentElement.dataset.theme)
      if (persistedTheme !== 'light') qa.errors.push(`[${deviceCfg.key}] Light theme did not persist across reload`)

      if (deviceCfg.key !== 'desktop') {
        await page.locator('.mobile-nav-toggle').click()
        await page.locator('.mobile-drawer a[href="/services"]').click()
        await page.waitForTimeout(350)
        if (!page.url().includes('/services')) qa.errors.push(`[${deviceCfg.key}] Mobile navigation did not reach services`)
      }

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
