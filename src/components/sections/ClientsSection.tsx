import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'
import type { ClientsSectionConfig } from '@/content/sections'

type Props = { config: ClientsSectionConfig }

export function ClientsSection({ config }: Props) {
  return (
    <SectionShell id="clients" className={config.sectionClassName}>
      <SectionHeader
        watermark={config.watermark}
        watermarkClassName={config.watermarkClassName}
        title={config.headerTitle}
        titleClassName={config.headerTitleClassName}
        titleAs="h2"
        titleDelayMs={config.headerTitleDelayMs}
        copy={config.headerCopy}
        copyClassName={config.headerCopyClassName}
        copyDelayMs={config.headerCopyDelayMs}
      />
      <div className={config.groupsClassName}>
        {config.groups.map((group, index) => (
          <Reveal key={group.label} className={config.rowClassName} delayMs={index * config.rowDelayMs}>
            <p>{group.label}</p>
            <div>
              {group.clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
