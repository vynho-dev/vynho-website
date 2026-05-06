import { useMemo, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { WorkHero } from '@/components/work/WorkHero'
import { FeaturedWorkGrid } from '@/components/work/FeaturedWorkGrid'
import type { WorkProject } from '@/components/work/ProjectCard'
import { AwardsSection } from '@/components/work/AwardsSection'
import { ClientsSection } from '@/components/work/ClientsSection'
import { SpecialtyCTA } from '@/components/work/SpecialtyCTA'
import { ContactCTA } from '@/components/work/ContactCTA'
import { WorkFooter } from '@/components/work/WorkFooter'

const projects: WorkProject[] = [
  {
    title: 'Northstar Cloud',
    category: 'Platforms',
    tag: 'Enterprise SaaS Platform',
    image: '/assets/services/build-websites.mp4',
    tags: ['SaaS', 'UX/UI', 'Frontend', 'Backend'],
    featured: true,
  },
  {
    title: 'LumaPay',
    category: 'Apps',
    tag: 'Fintech Web App',
    image: '/assets/projects/lumapay-mobile.mp4',
    tags: ['Web App', 'Payments', 'Design System'],
  },
  {
    title: 'Asteria Labs',
    category: 'Websites',
    tag: 'AI Product Website',
    image: '/assets/services/build-websites.mp4',
    tags: ['Website', 'Brand', 'Motion'],
  },
  {
    title: 'SignalDesk',
    category: 'Products',
    tag: 'Real-Time Analytics Dashboard',
    image: '/assets/projects/signaldash-saas.webp',
    tags: ['Dashboard', 'Data', 'SaaS'],
  },
  {
    title: 'Vanta Commerce',
    category: 'Commerce',
    tag: 'Premium E-commerce Experience',
    image: '/assets/services/build-commerce.mp4',
    tags: ['Commerce', 'CMS', 'Conversion'],
  },
  {
    title: 'Orbit Studio',
    category: 'Immersive',
    tag: 'Immersive Brand Website',
    image: '/assets/projects/orbit-immersive.mp4',
    tags: ['Immersive', '3D', 'Frontend'],
  },
  {
    title: 'Helio Mobile',
    category: 'Apps',
    tag: 'Consumer Mobile App',
    image: '/assets/services/build-apps.mp4',
    tags: ['Mobile', 'Design', 'API'],
  },
]

export function WorkPage() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <>
      <Header />
      <main className="vwk-page">
        <WorkHero onFilter={setFilter} />
        <FeaturedWorkGrid projects={filtered} />
        <AwardsSection />
        <ClientsSection />
        <SpecialtyCTA />
        <ContactCTA />
      </main>
      <WorkFooter />
    </>
  )
}
