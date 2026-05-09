import { MediaCard } from '@/components/patterns/MediaCard'

interface BuildCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  image?: string
  variant?: 'dark' | 'green' | 'light' | 'metal'
}

export function BuildCard({ number, title, description, tags, image, variant = 'dark' }: BuildCardProps) {
  return (
    <MediaCard className={`vsv-build-card vsv-build-${variant}`} image={image} mediaClassName="vsv-build-media">
      {image ? <span className="vsv-build-overlay" aria-hidden="true" /> : null}
      <span className="vsv-build-number">{number}</span>
      <div className="vsv-build-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="vsv-build-tags">
        {tags.map((tag) => (
          <i key={tag}>{tag}</i>
        ))}
      </div>
    </MediaCard>
  )
}
