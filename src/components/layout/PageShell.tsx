import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

type PageShellProps = {
  children: ReactNode
  mainClassName?: string
  mainId?: string
  wrapMain?: boolean
}

export function PageShell({ children, mainClassName, mainId, wrapMain = true }: PageShellProps) {
  return (
    <>
      <Header />
      {wrapMain ? (
        <main className={mainClassName} id={mainId}>
          {children}
        </main>
      ) : (
        children
      )}
      <Footer />
    </>
  )
}

