import { Wordmark } from '@/components/ui/wordmark'
import { founder, navLinks, socialLinks } from '@/content/site'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'

export function Footer() {
  const legalLinks = [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms' },
    { href: '/cookies', label: 'Cookies' },
  ]
  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container footer-signal-line" aria-hidden="true">
        <span>VYNHO / HYDERABAD</span>
        <i />
        <span>AVAILABLE WORLDWIDE</span>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Wordmark variant="black-transparent" className="wordmark-image footer-wordmark" />
          <p>
            Premium AI, product design, and engineering systems for teams building their next serious digital product.
          </p>
        </div>
        <div className="footer-column footer-contact-column">
          <strong>Want to ask something?</strong>
          <a href={`mailto:${founder.email}`}>{founder.email}</a>
          <a href={`tel:${founder.phoneHref}`}>{founder.phone}</a>
        </div>
        <div className="footer-column footer-contact-column">
          <strong>Want to visit us?</strong>
          <span>{founder.location}</span>
          <span>{founder.studioMode}</span>
        </div>
        <div className="footer-column footer-contact-column">
          <strong>Stay in the loop</strong>
          <div className="footer-socials">
            {socialLinks.map((social) => {
              const isMailLink = social.href.startsWith('mailto:')
              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(!isMailLink ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  {social.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="footer-monogram" aria-hidden="true">VYNHO<span>.</span></div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Vynho. All rights reserved.</p>
        <nav className="footer-links" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <button type="button" className="footer-top-btn" onClick={handleBackToTop}>
            Back to top
          </button>
          <ContactActionLink source="footer_lets_talk">
            Contact Us
          </ContactActionLink>
        </nav>
      </div>
    </footer>
  )
}
