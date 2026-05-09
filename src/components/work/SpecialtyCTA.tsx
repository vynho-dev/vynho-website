import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { workSpecialtyContent } from '@/content/sections'

export function SpecialtyCTA() {
  return (
    <section className="vwk-section vwk-specialty" id="specialty">
      <div className="container vwk-specialty-shell ds-shell">
        <p className="vwk-specialty-text" aria-hidden="true">
          {workSpecialtyContent.eyebrow}
        </p>
        <Reveal as="h2" className="vwk-section-title" delayMs={70}>
          {workSpecialtyContent.title}
        </Reveal>
        <Reveal as="p" className="vwk-section-copy u-center-copy" delayMs={120}>
          {workSpecialtyContent.description}
        </Reveal>
        <Reveal delayMs={170}>
          <Button asChild>
            <a href={workSpecialtyContent.ctaHref}>{workSpecialtyContent.ctaLabel}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
