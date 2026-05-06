import { capabilities, founder } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'

export function PlatformCapabilities() {
  return (
    <section className="home-section capabilities-section" id="careers">
      <div className="container capabilities-shell">
        <div className="capabilities-copy">
          <Reveal delayMs={40}>
            <span className="label">Open roles</span>
          </Reveal>
          <Reveal as="h2" className="section-title" delayMs={120}>
            Built by people who care about polished work.
          </Reveal>
          <Reveal as="p" delayMs={200}>
            We work with founders, operators, and product leaders across the full lifecycle: positioning, UX,
            engineering, launch, measurement, and ongoing platform improvement.
          </Reveal>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <Reveal key={capability} as="span" delayMs={index * 65}>
              {capability}
            </Reveal>
          ))}
        </div>
        <Reveal className="careers-note" delayMs={220}>
          <span>Careers</span>
          <p>We are always open to sharp designers, engineers, AI builders, and product thinkers.</p>
          <a href={`mailto:${founder.email}?subject=Careers%20at%20Vynho`}>Introduce yourself</a>
        </Reveal>
      </div>
    </section>
  )
}
