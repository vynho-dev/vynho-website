import { valueCards } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'

export function ValuesSection() {
  return (
    <section className="home-section values-section" id="values">
      <div className="container values-shell">
        <div className="section-kicker-row">
          <div>
            <Reveal delayMs={40}>
              <span className="label">Our values</span>
            </Reveal>
            <Reveal as="h2" className="section-title" delayMs={120}>
              How we work when the stakes are real.
            </Reveal>
          </div>
          <Reveal as="p" delayMs={170}>
            Our values guide how we work with partners: direct communication, strong taste, and technology decisions
            that serve the product instead of distracting from it.
          </Reveal>
        </div>
        <div className="values-grid">
          {valueCards.map((value, index) => (
            <Reveal key={value.title} as="article" className="value-card" delayMs={index * 90}>
              {/\.(mp4|webm|mov)$/i.test(value.image) ? (
                <video src={value.image} autoPlay muted loop playsInline preload="metadata" aria-label={`${value.title} value poster`} />
              ) : (
                <img src={value.image} alt={`${value.title} value poster`} loading="lazy" />
              )}
              <span>{value.title}</span>
              <p>{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
