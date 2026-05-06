import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'

export function SpecialtyCTA() {
  return (
    <section className="vwk-section vwk-specialty" id="specialty">
      <div className="container vwk-specialty-shell">
        <p className="vwk-specialty-text" aria-hidden="true">
          Beyond Websites
        </p>
        <Reveal as="h2" className="vwk-section-title" delayMs={70}>
          Products That Move Markets.
        </Reveal>
        <Reveal as="p" className="vwk-section-copy vh-center-copy" delayMs={120}>
          We build digital systems that turn brand, product, and technology into one scalable experience.
        </Reveal>
        <Reveal delayMs={170}>
          <Button asChild className="vh-lime-btn">
            <a href="/services">Explore Capabilities</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
