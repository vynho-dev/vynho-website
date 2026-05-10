import { Reveal } from '@/components/motion/Reveal'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'

export function AboutHero() {
  const titleLines = ['PEOPLE BEHIND', 'THE CRAFT'] as const
  const copyLines = [
    'A senior-led team of designers, engineers, strategists, and creative technologists building digital',
    'products with uncommon craft and technical depth.',
  ] as const

  return (
    <section className="vabt-hero" id="top">
      <div className="container vabt-hero-inner">
        <HeroTextAnimation
          titleLines={titleLines}
          copyLines={copyLines}
          titleClassName="vabt-hero-title"
          copyClassName="vabt-hero-copy"
        />
        <Reveal delayMs={200}>
          <a className="vabt-down-btn" href="#metrics" aria-label="Scroll to metrics">
            ↓
          </a>
        </Reveal>
      </div>
    </section>
  )
}
