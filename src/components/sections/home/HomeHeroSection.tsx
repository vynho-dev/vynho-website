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
      <div className="container vh-hero-inner">
        <HeroTextAnimation
          titleLines={HERO_TITLE_LINES}
          copyLines={HERO_COPY_LINES}
          titleClassName="vh-hero-title"
          copyClassName="vh-hero-copy"
          titleStyle={{ transform: 'translateY(calc(var(--vh-hero-progress, 0) * -18px))' }}
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
