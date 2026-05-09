import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'

const steps = [
  {
    number: '01',
    title: 'Exploration & Alignment',
    description:
      'We clarify business goals, user needs, technical constraints, and success metrics before defining the direction.',
  },
  {
    number: '02',
    title: 'Strategy & System Design',
    description:
      'We shape product architecture, design direction, user flows, content structure, and technical roadmap.',
  },
  {
    number: '03',
    title: 'Design & Engineering',
    description:
      'We build the interface and system together, combining visual craft with reliable frontend and backend implementation.',
  },
  {
    number: '04',
    title: 'Launch & Growth',
    description:
      'We test, optimize, deploy, and support the product after launch through iteration, analytics, and continuous improvement.',
  },
]

export function ProcessSection() {
  return (
    <SectionShell id="process" className="vsv-section">
      <SectionHeader
        title="OUR PROCESS"
        titleClassName="vsv-section-title vsv-center"
        copy="A senior-led workflow designed to move from ambiguity to launch with clarity, speed, and craft."
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
