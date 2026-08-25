# Vynho SEO launch plan

Last audited: 2026-08-25. Canonical public origin: `https://vynho.com`; public section URLs use a trailing slash.

## Current readiness

The site is now prepared to ship crawlable, route-specific static HTML for its nine public URLs. Before this change, the GitHub Pages SPA fallback returned an app shell to deep links, including important commercial URLs. That risk is removed by emitting a real `index.html` for every public route and retaining a noindex 404 page.

The remaining launch blockers are external-account tasks: deploy the change, verify ownership in Google Search Console and Bing Webmaster Tools, submit the sitemap, and configure consent-aware analytics. Search submission is a discovery signal, not an indexing guarantee.

## Implemented technical foundation

| Area | Implementation | Validation |
| --- | --- | --- |
| Crawlable routes | Static HTML is generated for `/`, `/work`, `/services`, `/about`, `/careers`, `/contact`, `/privacy`, `/terms`, and `/cookies`. | `npm run seo:check` confirms one rendered H1 per route. |
| 404 | Generated `404.html` has `noindex,follow`. | `npm run seo:check`. |
| Metadata | One page registry supplies title, description, canonical URL, Open Graph, and X card values. | Static-output check and browser inspection. |
| Canonicals | All indexable pages self-canonicalize to `https://vynho.com` with no trailing slash except the root. | Static-output check. |
| Sitemap and robots | Root `robots.txt` references root `sitemap.xml`; sitemap contains only canonical public URLs. | Static-output check. |
| Entity data | JSON-LD provides Organization, WebSite, per-page WebPage type, and Service data on `/services`. | Static-output check and Google Rich Results Test after deployment. |
| Social preview | Original Vynho design-and-engineering preview image at `/assets/og/vynho-social.png`. | Validate with social debugger after deployment. |
| Regression safety | GitHub Pages CI runs `npm run seo:check` after every production build. | GitHub Actions build log. |

## Search architecture and intent

| URL | User intent and primary topic | Proposed title | Primary conversion |
| --- | --- | --- | --- |
| `/` | Understand Vynho and its senior product-studio offer | Vynho \| Product Design & Engineering Studio | Explore work or contact |
| `/services` | Hire a product design and engineering partner | Product Design & Engineering Services \| Vynho | Project inquiry |
| `/work` | Evaluate quality and relevant project experience | Selected Digital Product Work \| Vynho | View a case study or contact |
| `/about` | Validate team, location, values, and credibility | About Vynho \| Founder-Led Product Studio | Contact |
| `/contact` | Start a project conversation | Contact Vynho \| Start a Product Project | Qualified inquiry |
| `/careers` | Evaluate collaboration or career fit | Careers at Vynho \| Design & Engineering Studio | Candidate inquiry |
| `/privacy`, `/terms`, `/cookies` | Trust and legal information | Page-specific legal titles | Trust signal |

Do not create thin city, industry, or service-location pages. Add a new URL only when it contains original proof, a distinct audience need, and clear internal links.

### Keyword and content ownership

| Cluster | Intent | URL owner | Evidence needed to compete |
| --- | --- | --- | --- |
| `Vynho`, `Vynho studio`, `Vynho design` | Navigational | `/` | Consistent entity data, profiles, third-party mentions. |
| `product design and development studio`, `product design engineering agency` | Commercial | `/services` | Detailed services, team/process proof, genuine case studies. |
| `web design and development studio`, `digital product studio` | Commercial | `/services` and `/work` | Strong project outcomes and visual/technical evidence. |
| `SaaS UX UI design`, `AI product design`, `interactive web development` | Commercial / proof | Future capability pages only after related work exists | Case studies with challenge, role, process, outcome, and technology. |
| `product design process`, `design engineering`, `website performance for premium brands` | Informational | Future insights | First-hand observations, experiments, and reproducible examples. |

Geographic targeting should remain secondary: use Hyderabad accurately in contact, about, Organization schema, and profiles; do not make unsubstantiated "best agency" claims. There is no need for `hreflang` while the public experience remains a single English version.

## Entity and structured-data model

Vynho is represented consistently as a Hyderabad, India, remote-first product design and engineering studio. The Organization JSON-LD has one stable `@id` (`https://vynho.com/#organization`), official website, public contact details, and verified social URLs. The same entity is linked to WebSite and page records.

