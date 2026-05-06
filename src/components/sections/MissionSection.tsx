import { Reveal } from '@/components/motion/Reveal'

export function MissionSection() {
  return (
    <section className="home-section mission-section" id="mission">
      <div className="container mission-shell">
        <div className="mission-copy">
          <Reveal delayMs={40}>
            <span className="label">Our mission</span>
          </Reveal>
          <Reveal as="h2" delayMs={130}>
            We believe uncompromised product craft is the clearest path to business value.
          </Reveal>
        </div>
        <div className="mission-statement">
          <Reveal as="p" delayMs={220}>
            Through exceptional design and engineering, Vynho helps ambitious teams turn complex ideas into digital
            products that feel clear, credible, and ready for market.
          </Reveal>
          <Reveal as="p" delayMs={300}>
            We started Vynho because AI, paired with the right team and process, can dramatically improve how fast and
            how well software products are built.
          </Reveal>
        </div>
      </div>
    </section>
  )
}
