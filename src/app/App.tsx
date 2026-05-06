import { Suspense, lazy, useEffect } from 'react'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { WorkPage } from '@/pages/WorkPage'
import { CareersPage } from '@/pages/CareersPage'
import { ContactPage } from '@/pages/ContactPage'
import { LegalPage } from '@/pages/LegalPage'
import { ContactModalManager } from '@/components/contact/ContactModalManager'
const BackgroundScene = lazy(() =>
  import('@/components/layout/BackgroundScene').then((module) => ({ default: module.BackgroundScene })),
)

export default function App() {
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

  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  useEffect(() => {
    const titleByPath: Record<string, string> = {
      '/': 'Vynho — High-End Design & Engineered Products',
      '/work': 'Vynho Work — Global Products, Engineered',
      '/services': 'Vynho Services — Full-Stack Expertise',
      '/about': 'About Vynho — People Behind the Craft',
      '/careers': 'Careers at Vynho',
      '/contact': 'Contact Vynho — Let’s Talk',
      '/privacy': 'Privacy Policy — Vynho',
      '/terms': 'Terms — Vynho',
      '/cookies': 'Cookies — Vynho',
    }
    document.title = titleByPath[path] ?? 'Vynho'
  }, [path])

  let page = <HomePage />
  if (path === '/about') page = <AboutPage />
  if (path === '/services') page = <ServicesPage />
  if (path === '/work') page = <WorkPage />
  if (path === '/careers') page = <CareersPage />
  if (path === '/contact') page = <ContactPage />
  if (path === '/privacy')
    page = (
      <LegalPage
        title="Privacy policy"
        body={[
          'We only collect information needed to respond to inquiries, deliver services, and improve product quality.',
          'Personal data shared through contact forms is handled with operational safeguards and never sold to third parties.',
          'For data requests, updates, or removal, contact info@vynho.com.',
        ]}
      />
    )
  if (path === '/terms')
    page = (
      <LegalPage
        title="Terms"
        body={[
          'Project timelines, scope boundaries, and deliverables are confirmed in written agreements before implementation.',
          'All source code, assets, and deployment responsibilities are defined per engagement to avoid ownership ambiguity.',
          'By using this website, you agree to lawful use and respectful communication with our team.',
        ]}
      />
    )
  if (path === '/cookies')
    page = (
      <LegalPage
        title="Cookies"
        body={[
          'We use essential cookies for core site behavior and optional analytics to improve usability and performance.',
          'You can manage cookie preferences through your browser settings at any time.',
          'No advertising profiles are created from this website traffic.',
        ]}
      />
    )

  return (
    <>
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>
      {page}
      <ContactModalManager />
    </>
  )
}
