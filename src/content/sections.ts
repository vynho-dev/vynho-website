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

export type ClientGroup = {
  label: string
  clients: string[]
}

export type ClientsSectionConfig = {
  groups: ClientGroup[]
  sectionClassName: string
  watermark?: string
  watermarkClassName?: string
  headerTitle: string
  headerTitleClassName: string
  headerTitleDelayMs?: number
  headerCopy: string
  headerCopyClassName: string
  headerCopyDelayMs?: number
  groupsClassName: string
  rowClassName: string
  rowDelayMs: number
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
  eyebrow: 'Beyond Websites',
  title: 'HIGH-END DESIGN. CRAFTED CODE.',
  description: 'We build digital systems that turn brand, product, and technology into one scalable experience.',
  ctaLabel: 'Explore Capabilities',
  ctaHref: '/services',
} as const

export const aboutMetricsContent: MetricItemContent[] = [
  { value: '11+', label: 'years in digital design & development' },
  { value: '20+', label: 'inhouse experts' },
  { value: '150+', label: 'projects delivered' },
  { value: '3', label: 'continents covered' },
]

export const homeStudioMetricsContent: MetricItemContent[] = [
  { value: '10+', label: 'years experience' },
  { value: '25+', label: 'specialists' },
  { value: '180+', label: 'projects delivered' },
]

