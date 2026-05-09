import { PageShell } from '@/components/layout/PageShell'
import { HomePremium } from '@/components/sections/HomePremium'
import '@/styles/home.css'

export function HomePage() {
  return (
    <PageShell wrapMain={false}>
      <HomePremium />
    </PageShell>
  )
}
