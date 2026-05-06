import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { handleContactTrigger } from '@/lib/contactModal'

const trustCards = [
  { label: 'Rated 5.0 by clients', icon: '/assets/icons/rating-badge.svg' },
  { label: 'Award-level craft', icon: '/assets/icons/award-craft.svg' },
  { label: 'Built for global teams', icon: '/assets/icons/global-engineering.svg' },
]

const workCards = [
  {
    title: 'Northstar Cloud',
    tag: 'Enterprise SaaS Platform',
    image: '/assets/services/build-websites.mp4',
    wide: true,
  },
  {
    title: 'LumaPay',
    tag: 'Fintech Web App',
    image: '/assets/projects/lumapay-mobile.mp4',
  },
  {
    title: 'Vanta Commerce',
    tag: 'Premium Storefront',
    image: '/assets/services/build-commerce.mp4',
  },
  {
    title: 'Orbit Studio',
    tag: 'Immersive Brand Website',
    image: '/assets/projects/orbit-immersive.mp4',
  },
  {
    title: 'SignalDesk',
    tag: 'Real-Time Analytics Dashboard',
    image: '/assets/projects/signaldash-saas.webp',
  },
]

const buildCards = [
  {
    id: '01',
    scene: 'web',
    title: 'Websites & Digital Experiences',
    copy: 'Flagship web experiences combining visual impact, conversion design, and fast performance.',
    pills: ['Company Website', 'Product Website', 'Landing Page'],
  },
  {
    id: '02',
    scene: 'apps',
    title: 'Apps, Platforms & Real-Time Systems',
    copy: 'Scalable applications engineered for high-velocity teams and complex data-heavy workflows.',
    pills: ['Mobile App', 'Web App', 'Business Portal'],
    lime: true,
  },
  {
    id: '03',
    scene: 'commerce',
    title: 'Commerce & Product Storytelling',
    copy: 'Premium commerce experiences that improve perceived value and drive confident purchase decisions.',
    pills: ['Premium Storefront', 'B2B Portal', 'Custom Commerce'],
  },
  {
    id: '04',
    scene: 'immersive',
    title: 'Immersive & Emerging Technology',
    copy: 'Interactive 3D, motion, Web3 and AI interfaces that make complex systems feel intuitive.',
    pills: ['3D Web', 'AI Interfaces', 'Web3'],
  },
]

const serviceItems = [
  {
    title: 'Product Strategy',
    body: 'Research, positioning, roadmap definition, and execution planning built around measurable business outcomes.',
  },
  {
    title: 'UX/UI Design',
    body: 'User journeys, interface systems, prototyping, and conversion-focused visual design for modern products.',
  },
  {
    title: '3D, Motion & Immersive Design',
    body: 'Cinematic visual systems and interaction layers that increase product clarity and premium perception.',
  },
  {
    title: 'Creative Frontend & App Engineering',
    body: 'High-quality implementation with strong performance, accessibility, and maintainable component architecture.',
  },
  {
    title: 'Backend, CMS & System Engineering',
    body: 'API architecture, content systems, data pipelines, and deployment foundations built for reliability.',
  },
  {
    title: 'Web3, AI & Emerging Interfaces',
    body: 'Wallet flows, model orchestration, and trust-first product interfaces for AI-led and decentralized systems.',
  },
]

const engagementCards = [
  {
    number: '01',
    title: 'End-to-End Product Delivery',
    description: 'We design, build, test, and launch complete product experiences from discovery through scale.',
    points: ['Product strategy', 'UX/UI design', 'Frontend development', 'Backend integration', 'Launch support'],
  },
  {
    number: '02',
    title: 'Embedded Expertise',
    description: 'We integrate with your team to accelerate design, engineering, and AI workflows where it matters most.',
    points: ['Design systems', 'AI workflow planning', 'Rapid prototyping', 'Technical implementation', 'QA and polish'],
    lime: true,
  },
]

const edgeCards = [
  {
    title: 'Design as strategic value',
    body: 'We treat design as a business multiplier — clarity, taste, and craft compound across every product surface.',
  },
  {
    title: 'Fluid scaling UI',
    body: 'Interface systems that hold up from a single page to a complex, multi-tenant product platform.',
  },
  {
    title: 'Business-driven engineering',
    body: 'Architecture and code shaped by the metrics that matter — uptime, conversion, latency, and lifetime value.',
  },
  {
    title: 'Purposeful immersion',
    body: '3D, motion, and interaction used with intent — to deepen meaning, not to decorate.',
  },
]

