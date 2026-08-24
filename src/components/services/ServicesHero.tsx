import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { SignalCore } from '@/components/brand/SignalCore'

export function ServicesHero() {
  const titleLines = ['FROM QUESTION', 'TO SYSTEM.'] as const
  const copyLines = [
    'Senior product strategy, design, and engineering assembled around the exact problem —',
    'not a preset package or production line.',
  ] as const

  return (
    <section className="vsv-hero" id="top">
      <div className="container vsv-hero-inner">
        <SignalCore className="page-hero-signal vsv-hero-signal" label="Vynho services signal" />
        <HeroTextAnimation
          titleLines={titleLines}
          copyLines={copyLines}
          titleClassName="vsv-hero-title"
          copyClassName="vsv-hero-copy"
        />
      </div>
    </section>
  )
}
