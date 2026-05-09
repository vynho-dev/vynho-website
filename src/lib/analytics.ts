type AnalyticsEventName =
  | 'cta_click'
  | 'section_view'
  | 'work_card_click'
  | 'work_card_view'
  | 'contact_intent'

type AnalyticsPayload = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  const event = {
    event: name,
    ...payload,
    path: window.location.pathname,
    ts: Date.now(),
  }

  window.dataLayer?.push(event)
}
