import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class values and deduplicates tailwind conflicts', () => {
    const includeHidden = false
    const classes = cn('px-2 text-sm', includeHidden ? 'hidden' : undefined, 'px-4', undefined, 'font-medium')
    expect(classes).toContain('px-4')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('font-medium')
    expect(classes).not.toContain('px-2')
  })
})
