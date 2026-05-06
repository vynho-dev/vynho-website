import { chromium, firefox, webkit } from 'playwright'

const base = 'http://127.0.0.1:4173'
const routes = ['/', '/work', '/services', '/about', '/contact']
const themes = ['dark', 'light']
const browsers = [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
]

for (const [name, launcher] of browsers) {
  const browser = await launcher.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  const issues = []
  page.on('console', (msg) => { if (msg.type() === 'error') issues.push(`console:${msg.text()}`) })
  page.on('pageerror', (err) => issues.push(`pageerror:${err.message}`))

  for (const route of routes) {
    for (const theme of themes) {
      await page.goto(`${base}${route}?theme=${theme}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForTimeout(900)
    }
  }

  console.log(`${name}:issues:${issues.length}`)
  if (issues.length) {
    for (const issue of issues) console.log(`${name}:${issue}`)
  }

  await browser.close()
}
