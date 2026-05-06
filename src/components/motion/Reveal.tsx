import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/motion'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  delayMs?: number
  distance?: number
  once?: boolean
}

export function Reveal({ as, children, className, delayMs = 0, distance = 22, once = true }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const { ref, visible, reducedMotion } = useInView({ once })
  const style = {
    '--motion-delay': `${delayMs}ms`,
    '--motion-distance': `${distance}px`,
  } as CSSProperties

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn('motion-reveal', visible && 'is-visible', reducedMotion && 'is-reduced', className)}
    >
      {children}
    </Tag>
  )
}
