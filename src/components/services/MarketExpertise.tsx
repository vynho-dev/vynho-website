import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'

const markets = [
  'SaaS & B2B Platforms',
  'AI Products',
  'Fintech',
  'Premium Commerce',
  'Media & Entertainment',
  'Web3 & Emerging Tech',
]

export function MarketExpertise() {
  return (
    <SectionShell id="expertise" className="vsv-section">
      <Reveal as="p" className="vsv-expertise-eyebrow" delayMs={50}>
        Where craft meets context
      </Reveal>
      <SectionHeader
        title="EXPERTISE"
        titleClassName="vsv-section-title"
        copy="Deep product thinking, industry context, and senior execution for markets where customer trust depends on every detail."
        copyClassName="vsv-section-copy"
      />
      <div className="vsv-market-grid">
        {markets.map((market, index) => (
          <Reveal key={market} className="vsv-market-card" delayMs={index * 70}>
            <span aria-hidden="true">0{index + 1}</span>
            <strong>{market}</strong>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
