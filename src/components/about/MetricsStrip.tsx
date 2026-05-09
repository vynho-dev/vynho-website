import { MetricStrip } from '@/components/patterns/MetricStrip'
import { aboutMetricsContent } from '@/content/sections'

export function MetricsStrip() {
  return (
    <section className="vabt-section" id="metrics">
      <div className="container">
        <MetricStrip
          items={aboutMetricsContent}
          gridClassName="vabt-metrics-grid"
          itemClassName={(index) => `vabt-metric-card vabt-metric-${index + 1}`}
        />
      </div>
    </section>
  )
}
