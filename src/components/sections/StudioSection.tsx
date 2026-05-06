import { studioGallery, studioPrinciples, studioVideos } from '@/content/site'
import { Reveal } from '@/components/motion/Reveal'
import { ParallaxMedia } from '@/components/motion/ParallaxMedia'

export function StudioSection() {
  return (
    <section className="home-section studio-section" id="studio">
      <div className="container studio-shell">
        <Reveal delayMs={80}>
          <ParallaxMedia className="studio-visual" intensity={8}>
            <div className="studio-media-grid">
              <video
                className="studio-video studio-video-dark-primary"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/images/about/studio-collab-01.jpg"
              >
                <source src={studioVideos.heroDarkPrimary} type="application/x-mpegURL" />
              </video>
              <video
                className="studio-video studio-video-dark-secondary"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/images/about/studio-collab-02.jpg"
              >
                <source src={studioVideos.heroDarkSecondary} type="application/x-mpegURL" />
              </video>
              <video
                className="studio-video studio-video-light"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/images/about/studio-collab-03.jpg"
              >
                <source src={studioVideos.heroLight} type="video/mp4" />
              </video>
              <img src={studioGallery[0]} alt="Vynho studio workflow" loading="lazy" />
              <img src={studioGallery[1]} alt="Vynho team collaboration" loading="lazy" />
              <img src={studioGallery[2]} alt="Vynho product planning" loading="lazy" />
              <img src={studioGallery[3]} alt="Vynho engineering execution" loading="lazy" />
              <img src={studioGallery[4]} alt="Vynho product mockup" loading="lazy" />
            </div>
          </ParallaxMedia>
        </Reveal>
        <div className="studio-copy">
          <Reveal delayMs={80}>
            <span className="label">Studio life</span>
          </Reveal>
          <Reveal as="h2" className="section-title" delayMs={140}>
            How we work across calls, design, code reviews, and delivery.
          </Reveal>
          <Reveal as="p" delayMs={220}>
            The studio layer is where we turn strategy into real execution: focused collaboration, iterative product
            design, AI-assisted engineering, and disciplined release cycles.
          </Reveal>
          <div className="studio-principles">
            {studioPrinciples.map((principle, index) => (
              <Reveal key={principle} as="span" delayMs={index * 65}>
                {principle}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
