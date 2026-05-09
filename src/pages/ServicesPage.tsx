import { PageShell } from '@/components/layout/PageShell'
import { ServicesHero } from '@/components/services/ServicesHero'
import { WhatWeBuild } from '@/components/services/WhatWeBuild'
import { ServicesAccordion } from '@/components/services/ServicesAccordion'
import { ProcessSection } from '@/components/services/ProcessSection'
import { EngagementModels } from '@/components/services/EngagementModels'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { MarketExpertise } from '@/components/services/MarketExpertise'
import { SectionCTA } from '@/components/patterns/SectionCTA'
import { servicesContactCtaContent, servicesClientsConfig } from '@/content/sections'
import '@/styles/services.css'

export function ServicesPage() {
  return (
    <PageShell mainClassName="vsv-page">
      <ServicesHero />
      <WhatWeBuild />
      <ServicesAccordion />
      <ProcessSection />
      <EngagementModels />
      <ClientsSection config={servicesClientsConfig} />
      <MarketExpertise />
      <SectionCTA {...servicesContactCtaContent} />
    </PageShell>
  )
}
