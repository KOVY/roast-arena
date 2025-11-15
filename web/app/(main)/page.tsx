import React from 'react';
import { motion } from 'framer-motion';
import HaloButton from '../../components/ui/HaloButton';
import BentoGrid from '../../components/ui/BentoGrid';

type RoastPreview = { id: string; author: string; text: string };

const sampleRoasts: RoastPreview[] = [
  { id: '1', author: 'Pavel', text: \"Your code compiles... sometimes. That's special.\" },
  { id: '2', author: 'Aneta', text: \"You're the human equivalent of a semicolon.\" },
  { id: '3', author: 'Marek', text: \"I'd explain it to you but I left my puppet theater at home.\" },
];

export default function HomePage() {
  return (
    <main className='p-6 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.02),transparent),rgba(6,6,23,1)] min-h-screen text-white'>
      <header className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>RoastArena</h1>
        <HaloButton>New Roast</HaloButton>
      </header>

      <section className='mb-6'>
        <h2 className='text-lg font-semibold mb-3'>Trending Roasts</h2>
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
      </section>

      <section>
        <h2 className='text-lg font-semibold mb-3'>Bento</h2>
        <BentoGrid />
      </section>
    </main>
  );
}
