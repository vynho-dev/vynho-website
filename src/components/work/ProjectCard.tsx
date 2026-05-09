import { ContactActionLink } from '@/components/patterns/ContactActionLink'
import { MediaCard } from '@/components/patterns/MediaCard'

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
  return (
    <MediaCard
      className={project.featured ? 'vwk-project-card is-featured' : 'vwk-project-card'}
      image={project.image}
      imageAlt={project.title}
      videoLabel={project.title}
    >
      <div className="vwk-project-overlay">
        <p className="vwk-project-title">{project.title}</p>
        <div className="vwk-project-meta">
          <span>{project.category}</span>
          <ContactActionLink source={`work_project_${project.title.toLowerCase().replace(/\s+/g, '-')}`}>View case</ContactActionLink>
        </div>
        <div className="vwk-project-tags">
          {project.tags.map((tag) => (
            <i key={tag}>{tag}</i>
          ))}
        </div>
      </div>
      <em className="vwk-project-badge">{project.tag}</em>
    </MediaCard>
  )
}
