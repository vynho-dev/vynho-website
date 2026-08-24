import { PageShell } from '@/components/layout/PageShell'
import { Reveal } from '@/components/motion/Reveal'
import { founder } from '@/content/site'
import '@/styles/careers.css'

const disciplines = [
  { number: '01', title: 'Product design', copy: 'Systems thinkers who can turn ambiguity into interfaces with a clear point of view.', tags: ['Research', 'UX / UI', 'Design systems'] },
  { number: '02', title: 'Product engineering', copy: 'Frontend and full-stack builders who care as much about the final pixel as the underlying system.', tags: ['Web', 'Mobile', 'Platforms'] },
  { number: '03', title: 'AI product systems', copy: 'Practical builders who can shape reliable workflows around models, data, and human judgment.', tags: ['AI workflows', 'Automation', 'Evaluation'] },
] as const

const principles = [
  ['Own the outcome', 'Bring ideas early, challenge weak assumptions, and stay close to what ships.'],
  ['Show the work', 'Communicate clearly. Good collaboration makes the thinking visible, not just the final files.'],
  ['Protect the craft', 'Move with urgency without treating quality, accessibility, or maintainability as optional.'],
] as const

export function CareersPage() {
  const careersHref = `mailto:${founder.email}?subject=${encodeURIComponent('Careers at Vynho')}`

  return (
    <PageShell mainClassName="vcr-page" mainId="top">
      <section className="vcr-hero">
        <div className="container vcr-hero-grid">
          <div>
            <Reveal><span className="vcr-eyebrow">Careers / Vynho</span></Reveal>
            <Reveal as="h1" className="vcr-title" delayMs={70}>Do your best work. Keep your point of view.</Reveal>
          </div>
          <Reveal className="vcr-hero-copy" delayMs={140}>
            <p>We are a small, remote-first studio built around senior ownership. We collaborate with people who think independently, communicate directly, and care deeply about the result.</p>
            <a className="vcr-arrow-link" href={careersHref}>Introduce yourself <span aria-hidden="true">↗</span></a>
          </Reveal>
        </div>
      </section>

      <section className="vcr-status" aria-label="Current hiring status">
        <div className="container vcr-status-row">
          <span>Current status</span>
          <strong>No fixed openings right now</strong>
          <p>Exceptional introductions are always welcome.</p>
        </div>
      </section>

      <section className="vcr-section" aria-labelledby="careers-disciplines">
        <div className="container">
          <Reveal as="header" className="vcr-section-head">
            <span>Future collaborators</span>
            <h2 id="careers-disciplines">Where you could contribute</h2>
            <p>We build flexible project teams from a trusted network. These are the disciplines we return to most.</p>
          </Reveal>
          <div className="vcr-discipline-grid">
            {disciplines.map((discipline, index) => (
              <Reveal as="article" className="vcr-discipline" key={discipline.number} delayMs={index * 70}>
                <span className="vcr-number">{discipline.number}</span>
                <div><h3>{discipline.title}</h3><p>{discipline.copy}</p></div>
                <ul aria-label={`${discipline.title} areas`}>
                  {discipline.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vcr-section vcr-principles" aria-labelledby="careers-principles">
        <div className="container vcr-principles-grid">
          <Reveal as="header" className="vcr-principles-head">
            <span>Working together</span>
            <h2 id="careers-principles">Small team. High trust. Clear standards.</h2>
          </Reveal>
          <div className="vcr-principle-list">
            {principles.map(([title, copy], index) => (
              <Reveal as="article" className="vcr-principle" key={title} delayMs={index * 70}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vcr-contact" aria-labelledby="careers-contact">
        <div className="container vcr-contact-card">
          <Reveal><span>Make the first move</span><h2 id="careers-contact">Send the work you are proud of.</h2></Reveal>
          <Reveal className="vcr-contact-copy" delayMs={90}>
            <p>A short note, a few relevant links, and what you want to get better at is enough.</p>
            <a href={careersHref}>Email {founder.email} <span aria-hidden="true">↗</span></a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
