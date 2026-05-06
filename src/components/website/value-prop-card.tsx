interface ValuePropCardProps {
  tag: string
  title: string
  description: string
}

export function ValuePropCard({ tag, title, description }: ValuePropCardProps) {
  return (
    <article className="card">
      <p className="card-tag">{tag}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
