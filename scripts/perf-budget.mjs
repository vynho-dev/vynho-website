import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const assetsDir = path.resolve('dist/assets')

const budgets = [
  { label: 'app js', match: /^index-.*\.js$/, maxBytes: 235 * 1024 },
  { label: 'home route js', match: /^HomePage-.*\.js$/, maxBytes: 20 * 1024 },
  { label: 'reveal js', match: /^Reveal-.*\.js$/, maxBytes: 35 * 1024 },
  { label: 'global css', match: /^index-.*\.css$/, maxBytes: 130 * 1024 },
]

function formatKiB(bytes) {
  return `${(bytes / 1024).toFixed(2)} KiB`
}

const files = readdirSync(assetsDir)
let hasError = false

for (const budget of budgets) {
  const matching = files.filter((name) => budget.match.test(name))
  const file = matching.sort((a, b) => {
    const aTime = statSync(path.join(assetsDir, a)).mtimeMs
    const bTime = statSync(path.join(assetsDir, b)).mtimeMs
    return bTime - aTime
  })[0]
  if (!file) {
    hasError = true
    console.error(`Missing bundle for budget "${budget.label}"`)
    continue
  }

  const fullPath = path.join(assetsDir, file)
  const size = statSync(fullPath).size
  if (size > budget.maxBytes) {
    hasError = true
    console.error(
      `Budget exceeded for ${budget.label}: ${formatKiB(size)} > ${formatKiB(budget.maxBytes)} (${file})`,
    )
  } else {
    console.log(`OK ${budget.label}: ${formatKiB(size)} <= ${formatKiB(budget.maxBytes)} (${file})`)
  }
}

if (hasError) {
  process.exit(1)
}
