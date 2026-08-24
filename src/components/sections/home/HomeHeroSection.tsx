import { type MouseEvent } from 'react'
import { HeroTextAnimation } from '@/components/motion/HeroTextAnimation'
import { Button } from '@/components/ui/button'
import { useReducedMotionPreference } from '@/lib/motion'

const HERO_TITLE_LINES = ['HIGH-END DESIGN.', 'CRAFTED CODE.'] as const
const HERO_COPY_LINES = [
  'We are a digital product studio for teams who see design and engineering as their',
  'competitive advantage. From flagship websites to scalable applications, we build',
  'products where world-class aesthetics meet robust infrastructure.',
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
      <div className="vh-hero-atmosphere" aria-hidden="true">
        <span className="vh-hero-orbit vh-hero-orbit-one" />
        <span className="vh-hero-orbit vh-hero-orbit-two" />
        <span className="vh-hero-signal" />
      </div>
      <div className="container vh-hero-inner">
        <p className="vh-hero-eyebrow">Independent digital product studio</p>
        <HeroTextAnimation
          titleLines={HERO_TITLE_LINES}
          copyLines={HERO_COPY_LINES}
          titleClassName="vh-hero-title"
          copyClassName="vh-hero-copy"
          copyStyle={{ transform: 'translateY(calc(var(--vh-hero-progress, 0) * 28px))' }}
        />
        <div className="vh-hero-actions" style={{ transform: 'translateY(calc(var(--vh-hero-progress, 0) * 44px))' }}>
          <div style={{ display: 'inline-block' }}>
            <Button asChild className="vh-lime-btn">
              <a href="#work" aria-label="Scroll to work section" onClick={handleScrollToWork}>
                <span>Scroll to explore</span>
                <i aria-hidden="true">↓</i>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
