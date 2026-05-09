import { Reveal } from '@/components/motion/Reveal'
import { ValueCard } from '@/components/about/ValueCard'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'

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
    <SectionShell id="values" className="vabt-section vabt-values">
      <SectionHeader
        title="OUR VALUES"
        titleClassName="vabt-section-title vabt-center-copy"
        titleDelayMs={90}
        copy="Principles that guide how we think, build, collaborate, and deliver."
        copyClassName="vabt-section-copy vabt-center-copy"
        copyDelayMs={130}
      />
      <div className="vabt-values-stage vabt-values-grid">
        <p className="vabt-values-core">STUDIO LIFE</p>
        {values.map((value, index) => (
          <Reveal key={value.title} className={`vabt-value-slot vabt-value-slot-${index + 1}`} delayMs={index * 80}>
            <ValueCard title={value.title.toUpperCase()} description={value.description} image={value.image} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
