'use client'

import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  variant?: 'post' | 'profile' | 'challenge' | 'text'
  count?: number
}

export default function SkeletonLoader({ variant = 'post', count = 3 }: SkeletonLoaderProps) {
  const shimmer = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  }

  const shimmerTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  }

  if (variant === 'post') {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glassmorphic rounded-xl p-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={shimmerTransition}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="relative h-4 w-24 bg-white/10 rounded overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={shimmerTransition}
                  />
                </div>
                <div className="relative h-3 w-16 bg-white/10 rounded overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={shimmerTransition}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <div className="relative h-4 w-full bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={shimmerTransition}
                />
              </div>
              <div className="relative h-4 w-3/4 bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={shimmerTransition}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-white/10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative h-5 w-12 bg-white/10 rounded overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={shimmerTransition}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'challenge') {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glassmorphic rounded-xl p-4 overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-48 bg-white/10 rounded-lg mb-4 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmer}
                initial="initial"
                animate="animate"
                transition={shimmerTransition}
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="relative h-4 w-32 bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={shimmerTransition}
                />
              </div>
              <div className="relative h-6 w-48 bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                  transition={shimmerTransition}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="relative h-4 w-24 bg-white/10 rounded overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={shimmerTransition}
                  />
                </div>
                <div className="relative h-10 w-20 bg-white/10 rounded-lg overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                    transition={shimmerTransition}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default: text variant
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative h-4 w-full bg-white/10 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: index * 0.1 }}
          />
        </div>
      ))}
    </div>
  )
}
