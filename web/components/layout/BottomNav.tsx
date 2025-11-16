'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: '/feed', icon: '🏠', label: 'Feed' },
    { path: '/create', icon: '✨', label: 'Create' },
    { path: '/challenges', icon: '🏆', label: 'Challenges' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive(item.path)
                ? 'text-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
