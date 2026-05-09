import { PageShell } from '@/components/layout/PageShell'
import { PageIntro } from '@/components/sections/PageIntro'
import { PlatformCapabilities } from '@/components/sections/PlatformCapabilities'
import { ValuesSection } from '@/components/sections/ValuesSection'
import { StudioSection } from '@/components/sections/StudioSection'
import { CtaSection } from '@/components/sections/CtaSection'

export function CareersPage() {
  return (
    <PageShell mainClassName="home-main" mainId="top">
      <PageIntro
        eyebrow="Careers"
        title="Build meaningful products with senior teams."
        description="We’re always open to sharp designers, engineers, AI builders, and product thinkers who care deeply about quality and outcomes."
      />
      <PlatformCapabilities />
      <ValuesSection />
      <StudioSection />
      <CtaSection />
    </PageShell>
  )
}
