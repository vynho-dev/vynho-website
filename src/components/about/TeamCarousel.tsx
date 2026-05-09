import { useMemo, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'

const team = [
  { name: 'Kishore', role: 'CEO', label: 'Strategy', image: '/assets/team/leo.webp' },
  { name: 'Evan', role: 'Director', label: 'Design', image: '/assets/team/evan.webp' },
  { name: 'Niko', role: 'Lead', label: 'Engineering', image: '/assets/team/niko.webp' },
  { name: 'Sofia', role: 'Lead', label: 'Product Strategy', image: '/assets/team/sofia.jpg' },
  { name: 'Leo', role: 'Senior', label: 'Creative Tech', image: '/assets/team/leo-portrait.jpg' },
  { name: 'Raya', role: 'Senior', label: 'Motion Design', image: '/assets/team/raya.jpg' },
]

export function TeamCarousel() {
  const [index, setIndex] = useState(0)
  const visible = 4
  const max = Math.max(0, team.length - visible)

  const list = useMemo(() => team.slice(index, index + visible), [index])

  return (
    <section className="vabt-section vabt-team" id="team">
      <div className="container">
        <p className="vabt-watermark">SENIOR-LED TEAM</p>
        <Reveal as="p" className="vabt-team-intro" delayMs={90}>
          Our projects are led by experienced designers, engineers, and strategists who stay close to the work from
          start to launch.
        </Reveal>
        <div className="vabt-team-row" role="region" aria-label="Team carousel">
          {list.map((member) => (
            <Reveal key={member.name} className="vabt-team-card">
              <img src={member.image} alt={`${member.name} portrait`} loading="lazy" />
              <div className="vabt-team-card-head">
                <strong>{member.name}</strong>
                <i>{member.role}</i>
              </div>
              <p>{member.label}</p>
            </Reveal>
          ))}
        </div>
        <div className="vabt-carousel-controls">
          <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} aria-label="Previous team members">
            ←
          </button>
          <div className="vabt-carousel-track" aria-hidden="true">
            <span style={{ width: `${((index + visible) / team.length) * 100}%` }} />
          </div>
          <button type="button" onClick={() => setIndex((current) => Math.min(max, current + 1))} aria-label="Next team members">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
