import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'
import { type HomeEdgeCardContent, type HomeEngagementCardContent } from '@/content/sections'

function ModelCheckIcon() {
  return (
    <svg className="vh-model-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" />
      <path d="M6.5 10l2.5 2.5L13.5 7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HomeModelsSection({ cards }: { cards: HomeEngagementCardContent[] }) {
  return (
    <section className="vh-section vh-models-editorial" id="models">
      <div className="container">
        <SectionHeader
          title="ENGAGEMENT MODELS"
          titleClassName="vh-section-title vh-center"
          copy="Our engagement models are designed for flexibility, allowing us to adapt each partnership to your product and team structure."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-model-duo">
          <span className="vh-model-star" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M22 2L24 20L42 22L24 24L22 42L20 24L2 22L20 20Z" fill="currentColor" />
            </svg>
          </span>
          {cards.map((card, index) => (
            <Reveal
              key={card.title}
              className={card.lime ? 'vh-model-card vh-model-card-lime' : 'vh-model-card'}
              delayMs={index * 80}
            >
              <div className="vh-model-card-top">
                <h3>{card.title}</h3>
                <span className="vh-model-num">{card.number}</span>
              </div>
              <p className="vh-model-desc">{card.description}</p>
              <ul className="vh-model-list">
                {card.points.map((point) => (
                  <li key={point}>
                    <ModelCheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="vh-model-footer">
          <ContactActionLink href="/contact" source="home_models_footer" className="vh-model-contact-pill">
            <span>Let&apos;s Talk</span>
            <span className="vh-model-contact-arrow" aria-hidden="true">›</span>
          </ContactActionLink>
        </div>
      </div>
    </section>
  )
}

export function HomeEdgeSection({ cards }: { cards: HomeEdgeCardContent[] }) {
  return (
    <section className="vh-section vh-edge-editorial" id="edge">
      <div className="container vh-edge-shell">
        <p className="vh-edge-bg" aria-hidden="true">OUR EDGE OUR EDGE OUR EDGE</p>
        <SectionHeader
          title="OUR EDGE"
          titleClassName="vh-section-title"
          copy="Clear advantages engineered to compound quality, speed, and long-term product leverage."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-edge-grid">
          {cards.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 90}>
              <article className={`vh-edge-card vh-edge-card-${index + 1}`}>
                <div className="vh-edge-preview" aria-hidden="true">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
