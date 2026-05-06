import { Reveal } from '@/components/motion/Reveal'

export function ServicesHero() {
  return (
    <section className="vsv-hero" id="top">
      <div className="container vsv-hero-inner">
        <Reveal delayMs={70}>
          <span className="label">Services</span>
        </Reveal>
        <Reveal as="h1" className="vsv-hero-title" delayMs={130}>
          FULL-STACK
          <br />
          EXPERTISE
        </Reveal>
        <Reveal as="p" className="vsv-hero-copy" delayMs={190}>
          We design and engineer high-performing digital products from brand-defining websites to scalable platforms,
          apps, commerce systems, and immersive experiences.
        </Reveal>
      </div>
    </section>
  )
}
