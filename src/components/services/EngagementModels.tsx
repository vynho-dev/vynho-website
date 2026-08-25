import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'

const models = [
  {
    id: '01',
    title: 'End-to-End Product Delivery',
    description:
      'We take full ownership of the product lifecycle from discovery and design to scalable build, launch, and post-launch refinement.',
    points: [
      'Senior cross-functional team',
      'Discovery to delivery ownership',
      'Product strategy and roadmap',
      'UX/UI design and development',
      'Launch and iteration support',
    ],
    cta: 'Discuss delivery',
  },
  {
    id: '02',
    title: 'Embedded Expertise',
    description:
      'Our senior specialists integrate directly into your team to fill expertise gaps, accelerate delivery, and strengthen specific product workstreams.',
    points: [
      'Direct senior-team integration',
      'Matches your internal workflow',
      'Design, frontend, backend, or product support',
      'Flexible and scalable collaboration',
      'Clear ownership and communication',
    ],
    cta: 'Add expertise',
    lime: true,
  },
]

export function EngagementModels() {
  return (
    <section className="vsv-section" id="engagement">
      <div className="container">
        <h2 className="vsv-section-title vsv-center">
          ENGAGEMENT
          <br />
          MODELS
        </h2>
        <p className="vsv-section-copy vsv-center-copy">
          Flexible ways to work with us depending on your product stage, team structure, and delivery needs.
        </p>
        <div className="vsv-model-grid">
          {models.map((model, index) => (
            <Reveal key={model.id} className={model.lime ? 'vsv-model-card vsv-model-lime' : 'vsv-model-card'} delayMs={index * 80}>
              <span>{model.id}</span>
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <ul>
                {model.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Button asChild variant={model.lime ? 'default' : 'outline'} size="sm">
                <ContactActionLink source={`services_engagement_${model.id}`}>{model.cta}</ContactActionLink>
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
