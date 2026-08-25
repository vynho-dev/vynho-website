import { useEffect, useState } from 'react'
import { enableAnalytics, hasAnalyticsConsent, setAnalyticsConsent, trackPageView } from '@/lib/analytics'

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem('vynho-analytics-consent') === null) setVisible(true)
      else if (hasAnalyticsConsent()) enableAnalytics()
    } catch {
      setVisible(false)
    }
  }, [])

  function choose(granted: boolean) {
    setAnalyticsConsent(granted)
    if (granted) trackPageView()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="vha-consent" aria-label="Cookie preferences">
      <p>Vynho uses optional analytics to understand site use. <a href="/cookies/">Cookie notice</a> and <a href="/privacy/">Privacy policy</a>.</p>
      <div>
        <button type="button" onClick={() => choose(false)}>Only essential</button>
        <button type="button" onClick={() => choose(true)}>Accept analytics</button>
      </div>
    </aside>
  )
}
