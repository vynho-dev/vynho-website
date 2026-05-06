import { Reveal } from '@/components/motion/Reveal'

const rows = [
  ['2026', 'Northstar Cloud', 'Site Experience of the Year', 'SaaS Website'],
  ['2026', 'LumaPay', 'Product Design Excellence', 'Fintech App'],
  ['2025', 'Asteria Labs', 'Developer Recognition', 'AI Website'],
  ['2025', 'Vanta Commerce', 'UX Commerce Award', 'E-commerce'],
  ['2024', 'Orbit Studio', 'Visual Innovation Award', 'Immersive Web'],
  ['2024', 'SignalDesk', 'Interface Design Award', 'Dashboard'],
]

export function AwardsSection() {
  return (
    <section className="vwk-section vwk-awards" id="awards">
      <div className="container">
        <p className="vwk-watermark">OUR AWARDS</p>
        <Reveal as="h2" className="vwk-section-title" delayMs={70}>
          OUR AWARDS
        </Reveal>
        <Reveal as="p" className="vwk-section-copy" delayMs={120}>
          Recognition for craft, performance, and digital execution across product, brand, and engineering.
        </Reveal>
        <div className="vwk-award-cards">
          <Reveal className="vwk-award-card vwk-award-card-lime" delayMs={180}>
            <strong>Independent Studio Awards</strong>
            <p>Site Experience of the Year</p>
            <span>2026</span>
          </Reveal>
          <Reveal className="vwk-award-card vwk-award-card-light" delayMs={240}>
            <strong>Digital Craft Index</strong>
            <p>Excellence in Product Design</p>
            <span>2025</span>
          </Reveal>
        </div>
        <div className="vwk-awards-table-wrap">
          <table className="vwk-awards-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Project</th>
                <th>Award</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((col) => (
                    <td key={col}>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
