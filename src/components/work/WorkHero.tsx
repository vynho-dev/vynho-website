import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { CategoryPills } from '@/components/work/CategoryPills'

const categories = ['All', 'Websites', 'Products', 'Apps', 'Platforms', 'Commerce', 'Immersive']

interface WorkHeroProps {
  onFilter: (category: string) => void
}

export function WorkHero({ onFilter }: WorkHeroProps) {
  const [active, setActive] = useState('All')

  const handleSelect = (value: string) => {
    setActive(value)
    onFilter(value)
  }

  return (
    <section className="vwk-hero" id="top">
      <div className="container vwk-hero-inner">
        <Reveal as="h1" className="vwk-hero-title" delayMs={80}>
          GLOBAL WORK.
          <br />
          ENGINEERED.
        </Reveal>
        <Reveal as="p" className="vwk-hero-copy" delayMs={140}>
          We partner with ambitious teams to design, build, and launch digital products where refined aesthetics meet
          reliable engineering.
        </Reveal>
        <Reveal as="p" className="vwk-hero-count" delayMs={170}>
          Experienced in
        </Reveal>
        <Reveal delayMs={210}>
          <CategoryPills items={categories} active={active} onSelect={handleSelect} />
        </Reveal>
      </div>
    </section>
  )
}
