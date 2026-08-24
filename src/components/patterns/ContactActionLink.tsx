import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

type ContactActionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  children: ReactNode
  source: string
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ContactActionLink({
  children,
  source,
  href = '/contact',
  onClick,
  ...props
}: ContactActionLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        trackEvent('contact_intent', { source })
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
