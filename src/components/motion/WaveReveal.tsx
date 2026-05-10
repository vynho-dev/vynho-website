import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  type ElementType,
} from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type WaveDirection = 'up' | 'down'

type WaveContextValue = {
  reducedMotion: boolean
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
  const reducedMotion = useReducedMotion() ?? false

  const ctxValue = useMemo(
    () => ({ reducedMotion, staggerMs, distance, depthStep, direction, once, rootMargin, amount }),
    [reducedMotion, staggerMs, distance, depthStep, direction, once, rootMargin, amount],
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

  if (!ctx) {
    return <Tag className={className}>{children}</Tag>
  }

  const delay = (index * ctx.staggerMs) / 1000
  const depth = Math.min(index * ctx.depthStep, 36)
  const directionDistance = ctx.direction === 'up' ? ctx.distance : -ctx.distance

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: directionDistance,
      scale: Math.max(0.86, 1 - depth / 220),
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.82,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  if (ctx.reducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: ctx.once, amount: ctx.amount, margin: ctx.rootMargin as never }}
    >
      {children}
    </motion.div>
  )
}
