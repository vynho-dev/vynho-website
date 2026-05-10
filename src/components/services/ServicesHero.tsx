import { Reveal } from '@/components/motion/Reveal'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'

export function ServicesHero() {
  const titleLines = ['FULL-STACK', 'EXPERTISE'] as const
  const copyLines = [
    'We design and engineer high-performing digital products from brand-defining',
    'websites to scalable platforms, apps, commerce systems, and immersive experiences.',
  ] as const

  return (
    <section className="vsv-hero" id="top">
      <div className="container vsv-hero-inner">
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
