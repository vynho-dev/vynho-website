export type SectionCTAContent = {
  eyebrow: string
  title: string
  description?: string
  source: string
  primaryLabel: string
  secondaryLabel?: string
  secondaryHref?: string
}

export type PageContactCTAConfig = SectionCTAContent & {
  sectionClassName: string
  containerClassName: string
  eyebrowClassName: string
  titleClassName: string
  descriptionClassName?: string
  actionsClassName: string
}

export type MetricItemContent = {
  value: string
  label: string
}

export type HomeWorkCardContent = {
  id: string
  title: string
  tag: string
  image: string
}

export type HomeBuildCardContent = {
  id: string
  title: string
  copy: string
  pills: string[]
  image: string
  lime?: boolean
}

export type HomeServiceItemContent = {
  title: string
  body: string
}

export type HomeEngagementCardContent = {
  number: string
  title: string
  description: string
  points: string[]
  lime?: boolean
}

export type HomeEdgeCardContent = {
  title: string
  body: string
  image: string
}

export type HomeFaqBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type HomeFaqItemContent = {
  q: string
  blocks: HomeFaqBlock[]
}

export const workSpecialtyContent = {
  eyebrow: 'Beyond the screen',
  title: 'SYSTEMS WITH A POINT OF VIEW.',
  description: 'Identity, product thinking, and technology become one coherent experience—not three disconnected deliverables.',
  ctaLabel: 'Explore Capabilities',
  ctaHref: '/services',
} as const

export const aboutMetricsContent: MetricItemContent[] = [
  { value: '2+', label: 'years building focused digital products' },
  { value: '10+', label: 'products across web, mobile, and platforms' },
  { value: '20+', label: 'specialists in our extended network' },
  { value: '2', label: 'active markets in India and abroad' },
]

export const homeStudioMetricsContent: MetricItemContent[] = [
  { value: '10+', label: 'products delivered' },
  { value: '20+', label: 'specialists in our network' },
  { value: '2', label: 'markets served' },
]

export const homeWorkCardsContent: HomeWorkCardContent[] = [
  {
    id: 'pallet-ross',
    title: 'Pallet Ross',
    tag: 'New Age Art Platform',
    image: '/assets/services/build-websites.mp4',
  },
  {
    id: 'chatif',
    title: 'Chatif',
    tag: 'AI Chat Mobile App',
    image: '/assets/projects/lumapay-mobile.mp4',
  },
  {
    id: 'nestery',
    title: 'Nestery',
    tag: 'Premium Storefront',
    image: '/assets/services/build-commerce.mp4',
  },
  {
    id: 'orbit-studio',
    title: 'Orbit Studio',
    tag: 'Immersive Brand Website',
    image: '/assets/projects/orbit-immersive.mp4',
  },
  {
    id: 'pasar-marketing',
    title: 'Pasar Marketing',
    tag: 'Real-Time Analytics Dashboard',
    image: '/assets/projects/signaldash-saas.webp',
  },
]

export const homeBuildCardsContent: HomeBuildCardContent[] = [
  {
    id: '01',
    title: 'Websites & Digital Experiences',
    copy: 'Flagship web experiences combining visual impact, conversion design, and fast performance.',
    pills: ['Company Website', 'Product Website', 'Landing Page'],
    image: '/assets/work/websites-and-digital-experiences.webp',
  },
  {
    id: '02',
    title: 'Apps, Platforms & Real-Time Systems',
    copy: 'Scalable applications engineered for high-velocity teams and complex data-heavy workflows.',
    pills: ['Mobile App', 'Web App', 'Business Portal'],
    image: '/assets/work/apps.webp',
    lime: true,
  },
  {
    id: '03',
    title: 'Commerce & Product Storytelling',
    copy: 'Premium commerce experiences that improve perceived value and drive confident purchase decisions.',
    pills: ['Premium Storefront', 'B2B Portal', 'Custom Commerce'],
    image: '/assets/work/ecommerce.webp',
  },
  {
    id: '04',
    title: 'Immersive & Emerging Technology',
    copy: 'Interactive 3D, motion, Web3 and AI interfaces that make complex systems feel intuitive.',
    pills: ['3D Web', 'AI Interfaces', 'Web3'],
    image: '/assets/work/web3.webp',
  },
]