export const homeTrustCardsContent = [
  { label: 'Rated 5.0 by clients', icon: 'rating' as const },
  { label: 'Award-level craft', icon: 'award' as const },
  { label: 'Built for global teams', icon: 'global' as const },
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
      { type: 'p', text: 'Our core areas include high-end websites and digital experiences, applications and SaaS platforms, premium e-commerce, and Web3 or AI products.' },
      { type: 'p', text: 'We also take on projects where design and engineering create a real advantage – from 3D visualisations and immersive brand experiences to interactive motion, real-time systems, and fan-driven or content-led platforms.' },
      { type: 'p', text: 'We work with both global enterprises and early-stage startups. Company size matters less than the ambition behind the product.' },
      { type: 'p', text: "If you're unsure whether it's a fit, reach out – the first conversation is always exploratory." },
    ],
  },
  {
    q: 'What does a project like this typically cost?',
    blocks: [
      { type: 'p', text: 'It depends on scope and complexity. As a general reference:' },
      { type: 'ul', items: ['Focused projects such as landing pages or campaign sites start from $10,000', 'A full web presence with a design system typically ranges $40,000–$150,000', 'End-to-end product delivery – applications, SaaS platforms, or complex Web3 systems – starts from $80,000'] },
      { type: 'p', text: "We don't quote before understanding the context. After the first conversation, you'll receive an indicative budget and timeline before any commitment. Payments are milestone-based, with no large upfront sums or surprise invoices." },
    ],
  },
  {
    q: 'How do you approach pricing and project models?',
    blocks: [
      { type: 'p', text: 'It depends on how clearly the scope is defined.' },
      { type: 'p', text: 'If the project is well specified from the start, we can offer a fixed-time, fixed-price model with clear deliverables and budget.' },
      { type: 'p', text: 'If there are still open questions, we usually propose a few structured options – for example, different levels of design or technical complexity – each with its own scope and pricing.' },
      { type: 'p', text: 'For more complex projects, we typically recommend starting with a Discovery & Definition phase. This helps clarify requirements, resolve key unknowns, and define a realistic roadmap and budget.' },
      { type: 'p', text: 'In cases where the scope evolves over time, we often work in a more flexible, agile model. This allows us to adapt to new insights while keeping the focus on delivering the most valuable outcome.' },
      { type: 'p', text: 'Every project is different. We aim to stay flexible, while also setting clear expectations from the start.' },
    ],
  },
  {
    q: "We're working with a tight deadline – how fast can you move?",
    blocks: [
      { type: 'p', text: 'Faster than most studios. Typical timelines look like this:' },
      { type: 'ul', items: ['Landing page or campaign site: as little as 14 days', 'Full web presence: 6–10 weeks', 'Digital product or application: 3–6 months'] },
      { type: 'p', text: "Rush timelines are possible. We'll always be transparent about what level of quality is achievable within a compressed schedule. In practice, the biggest delays tend to come from unclear scope or slow feedback on the client side – not production speed." },
    ],
  },
  {
    q: 'Will we actually work with the senior team we meet at the start?',
    blocks: [
      { type: 'p', text: 'Yes. Vynho is a senior-led studio, which means the team you meet during the first conversation is the team that works on your project.' },
      { type: 'p', text: "Our 20+ in-house specialists cover the full stack – from strategy and UX to 3D, frontend, backend, and Web3 engineering. Each engagement has a dedicated project lead responsible for quality and communication throughout the collaboration." },
      { type: 'p', text: "We don't pitch with seniors and deliver with juniors." },
    ],
  },
  {
    q: 'How is your team structured, and how do you handle international collaboration?',
    blocks: [
      { type: 'p', text: 'We are a Prague-based studio of 20+ in-house specialists, working with clients globally.' },
      { type: 'p', text: 'Remote collaboration is a natural part of how we operate. We typically use tools such as Slack or Teams for communication, Figma for design, and platforms like Asana or Linear for project management.' },
      { type: 'p', text: 'Our CET timezone allows us to overlap effectively across regions, so timezone differences are rarely a blocker in practice.' },
    ],
  },
  {
    q: 'Can you work alongside our internal team?',
    blocks: [
      { type: 'p', text: 'Yes – this is one of our core engagement models.' },
      { type: 'p', text: "Through Embedded Expertise, our senior specialists integrate directly into your team, using your tools, joining your standups, and strengthening specific workstreams. From the start, we define clear ownership – what's ours, what's yours, and what's shared." },
      { type: 'p', text: 'The goal is simple: to strengthen your team, not replace it.' },
    ],
  },
  {
    q: "We don't have a clear brief yet – can we still start?",
    blocks: [
      { type: 'p', text: 'Yes – we can start, just not with production right away.' },
      { type: 'p', text: "If the scope isn't clearly defined, we usually begin with a Discovery & Definition phase, where we help shape the brief, validate key assumptions, and define a clear roadmap for delivery." },
      { type: 'p', text: 'This step is especially important for more complex projects. It allows us to validate technical feasibility early, reduce risk before development begins, and translate high-level ideas into concrete specifications. It also helps prevent scope creep and enables more accurate planning of timeline and budget.' },
      { type: 'p', text: "You don't need a finished brief to get started – just a rough idea. We'll take it from there." },
    ],
  },
  {
    q: 'Do you help shape the product, or mainly execute on briefs?',
    blocks: [
      { type: 'p', text: 'Strategy is the first service we offer – not an add-on.' },
      { type: 'p', text: 'Our Product Strategy work includes discovery, user research, competitive analysis, technical feasibility, roadmapping, and MVP scoping. Every collaboration begins with Exploration & Alignment, regardless of how detailed the initial brief is.' },
      { type: 'p', text: 'In many cases, we help refine the problem before building the solution.' },
    ],
  },
  {
    q: 'Is your team experienced enough to handle complex, large-scale technical projects?',
    blocks: [
      { type: 'p', text: 'Yes – this is a core part of our work.' },
      { type: 'p', text: 'We design and build systems such as scalable backend architectures, real-time platforms, SaaS products, multi-chain Web3 infrastructure, NFT marketplaces, and performance-critical applications.' },
      { type: 'p', text: "What sets us apart is the ability to combine that level of engineering with high-end design. We don't treat design and development as separate layers – both are developed together to create products that are not only robust, but also intuitive and visually distinctive." },
    ],
  },
  {
    q: 'How do you approach AI in your work?',
    blocks: [
      { type: 'p', text: 'Selectively and transparently.' },
      { type: 'p', text: 'In design, generative tools help accelerate early concept exploration. In development, we use tools such as Claude Code to support code generation and rapid prototyping – always using up-to-date, paid versions for reliability and performance.' },
      { type: 'p', text: 'AI never replaces senior judgment. Every AI-assisted output is reviewed by experienced designers or engineers before it reaches you. If AI contributes to final deliverables, we’re transparent about it, including any relevant IP or licensing considerations.' },
    ],
  },
  {
    q: 'What happens after launch?',
    blocks: [
      { type: 'p', text: 'Many clients continue working with us after launch through ongoing product development – in fact, we often prefer long-term partnerships.' },
      { type: 'p', text: 'This may include feature development, performance optimisation, analytics, or iterative UX improvements. Some teams also choose our Embedded Expertise model, where senior specialists remain integrated in the product team long-term.' },
    ],
  },
]

export const workContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Got a project in mind?',
  title: "LET'S TALK",
  source: 'work_contact_cta',
  primaryLabel: "Let's Talk",
  sectionClassName: 'vwk-section vwk-contact-cta',
  containerClassName: 'container vwk-contact-shell cta-shell',
  eyebrowClassName: 'vwk-contact-eyebrow',
  titleClassName: 'vwk-contact-title cta-title',
  actionsClassName: 'cta-actions',
}

