import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface LegalPageProps {
  title: string
  body: string[]
}

export function LegalPage({ title, body }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="vlegal-page">
        <section className="container vlegal-shell">
          <h1>{title}</h1>
          {body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

