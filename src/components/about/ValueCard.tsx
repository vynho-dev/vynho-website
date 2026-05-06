interface ValueCardProps {
  title: string
  description: string
  image?: string
}

export function ValueCard({ title, description, image }: ValueCardProps) {
  const isVideo = Boolean(image && /\.(mp4|webm|mov)$/i.test(image))

  return (
    <article className="vabt-value-card">
      {image ? (
        isVideo ? (
          <video
            src={image}
            className="vabt-value-image"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img src={image} alt="" aria-hidden="true" className="vabt-value-image" loading="lazy" />
        )
      ) : null}
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="/about">Discover more</a>
    </article>
  )
}
