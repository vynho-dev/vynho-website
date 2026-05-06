interface BuildCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  image?: string
  variant?: 'dark' | 'green' | 'light' | 'metal'
}

export function BuildCard({ number, title, description, tags, image, variant = 'dark' }: BuildCardProps) {
  const isVideo = Boolean(image && /\.(mp4|webm|mov)$/i.test(image))

  return (
    <article className={`vsv-build-card vsv-build-${variant}`}>
      {image ? (
        isVideo ? (
          <video className="vsv-build-media" src={image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <img className="vsv-build-media" src={image} alt="" loading="lazy" aria-hidden="true" />
        )
      ) : null}
      <span className="vsv-build-overlay" aria-hidden="true" />
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
    </article>
  )
}
