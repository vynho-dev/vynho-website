import { Wordmark } from '@/components/ui/wordmark'
import { socialLinks } from '@/content/site'

export function AboutFooter() {
  return (
    <footer className="vabt-footer">
      <div className="container vabt-footer-grid">
        <div className="vabt-footer-brand">
          <Wordmark variant="white-transparent" className="wordmark-image" />
        </div>
        <div className="vabt-footer-col">
          <strong>Want to ask something?</strong>
          <a href="mailto:info@vynho.com">info@vynho.com</a>
          <a href="tel:+918179266373">+91 8179266373</a>
        </div>
        <div className="vabt-footer-col">
          <strong>Want to visit us?</strong>
          <span>Hyderabad, India</span>
          <span>Remote-first / Global studio</span>
        </div>
        <div className="vabt-footer-col">
          <strong>Stay in the loop</strong>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container vabt-footer-bottom">
        <a href="/privacy">Privacy Policy</a>
        <a href="/cookies">Cookies</a>
        <a href="/terms">Terms</a>
        <span>© 2026 Vynho</span>
      </div>
    </footer>
  )
}
