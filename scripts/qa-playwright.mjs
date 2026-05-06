import { chromium, firefox, webkit } from 'playwright'

const base = 'http://127.0.0.1:4173'
const routes = ['/', '/work', '/services', '/about', '/contact']
const themes = ['dark', 'light']
const out = 'screenshots/qa-2026-05-03'
const issues = []

async function run(browserType, name) {
  const browser = await browserType.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } })

  page.on('console', (msg) => {
    if (msg.type() === 'error') issues.push(`${name}:console:${msg.text()}`)
  })
  page.on('pageerror', (err) => issues.push(`${name}:pageerror:${err.message}`))

  for (const route of routes) {
    for (const theme of themes) {
      const url = `${base}${route}?theme=${theme}`
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForTimeout(1600)

      if (route === '/') {
        const navLinks = await page.locator('nav a.nav-link').count()
        if (navLinks < 5) issues.push(`${name}:nav-links-missing:${theme}`)
      }

      if (route === '/services') {
        await page.locator('.vsv-accordion-item button').first().click().catch(() => {})
      }

      if (route === '/about') {
        await page.locator('.vabt-team-next').first().click().catch(() => {})
      }

      if (route === '/contact') {
        await page.locator('button:has-text("Send request")').first().click().catch(() => {})
      }

      const normalized = route === '/' ? 'home' : route.slice(1)
      const file = `${out}/${name}-${normalized}-${theme}.png`
      await page.screenshot({ path: file, fullPage: true })
    }
  }

  await page.setViewportSize({ width: 390, height: 1600 })
  for (const route of ['/', '/work', '/services', '/about']) {
    const url = `${base}${route}?theme=dark`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(1200)
    const normalized = route === '/' ? 'home' : route.slice(1)
    const file = `${out}/${name}-mobile-${normalized}-dark.png`
    await page.screenshot({ path: file, fullPage: true })
  }

  await browser.close()
}

await run(chromium, 'chromium')
await run(firefox, 'firefox')
await run(webkit, 'webkit')

if (issues.length) {
  console.log('ISSUES')
  for (const issue of issues) console.log(issue)
} else {
  console.log('ISSUES:none')
}
