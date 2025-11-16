'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'
import { supabaseClient } from '@/lib/supabase'
import BottomNav from '@/components/layout/BottomNav'

interface UserStats {
  total_earnings: number
  gifts_sent_count: number
  payout_eligible: boolean
  username: string
}

export default function PayoutPage() {
  const { currencySymbol, currency } = useLocale()
  const { t } = useTranslation()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)

  useEffect(() => {
    loadUserStats()
  }, [])

  const loadUserStats = async () => {
    try {
      // TODO: Get current user from session
      // For MVP, we'll use a dummy user ID
      const userId = 'dummy-user-id'

      const { data, error } = await supabaseClient
        .from('users')
        .select('username, total_earnings, gifts_sent_count, payout_eligible')
        .eq('id', userId)
        .single()

      if (error) throw error

      setStats(data)
    } catch (error) {
      console.error('Failed to load user stats:', error)
      // Fallback to sample data
      setStats({
        username: 'DemoUser',
        total_earnings: 245.50,
        gifts_sent_count: 7,
        payout_eligible: true
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPayout = async () => {
    if (!stats?.payout_eligible) {
      alert(t('gifts.payout.notEligible'))
      return
    }

    setRequesting(true)

    try {
      // TODO: Implement actual payout API
      // For MVP, just show success message
      await new Promise(resolve => setTimeout(resolve, 2000))

      alert(`${t('gifts.payout.processing')} ${currencySymbol}${stats.total_earnings.toFixed(2)}`)
    } catch (error) {
      console.error('Payout request failed:', error)
      alert(t('common.error'))
    } finally {
      setRequesting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    )
  }

  const isEligible = stats && stats.gifts_sent_count >= 3
  const requiredGifts = 3

  return (
    <div className="min-h-screen bg-background-dark text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background-dark/80 border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-vibrant-blue bg-clip-text text-transparent">
            {t('profile.withdraw')}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphic rounded-xl p-6"
        >
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm mb-2">{t('profile.earnings')}</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-primary to-vibrant-blue bg-clip-text text-transparent">
              {currencySymbol}{stats?.total_earnings.toFixed(2) || '0.00'}
            </p>
          </div>

          {/* Revenue Split Explanation */}
          <div className="glassmorphic rounded-lg p-4 mb-6 border border-primary/20">
            <p className="text-xs text-gray-300 mb-2">ℹ️ {t('gifts.revenueShare.split')}</p>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-400">{t('gifts.revenueShare.author')}</p>
                <p className="text-primary font-bold">60%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">{t('gifts.revenueShare.platform')}</p>
                <p className="text-gray-400 font-bold">40%</p>
              </div>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className={`glassmorphic rounded-lg p-4 mb-6 border ${
            isEligible ? 'border-green-500/50 bg-green-500/10' : 'border-yellow-500/50 bg-yellow-500/10'
          }`}>
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {isEligible ? '✅' : '⚠️'}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">
                  {isEligible ? t('gifts.payout.eligible') : t('gifts.payout.notEligible')}
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-300">{t('gifts.payout.sentCount')}</span>
                      <span className={`font-bold ${
                        (stats?.gifts_sent_count || 0) >= requiredGifts ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {stats?.gifts_sent_count || 0} / {requiredGifts}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          (stats?.gifts_sent_count || 0) >= requiredGifts ? 'bg-green-400' : 'bg-yellow-400'
                        }`}
                        style={{ width: `${Math.min(((stats?.gifts_sent_count || 0) / requiredGifts) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  {!isEligible && (
                    <p className="text-xs text-gray-400 mt-2">
                      {t('gifts.payout.requiredCount')}: {requiredGifts - (stats?.gifts_sent_count || 0)} {t('common.more')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payout Button */}
          <motion.button
            whileHover={isEligible ? { scale: 1.02 } : {}}
            whileTap={isEligible ? { scale: 0.98 } : {}}
            onClick={handleRequestPayout}
            disabled={!isEligible || requesting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              isEligible
                ? 'bg-gradient-to-r from-primary to-vibrant-blue hover:shadow-primary-glow'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            {requesting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>{t('gifts.payout.processing')}</span>
              </div>
            ) : (
              t('gifts.payout.requestPayout')
            )}
          </motion.button>

          {/* Note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            {t('monetization.withdrawNote')}
          </p>
        </motion.div>

        {/* Recent Gifts Received */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphic rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">{t('profile.stats.gifts')} {t('common.received')}</h2>
          <p className="text-gray-400 text-sm text-center py-8">
            {t('common.comingSoon')}
          </p>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
