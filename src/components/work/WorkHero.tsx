import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { SectionShell } from '@/components/patterns/SectionShell'
import { CategoryPills } from '@/components/work/CategoryPills'

const categories = ['All', 'Websites', 'Products', 'Apps', 'Platforms', 'Commerce', 'Immersive']

interface WorkHeroProps {
  onFilter: (category: string) => void
}

export function WorkHero({ onFilter }: WorkHeroProps) {
  const [active, setActive] = useState('All')
  const titleLines = ['GLOBAL WORK.', 'ENGINEERED.'] as const
  const copyLines = [
    'We partner with ambitious teams to design, build, and launch digital products',
    'where refined aesthetics meet reliable engineering.',
  ] as const

  const handleSelect = (value: string) => {
    setActive(value)
    onFilter(value)
  }

  return (
    <SectionShell id="top" className="vwk-hero" containerClassName="container vwk-hero-inner">
        <HeroTextAnimation
          titleLines={titleLines}
          copyLines={copyLines}
          titleClassName="vwk-hero-title"
          copyClassName="vwk-hero-copy"
        />
        <Reveal as="p" className="vwk-hero-count" delayMs={170}>
          Experienced in
        </Reveal>
        <Reveal delayMs={210}>
          <CategoryPills items={categories} active={active} onSelect={handleSelect} />
        </Reveal>
    </SectionShell>
  )
}