Use structured data only when it describes visible, current content. Current types are Organization, WebSite, WebPage/CollectionPage/AboutPage/ContactPage, and Service. Add `CreativeWork` only to future portfolio detail pages with public client/project facts; add `Article` only to authored insight pages; add `Person` only for people who consent to public structured profiles. Do not add Review, AggregateRating, FAQ, LocalBusiness, VideoObject, or ImageObject markup without the matching visible content and eligibility.

## Codebase operating model

| File / module | Responsibility |
| --- | --- |
| `src/content/seo-pages.json` | Canonical public-route registry: title, description, type, indexability. |
| `src/content/seo.ts` | Runtime canonical/meta/schema utility. |
| `scripts/generate-seo-pages.mjs` | Emits route-specific metadata and JSON-LD into static output. |
| `scripts/prerender-pages.mjs` | Renders each registered route before GitHub Pages deployment. |
| `scripts/seo-check.mjs` | Fails CI when a route lacks a static H1, canonical, index directive, schema, sitemap entry, or correct 404 directive. |
| `public/robots.txt`, `public/sitemap.xml` | Crawler discovery files. Update the sitemap whenever canonical public URLs change. |

When adding a public page, add it to `seo-pages.json`, make sure it has one descriptive H1 and self-canonical URL, link to it from relevant pages, and run `npm run build && npm run seo:check`.

## Analytics and conversion measurement

Analytics is intentionally not installed until Vynho chooses a GA4 property or GTM container and a consent approach. Do not invent an ID.

Recommended events:

| Event | Trigger | Parameter(s) | Success signal |
| --- | --- | --- | --- |
| `generate_lead` | A submitted, successfully delivered contact form | `lead_type`, `source_page` | Qualified inquiry, not just a click. |
| `contact_intent` | Mailto/contact CTA click while the form remains mailto-based | `placement`, `source_page` | Leading signal only. |
| `view_work_item` | A selected-work detail route or preview opens | `work_slug`, `source_page` | Portfolio engagement. |
| `outbound_social_click` | A social profile link opens | `network`, `source_page` | Distribution effectiveness. |

Do not track scroll depth, animation exposure, or every button click as conversions. GA4 should be linked to Search Console after both are verified, and the site should use the owner-approved consent setup before collecting analytics for relevant markets.

## Indexing and crawler policy

- `robots.txt` allows public crawling and references the canonical sitemap.
- The sitemap lists only indexable canonical URLs. It deliberately omits `lastmod`, `priority`, and `changefreq` because there is no reliable content-change source.
- Canonical links, XML sitemap entries, and HTTPS/origin redirects should agree. Check this after deployment.
- Do not add crawler-specific AI blocks by default. Keep a deliberate policy based on business preference; crawlable text, accurate entity data, original case studies, and reputable citations are the durable AI-discovery inputs.
- Do not implement IndexNow for the current static brochure site. Reassess when publishing project pages or insights frequently; then host one key at the root and submit only created, updated, or removed canonical URLs.

## Owner actions after deployment

### Google Search Console

1. In Search Console, add the **Domain property** `vynho.com`.
2. Add the DNS TXT record Search Console provides at the DNS host, then verify.
3. Submit `https://vynho.com/sitemap.xml` in **Sitemaps**.
4. Use **URL Inspection** for `/`, `/services`, `/work`, `/about`, and `/contact`; request indexing only for these meaningful canonical URLs.
5. Review **Pages**, **Core Web Vitals**, **HTTPS**, **Manual actions**, and **Security issues** after crawl data arrives.

### Bing Webmaster Tools

1. Add `https://vynho.com/`; importing the verified Google Search Console property is the shortest path if available.
2. Submit `https://vynho.com/sitemap.xml` and confirm processing.
3. Review Site Explorer, crawl errors, SEO Reports, Search Performance, and backlink reports monthly.

### Analytics

1. Create a GA4 web property for `vynho.com`, using Asia/Kolkata reporting time zone only if that is the desired reporting basis.
2. Create the web stream and choose GTM or a direct Google tag.
3. Approve the cookie/consent behavior with legal/marketing, then provide the GTM container ID or GA4 Measurement ID for installation.
4. Confirm Realtime data with a non-production test visit and mark only qualified-lead events as conversions.

