import { describe, it, expect } from 'vitest'
import { getLanguageFromLocale, getCurrencyFromLocale } from '../../shared/utils/locale'

describe('Locale Utils', () => {
  describe('getLanguageFromLocale', () => {
    it('should extract language code from full locale', () => {
      expect(getLanguageFromLocale('en-US')).toBe('en')
      expect(getLanguageFromLocale('cs-CZ')).toBe('cs')
      expect(getLanguageFromLocale('de-DE')).toBe('de')
      expect(getLanguageFromLocale('ru-RU')).toBe('ru')
    })

    it('should default to en for unsupported locale', () => {
      expect(getLanguageFromLocale('xx-XX')).toBe('en')
    })
  })

  describe('getCurrencyFromLocale', () => {
    it('should return correct currency for each locale', () => {
      expect(getCurrencyFromLocale('en-US')).toBe('USD')
      expect(getCurrencyFromLocale('cs-CZ')).toBe('CZK')
      expect(getCurrencyFromLocale('de-DE')).toBe('EUR')
      expect(getCurrencyFromLocale('ru-RU')).toBe('RUB')
    })

    it('should default to USD for unsupported locale', () => {
      expect(getCurrencyFromLocale('xx-XX')).toBe('USD')
    })
  })
})
