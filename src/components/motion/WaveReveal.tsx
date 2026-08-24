import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
  type ElementType,
} from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/motion'

type WaveDirection = 'up' | 'down'

type WaveContextValue = {
  staggerMs: number
  distance: number
  depthStep: number
  direction: WaveDirection
  once: boolean
  rootMargin: string
  amount: number
}

const WaveContext = createContext<WaveContextValue | null>(null)

interface WaveRevealGroupProps {
  as?: ElementType
  children: ReactNode
  className?: string
  staggerMs?: number
  distance?: number
  depthStep?: number
  direction?: WaveDirection
  rootMargin?: string
  amount?: number
  once?: boolean
}

export function WaveRevealGroup({
  as: Tag = 'div',
  children,
  className,
  staggerMs = 120,
  distance = 24,
  depthStep = 16,
  direction = 'up',
  rootMargin = '0px 0px -10% 0px',
  amount = 0.15,
  once = false,
}: WaveRevealGroupProps) {
  const ctxValue = useMemo(
    () => ({ staggerMs, distance, depthStep, direction, once, rootMargin, amount }),
    [staggerMs, distance, depthStep, direction, once, rootMargin, amount],
  )

  return (
    <WaveContext.Provider value={ctxValue}>
      <Tag className={className}>
        {children}
      </Tag>
    </WaveContext.Provider>
  )
}

interface WaveRevealItemProps {
  as?: ElementType
  children: ReactNode
  className?: string
  index: number
}

export function WaveRevealItem({ as: Tag = 'div', children, className, index }: WaveRevealItemProps) {
  const ctx = useContext(WaveContext)
  const { ref, visible, reducedMotion } = useInView({
    once: ctx?.once ?? true,
    rootMargin: ctx?.rootMargin,
    threshold: ctx?.amount,
  })

  if (!ctx) {
    return <Tag className={className}>{children}</Tag>
  }

  const depth = Math.min(index * ctx.depthStep, 36)
  const directionDistance = ctx.direction === 'up' ? ctx.distance : -ctx.distance
  const style = {
    '--wave-delay': `${index * ctx.staggerMs}ms`,
    '--wave-distance': `${directionDistance}px`,
    '--wave-depth': `${depth}px`,
  } as CSSProperties

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn('motion-wave', (visible || reducedMotion) && 'is-visible', className)}
    >
      {children}
    </Tag>
  )
}
