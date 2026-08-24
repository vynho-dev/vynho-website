import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactSheet } from '@/components/contact/ContactSheet'
import { ScrollSignal } from '@/components/motion/ScrollSignal'

type PageShellProps = {
  children: ReactNode
  mainClassName?: string
  mainId?: string
  wrapMain?: boolean
}

export function PageShell({ children, mainClassName, mainId, wrapMain = true }: PageShellProps) {
  return (
    <>
      <a className="skip-link" href={`#${mainId ?? 'top'}`}>Skip to content</a>
      <ScrollSignal />
      <Header />
      {wrapMain ? (
        <main className={mainClassName} id={mainId}>
          {children}
        </main>
      ) : (
        children
      )}
      <Footer />
      <ContactSheet />
    </>
  )
}
