import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { SectionShell } from '@/components/patterns/SectionShell'

const rows = [
  ['2026', 'Pallet Ross', 'Site Experience of the Year', 'SaaS Website'],
  ['2026', 'Chatif', 'Product Design Excellence', 'Fintech App'],
  ['2025', 'Nestery', 'UX Commerce Award', 'E-commerce'],
  ['2024', 'Orbit Studio', 'Visual Innovation Award', 'Immersive Web'],
  ['2024', 'Pasar Marketing', 'Interface Design Award', 'Dashboard'],
]

export function AwardsSection() {
  return (
    <SectionShell id="awards" className="vwk-section vwk-awards">
      <SectionHeader
        watermark="OUR AWARDS"
        watermarkClassName="vwk-watermark"
        title="OUR AWARDS"
        titleClassName="vwk-section-title"
        titleDelayMs={70}
        copy="Recognition for craft, performance, and digital execution across product, brand, and engineering."
        copyClassName="vwk-section-copy"
        copyDelayMs={120}
      />
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
    </SectionShell>
  )
}
