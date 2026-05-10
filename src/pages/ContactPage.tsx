import { PageShell } from '@/components/layout/PageShell'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoCards } from '@/components/contact/ContactInfoCards'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import '@/styles/contact.css'

export function ContactPage() {
  const titleLines = ['START A', 'PROJECT'] as const
  const copyLines = [
    "Tell us what you're building. We'll help shape the right strategy, scope, and delivery model.",
  ] as const

  return (
    <PageShell mainClassName="vct-page" mainId="top">
      <section className="vct-page-hero u-center-copy">
        <div className="container">
          <HeroTextAnimation
            titleLines={titleLines}
            copyLines={copyLines}
            titleClassName="vct-page-hero-title"
            copyClassName="vct-page-hero-copy u-center-copy"
          />
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