export const servicesContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Want to collaborate?',
  title: "LET'S TALK",
  description: "Tell us what you're building. We'll help shape the right strategy, scope, and delivery model.",
  source: 'services_contact_cta',
  primaryLabel: "Let's Talk",
  secondaryLabel: 'View Work',
  secondaryHref: '/work',
  sectionClassName: 'vsv-section vsv-contact',
  containerClassName: 'container vsv-center-shell cta-shell',
  eyebrowClassName: 'vsv-contact-eyebrow',
  titleClassName: 'vsv-contact-title cta-title',
  descriptionClassName: 'vsv-section-copy vsv-center-copy cta-copy',
  actionsClassName: 'vsv-contact-actions cta-actions',
}

export const aboutContactCtaContent: PageContactCTAConfig = {
  eyebrow: 'Want to collaborate?',
  title: "LET'S TALK",
  description: 'Tell us what you are building. We will help shape the right strategy, team, and delivery model.',
  source: 'about_contact_cta',
  primaryLabel: "Let's Talk",
  sectionClassName: 'vabt-section vabt-contact',
  containerClassName: 'container vabt-center-shell cta-shell',
  eyebrowClassName: 'vabt-contact-eyebrow',
  titleClassName: 'vabt-contact-title cta-title',
  descriptionClassName: 'vabt-section-copy u-center-copy cta-copy',
  actionsClassName: 'cta-actions',
}

export const homeFinalCtaContent: SectionCTAContent = {
  eyebrow: 'Want to collaborate?',
  title: "LET'S TALK",
  description: "Tell us what you're building. We'll help shape strategy, scope, and the right delivery model.",
  source: 'home_final_cta',
  primaryLabel: "Let's Talk",
}

export const servicesClientsConfig: ClientsSectionConfig = {
  groups: [
    { label: 'Digital Products', clients: ['NOVA', 'FLUX', 'ATLAS', 'ORBIT', 'SIGNAL'] },
    { label: 'Commerce', clients: ['VANTA', 'MODA', 'LUNAR', 'KIVO'] },
    { label: 'Technology', clients: ['AXON', 'NEXA', 'CIRCUIT', 'LEDGERY', 'MONO'] },
    { label: 'Media', clients: ['FRAME', 'CASTR', 'STAGE', 'AURA'] },
    { label: 'Startups', clients: ['SEEDX', 'PAYLINE', 'VITAL', 'CAREOS'] },
  ],
  sectionClassName: 'vsv-section',
  watermark: 'CLIENTS',
  watermarkClassName: 'vsv-watermark',
  headerTitle: 'CLIENTS',
  headerTitleClassName: 'vsv-section-title vsv-center',
  headerCopy: 'Trusted by founders, product teams, and enterprise leaders building ambitious digital systems.',
  headerCopyClassName: 'vsv-section-copy vsv-center-copy',
  groupsClassName: 'vsv-client-groups',
  rowClassName: 'vsv-client-row',
  rowDelayMs: 60,
}

export const workClientsConfig: ClientsSectionConfig = {
  groups: [
    { label: 'Technology', clients: ['NOVA', 'FLUX', 'AXON', 'CIRCUIT', 'NEXA'] },
    { label: 'Finance', clients: ['LEDGERY', 'MONO', 'PAYLINE', 'VAULTIQ'] },
    { label: 'Consumer', clients: ['AURA', 'KIVO', 'LUNAR', 'MODA'] },
    { label: 'Healthcare', clients: ['VITAL', 'CAREOS', 'MEDIQ'] },
    { label: 'Media', clients: ['FRAME', 'CASTR', 'STAGE'] },
    { label: 'Startups', clients: ['SEEDX', 'ATLAS', 'ORBIT'] },
  ],
  sectionClassName: 'vwk-section vwk-clients',
  headerTitle: 'CLIENTS',
  headerTitleClassName: 'vwk-section-title vwk-center',
  headerTitleDelayMs: 70,
  headerCopy: 'Trusted by startups, growth companies, and enterprise teams building digital products with ambition.',
  headerCopyClassName: 'vwk-section-copy vwk-center-copy',
  headerCopyDelayMs: 120,
  groupsClassName: 'vwk-client-groups',
  rowClassName: 'vwk-client-row',
  rowDelayMs: 70,
}

export const openRolesContent = {
  title: 'OPEN ROLES',
  description:
    'We are always looking for senior designers, engineers, strategists, and creative technologists who care deeply about craft.',
  ctaLabel: 'View Open Roles',
  ctaHref: '/careers',
  note: 'No active roles? Send us your portfolio anyway.',
} as const
