'use client';

export const dynamic = 'force-dynamic'

import React, { useState } from 'react';
import generateRoast from '@/lib/ai';
import { supabaseClient } from '@/lib/supabase';
import HaloButton from '@/components/ui/HaloButton';

export default function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('playful');
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    try {
      const text = await generateRoast(prompt, style);
      setGenerated(text);
    } catch (e) {
      setGenerated('Error generating roast');
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    if (!generated) return;
    await supabaseClient.from('roasts').insert([{ text: generated, author_id: null }]);
    setGenerated(null);
    setPrompt('');
  }

  return (
    <main className='p-6 min-h-screen text-white'>
      <h1 className='text-xl font-bold mb-4'>Create Roast</h1>

      <label className='block mb-2'>Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='w-full rounded-lg p-3 bg-white/3 backdrop-blur border border-white/6 mb-3'
        rows={4}
      />

      <label className='block mb-2'>Style</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)} className='mb-4 p-2 rounded'>
        <option value='playful'>Playful</option>
        <option value='roast'>Hard Roast</option>
        <option value='sarcastic'>Sarcastic</option>
      </select>

      <div className='flex gap-3'>
        <HaloButton onClick={onGenerate}>{loading ? 'Generating...' : 'Generate with AI'}</HaloButton>
        {generated && <HaloButton onClick={onSave}>Save Roast</HaloButton>}
      </div>

      {generated && (
        <section className='mt-6 bg-white/3 rounded p-4'>
          <h3 className='font-semibold mb-2'>Preview</h3>
          <p className='whitespace-pre-wrap'>{generated}</p>
        </section>
      )}
    </main>
  );
}
