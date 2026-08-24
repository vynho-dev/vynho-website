import { PageShell } from '@/components/layout/PageShell'
import { Reveal } from '@/components/motion/Reveal'
import '@/styles/legal.css'

export function NotFoundPage() {
  return (
    <PageShell mainClassName="vlegal-page" mainId="top">
      <section className="container vlegal-shell u-center-copy" aria-labelledby="not-found-title">
        <Reveal><span className="label">Error 404</span></Reveal>
        <Reveal delayMs={70}><h1 id="not-found-title">This page took a different route.</h1></Reveal>
        <Reveal as="p" delayMs={120}>The link may be outdated, or the page may have moved. The rest of the studio is still right where you left it.</Reveal>
        <Reveal delayMs={170}><a className="vlegal-home-link" href="/">Return home <span aria-hidden="true">→</span></a></Reveal>
      </section>
    </PageShell>
  )
}
