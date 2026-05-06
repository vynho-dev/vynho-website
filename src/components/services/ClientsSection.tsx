import { Reveal } from '@/components/motion/Reveal'

const groups = [
  { name: 'Digital Products', clients: ['NOVA', 'FLUX', 'ATLAS', 'ORBIT', 'SIGNAL'] },
  { name: 'Commerce', clients: ['VANTA', 'MODA', 'LUNAR', 'KIVO'] },
  { name: 'Technology', clients: ['AXON', 'NEXA', 'CIRCUIT', 'LEDGERY', 'MONO'] },
  { name: 'Media', clients: ['FRAME', 'CASTR', 'STAGE', 'AURA'] },
  { name: 'Startups', clients: ['SEEDX', 'PAYLINE', 'VITAL', 'CAREOS'] },
]

export function ClientsSection() {
  return (
    <section className="vsv-section" id="clients">
      <div className="container">
        <p className="vsv-watermark">CLIENTS</p>
        <h2 className="vsv-section-title vsv-center">CLIENTS</h2>
        <p className="vsv-section-copy vsv-center-copy">
          Trusted by founders, product teams, and enterprise leaders building ambitious digital systems.
        </p>
        <div className="vsv-client-groups">
          {groups.map((group, index) => (
            <Reveal key={group.name} className="vsv-client-row" delayMs={index * 60}>
              <p>{group.name}</p>
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
