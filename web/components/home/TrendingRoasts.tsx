'use client';

import React from 'react';
import { motion } from 'framer-motion';

type RoastPreview = { id: string; author: string; text: string };

const sampleRoasts: RoastPreview[] = [
  { id: '1', author: 'Pavel', text: "Your code compiles... sometimes. That's special." },
  { id: '2', author: 'Aneta', text: "You're the human equivalent of a semicolon." },
  { id: '3', author: 'Marek', text: "I'd explain it to you but I left my puppet theater at home." },
];

export default function TrendingRoasts() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {sampleRoasts.map((r) => (
        <motion.article
          key={r.id}
          className='bg-white/3 backdrop-blur rounded-xl p-4'
          whileHover={{ y: -4 }}
        >
          <div className='text-sm text-slate-300 mb-2'> @{r.author}</div>
          <div className='text-md'>{r.text}</div>
        </motion.article>
      ))}
    </div>
  );
}
