import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

export const CONTACT_SHEET_EVENT = 'vynho:contact-sheet-open'

type ContactActionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  children: ReactNode
  source: string
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ContactActionLink({
  children,
  source,
  href = '/contact/',
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
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) return

        event.preventDefault()
        window.dispatchEvent(new CustomEvent(CONTACT_SHEET_EVENT, { detail: { source } }))
      }}
      aria-haspopup="dialog"
    >
      {children}
    </a>
  )
}
