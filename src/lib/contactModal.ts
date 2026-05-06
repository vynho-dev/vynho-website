import type { MouseEvent } from 'react'

export const CONTACT_MODAL_EVENT = 'vynho:open-contact-modal'

export function requestContactModal() {
  window.dispatchEvent(new CustomEvent(CONTACT_MODAL_EVENT))
}

export function handleContactTrigger(event: MouseEvent<HTMLElement>) {
  if (event.defaultPrevented) return
  if (event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  requestContactModal()
}
