import { useEffect, useRef, useState } from 'react'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfoCards } from '@/components/contact/ContactInfoCards'
import { CONTACT_SHEET_EVENT } from '@/components/patterns/ContactActionLink'

const CONTACT_QUERY_KEY = 'contact'

function hasContactQuery() {
  return new URLSearchParams(window.location.search).get(CONTACT_QUERY_KEY) === 'open'
}

export function ContactSheet() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(hasContactQuery)

  useEffect(() => {
    const onOpen = () => {
      if (!hasContactQuery()) {
        const url = new URL(window.location.href)
        url.searchParams.set(CONTACT_QUERY_KEY, 'open')
        window.history.pushState({ ...window.history.state, contactSheet: true }, '', url)
      }
      setOpen(true)
    }
    const onPopState = () => setOpen(hasContactQuery())

    window.addEventListener(CONTACT_SHEET_EVENT, onOpen)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener(CONTACT_SHEET_EVENT, onOpen)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const closeSheet = () => {
    if (window.history.state?.contactSheet) {
      window.history.back()
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.delete(CONTACT_QUERY_KEY)
    window.history.replaceState(window.history.state, '', url)
    setOpen(false)
  }

  return (
    <dialog
      ref={dialogRef}
      className="vct-sheet"
      aria-labelledby="contact-sheet-title"
      onCancel={(event) => {
        event.preventDefault()
        closeSheet()
      }}
    >
      <div className="vct-sheet-shell">
        <header className="vct-sheet-header">
          <div>
            <p className="vct-sheet-eyebrow">Start a conversation</p>
            <h2 id="contact-sheet-title">LET&apos;S TALK</h2>
          </div>
          <button type="button" className="vct-sheet-close" aria-label="Close contact form" onClick={closeSheet}>
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <p className="vct-sheet-intro">
          Leave your contact information and expect to hear from us within 24 hours. We&apos;ll help clarify your needs,
          shape the requirements, and identify the right next step.
        </p>

        <ContactForm idPrefix="contact-sheet" variant="sheet" />
        <ContactInfoCards />
      </div>
    </dialog>
  )
}
