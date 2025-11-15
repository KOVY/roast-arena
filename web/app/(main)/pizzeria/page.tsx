import React from 'react';
import HaloButton from '../../components/ui/HaloButton';

const samplePizzerias = [
  { id: 'pz1', name: 'Pizza Top', challenge: 'Top Roaster this week: free pizza' },
  { id: 'pz2', name: 'Napoli House', challenge: 'Create a roast with the word \"pepperoni\"' },
];

export default function PizzeriaPage() {
  return (
    <main className='p-6 min-h-screen text-white'>
      <h1 className='text-2xl font-bold mb-4'>Pizzerie & VĂ˝zvy</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {samplePizzerias.map((p) => (
          <div key={p.id} className='bg-white/3 rounded-xl p-4'>
            <div className='text-lg font-semibold'>{p.name}</div>
            <div className='text-sm text-slate-300 my-2'>{p.challenge}</div>
            <div className='flex gap-2'>
              <HaloButton>Join Challenge</HaloButton>
              <HaloButton>Get QR</HaloButton>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
