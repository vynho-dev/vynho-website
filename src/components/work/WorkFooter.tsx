import { Wordmark } from '@/components/ui/wordmark'
import { socialLinks } from '@/content/site'

export function WorkFooter() {
  return (
    <footer className="vwk-footer">
      <div className="container vwk-footer-grid">
        <div>
          <Wordmark variant="white-transparent" className="wordmark-image" />
        </div>
        <div className="vwk-footer-col">
          <strong>Company</strong>
          <a href="/">Home</a>
          <a href="/work">Work</a>
          <a href="/services">Services</a>
          <a href="/about">Studio</a>
        </div>
        <div className="vwk-footer-col">
          <strong>Services</strong>
          <a href="/services">Product Design</a>
          <a href="/services">Web Development</a>
          <a href="/services">Creative Engineering</a>
          <a href="/services">CMS & Backend</a>
        </div>
        <div className="vwk-footer-col">
          <strong>Contact</strong>
          <a href="mailto:info@vynho.com">info@vynho.com</a>
          <span>Hyderabad / India</span>
        </div>
        <div className="vwk-footer-col">
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
