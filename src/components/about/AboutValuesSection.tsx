import { Reveal } from '@/components/motion/Reveal'
import { ValueCard } from '@/components/about/ValueCard'

const values = [
  {
    title: 'Excitement',
    description:
      'We bring energy to complex problems and turn ambitious ideas into clear, buildable systems.',
    image: '/assets/about/values-excitement.mp4',
  },
  {
    title: 'Collaboration',
    description:
      'We work closely with clients and internal teams, keeping communication direct, transparent, and useful.',
    image: '/assets/about/values-collaboration.mp4',
  },
  {
    title: 'Going Beyond',
    description:
      'We do not stop at good enough. We refine, test, and improve until the product feels sharp.',
    image: '/assets/about/values-going-beyond.webp',
  },
  {
    title: 'Honesty',
    description:
      'We put transparency over easy answers, owning constraints and decisions with partners from day one.',
    image: '/assets/about/values-honesty.gif',
  },
  {
    title: 'Individuality',
    description:
      'We value distinct perspectives, strong taste, and original thinking across every discipline.',
    image: '/assets/about/values-individuality.jpeg',
  },
]

export function AboutValuesSection() {
  return (
    <section className="vabt-section vabt-values" id="values">
      <div className="container">
        <Reveal as="h2" className="vabt-section-title vabt-center-copy" delayMs={90}>
          OUR VALUES
        </Reveal>
        <Reveal as="p" className="vabt-section-copy vabt-center-copy" delayMs={130}>
          Principles that guide how we think, build, collaborate, and deliver.
        </Reveal>
        <div className="vabt-values-stage">
          <p className="vabt-values-core">STUDIO LIFE</p>
          {values.map((value, index) => (
            <Reveal key={value.title} className={`vabt-value-slot vabt-value-slot-${index + 1}`} delayMs={index * 80}>
              <ValueCard title={value.title.toUpperCase()} description={value.description} image={value.image} />
            </Reveal>
          ))}
          <Reveal className="vabt-symbol-grid" delayMs={220}>
            {Array.from({ length: 16 }).map((_, idx) => (
              <span key={idx} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
