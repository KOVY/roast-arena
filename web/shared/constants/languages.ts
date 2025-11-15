export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
  },
  cs: {
    code: 'cs-CZ',
    name: 'Czech',
    nativeName: 'Čeština',
  },
  de: {
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
  },
  ru: {
    code: 'ru-RU',
    name: 'Russian',
    nativeName: 'Русский',
  },
} as const

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: LanguageCode = 'en'
