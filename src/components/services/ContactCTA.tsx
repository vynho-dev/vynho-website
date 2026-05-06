import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { handleContactTrigger } from '@/lib/contactModal'

export function ContactCTA() {
  return (
    <section className="vsv-section vsv-contact" id="contact">
      <div className="container vsv-center-shell">
        <Reveal as="p" className="vsv-contact-eyebrow" delayMs={70}>
          Want to collaborate?
        </Reveal>
        <Reveal as="h2" className="vsv-contact-title" delayMs={120}>
          LET&apos;S TALK
        </Reveal>
        <Reveal as="p" className="vsv-section-copy vsv-center-copy" delayMs={170}>
          Tell us what you&apos;re building. We&apos;ll help shape the right strategy, scope, and delivery model.
        </Reveal>
        <Reveal className="vsv-contact-actions" delayMs={220}>
          <Button asChild className="vh-lime-btn">
            <a href="/contact" onClick={handleContactTrigger}>Start a Project</a>
          </Button>
          <Button asChild variant="outline" className="vh-dark-btn">
            <a href="/work">View Work</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
