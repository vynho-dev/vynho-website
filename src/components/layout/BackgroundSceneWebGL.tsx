import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  RingGeometry,
  Box3,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Object3D,
  Material,
  Vector3,
  WebGLRenderer,
  SRGBColorSpace,
} from 'three'

type ThemeMode = 'dark' | 'light'
type SceneMode = 'procedural' | 'model'
type SceneVariant = 'web' | 'apps' | 'commerce' | 'immersive'

type SceneTargets = {
  coreColor: Color
  ringColor: Color
  glowColor: Color
  particleColor: Color
  coreOpacity: number
  diskOpacity: number
  ringOpacity: number
  particleOpacity: number
  metalness: number
  roughness: number
}

function detectTheme(): ThemeMode {
  const rootTheme = document.documentElement.dataset.theme
  if (rootTheme === 'light' || rootTheme === 'dark') return rootTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function createDiskTexture() {
  const size = 1024
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) return null

  const cx = size / 2
  const cy = size / 2
  ctx.clearRect(0, 0, size, size)

  // Warm white/pale gold accretion gradient
  const radial = ctx.createRadialGradient(cx, cy, size * 0.12, cx, cy, size * 0.52)
  radial.addColorStop(0, 'rgba(255,245,220,0)')
  radial.addColorStop(0.2, 'rgba(255,240,195,0.25)')
  radial.addColorStop(0.38, 'rgba(255,255,235,0.5)')
  radial.addColorStop(0.55, 'rgba(220,245,165,0.28)')
  radial.addColorStop(0.82, 'rgba(150,165,185,0.08)')
  radial.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, size, size)

  // Relativistic beaming asymmetry (brighter one side)
  const asym = ctx.createLinearGradient(cx - size * 0.48, cy, cx + size * 0.52, cy)
  asym.addColorStop(0, 'rgba(255,255,255,0.04)')
  asym.addColorStop(0.46, 'rgba(255,255,255,0.08)')
  asym.addColorStop(0.72, 'rgba(255,255,255,0.22)')
  asym.addColorStop(1, 'rgba(255,255,255,0.02)')
  ctx.globalCompositeOperation = 'screen'
  ctx.fillStyle = asym
  ctx.fillRect(0, 0, size, size)

  // Turbulent streaks around center to mimic disk ripples
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 900; i += 1) {
    const a = Math.random() * Math.PI * 2
    const r = size * (0.19 + Math.random() * 0.33)
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r * (0.45 + Math.random() * 0.16)
    const w = 1 + Math.random() * 2
    const h = 3 + Math.random() * 10
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a + (Math.random() - 0.5) * 0.6)
    ctx.fillStyle = `rgba(255,255,235,${0.03 + Math.random() * 0.08})`
    ctx.fillRect(-w * 0.5, -h * 0.5, w, h)
    ctx.restore()
  }

  ctx.globalCompositeOperation = 'source-over'

  return new CanvasTexture(c)
}

function disposeObject3D(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as unknown as { geometry?: { dispose: () => void }; material?: Material | Material[] }
    mesh.geometry?.dispose?.()
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m?.dispose?.())
    } else {
      mesh.material?.dispose?.()
    }
  })
}

