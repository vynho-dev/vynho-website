import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoCards } from '@/components/contact/ContactInfoCards'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = window.setTimeout(() => {
      if (!panelRef.current) return
      const focusable = getFocusable(panelRef.current)
      focusable[0]?.focus()
    }, 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (!panelRef.current) return

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable(panelRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusFirst)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [onClose, open])

  if (!open) return null

  return createPortal(
    <div className="vct-modal-backdrop" onClick={onClose} role="presentation">
      <section
        ref={panelRef}
        className="vct-panel vct-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="vct-modal-close" aria-label="Close contact form" onClick={onClose}>
          ×
        </button>
        <h2 id="contact-modal-title">LET&apos;S TALK</h2>
        <p className="vct-intro">
          Leave your contact info and expect to hear from us within 24 hours. We&apos;ll help clarify your needs, shape
          the requirements, and identify the best solution for you.
        </p>
        <ContactForm />
        <ContactInfoCards />
      </section>
    </div>,
    document.body,
  )
}