export const homeServiceItemsContent: HomeServiceItemContent[] = [
  {
    title: 'Product Strategy',
    body: 'Research, positioning, roadmap definition, and execution planning built around measurable business outcomes.',
  },
  {
    title: 'UX/UI Design',
    body: 'User journeys, interface systems, prototyping, and conversion-focused visual design for modern products.',
  },
  {
    title: '3D, Motion & Immersive Design',
    body: 'Cinematic visual systems and interaction layers that increase product clarity and premium perception.',
  },
  {
    title: 'Creative Frontend & App Engineering',
    body: 'High-quality implementation with strong performance, accessibility, and maintainable component architecture.',
  },
  {
    title: 'Backend, CMS & System Engineering',
    body: 'API architecture, content systems, data pipelines, and deployment foundations built for reliability.',
  },
  {
    title: 'Web3, AI & Emerging Interfaces',
    body: 'Wallet flows, model orchestration, and trust-first product interfaces for AI-led and decentralized systems.',
  },
]

export const homeEngagementCardsContent: HomeEngagementCardContent[] = [
  {
    number: '01',
    title: 'End-to-End Product Delivery',
    description: 'We design, build, test, and launch complete product experiences from discovery through scale.',
    points: ['Product strategy', 'UX/UI design', 'Frontend development', 'Backend integration', 'Launch support'],
  },
  {
    number: '02',
    title: 'Embedded Expertise',
    description: 'We integrate with your team to accelerate design, engineering, and AI workflows where it matters most.',
    points: ['Design systems', 'AI workflow planning', 'Rapid prototyping', 'Technical implementation', 'QA and polish'],
    lime: true,
  },
]

export const homeEdgeCardsContent: HomeEdgeCardContent[] = [
  {
    title: 'Design as strategic value',
    body: 'We treat design as a business multiplier. Clarity, taste, and craft compound across every product surface.',
    image: '/assets/edge/design.webp',
  },
  {
    title: 'Fluid scaling UI',
    body: 'Interface systems that hold up from a single page to a complex, multi-tenant product platform.',
    image: '/assets/edge/fluid.webp',
  },
  {
    title: 'Business-driven engineering',
    body: 'Architecture and implementation decisions are shaped by metrics that matter: conversion, latency, and resilience.',
    image: '/assets/edge/websites-and-digital-experiences.webp',
  },
  {
    title: 'Purposeful immersion',
    body: '3D, motion, and interaction are used with intent to explain complex ideas and increase confidence.',
    image: '/assets/edge/purposeful-immersion.webp',
  },
]

export const homeFaqContent: HomeFaqItemContent[] = [
  {
    q: 'What kinds of projects are a good fit for Vynho?',
    blocks: [
      { type: 'p', text: 'The strongest fit is a digital product with real ambition: a flagship website, application, commerce experience, AI interface, or platform that cannot afford to feel interchangeable.' },
      { type: 'p', text: 'We are most useful when the work needs both a clear product position and thoughtful technical execution. The size of the company matters less than the importance of the outcome.' },
      { type: 'p', text: 'If the problem is still loosely defined, that is fine. An exploratory conversation is often the right first step.' },
    ],
  },
  {
    q: 'What does a project like this typically cost?',
    blocks: [
      { type: 'p', text: 'Budget follows the complexity of the problem, the depth of the experience, and the amount of system design involved.' },
      { type: 'ul', items: ['Focused launches usually begin around $10,000', 'Multi-page brand and product sites commonly sit between $40,000 and $150,000', 'Complex applications and platforms generally begin around $80,000'] },
      { type: 'p', text: 'After an initial conversation, we share a clear range, timeline, and milestone structure before either side commits.' },
    ],
  },
  {
    q: 'How do you approach pricing and project models?',
    blocks: [
      { type: 'p', text: 'A defined scope can be priced as a fixed engagement. An evolving product is better served by a dedicated team and a steady delivery cadence.' },
      { type: 'p', text: 'When important questions remain, we start with a short definition phase. It turns assumptions into decisions and gives the following work a credible plan.' },
      { type: 'p', text: 'Whichever model fits, responsibilities, checkpoints, and commercial boundaries stay visible from the beginning.' },
    ],
  },
  {
    q: "We're working with a tight deadline – how fast can you move?",
    blocks: [
      { type: 'p', text: 'A focused launch can move in weeks; a full website usually needs several more; a substantial product is measured in months.' },
      { type: 'p', text: 'For a hard deadline, we reduce uncertainty and scope before reducing quality. Fast decisions and a single accountable feedback path make the biggest difference.' },
    ],
  },
  {
    q: 'Will we actually work with the senior team we meet at the start?',
    blocks: [
      { type: 'p', text: 'Yes. The people shaping the proposal remain close to the decisions, reviews, and shipped work.' },
      { type: 'p', text: 'When a specialist joins, they join for a defined reason and work directly with the core team. There is no hidden handoff after the pitch.' },
    ],
  },
  {
    q: 'How is your team structured, and how do you handle international collaboration?',
    blocks: [
      { type: 'p', text: 'Vynho is based in Hyderabad and designed for remote collaboration. Each engagement has a small accountable core with specialists added only where they improve the work.' },
      { type: 'p', text: 'We agree overlap hours, decision owners, review windows, and working tools at kickoff so distance never becomes ambiguity.' },
    ],
  },
  {
    q: 'Can you work alongside our internal team?',
    blocks: [
      { type: 'p', text: 'Yes. We can own a complete stream or place senior design and engineering capacity inside an existing one.' },
      { type: 'p', text: 'The useful part is not extra attendance; it is clear ownership. We define what Vynho leads, what your team leads, and where decisions are shared.' },
    ],
  },
]

