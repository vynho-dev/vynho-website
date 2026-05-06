import { Reveal } from '@/components/motion/Reveal'

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container page-intro-grid">
        <div>
          <Reveal delayMs={40}>
            <span className="label">{eyebrow}</span>
          </Reveal>
          <Reveal as="h1" className="page-intro-title" delayMs={140}>
            {title}
          </Reveal>
        </div>
        <Reveal as="p" className="page-intro-copy" delayMs={220}>
          {description}
        </Reveal>
      </div>
    </section>
  )
}
