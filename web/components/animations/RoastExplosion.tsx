'use client'

import { motion } from 'framer-motion'

interface RoastExplosionProps {
  onComplete?: () => void
}

export default function RoastExplosion({ onComplete }: RoastExplosionProps) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-pink-500"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((particle.angle * Math.PI) / 180) * 200,
            y: Math.sin((particle.angle * Math.PI) / 180) * 200,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          onAnimationComplete={particle.id === 0 ? onComplete : undefined}
        />
      ))}
      <motion.div
        className="text-6xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: [0, 1.2, 1], rotate: 0 }}
        transition={{ duration: 0.5 }}
      >
        🔥
      </motion.div>
    </div>
  )
}
