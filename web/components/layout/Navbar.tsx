'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/supabase'
import HaloButton from '@/components/ui/HaloButton'

export default function Navbar() {
  const pathname = usePathname()
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

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-xl font-bold">🔥</span>
            </div>
            <span className="text-xl font-bold gradient-text">
              RoastArena
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/feed"
              className={`transition ${
                isActive('/feed') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Feed
            </Link>
            <Link
              href="/create"
              className={`transition ${
                isActive('/create') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Create
            </Link>
            <Link
              href="/challenges"
              className={`transition ${
                isActive('/challenges') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Challenges
            </Link>
            <Link
              href="/pizzeria"
              className={`transition ${
                isActive('/pizzeria') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Pizzeria
            </Link>
            <Link
              href="/profile"
              className={`transition ${
                isActive('/profile') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Auth Section */}
          <div>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/login">
                <HaloButton>Sign In</HaloButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
