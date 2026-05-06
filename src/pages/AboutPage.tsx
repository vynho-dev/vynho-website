import { Header } from '@/components/layout/Header'
import { AboutHero } from '@/components/about/AboutHero'
import { MetricsStrip } from '@/components/about/MetricsStrip'
import { AboutMissionSection } from '@/components/about/AboutMissionSection'
import { TeamCarousel } from '@/components/about/TeamCarousel'
import { AboutValuesSection } from '@/components/about/AboutValuesSection'
import { OpenRolesCTA } from '@/components/about/OpenRolesCTA'
import { AboutContactCTA } from '@/components/about/AboutContactCTA'
import { AboutFooter } from '@/components/about/AboutFooter'

export function AboutPage() {
  return (
    <>
      <Header />
      <main className="vabt-page">
        <AboutHero />
        <MetricsStrip />
        <AboutMissionSection />
        <TeamCarousel />
        <AboutValuesSection />
        <OpenRolesCTA />
        <AboutContactCTA />
      </main>
      <AboutFooter />
    </>
  )
}
