'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/LocaleProvider'
import { supabaseClient } from '@/lib/supabase'

type ChallengeStatus = 'active' | 'new' | 'completed'
type ChallengeFilter = 'Active' | 'New' | 'Completed'

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  status: ChallengeStatus
  imageUrl: string
}

export default function ChallengesPage() {
  const router = useRouter()
  const { locale } = useLocale()
  const [filter, setFilter] = useState<ChallengeFilter>('Active')
  const [streak, setStreak] = useState(7)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = async () => {
    try {
      const { data } = await supabaseClient
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setChallenges(data as any[])
      } else {
        throw new Error('No data')
      }
    } catch (error) {
      // Use sample data
      setChallenges([
        {
          id: '1',
          title: 'The Daily Roast',
          description: 'Post 5 roasts today',
          progress: 3,
          total: 5,
          reward: '100 Points',
          status: 'active',
          imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop'
        },
        {
          id: '2',
          title: 'Weekly Wit',
          description: 'Get 100 likes this week',
          progress: 1,
          total: 7,
          reward: '500 Points',
          status: 'active',
          imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop'
        },
        {
          id: '3',
          title: 'Master Brewer',
          description: 'Win 10 roast battles',
          progress: 10,
          total: 10,
          reward: 'Badge Unlocked',
          status: 'completed',
          imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop'
        },
        {
          id: '4',
          title: 'First Steps',
          description: 'Create your first roast',
          progress: 0,
          total: 1,
          reward: '50 Points',
          status: 'new',
          imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop'
        },
        {
          id: '5',
          title: 'Social Butterfly',
          description: 'Follow 20 users',
          progress: 0,
          total: 20,
          reward: 'Special Avatar',
          status: 'new',
          imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredChallenges = challenges.filter(c => {
    if (filter === 'Active') return c.status === 'active'
    if (filter === 'New') return c.status === 'new'
    if (filter === 'Completed') return c.status === 'completed'
    return true
  })

  const getGlowColor = (status: ChallengeStatus) => {
    switch (status) {
      case 'active': return 'shadow-[0_0_15px_rgba(0,162,255,0.4),0_0_30px_rgba(0,162,255,0.2)]'
      case 'new': return 'shadow-[0_0_15px_rgba(255,0,255,0.4),0_0_30px_rgba(255,0,255,0.2)]'
      case 'completed': return 'shadow-[0_0_15px_rgba(57,255,20,0.4),0_0_30px_rgba(57,255,20,0.2)]'
    }
  }

  const getBorderColor = (status: ChallengeStatus) => {
    switch (status) {
      case 'active': return 'border-vibrant-blue/20'
      case 'new': return 'border-primary/20'
      case 'completed': return 'border-green-400/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center pb-24">
        <div className="animate-pulse text-gray-400">Loading challenges...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark text-white pb-24">
      {/* Abstract Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pb-2">
          <div className="w-12"></div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white"
          >
            Challenges Hub
          </motion.h1>
          <button
            onClick={() => router.push(`/${locale}/profile`)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-vibrant-blue flex items-center justify-center font-bold"
          >
            R
          </button>
        </header>

        {/* Streak Progress */}
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center px-2">
            <p className="text-white text-base font-medium">Streak</p>
            <p className="text-white/80 text-sm flex items-center gap-1">
              {streak} Day Streak 🔥
            </p>
          </div>
          <div className="h-4 rounded-full bg-white/10 p-0.5 shadow-inner backdrop-blur-sm border border-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(streak / 10) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
              style={{ backgroundSize: '400% 400%' }}
            />
          </div>
        </div>

        {/* Segmented Buttons */}
        <div className="px-4 py-3">
          <div className="flex h-12 items-center justify-center rounded-xl bg-white/5 p-1 backdrop-blur-md border border-white/10 shadow-lg">
            {(['Active', 'New', 'Completed'] as ChallengeFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 h-full rounded-lg px-2 text-sm font-medium transition-all duration-300 ${
                  filter === tab
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Cards */}
        <main className="space-y-4 px-4">
          <AnimatePresence mode="wait">
            {filteredChallenges.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-2xl mb-2">🏆</p>
                <p className="text-gray-400">No {filter.toLowerCase()} challenges</p>
              </motion.div>
            ) : (
              filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative glassmorphic rounded-xl p-4 border ${getBorderColor(challenge.status)} ${getGlowColor(challenge.status)} transition-all duration-300 hover:scale-[1.02] ${
                    challenge.status === 'completed' ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Challenge Image */}
                    <div
                      className="w-full aspect-video bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${challenge.imageUrl})` }}
                    />

                    {/* Challenge Info */}
                    <div className="flex flex-col gap-2">
                      <p className={`text-sm font-medium ${
                        challenge.status === 'completed'
                          ? 'text-green-400'
                          : challenge.status === 'new'
                          ? 'text-primary'
                          : 'text-white/60'
                      }`}>
                        {challenge.status === 'completed'
                          ? 'Completed'
                          : `${challenge.progress}/${challenge.total} Completed`}
                      </p>
                      <p className="text-white text-lg font-bold">{challenge.title}</p>

                      {/* Progress and Action */}
                      <div className="flex items-end gap-3 justify-between mt-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-white/80 text-sm">Reward: {challenge.reward}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: challenge.status !== 'completed' ? 1.05 : 1 }}
                          whileTap={{ scale: challenge.status !== 'completed' ? 0.95 : 1 }}
                          disabled={challenge.status === 'completed'}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            challenge.status === 'completed'
                              ? 'bg-green-500/50 border border-green-400/30 text-white cursor-default'
                              : 'bg-primary/80 border border-white/10 text-white hover:bg-primary shadow-md'
                          }`}
                        >
                          {challenge.status === 'completed' ? 'Claimed' : 'View'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
