'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/supabase'
import { Challenge } from '@/shared/types/pizzeria'
import HaloButton from '@/components/ui/HaloButton'
import { motion } from 'framer-motion'

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('challenges')
        .select(`
          id,
          title,
          reward,
          created_at,
          pizzeria:pizzeria_id (
            id,
            name,
            location
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setChallenges(data as any[])
    } catch (error) {
      console.warn('Failed to load challenges (using sample data):', error)
      // Use sample data if Supabase is not available
      setChallenges([
        {
          id: '1',
          title: 'Best Roast of the Week',
          reward: '🍕 Free Pizza',
          pizzeria: { name: 'Pizza Top', location: 'Prague' }
        },
        {
          id: '2',
          title: 'Spicy Roast Challenge',
          reward: '🔥 50 Credits',
          pizzeria: { name: 'Napoli House', location: 'Brno' }
        },
        {
          id: '3',
          title: 'Funny Roast Master',
          reward: '🎁 Special Gift',
          pizzeria: { name: 'Pizza Arena', location: 'Ostrava' }
        }
      ] as any[])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading challenges...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Challenges Hub
        </h1>
        <p className="text-gray-400">
          Complete roast challenges and win rewards from pizzerias
        </p>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">🏆</p>
          <p className="text-gray-400">No challenges available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 card-hover"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {challenge.title}
                    </h3>
                    {challenge.pizzeria && (
                      <p className="text-sm text-gray-400">
                        by {challenge.pizzeria.name}
                      </p>
                    )}
                  </div>
                  <div className="text-2xl">🍕</div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Reward</p>
                  <p className="text-lg font-bold text-orange-500">
                    {challenge.reward}
                  </p>
                </div>

                <HaloButton className="w-full">
                  Accept Challenge
                </HaloButton>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
