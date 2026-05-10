import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const stylesRoot = path.resolve('src/styles')
const ignoreDirs = new Set(['architecture', 'foundation', 'legacy'])
const allowedDuplicates = new Set(['.vct-submit-btn'])
const cssFiles = []

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (ignoreDirs.has(entry)) continue
      walk(full)
      continue
    }
    if (full.endsWith('.css')) cssFiles.push(full)
  }
}

walk(stylesRoot)

const selectorMap = new Map()
const selectorRe = /^\s*([.#][^,{]+)\s*\{/gm

for (const file of cssFiles) {
  const rel = path.relative(process.cwd(), file)
  const src = readFileSync(file, 'utf8')
  let match
  while ((match = selectorRe.exec(src)) !== null) {
    const selector = match[1].trim()
    if (selector.startsWith('.arch-')) continue
    if (!selectorMap.has(selector)) selectorMap.set(selector, [])
    selectorMap.get(selector).push(rel)
  }
}

const duplicates = [...selectorMap.entries()]
  .filter(([, files]) => new Set(files).size > 1)
  .filter(([selector]) => !allowedDuplicates.has(selector))
  .map(([selector, files]) => ({ selector, files: [...new Set(files)] }))

if (duplicates.length === 0) {
  console.log('styles:health OK - no cross-file selector duplicates in page css scope')
  process.exit(0)
}

console.log(`styles:health WARN - ${duplicates.length} duplicated selectors across page css files:`)
for (const dup of duplicates.slice(0, 80)) {
  console.log(`- ${dup.selector}`)
  for (const file of dup.files) console.log(`  - ${file}`)
}

process.exit(1)
