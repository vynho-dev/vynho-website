import { PageShell } from '@/components/layout/PageShell'
import { Home } from '@/components/sections/Home'
import '@/styles/home.css'

export function HomePage() {
  return (
    <PageShell wrapMain={false}>
      <Home />
    </PageShell>
  )
}
