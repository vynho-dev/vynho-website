import { describe, expect, it, vi } from 'vitest'
import { CONTACT_MODAL_EVENT, handleContactTrigger, requestContactModal } from '@/lib/contactModal'

describe('contact modal events', () => {
  it('dispatches contact modal event from request function', () => {
    const spy = vi.fn()
    window.addEventListener(CONTACT_MODAL_EVENT, spy)

    requestContactModal()

    expect(spy).toHaveBeenCalledTimes(1)
    window.removeEventListener(CONTACT_MODAL_EVENT, spy)
  })

  it('prevents default and dispatches from click helper', () => {
    const eventSpy = vi.fn()
    window.addEventListener(CONTACT_MODAL_EVENT, eventSpy)

    const preventDefault = vi.fn()
    const event = {
      defaultPrevented: false,
      button: 0,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      preventDefault,
    } as unknown as Parameters<typeof handleContactTrigger>[0]

    handleContactTrigger(event)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(eventSpy).toHaveBeenCalledTimes(1)
    window.removeEventListener(CONTACT_MODAL_EVENT, eventSpy)
  })
})
