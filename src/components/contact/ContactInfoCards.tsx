import { socialLinks } from '@/content/site'

export function ContactInfoCards() {
  return (
    <div className="vct-info-grid">
      <article className="vct-info-card">
        <strong>WANT TO VISIT US?</strong>
        <p>Hyderabad, India</p>
        <p>Remote-first / Global studio</p>
      </article>
      <article className="vct-info-card">
        <strong>WANT TO ASK SOMETHING?</strong>
        <a href="mailto:info@vynho.com">info@vynho.com</a>
        <a href="tel:+918179266373">+91 8179266373</a>
      </article>
      <article className="vct-info-card">
        <strong>STAY IN THE LOOP</strong>
        <div className="vct-socials">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
            </a>
          ))}
        </div>
      </article>
    </div>
  )
}
