import { Reveal } from '@/components/motion/Reveal'

type MetricItem = {
  value: string
  label: string
}

type MetricStripProps = {
  items: MetricItem[]
  gridClassName: string
  itemClassName: (index: number) => string
  valueTag?: 'strong' | 'span'
  delayStepMs?: number
}

export function MetricStrip({
  items,
  gridClassName,
  itemClassName,
  valueTag = 'strong',
  delayStepMs = 80,
}: MetricStripProps) {
  const ValueTag = valueTag

  return (
    <div className={gridClassName}>
      {items.map((item, index) => (
        <Reveal key={`${item.value}-${item.label}`} className={itemClassName(index)} delayMs={index * delayStepMs}>
          <ValueTag>{item.value}</ValueTag>
          <p>{item.label}</p>
        </Reveal>
      ))}
    </div>
  )
}

