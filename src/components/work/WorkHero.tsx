import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { SectionShell } from '@/components/patterns/SectionShell'
import { CategoryPills } from '@/components/work/CategoryPills'
import { SignalCore } from '@/components/brand/SignalCore'

const categories = ['All', 'Websites', 'Products', 'Apps', 'Platforms', 'Commerce', 'Immersive']

interface WorkHeroProps {
  onFilter: (category: string) => void
}

export function WorkHero({ onFilter }: WorkHeroProps) {
  const [active, setActive] = useState('All')
  const titleLines = ['SELECTED WORK.', 'BUILT TO MOVE.'] as const
  const copyLines = [
    'A focused selection of products where strategy, visual character, and technical execution',
    'move as one system.',
  ] as const

  const handleSelect = (value: string) => {
    setActive(value)
    onFilter(value)
  }

  return (
    <SectionShell id="top" className="vwk-hero" containerClassName="container vwk-hero-inner">
        <SignalCore className="page-hero-signal vwk-hero-signal" label="Vynho work signal" />
        <HeroTextAnimation
          titleLines={titleLines}
          copyLines={copyLines}
          titleClassName="vwk-hero-title"
          copyClassName="vwk-hero-copy"
        />
        <Reveal as="p" className="vwk-hero-count" delayMs={170}>
          Filter the signal
        </Reveal>
        <Reveal delayMs={210}>
          <CategoryPills items={categories} active={active} onSelect={handleSelect} />
        </Reveal>
    </SectionShell>
  )
}
