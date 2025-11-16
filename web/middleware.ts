import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales configuration
const SUPPORTED_LOCALES = [
  'cs-czk', // Czech - CZK
  'de-eur', // German - EUR
  'en-usd', // English - USD
  'sk-eur', // Slovak - EUR
  'pl-pln', // Polish - PLN
]

const DEFAULT_LOCALE = 'cs-czk'

// Extract locale from URL pathname
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  if (SUPPORTED_LOCALES.includes(potentialLocale)) {
    return potentialLocale
  }

  return null
}

// Get locale from Accept-Language header
function getLocaleFromHeader(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) return DEFAULT_LOCALE

  // Simple language detection
  if (acceptLanguage.includes('cs')) return 'cs-czk'
  if (acceptLanguage.includes('de')) return 'de-eur'
  if (acceptLanguage.includes('sk')) return 'sk-eur'
  if (acceptLanguage.includes('pl')) return 'pl-pln'
  if (acceptLanguage.includes('en')) return 'en-usd'

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next()
  }

  // Check if URL already has a locale
  const currentLocale = getLocaleFromPathname(pathname)

  // If no locale in URL, redirect to default/detected locale
  if (!currentLocale) {
    const detectedLocale = getLocaleFromHeader(request)
    const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url)

    return NextResponse.redirect(newUrl)
  }

  // Add locale to headers for use in components
  const response = NextResponse.next()
  response.headers.set('x-locale', currentLocale)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
