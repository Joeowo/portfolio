import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatFileSize,
  formatNumber,
  formatNumberCompact,
  formatDuration,
  formatPercent
} from '../format'

describe('formatDate', () => {
  it('should format date as short string by default', () => {
    const date = new Date('2024-01-15T10:30:00')
    expect(formatDate(date)).toMatch(/2024/)
  })

  it('should format date as full string', () => {
    const date = new Date('2024-01-15T10:30:00')
    expect(formatDate(date, 'full')).toContain('2024')
  })

  it('should format date as time', () => {
    const date = new Date('2024-01-15T10:30:00')
    expect(formatDate(date, 'time')).toMatch(/\d{2}:\d{2}/)
  })

  it('should return "刚刚" for recent dates', () => {
    const now = new Date()
    expect(formatDate(now, 'relative')).toBe('刚刚')
  })

  it('should return "Invalid Date" for invalid dates', () => {
    expect(formatDate('invalid')).toBe('Invalid Date')
  })
})

describe('formatFileSize', () => {
  it('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(500)).toBe('500 B')
    expect(formatFileSize(1024)).toBe('1.0 KB')
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB')
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.0 GB')
  })
})

describe('formatNumber', () => {
  it('should format number with locale', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56')
    expect(formatNumber(1000000)).toBe('1,000,000')
  })

  it('should handle NaN', () => {
    expect(formatNumber(NaN)).toBe('0')
  })

  it('should format with options', () => {
    expect(formatNumber(1234.567, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toBe(
      '1,234.57'
    )
  })
})

describe('formatNumberCompact', () => {
  it('should format large numbers compactly', () => {
    expect(formatNumberCompact(500)).toBe('500')
    expect(formatNumberCompact(1500)).toBe('1.5K')
    expect(formatNumberCompact(1500000)).toBe('1.5M')
    expect(formatNumberCompact(1500000000)).toBe('1.5B')
  })

  it('should handle negative numbers', () => {
    expect(formatNumberCompact(-1500)).toBe('-1.5K')
  })

  it('should handle NaN', () => {
    expect(formatNumberCompact(NaN)).toBe('0')
  })
})

describe('formatDuration', () => {
  it('should format seconds as time', () => {
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(59)).toBe('0:59')
    expect(formatDuration(60)).toBe('1:00')
    expect(formatDuration(90)).toBe('1:30')
    expect(formatDuration(3661)).toBe('1:01:01')
  })

  it('should handle invalid input', () => {
    expect(formatDuration(-1)).toBe('0:00')
    expect(formatDuration(NaN)).toBe('0:00')
  })
})

describe('formatPercent', () => {
  it('should format decimal as percentage', () => {
    expect(formatPercent(0)).toBe('0%')
    expect(formatPercent(0.5)).toBe('50%')
    expect(formatPercent(0.123)).toBe('12%')
    expect(formatPercent(0.123, 2)).toBe('12.30%')
    expect(formatPercent(1)).toBe('100%')
  })

  it('should handle NaN', () => {
    expect(formatPercent(NaN)).toBe('0%')
  })
})
