import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { AccordionItem } from '@/components/patterns/AccordionItem'
import { MediaCard } from '@/components/patterns/MediaCard'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'
import { useReducedMotionPreference } from '@/lib/motion'
import {
  type HomeBuildCardContent,
  type HomeEdgeCardContent,
  type HomeEngagementCardContent,
  type HomeFaqItemContent,
  type HomeServiceItemContent,
  type HomeWorkCardContent,
} from '@/content/sections'

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const hasFired = useRef(false)
  const reduceMotion = useReducedMotionPreference()
  const parsed = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = parsed ? parseFloat(parsed[1]) : null
  const suffix = parsed ? parsed[2] : ''
  const [display, setDisplay] = useState(`0${suffix}`)

  useEffect(() => {
    const node = ref.current
    if (!node || target === null) return

    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasFired.current) return
        hasFired.current = true
        observer.unobserve(node)
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const elapsed = now - start
          const t = Math.min(1, elapsed / duration)
          const eased = 1 - (1 - t) ** 3
          const current = Math.round(target * eased)
          setDisplay(`${current}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, suffix, target, value])

  return <strong ref={ref}>{display}</strong>
}

function TrustIcon({ type }: { type: 'rating' | 'award' | 'global' }) {
  if (type === 'award') {
    return <span className="vh-trust-mark vh-trust-mark-award">awwwards.</span>
  }

  if (type === 'global') {
    return <span className="vh-trust-mark vh-trust-mark-web">W</span>
  }

  return <span className="vh-trust-mark vh-trust-mark-clutch">C</span>
}

export function HomeHeroSection({ onExploreClick }: { onExploreClick: () => void }) {
  return (
    <section className="vh-hero">
      <div className="container vh-hero-inner">
        <h1 className="vh-hero-title">
          <span className="vh-visually-hidden">HIGH-END DESIGN. CRAFTED CODE.</span>
          <span className="vh-hero-title-line" aria-hidden="true">HIGH-END DESIGN.</span>
          <span className="vh-hero-title-line" aria-hidden="true">CRAFTED CODE.</span>
        </h1>
        <p className="vh-hero-copy" style={{ transform: 'translateY(calc(var(--vh-scroll-progress, 0) * 60px))' }}>
          We are a digital product studio for teams who see design and engineering as their competitive advantage. From
          flagship websites to scalable applications, we build products where world-class aesthetics meet robust
          infrastructure.
        </p>
        <div className="vh-hero-actions" style={{ transform: 'translateY(calc(var(--vh-scroll-progress, 0) * 100px))' }}>
          <div style={{ display: 'inline-block' }}>
            <Button asChild className="vh-lime-btn">
              <a href="#work" aria-label="Scroll to work section" onClick={onExploreClick}>
                ↓
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeTrustSection({
  trustCards,
}: {
  trustCards: ReadonlyArray<{ label: string; icon: 'rating' | 'award' | 'global' }>
}) {
  return (
    <section className="vh-trust">
      <div className="container vh-trust-grid">
        {trustCards.map((card, index) => (
          <Reveal key={card.label} className="vh-trust-card" delayMs={index * 70}>
            <div id={`about-card-${index + 1}`} className="vh-trust-card-shell">
              <span><TrustIcon type={card.icon} /></span>
              <p>{card.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function HomeWorkSection({
  workCards,
  mediaTier,
  canAutoplayMedia,
  onWorkCardClick,
  onWorkCardView,
}: {
  workCards: HomeWorkCardContent[]
  mediaTier: 'high' | 'balanced' | 'lite'
  canAutoplayMedia: boolean
  onWorkCardClick: (cardId: string) => void
  onWorkCardView: (cardId: string, media: 'video' | 'image') => void
}) {
  return (
    <section className="vh-section" id="work">
      <div className="container">
        <SectionHeader
          title="WORK"
          titleClassName="vh-section-title vh-center"
          copy="Award-winning craft, technical reliability, and measurable outcomes across premium web, app, and commerce systems."
          copyClassName="vh-section-copy vh-center-copy"
          copyDelayMs={140}
        />
        <div className="vh-work-grid">
          {workCards.map((card, index) => (
            <Reveal key={card.title} className="vh-work-card" delayMs={index * 50}>
              <a
                className="vh-work-card-hit"
                href="/work"
                aria-label={`Open work page for ${card.title}`}
                onClick={() => onWorkCardClick(card.id)}
              />
              <MediaCard
                className="vh-work-card-media"
                mediaClassName={card.image.match(/\.(mp4|webm|mov)$/i) ? 'vh-media-video' : 'vh-media-image'}
                image={card.image}
                imageAlt={card.title}
                videoLabel={card.title}
                imageLoading={index < 2 && mediaTier === 'high' ? 'eager' : 'lazy'}
                imageFetchPriority={index === 0 && mediaTier === 'high' ? 'high' : 'auto'}
                videoAutoPlay={canAutoplayMedia}
                videoLoop={canAutoplayMedia}
                videoPreload={canAutoplayMedia ? 'metadata' : 'none'}
                onVideoLoadedData={() => onWorkCardView(card.id, 'video')}
                onImageLoad={() => onWorkCardView(card.id, 'image')}
              />
              <div className="vh-work-overlay">
                <p>{card.title}</p>
                <div>
                  <span>{card.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

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

export function HomeStudioSection({
  metrics,
  onMeetStudio,
}: {
  metrics: { value: string; label: string }[]
  onMeetStudio: () => void
}) {
  return (
    <section className="vh-section vh-studio" id="studio">
      <div className="container vh-studio-shell">
        <SectionHeader
          title="SENIOR-LED STUDIO"
          titleClassName="vh-section-title"
          copy="A small, senior team of designers, engineers, strategists, and creative technologists — close to the work from kickoff to launch."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-studio-metrics">
          {metrics.map((item, index) => (
            <Reveal key={`${item.value}-${item.label}`} className="vh-studio-metric" delayMs={index * 80}>
              <AnimatedCounter value={item.value} />
              <p>{item.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="vh-studio-cta" delayMs={250}>
          <Button asChild variant="outline" className="vh-dark-btn">
            <a href="/about" onClick={onMeetStudio}>Meet the Studio</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export function HomeFaqSection({
  faqs,
  openFaq,
  setOpenFaq,
}: {
  faqs: HomeFaqItemContent[]
  openFaq: number | null
  setOpenFaq: (next: number | null) => void
}) {
  return (
    <section className="vh-section" id="faq">
      <div className="container">
        <SectionHeader
          title="FAQ"
          titleClassName="vh-section-title vh-center"
          copy="Common questions from teams considering working with Vynho."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-faq-list">
          {faqs.map((faq, index) => {
            const open = openFaq === index
            return (
              <Reveal key={faq.q} className={open ? 'vh-faq-item open' : 'vh-faq-item'} delayMs={index * 40}>
                <AccordionItem
                  idPrefix="vh-faq"
                  index={index}
                  open={open}
                  onToggle={() => setOpenFaq(open ? null : index)}
                  triggerClassName="vh-faq-trigger"
                  title={<span className="vh-faq-q">{faq.q}</span>}
                  trailing={
                    <span className="vh-faq-toggle" aria-hidden="true">
                      <span className="vh-faq-toggle-bar vh-faq-toggle-bar-v" />
                      <span className="vh-faq-toggle-bar vh-faq-toggle-bar-h" />
                    </span>
                  }
                  panelClassName="vh-faq-panel"
                  body={
                    <div className="vh-faq-body">
                      <div className="vh-faq-inner">
                        {faq.blocks.map((block, blockIndex) =>
                          block.type === 'p' ? (
                            <p key={`${faq.q}-p-${blockIndex}`}>{block.text}</p>
                          ) : (
                            <ul key={`${faq.q}-ul-${blockIndex}`}>
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ),
                        )}
                      </div>
                    </div>
                  }
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
