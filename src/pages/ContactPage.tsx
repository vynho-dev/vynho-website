import { PageShell } from '@/components/layout/PageShell'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoCards } from '@/components/contact/ContactInfoCards'
import { Reveal } from '@/components/motion/Reveal'
import '@/styles/contact.css'

export function ContactPage() {
  return (
    <PageShell mainClassName="vct-page" mainId="top">
      <section className="vct-page-hero u-center-copy">
        <div className="container">
          <Reveal as="h1" delayMs={70}>
            START A PROJECT
          </Reveal>
          <Reveal as="p" className="u-center-copy" delayMs={120}>
            Tell us what you&apos;re building. We&apos;ll help shape the right strategy, scope, and delivery model.
          </Reveal>
          <section className="vct-panel vct-panel-inline" aria-labelledby="contact-page-title">
            <h2 id="contact-page-title">LET&apos;S TALK</h2>
            <p className="vct-intro">
              Leave your contact info and expect to hear from us within 24 hours. We&apos;ll help clarify your needs,
              shape the requirements, and identify the best solution for you.
            </p>
            <ContactForm />
            <ContactInfoCards />
          </section>
        </div>
      </section>
    </PageShell>
  )
}
