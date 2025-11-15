'use client'

import { motion } from 'framer-motion'

interface EchoBubbleProps {
  text: string
  author?: string
  delay?: number
}

export default function EchoBubble({ text, author = 'Anonymous', delay = 0 }: EchoBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="relative"
    >
      <div className="glass rounded-2xl rounded-tl-sm p-4 max-w-md">
        <p className="text-sm text-gray-300 mb-2">{text}</p>
        <p className="text-xs text-gray-500">{author}</p>
      </div>

      {/* Connector line */}
      <div className="absolute -left-4 top-6 w-4 h-px bg-gradient-to-r from-transparent to-orange-500/50" />
    </motion.div>
  )
}
