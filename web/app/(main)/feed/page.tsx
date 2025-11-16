import React from 'react';
import HaloButton from '@/components/ui/HaloButton';
import BentoGrid from '@/components/ui/BentoGrid';
import TrendingRoasts from '@/components/home/TrendingRoasts';

export default function HomePage() {
  return (
    <main className='p-6 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.02),transparent),rgba(6,6,23,1)] min-h-screen text-white'>
      <header className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>RoastArena</h1>
        <HaloButton>New Roast</HaloButton>
      </header>

      <section className='mb-6'>
        <h2 className='text-lg font-semibold mb-3'>Trending Roasts</h2>
        <TrendingRoasts />
      </section>

      <section>
        <h2 className='text-lg font-semibold mb-3'>Bento</h2>
        <BentoGrid />
      </section>
    </main>
  );
}