export function BackgroundSceneWebGL() {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const [fallback, setFallback] = useState(false)

  const isReducedMotion = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    [],
  )

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const isMobile = window.matchMedia('(max-width: 820px)').matches
    const lowPower = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4
      : false
    const reduceSceneComplexity = isMobile || lowPower

    if (!canUseWebGL()) {
      setFallback(true)
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 0, 13.8)

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = SRGBColorSpace
    rendererRef.current = renderer
    host.appendChild(renderer.domElement)

    const hemi = new HemisphereLight('#e7ecf8', '#0b0c10', 0.42)
    scene.add(hemi)
    const key = new DirectionalLight('#ffffff', 0.44)
    key.position.set(3.6, 2.4, 4.8)
    scene.add(key)
    const rim = new DirectionalLight('#c1ff35', 0.08)
    rim.position.set(-3.1, -1.6, 2.8)
    scene.add(rim)

    const rig = new Group()
    rig.position.set(0.22, 0.08, -1)
    scene.add(rig)

    const holeGeometry = new SphereGeometry(1.12, 48, 48)
    const holeMaterial = new MeshPhysicalMaterial({
      color: new Color('#050505'),
      metalness: 0.52,
      roughness: 0.42,
      clearcoat: 1,
      clearcoatRoughness: 0.34,
      transparent: true,
      opacity: 0.94,
    })
    const holeMesh = new Mesh(holeGeometry, holeMaterial)
    holeMesh.visible = false
    rig.add(holeMesh)

    const diskTexture = createDiskTexture()
    const diskMaterial = new MeshBasicMaterial({
      map: diskTexture ?? undefined,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.58,
    })
    const disk = new Mesh(new RingGeometry(1.28, 4.05, 144), diskMaterial)
    disk.visible = false
    disk.rotation.x = 1.22
    disk.rotation.z = 0.28
    rig.add(disk)

    // Lensed far-side arcs (top and bottom) to read like true warped accretion disk
    const arcMaterial = new MeshBasicMaterial({
      color: new Color('#f4f8ff'),
      transparent: true,
      opacity: 0.26,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    const topArc = new Mesh(new TorusGeometry(2.28, 0.03, 8, 96, Math.PI * 1.2), arcMaterial)
    topArc.visible = false
    topArc.position.set(0.08, 0.7, -0.1)
    topArc.rotation.x = 1.38
    topArc.rotation.y = 0.1
    rig.add(topArc)

    const bottomArc = new Mesh(new TorusGeometry(2.22, 0.026, 8, 96, Math.PI * 1.1), arcMaterial.clone())
    bottomArc.visible = false
    ;(bottomArc.material as MeshBasicMaterial).opacity = 0.18
    bottomArc.position.set(-0.06, -0.76, -0.12)
    bottomArc.rotation.x = 1.45
    bottomArc.rotation.y = -0.12
    bottomArc.rotation.z = Math.PI
    rig.add(bottomArc)

    // Thin Einstein ring around the shadow
    const einsteinRing = new Mesh(
      new TorusGeometry(1.42, 0.012, 8, 120),
      new MeshBasicMaterial({
        color: new Color('#e8f1ff'),
        transparent: true,
        opacity: 0.34,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    einsteinRing.visible = false
    einsteinRing.rotation.x = 1.53
    rig.add(einsteinRing)

    const orbitMaterial = new MeshPhysicalMaterial({
      color: new Color('#2a2f39'),
      transparent: true,
      opacity: 0.28,
      metalness: 0.75,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    })
    const orbit = new Mesh(new TorusGeometry(3.45, 0.02, 8, 120), orbitMaterial)
    orbit.visible = false
    orbit.rotation.x = 1.24
    rig.add(orbit)

    // Keep procedural object visible by default. If GLB loads successfully,
    // we switch to model-only mode.

    const starCount = reduceSceneComplexity ? 280 : 620
    const positions = new Float32Array(starCount * 3)
    const basePositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 90
      const z = -Math.random() * 60
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      basePositions[i3] = x
      basePositions[i3 + 1] = y
      basePositions[i3 + 2] = z
    }

    const starGeometry = new BufferGeometry()
    starGeometry.setAttribute('position', new BufferAttribute(positions, 3))
    const stars = new Points(
      starGeometry,
      new PointsMaterial({
        color: new Color('#dce6ff'),
        size: isMobile ? 0.05 : 0.06,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    )
    scene.add(stars)

    // Infall stream particles (brand colors) to simulate light/material being pulled into the black hole.
    const infallCount = reduceSceneComplexity ? 180 : 360
    const infallPositions = new Float32Array(infallCount * 3)
    const infallSeed = new Float32Array(infallCount * 4) // radius, angle, drift, depth
    for (let i = 0; i < infallCount; i += 1) {
      const i3 = i * 3
      const i4 = i * 4
      const radius = 18 + Math.random() * 56
      const angle = Math.random() * Math.PI * 2
      const drift = (Math.random() - 0.5) * 0.9
      const depth = -2 - Math.random() * 44
      infallSeed[i4] = radius
      infallSeed[i4 + 1] = angle
      infallSeed[i4 + 2] = drift
      infallSeed[i4 + 3] = depth
      infallPositions[i3] = Math.cos(angle) * radius
      infallPositions[i3 + 1] = Math.sin(angle) * radius * 0.55
      infallPositions[i3 + 2] = depth
    }
    const infallGeometry = new BufferGeometry()
    infallGeometry.setAttribute('position', new BufferAttribute(infallPositions, 3))
    const infallMaterial = new PointsMaterial({
      color: new Color('#d9ff4e'),
      size: isMobile ? 0.04 : 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const infallPoints = new Points(infallGeometry, infallMaterial)
    scene.add(infallPoints)

    let raf = 0
    let modelRoot: Object3D | null = null
    let modelLoaded = false
    let sceneMode: SceneMode = 'procedural'
    let sceneVariant: SceneVariant = 'web'
    let theme = detectTheme()
    let scrollProgress = 0
    let targetScrollProgress = 0
    let scrollY = 0
    const cameraBase = new Vector3(0, 0, 13.8)
    const style = getComputedStyle(document.documentElement)
    const varColor = (name: string, fallbackColor: string) =>
      new Color(style.getPropertyValue(name).trim() || fallbackColor)
    const themeTargets = (): SceneTargets => ({
      coreColor: varColor('--bg-scene-core', theme === 'light' ? '#6f7a8a' : '#050505'),
      ringColor: varColor('--bg-scene-ring', theme === 'light' ? '#b3bdcc' : '#2a2f39'),
      glowColor: varColor('--bg-scene-glow', '#c1ff35'),
      particleColor: varColor('--bg-scene-particle', theme === 'light' ? '#4d5768' : '#dce6ff'),
      coreOpacity: theme === 'light' ? 0.42 : 0.94,
      diskOpacity: theme === 'light' ? 0.34 : 0.6,
      ringOpacity: theme === 'light' ? 0.24 : 0.34,
      particleOpacity: theme === 'light' ? 0.2 : 0.34,
      metalness: theme === 'light' ? 0.96 : 0.72,
      roughness: theme === 'light' ? 0.16 : 0.34,
    })
    let targetValues = themeTargets()

    const motionIntensityRaw = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--bg-motion-intensity') || '1',
    )
    const motionIntensity = Number.isFinite(motionIntensityRaw) ? Math.max(0.2, motionIntensityRaw) : 1
    const motionPresetRaw = getComputedStyle(document.documentElement).getPropertyValue('--bg-motion-preset').trim().toLowerCase()
    const motionPreset = motionPresetRaw === 'editorial' || motionPresetRaw === 'cinematic' ? motionPresetRaw : 'medium'
    const presetFactor = motionPreset === 'editorial' ? 0.72 : motionPreset === 'cinematic' ? 1.34 : 1

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / max))
      scrollY = window.scrollY
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    }

    const onVariantChange = (event: Event) => {
      const custom = event as CustomEvent<{ variant?: SceneVariant }>
      const next = custom.detail?.variant
      if (next === 'web' || next === 'apps' || next === 'commerce' || next === 'immersive') {
        sceneVariant = next
      }
    }

    const mutationObserver = new MutationObserver(() => {
      theme = detectTheme()
      targetValues = themeTargets()
    })
    mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('vynho:bg-scene-variant', onVariantChange as EventListener)

    const loadModel = async () => {
      // Keep production on procedural scene: current GLB emits runtime texture-load warnings in Chromium.
      const enableExternalModel = false
      if (!enableExternalModel) return
      try {
        const [{ GLTFLoader }] = await Promise.all([import('three/examples/jsm/loaders/GLTFLoader.js')])
        const loader = new GLTFLoader()
        const modelUrl = '/assets/models/black_hole.glb'

        loader.load(
          modelUrl,
          (gltf) => {
            modelRoot = gltf.scene
            // Normalize model transform so it is reliably visible regardless of source scale.
            const box = new Box3().setFromObject(modelRoot)
            const size = new Vector3()
            const center = new Vector3()
            box.getSize(size)
            box.getCenter(center)
            const maxDim = Math.max(size.x, size.y, size.z, 0.001)
            const fitScale = 10.8 / maxDim
            modelRoot.position.sub(center)
            modelRoot.scale.setScalar(fitScale)
            modelRoot.position.set(0, 0.06, 0.08)
            modelRoot.rotation.set(0.08, 0.16, 0)
            modelRoot.traverse((child) => {
              const anyChild = child as unknown as { material?: Material | Material[]; frustumCulled?: boolean }
              anyChild.frustumCulled = false
              const mats = Array.isArray(anyChild.material) ? anyChild.material : anyChild.material ? [anyChild.material] : []
              mats.forEach((m) => {
                const mat = m as Material & {
                  transparent?: boolean
                  opacity?: number
                  roughness?: number
                  metalness?: number
                  envMapIntensity?: number
                  emissive?: Color
                  emissiveIntensity?: number
                  color?: Color
                }
                // Preserve source GLB look: keep original color/material response.
                if (typeof mat.envMapIntensity === 'number') mat.envMapIntensity = Math.max(0.9, mat.envMapIntensity)
                if (mat.transparent && typeof mat.opacity === 'number') mat.opacity = Math.min(1, mat.opacity)
              })
            })
            holeMesh.visible = false
            disk.visible = false
            topArc.visible = false
            bottomArc.visible = false
            einsteinRing.visible = false
            orbit.visible = false
            sceneMode = 'model'
            rig.add(modelRoot)
            modelLoaded = true
          },
          undefined,
          () => {
            modelRoot = null
            modelLoaded = false
            sceneMode = 'model'
            holeMesh.visible = false
            disk.visible = false
            topArc.visible = false
            bottomArc.visible = false
            einsteinRing.visible = false
            orbit.visible = false
          },
        )
      } catch {
        modelRoot = null
        modelLoaded = false
        sceneMode = 'model'
        holeMesh.visible = false
        disk.visible = false
        topArc.visible = false
        bottomArc.visible = false
        einsteinRing.visible = false
        orbit.visible = false
      }
    }
    void loadModel()

    const animate = () => {
      raf = window.requestAnimationFrame(animate)
      const time = performance.now() * 0.001

      if (!isReducedMotion) {
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.065
      } else {
        scrollProgress = targetScrollProgress
      }

      const pScaled = scrollProgress * motionIntensity * presetFactor
      const heroProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, window.innerHeight * 0.92)))
      const holeZoom = Math.pow(pScaled, 1.35)
      // 3-phase scroll staging: distant -> approach -> recede for readability
      const phaseA = Math.min(1, pScaled / 0.2)
      const phaseB = Math.min(1, Math.max(0, (pScaled - 0.2) / 0.35))
      const phaseC = Math.min(1, Math.max(0, (pScaled - 0.55) / 0.45))
      // Peak emphasis around hero -> work transition so “suction” reads strongly.
      const transitionCenter = 0.38
      const transitionWidth = 0.2
      const tDelta = Math.abs(pScaled - transitionCenter)
      const transitionWindow = Math.max(0, 1 - tDelta / transitionWidth)
      const suctionBoost = transitionWindow * transitionWindow
      const isHomeRoute = (window.location.pathname.replace(/\/+$/, '') || '/') === '/'
      const pagePresence = isHomeRoute ? 1 : 0
      const heroPresence = Math.max(0.02, (1 - heroProgress * 0.96) * pagePresence)
      rig.visible = isHomeRoute

      const drift = Math.sin(time * 0.22) * (isReducedMotion ? 0.02 : 0.12)
      camera.position.z = cameraBase.z - phaseA * 0.9 - phaseB * 3.2 + phaseC * 1.4
      camera.position.y = cameraBase.y - phaseA * 0.1 - phaseB * 0.5 + phaseC * 0.28 + drift
      camera.position.x = cameraBase.x + phaseB * 0.46 - phaseC * 0.2
      renderer.toneMappingExposure = theme === 'light' ? 1.12 : 1.28
      key.intensity = modelLoaded ? (theme === 'light' ? 1.05 : 0.95) : 0.44
      hemi.intensity = modelLoaded ? (theme === 'light' ? 0.7 : 0.5) : 0.42
      rim.intensity = modelLoaded ? (theme === 'light' ? 0.1 : 0.18) : 0.08

      const themeBaseScale = modelLoaded ? (theme === 'light' ? 1.02 : 1.08) : theme === 'light' ? 1.1 : 1
      const phaseScale = sceneMode === 'model' ? (phaseA * 0.2 + phaseB * 0.34 - phaseC * 0.12) * heroPresence : holeZoom * 0.92
      rig.scale.setScalar(themeBaseScale + phaseScale)
      const variantOffsetX =
        sceneVariant === 'apps' ? 0.26 : sceneVariant === 'commerce' ? -0.2 : sceneVariant === 'immersive' ? 0.1 : 0
      const variantOffsetY = sceneVariant === 'apps' ? 0.05 : sceneVariant === 'commerce' ? -0.03 : sceneVariant === 'immersive' ? 0.08 : 0
      const baseX = modelLoaded ? (theme === 'light' ? 0.42 : 0.24) : theme === 'light' ? 0.68 : 0.2
      const baseY = modelLoaded ? 0.08 : theme === 'light' ? 0.11 : 0.08
      rig.position.x = baseX + variantOffsetX - phaseB * 0.46 + phaseC * 0.18
      rig.position.y = baseY + variantOffsetY - phaseA * 0.04 - phaseB * 0.22 + phaseC * 0.1
      if (modelRoot) {
        modelRoot.rotation.y += isReducedMotion ? 0.00045 : 0.0012
        modelRoot.rotation.x = 0.08 + Math.sin(time * 0.18) * 0.015
      }
      const targetVariantRotation =
        sceneVariant === 'apps'
          ? 0.12
          : sceneVariant === 'commerce'
            ? -0.1
            : sceneVariant === 'immersive'
              ? 0.2
              : 0
      rig.rotation.z += (targetVariantRotation - rig.rotation.z) * 0.03
      camera.lookAt(rig.position)

      holeMaterial.color.lerp(targetValues.coreColor, 0.045)
      orbitMaterial.color.lerp(targetValues.ringColor, 0.045)
      ;(stars.material as PointsMaterial).color.lerp(targetValues.particleColor, 0.04)
      holeMaterial.opacity += (targetValues.coreOpacity * heroPresence - holeMaterial.opacity) * 0.04
      const boostedDiskOpacity = Math.min(0.9, targetValues.diskOpacity + phaseB * (theme === 'light' ? 0.18 : 0.2))
      diskMaterial.opacity += (boostedDiskOpacity * heroPresence - diskMaterial.opacity) * 0.04
      orbitMaterial.opacity += (targetValues.ringOpacity * heroPresence - orbitMaterial.opacity) * 0.04
      ;(stars.material as PointsMaterial).opacity +=
        (Math.max(0.02, targetValues.particleOpacity * (isHomeRoute ? 1 : 0.16)) - (stars.material as PointsMaterial).opacity) * 0.05

      holeMaterial.metalness += (targetValues.metalness - holeMaterial.metalness) * 0.03
      holeMaterial.roughness += (targetValues.roughness - holeMaterial.roughness) * 0.03
      orbitMaterial.metalness += (targetValues.metalness - orbitMaterial.metalness) * 0.03
      orbitMaterial.roughness += (targetValues.roughness - orbitMaterial.roughness) * 0.03

      const coreFloor = modelLoaded ? (theme === 'light' ? 0.22 : 0.56) * heroPresence : 0
      const diskFloor = modelLoaded ? (theme === 'light' ? 0.08 : 0.2) * heroPresence : 0
      if (holeMaterial.opacity < coreFloor) holeMaterial.opacity = coreFloor
      if (diskMaterial.opacity < diskFloor) diskMaterial.opacity = diskFloor

      const bloomPulse = theme === 'light' ? 0.72 : 0.62
      const glowStrength = (0.14 + Math.sin(time * 0.6) * 0.03) * bloomPulse
      const g = targetValues.glowColor
      if (theme === 'light') {
        const lightVariantTintBoost = sceneVariant === 'apps' ? 0.08 : sceneVariant === 'commerce' ? 0.03 : sceneVariant === 'immersive' ? 0.1 : 0.05
        // In eclipse mode, bias the glow toward silver-white so it reads as lensing,
        // then keep lime as a restrained accent.
        diskMaterial.color.setRGB(
          Math.min(1, 0.58 + g.r * glowStrength * (0.32 + lightVariantTintBoost)),
          Math.min(1, 0.58 + g.g * glowStrength * (0.28 + lightVariantTintBoost)),
          Math.min(1, 0.6 + g.b * glowStrength * 0.22),
        )
      } else {
        const darkVariantTintBoost = sceneVariant === 'apps' ? 0.1 : sceneVariant === 'commerce' ? 0.04 : sceneVariant === 'immersive' ? 0.14 : 0.08
        // Dark mode: keep lime as restrained accent; bias toward warm-white accretion light.
        diskMaterial.color.setRGB(
          Math.min(1, 0.22 + g.r * glowStrength * (0.2 + darkVariantTintBoost * 0.2)),
          Math.min(1, 0.23 + g.g * glowStrength * (0.24 + darkVariantTintBoost)),
          Math.min(1, 0.24 + g.b * glowStrength * 0.2),
        )
      }
      const arcTint = theme === 'light' ? new Color('#c8d0db') : new Color('#f4f8ff')
      ;(topArc.material as MeshBasicMaterial).color.lerp(arcTint, 0.035)
      ;(bottomArc.material as MeshBasicMaterial).color.lerp(arcTint, 0.035)
      ;(einsteinRing.material as MeshBasicMaterial).color.lerp(theme === 'light' ? new Color('#b8c1cf') : new Color('#eaf3ff'), 0.04)
      ;(topArc.material as MeshBasicMaterial).opacity +=
        ((theme === 'light' ? 0.2 : 0.26) * heroPresence - (topArc.material as MeshBasicMaterial).opacity) * 0.04
      ;(bottomArc.material as MeshBasicMaterial).opacity +=
        ((theme === 'light' ? 0.14 : 0.19) * heroPresence - (bottomArc.material as MeshBasicMaterial).opacity) * 0.04
      ;(einsteinRing.material as MeshBasicMaterial).opacity +=
        ((theme === 'light' ? 0.24 : 0.4) * heroPresence - (einsteinRing.material as MeshBasicMaterial).opacity) * 0.04

      const starPositions = starGeometry.attributes.position as BufferAttribute
      for (let i = 0; i < starCount; i += 1) {
        const i3 = i * 3
        const bx = basePositions[i3] as number
        const by = basePositions[i3 + 1] as number
        const z = starPositions.array[i3 + 2] as number
        let nextZ = z + (isReducedMotion ? 0.005 : 0.012 + phaseB * 0.035)
        if (nextZ > 2) nextZ = -60
        starPositions.array[i3 + 2] = nextZ

        // Gravitational lensing distortion near black hole center
        const hx = rig.position.x * 6.2
        const hy = rig.position.y * 5.6
        const dx = bx - hx
        const dy = by - hy
        const d2 = dx * dx + dy * dy + 12
        const lens = Math.min(1.4, (theme === 'light' ? 46 : 72) / d2) * (0.2 + phaseB * 0.95)
        starPositions.array[i3] = bx + dx * lens
        starPositions.array[i3 + 1] = by + dy * lens
      }
      starPositions.needsUpdate = true

      // Infall update: spiral + sink toward singularity with scroll-linked pull.
      const infallAttr = infallGeometry.attributes.position as BufferAttribute
      const singularityX = rig.position.x * 6.1
      const singularityY = rig.position.y * 5.4
      const pull = (0.0012 + phaseA * 0.0024 + phaseB * 0.01 + suctionBoost * 0.011) * presetFactor
      const swirl = (0.0016 + phaseB * 0.004 + suctionBoost * 0.0035) * (0.85 + presetFactor * 0.15)
      for (let i = 0; i < infallCount; i += 1) {
        const i3 = i * 3
        const i4 = i * 4
        const seedRadius = infallSeed[i4] as number
        const seedAngle = infallSeed[i4 + 1] as number
        const seedDrift = infallSeed[i4 + 2] as number
        const seedDepth = infallSeed[i4 + 3] as number

        let x = infallAttr.array[i3] as number
        let y = infallAttr.array[i3 + 1] as number
        let z = infallAttr.array[i3 + 2] as number

        const dx = singularityX - x
        const dy = singularityY - y
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001
        const inv = 1 / dist
        const tangentX = -dy * inv
        const tangentY = dx * inv

        x += dx * pull + tangentX * swirl * (1 + seedDrift * 0.35)
        y += dy * pull + tangentY * swirl * (1 - seedDrift * 0.2)
        z += 0.008 + phaseB * 0.025 + suctionBoost * 0.02

        // Re-seed once swallowed near core / when passing camera.
        if (dist < (theme === 'light' ? 2.3 : 2.8) || z > 2) {
          const t = time * (0.12 + (i % 7) * 0.003)
          const a = seedAngle + t + (i % 13) * 0.17
          const r = seedRadius * (0.88 + ((i % 11) * 0.013))
          x = singularityX + Math.cos(a) * r
          y = singularityY + Math.sin(a) * r * 0.56
          z = seedDepth
        }

        infallAttr.array[i3] = x
        infallAttr.array[i3 + 1] = y
        infallAttr.array[i3 + 2] = z
      }
      infallAttr.needsUpdate = true
      infallMaterial.opacity +=
        (((theme === 'light' ? 0.14 : 0.26) +
          phaseB * (theme === 'light' ? 0.14 : 0.18) +
          suctionBoost * (theme === 'light' ? 0.08 : 0.12)) -
          infallMaterial.opacity) *
        0.05
      if (!isHomeRoute) infallMaterial.opacity *= 0.6
      infallMaterial.color.lerp(theme === 'light' ? new Color('#a9b88f') : new Color('#d9ff4e'), 0.05)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('vynho:bg-scene-variant', onVariantChange as EventListener)
      mutationObserver.disconnect()
      window.cancelAnimationFrame(raf)

      starGeometry.dispose()
      ;(stars.material as PointsMaterial).dispose()
      infallGeometry.dispose()
      infallMaterial.dispose()
      orbit.geometry.dispose()
      orbitMaterial.dispose()
      topArc.geometry.dispose()
      ;(topArc.material as MeshBasicMaterial).dispose()
      bottomArc.geometry.dispose()
      ;(bottomArc.material as MeshBasicMaterial).dispose()
      einsteinRing.geometry.dispose()
      ;(einsteinRing.material as MeshBasicMaterial).dispose()
      disk.geometry.dispose()
      diskMaterial.dispose()
      holeGeometry.dispose()
      holeMaterial.dispose()
      diskTexture?.dispose()
      if (modelRoot) {
        disposeObject3D(modelRoot)
        rig.remove(modelRoot)
      }
      renderer.dispose()
      renderer.domElement.remove()
      rendererRef.current = null
    }
  }, [isReducedMotion])

  return (
    <div className="site-bg-scene" aria-hidden="true">
      <div ref={hostRef} className="site-bg-canvas-host" />
      {fallback ? <div className="site-bg-fallback" /> : null}
      <div className="site-bg-readability-overlay" />
    </div>
  )
}
