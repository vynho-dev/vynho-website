import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { SignalCore } from '@/components/brand/SignalCore'

export function AboutHero() {
  const titleLines = ['SMALL TEAM.', 'LARGE ORBIT.'] as const
  const copyLines = [
    'A senior-led studio in Hyderabad, connected to specialist talent across disciplines and borders —',
    'close enough to care, experienced enough to carry the complexity.',
  ] as const

  return (
    <section className="vabt-hero" id="top">
      <div className="container vabt-hero-inner">
        <SignalCore className="page-hero-signal vabt-hero-signal" label="Vynho studio signal" />
        <HeroTextAnimation
          titleLines={titleLines}
          copyLines={copyLines}
          titleClassName="vabt-hero-title"
          copyClassName="vabt-hero-copy"
        />
      </div>
    </section>
  )
}
