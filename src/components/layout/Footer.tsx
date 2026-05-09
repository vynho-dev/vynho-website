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
      <div className="container footer-grid">
        <div className="footer-brand">
          <Wordmark variant="white-transparent" className="wordmark-image footer-wordmark footer-wordmark-dark" />
          <Wordmark variant="black-transparent" className="wordmark-image footer-wordmark footer-wordmark-light" />
          <p>
            Premium AI, product design, and engineering systems for teams building their next serious digital product.
          </p>
          <p className="footer-contact">
            <span>{founder.location}</span>
            <a href={`mailto:${founder.email}`}>{founder.email}</a>
          </p>
          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <strong>Navigation</strong>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer-column">
          <strong>Legal</strong>
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Vynho. All rights reserved.</p>
        <div className="footer-links">
          <button type="button" className="footer-top-btn" onClick={handleBackToTop}>
            Back to top
          </button>
          <ContactActionLink source="footer_lets_talk">
            Let&apos;s Talk
          </ContactActionLink>
        </div>
      </div>
    </footer>
  )
}
