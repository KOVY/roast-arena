'use client'

import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon = '✨',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Animated Icon */}
      <motion.div
        className="text-6xl mb-6"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-2 text-center">{title}</h3>

      {/* Description */}
      <p className="text-base text-white/60 text-center max-w-sm mb-8">{description}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-vibrant-blue text-white font-bold shadow-[0_0_15px_rgba(175,37,244,0.4),0_0_30px_rgba(175,37,244,0.4)] hover:shadow-[0_0_25px_rgba(175,37,244,0.6),0_0_50px_rgba(175,37,244,0.6)] transition-all"
        >
          {actionLabel}
        </motion.button>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  )
}
