import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'
import { SectionShell } from '@/components/patterns/SectionShell'

type SectionCTAProps = {
  id?: string
  sectionClassName: string
  containerClassName: string
  eyebrow: string
  title: string
  description?: string
  source: string
  primaryLabel: string
  secondaryLabel?: string
  secondaryHref?: string
  eyebrowClassName: string
  titleClassName: string
  descriptionClassName?: string
  actionsClassName: string
}

export function SectionCTA({
  id = 'contact',
  sectionClassName,
  containerClassName,
  eyebrow,
  title,
  description,
  source,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: SectionCTAProps) {
  return (
    <SectionShell id={id} className={sectionClassName} containerClassName={containerClassName}>
      <Reveal as="p" className={eyebrowClassName} delayMs={80}>
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className={titleClassName} delayMs={130}>
        {title}
      </Reveal>
      {description ? (
        <Reveal as="p" className={descriptionClassName} delayMs={170}>
          {description}
        </Reveal>
      ) : null}
      <Reveal className={actionsClassName} delayMs={210}>
        <Button asChild>
          <ContactActionLink source={source}>{primaryLabel}</ContactActionLink>
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button asChild variant="outline">
            <a href={secondaryHref}>{secondaryLabel}</a>
          </Button>
        ) : null}
      </Reveal>
    </SectionShell>
  )
}