const studioMetrics = [
  { value: '10+', label: 'years experience' },
  { value: '25+', label: 'specialists' },
  { value: '180+', label: 'projects delivered' },
]

const faqs = [
  {
    q: 'What kinds of projects are a good fit?',
    a: 'Teams building premium websites, digital products, SaaS platforms, commerce experiences, and AI-enabled workflows where design quality and technical depth both matter.',
  },
  {
    q: 'What does a project typically cost?',
    a: 'Engagements scale with scope. Most flagship websites and product builds run from focused sprints to multi-quarter programs. We share clear estimates after a short discovery conversation.',
  },
  {
    q: 'Can you work with our internal team?',
    a: 'Yes. Our embedded model is built for that. We define shared ownership early and integrate into your tools, rituals, and roadmap.',
  },
  {
    q: 'Do you help shape the product or only execute?',
    a: 'Both. We can start at discovery and strategy, then move into design and engineering with measurable milestones throughout.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay close after launch with performance tuning, iteration support, roadmap advisory, and long-term system improvements.',
  },
]

export function HomePremium() {
  const [openService, setOpenService] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeBuildCard, setActiveBuildCard] = useState(buildCards[0]?.id ?? '01')

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      document.documentElement.style.setProperty('--vh-scroll-progress', progress.toFixed(4))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('vynho:bg-scene-variant', {
        detail: { variant: buildCards.find((c) => c.id === activeBuildCard)?.scene ?? 'web' },
      }),
    )
  }, [activeBuildCard])

  return (
    <main className="vh-home" id="top">
      <section className="vh-hero">
        <div className="container vh-hero-inner">
          <Reveal as="h1" className="vh-hero-title" delayMs={100}>
            HIGH-END DESIGN.
            <br />
            CRAFTED CODE.
          </Reveal>
          <Reveal as="p" className="vh-hero-copy" delayMs={200}>
            Vynho is a digital product studio for teams who see design and engineering as their competitive advantage.
            From flagship websites to scalable applications, we design and build digital products that accelerate
            growth, strengthen brand trust, and scale with confidence.
          </Reveal>
          <Reveal className="vh-hero-actions" delayMs={300}>
            <Button asChild className="vh-lime-btn">
              <a href="#work" aria-label="Scroll to work section">Scroll</a>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="vh-trust">
        <div className="container vh-trust-grid">
          {trustCards.map((card, index) => (
            <Reveal key={card.label} className="vh-trust-card" delayMs={index * 70}>
              <span><img src={card.icon} alt="" aria-hidden="true" /></span>
              <p>{card.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vh-section" id="work">
        <div className="container">
          <Reveal as="h2" className="vh-section-title vh-center" delayMs={80}>
            WORK
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={140}>
            Award-level craft with technical reliability. Selected products built for teams where aesthetics and
            performance need to move together.
          </Reveal>

          <div className="vh-work-grid">
            {workCards.map((card, index) => (
              <Reveal
                key={card.title}
                className={card.wide ? 'vh-work-card vh-work-card-wide' : 'vh-work-card'}
                delayMs={index * 70}
              >
                {/\.(mp4|webm|mov)$/i.test(card.image) ? (
                  <video src={card.image} autoPlay muted loop playsInline preload="metadata" aria-label={card.title} />
                ) : (
                  <img src={card.image} alt={card.title} loading="lazy" />
                )}
                <div className="vh-work-overlay">
                  <p>{card.title}</p>
                  <div>
                    <span>{card.tag}</span>
                    <a href="/work">View</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="vh-work-cta" delayMs={120}>
            <Button asChild variant="outline" className="vh-dark-btn">
              <a href="/work">See All Work</a>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="vh-section" id="build">
        <div className="container vh-build-layout">
          <div className="vh-build-intro">
            <Reveal as="h2" className="vh-section-title" delayMs={80}>
              WHAT WE BUILD
            </Reveal>
            <Reveal as="p" className="vh-section-copy" delayMs={140}>
              We focus on the intersection of high-end design and technical complexity — where our approach creates the
              most value for digital products.
            </Reveal>
          </div>
          <div className="vh-build-stack">
            {buildCards.map((item, index) => (
              <Reveal
                key={item.title}
                className={
                  item.lime
                    ? `vh-build-card vh-build-card-lime ${activeBuildCard === item.id ? 'is-active' : ''}`
                    : `vh-build-card ${activeBuildCard === item.id ? 'is-active' : ''}`
                }
                delayMs={index * 80}
              >
                <button
                  type="button"
                  className="vh-build-card-hit"
                  onClick={() => setActiveBuildCard(item.id)}
                  aria-label={`Activate ${item.title} visual mode`}
                />
                <strong>{item.id}</strong>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div>
                  {item.pills.map((pill) => (
                    <span key={pill}>{pill}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vh-section" id="services">
        <div className="container vh-services-layout">
          <div className="vh-services-intro">
            <Reveal as="h2" className="vh-section-title" delayMs={80}>
              OUR SERVICES
            </Reveal>
            <Reveal as="p" className="vh-section-copy" delayMs={120}>
              From strategy to deployment, we provide full-scope delivery or embedded specialists for targeted product
              and engineering challenges.
            </Reveal>
            <Reveal delayMs={180}>
              <Button asChild className="vh-lime-btn">
                <a href="/services">Explore Services</a>
              </Button>
            </Reveal>
          </div>
          <div className="vh-services-list">
            {serviceItems.map((service, index) => {
              const open = openService === index
              return (
                <Reveal key={service.title} className={open ? 'vh-accordion-item open' : 'vh-accordion-item'} delayMs={index * 50}>
                  <button type="button" onClick={() => setOpenService(index)} aria-expanded={open}>
                    <span>{service.title}</span>
                    <i>{open ? '−' : '+'}</i>
                  </button>
                  <p>{service.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="vh-section" id="models">
        <div className="container">
          <Reveal as="h2" className="vh-section-title vh-center" delayMs={80}>
            ENGAGEMENT MODELS
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={130}>
            Flexible ways to work with us — from end-to-end product delivery to embedded expertise inside your team.
          </Reveal>
          <div className="vh-model-grid">
            {engagementCards.map((card, index) => (
              <Reveal key={card.title} className={card.lime ? 'vh-model-card vh-model-card-lime' : 'vh-model-card'} delayMs={index * 90}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vh-section" id="edge">
        <div className="container">
          <Reveal as="h2" className="vh-section-title" delayMs={80}>
            OUR EDGE
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={130}>
            What makes our products feel different — and perform better — over time.
          </Reveal>
          <div className="vh-edge-grid">
            {edgeCards.map((item, index) => (
              <Reveal key={item.title} className="vh-edge-card" delayMs={index * 80}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vh-section vh-studio" id="studio">
        <div className="container vh-studio-shell">
          <Reveal as="h2" className="vh-section-title" delayMs={80}>
            SENIOR-LED STUDIO
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={130}>
            A small, senior team of designers, engineers, strategists, and creative technologists — close to the work
            from kickoff to launch.
          </Reveal>
          <div className="vh-studio-metrics">
            {studioMetrics.map((metric, index) => (
              <Reveal key={metric.label} className="vh-studio-metric" delayMs={index * 80}>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="vh-studio-cta" delayMs={250}>
            <Button asChild variant="outline" className="vh-dark-btn">
              <a href="/about">Meet the Studio</a>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="vh-section" id="faq">
        <div className="container">
          <Reveal as="h2" className="vh-section-title vh-center" delayMs={80}>
            FAQ
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={130}>
            Common questions from teams considering working with Vynho.
          </Reveal>
          <div className="vh-faq-list">
            {faqs.map((faq, index) => {
              const open = openFaq === index
              return (
                <Reveal key={faq.q} className={open ? 'vh-accordion-item open' : 'vh-accordion-item'} delayMs={index * 50}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                  >
                    <span>{faq.q}</span>
                    <i>{open ? '−' : '+'}</i>
                  </button>
                  <p>{faq.a}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="vh-final-cta" id="contact">
        <div className="container vh-final-shell">
          <Reveal as="p" className="vh-final-eyebrow" delayMs={60}>
            Want to collaborate?
          </Reveal>
          <Reveal as="h2" className="vh-section-title" delayMs={100}>
            LET&apos;S TALK
          </Reveal>
          <Reveal as="p" className="vh-section-copy vh-center-copy" delayMs={150}>
            Tell us what you&apos;re building. We&apos;ll help shape strategy, scope, and the right delivery model.
          </Reveal>
          <Reveal className="vh-final-actions" delayMs={200}>
            <Button asChild className="vh-lime-btn">
              <a href="/contact" onClick={handleContactTrigger}>Start a Project</a>
            </Button>
            <Button asChild variant="outline" className="vh-dark-btn">
              <a href="/contact" onClick={handleContactTrigger}>Book a Call</a>
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
