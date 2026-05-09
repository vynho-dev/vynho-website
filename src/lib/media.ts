export type MediaTier = 'high' | 'balanced' | 'lite'

type ConnectionLike = {
  saveData?: boolean
  effectiveType?: string
}

function getConnection(): ConnectionLike | undefined {
  const nav = navigator as Navigator & {
    connection?: ConnectionLike
    mozConnection?: ConnectionLike
    webkitConnection?: ConnectionLike
  }
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection
}

export function getMediaTier(): MediaTier {
  if (typeof window === 'undefined') return 'balanced'

  const isMobile = window.matchMedia('(max-width: 820px)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const connection = getConnection()
  const saveData = Boolean(connection?.saveData)
  const slowNetwork = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'

  if (saveData || slowNetwork || memory <= 2) return 'lite'
  if (prefersReducedMotion || isMobile || memory <= 4) return 'balanced'
  return 'high'
}

