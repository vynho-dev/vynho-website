import { useEffect, useMemo, useState } from 'react'
import { BackgroundSceneWebGL } from '@/components/layout/BackgroundSceneWebGL'
import type { BackgroundSceneWebGPU as BackgroundSceneWebGPUType } from '@/components/layout/BackgroundSceneWebGPU'

function canTryWebGPU() {
  return typeof navigator !== 'undefined' && 'gpu' in navigator
}

export function BackgroundScene() {
  const [forceWebGL, setForceWebGL] = useState(false)
  const [WebGPUScene, setWebGPUScene] = useState<null | typeof BackgroundSceneWebGPUType>(null)
  const enableWebGPU = useMemo(() => {
    const hasGpu = canTryWebGPU()
    const params = new URLSearchParams(window.location.search)
    // Keep WebGPU experimental-only to avoid unstable visuals in production.
    const requested = params.get('bg') === 'webgpu'
    return hasGpu && requested
  }, [])

  useEffect(() => {
    if (!enableWebGPU || forceWebGL) return
    let active = true
    void import('@/components/layout/BackgroundSceneWebGPU').then((mod) => {
      if (!active) return
      setWebGPUScene(() => mod.BackgroundSceneWebGPU)
    })
    return () => {
      active = false
    }
  }, [enableWebGPU, forceWebGL])

  if (enableWebGPU && !forceWebGL && WebGPUScene) {
    return (
      <div className="site-bg-scene" aria-hidden="true">
        <WebGPUScene onFallback={() => setForceWebGL(true)} />
        <div className="site-bg-readability-overlay" />
      </div>
    )
  }

  return <BackgroundSceneWebGL />
}
