import { Suspense, lazy, useEffect, useState } from 'react'
import { ContactModalManager } from '@/components/contact/ContactModalManager'
import { privacyContent, termsContent, cookiesContent } from '@/content/legal'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const WorkPage = lazy(() => import('@/pages/WorkPage').then((m) => ({ default: m.WorkPage })))
const CareersPage = lazy(() => import('@/pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': { title: 'Vynho — High-End Design & Engineered Products', description: 'Founder-led product strategy, design, and engineering for ambitious digital products.' },
  '/work': { title: 'Vynho Work — Digital Products, Engineered', description: 'Explore selected product, platform, mobile, commerce, and immersive work from Vynho.' },
  '/services': { title: 'Vynho Services — Full-Stack Expertise', description: 'Product strategy, UX, web, mobile, AI workflows, and scalable engineering in one focused studio.' },
  '/about': { title: 'About Vynho — Small by Design', description: 'Meet the founder-led operating model and specialist network behind Vynho.' },
  '/careers': { title: 'Careers at Vynho', description: 'Collaborate with Vynho on thoughtful product design, engineering, and AI systems.' },
  '/contact': { title: "Contact Vynho — Let's Talk", description: 'Tell Vynho what you are building and start a practical conversation about scope, strategy, and delivery.' },
  '/privacy': { title: 'Privacy Policy — Vynho', description: 'How Vynho handles information shared through this website.' },
  '/terms': { title: 'Terms — Vynho', description: 'Terms for using the Vynho website.' },
  '/cookies': { title: 'Cookies — Vynho', description: 'Information about cookies and related technologies on the Vynho website.' },
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
    const meta = PAGE_META[path] ?? { title: 'Page not found — Vynho', description: 'The requested Vynho page could not be found.' }
    const canonicalUrl = `https://vynho.com${path === '/' ? '' : path}`
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
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
      <ContactModalManager />
    </>
  )
}
