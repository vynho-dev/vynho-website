import { Reveal } from '@/components/motion/Reveal'

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
    <section className="vsv-section" id="expertise">
      <div className="container">
        <h2 className="vsv-section-title">MARKET EXPERTISE</h2>
        <p className="vsv-section-copy">
          We work across industries where design, performance, and technical reliability directly affect customer
          trust and growth.
        </p>
        <div className="vsv-market-grid">
          {markets.map((market, index) => (
            <Reveal key={market} className="vsv-market-card" delayMs={index * 70}>
              {market}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
