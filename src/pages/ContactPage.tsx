import { PageShell } from '@/components/layout/PageShell'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoCards } from '@/components/contact/ContactInfoCards'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { founder } from '@/content/site'
import '@/styles/contact.css'

export function ContactPage() {
  const titleLines = ['START A', 'PROJECT'] as const
  const copyLines = [
    "Tell us what you're building. We'll help shape the right strategy, scope, and delivery model.",
  ] as const

  return (
    <PageShell mainClassName="vct-page" mainId="top">
      <section className="vct-page-hero">
        <div className="container">
          <div className="vct-page-hero-copy-group">
            <HeroTextAnimation
              titleLines={titleLines}
              copyLines={copyLines}
              titleClassName="vct-page-hero-title"
              copyClassName="vct-page-hero-copy"
            />
          </div>
          <section className="vct-panel vct-panel-inline vct-project-panel" aria-labelledby="contact-page-title">
            <div className="vct-project-intro">
              <p className="vct-project-eyebrow">Project brief / 01</p>
              <h2 id="contact-page-title">Tell us about the work.</h2>
              <p className="vct-intro">
                A clear starting point is enough. Share the product, the problem, and where you need help—we&apos;ll shape
                the next step together.
              </p>
              <p className="vct-email-note">
                Prefer a direct email? <a href={`mailto:${founder.email}`}>{founder.email}</a>
              </p>
            </div>
            <div className="vct-form-shell">
              <ContactForm />
            </div>
          </section>
          <ContactInfoCards />
        </div>
      </section>
    </PageShell>
  )
}
