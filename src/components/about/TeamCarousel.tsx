import { Reveal } from '@/components/motion/Reveal'
import { founderCapabilities } from '@/content/site'

export function TeamCarousel() {
  return (
    <section className="vabt-section vabt-team" id="team">
      <div className="container">
        <p className="vabt-watermark">SMALL BY DESIGN</p>
        <Reveal as="p" className="vabt-team-intro" delayMs={90}>
          Vynho pairs founder-level ownership with a trusted specialist network, giving each project the right range
          without layers of account management.
        </Reveal>
        <div className="vabt-team-row">
          {founderCapabilities.map((capability, index) => (
            <Reveal key={capability.title} className="vabt-team-card" delayMs={index * 70}>
              <span className="vabt-team-number">0{index + 1}</span>
              <strong>{capability.title}</strong>
              <p>{capability.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
