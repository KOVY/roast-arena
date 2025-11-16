'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLocale } from '@/components/providers/LocaleProvider'

interface NavItem {
  icon: string
  label: string
  href: string
  activePattern: RegExp
}

const navItems: NavItem[] = [
  {
    icon: '🔥',
    label: 'Feed',
    href: '/feed',
    activePattern: /\/feed/,
  },
  {
    icon: '🏆',
    label: 'Challenges',
    href: '/challenges',
    activePattern: /\/challenges/,
  },
  {
    icon: '✨',
    label: 'Create',
    href: '/create',
    activePattern: /\/create/,
  },
  {
    icon: '👤',
    label: 'Profile',
    href: '/profile',
    activePattern: /\/profile/,
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { locale } = useLocale()

  const handleNavigation = (href: string) => {
    router.push(`/${locale}${href}`)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(180deg, transparent 0%, #100c14 20%)' }}>
      {/* Glassmorphic Container */}
      <div className="mx-auto max-w-lg backdrop-blur-xl" style={{ backgroundColor: 'rgba(16, 12, 20, 0.8)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {/* Nav Items Grid */}
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item, index) => {
            const isActive = item.activePattern.test(pathname)

            return (
              <motion.button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px]"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 0 15px rgba(0, 162, 255, 0.4), 0 0 30px rgba(0, 162, 255, 0.4)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 text-2xl">
                  <motion.span
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      filter: isActive ? 'drop-shadow(0 0 8px rgba(0, 162, 255, 0.4))' : 'none',
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {item.icon}
                  </motion.span>
                </div>

                {/* Label */}
                <motion.span
                  className="relative z-10 text-xs font-medium"
                  animate={{
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    fontWeight: isActive ? 600 : 500,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>

                {/* Active Dot Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: '#00a2ff',
                      boxShadow: '0 0 15px rgba(0, 162, 255, 0.4), 0 0 30px rgba(0, 162, 255, 0.4)',
                    }}
                    initial={{ scale: 0, x: '-50%' }}
                    animate={{ scale: 1, x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
