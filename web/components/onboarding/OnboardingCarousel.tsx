'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const router = useRouter()
  const { locale } = useLocale()
  const { t } = useTranslation()

  // Updated with better content and structure
  const slides = [
    {
      id: 1,
      icon: '🔥',
      title: t('onboarding.welcome'),
      subtitle: t('onboarding.subtitle'),
      type: 'welcome',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&h=400&q=80',
      description: t('onboarding.welcomeDesc'),
    },
    {
      id: 2,
      title: t('onboarding.tellUsYourVibe'),
      type: 'quiz',
      description: t('onboarding.tellUsYourVibeDesc'),
      questions: [
        { icon: '☕', text: t('onboarding.quiz.morningPerson'), image: 'https://images.unsplash.com/photo-1490893540303-6f8a2377c0d3?auto=format&fit=crop&w=600&h=400&q=80' },
        { icon: '💪', text: t('onboarding.quiz.workoutWarrior'), image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=600&h=400&q=80' },
        { icon: '🐕', text: t('onboarding.quiz.dogPerson'), image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&h=400&q=80' },
      ],
    },
    {
      id: 3,
      title: t('onboarding.chooseYourStyle'),
      type: 'style',
      description: t('onboarding.chooseYourStyleDesc'),
      styles: [
        { name: t('onboarding.styles.savage'), description: t('onboarding.styles.savageDesc'), color: 'from-red-500 to-pink-600' },
        { name: t('onboarding.styles.playful'), description: t('onboarding.styles.playfulDesc'), color: 'from-blue-500 to-purple-600' },
      ],
    },
  ]

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

  // Navigation functions
  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      handleComplete()
    }
  }

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff6b35]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f7931e]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-[#c73866]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Navigation Header */}
      <div className="flex justify-between items-center p-6 z-20">
        <button
          onClick={goToPrev}
          className={`p-2 rounded-full ${currentSlide > 0 ? 'bg-white/10 text-white' : 'text-gray-600'} transition-all`}
          disabled={currentSlide === 0}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-[#ff6b35]'
                  : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-white/10 text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slides */}
      <main className="flex-1 flex items-center justify-center z-10 p-4">
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
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] to-[#c73866] rounded-full blur-xl opacity-60 animate-pulse" />
                  <span className="text-7xl text-white relative z-10">
                    {slides[currentSlide].icon}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-white/80 text-base md:text-lg">
                    {slides[currentSlide].subtitle}
                  </p>
                  <p className="text-white/60 text-sm mt-4">
                    {slides[currentSlide].description}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={slides[currentSlide].image}
                    alt="RoastArena preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'quiz' && (
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-white text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-white/70 text-center mb-2">
                  {slides[currentSlide].description}
                </p>

                <div className="w-full space-y-4">
                  {slides[currentSlide].questions?.map((q, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glassmorphic rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center text-white text-xl">
                        {q.icon}
                      </div>

                      <div className="flex-1">
                        <p className="text-white text-base font-medium">{q.text}</p>
                      </div>

                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img
                          src={q.image}
                          alt={q.text}
                          className="w-full h-full object-cover"
                        />
                      </div>

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
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 w-full">
                  <h2 className="text-white text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-white/70 text-center mb-6">
                    {slides[currentSlide].description}
                  </p>

                  <div className="flex w-full flex-col gap-4">
                    {slides[currentSlide].styles?.map((style, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="glassmorphic rounded-2xl p-5 border border-white/10 hover:border-[#ff6b35]/30 transition-all"
                      >
                        <div className={`h-14 px-5 bg-gradient-to-r ${style.color} text-white text-lg font-bold rounded-xl flex items-center justify-center mb-3`}>
                          {style.name}
                        </div>
                        <p className="text-white/70 text-center text-sm">
                          {style.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="w-full pt-8">
                  <button
                    onClick={goToNext}
                    className="w-full h-14 px-5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white text-lg font-bold rounded-2xl hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all"
                  >
                    {currentSlide === slides.length - 1 ? t('onboarding.getStarted') : t('common.next')}
                  </button>

                  {currentSlide === slides.length - 1 && (
                    <button
                      onClick={handleComplete}
                      className="w-full h-12 px-5 mt-3 bg-white/10 text-white text-base font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                    >
                      {t('onboarding.skip')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
