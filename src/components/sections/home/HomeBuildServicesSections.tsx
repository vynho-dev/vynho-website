import { AccordionItem } from '@/components/patterns/AccordionItem'
import { Button } from '@/components/ui/button'
import { CharReveal } from '@/components/motion/CharReveal'
import { Reveal } from '@/components/motion/Reveal'
import { type HomeBuildCardContent, type HomeServiceItemContent } from '@/content/sections'

export function HomeBuildSection({
  buildCards,
  activeBuildCard,
  setActiveBuildCard,
}: {
  buildCards: HomeBuildCardContent[]
  activeBuildCard: string
  setActiveBuildCard: (id: string) => void
}) {
  return (
    <section className="vh-section vh-build-editorial" id="build">
      <div className="container vh-build-layout">
        <div className="vh-build-intro-sticky">
          <CharReveal as="h2" className="vh-section-title vh-build-section-title" staggerMs={38} delayMs={60}>
            WHAT WE BUILD
          </CharReveal>
          <Reveal as="p" className="vh-section-copy vh-build-section-copy" delayMs={160}>
            We focus on the intersection of high-end design and technical complexity — where our approach creates the highest product and business impact.
          </Reveal>
        </div>

        <div className="vh-build-stack">
          {buildCards.map((item, index) => {
            const isActive = activeBuildCard === item.id
            return (
              <Reveal
                as="article"
                key={item.id}
                className={`vh-build-card vh-build-card-${index + 1}${item.lime ? ' vh-build-card-lime' : ''}${isActive ? ' is-active' : ''}`}
                distance={32}
                delayMs={index * 80}
              >
                <button
                  type="button"
                  className="vh-build-card-hit"
                  onClick={() => setActiveBuildCard(item.id)}
                  aria-label={`Select ${item.title}`}
                />
                <div className="vh-build-preview" aria-hidden="true">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <div className="vh-build-content">
                  <h3>{item.title}</h3>
                  <strong aria-hidden="true">{item.id}</strong>
                </div>
                <p className="vh-build-body">{item.copy}</p>
                <div className="vh-build-pills">
                  {item.pills.map((pill) => (
                    <span key={pill} className="vh-build-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HomeServicesSection({
  serviceItems,
  openService,
  setOpenService,
  onExploreServices,
}: {
  serviceItems: HomeServiceItemContent[]
  openService: number
  setOpenService: (index: number) => void
  onExploreServices: () => void
}) {
  return (
    <section className="vh-section vh-services-editorial" id="services">
      <div className="container vh-services-layout">

        {/* ── Left: sticky intro ── */}
        <div className="vh-services-intro-col">
          <CharReveal as="h2" className="vh-services-display-title" staggerMs={34} delayMs={50}>
            OUR SERVICES
          </CharReveal>
          <Reveal as="p" className="vh-services-copy" delayMs={120}>
            From strategy to deployment — full-scope delivery or targeted expertise to solve your specific design and technical challenges.
          </Reveal>
          <Reveal delayMs={200}>
            <Button variant="outline" size="lg" asChild className="vh-services-cta-btn">
              <a href="/services/" onClick={onExploreServices}>
                Explore Services
                <span aria-hidden="true">→</span>
              </a>
            </Button>
          </Reveal>
        </div>

        {/* ── Right: accordion rows ── */}
        <div className="vh-services-rows">
          {serviceItems.map((service, index) => {
            const open = openService === index
            return (
              <Reveal
                key={service.title}
                className={open ? 'vh-service-row open' : 'vh-service-row'}
                distance={18}
                delayMs={index * 70}
              >
                <AccordionItem
                  idPrefix="vh-service"
                  index={index}
                  open={open}
                  onToggle={() => setOpenService(index)}
                  className="vh-service-accordion-item"
                  triggerClassName="vh-service-trigger"
                  panelClassName="vh-service-panel"
                  leading={<span className="vh-service-num">{String(index + 1).padStart(2, '0')}</span>}
                  title={<span className="vh-service-name">{service.title}</span>}
                  trailing={
                    <span className="vh-service-toggle" aria-hidden="true">
                      <span className={open ? 'vh-service-toggle-icon is-open' : 'vh-service-toggle-icon'}>
                        +
                      </span>
                    </span>
                  }
                  body={<p className="vh-service-body">{service.body}</p>}
                />
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
