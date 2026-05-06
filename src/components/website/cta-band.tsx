import { Button } from '@/components/ui/button'

interface CtaBandProps {
  title: string
  description?: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CtaBand({ title, description, ctaLabel, ctaHref, secondaryLabel, secondaryHref }: CtaBandProps) {
  return (
    <div className="cta">
      <div className="cta-copy">
        <span className="label">Ready to get started?</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="cta-actions">
        <Button asChild>
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button asChild variant="outline" className="cta-secondary">
            <a href={secondaryHref}>{secondaryLabel}</a>
          </Button>
        ) : null}
      </div>
    </div>
  )
}
