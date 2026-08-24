import { Reveal } from '@/components/motion/Reveal'

const teamMembers = [
  {
    name: 'Kishore',
    role: 'CEO, Strategy',
    image: '/assets/team/editorial/kishore.jpg',
  },
  {
    name: 'Evan',
    role: 'Director, Design',
    image: '/assets/team/editorial/evan.jpg',
  },
  {
    name: 'Niko',
    role: 'Lead, Engineering',
    image: '/assets/team/editorial/niko.jpg',
  },
  {
    name: 'Sofia',
    role: 'Lead, Product Strategy',
    image: '/assets/team/editorial/sofia.jpg',
  },
] as const

export function TeamCarousel() {
  return (
    <section className="vabt-section vabt-team" id="team">
      <div className="container">
        <p className="vabt-watermark">SMALL BY DESIGN</p>
        <Reveal as="p" className="vabt-team-intro" delayMs={90}>
          A senior, hands-on team connecting product strategy, design, and engineering from the first decision to the
          final detail.
        </Reveal>
        <div className="vabt-team-row">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} className="vabt-team-card" delayMs={index * 70}>
              <div className="vabt-team-portrait-wrap">
                <img
                  className="vabt-team-portrait"
                  src={member.image}
                  alt={`Editorial illustration for ${member.name}'s ${member.role} role`}
                  loading="eager"
                  fetchPriority={index < 2 ? 'high' : 'auto'}
                />
                <span className="vabt-team-number" aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="vabt-team-meta">
                <strong>{member.name}</strong>
                <p>{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="u-visually-hidden">Team portraits are original editorial illustrations.</p>
      </div>
    </section>
  )
}
