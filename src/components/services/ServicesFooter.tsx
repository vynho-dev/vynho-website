import { Wordmark } from '@/components/ui/wordmark'
import { socialLinks } from '@/content/site'

export function ServicesFooter() {
  return (
    <footer className="vsv-footer">
      <div className="container vsv-footer-grid">
        <div className="vsv-footer-brand">
          <Wordmark variant="white-transparent" className="wordmark-image" />
        </div>
        <div className="vsv-footer-col">
          <strong>Company</strong>
          <a href="/work">Work</a>
          <a href="/services">Services</a>
          <a href="/about">Studio</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="vsv-footer-col">
          <strong>Services</strong>
          <a href="/services">Product Strategy</a>
          <a href="/services">UX/UI Design</a>
          <a href="/services">Frontend Engineering</a>
          <a href="/services">Backend & CMS</a>
          <a href="/services">Immersive Design</a>
        </div>
        <div className="vsv-footer-col">
          <strong>Contact</strong>
          <a href="mailto:info@vynho.com">info@vynho.com</a>
          <span>Hyderabad, India</span>
        </div>
        <div className="vsv-footer-col">
          <strong>Social</strong>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
