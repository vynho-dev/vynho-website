import { handleContactTrigger } from '@/lib/contactModal'

export interface WorkProject {
  title: string
  category: string
  tag: string
  image: string
  tags: string[]
  featured?: boolean
}

interface ProjectCardProps {
  project: WorkProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.image)

  return (
    <article className={project.featured ? 'vwk-project-card is-featured' : 'vwk-project-card'}>
      {isVideo ? (
        <video src={project.image} autoPlay muted loop playsInline preload="metadata" aria-label={project.title} />
      ) : (
        <img src={project.image} alt={project.title} loading="lazy" />
      )}
      <div className="vwk-project-overlay">
        <p className="vwk-project-title">{project.title}</p>
        <div className="vwk-project-meta">
          <span>{project.category}</span>
          <a href="/contact" onClick={handleContactTrigger}>View case</a>
        </div>
        <div className="vwk-project-tags">
          {project.tags.map((tag) => (
            <i key={tag}>{tag}</i>
          ))}
        </div>
      </div>
      <em className="vwk-project-badge">{project.tag}</em>
    </article>
  )
}