## Authority, content, and distribution plan

Start with original work rather than volume:

1. Publish two detailed case studies: challenge, Vynho's role, constraints, process, technology, outcome, and credits. Link each to the relevant capability and contact page.
2. Publish one design-engineering field note per month: motion performance, an interaction prototype, AI product UX, or a real system-design lesson. Each must include first-hand material unavailable elsewhere.
3. Complete official LinkedIn, Instagram, X, GitHub (if public work exists), Behance/Dribbble, and design-gallery profiles with consistent name, website, description, logo, and location.
4. Pursue earned placement where work fits: Awwwards, CSS Design Awards, The FWA, Behance, Dribbble, creative-development communities, client launch stories, and design/technology publications. Submit completed work with a useful write-up; do not buy links, use automated directories, or claim awards not received.

## Launch checklist

### Before deployment

- [ ] `npm run build && npm run seo:check && npm run typecheck && npm run lint` pass.
- [ ] Confirm every canonical URL returns 200 with route-specific HTML, one H1, canonical, metadata, and visible content.
- [ ] Confirm unknown URLs return a genuine 404 with `noindex`.
- [ ] Run Google Rich Results Test and Schema Markup Validator against the deployed home and services pages.
- [ ] Run PageSpeed Insights on mobile and desktop for `/` and `/services`; record LCP, INP, CLS, and screenshot evidence.
- [ ] Validate social cards with LinkedIn Post Inspector and X Card Validator or the current platform equivalent.

### Immediately after deployment

- [ ] Open `/robots.txt`, `/sitemap.xml`, and every canonical route on `https://vynho.com`.
- [ ] Confirm the deployed headers/statuses and the correct root domain.
- [ ] Complete Search Console and Bing verification, then submit the sitemap.
- [ ] Inspect the five commercial URLs in Search Console.

### First 24 hours / first week

- [ ] Fix sitemap fetch, canonical, mobile, HTTPS, structured-data, or 404 errors immediately.
- [ ] Confirm GA4 Realtime and lead-event definitions once analytics is installed.
- [ ] Check branded search and `site:vynho.com` as discovery clues, not as indexing guarantees.

### Monthly

- [ ] Track index coverage, impressions, clicks, CTR, average position, organic leads, Core Web Vitals, broken URLs, and referring domains.
- [ ] Add or refresh a case study/insight only when there is original evidence to publish.
- [ ] Re-run PageSpeed on home and top landing pages after any motion, video, font, or analytics change.

## 90-day roadmap

| Window | Priority | Owner | Work | Expected signal |
| --- | --- | --- | --- | --- |
| Days 0–7 | P0 | Engineering + owner | Deploy foundation; verify GSC/Bing; submit sitemap; inspect key URLs. | Sitemap accepted, crawl/index reports populated. |
| Days 8–30 | P1 | Marketing + design + engineering | GA4/consent setup; profile consistency; first case study; social-card validation. | Entity consistency and first organic impressions. |
| Days 31–60 | P2 | Studio leads | Second case study and first field note; client attribution/outreach; relevant galleries. | Referring-domain and non-brand query growth. |
| Days 61–90 | P2 | Growth + engineering | Optimize titles/internal links from Search Console; improve top landing-page CTA and CWV. | Better CTR, qualified organic leads, stable performance. |

## Priority register

| Priority | Item | Effort | Impact | Owner / dependency |
| --- | --- | --- | --- | --- |
| P0 | Deploy static-route SEO output | Low | High | Engineering release approval |
| P0 | Verify GSC/Bing and submit sitemap | Low | High | Domain/DNS and account owner |
| P1 | Install consent-aware GA4/GTM and lead events | Medium | High | Analytics ID, legal decision |
| P1 | Publish substantive project detail pages | High | High | Client approvals, project facts |
| P1 | Validate live CWV and social previews | Low | Medium | Deployed site |
| P2 | Earn relevant design/community references | Medium | Medium | Marketing/editorial effort |
| P2 | Add insight cadence and internal links | Medium | Medium | Original editorial material |
| P3 | Add IndexNow | Low | Low today | Only after frequent publishing |
