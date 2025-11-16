'use client'

import React, { createContext, useContext } from 'react'

interface LocaleConfig {
  locale: string // e.g., 'cs-czk'
  language: string // e.g., 'cs'
  currency: string // e.g., 'CZK'
  currencySymbol: string // e.g., 'Kč'
}

const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  'cs-czk': {
    locale: 'cs-czk',
    language: 'cs',
    currency: 'CZK',
    currencySymbol: 'Kč',
  },
  'de-eur': {
    locale: 'de-eur',
    language: 'de',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'en-usd': {
    locale: 'en-usd',
    language: 'en',
    currency: 'USD',
    currencySymbol: '$',
  },
  'sk-eur': {
    locale: 'sk-eur',
    language: 'sk',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'pl-pln': {
    locale: 'pl-pln',
    language: 'pl',
    currency: 'PLN',
    currencySymbol: 'zł',
  },
}

const LocaleContext = createContext<LocaleConfig>({
  locale: 'cs-czk',
  language: 'cs',
  currency: 'CZK',
  currencySymbol: 'Kč',
})

export function useLocale() {
  return useContext(LocaleContext)
}

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  const config = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS['cs-czk']

  return (
    <LocaleContext.Provider value={config}>
      {children}
    </LocaleContext.Provider>
  )
}
