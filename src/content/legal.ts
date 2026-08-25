interface LegalPageContent {
  title: string
  body: string[]
}

export const privacyContent: LegalPageContent = {
  title: 'Privacy policy',
  body: [
    'This website does not send contact-form data to a Vynho server. The form opens a draft in your email application, and nothing is shared until you choose to send it.',
    'Information you send by email is used only to respond to your inquiry, discuss potential work, or support an active engagement. It is not sold to third parties.',
    'If you opt in to analytics, Vynho uses Google Analytics to understand aggregate site use, such as pages visited, browser and device information, and referral sources. We do not send the contents of contact enquiries or email addresses to Google Analytics.',
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
    'Vynho uses essential local storage for your theme preference and cookie choice. These preferences remain in your browser.',
    'Your light or dark theme preference is stored locally in your browser so the site can remember your choice. It is not sent to Vynho.',
    'Optional Google Analytics is loaded only after you choose “Accept analytics”. It helps us measure aggregate site use and is not used for advertising or personalised advertising.',
  ],
}
