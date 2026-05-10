import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { AccordionItem } from '@/components/patterns/AccordionItem'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { useReducedMotionPreference } from '@/lib/motion'
import { type HomeFaqItemContent } from '@/content/sections'

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const hasFired = useRef(false)
  const reduceMotion = useReducedMotionPreference()
  const parsed = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = parsed ? parseFloat(parsed[1]) : null
  const suffix = parsed ? parsed[2] : ''
  const [display, setDisplay] = useState(`0${suffix}`)

  useEffect(() => {
    const node = ref.current
    if (!node || target === null) return

    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasFired.current) return
        hasFired.current = true
        observer.unobserve(node)
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const elapsed = now - start
          const t = Math.min(1, elapsed / duration)
          const eased = 1 - (1 - t) ** 3
          const current = Math.round(target * eased)
          setDisplay(`${current}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, suffix, target, value])

  return <strong ref={ref}>{display}</strong>
}

export function HomeStudioSection({
  metrics,
  onMeetStudio,
}: {
  metrics: { value: string; label: string }[]
  onMeetStudio: () => void
}) {
  return (
    <section className="vh-section vh-studio" id="studio">
      <div className="container vh-studio-shell">
        <SectionHeader
          title="SENIOR-LED STUDIO"
          titleClassName="vh-section-title"
          copy="A small, senior team of designers, engineers, strategists, and creative technologists — close to the work from kickoff to launch."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-studio-metrics">
          {metrics.map((item, index) => (
            <Reveal key={`${item.value}-${item.label}`} className="vh-studio-metric" delayMs={index * 80}>
              <AnimatedCounter value={item.value} />
              <p>{item.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="vh-studio-cta" delayMs={250}>
          <Button asChild variant="outline" className="vh-dark-btn">
            <a href="/about" onClick={onMeetStudio}>Meet the Studio</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export function HomeFaqSection({
  faqs,
  openFaq,
  setOpenFaq,
}: {
  faqs: HomeFaqItemContent[]
  openFaq: number | null
  setOpenFaq: (next: number | null) => void
}) {
  return (
    <section className="vh-section" id="faq">
      <div className="container">
        <SectionHeader
          title="FAQ"
          titleClassName="vh-section-title vh-center"
          copy="Common questions from teams considering working with Vynho."
          copyClassName="vh-section-copy vh-center-copy"
        />
        <div className="vh-faq-list">
          {faqs.map((faq, index) => {
            const open = openFaq === index
            return (
              <Reveal key={faq.q} className={open ? 'vh-faq-item open' : 'vh-faq-item'} delayMs={index * 40}>
                <AccordionItem
                  idPrefix="vh-faq"
                  index={index}
                  open={open}
                  onToggle={() => setOpenFaq(open ? null : index)}
                  triggerClassName="vh-faq-trigger"
                  title={<span className="vh-faq-q">{faq.q}</span>}
                  trailing={
                    <span className="vh-faq-toggle" aria-hidden="true">
                      <span className="vh-faq-toggle-bar vh-faq-toggle-bar-v" />
                      <span className="vh-faq-toggle-bar vh-faq-toggle-bar-h" />
                    </span>
                  }
                  panelClassName="vh-faq-panel"
                  body={
                    <div className="vh-faq-body">
                      <div className="vh-faq-inner">
                        {faq.blocks.map((block, blockIndex) =>
                          block.type === 'p' ? (
                            <p key={`${faq.q}-p-${blockIndex}`}>{block.text}</p>
                          ) : (
                            <ul key={`${faq.q}-ul-${blockIndex}`}>
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ),
                        )}
                      </div>
                    </div>
                  }
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
