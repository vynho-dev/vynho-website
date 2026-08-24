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

  useEffect(() => {
    let frame = 0
    let previousY = window.scrollY

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const currentY = window.scrollY
        const heroProgress = Math.min(1, Math.max(0, currentY / Math.max(1, window.innerHeight)))
        document.documentElement.style.setProperty('--vh-hero-progress', heroProgress.toFixed(4))
        document.documentElement.dataset['homeScrolled'] = currentY > 80 ? 'true' : 'false'
        if (Math.abs(currentY - previousY) > 4) {
          document.documentElement.dataset['homeScrollDirection'] = currentY > previousY ? 'down' : 'up'
          previousY = currentY
        }

        const node = buildSectionRef.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const progress = Math.min(0.999, Math.max(0, (window.innerHeight * 0.7 - rect.top) / Math.max(1, rect.height)))
        const nextId = homeBuildCardsContent[Math.floor(progress * homeBuildCardsContent.length)]?.id
        if (nextId) setActiveBuildCard((current) => (current === nextId ? current : nextId))
      })
    }

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--vh-pointer-x', `${(event.clientX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty('--vh-pointer-y', `${(event.clientY / window.innerHeight) * 100}%`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) window.cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--vh-hero-progress')
      document.documentElement.style.removeProperty('--vh-pointer-x')
      document.documentElement.style.removeProperty('--vh-pointer-y')
      delete document.documentElement.dataset['homeScrolled']
      delete document.documentElement.dataset['homeScrollDirection']
    }
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
      <HomeFaqSection faqs={homeFaqContent.slice(0, 8)} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <SectionCTA
        sectionClassName="vh-final-cta"
        containerClassName="container vh-final-shell cta-shell"
        eyebrow={homeFinalCtaContent.eyebrow}
        title={homeFinalCtaContent.title}
        description={homeFinalCtaContent.description}
        source={homeFinalCtaContent.source}
        primaryLabel={homeFinalCtaContent.primaryLabel}
        eyebrowClassName="vh-final-eyebrow"
        titleClassName="vh-section-title cta-title"
        descriptionClassName="vh-section-copy vh-center-copy cta-copy"
        actionsClassName="vh-final-actions cta-actions"
      />
    </main>
  )
}
