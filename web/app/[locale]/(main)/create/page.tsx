'use client'

export const dynamic = 'force-dynamic'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'
import { supabaseClient } from '@/lib/supabase'
import generateRoast from '@/lib/ai'
import BottomNav from '@/components/layout/BottomNav'

const MAX_CHARS = 500

export default function CreatePage() {
  const router = useRouter()
  const { locale } = useLocale()
  const { t } = useTranslation()
  const [content, setContent] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [style, setStyle] = useState<'playful' | 'roast' | 'sarcastic'>('playful')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePost = async () => {
    if (!content.trim() || loading) return

    setLoading(true)
    try {
      const { data: { user } } = await supabaseClient.auth.getUser()

      if (!user) {
        alert('Please sign in to post a roast')
        return
      }

      const { error } = await supabaseClient
        .from('roasts')
        .insert([{
          content: content.trim(),
          author_id: user.id
        }])

      if (error) throw error

      // Success - redirect to feed
      router.push(`/${locale}/feed`)
    } catch (error) {
      console.warn('Failed to post roast:', error)
      alert('Failed to post roast. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAIGenerate = async () => {
    if (!content.trim() || aiLoading) return

    setAiLoading(true)
    try {
      const generated = await generateRoast(content, style)
      setContent(generated)
    } catch (error) {
      console.warn('Failed to generate roast:', error)
      alert('AI generation failed. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleMediaClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Handle file upload
      console.log('File selected:', file.name)
    }
  }

  const charsRemaining = MAX_CHARS - content.length
  const isOverLimit = charsRemaining < 0
  const canPost = content.trim().length > 0 && !isOverLimit && !loading

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff6b35]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f7931e]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-[#c73866]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-[#ff6b35]/30 shadow-lg shadow-[#ff6b35]/10">
        <div className="flex items-center justify-between p-4">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          <motion.h1
            className="text-lg font-bold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('roastCreator.pageTitle')}
          </motion.h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.div
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center font-bold text-xl"
            whileHover={{ scale: 1.05 }}
          >
            {t('roastCreator.userName')[0]}
          </motion.div>
          <div>
            <p className="font-bold text-white">{t('roastCreator.userName')}</p>
            <p className="text-sm text-gray-400">{t('roastCreator.userSubtitle')}</p>
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 20px 8px rgba(255, 107, 53, 0.3)'
              : '0 0 0 0 rgba(255, 107, 53, 0)'
          }}
          transition={{ duration: 0.3 }}
          className="glassmorphic rounded-2xl overflow-hidden mb-6 border border-white/10"
          whileHover={{ y: -2 }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t('roastCreator.placeholder')}
            className="w-full min-h-[200px] p-5 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-lg"
            maxLength={MAX_CHARS + 50} // Allow typing a bit over to show error
          />

          {/* Character Counter */}
          <div className="px-5 pb-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleMediaClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-[#f7931e]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-[#ff6b35]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            </div>

            <motion.span
              className={`text-sm font-bold ${
                isOverLimit
                  ? 'text-red-400'
                  : charsRemaining < 50
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
              animate={{ scale: isOverLimit ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {charsRemaining}
            </motion.span>
          </div>
        </motion.div>

        {/* Style Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphic rounded-2xl p-5 mb-6 border border-white/10"
        >
          <p className="text-sm font-bold mb-4 text-gray-300">{t('roastCreator.styleLabel')}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'playful', labelKey: 'roastCreator.styles.playful', color: 'from-green-500 to-emerald-500' },
              { value: 'roast', labelKey: 'roastCreator.styles.roast', color: 'from-[#ff6b35] to-[#c73866]' },
              { value: 'sarcastic', labelKey: 'roastCreator.styles.sarcastic', color: 'from-[#c73866] to-[#4ecdc4]' }
            ].map((s) => (
              <motion.button
                key={s.value}
                onClick={() => setStyle(s.value as any)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all ${
                  style === s.value
                    ? `bg-gradient-to-r ${s.color} text-white shadow-lg shadow-[#ff6b35]/30`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
                animate={{
                  boxShadow: style === s.value ? '0 0 15px rgba(255, 107, 53, 0.5)' : 'none'
                }}
              >
                {t(s.labelKey)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAIGenerate}
          disabled={!content.trim() || aiLoading}
          className="w-full py-4 px-6 rounded-2xl font-bold mb-6 bg-gradient-to-r from-[#f7931e] to-[#c73866] text-white shadow-lg shadow-[#f7931e]/30 hover:shadow-[#f7931e]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {aiLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t('roastCreator.generatingAI')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🤖</span>
              {t('roastCreator.enhanceWithAI')}
            </span>
          )}
        </motion.button>

        {/* Post Button */}
        <motion.button
          whileHover={{ scale: canPost ? 1.03 : 1 }}
          whileTap={{ scale: canPost ? 0.98 : 1 }}
          onClick={handlePost}
          disabled={!canPost}
          className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-bold text-lg shadow-xl shadow-[#ff6b35]/40 hover:shadow-[#ff6b35]/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t('roastCreator.posting')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🔥</span>
              {t('roastCreator.postButton')}
            </span>
          )}
        </motion.button>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#c73866]/10 to-[#4ecdc4]/10 border border-[#c73866]/20"
        >
          <p className="text-sm text-gray-300">
            <span className="font-bold text-[#f7931e]">{t('roastCreator.proTip')}</span> {t('roastCreator.proTipText')}
          </p>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
