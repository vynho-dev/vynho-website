import { Reveal } from '@/components/motion/Reveal'
import { ProjectCard, type WorkProject } from '@/components/work/ProjectCard'

interface FeaturedWorkGridProps {
  projects: WorkProject[]
}

export function FeaturedWorkGrid({ projects }: FeaturedWorkGridProps) {
  return (
    <section className="vwk-section" id="work-grid">
      <div className="container">
        <div className="vwk-grid">
          {projects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
