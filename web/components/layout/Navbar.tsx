'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/supabase'
import HaloButton from '@/components/ui/HaloButton'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const { locale } = useLocale()
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for user session - gracefully handle errors
    supabaseClient.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
      })
      .catch((error) => {
        console.warn('Auth check failed (Supabase may not be configured):', error.message)
        setUser(null)
      })

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut()
  }

  const isActive = (path: string) => pathname.includes(path)

  // Helper to create locale-aware links
  const link = (path: string) => `/${locale}${path}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={link('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-xl font-bold">🔥</span>
            </div>
            <span className="text-xl font-bold gradient-text">
              {t('common.appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={link('/feed')}
              className={`transition ${
                isActive('/feed') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('navigation.feed')}
            </Link>
            <Link
              href={link('/create')}
              className={`transition ${
                isActive('/create') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('roastCreator.title')}
            </Link>
            <Link
              href={link('/challenges')}
              className={`transition ${
                isActive('/challenges') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('navigation.challenges')}
            </Link>
            <Link
              href={link('/pizzeria')}
              className={`transition ${
                isActive('/pizzeria') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('navigation.pizzeria')}
            </Link>
            <Link
              href={link('/profile')}
              className={`transition ${
                isActive('/profile') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('navigation.profile')}
            </Link>
          </div>

          {/* Auth Section */}
          <div>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition"
              >
                {t('auth.logout')}
              </button>
            ) : (
              <Link href={link('/login')}>
                <HaloButton>{t('auth.login')}</HaloButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
