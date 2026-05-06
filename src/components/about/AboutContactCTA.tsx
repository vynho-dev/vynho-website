import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { handleContactTrigger } from '@/lib/contactModal'

export function AboutContactCTA() {
  return (
    <section className="vabt-section vabt-contact" id="contact">
      <div className="container vabt-center-shell">
        <Reveal as="p" className="vabt-contact-eyebrow" delayMs={80}>
          Want to collaborate?
        </Reveal>
        <Reveal as="h2" className="vabt-contact-title" delayMs={130}>
          LET&apos;S TALK
        </Reveal>
        <Reveal as="p" className="vabt-section-copy vh-center-copy" delayMs={170}>
          Tell us what you are building. We will help shape the right strategy, team, and delivery model.
        </Reveal>
        <Reveal delayMs={210}>
          <Button asChild className="vh-lime-btn">
            <a href="/contact" onClick={handleContactTrigger}>Contact Us</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
