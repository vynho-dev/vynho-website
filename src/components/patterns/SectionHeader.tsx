import { Reveal } from '@/components/motion/Reveal'

type SectionHeaderProps = {
  title: string
  titleClassName: string
  copy?: string
  copyClassName?: string
  watermark?: string
  watermarkClassName?: string
  titleAs?: 'h1' | 'h2' | 'h3'
  titleDelayMs?: number
  copyDelayMs?: number
}

export function SectionHeader({
  title,
  titleClassName,
  copy,
  copyClassName,
  watermark,
  watermarkClassName,
  titleAs = 'h2',
  titleDelayMs = 80,
  copyDelayMs = 130,
}: SectionHeaderProps) {
  return (
    <>
      {watermark ? <p className={watermarkClassName}>{watermark}</p> : null}
      <Reveal as={titleAs} className={titleClassName} delayMs={titleDelayMs}>
        {title}
      </Reveal>
      {copy ? (
        <Reveal as="p" className={copyClassName} delayMs={copyDelayMs}>
          {copy}
        </Reveal>
      ) : null}
    </>
  )
}

