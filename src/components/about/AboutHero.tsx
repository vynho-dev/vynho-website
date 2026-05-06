import { Reveal } from '@/components/motion/Reveal'

export function AboutHero() {
  return (
    <section className="vabt-hero" id="top">
      <div className="container vabt-hero-inner">
        <Reveal as="h1" className="vabt-hero-title" delayMs={80}>
          PEOPLE BEHIND
          <br />
          THE CRAFT
        </Reveal>
        <Reveal as="p" className="vabt-hero-copy" delayMs={140}>
          A senior-led team of designers, engineers, strategists, and creative technologists building digital
          products with uncommon craft and technical depth.
        </Reveal>
        <Reveal delayMs={200}>
          <a className="vabt-down-btn" href="#metrics" aria-label="Scroll to metrics">
            ↓
          </a>
        </Reveal>
      </div>
    </section>
  )
}
