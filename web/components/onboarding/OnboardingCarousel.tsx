'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/LocaleProvider'

const slides = [
  {
    id: 1,
    icon: 'local_fire_department',
    title: 'Hejtuj jako v MMA!',
    subtitle: 'AI-powered roast battles',
    type: 'welcome',
  },
  {
    id: 2,
    title: 'Tell us your vibe.',
    type: 'quiz',
    questions: [
      { icon: 'coffee', text: 'Morning Person / Night Owl?' },
      { icon: 'fitness_center', text: 'Workout Warrior / Couch Potato?' },
      { icon: 'pets', text: 'Dog Person / Cat Person?' },
    ],
  },
  {
    id: 3,
    title: 'Choose your fighting style.',
    type: 'style',
    styles: ['MMA', 'WWE'],
  },
]

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const router = useRouter()
  const { locale } = useLocale()

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleComplete = () => {
    router.push(`/${locale}/feed`)
  }

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          animate={{
            x: [-100, 100],
            y: [-100, 100],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#3A1C71] to-[#FFAF7B] rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, -100],
            y: [100, -100],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFAF7B] to-[#3A1C71] rounded-full opacity-30 blur-3xl"
        />
      </div>

      {/* Slides */}
      <main className="flex-1 flex items-center justify-center z-10 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            {slides[currentSlide].type === 'welcome' && (
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#3A1C71] rounded-full blur-xl opacity-60 animate-pulse" />
                  <span
                    className="material-symbols-outlined text-7xl text-white relative"
                    style={{ textShadow: '0 0 20px #f47b25' }}
                  >
                    {slides[currentSlide].icon}
                  </span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-white/70 text-base md:text-lg">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'quiz' && (
              <div className="flex flex-col items-center space-y-8">
                <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
                  {slides[currentSlide].title}
                </h2>
                <div className="w-full space-y-4">
                  {slides[currentSlide].questions?.map((q, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glassmorphic rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {q.icon}
                      </span>
                      <p className="text-white text-base font-medium flex-1">{q.text}</p>
                      <span className="material-symbols-outlined text-white/50">
                        chevron_right
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'style' && (
              <div className="flex flex-col items-center justify-between h-full max-h-[600px]">
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full">
                  <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="flex w-full flex-col sm:flex-row gap-4">
                    {slides[currentSlide].styles?.map((style, idx) => (
                      <motion.button
                        key={style}
                        whileHover={{ scale: 1.05, rotateY: idx === 0 ? -10 : 10 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 h-16 px-5 bg-white/10 text-white text-lg font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                      >
                        {style}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="w-full pt-8">
                  <button
                    onClick={handleComplete}
                    className="w-full h-14 px-5 bg-primary text-background-dark text-lg font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-primary-glow"
                  >
                    Let's Roast!
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Page Indicators */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-8 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 bg-primary'
                : 'w-2.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