export const workContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Open a channel',
  title: 'MAKE IT REAL.',
  description: "Bring us the ambition, the constraint, or the half-formed idea. We'll help find the strongest way forward.",
  source: 'work_contact_cta',
  primaryLabel: 'Contact Us',
  sectionClassName: 'vwk-section vwk-contact-cta',
  containerClassName: 'container vwk-contact-shell cta-shell',
  eyebrowClassName: 'vwk-contact-eyebrow',
  titleClassName: 'vwk-contact-title cta-title',
  descriptionClassName: 'vwk-section-copy cta-copy',
  actionsClassName: 'cta-actions',
}

export const servicesContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Open a channel',
  title: 'MAKE IT REAL.',
  description: "Bring us the ambition, the constraint, or the half-formed idea. We'll help find the strongest way forward.",
  source: 'services_contact_cta',
  primaryLabel: 'Contact Us',
  secondaryLabel: 'View Work',
  secondaryHref: '/work',
  sectionClassName: 'vsv-section vsv-contact',
  containerClassName: 'container vsv-center-shell cta-shell',
  eyebrowClassName: 'vsv-contact-eyebrow',
  titleClassName: 'vsv-contact-title cta-title',
  descriptionClassName: 'vsv-section-copy cta-copy',
  actionsClassName: 'vsv-contact-actions cta-actions',
}

export const aboutContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Open a channel',
  title: 'MAKE IT REAL.',
  description: "Bring us the ambition, the constraint, or the half-formed idea. We'll help find the strongest way forward.",
  source: 'about_contact_cta',
  primaryLabel: 'Contact Us',
  sectionClassName: 'vabt-section vabt-contact',
  containerClassName: 'container vabt-center-shell cta-shell',
  eyebrowClassName: 'vabt-contact-eyebrow',
  titleClassName: 'vabt-contact-title cta-title',
  descriptionClassName: 'vabt-section-copy cta-copy',
  actionsClassName: 'cta-actions',
}

export const homeFinalCtaContent: SectionCTAContent = {
  eyebrow: 'Open a channel',
  title: 'MAKE IT REAL.',
  description: "Bring us the ambition, the constraint, or the half-formed idea. We'll help find the strongest way forward.",
  source: 'home_final_cta',
  primaryLabel: 'Contact Us',
}

export const openRolesContent = {
  title: 'OPEN ROLES',
  description:
    'We are always looking for senior designers, engineers, strategists, and creative technologists who care deeply about craft.',
  ctaLabel: 'View Open Roles',
  ctaHref: '/careers',
  note: 'No active roles? Send us your portfolio anyway.',
} as const
