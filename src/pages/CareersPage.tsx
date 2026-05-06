import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageIntro } from '@/components/sections/PageIntro'
import { PlatformCapabilities } from '@/components/sections/PlatformCapabilities'
import { ValuesSection } from '@/components/sections/ValuesSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { CtaSection } from '@/components/sections/CtaSection'

export function CareersPage() {
  return (
    <>
      <Header />
      <main className="home-main" id="top">
        <PageIntro
          eyebrow="Careers"
          title="Build meaningful products with senior teams."
          description="We’re always open to sharp designers, engineers, AI builders, and product thinkers who care deeply about quality and outcomes."
        />
        <PlatformCapabilities />
        <ValuesSection />
        <StudioSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
