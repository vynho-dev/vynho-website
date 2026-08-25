import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(repoRoot, 'dist')
const pages = JSON.parse(await readFile(join(repoRoot, 'src/content/seo-pages.json'), 'utf8'))
const origin = 'https://vynho.com'

function outputFile(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
}

function canonical(path) {
  return path === '/' ? `${origin}/` : `${origin}${path}/`
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

for (const page of pages) {
  const file = outputFile(page.path)
  await access(file)
  const html = await readFile(file, 'utf8')
  assert.match(html, new RegExp(`<title>${escapeHtml(page.title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`))
  assert.match(html, new RegExp(`<link rel="canonical" href="${canonical(page.path)}"`))
  assert.match(html, /<meta name="robots" content="index,follow,max-image-preview:large"/)
  assert.match(html, /<div id="root">[\s\S]*?<h1\b/)
  const schema = html.match(/<script id="vynho-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(schema, `${page.path} is missing JSON-LD`)
  const graph = JSON.parse(schema)['@graph']
  assert.ok(graph.some((item) => item['@type'] === 'Organization'), `${page.path} is missing Organization schema`)
  assert.ok(graph.some((item) => item['@type'] === page.pageType), `${page.path} is missing ${page.pageType} schema`)
}

const robots = await readFile(join(dist, 'robots.txt'), 'utf8')
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
assert.match(robots, /Sitemap: https:\/\/vynho\.com\/sitemap\.xml/)
for (const page of pages) assert.ok(sitemap.includes(canonical(page.path)), `Sitemap is missing ${page.path}`)

const notFound = await readFile(join(dist, '404.html'), 'utf8')
assert.match(notFound, /<meta name="robots" content="noindex,follow"/)
assert.doesNotMatch(notFound, /<link rel="canonical"/)
assert.doesNotMatch(notFound, /id="vynho-schema"/)
console.log(`SEO static-output check passed for ${pages.length} canonical pages.`)
