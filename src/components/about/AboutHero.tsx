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
      </div>
    </section>
  )
}
