import { Reveal } from '@/components/motion/Reveal'

const groups: { label: string; clients: string[] }[] = [
  { label: 'Technology', clients: ['NOVA', 'FLUX', 'AXON', 'CIRCUIT', 'NEXA'] },
  { label: 'Finance', clients: ['LEDGERY', 'MONO', 'PAYLINE', 'VAULTIQ'] },
  { label: 'Consumer', clients: ['AURA', 'KIVO', 'LUNAR', 'MODA'] },
  { label: 'Healthcare', clients: ['VITAL', 'CAREOS', 'MEDIQ'] },
  { label: 'Media', clients: ['FRAME', 'CASTR', 'STAGE'] },
  { label: 'Startups', clients: ['SEEDX', 'ATLAS', 'ORBIT'] },
]

export function ClientsSection() {
  return (
    <section className="vwk-section vwk-clients" id="clients">
      <div className="container">
        <Reveal as="h2" className="vwk-section-title vwk-center" delayMs={70}>
          CLIENTS
        </Reveal>
        <Reveal as="p" className="vwk-section-copy vwk-center-copy" delayMs={120}>
          Trusted by startups, growth companies, and enterprise teams building digital products with ambition.
        </Reveal>

        <div className="vwk-client-groups">
          {groups.map((group, index) => (
            <Reveal key={group.label} className="vwk-client-row" delayMs={index * 70}>
              <p>{group.label}</p>
              <div>
                {group.clients.map((client) => (
                  <span key={client}>{client}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
