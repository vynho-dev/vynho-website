export interface ContactMailtoValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export function buildContactMailto(values: ContactMailtoValues) {
  const name = `${values.firstName.trim()} ${values.lastName.trim()}`
  const body = [
    `Name: ${name}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    '',
    values.message.trim(),
  ].join('\n')

  return `mailto:info@vynho.com?subject=${encodeURIComponent(`Project inquiry from ${name}`)}&body=${encodeURIComponent(body)}`
}
