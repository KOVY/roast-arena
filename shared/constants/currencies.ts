export const SUPPORTED_CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
  },
  CZK: {
    code: 'CZK',
    symbol: 'Kč',
    name: 'Czech Koruna',
    locale: 'cs-CZ',
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
    name: 'Russian Ruble',
    locale: 'ru-RU',
  },
} as const

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES

export const DEFAULT_CURRENCY: CurrencyCode = 'USD'

export const LOCALE_CURRENCY_MAP: Record<string, CurrencyCode> = {
  'en-US': 'USD',
  'cs-CZ': 'CZK',
  'de-DE': 'EUR',
  'ru-RU': 'RUB',
}
