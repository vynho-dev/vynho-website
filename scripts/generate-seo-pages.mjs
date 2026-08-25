import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputDir = join(repoRoot, 'dist')
const seoPages = JSON.parse(await readFile(join(repoRoot, 'src/content/seo-pages.json'), 'utf8'))
const origin = 'https://vynho.com'
const socialImage = `${origin}/assets/og/vynho-social.jpg`

function canonicalUrl(path) {
  return path === '/' ? `${origin}/` : `${origin}${path}/`
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function structuredData(page) {
  const url = canonicalUrl(page.path)
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'Vynho',
      url: `${origin}/`,
      logo: `${origin}/assets/brand/wordmark-primary.svg`,
      image: socialImage,
      email: 'info@vynho.com',
      telephone: '+91 8179266373',
      description: 'Founder-led product design and engineering studio for ambitious digital products.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://x.com/VynhoDev',
        'https://www.instagram.com/vynho.dev/',
        'https://www.reddit.com/user/vynhodev/',
        'https://www.linkedin.com/company/vynho',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'info@vynho.com',
        telephone: '+91 8179266373',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: 'Vynho',
      publisher: { '@id': `${origin}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': page.pageType,
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@id': `${origin}/#organization` },
      inLanguage: 'en',
    },
  ]

  if (page.path === '/services') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Product design and engineering',
      description: page.description,
      provider: { '@id': `${origin}/#organization` },
      areaServed: 'Worldwide',
    })
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function htmlForPage(template, page) {
  const url = canonicalUrl(page.path)
  const robots = page.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const replacements = {
    '<title>[^<]*</title>': `<title>${title}</title>`,
    '<meta name="description" content="[^"]*" />': `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="[^"]*" />': `<meta name="robots" content="${robots}" />`,
    '<meta property="og:title" content="[^"]*" />': `<meta property="og:title" content="${title}" />`,
    '<meta property="og:description" content="[^"]*" />': `<meta property="og:description" content="${description}" />`,
    '<meta property="og:url" content="[^"]*" />': `<meta property="og:url" content="${url}" />`,
    '<meta property="og:image" content="[^"]*" />': `<meta property="og:image" content="${socialImage}" />`,
    '<meta name="twitter:title" content="[^"]*" />': `<meta name="twitter:title" content="${title}" />`,
    '<meta name="twitter:description" content="[^"]*" />': `<meta name="twitter:description" content="${description}" />`,
    '<meta name="twitter:image" content="[^"]*" />': `<meta name="twitter:image" content="${socialImage}" />`,
    '<link rel="canonical" href="[^"]*" />': `<link rel="canonical" href="${url}" />`,
    '<script id="vynho-schema" type="application/ld\\+json">[\\s\\S]*?</script>': `<script id="vynho-schema" type="application/ld+json">${structuredData(page)}</script>`,
  }

  return Object.entries(replacements).reduce(
    (html, [pattern, replacement]) => html.replace(new RegExp(pattern), replacement),
    template,
  )
}

const template = await readFile(join(outputDir, 'index.html'), 'utf8')

for (const page of seoPages) {
  const filePath = page.path === '/'
    ? join(outputDir, 'index.html')
    : join(outputDir, page.path.slice(1), 'index.html')
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, htmlForPage(template, page))
}

const notFound = {
  path: '/404',
  title: 'Page not found | Vynho',
  description: 'The requested Vynho page could not be found.',
  pageType: 'WebPage',
  indexable: false,
}
await writeFile(join(outputDir, '404.html'), htmlForPage(template, notFound))
