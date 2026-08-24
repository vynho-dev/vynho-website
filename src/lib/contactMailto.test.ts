import { describe, expect, it } from 'vitest'
import { buildContactMailto } from '@/lib/contactMailto'

describe('buildContactMailto', () => {
  it('trims fields and creates an encoded inquiry draft', () => {
    const href = buildContactMailto({
      firstName: '  Ada ',
      lastName: ' Lovelace  ',
      email: ' ada@example.com ',
      phone: '',
      message: '  Build a thoughtful product. ',
    })

    const url = new URL(href)
    expect(url.pathname).toBe('info@vynho.com')
    expect(url.searchParams.get('subject')).toBe('Project inquiry from Ada Lovelace')
    expect(url.searchParams.get('body')).toContain('Phone: Not provided')
    expect(url.searchParams.get('body')).toContain('Build a thoughtful product.')
  })
})
