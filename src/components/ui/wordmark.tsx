interface WordmarkProps {
  variant?:
    | 'primary'
    | 'black'
    | 'white'
    | 'monochrome'
    | 'white-alt'
    | 'black-transparent'
    | 'white-transparent'
  className?: string
  alt?: string
}

const variantToFile: Record<NonNullable<WordmarkProps['variant']>, string> = {
  primary: 'wordmark-primary.svg',
  black: 'wordmark-black.svg',
  white: 'wordmark-white.svg',
  monochrome: 'wordmark-monochrome.svg',
  'white-alt': 'wordmark-white-alt.svg',
  'black-transparent': 'wordmark-black-transparent.svg',
  'white-transparent': 'wordmark-white-transparent.svg',
}

export function Wordmark({ variant = 'black', className, alt = 'Vynho' }: WordmarkProps) {
  return (
    <img
      src={`/assets/brand/${variantToFile[variant]}`}
      alt={alt}
      className={className ?? 'wordmark-image'}
    />
  )
}
