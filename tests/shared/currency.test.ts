import { describe, it, expect } from 'vitest'
import { formatPrice } from '../../shared/utils/currency'

describe('Currency Utils', () => {
  describe('formatPrice', () => {
    it('should format USD correctly for en-US locale', () => {
      const result = formatPrice(100, 'en-US')
      expect(result).toBe('$100.00')
    })

    it('should format EUR correctly for de-DE locale', () => {
      const result = formatPrice(100, 'de-DE')
      expect(result).toContain('100')
      expect(result).toContain('€')
    })

    it('should format CZK correctly for cs-CZ locale', () => {
      const result = formatPrice(100, 'cs-CZ')
      expect(result).toContain('100')
      expect(result).toContain('Kč')
    })

    it('should format RUB correctly for ru-RU locale', () => {
      const result = formatPrice(100, 'ru-RU')
      expect(result).toContain('100')
    })

    it('should default to USD for unsupported locale', () => {
      const result = formatPrice(100, 'xx-XX')
      expect(result).toBe('$100.00')
    })

    it('should handle zero amounts', () => {
      const result = formatPrice(0, 'en-US')
      expect(result).toBe('$0.00')
    })

    it('should handle decimal amounts', () => {
      const result = formatPrice(99.99, 'en-US')
      expect(result).toBe('$99.99')
    })

    it('should handle large amounts', () => {
      const result = formatPrice(1000000, 'en-US')
      expect(result).toBe('$1,000,000.00')
    })
  })
})
