import { Reveal } from '@/components/motion/Reveal'

export function AboutMissionSection() {
  return (
    <section className="vabt-section vabt-mission" id="mission">
      <div className="container">
        <Reveal delayMs={80}>
          <span className="label">Our mission</span>
        </Reveal>
        <Reveal as="p" className="vabt-mission-copy" delayMs={140}>
          We believe uncompromised craft is the most powerful path to business value. Through strategy, design, and
          engineering, we create digital products that earn trust, move faster, and scale with purpose.
        </Reveal>
      </div>
    </section>
  )
}
