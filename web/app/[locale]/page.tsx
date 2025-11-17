'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTranslation } from '@/lib/i18n';

export default function HomePage() {
  const { locale } = useLocale();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff6b35]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f7931e]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-[#c73866]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Navigation */}
        <motion.nav
          className="flex justify-between items-center py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-2xl font-black bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            RoastArena
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-[#ff6b35] transition-colors">{t('navigation.feed')}</a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">{t('navigation.challenges')}</a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">{t('navigation.pizzeria')}</a>
          </div>
          <Link href={`/${locale}/onboarding`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full font-bold text-sm shadow-lg shadow-[#ff6b35]/30"
            >
              {t('home.getStarted')}
            </motion.button>
          </Link>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between py-12 flex-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-[#ff6b35] via-[#f7931e] to-[#c73866] bg-clip-text text-transparent">
                Roast
              </span> <br />
              <span className="text-white">Like a</span> <br />
              <span className="bg-gradient-to-r from-[#c73866] to-[#4ecdc4] bg-clip-text text-transparent">
                Champion
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
              variants={itemVariants}
            >
              {t('home.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href={`/${locale}/onboarding`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-2xl font-bold text-lg shadow-lg shadow-[#ff6b35]/30 hover:shadow-[#ff6b35]/50 transition-all"
                >
                  {t('home.getStarted')}
                </motion.button>
              </Link>
              <Link href={`/${locale}/feed`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  {t('home.explore')}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&h=600&q=80"
                  alt="RoastArena - AI Roast Battle"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Overlay elements */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Epic Roast Battle</h3>
                  <p className="text-gray-300">Slay your opponents with AI-powered wit</p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl overflow-hidden shadow-xl z-10"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Roaster 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl overflow-hidden shadow-xl z-10"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Roaster 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Value Proposition Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="glassmorphic rounded-3xl p-6 border border-white/10 hover:border-[#ff6b35]/30 transition-all"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">{t('home.features.ai')}</h3>
            <p className="text-gray-400">{t('home.features.aiDesc')}</p>
          </motion.div>

          <motion.div
            className="glassmorphic rounded-3xl p-6 border border-white/10 hover:border-[#f7931e]/30 transition-all"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">{t('home.features.gifts')}</h3>
            <p className="text-gray-400">{t('home.features.giftsDesc')}</p>
          </motion.div>

          <motion.div
            className="glassmorphic rounded-3xl p-6 border border-white/10 hover:border-[#c73866]/30 transition-all"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="text-4xl mb-4">🍕</div>
            <h3 className="text-xl font-bold mb-2">{t('home.features.pizza')}</h3>
            <p className="text-gray-400">{t('home.features.pizzaDesc')}</p>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="py-8 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>{t('home.socialProof')}</p>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} RoastArena. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
