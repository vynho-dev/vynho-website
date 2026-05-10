import { type MouseEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useReducedMotionPreference } from '@/lib/motion'

export function HomeHeroSection({ onExploreClick }: { onExploreClick: () => void }) {
  const reduceMotion = useReducedMotionPreference()

  const handleScrollToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const workSection = document.getElementById('work')
    if (!workSection) return
    onExploreClick()
    workSection.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="vh-hero">
      <div className="container vh-hero-inner">
        <h1 className="vh-hero-title">
          <span className="vh-visually-hidden">HIGH-END DESIGN. CRAFTED CODE.</span>
          <span className="vh-hero-title-line" aria-hidden="true">HIGH-END DESIGN.</span>
          <span className="vh-hero-title-line" aria-hidden="true">CRAFTED CODE.</span>
        </h1>
        <p className="vh-hero-copy" style={{ transform: 'translateY(calc(var(--vh-scroll-progress, 0) * 60px))' }}>
          We are a digital product studio for teams who see design and engineering as their competitive advantage. From
          flagship websites to scalable applications, we build products where world-class aesthetics meet robust
          infrastructure.
        </p>
        <div className="vh-hero-actions" style={{ transform: 'translateY(calc(var(--vh-scroll-progress, 0) * 100px))' }}>
          <div style={{ display: 'inline-block' }}>
            <Button asChild className="vh-lime-btn">
              <a href="#work" aria-label="Scroll to work section" onClick={handleScrollToWork}>
                ↓
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
