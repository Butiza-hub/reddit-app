import { describe, it, expect } from 'vitest'
import { formatTimeAgo } from './formatTimeAgo'

const NOW = 1_800_000_000
const MINUTE = 60
const HOUR = 3600
const DAY = 86400
const ago = (seconds) => NOW - seconds

describe('formatTimeAgo', () => {
  it('says "just now" for under a minute', () => {
    expect(formatTimeAgo(ago(30), NOW)).toBe('just now')
  })

  it('says "just now" when the timestamp is in the future', () => {
    expect(formatTimeAgo(NOW + 2 * MINUTE, NOW)).toBe('just now')
  })

  it('uses minutes under an hour', () => {
    expect(formatTimeAgo(ago(5 * MINUTE), NOW)).toBe('5m ago')
    expect(formatTimeAgo(ago(59 * MINUTE), NOW)).toBe('59m ago')
  })

  it('switches to hours at 60 minutes and rounds down', () => {
    expect(formatTimeAgo(ago(HOUR), NOW)).toBe('1h ago')
    expect(formatTimeAgo(ago(6 * HOUR + 59 * MINUTE), NOW)).toBe('6h ago')
  })

  it('uses days from 24 hours', () => {
    expect(formatTimeAgo(ago(DAY), NOW)).toBe('1d ago')
    expect(formatTimeAgo(ago(3 * DAY), NOW)).toBe('3d ago')
  })
})