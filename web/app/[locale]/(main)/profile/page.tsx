'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/supabase'
import { useLocale } from '@/components/providers/LocaleProvider'
import { motion } from 'framer-motion'
import BottomNav from '@/components/layout/BottomNav'

interface ProfileData {
  username: string
  avatar_url?: string
  level: number
  win_streak: number
  total_echoes: number
  total_roasts: number
  earnings: number
  coins: number
  experience: number
  next_level_xp: number
}

interface LeaderboardEntry {
  rank: number
  username: string
  avatar_url: string
  score: number
  is_current_user?: boolean
}

export default function ProfilePage() {
  const { currencySymbol } = useLocale()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<ProfileData>({
    username: 'RoastMaster_77',
    level: 12,
    win_streak: 5,
    total_echoes: 1204,
    total_roasts: 120,
    earnings: 850,
    coins: 1500,
    experience: 6500,
    next_level_xp: 10000,
  })
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [leaderboardType, setLeaderboardType] = useState<'global' | 'local'>('global')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
    loadLeaderboard()
  }, [leaderboardType])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (user) {
        setUser(user)

        const { data: profileData } = await supabaseClient
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileData) {
          setProfile({
            username: profileData.username || 'RoastMaster_77',
            level: Math.floor((profileData.total_roasts || 0) / 10) + 1,
            win_streak: profileData.streak || 5,
            total_echoes: profileData.total_echoes || 1204,
            total_roasts: profileData.total_roasts || 120,
            earnings: (profileData.earnings || 0) / 100,
            coins: profileData.credits || 1500,
            experience: (profileData.total_roasts || 0) * 100,
            next_level_xp: 10000,
          })
        }
      }
    } catch (error) {
      console.warn('Failed to load profile, using sample data')
    } finally {
      setLoading(false)
    }
  }

  const loadLeaderboard = async () => {
    try {
      // Sample leaderboard data
      setLeaderboard([
        { rank: 1, username: 'EchoQueen', avatar_url: '', score: 15670 },
        { rank: 2, username: 'SavageSaiyan', avatar_url: '', score: 14231 },
        { rank: 2345, username: 'You', avatar_url: '', score: 2450, is_current_user: true },
      ])
    } catch (error) {
      console.warn('Failed to load leaderboard')
    }
  }

  const progressPercentage = (profile.experience / profile.next_level_xp) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark text-white pb-24 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-blue-900/50 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-purple-900/50 opacity-50 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-opacity hover:opacity-80">
            <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">Profile</h1>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-opacity hover:opacity-80">
            <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphic rounded-xl p-6 flex flex-col gap-4 items-center"
          >
            {/* Avatar with Neon Halo */}
            <div className="relative">
              {/* Neon Halo Effects */}
              <div className="absolute inset-0 rounded-full animate-pulse">
                <div className="absolute -inset-[5px] rounded-full bg-primary/60 filter blur-xl"></div>
                <div className="absolute -inset-[10px] rounded-full bg-vibrant-blue/40 filter blur-2xl"></div>
              </div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-vibrant-blue flex items-center justify-center text-5xl font-bold border-2 border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                {profile.username[0]}
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(175,37,244,0.5)]">
                {profile.username}
              </p>
              <p className="text-vibrant-blue text-base">@roaster</p>
              <p className="text-white/70 text-sm text-center max-w-sm">
                Champion of the digital arena. Here to serve up sizzling commentary and collect wins.
              </p>
            </div>

          {/* Action Buttons */}
          <div className="w-full max-w-md flex gap-3">
            <button className="flex-1 py-2.5 rounded-lg bg-white/10 text-white text-sm font-bold border border-white/15 hover:bg-white/20 transition-all">
              Edit Profile
            </button>
            <button className="flex-1 py-2.5 rounded-lg bg-vibrant-blue text-background-dark text-sm font-bold shadow-[0_0_15px_rgba(0,162,255,0.6)] hover:shadow-[0_0_25px_rgba(0,162,255,0.8)] transition-all">
              Share
            </button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-base font-medium">Next Level</p>
            <p className="text-sm text-purple-300">{Math.round(progressPercentage)}%</p>
          </div>
          <div className="w-full h-2 rounded-full bg-primary/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-2 rounded-full bg-primary"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glassmorphic rounded-xl p-4 flex flex-col gap-2 items-center text-center"
          >
            <p className="text-white text-2xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {profile.total_roasts}
            </p>
            <p className="text-white/60 text-xs">Roasts Won</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glassmorphic rounded-xl p-4 flex flex-col gap-2 items-center text-center"
          >
            <p className="text-white text-2xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {(profile.total_echoes / 1000).toFixed(1)}K
            </p>
            <p className="text-white/60 text-xs">Followers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glassmorphic rounded-xl p-4 flex flex-col gap-2 items-center text-center"
          >
            <p className="text-white text-2xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {profile.level}
            </p>
            <p className="text-white/60 text-xs">Ranking</p>
          </motion.div>
        </div>

        {/* Activity Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphic rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/30 text-vibrant-blue drop-shadow-[0_0_8px_rgba(0,162,255,0.6)]">
                🔥
              </div>
              <div className="flex-1">
                <p className="text-white text-base font-medium">Epic roast battle vs @CyberSlayer</p>
                <p className="text-white/60 text-sm">Latest Roasts</p>
              </div>
              <p className="text-white/60 text-sm">1h ago</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glassmorphic rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/30 text-vibrant-blue drop-shadow-[0_0_8px_rgba(0,162,255,0.6)]">
                🏆
              </div>
              <div className="flex-1">
                <p className="text-white text-base font-medium">Won a roast against @ComedyKing</p>
                <p className="text-white/60 text-sm">Latest Roasts</p>
              </div>
              <p className="text-white/60 text-sm">2h ago</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glassmorphic rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/30 text-vibrant-blue drop-shadow-[0_0_8px_rgba(0,162,255,0.6)]">
                💬
              </div>
              <div className="flex-1">
                <p className="text-white text-base font-medium">Commented on @PixelPunisher's roast</p>
                <p className="text-white/60 text-sm">Community</p>
              </div>
              <p className="text-white/60 text-sm">5h ago</p>
            </motion.div>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Leaderboards</h2>

          {/* Tabs */}
          <div className="flex w-full rounded-lg bg-primary/20 p-1">
            <button
              onClick={() => setLeaderboardType('global')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-colors ${
                leaderboardType === 'global'
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setLeaderboardType('local')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-colors ${
                leaderboardType === 'local'
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Czech
            </button>
          </div>

          {/* Leaderboard List */}
          <div className="flex flex-col gap-3">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 rounded-lg p-3 ${
                  entry.is_current_user ? 'bg-primary/20' : ''
                }`}
              >
                <p className={`w-6 text-center text-sm font-medium ${
                  entry.is_current_user ? 'text-white' : 'text-purple-300'
                }`}>
                  {entry.rank}
                </p>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-vibrant-blue flex items-center justify-center font-bold">
                  {entry.username[0]}
                </div>
                <p className={`flex-1 ${entry.is_current_user ? 'font-bold' : 'font-medium'}`}>
                  {entry.username}
                </p>
                <p className={`font-bold ${entry.is_current_user ? 'text-white' : 'text-primary'}`}>
                  {entry.score.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* My Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glassmorphic rounded-xl p-6 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold">My Wallet</h2>
          <div className="flex items-center justify-between">
            <p className="text-white/60">Balance</p>
            <p className="text-2xl font-bold flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <span className="text-yellow-400">💰</span>
              {profile.coins.toLocaleString()} Coins
            </p>
          </div>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-vibrant-blue to-primary text-white font-bold shadow-[0_0_15px_rgba(0,162,255,0.6)] hover:shadow-[0_0_25px_rgba(0,162,255,0.8)] transition-all">
            Claim Rewards
          </button>
        </motion.div>
      </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
