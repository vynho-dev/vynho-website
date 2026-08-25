import { useRef } from 'react'
import { CharReveal } from '@/components/motion/CharReveal'
import { Reveal } from '@/components/motion/Reveal'
import { WaveRevealGroup, WaveRevealItem } from '@/components/motion/WaveReveal'
import { type HomeWorkCardContent } from '@/content/sections'
import { useInView } from '@/lib/motion'

const trustSignals = [
  { label: 'Rated 5.0 by clients', icon: '★' },
  { label: 'Award-level craft', icon: '✦' },
  { label: 'Built for global teams', icon: '↗' },
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
        once
      >
        {trustSignals.map((signal, index) => (
          <WaveRevealItem key={signal.label} className="vh-trust-line" index={index}>
            <article className="vh-trust-card">
              <span className="vh-trust-icon" aria-hidden="true">{signal.icon}</span>
              <p>{signal.label}</p>
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
  const { ref: cardRef, visible, reducedMotion } = useInView({ once: true, threshold: 0.12 })
  const isVideo = /\.(mp4|webm|mov)$/i.test(card.image)

  const handleEnter = () => {
    if (isVideo && videoRef.current) videoRef.current.play().catch(() => {})
  }
  const handleLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      ref={(node) => { cardRef.current = node }}
      className={visible || reducedMotion ? 'vh-work-card is-visible' : 'vh-work-card'}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <a
        className="vh-work-card-hit"
        href="/work/"
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
              autoPlay
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

      <div className="vh-work-overlay">
        <p className="vh-work-overlay-title">{card.title}</p>
        <div className="vh-work-overlay-meta">
          <span className="vh-work-overlay-tag">{card.tag}</span>
          <span className="vh-work-overlay-view" aria-hidden="true">View ↗</span>
        </div>
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
          <a href="/work/" className="vh-work-view-all" aria-label="View all work">
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
