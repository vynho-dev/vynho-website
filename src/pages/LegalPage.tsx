import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/legal.css'

interface LegalPageProps {
  title: string
  body: string[]
}

export function LegalPage({ title, body }: LegalPageProps) {
  return (
    <>
      <a className="skip-link" href="#top">Skip to content</a>
      <Header />
      <main className="vlegal-page" id="top">
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
