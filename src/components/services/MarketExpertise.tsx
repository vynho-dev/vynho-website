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
      <SectionHeader
        title="MARKET EXPERTISE"
        titleClassName="vsv-section-title"
        copy="We work across industries where design, performance, and technical reliability directly affect customer trust and growth."
        copyClassName="vsv-section-copy"
      />
      <div className="vsv-market-grid">
        {markets.map((market, index) => (
          <Reveal key={market} className="vsv-market-card" delayMs={index * 70}>
            {market}
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
