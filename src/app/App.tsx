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

const PAGE_TITLES: Record<string, string> = {
  '/': 'Vynho — High-End Design & Engineered Products',
  '/work': 'Vynho Work — Global Products, Engineered',
  '/services': 'Vynho Services — Full-Stack Expertise',
  '/about': 'About Vynho — People Behind the Craft',
  '/careers': 'Careers at Vynho',
  '/contact': "Contact Vynho — Let's Talk",
  '/privacy': 'Privacy Policy — Vynho',
  '/terms': 'Terms — Vynho',
  '/cookies': 'Cookies — Vynho',
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
    document.title = PAGE_TITLES[path] ?? 'Vynho'
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
      default: return <HomePage />
    }
  }

  return (
    <>
      <Suspense fallback={null}>{renderPage()}</Suspense>
      <ContactModalManager />
    </>
  )
}
