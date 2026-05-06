import { cn } from '@/lib/utils'

interface VMarkProps {
  variant?:
    | 'black'
    | 'white'
    | 'monochrome'
    | 'monochrome-white'
    | 'gradient-black'
    | 'gradient-white'
    | 'transparent-black'
    | 'transparent-white'
  className?: string
}

const variantToFile: Record<NonNullable<VMarkProps['variant']>, string> = {
  black: 'vmark-black.svg',
  white: 'vmark-white.svg',
  monochrome: 'vmark-monochrome.svg',
  'monochrome-white': 'vmark-monochrome-white.svg',
  'gradient-black': 'vmark-gradient-black.svg',
  'gradient-white': 'vmark-gradient-white.svg',
  'transparent-black': 'vmark-transparent-black.svg',
  'transparent-white': 'vmark-transparent-white.svg',
}

export function VMark({ variant = 'gradient-black', className }: VMarkProps) {
  return (
    <img src={`/assets/icons/${variantToFile[variant]}`} alt="Vynho v-mark" className={cn('vmark-image', className)} />
  )
}
