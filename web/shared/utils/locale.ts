import { SUPPORTED_LANGUAGES, LanguageCode, DEFAULT_LANGUAGE } from '../constants/languages'
import { LOCALE_CURRENCY_MAP, CurrencyCode, DEFAULT_CURRENCY } from '../constants/currencies'

export function getLanguageFromLocale(locale: string): LanguageCode {
  const langCode = locale.split('-')[0] as LanguageCode
  return SUPPORTED_LANGUAGES[langCode] ? langCode : DEFAULT_LANGUAGE
}

export function getCurrencyFromLocale(locale: string): CurrencyCode {
  return LOCALE_CURRENCY_MAP[locale] || DEFAULT_CURRENCY
}

export function detectUserLocale(): string {
  if (typeof window !== 'undefined') {
    return window.navigator.language
  }
  return 'en-US'
}

export function formatLocaleDate(date: Date | string, locale: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

export function formatLocaleTime(date: Date | string, locale: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}
