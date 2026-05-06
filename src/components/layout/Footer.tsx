import { Wordmark } from '@/components/ui/wordmark'
import { founder, socialLinks } from '@/content/site'
import { handleContactTrigger } from '@/lib/contactModal'

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]
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
            <a href={`tel:${founder.phone.replace(/\s+/g, '')}`}>{founder.phone}</a>
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
          <a href="/contact" onClick={handleContactTrigger}>Book intro call</a>
        </div>
      </div>
      <div className="container footer-attribution">
        <p>
          Black Hole 3D model by{' '}
          <a
            href="https://sketchfab.com/Nestaeric"
            target="_blank"
            rel="noreferrer noopener"
          >
            Nestaeric
          </a>{' '}
          from{' '}
          <a
            href="https://sketchfab.com/3d-models/black-hole-e410da98b1e5445eae2acafaaa53587d"
            target="_blank"
            rel="noreferrer noopener"
          >
            Sketchfab
          </a>{' '}
          (licensed under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer noopener">
            CC BY 4.0
          </a>
          ).
        </p>
      </div>
    </footer>
  )
}
