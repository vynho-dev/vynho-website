import { Reveal } from '@/components/motion/Reveal'
import { BuildCard } from '@/components/services/BuildCard'

const cards = [
  {
    number: '01',
    title: 'Websites & Digital Experiences',
    description:
      'High-end websites designed to shape perception, tell a sharper story, and convert attention into action.',
    tags: ['Company Website', 'Product Website', 'Landing Page', 'Content Hub', 'Immersive Web'],
    image: '/assets/services/build-websites.mp4',
    variant: 'dark' as const,
  },
  {
    number: '02',
    title: 'Apps, Platforms & Real-Time Systems',
    description:
      'Scalable applications, SaaS platforms, dashboards, and portals built for complex workflows without sacrificing usability.',
    tags: ['Web App', 'Mobile App', 'SaaS Product', 'Business Portal', 'Data Dashboard'],
    image: '/assets/services/build-apps.mp4',
    variant: 'green' as const,
  },
  {
    number: '03',
    title: 'Commerce & Product Storytelling',
    description:
      'Premium digital storefronts and product experiences that improve perceived value, reduce friction, and increase conversion.',
    tags: ['Premium Storefront', 'B2B Portal', 'Product Configurator', 'Custom Commerce', 'Checkout UX'],
    image: '/assets/services/build-commerce.mp4',
    variant: 'light' as const,
  },
  {
    number: '04',
    title: 'Immersive & Emerging Technology',
    description:
      'Interactive 3D, motion, Web3, AI, and experimental digital systems that create memorable product experiences.',
    tags: ['3D Web', 'Motion Design', 'Web3', 'AI Interfaces', 'Interactive Systems'],
    image: '/assets/services/build-immersive.mp4',
    variant: 'metal' as const,
  },
]

export function WhatWeBuild() {
  return (
    <section className="vsv-section vsv-build" id="build">
      <div className="container">
        <p className="vsv-watermark">WHAT WE BUILD</p>
        <div className="vsv-build-stack">
          {cards.map((card, index) => (
            <Reveal key={card.number} delayMs={index * 70}>
              <BuildCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
