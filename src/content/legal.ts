interface LegalPageContent {
  title: string
  body: string[]
}

export const privacyContent: LegalPageContent = {
  title: 'Privacy policy',
  body: [
    'This website does not send contact-form data to a Vynho server. The form opens a draft in your email application, and nothing is shared until you choose to send it.',
    'Information you send by email is used only to respond to your inquiry, discuss potential work, or support an active engagement. It is not sold to third parties.',
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
    'This website does not currently set advertising or analytics cookies.',
    'Your light or dark theme preference is stored locally in your browser so the site can remember your choice. It is not sent to Vynho.',
    'If measurement tools that use cookies are introduced later, this notice will be updated before they are enabled.',
  ],
}
