import { chromium } from 'playwright'

const base = 'http://127.0.0.1:4173'
const routes = ['/', '/work', '/services', '/about', '/contact']
const themes = ['dark', 'light']
const issues = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 2000 } })

page.on('console', (msg) => {
  if (msg.type() === 'error') issues.push(msg.text())
})
page.on('pageerror', (err) => issues.push(err.message))

for (const route of routes) {
  for (const theme of themes) {
    await page.goto(`${base}${route}?theme=${theme}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(1100)
    const normalized = route === '/' ? 'home' : route.slice(1)
    await page.screenshot({
      path: `screenshots/qa-2026-05-04-final-${theme}-${normalized}.png`,
      fullPage: true,
    })
  }
}

await page.setViewportSize({ width: 390, height: 1600 })
for (const route of ['/', '/work', '/services', '/about']) {
  await page.goto(`${base}${route}?theme=dark`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(800)
  const normalized = route === '/' ? 'home' : route.slice(1)
  await page.screenshot({
    path: `screenshots/qa-2026-05-04-final-mobile-dark-${normalized}.png`,
    fullPage: true,
  })
}

console.log(`issues:${issues.length}`)
if (issues.length) {
  for (const issue of issues) console.log(issue)
}

await browser.close()
