import { useEffect, useMemo, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { getMediaTier } from '@/lib/media'
import { SectionCTA } from '@/components/patterns/SectionCTA'
import {
  homeBuildCardsContent,
  homeEdgeCardsContent,
  homeEngagementCardsContent,
  homeFaqContent,
  homeFinalCtaContent,
  homeServiceItemsContent,
  homeStudioMetricsContent,
  homeWorkCardsContent,
} from '@/content/sections'
import {
  HomeBuildSection,
  HomeEdgeSection,
  HomeFaqSection,
  HomeHeroSection,
  HomeModelsSection,
  HomeServicesSection,
  HomeStudioSection,
  HomeTrustSection,
  HomeWorkSection,
} from '@/components/sections/home/HomeSections'

export function Home() {
  const [openService, setOpenService] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeBuildCard, setActiveBuildCard] = useState(homeBuildCardsContent[0]?.id ?? '01')
  const buildSectionRef = useRef<HTMLDivElement | null>(null)
  const mediaTier = useMemo(() => getMediaTier(), [])
  const canAutoplayMedia = mediaTier === 'high'

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      document.documentElement.style.setProperty('--vh-scroll-progress', progress.toFixed(4))

      const node = buildSectionRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const start = window.innerHeight * 0.75
      const end = window.innerHeight * 0.35
      const denominator = Math.max(1, rect.height + (start - end))
      const localProgress = Math.min(1, Math.max(0, (start - rect.top) / denominator))
      const raw = Math.floor(localProgress * homeBuildCardsContent.length)
      const index = Math.min(homeBuildCardsContent.length - 1, Math.max(0, raw))
      const nextId = homeBuildCardsContent[index]?.id
      if (!nextId) return
      setActiveBuildCard((current) => (current === nextId ? current : nextId))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['work', 'build', 'services', 'models', 'edge', 'studio', 'faq', 'contact']
    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          if (!id || seen.has(id)) return
          seen.add(id)
          trackEvent('section_view', { section_id: id })
        })
      },
      { threshold: 0.45 },
    )

    for (const id of sectionIds) {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <main className="vh-home" id="top">
      <HomeHeroSection onExploreClick={() => trackEvent('cta_click', { cta: 'hero_explore_capabilities' })} />
      <HomeTrustSection />
      <HomeWorkSection
        workCards={homeWorkCardsContent}
        mediaTier={mediaTier}
        canAutoplayMedia={canAutoplayMedia}
        onWorkCardClick={(cardId) => trackEvent('work_card_click', { card_id: cardId })}
        onWorkCardView={(cardId, media) => trackEvent('work_card_view', { card_id: cardId, media })}
      />
      <div ref={buildSectionRef}>
        <HomeBuildSection
          buildCards={homeBuildCardsContent}
          activeBuildCard={activeBuildCard}
          setActiveBuildCard={setActiveBuildCard}
        />
      </div>
      <HomeServicesSection
        serviceItems={homeServiceItemsContent}
        openService={openService}
        setOpenService={setOpenService}
        onExploreServices={() => trackEvent('cta_click', { cta: 'services_explore' })}
      />
      <HomeModelsSection cards={homeEngagementCardsContent} />
      <HomeEdgeSection cards={homeEdgeCardsContent} />
      <HomeStudioSection
        metrics={homeStudioMetricsContent}
        onMeetStudio={() => trackEvent('cta_click', { cta: 'studio_meet_team' })}
      />
      <HomeFaqSection faqs={homeFaqContent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <SectionCTA
        sectionClassName="vh-final-cta"
        containerClassName="container vh-final-shell"
        eyebrow={homeFinalCtaContent.eyebrow}
        title={homeFinalCtaContent.title}
        description={homeFinalCtaContent.description}
        source={homeFinalCtaContent.source}
        primaryLabel={homeFinalCtaContent.primaryLabel}
        eyebrowClassName="vh-final-eyebrow"
        titleClassName="vh-section-title"
        descriptionClassName="vh-section-copy vh-center-copy"
        actionsClassName="vh-final-actions"
      />
    </main>
  )
}
