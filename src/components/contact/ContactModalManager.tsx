import { useEffect, useState } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { CONTACT_MODAL_EVENT } from '@/lib/contactModal'

export function ContactModalManager() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('modal') === 'contact') setOpen(true)

    const openModal = () => setOpen(true)
    window.addEventListener(CONTACT_MODAL_EVENT, openModal)
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, openModal)
  }, [])

  return <ContactModal open={open} onClose={() => setOpen(false)} />
}
