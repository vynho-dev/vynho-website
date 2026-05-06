import { Header } from '@/components/layout/Header'
import { ServicesHero } from '@/components/services/ServicesHero'
import { WhatWeBuild } from '@/components/services/WhatWeBuild'
import { ServicesAccordion } from '@/components/services/ServicesAccordion'
import { ProcessSection } from '@/components/services/ProcessSection'
import { EngagementModels } from '@/components/services/EngagementModels'
import { ClientsSection } from '@/components/services/ClientsSection'
import { MarketExpertise } from '@/components/services/MarketExpertise'
import { ContactCTA } from '@/components/services/ContactCTA'
import { ServicesFooter } from '@/components/services/ServicesFooter'

export function ServicesPage() {
  return (
    <>
      <Header />
      <main className="vsv-page">
        <ServicesHero />
        <WhatWeBuild />
        <ServicesAccordion />
        <ProcessSection />
        <EngagementModels />
        <ClientsSection />
        <MarketExpertise />
        <ContactCTA />
      </main>
      <ServicesFooter />
    </>
  )
}
