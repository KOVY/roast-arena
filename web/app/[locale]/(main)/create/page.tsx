'use client'

export const dynamic = 'force-dynamic'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/LocaleProvider'
import { supabaseClient } from '@/lib/supabase'
import generateRoast from '@/lib/ai'

const MAX_CHARS = 500

export default function CreatePage() {
  const router = useRouter()
  const { locale } = useLocale()
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
    <div className="min-h-screen bg-background-dark text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background-dark/80 border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">Create Roast</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4">
        {/* Profile */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-vibrant-blue flex items-center justify-center font-bold text-lg">
            R
          </div>
          <div>
            <p className="font-bold">RoastMaster</p>
            <p className="text-sm text-gray-400">Share your thoughts...</p>
          </div>
        </div>

        {/* Textarea */}
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 20px 8px rgba(0, 162, 255, 0.3)'
              : '0 0 0 0 rgba(0, 162, 255, 0)'
          }}
          transition={{ duration: 0.3 }}
          className="glassmorphic rounded-xl overflow-hidden mb-4"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's on your mind? Drop a roast! 🔥"
            className="w-full min-h-[200px] p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
            maxLength={MAX_CHARS + 50} // Allow typing a bit over to show error
          />

          {/* Character Counter */}
          <div className="px-4 pb-4 flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMediaClick}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-vibrant-blue"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <span
              className={`text-sm font-medium ${
                isOverLimit
                  ? 'text-red-400'
                  : charsRemaining < 50
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
            >
              {charsRemaining}
            </span>
          </div>
        </motion.div>

        {/* Style Selector */}
        <div className="glassmorphic rounded-xl p-4 mb-4">
          <p className="text-sm font-medium mb-3 text-gray-300">Roast Style</p>
          <div className="flex gap-2">
            {[
              { value: 'playful', label: '😄 Playful', color: 'from-green-500 to-emerald-500' },
              { value: 'roast', label: '🔥 Hard Roast', color: 'from-primary to-pink-500' },
              { value: 'sarcastic', label: '😏 Sarcastic', color: 'from-vibrant-blue to-purple-500' }
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value as any)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  style === s.value
                    ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAIGenerate}
          disabled={!content.trim() || aiLoading}
          className="w-full py-3 px-6 rounded-xl font-bold mb-4 glassmorphic border border-purple-500/50 hover:bg-purple-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {aiLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              ✨ Enhance with AI
            </span>
          )}
        </motion.button>

        {/* Post Button */}
        <motion.button
          whileHover={{ scale: canPost ? 1.02 : 1 }}
          whileTap={{ scale: canPost ? 0.98 : 1 }}
          onClick={handlePost}
          disabled={!canPost}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-vibrant-blue text-white font-bold text-lg shadow-primary-glow hover:shadow-blue-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Posting...
            </span>
          ) : (
            'Post Roast 🔥'
          )}
        </motion.button>

        {/* Tips */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-white">💡 Pro Tip:</span> The best roasts are clever, not cruel. Keep it fun and creative!
          </p>
        </div>
      </div>
    </div>
  )
}
