import { PageShell } from '@/components/layout/PageShell'
import { AboutHero } from '@/components/about/AboutHero'
import { MetricsStrip } from '@/components/about/MetricsStrip'
import { AboutMissionSection } from '@/components/about/AboutMissionSection'
import { TeamCarousel } from '@/components/about/TeamCarousel'
import { AboutValuesSection } from '@/components/about/AboutValuesSection'
import { OpenRolesCTA } from '@/components/about/OpenRolesCTA'
import { SectionCTA } from '@/components/patterns/SectionCTA'
import { aboutContactCtaContent } from '@/content/sections'
import '@/styles/about.css'

export function AboutPage() {
  return (
    <PageShell mainClassName="vabt-page">
      <AboutHero />
      <MetricsStrip />
      <AboutMissionSection />
      <TeamCarousel />
      <AboutValuesSection />
      <OpenRolesCTA />
      <SectionCTA {...aboutContactCtaContent} />
    </PageShell>
  )
}
