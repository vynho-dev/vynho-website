interface LegalPageContent {
  title: string
  body: string[]
}

export const privacyContent: LegalPageContent = {
  title: 'Privacy policy',
  body: [
    'We only collect information needed to respond to inquiries, deliver services, and improve product quality.',
    'Personal data shared through contact forms is handled with operational safeguards and never sold to third parties.',
    'For data requests, updates, or removal, contact info@vynho.com.',
  ],
}

export const termsContent: LegalPageContent = {
  title: 'Terms',
  body: [
    'Project timelines, scope boundaries, and deliverables are confirmed in written agreements before implementation.',
    'All source code, assets, and deployment responsibilities are defined per engagement to avoid ownership ambiguity.',
    'By using this website, you agree to lawful use and respectful communication with our team.',
  ],
}

export const cookiesContent: LegalPageContent = {
  title: 'Cookies',
  body: [
    'We use essential cookies for core site behavior and optional analytics to improve usability and performance.',
    'You can manage cookie preferences through your browser settings at any time.',
    'No advertising profiles are created from this website traffic.',
  ],
}
