import { useMemo, useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { WorkHero } from '@/components/work/WorkHero'
import { FeaturedWorkGrid } from '@/components/work/FeaturedWorkGrid'
import type { WorkProject } from '@/components/work/ProjectCard'
import { AwardsSection } from '@/components/work/AwardsSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { SpecialtyCTA } from '@/components/work/SpecialtyCTA'
import { SectionCTA } from '@/components/patterns/SectionCTA'
import { workContactCtaContent, workClientsConfig } from '@/content/sections'
import '@/styles/work.css'

const projects: WorkProject[] = [
  {
    title: 'Pallet Ross',
    category: 'Platforms',
    tag: 'New Age Art Platform',
    image: '/assets/services/build-websites.mp4',
    tags: ['SaaS', 'UX/UI', 'Frontend', 'Backend'],
    featured: true,
  },
  {
    title: 'Chatif',
    category: 'Apps',
    tag: 'AI Chat Mobile App',
    image: '/assets/projects/lumapay-mobile.mp4',
    tags: ['Web App', 'Payments', 'Design System'],
  },
  {
    title: 'Pasar Marketing',
    category: 'Products',
    tag: 'Real-Time Analytics Dashboard',
    image: '/assets/projects/signaldash-saas.webp',
    tags: ['Dashboard', 'Data', 'SaaS'],
  },
  {
    title: 'Nestery',
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
    <PageShell mainClassName="vwk-page">
      <WorkHero onFilter={setFilter} />
      <FeaturedWorkGrid projects={filtered} />
      <AwardsSection />
      <ClientsSection config={workClientsConfig} />
      <SpecialtyCTA />
      <SectionCTA {...workContactCtaContent} />
    </PageShell>
  )
}
