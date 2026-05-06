import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotionPreference } from '@/lib/motion'

interface ParallaxMediaProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function ParallaxMedia({ children, className, intensity = 16 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (reducedMotion) return
    const node = ref.current
    if (!node) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = node.getBoundingClientRect()
        const viewport = window.innerHeight || 1
        const center = rect.top + rect.height * 0.5
        const progress = (center - viewport * 0.5) / viewport
        const bounded = Math.max(-1, Math.min(1, progress))
        node.style.setProperty('--parallax-y', bounded.toFixed(4))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      style={{ '--parallax-intensity': `${intensity}px` } as CSSProperties}
      className={cn('parallax-media', reducedMotion && 'is-reduced', className)}
    >
      <div className="parallax-media-inner">{children}</div>
    </div>
  )
}
