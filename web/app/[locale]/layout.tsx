import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocaleProvider from '@/components/providers/LocaleProvider'

const SUPPORTED_LOCALES = ['cs-czk', 'de-eur', 'en-usd', 'sk-eur', 'pl-pln']

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Verify the locale is supported
  if (!SUPPORTED_LOCALES.includes(params.locale)) {
    notFound()
  }

  // Extract language code from locale (e.g., 'cs' from 'cs-czk')
  const lang = params.locale.split('-')[0]

  return (
    <LocaleProvider locale={params.locale}>
      <div lang={lang}>
        {children}
      </div>
    </LocaleProvider>
  )
}
