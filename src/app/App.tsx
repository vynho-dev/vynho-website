import { Suspense, lazy, useEffect, useState } from 'react'
import { privacyContent, termsContent, cookiesContent } from '@/content/legal'
import { getCanonicalUrl, getSeoPage, getStructuredData, SITE_ORIGIN, SOCIAL_IMAGE_PATH, type SeoPage } from '@/content/seo'
import { trackPageView } from '@/lib/analytics'
import { AnalyticsConsent } from '@/components/analytics/AnalyticsConsent'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const WorkPage = lazy(() => import('@/pages/WorkPage').then((m) => ({ default: m.WorkPage })))
const CareersPage = lazy(() => import('@/pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const notFoundMeta: SeoPage = {
  path: '/404',
  title: 'Page not found | Vynho',
  description: 'The requested Vynho page could not be found.',
  pageType: 'WebPage',
  indexable: false,
}

function getPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const onPop = () => setPath(getPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1)
      if (!id) return
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  useEffect(() => {
    const meta = getSeoPage(path) ?? notFoundMeta
    const canonicalUrl = getCanonicalUrl(path)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', `${SITE_ORIGIN}${SOCIAL_IMAGE_PATH}`)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', `${SITE_ORIGIN}${SOCIAL_IMAGE_PATH}`)
    const pageMeta = getSeoPage(path)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', pageMeta ? 'index,follow,max-image-preview:large' : 'noindex,follow')
    const canonical = document.querySelector('link[rel="canonical"]')
    if (pageMeta) canonical?.setAttribute('href', canonicalUrl)
    else canonical?.remove()
    const schema = document.querySelector<HTMLScriptElement>('#vynho-schema')
    if (pageMeta && schema) schema.textContent = JSON.stringify(getStructuredData(pageMeta))
    else schema?.remove()
    trackPageView()
  }, [path])

  function renderPage() {
    switch (path) {
      case '/about': return <AboutPage />
      case '/services': return <ServicesPage />
      case '/work': return <WorkPage />
      case '/careers': return <CareersPage />
      case '/contact': return <ContactPage />
      case '/privacy': return <LegalPage {...privacyContent} />
      case '/terms': return <LegalPage {...termsContent} />
      case '/cookies': return <LegalPage {...cookiesContent} />
      case '/': return <HomePage />
      default: return <NotFoundPage />
    }
  }

  return (
    <>
      <Suspense fallback={null}>{renderPage()}</Suspense>
      <AnalyticsConsent />
    </>
  )
}
