'use client'

import { useLocale } from '@/components/providers/LocaleProvider'
import enUS from '@/design-kit/i18n/en-US.json'
import csCZ from '@/design-kit/i18n/cs-CZ.json'
import deDE from '@/design-kit/i18n/de-DE.json'
import skSK from '@/design-kit/i18n/sk-SK.json'
import plPL from '@/design-kit/i18n/pl-PL.json'

// Type for translation keys (supports nested keys like "navigation.feed")
type TranslationKeys = typeof enUS
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K
    }[keyof T & string]
  : never
type TranslationKey = NestedKeyOf<TranslationKeys>

// Map locale codes to translation files
const translations: Record<string, typeof enUS> = {
  'en-US': enUS,
  'cs-CZ': csCZ,
  'de-DE': deDE,
  'sk-SK': skSK,
  'pl-PL': plPL,
}

// Map route locale (cs-czk) to translation locale (cs-CZ)
function mapLocaleToTranslation(locale: string): string {
  const localeMap: Record<string, string> = {
    'cs-czk': 'cs-CZ',
    'en-usd': 'en-US',
    'de-eur': 'de-DE',
    'sk-eur': 'sk-SK',
    'pl-pln': 'pl-PL',
  }
  return localeMap[locale] || 'en-US'
}

// Get nested value from object using dot notation (e.g., "navigation.feed")
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.')
  let current = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path // Return key if not found
    }
  }

  return typeof current === 'string' ? current : path
}

// React hook for translations
export function useTranslation() {
  const { locale } = useLocale()
  const translationLocale = mapLocaleToTranslation(locale)
  const translationData = translations[translationLocale] || translations['en-US']

  const t = (key: TranslationKey | string): string => {
    return getNestedValue(translationData, key)
  }

  return { t, locale }
}

// Legacy export for backward compatibility
export const i18n = {
  t: (key: string) => getNestedValue(enUS, key),
}
