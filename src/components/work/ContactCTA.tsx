import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { handleContactTrigger } from '@/lib/contactModal'

export function ContactCTA() {
  return (
    <section className="vwk-section vwk-contact-cta" id="contact">
      <div className="container vwk-contact-shell">
        <Reveal as="p" className="vwk-contact-eyebrow" delayMs={80}>
          Got a project in mind?
        </Reveal>
        <Reveal as="h2" className="vwk-contact-title" delayMs={130}>
          LET&apos;S TALK
        </Reveal>
        <Reveal delayMs={180}>
          <Button asChild className="vh-lime-btn">
            <a href="/contact" onClick={handleContactTrigger}>Start a project</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
