import { useEffect, useMemo, useRef, useState } from 'react'

export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function useInView(options?: { once?: boolean; rootMargin?: string; threshold?: number }) {
  const { once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.15 } = options ?? {}
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(true)
  const reducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
          return
        }
        if (!once) setVisible(false)
      },
      { root: null, rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, reducedMotion, rootMargin, threshold])

  return useMemo(
    () => ({
      ref,
      visible,
      reducedMotion,
    }),
    [reducedMotion, visible],
  )
}
