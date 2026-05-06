/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

type Props = {
  onFallback: () => void
}

export function BackgroundSceneWebGPU({ onFallback }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false
    let raf = 0
    let renderer: any = null
    let scene: any = null
    let camera: any = null
    let postProcessing: any = null
    let mesh: any = null
    let bloomPass: any = null
    let material: any = null
    let geometry: any = null
    let uniforms: any = null

    const themeColor = () => {
      const mode = document.documentElement.dataset.theme
      return mode === 'light' ? '#eef0f4' : '#000000'
    }

    const boot = async () => {
      try {
        if (!('gpu' in navigator)) throw new Error('WebGPU not supported')
        const THREE = await import('three/webgpu')
        const TSL = await import('three/tsl')
        const { bloom } = await import('three/addons/tsl/display/BloomNode.js')

        const {
          pass,
          uniform,
          Fn,
          screenUV,
          vec2,
          vec3,
          vec4,
          float,
          length,
          normalize,
          dot,
          sin,
          fract,
          mix,
          floor,
          smoothstep,
          clamp,
          atan,
          asin,
        } = TSL as any

        const hash21 = Fn(([p]: any[]) => fract(sin(dot(p, vec2(127.1, 311.7))).mul(43758.5453)))
        const starField = Fn(([rayDir, density, size, bright]: any[]) => {
          const theta = atan(rayDir.z, rayDir.x)
          const phi = asin(clamp(rayDir.y, float(-1.0), float(1.0)))
          const gridScale = float(60.0).div(size)
          const scaledCoord = vec2(theta, phi).mul(gridScale)
          const cell = floor(scaledCoord)
          const cellUV = fract(scaledCoord)
          const cellHash = hash21(cell)
          const starProb = smoothstep(float(1.0).sub(density), float(1.0), cellHash)
          const dist = length(cellUV.sub(vec2(0.5, 0.5)))
          const core = smoothstep(float(0.045), float(0.0), dist).mul(starProb)
          return vec3(core.mul(bright))
        })

        uniforms = {
          time: uniform(0),
          resolution: uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
          cameraPosition: uniform(new THREE.Vector3(0, 0, 15.5)),
          cameraTarget: uniform(new THREE.Vector3(0, 0, 0)),
          lensing: uniform(1.5),
          diskGlow: uniform(0.52),
          coreOpacity: uniform(0.92),
          starDensity: uniform(0.08),
          starSize: uniform(1.1),
          starBrightness: uniform(0.12),
        }

        const shader = Fn(() => {
          const uv = screenUV.sub(0.5).mul(2.0)
          const aspect = uniforms.resolution.x.div(uniforms.resolution.y)
          const p = vec2(uv.x.mul(aspect), uv.y)
          const r = length(p).toVar()

          const warp = smoothstep(float(1.4), float(0.0), r).mul(uniforms.lensing)
          const warpedP = p.add(normalize(p).mul(warp.mul(0.18)))
          const wr = length(warpedP)
          const angle = atan(warpedP.y, warpedP.x)

          const coreMask = smoothstep(float(0.36), float(0.18), wr)
          const disk = smoothstep(float(0.95), float(0.38), wr).mul(smoothstep(float(0.16), float(0.34), wr))
          const swirl = sin(angle.mul(7.0).add(uniforms.time.mul(0.7))).mul(0.5).add(0.5)
          const diskMix = mix(float(0.08), uniforms.diskGlow, swirl).mul(disk)
          const stars = starField(vec3(warpedP, float(1.0)), uniforms.starDensity, uniforms.starSize, uniforms.starBrightness)

          const dark = vec3(0.0, 0.0, 0.0)
          const core = mix(vec3(0.02, 0.02, 0.02), dark, coreMask).mul(uniforms.coreOpacity)
          const lime = vec3(0.76, 1.0, 0.2).mul(diskMix)
          const silver = vec3(0.74, 0.77, 0.84).mul(diskMix.mul(0.55))
          const color = core.add(lime).add(silver).add(stars)
          return vec4(color, 1.0)
        })()

        scene = new THREE.Scene()
        scene.background = new THREE.Color(themeColor())
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 15.5)

        renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        host.appendChild(renderer.domElement)

        geometry = new THREE.SphereGeometry(100, 24, 24)
        geometry.scale(-1, 1, 1)
        material = new THREE.MeshBasicNodeMaterial()
        material.colorNode = shader
        mesh = new THREE.Mesh(geometry, material)
        mesh.frustumCulled = false
        scene.add(mesh)

        await renderer.init()
        postProcessing = new THREE.PostProcessing(renderer)
        const scenePass = pass(scene, camera)
        const scenePassColor = scenePass.getTextureNode()
        bloomPass = bloom(scenePassColor)
        bloomPass.threshold.value = 0.5
        bloomPass.strength.value = 0.62
        bloomPass.radius.value = 0
        postProcessing.outputNode = scenePassColor.add(bloomPass)

        const onResize = () => {
          if (!camera || !renderer || !uniforms) return
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
        }

        const onTheme = () => {
          const mode = document.documentElement.dataset.theme
          scene.background = new THREE.Color(themeColor())
          if (mode === 'light') {
            uniforms.diskGlow.value = 0.34
            uniforms.coreOpacity.value = 0.56
            uniforms.starBrightness.value = 0.06
            bloomPass.strength.value = 0.18
          } else {
            uniforms.diskGlow.value = 0.56
            uniforms.coreOpacity.value = 0.92
            uniforms.starBrightness.value = 0.12
            bloomPass.strength.value = 0.62
          }
        }

        const observer = new MutationObserver(onTheme)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let targetScroll = 0
        let smoothScroll = 0
        const onScroll = () => {
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
          targetScroll = Math.min(1, Math.max(0, window.scrollY / max))
        }
        onScroll()
        onTheme()
        window.addEventListener('resize', onResize)
        window.addEventListener('scroll', onScroll, { passive: true })

        let last = performance.now()
        const tick = () => {
          if (disposed) return
          raf = requestAnimationFrame(tick)
          const now = performance.now()
          const dt = Math.min((now - last) / 1000, 0.033)
          last = now

          if (!reduced) {
            smoothScroll += (targetScroll - smoothScroll) * 0.06
          } else {
            smoothScroll = targetScroll
          }

          uniforms.time.value += dt
          const z = 15.5 - Math.pow(smoothScroll, 1.3) * 6.4
          camera.position.z = z
          camera.position.y = -Math.pow(smoothScroll, 1.2) * 0.6
          camera.lookAt(0, 0, 0)

          uniforms.lensing.value = 1.3 + smoothScroll * 1.2
          uniforms.diskGlow.value += ((document.documentElement.dataset.theme === 'light' ? 0.34 : 0.56) - uniforms.diskGlow.value) * 0.04
          uniforms.coreOpacity.value += ((document.documentElement.dataset.theme === 'light' ? 0.56 : 0.92) - uniforms.coreOpacity.value) * 0.04
          uniforms.starBrightness.value += ((document.documentElement.dataset.theme === 'light' ? 0.06 : 0.12) - uniforms.starBrightness.value) * 0.04

          postProcessing.render()
        }

        tick()

        return () => {
          observer.disconnect()
          window.removeEventListener('resize', onResize)
          window.removeEventListener('scroll', onScroll)
        }
      } catch {
        onFallback()
      }
    }

    let teardown: (() => void) | undefined
    boot().then((cleanup) => {
      teardown = cleanup
    })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      teardown?.()
      mesh?.geometry?.dispose?.()
      material?.dispose?.()
      renderer?.dispose?.()
      renderer?.domElement?.remove?.()
    }
  }, [onFallback])

  return <div className="site-bg-canvas-host" ref={hostRef} />
}
