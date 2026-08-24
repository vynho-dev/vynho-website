import { Reveal } from '@/components/motion/Reveal'
import { SectionShell } from '@/components/patterns/SectionShell'
import { ProjectCard, type WorkProject } from '@/components/work/ProjectCard'

interface FeaturedWorkGridProps {
  projects: WorkProject[]
}

export function FeaturedWorkGrid({ projects }: FeaturedWorkGridProps) {
  return (
    <SectionShell id="work-grid" className="vwk-section">
      <div className="vwk-grid" aria-live="polite">
        {projects.length ? (
          projects.map((project, index) => (
            <Reveal
              key={project.title}
              className={project.featured ? 'vwk-project-slot is-featured' : 'vwk-project-slot'}
              delayMs={index * 60}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))
        ) : (
          <p className="vwk-empty">No work is listed in this category yet. Explore another discipline or tell us what you need.</p>
        )}
      </div>
    </SectionShell>
  )
}
