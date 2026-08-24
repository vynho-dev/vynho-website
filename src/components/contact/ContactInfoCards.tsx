import { founder, socialLinks } from '@/content/site'

export function ContactInfoCards() {
  return (
    <div className="vct-info-grid">
      <article className="vct-info-card">
        <strong>WANT TO VISIT US?</strong>
        <p>{founder.location}</p>
        <p>{founder.studioMode}</p>
      </article>
      <article className="vct-info-card">
        <strong>WANT TO ASK SOMETHING?</strong>
        <a href={`mailto:${founder.email}`}>{founder.email}</a>
        <a href={`tel:${founder.phoneHref}`}>{founder.phone}</a>
      </article>
      <article className="vct-info-card">
        <strong>STAY IN THE LOOP</strong>
        <div className="vct-socials">
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
      </article>
    </div>
  )
}
