import type { ReactNode } from 'react'

type SectionShellProps = {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
}

export function SectionShell({ id, className, containerClassName, children }: SectionShellProps) {
  return (
    <section id={id} className={className}>
      <div className={containerClassName ?? 'container'}>{children}</div>
    </section>
  )
}

