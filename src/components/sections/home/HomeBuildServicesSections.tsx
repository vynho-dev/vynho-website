import { Reveal } from '@/components/motion/Reveal'
import { AccordionItem } from '@/components/patterns/AccordionItem'
import { SectionHeader } from '@/components/patterns/SectionHeader'
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
          <SectionHeader
            title="WHAT WE BUILD"
            titleClassName="vh-section-title"
            copy="We focus on the intersection of high-end design and technical complexity, where our approach creates the highest product and business impact."
            copyClassName="vh-section-copy"
            copyDelayMs={140}
          />
        </div>
        <div className="vh-build-stack vh-build-stack-interactive">
          {buildCards.map((item, index) => {
            const isActive = activeBuildCard === item.id
            return (
              <Reveal key={item.title} delayMs={index * 70}>
                <article
                  className={
                    item.lime
                      ? `vh-build-card vh-build-card-lime vh-build-card-${index + 1} ${isActive ? 'is-active' : ''}`
                      : `vh-build-card vh-build-card-${index + 1} ${isActive ? 'is-active' : ''}`
                  }
                >
                  <button
                    type="button"
                    className="vh-build-card-hit"
                    onClick={() => setActiveBuildCard(item.id)}
                    aria-label={`Activate ${item.title} visual mode`}
                  />
                  <div className="vh-build-preview" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" />
                  </div>
                  <div className="vh-build-content">
                    <h3>{item.title}</h3>
                    <strong>{item.id}</strong>
                  </div>
                  <p className="vh-build-body">{item.copy}</p>
                  <div className="vh-build-pills">
                    {item.pills.map((pill) => (
                      <span key={pill}>{pill}</span>
                    ))}
                  </div>
                </article>
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
        <div className="vh-services-intro">
          <Reveal as="h2" className="vh-services-display-title" delayMs={60}>
            OUR SERVICES
          </Reveal>
          <Reveal as="p" className="vh-section-copy" delayMs={110}>
            From strategy to deployment. We provide full-scope delivery or targeted expertise to solve your specific
            design and technical challenges.
          </Reveal>
          <Reveal delayMs={160}>
            <a href="/services" className="vh-model-contact-pill" onClick={onExploreServices}>
              <span>Explore Services</span>
              <span className="vh-model-contact-arrow" aria-hidden="true">›</span>
            </a>
          </Reveal>
        </div>
        <div className="vh-services-rows">
          {serviceItems.map((service, index) => {
            const open = openService === index
            return (
              <Reveal key={service.title} className={open ? 'vh-service-row open' : 'vh-service-row'} delayMs={index * 55}>
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
                      <span className="vh-service-toggle-bar vh-service-toggle-bar-h" />
                      <span className="vh-service-toggle-bar vh-service-toggle-bar-v" />
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
