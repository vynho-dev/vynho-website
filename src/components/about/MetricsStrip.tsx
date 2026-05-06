import { Reveal } from '@/components/motion/Reveal'

const metrics = [
  { value: '11+', label: 'years in digital design & development' },
  { value: '20+', label: 'inhouse experts' },
  { value: '150+', label: 'projects delivered' },
  { value: '3', label: 'continents covered' },
]

export function MetricsStrip() {
  return (
    <section className="vabt-section" id="metrics">
      <div className="container vabt-metrics-grid">
        {metrics.map((item, index) => (
          <Reveal key={item.value} className={`vabt-metric-card vabt-metric-${index + 1}`} delayMs={index * 80}>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
