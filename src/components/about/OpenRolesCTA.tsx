import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'

export function OpenRolesCTA() {
  return (
    <section className="vabt-section vabt-open-roles" id="roles">
      <div className="container vabt-center-shell">
        <Reveal as="h2" className="vabt-section-title vabt-center" delayMs={80}>
          OPEN ROLES
        </Reveal>
        <Reveal as="p" className="vabt-section-copy vabt-center-copy" delayMs={120}>
          We are always looking for senior designers, engineers, strategists, and creative technologists who care
          deeply about craft.
        </Reveal>
        <Reveal delayMs={170}>
          <Button asChild className="vh-lime-btn">
            <a href="/careers">View Open Roles</a>
          </Button>
        </Reveal>
        <Reveal as="p" className="vabt-muted-note" delayMs={200}>
          No active roles? Send us your portfolio anyway.
        </Reveal>
      </div>
    </section>
  )
}
