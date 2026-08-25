import pages from '@/content/seo-pages.json'

export const SITE_ORIGIN = 'https://vynho.com'
export const SITE_NAME = 'Vynho'
export const SOCIAL_IMAGE_PATH = '/assets/og/vynho-social.png'

export type SeoPage = {
  path: string
  title: string
  description: string
  pageType: string
  indexable: boolean
}

export const seoPages = pages as SeoPage[]

export function getSeoPage(path: string) {
  return seoPages.find((page) => page.path === path)
}

export function getCanonicalUrl(path: string) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}/`
}

export function getStructuredData(page: SeoPage) {
  const url = getCanonicalUrl(page.path)
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
      logo: `${SITE_ORIGIN}/assets/brand/wordmark-primary.svg`,
      email: 'info@vynho.com',
      telephone: '+91 8179266373',
      description: 'Founder-led product design and engineering studio for ambitious digital products.',
      address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
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
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': page.pageType,
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: { '@id': `${SITE_ORIGIN}/#organization` },
      inLanguage: 'en',
    },
  ]

  if (page.path === '/services') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Product design and engineering',
      description: page.description,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      areaServed: 'Worldwide',
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
