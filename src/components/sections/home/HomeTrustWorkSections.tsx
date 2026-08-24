import { useEffect, useRef } from 'react'
import { CharReveal } from '@/components/motion/CharReveal'
import { Reveal } from '@/components/motion/Reveal'
import { WaveRevealGroup, WaveRevealItem } from '@/components/motion/WaveReveal'
import { type HomeWorkCardContent } from '@/content/sections'
import { useInView } from '@/lib/motion'

const trustSignals = [
  { number: '01', title: 'Founder-led', copy: 'Senior oversight from first conversation to final release.' },
  { number: '02', title: 'One integrated team', copy: 'Strategy, design, and engineering move together.' },
  { number: '03', title: 'Built to last', copy: 'Clear systems, measured performance, and honest trade-offs.' },
] as const

export function HomeTrustSection() {
  return (
    <section className="vh-trust">
      <WaveRevealGroup
        as="div"
        className="container vh-trust-lines"
        staggerMs={220}
        distance={28}
        depthStep={26}
        direction="up"
        rootMargin="0px 0px -18% 0px"
        amount={0.25}
        once={false}
      >
        {trustSignals.map((signal, index) => (
          <WaveRevealItem key={signal.title} className="vh-trust-line" index={index}>
            <article className="vh-trust-card">
              <span>{signal.number}</span>
              <strong>{signal.title}</strong>
              <p>{signal.copy}</p>
            </article>
          </WaveRevealItem>
        ))}
      </WaveRevealGroup>
    </section>
  )
}

// ─── work card ────────────────────────────────────────────────────────────────

type WorkCardProps = {
  card: HomeWorkCardContent
  index: number
  mediaTier: 'high' | 'balanced' | 'lite'
  onCardClick: (id: string) => void
  onCardView: (id: string, media: 'video' | 'image') => void
}

function WorkCard({ card, index, mediaTier, onCardClick, onCardView }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: cardRef, visible, reducedMotion } = useInView({ once: false, threshold: 0.18 })
  const isVideo = /\.(mp4|webm|mov)$/i.test(card.image)

  useEffect(() => {
    if (!isVideo || !videoRef.current) return
    if (visible && !reducedMotion) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }, [isVideo, reducedMotion, visible])

  return (
    <div
      ref={(node) => { cardRef.current = node }}
      className={visible || reducedMotion ? 'vh-work-card is-visible' : 'vh-work-card'}
      data-project={card.id}
    >
      <a
        className="vh-work-card-hit"
        href="/work"
        aria-label={`View work: ${card.title}`}
        onClick={() => onCardClick(card.id)}
      />

      <div className="vh-work-card-media-wrap">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              className="vh-work-card-video"
              src={card.image}
              muted
              playsInline
              loop
              preload="metadata"
              aria-label={card.title}
              onLoadedData={() => onCardView(card.id, 'video')}
            />
            <div className="vh-work-video-dot" aria-hidden="true" />
          </>
        ) : (
          <img
            className="vh-work-card-img"
            src={card.image}
            alt={card.title}
            loading={index < 2 && mediaTier === 'high' ? 'eager' : 'lazy'}
            fetchPriority={index === 0 && mediaTier === 'high' ? 'high' : 'auto'}
            onLoad={() => onCardView(card.id, 'image')}
          />
        )}
      </div>

      <div className="vh-work-effects" aria-hidden="true">
        <i />
        <i />
        <i />
        <span />
      </div>

      <div className="vh-work-overlay">
        <span className="vh-work-index">0{index + 1}</span>
        <div>
          <p className="vh-work-overlay-title">{card.title}</p>
          <span className="vh-work-overlay-tag">{card.tag}</span>
        </div>
        <span className="vh-work-arrow" aria-hidden="true">↗</span>
      </div>
    </div>
  )
}

// ─── work section ─────────────────────────────────────────────────────────────

type HomeWorkSectionProps = {
  workCards: HomeWorkCardContent[]
  mediaTier: 'high' | 'balanced' | 'lite'
  onWorkCardClick: (cardId: string) => void
  onWorkCardView: (cardId: string, media: 'video' | 'image') => void
}

export function HomeWorkSection({
  workCards,
  mediaTier,
  onWorkCardClick,
  onWorkCardView,
}: HomeWorkSectionProps) {
  return (
    <section id="work" className="vh-section vh-work-section">
      <div className="container vh-work-header">
        <CharReveal as="h2" className="vh-section-title vh-center" delayMs={80} staggerMs={42}>
          WORK
        </CharReveal>
        <Reveal as="p" className="vh-section-copy vh-center-copy vh-work-copy" delayMs={280}>
          Focused craft, technical reliability, and measurable outcomes across premium web,
          app, and commerce systems.
        </Reveal>
        <Reveal as="div" className="vh-work-view-all-wrap vh-work-view-all-wrap--center" delayMs={400}>
          <a href="/work" className="vh-work-view-all" aria-label="View all work">
            View all work
            <span className="vh-work-view-all-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      <div className="container vh-work-stack">
        {workCards.map((card, i) => (
          <WorkCard
            key={card.id}
            card={card}
            index={i}
            mediaTier={mediaTier}
            onCardClick={onWorkCardClick}
            onCardView={onWorkCardView}
          />
        ))}
      </div>
    </section>
  )
}
