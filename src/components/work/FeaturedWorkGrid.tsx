import { Reveal } from '@/components/motion/Reveal'
import { SectionShell } from '@/components/patterns/SectionShell'
import { ProjectCard, type WorkProject } from '@/components/work/ProjectCard'

interface FeaturedWorkGridProps {
  projects: WorkProject[]
}

export function FeaturedWorkGrid({ projects }: FeaturedWorkGridProps) {
  return (
    <SectionShell id="work-grid" className="vwk-section">
      <div className="vwk-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} delayMs={index * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
