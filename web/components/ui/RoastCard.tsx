'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Roast } from '@/shared/types/roast'
import { supabaseClient } from '@/lib/supabase'

interface RoastCardProps {
  roast: Roast
  featured?: boolean
}

export default function RoastCard({ roast, featured = false }: RoastCardProps) {
  const [likes, setLikes] = useState(roast.likes)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLiking) return

    setIsLiking(true)
    const newLikes = likes + 1
    setLikes(newLikes)

    try {
      await supabaseClient
        .from('roasts')
        .update({ likes: newLikes })
        .eq('id', roast.id)
    } catch (error) {
      console.error('Failed to update likes:', error)
      setLikes(likes)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Link href={`/roast/${roast.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`glass rounded-xl p-6 card-hover ${
          featured ? 'border-2 border-orange-500/50' : ''
        }`}
      >
        <div className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">
                {roast.author?.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <p className="font-medium">
                {roast.author?.name || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(roast.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Roast Text */}
          <p className={`text-gray-200 ${featured ? 'text-xl' : 'text-base'}`}>
            {roast.text}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition"
              disabled={isLiking}
            >
              <svg
                className="w-5 h-5"
                fill={isLiking ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>

            {roast.echo_count !== undefined && (
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{roast.echo_count}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
