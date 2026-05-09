import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'
import { openRolesContent } from '@/content/sections'

export function OpenRolesCTA() {
  return (
    <SectionShell id="roles" className="vabt-section vabt-open-roles" containerClassName="container vabt-center-shell">
      <SectionHeader
        title={openRolesContent.title}
        titleClassName="vabt-section-title vabt-center"
        titleDelayMs={80}
        copy={openRolesContent.description}
        copyClassName="vabt-section-copy vabt-center-copy"
        copyDelayMs={120}
      />
      <Reveal delayMs={170}>
        <Button asChild>
          <a href={openRolesContent.ctaHref}>{openRolesContent.ctaLabel}</a>
        </Button>
      </Reveal>
      <Reveal as="p" className="vabt-muted-note" delayMs={200}>
        {openRolesContent.note}
      </Reveal>
    </SectionShell>
  )
}
