import { CtaBand } from '@/components/website/cta-band'
import { founder, socialLinks } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'

export function CtaSection() {
  return (
    <section className="home-section cta-section" id="contact">
      <div className="container">
        <Reveal delayMs={80}>
          <CtaBand
            title="Let's build what your market needs next."
            description="Vynho helps you move from idea to product with founder-led strategy, high-grade UX, and scalable engineering across web, mobile, AI, and platform systems."
            secondaryLabel="Explore Services"
            secondaryHref="/services"
            ctaLabel="Let's Talk"
            ctaHref="mailto:kishore@vynho.com"
          />
        </Reveal>
        <Reveal className="contact-panel" delayMs={180}>
          <a href={`mailto:${founder.email}`}>
            <strong>Email</strong>
            <span>{founder.email}</span>
          </a>
          <div>
            <strong>Location</strong>
            <span>{founder.location}</span>
          </div>
          <div className="contact-social-row">
            <strong>Social</strong>
            <span>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              ))}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
