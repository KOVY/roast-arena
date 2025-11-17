'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTranslation } from '@/lib/i18n';

export default function HomePage() {
  const { locale } = useLocale();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Fixed bottom CTA button for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800 p-4 md:hidden">
        <Link href={`/${locale}/create`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-xl font-bold text-lg shadow-lg shadow-[#ff6b35]/30"
          >
            ⚡ ZAČÍT GENERACI
          </motion.button>
        </Link>
      </div>

      {/* Main content with padding for mobile CTA */}
      <div className="flex-1 pb-24 md:pb-0">
        {/* Minimal navigation */}
        <nav className="p-6 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            RoastArena
          </div>
          <div className="text-gray-500 text-sm">for creators</div>
        </nav>

        {/* Hero section - designed to be impactful on mobile without scrolling */}
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
                TOVÁRNA NA VIRÁLNÍ ROASTY
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
              {t('home.creatorSubtitle', 'Nejrychlejší nástroj pro TikTok tvůrce. Generujte, sdílejte a monetizujte během sekund.')}
            </p>
          </motion.div>

          {/* Visual demonstration of the service */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
          >
            {/* Roast card simulation - represents the output format */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6">
              <div className="text-5xl mb-6">🔥</div>
              <h3 className="text-2xl font-bold text-center mb-4">
                TVŮJ ROAST JE PŘIPRAVEN
              </h3>
              <p className="text-gray-400 text-center text-sm mb-6">
                Perfektní formát pro TikTok s automatickými titulky
              </p>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block w-full max-w-md mt-12"
          >
            <Link href={`/${locale}/create`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-2xl font-bold text-lg shadow-xl shadow-[#ff6b35]/40 hover:shadow-[#ff6b35]/60 transition-all"
              >
                ⚡ ZAČÍT GENERACI (zdarma)
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Value proposition - only 3 core benefits */}
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12 text-gray-300">
              PROČ TISÍCE TVŮRCŮ PŘESKOČILO NA ROASTARENU
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-lg mb-2">AI Turbo Content</h3>
                <p className="text-gray-400 text-sm">
                  Generace obsahu za 3 sekundy. Špičkové AI styly pro nejostřejší roasty, které TikTok miluje.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-bold text-lg mb-2">Seamless TikTok Export</h3>
                <p className="text-gray-400 text-sm">
                  1-Klik sdílení. Perfektní vertikální formát a automatické titulky. Méně času editováním, více času pro vysílání.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="font-bold text-lg mb-2">Direct Creator Pay</h3>
                <p className="text-gray-400 text-sm">
                  Váš zisk, vaše pravidla. Získejte vyšší podíl z prémiových dárků od fanoušků na vaší čisté platformě.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer - minimalist */}
        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} RoastArena. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
