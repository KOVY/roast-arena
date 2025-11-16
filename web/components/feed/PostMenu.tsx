'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

interface PostMenuProps {
  post: {
    id: string
    author: {
      id?: string
      username: string
    }
  }
  currentUserId?: string
  onFollow?: () => void
  onUnfollow?: () => void
  onAddToList?: () => void
  onReport?: () => void
  onDelete?: () => void
  onEdit?: () => void
  onBookmark?: () => void
  isFollowing?: boolean
  isBookmarked?: boolean
}

export default function PostMenu({
  post,
  currentUserId,
  onFollow,
  onUnfollow,
  onAddToList,
  onReport,
  onDelete,
  onEdit,
  onBookmark,
  isFollowing = false,
  isBookmarked = false,
}: PostMenuProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isOwnPost = currentUserId === post.author.id

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuItems = [
    // Own post actions
    ...(isOwnPost
      ? [
          {
            label: t('postMenu.edit'),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            ),
            action: () => {
              onEdit?.()
              setIsOpen(false)
            },
            color: 'text-vibrant-blue',
          },
          {
            label: t('postMenu.delete'),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ),
            action: () => {
              onDelete?.()
              setIsOpen(false)
            },
            color: 'text-red-500',
          },
        ]
      : [
          // Other user's post actions
          {
            label: isFollowing ? t('postMenu.unfollow') : t('postMenu.follow'),
            icon: isFollowing ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            ),
            action: () => {
              isFollowing ? onUnfollow?.() : onFollow?.()
              setIsOpen(false)
            },
            color: isFollowing ? 'text-gray-400' : 'text-vibrant-blue',
          },
          {
            label: t('postMenu.addToList'),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            ),
            action: () => {
              onAddToList?.()
              setIsOpen(false)
            },
            color: 'text-gray-300',
          },
        ]),
    // Common actions
    {
      label: isBookmarked ? t('postMenu.removeBookmark') : t('postMenu.bookmark'),
      icon: (
        <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      action: () => {
        onBookmark?.()
        setIsOpen(false)
      },
      color: isBookmarked ? 'text-yellow-500' : 'text-gray-300',
    },
    {
      label: t('postMenu.copyLink'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        const url = `${window.location.origin}/roast/${post.id}`
        navigator.clipboard.writeText(url)
        setIsOpen(false)
      },
      color: 'text-gray-300',
    },
    // Report (always last, except for own posts)
    ...(!isOwnPost
      ? [
          {
            label: t('postMenu.report'),
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ),
            action: () => {
              onReport?.()
              setIsOpen(false)
            },
            color: 'text-red-500',
          },
        ]
      : []),
  ]

  return (
    <div ref={menuRef} className="relative">
      {/* Three-dot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-white/5 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[1000] backdrop-blur-lg"
          >
            <div className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3
                    hover:bg-white/5 transition-colors
                    ${item.color}
                  `}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
