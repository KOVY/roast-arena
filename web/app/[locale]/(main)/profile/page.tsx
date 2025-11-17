'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/supabase'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'
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

interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: boolean;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function ProfilePage() {
  const { currencySymbol } = useLocale()
  const { t } = useTranslation()
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
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
    loadLeaderboard()
    loadAchievements()
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

  const loadAchievements = async () => {
    try {
      // Sample achievements data
      setAchievements([
        { id: 1, title: t('profile.achievements.firstRoast'), description: t('profile.achievements.firstRoastDesc'), earned: true, icon: '🔥', rarity: 'common' },
        { id: 2, title: t('profile.achievements.hundredRoasts'), description: t('profile.achievements.hundredRoastsDesc'), earned: true, icon: '💯', rarity: 'rare' },
        { id: 3, title: t('profile.achievements.winningStreak'), description: t('profile.achievements.winningStreakDesc'), earned: true, icon: '🔥', rarity: 'rare' },
        { id: 4, title: t('profile.achievements.echoChampion'), description: t('profile.achievements.echoChampionDesc'), earned: false, icon: '💬', rarity: 'epic' },
        { id: 5, title: t('profile.achievements.giftMaster'), description: t('profile.achievements.giftMasterDesc'), earned: false, icon: '🎁', rarity: 'epic' },
        { id: 6, title: t('profile.achievements.levelMaster'), description: t('profile.achievements.levelMasterDesc'), earned: false, icon: '👑', rarity: 'legendary' },
      ])
    } catch (error) {
      console.warn('Failed to load achievements')
    }
  }

  const progressPercentage = (profile.experience / profile.next_level_xp) * 100;

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-yellow-600'
      case 'epic': return 'from-purple-500 to-purple-700'
      case 'rare': return 'from-blue-400 to-blue-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="animate-pulse text-gray-400">{t('profile.loading')}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff6b35]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f7931e]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-[#c73866]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,107,53,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            {t('profile.title')}
          </h1>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <svg className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,107,53,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Profile Card with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphic rounded-3xl p-6 flex flex-col items-center border border-white/10 shadow-lg hover:shadow-[#ff6b35]/10 transition-all"
          >
            {/* Avatar with Neon Halo */}
            <div className="relative mb-4">
              <motion.div
                className="absolute -inset-2 rounded-full opacity-70 blur-md bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center text-5xl font-bold border-2 border-white/20 shadow-lg">
                {profile.username[0]}
              </div>
            </div>

            {/* User Info with Enhanced Styling */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <p className="text-3xl font-black tracking-tighter bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                {profile.username}
              </p>
              <p className="text-[#f7931e] text-base">@roaster</p>
              <p className="text-white/70 text-center max-w-xs">
                {t('profile.bio')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold border border-white/15 hover:bg-white/20 transition-all"
              >
                {t('profile.editProfile')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-bold shadow-md shadow-[#ff6b35]/30 hover:shadow-[#ff6b35]/50 transition-all"
              >
                {t('profile.share')}
              </motion.button>
            </div>

            {/* Level Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 rounded-full border border-[#ff6b35]/20">
              <span className="text-[#ff6b35] text-lg">🏆</span>
              <span className="text-white font-bold">{t('profile.level')}: {profile.level}</span>
            </div>
          </motion.div>

          {/* Progress Bar with Enhanced Design */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-base font-bold text-white">{t('profile.nextLevel')}</p>
              <p className="text-sm text-[#f7931e] font-bold">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] via-[#f7931e] to-[#c73866]"
              />
            </div>
          </div>

          {/* Stats Cards with Improved Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphic rounded-2xl p-4 flex flex-col items-center text-center border border-white/10"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                {profile.total_roasts}
              </p>
              <p className="text-white/70 text-xs mt-1">{t('profile.stats.roasts')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphic rounded-2xl p-4 flex flex-col items-center text-center border border-white/10"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-[#f7931e] to-[#c73866] bg-clip-text text-transparent">
                {profile.win_streak}
              </p>
              <p className="text-white/70 text-xs mt-1">{t('profile.stats.roastsWon')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphic rounded-2xl p-4 flex flex-col items-center text-center border border-white/10"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-[#c73866] to-[#4ecdc4] bg-clip-text text-transparent">
                {profile.total_echoes}
              </p>
              <p className="text-white/70 text-xs mt-1">{t('profile.stats.echoes')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphic rounded-2xl p-4 flex flex-col items-center text-center border border-white/10"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-[#4ecdc4] to-[#ff6b35] bg-clip-text text-transparent">
                {profile.coins}
              </p>
              <p className="text-white/70 text-xs mt-1">{t('profile.stats.gifts')}</p>
            </motion.div>
          </div>

          {/* Achievements Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
              {t('profile.achievements.title')}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-3 flex flex-col items-center text-center ${
                    achievement.earned
                      ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-0.5`
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-full h-full rounded-xl ${
                    achievement.earned ? 'bg-black/90' : 'bg-black/90'
                  } flex flex-col items-center p-3`}>
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <h3 className={`font-bold text-sm ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs mt-1 ${achievement.earned ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4ecdc4] to-[#ff6b35] bg-clip-text text-transparent">
              {t('profile.recentActivity')}
            </h2>

            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -3 }}
                className="glassmorphic rounded-2xl p-4 flex items-center gap-4 border border-white/10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white">
                  🔥
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{t('profile.activities.roastBattle')} @CyberSlayer</p>
                  <p className="text-gray-400 text-sm">{t('profile.latestRoasts')}</p>
                </div>
                <p className="text-gray-400 text-sm">{t('profile.timeAgo.hour')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -3 }}
                className="glassmorphic rounded-2xl p-4 flex items-center gap-4 border border-white/10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#c73866] to-[#4ecdc4] text-white">
                  🏆
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{t('profile.activities.wonRoast')} @ComedyKing</p>
                  <p className="text-gray-400 text-sm">{t('profile.latestRoasts')}</p>
                </div>
                <p className="text-gray-400 text-sm">{t('profile.timeAgo.hours').replace('{hours}', '2')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -3 }}
                className="glassmorphic rounded-2xl p-4 flex items-center gap-4 border border-white/10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#4ecdc4] to-[#ff6b35] text-white">
                  💬
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{t('profile.activities.commented')} @PixelPunisher's roast</p>
                  <p className="text-gray-400 text-sm">{t('profile.community')}</p>
                </div>
                <p className="text-gray-400 text-sm">{t('profile.timeAgo.hours').replace('{hours}', '5')}</p>
              </motion.div>
            </div>
          </div>

          {/* Leaderboards */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#c73866] to-[#4ecdc4] bg-clip-text text-transparent">
              {t('profile.leaderboards')}
            </h2>

            {/* Tabs */}
            <div className="flex w-full rounded-xl bg-white/10 p-1">
              <button
                onClick={() => setLeaderboardType('global')}
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                  leaderboardType === 'global'
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-md shadow-[#ff6b35]/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t('profile.globalLeaderboard')}
              </button>
              <button
                onClick={() => setLeaderboardType('local')}
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                  leaderboardType === 'local'
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white shadow-md shadow-[#ff6b35]/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t('profile.localLeaderboard')}
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
                  className={`flex items-center gap-4 rounded-2xl p-4 ${
                    entry.is_current_user ? 'bg-gradient-to-r from-[#ff6b35]/20 to-[#f7931e]/20 border border-[#ff6b35]/30' : 'bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-white' :
                    'bg-gradient-to-br from-[#ff6b35] to-[#f7931e]'
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center font-bold">
                      {entry.username[0]}
                    </div>
                    <p className={`font-bold ${entry.is_current_user ? 'text-white' : 'text-gray-200'}`}>
                      {entry.username}
                    </p>
                  </div>
                  <p className={`font-bold ${entry.is_current_user ? 'text-[#ff6b35]' : 'text-gray-300'}`}>
                    {entry.score.toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creator Wallet - Jobsian redesign */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-black rounded-3xl p-6 flex flex-col gap-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-400">
                {t('profile.creatorWalletTitle', 'Váš Zisk')}
              </h2>
              {profile.earnings > 0 && (
                <span className="text-xs px-2 py-1 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full">
                  {t('profile.active', 'Aktivní')}
                </span>
              )}
            </div>

            {/* Balance display */}
            <div className="text-center py-6">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {currencySymbol} {profile.earnings.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">
                {t('profile.totalEarnings', 'Celkové výdělky')}
              </p>
            </div>

            {/* Verification status */}
            {profile.earnings > 100 ? ( // Assuming threshold for payout
              <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800">
                <div className="flex items-center">
                  <div className="mr-3 text-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">{t('profile.verified', 'Ověřeno')}</p>
                    <p className="text-gray-400 text-sm">{t('profile.readyForPayout', 'Připraveno k výplatě')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800">
                <div className="flex items-center">
                  <div className="mr-3 text-yellow-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">{t('profile.accountSetup', 'Nastavení účtu')}</p>
                    <p className="text-gray-400 text-sm">{t('profile.needToSetup', 'Je potřeba nastavit bankovní účet')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payout button - only shown if verified and > threshold */}
            {profile.earnings > 100 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-xl font-bold text-white shadow-lg shadow-[#ff6b35]/30 hover:shadow-[#ff6b35]/50"
              >
                {t('profile.payoutNow', 'VYPLATIT ZŮSTATEK')}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gray-800 text-gray-500 rounded-xl font-bold"
                disabled
              >
                {t('profile.needMoreEarnings', 'Potřebujete více výdělků')}
              </motion.button>
            )}

            {/* Connect bank account button - shown when needed */}
            {profile.earnings <= 100 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border border-gray-700 text-white rounded-xl font-bold hover:bg-gray-800/50 transition-colors"
              >
                {t('profile.connectBank', 'Připojit bankovní účet')}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
