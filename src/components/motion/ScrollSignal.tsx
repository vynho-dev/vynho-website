import { useEffect } from 'react'

export function ScrollSignal() {
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, y / max))

      document.documentElement.style.setProperty('--site-scroll-progress', progress.toFixed(5))
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--site-scroll-progress')
    }
  }, [])

  return (
    <div className="site-scroll-rail" aria-hidden="true">
      <span />
    </div>
  )
}
