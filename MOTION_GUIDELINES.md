# Vynho Motion Guidelines

## Motion Tokens
- Reveal duration: `560ms`
- Stagger range: `60ms` to `120ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Reveal offset: `22px` default (customizable per block)
- Parallax intensity: `8px` to `16px` depending on section importance

## Reusable Primitives
- `Reveal`:
  - File: `src/components/motion/Reveal.tsx`
  - Behavior: fade + vertical translate in-view reveal
  - Controls: `delayMs`, `distance`, `once`
- `ParallaxMedia`:
  - File: `src/components/motion/ParallaxMedia.tsx`
  - Behavior: subtle scroll-based vertical shift for media containers
  - Controls: `intensity`
- Reduced-motion hook:
  - File: `src/lib/motion.ts`
  - Behavior: disables transform/parallax when user prefers reduced motion

## Pattern Usage
- Home:
  - Hero headline/chips/CTA staged reveal
  - Hero media parallax shell
  - Trust strip stagger
  - Services/work cards stagger
- About:
  - Mission reveal
  - Founder split reveal (portrait + copy + capability cards)
  - Values poster grid stagger
  - Studio gallery reveal + parallax shell
- Services:
  - Service cards stagger
  - Process steps progressive reveal
- Work:
  - Case cards reveal
  - Studio/gallery media parallax
- Careers:
  - Capability cards + open roles reveal
  - CTA and contact panel emphasis
- Contact:
  - CTA reveal
  - Contact cards reveal with hover lift

## Accessibility
- `prefers-reduced-motion: reduce`:
  - Transforms disabled
  - Animations/transition durations collapsed to near-instant
  - Parallax disabled

## Performance Notes
- Uses `IntersectionObserver` and `requestAnimationFrame`.
- Hero media preloaded with posters for stability.
- Non-hero visual media uses `loading="lazy"` where applicable.
