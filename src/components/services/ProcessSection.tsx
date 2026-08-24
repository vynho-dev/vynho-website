import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'

const steps = [
  {
    number: '01',
    title: 'Find the Signal',
    description:
      'We clarify business goals, user needs, technical constraints, and success metrics before defining the direction.',
  },
  {
    number: '02',
    title: 'Shape the System',
    description:
      'We shape product architecture, design direction, user flows, content structure, and technical roadmap.',
  },
  {
    number: '03',
    title: 'Build in One Room',
    description:
      'We build the interface and system together, combining visual craft with reliable frontend and backend implementation.',
  },
  {
    number: '04',
    title: 'Release & Learn',
    description:
      'We test, optimize, deploy, and support the product after launch through iteration, analytics, and continuous improvement.',
  },
]

export function ProcessSection() {
  return (
    <SectionShell id="process" className="vsv-section">
      <SectionHeader
        title="HOW WE MOVE"
        titleClassName="vsv-section-title vsv-center"
        copy="A visible sequence of decisions that carries an uncertain idea into production without losing its character."
        copyClassName="vsv-section-copy vsv-center-copy"
      />
      <div className="vsv-process-grid">
        {steps.map((step, index) => (
          <Reveal key={step.number} className="vsv-process-card" delayMs={index * 70}>
            <strong>{step.number}</strong>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
