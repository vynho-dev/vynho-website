import { type MouseEvent } from 'react'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { Button } from '@/components/ui/button'
import { useReducedMotionPreference } from '@/lib/motion'
import { SignalCore } from '@/components/brand/SignalCore'

const HERO_TITLE_LINES = ['AMBITION, MADE', 'TANGIBLE.'] as const
const HERO_COPY_LINES = [
  'Vynho is a senior product studio shaping ambitious ideas into distinctive digital systems —',
  'from strategy and interface to resilient engineering.',
] as const

export function HomeHeroSection({ onExploreClick }: { onExploreClick: () => void }) {
  const reduceMotion = useReducedMotionPreference()

  const handleScrollToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const workSection = document.getElementById('work')
    if (!workSection) return
    onExploreClick()
    window.history.pushState(null, '', '#work')
    workSection.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="vh-hero">
      <div className="container vh-hero-inner">
        <p className="vh-hero-kicker">VYNHO / INDEPENDENT PRODUCT STUDIO</p>
        <SignalCore className="vh-hero-signal" />
        <HeroTextAnimation
          titleLines={HERO_TITLE_LINES}
          copyLines={HERO_COPY_LINES}
          titleClassName="vh-hero-title"
          copyClassName="vh-hero-copy"
          copyStyle={{ transform: 'translateY(calc(var(--vh-hero-progress, 0) * 20px))' }}
        />
        <div className="vh-hero-actions" style={{ transform: 'translateY(calc(var(--vh-hero-progress, 0) * 32px))' }}>
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
