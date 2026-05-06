import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'

const items = [
  {
    number: '01',
    title: 'Product Strategy',
    description:
      'Discovery, positioning, user journeys, technical feasibility, roadmap planning, MVP definition, and product direction.',
  },
  {
    number: '02',
    title: 'UX/UI Design',
    description:
      'Interfaces, design systems, prototypes, interaction models, responsive layouts, and product experience design.',
  },
  {
    number: '03',
    title: '3D, Motion & Immersive Design',
    description:
      'High-end visual systems, motion language, interactive storytelling, WebGL-style experiences, and immersive brand moments.',
  },
  {
    number: '04',
    title: 'Creative Frontend & App Engineering',
    description:
      'React, Next.js, Vite, mobile-ready interfaces, animation systems, design-system implementation, and performance-focused UI engineering.',
  },
  {
    number: '05',
    title: 'Backend, CMS & System Engineering',
    description:
      'APIs, authentication, CMS architecture, databases, integrations, scalable services, admin systems, and deployment pipelines.',
  },
  {
    number: '06',
    title: 'Web3, AI & Emerging Interfaces',
    description:
      'AI product workflows, smart-contract integrations, blockchain experiences, generative interfaces, and experimental technical prototypes.',
  },
]

export function ServicesAccordion() {
  const [active, setActive] = useState(0)

  return (
    <section className="vsv-section" id="services">
      <div className="container">
        <h2 className="vsv-section-title vsv-center">OUR SERVICES</h2>
        <p className="vsv-section-copy vsv-center-copy">
          From strategy to launch, we provide full-scope delivery or targeted senior expertise across design,
          engineering, and product systems.
        </p>
        <div className="vsv-accordion">
          {items.map((item, index) => {
            const open = active === index
            return (
              <Reveal key={item.title} className={open ? 'vsv-accordion-item is-open' : 'vsv-accordion-item'} delayMs={index * 50}>
                <button type="button" onClick={() => setActive(index)} aria-expanded={open}>
                  <span className="vsv-acc-no">{item.number}</span>
                  <span>{item.title}</span>
                  <i>{open ? '−' : '+'}</i>
                </button>
                <p>{item.description}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
