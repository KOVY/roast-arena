'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'
import { supabaseClient } from '@/lib/supabase'

interface GiftType {
  id: string
  name_key: string
  emoji: string
  price_czk: number
  price_eur: number
  price_usd: number
  price_pln: number
}

interface GiftModalProps {
  isOpen: boolean
  onClose: () => void
  roastId: string
  roastAuthorId: string
  roastAuthorName: string
}

export default function GiftModal({
  isOpen,
  onClose,
  roastId,
  roastAuthorId,
  roastAuthorName
}: GiftModalProps) {
  const { currency, currencySymbol } = useLocale()
  const { t } = useTranslation()
  const [giftTypes, setGiftTypes] = useState<GiftType[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadGiftTypes()
    }
  }, [isOpen])

  const loadGiftTypes = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('gift_types')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setGiftTypes(data || [])
    } catch (error) {
      console.error('Failed to load gift types:', error)
      // Fallback to hardcoded gift types
      setGiftTypes([
        {
          id: '1',
          name_key: 'gifts.boxerky',
          emoji: '🩲',
          price_czk: 10,
          price_eur: 0.4,
          price_usd: 0.45,
          price_pln: 1.8
        },
        {
          id: '2',
          name_key: 'gifts.ponozky',
          emoji: '🧦',
          price_czk: 25,
          price_eur: 1,
          price_usd: 1.1,
          price_pln: 4.5
        },
        {
          id: '3',
          name_key: 'gifts.pivo',
          emoji: '🍺',
          price_czk: 50,
          price_eur: 2,
          price_usd: 2.2,
          price_pln: 9
        },
        {
          id: '4',
          name_key: 'gifts.trofej',
          emoji: '🏆',
          price_czk: 100,
          price_eur: 4,
          price_usd: 4.4,
          price_pln: 18
        },
        {
          id: '5',
          name_key: 'gifts.koruna',
          emoji: '👑',
          price_czk: 250,
          price_eur: 10,
          price_usd: 11,
          price_pln: 45
        },
        {
          id: '6',
          name_key: 'gifts.diamant',
          emoji: '💎',
          price_czk: 500,
          price_eur: 20,
          price_usd: 22,
          price_pln: 90
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getPrice = (gift: GiftType): number => {
    switch (currency) {
      case 'EUR':
        return gift.price_eur
      case 'USD':
        return gift.price_usd
      case 'PLN':
        return gift.price_pln
      case 'CZK':
      default:
        return gift.price_czk
    }
  }

  const handleSendGift = async (gift: GiftType) => {
    setSending(true)
    setSelectedGift(gift)

    try {
      const price = getPrice(gift)

      // Call API to send gift
      const response = await fetch('/api/gifts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roastId,
          roastAuthorId,
          giftTypeId: gift.id,
          amount: price,
          currency
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send gift')
      }

      // Show success animation
      setTimeout(() => {
        onClose()
        setSending(false)
        setSelectedGift(null)
        // TODO: Show toast notification
        alert(t('gifts.giftSent'))
      }, 1500)
    } catch (error: any) {
      console.error('Error sending gift:', error)
      alert(error.message || t('common.error'))
      setSending(false)
      setSelectedGift(null)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glassmorphic rounded-t-3xl md:rounded-3xl w-full max-w-lg mx-4 mb-0 md:mb-4 p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-vibrant-blue bg-clip-text text-transparent">
                {t('gifts.selectGift')}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {t('gifts.sendGift')} {roastAuthorName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Revenue Split Info */}
          <div className="glassmorphic rounded-lg p-3 mb-6 border border-primary/20">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>{t('gifts.revenueShare.split')}: 60% {t('gifts.revenueShare.author')}, 40% {t('gifts.revenueShare.platform')}</span>
            </div>
          </div>

          {/* Gift Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {giftTypes.map((gift, index) => {
                const price = getPrice(gift)
                const isSelected = selectedGift?.id === gift.id
                const authorShare = (price * 0.6).toFixed(2)

                return (
                  <motion.button
                    key={gift.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendGift(gift)}
                    disabled={sending}
                    className={`glassmorphic rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-all duration-300 relative overflow-hidden ${
                      isSelected ? 'border-2 border-primary shadow-primary-glow' : 'border border-white/10'
                    }`}
                  >
                    {/* Gift Emoji */}
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className="text-5xl"
                    >
                      {gift.emoji}
                    </motion.div>

                    {/* Gift Name */}
                    <div className="text-center">
                      <p className="font-bold text-sm">{t(gift.name_key)}</p>
                      <p className="text-lg font-bold text-primary mt-1">
                        {currencySymbol}{price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t('gifts.revenueShare.author')}: {currencySymbol}{authorShare}
                      </p>
                    </div>

                    {/* Sending Animation */}
                    {isSelected && sending && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-xl"
                      >
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 text-center text-xs text-gray-400">
            <p>{t('gifts.payout.notEligible')}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
