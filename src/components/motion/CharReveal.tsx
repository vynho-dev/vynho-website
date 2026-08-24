import type { CSSProperties, ElementType } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/motion'

interface CharRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delayMs?: number
  staggerMs?: number
}

export function CharReveal({
  children,
  as: Tag = 'h2',
  className,
  delayMs = 0,
  staggerMs = 40,
}: CharRevealProps) {
  const Element = Tag as ElementType
  const { ref, visible, reducedMotion } = useInView({ once: true, threshold: 0.4 })

  const words = children.split(' ')
  let charIndex = 0

  return (
    <Element
      ref={ref}
      className={cn('vh-char-reveal', (visible || reducedMotion) && 'is-visible', className)}
      aria-label={children}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('')
        const wordStart = charIndex
        charIndex += word.length + 1

        return (
          <span key={wordIdx} className="vh-char-word" aria-hidden="true">
            {wordChars.map((char, i) => (
              <span key={wordStart + i} className="vh-char-outer">
                <span
                  className="vh-char-inner"
                  style={{ '--char-delay': `${delayMs + (wordStart + i) * staggerMs}ms` } as CSSProperties}
                >
                  {char}
                </span>
              </span>
            ))}
            {wordIdx < words.length - 1 && (
              <span className="vh-char-outer">
                <span
                  className="vh-char-inner"
                  style={{ '--char-delay': `${delayMs + (wordStart + word.length) * staggerMs}ms` } as CSSProperties}
                >
                  &nbsp;
                </span>
              </span>
            )}
          </span>
        )
      })}
    </Element>
  )
}
