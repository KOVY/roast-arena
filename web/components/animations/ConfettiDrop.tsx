'use client'

import { motion } from 'framer-motion'

interface ConfettiDropProps {
  count?: number
}

export default function ConfettiDrop({ count = 50 }: ConfettiDropProps) {
  const confetti = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ['#ff6b35', '#f7931e', '#c73866', '#4ecdc4'][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 360,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: -20,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            rotate: piece.rotation + 720,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
