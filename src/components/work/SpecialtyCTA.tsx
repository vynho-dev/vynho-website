import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { workSpecialtyContent } from '@/content/sections'
import { SectionShell } from '@/components/patterns/SectionShell'

export function SpecialtyCTA() {
  return (
    <SectionShell
      id="specialty"
      className="vwk-section vwk-specialty"
      containerClassName="container vwk-specialty-shell ds-shell"
    >
        <p className="vwk-specialty-text" aria-hidden="true">
          {workSpecialtyContent.eyebrow}
        </p>
        <SectionHeader
          title={workSpecialtyContent.title}
          titleClassName="vwk-section-title"
          copy={workSpecialtyContent.description}
          copyClassName="vwk-section-copy u-center-copy"
          titleDelayMs={70}
          copyDelayMs={120}
        />
        <Reveal delayMs={170}>
          <Button asChild>
            <a href={workSpecialtyContent.ctaHref}>{workSpecialtyContent.ctaLabel}</a>
          </Button>
        </Reveal>
    </SectionShell>
  )
}
