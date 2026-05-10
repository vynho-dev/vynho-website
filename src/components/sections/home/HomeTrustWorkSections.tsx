import { Reveal } from '@/components/motion/Reveal'
import { MediaCard } from '@/components/patterns/MediaCard'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { type HomeWorkCardContent } from '@/content/sections'

function TrustIcon({ type }: { type: 'rating' | 'award' | 'global' }) {
  if (type === 'award') {
    return <span className="vh-trust-mark vh-trust-mark-award">awwwards.</span>
  }

  if (type === 'global') {
    return <span className="vh-trust-mark vh-trust-mark-web">W</span>
  }

  return <span className="vh-trust-mark vh-trust-mark-clutch">C</span>
}

export function HomeTrustSection({
  trustCards,
}: {
  trustCards: ReadonlyArray<{ label: string; icon: 'rating' | 'award' | 'global' }>
}) {
  return (
    <section className="vh-trust">
      <div className="container vh-trust-grid">
        {trustCards.map((card, index) => (
          <Reveal key={card.label} className="vh-trust-card" delayMs={index * 70}>
            <div id={`about-card-${index + 1}`} className="vh-trust-card-shell">
              <span><TrustIcon type={card.icon} /></span>
              <p>{card.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function HomeWorkSection({
  workCards,
  mediaTier,
  canAutoplayMedia,
  onWorkCardClick,
  onWorkCardView,
}: {
  workCards: HomeWorkCardContent[]
  mediaTier: 'high' | 'balanced' | 'lite'
  canAutoplayMedia: boolean
  onWorkCardClick: (cardId: string) => void
  onWorkCardView: (cardId: string, media: 'video' | 'image') => void
}) {
  return (
    <section className="vh-section" id="work">
      <div className="container">
        <SectionHeader
          title="WORK"
          titleClassName="vh-section-title vh-center"
          copy="Award-winning craft, technical reliability, and measurable outcomes across premium web, app, and commerce systems."
          copyClassName="vh-section-copy vh-center-copy"
          copyDelayMs={140}
        />
        <div className="vh-work-grid">
          {workCards.map((card, index) => (
            <Reveal key={card.title} className="vh-work-card" delayMs={index * 50}>
              <a
                className="vh-work-card-hit"
                href="/work"
                aria-label={`Open work page for ${card.title}`}
                onClick={() => onWorkCardClick(card.id)}
              />
              <MediaCard
                className="vh-work-card-media"
                mediaClassName={card.image.match(/\.(mp4|webm|mov)$/i) ? 'vh-media-video' : 'vh-media-image'}
                image={card.image}
                imageAlt={card.title}
                videoLabel={card.title}
                imageLoading={index < 2 && mediaTier === 'high' ? 'eager' : 'lazy'}
                imageFetchPriority={index === 0 && mediaTier === 'high' ? 'high' : 'auto'}
                videoAutoPlay={canAutoplayMedia}
                videoLoop={canAutoplayMedia}
                videoPreload={canAutoplayMedia ? 'metadata' : 'none'}
                onVideoLoadedData={() => onWorkCardView(card.id, 'video')}
                onImageLoad={() => onWorkCardView(card.id, 'image')}
              />
              <div className="vh-work-overlay">
                <p>{card.title}</p>
                <div>
                  <span>{card.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
