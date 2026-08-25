type AnalyticsEventName =
  | 'cta_click'
  | 'section_view'
  | 'work_card_click'
  | 'work_card_view'
  | 'contact_intent'

type AnalyticsPayload = Record<string, string | number | boolean>

const MEASUREMENT_ID = 'G-1Z1FJ3LSYX'
const CONSENT_KEY = 'vynho-analytics-consent'

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
    vynhoAnalyticsLoaded?: boolean
  }
}

export function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'granted'
  } catch {
    return false
  }
}

export function enableAnalytics() {
  if (!hasAnalyticsConsent() || window.vynhoAnalyticsLoaded) return

  window.vynhoAnalyticsLoaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args) => window.dataLayer?.push(args)
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.append(script)
}

export function setAnalyticsConsent(granted: boolean) {
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
  } catch {
    return
  }
  if (granted) enableAnalytics()
}

export function trackPageView() {
  if (!hasAnalyticsConsent()) return
  enableAnalytics()
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (!hasAnalyticsConsent()) return
  enableAnalytics()
  window.gtag?.('event', name, { ...payload, page_path: window.location.pathname })
}
