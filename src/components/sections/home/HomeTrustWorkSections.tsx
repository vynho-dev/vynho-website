import { Reveal } from '@/components/motion/Reveal'
import { WaveRevealGroup, WaveRevealItem } from '@/components/motion/WaveReveal'
import { MediaCard } from '@/components/patterns/MediaCard'
import { SectionHeader } from '@/components/patterns/SectionHeader'
import { AwardBadge } from '@/components/ui/award-badge'
import { type HomeWorkCardContent } from '@/content/sections'

const trustAwards = [
  {
    logoSrc: '/assets/awards/clutch-logo.jpeg',
    brandLabel: 'CLUTCH',
    headline: 'Rated 5.0 on Clutch',
    badgeType: 'product-of-the-day' as const,
  },
  {
    logoSrc: '/assets/awards/awwwards-logo.svg',
    brandLabel: 'Awwwards.',
    headline: '10x awarded by Awwwards',
    badgeType: 'golden-kitty' as const,
  },
  {
    logoSrc: '/assets/awards/webaward-logo.svg',
    brandLabel: 'WEBAWARD',
    headline: 'Awarded by Webaward',
    badgeType: 'product-of-the-week' as const,
  },
] as const

export function HomeTrustSection() {
  return (
    <section className="vh-trust">
      <WaveRevealGroup
        as="div"
        className="container vh-trust-lines"
        staggerMs={220}
        distance={120}
        depthStep={26}
        direction="up"
        rootMargin="0px 0px -18% 0px"
        amount={0.25}
        once={false}
      >
        {trustAwards.map((award, index) => {
          return (
            <WaveRevealItem key={award.headline} className="vh-trust-line" index={index}>
              <div className="vh-trust-line-badge">
                <AwardBadge
                  type={award.badgeType}
                  logoSrc={award.logoSrc}
                  brandLabel={award.brandLabel}
                  headline={award.headline}
                  hidePlace
                  link="https://www.producthunt.com/golden-kitty-awards/hall-of-fame?year=2024#bootstrapped-small-teams-2"
                />
              </div>
            </WaveRevealItem>
          )
        })}
      </WaveRevealGroup>
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
