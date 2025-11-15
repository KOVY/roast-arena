# Bootstrap RoastArena Project
Write-Host "Creating RoastArena project scaffold..." -ForegroundColor Cyan

# Create directories first
New-Item -Path ".\web\lib" -ItemType Directory -Force | Out-Null
New-Item -Path ".\web\components\ui" -ItemType Directory -Force | Out-Null
New-Item -Path ".\web\app\(main)" -ItemType Directory -Force | Out-Null
New-Item -Path ".\web\app\(main)\create" -ItemType Directory -Force | Out-Null
New-Item -Path ".\web\app\(main)\pizzeria" -ItemType Directory -Force | Out-Null
New-Item -Path ".\shared\utils" -ItemType Directory -Force | Out-Null
New-Item -Path ".\backend\functions\ai-roast" -ItemType Directory -Force | Out-Null
New-Item -Path ".\backend\supabase\migrations" -ItemType Directory -Force | Out-Null
New-Item -Path ".\supabase" -ItemType Directory -Force | Out-Null

# Create .gitignore
@"
node_modules
.env
.next
dist
/.vscode
"@ | Out-File -FilePath ".\.gitignore" -Encoding utf8

Write-Host "Created .gitignore"

# Create .env
@"
# RoastArena local environment
# Fill these with your real keys locally. DO NOT commit to git.

# Supabase (public keys used in client code)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role (server-only) - keep secret
SUPABASE_SERVICE_ROLE_KEY=

# Grok AI API key (server-side)
GROK_API_KEY=
NEXT_PUBLIC_GROK_API_KEY=

# Stripe keys
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: analytics, feature flags
# SEGMENT_WRITE_KEY=
# SENTRY_DSN=
"@ | Out-File -FilePath ".\.env" -Encoding utf8

Write-Host "Created .env"

# Create .env.example
@"
# Example env (do NOT commit real keys)

# Supabase (public keys used in client code)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase service role (server-only)
SUPABASE_SERVICE_ROLE_KEY=

# Grok AI
GROK_API_KEY=
NEXT_PUBLIC_GROK_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: analytics / monitoring
# SEGMENT_WRITE_KEY=
# SENTRY_DSN=
"@ | Out-File -FilePath ".\.env.example" -Encoding utf8

Write-Host "Created .env.example"

# Create package.json
@"
{
  "name": "roast-arena",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "echo \"Run tests\""
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "framer-motion": "latest",
    "@supabase/supabase-js": "latest",
    "stripe": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@types/react": "latest",
    "@types/node": "latest",
    "eslint": "latest",
    "prettier": "latest"
  }
}
"@ | Out-File -FilePath ".\package.json" -Encoding utf8

Write-Host "Created package.json"

# Create tsconfig.json
@"
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
"@ | Out-File -FilePath ".\tsconfig.json" -Encoding utf8

Write-Host "Created tsconfig.json"

# Create next-env.d.ts
@"
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should be included in tsconfig.json
"@ | Out-File -FilePath ".\next-env.d.ts" -Encoding utf8

Write-Host "Created next-env.d.ts"

# Create tailwind.config.js
@"
module.exports = {
  content: [
    './web/app/**/*.{js,ts,jsx,tsx}',
    './web/components/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
"@ | Out-File -FilePath ".\tailwind.config.js" -Encoding utf8

Write-Host "Created tailwind.config.js"

# Create postcss.config.js
@"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@ | Out-File -FilePath ".\postcss.config.js" -Encoding utf8

Write-Host "Created postcss.config.js"

# Create web/lib/supabase.ts
@"
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Leave as runtime guard — in dev you should set env vars
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are not set: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabaseClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');

export default supabaseClient;
"@ | Out-File -FilePath ".\web\lib\supabase.ts" -Encoding utf8

Write-Host "Created web/lib/supabase.ts"

# Create web/lib/stripe.ts
@"
/**
 * Minimal Stripe Checkout helper (client-side wrapper)
 * Expects an API route at /api/checkout that creates a session server-side.
 */
export async function createCheckoutSession(priceId: string, successUrl = '/', cancelUrl = '/') {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, successUrl, cancelUrl }),
  });

  if (!res.ok) throw new Error('Failed to create checkout session');
  return res.json();
}

export default createCheckoutSession;
"@ | Out-File -FilePath ".\web\lib\stripe.ts" -Encoding utf8

Write-Host "Created web/lib/stripe.ts"

# Create web/lib/ai.ts
@"
/**
 * Grok API wrapper (minimal). Uses GROK_API_KEY env var.
 * Note: endpoint and request shape are illustrative; adapt to the real Grok API.
 */
type GrokResponse = { text?: string; result?: string } | any;

export async function generateRoast(prompt: string, style = 'playful'): Promise<string> {
  const key = process.env.NEXT_PUBLIC_GROK_API_KEY ?? process.env.GROK_API_KEY;
  if (!key) throw new Error('GROK_API_KEY is not set');

  const body = {
    prompt: `Write a ${style} roast about: ${prompt}`,
    max_tokens: 256,
    temperature: 0.9,
  };

  const res = await fetch('https://api.grok.ai/v1/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });

  const data: GrokResponse = await res.json();
  // adapt depending on the actual response shape
  return (data.text as string) ?? (data.result as string) ?? JSON.stringify(data);
}

export default generateRoast;
"@ | Out-File -FilePath ".\web\lib\ai.ts" -Encoding utf8

Write-Host "Created web/lib/ai.ts"

# Create web/components/ui/HaloButton.tsx
@"
import React from 'react';
import { motion } from 'framer-motion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function HaloButton({ children, className = '', ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-4 py-2 rounded-lg text-white font-semibold transition-shadow \${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        boxShadow: '0 6px 20px rgba(99,102,241,0.12)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      {...rest}
    >
      {/* halo glow */}
      <span
        aria-hidden
        className='absolute inset-0 rounded-lg'
        style={{
          boxShadow: '0 0 24px 6px rgba(99,102,241,0.16)',
          filter: 'blur(6px)',
          zIndex: -1,
        }}
      />
      <span className='relative z-10'>{children}</span>
    </motion.button>
  );
}
"@ | Out-File -FilePath ".\web\components\ui\HaloButton.tsx" -Encoding utf8

Write-Host "Created web/components/ui/HaloButton.tsx"

# Create web/components/ui/BentoGrid.tsx
@"
export default function BentoGrid(){
  return <div>BentoGrid placeholder</div>
}
"@ | Out-File -FilePath ".\web\components\ui\BentoGrid.tsx" -Encoding utf8

Write-Host "Created web/components/ui/BentoGrid.tsx"

# Create web/app/(main)/page.tsx
@"
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
"@ | Out-File -FilePath ".\web\app\(main)\page.tsx" -Encoding utf8

Write-Host "Created web/app/(main)/page.tsx"

# Create web/app/(main)/create/page.tsx
@"
import React, { useState } from 'react';
import generateRoast from '../../lib/ai';
import { supabaseClient } from '../../lib/supabase';
import HaloButton from '../../components/ui/HaloButton';

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
"@ | Out-File -FilePath ".\web\app\(main)\create\page.tsx" -Encoding utf8

Write-Host "Created web/app/(main)/create/page.tsx"

# Create web/app/(main)/pizzeria/page.tsx
@"
import React from 'react';
import HaloButton from '../../components/ui/HaloButton';

const samplePizzerias = [
  { id: 'pz1', name: 'Pizza Top', challenge: 'Top Roaster this week: free pizza' },
  { id: 'pz2', name: 'Napoli House', challenge: 'Create a roast with the word \"pepperoni\"' },
];

export default function PizzeriaPage() {
  return (
    <main className='p-6 min-h-screen text-white'>
      <h1 className='text-2xl font-bold mb-4'>Pizzerie & Výzvy</h1>

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
"@ | Out-File -FilePath ".\web\app\(main)\pizzeria\page.tsx" -Encoding utf8

Write-Host "Created web/app/(main)/pizzeria/page.tsx"

# Create shared/utils/currency.ts
@"
const LOCALE_TO_CURRENCY: Record<string, string> = {
  'cs-CZ': 'CZK',
  'en-US': 'USD',
  'de-DE': 'EUR',
  'ru-RU': 'RUB',
};

export function formatPrice(amount: number, locale = 'en-US') {
  const currency = LOCALE_TO_CURRENCY[locale] ?? 'USD';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export default formatPrice;
"@ | Out-File -FilePath ".\shared\utils\currency.ts" -Encoding utf8

Write-Host "Created shared/utils/currency.ts"

# Create backend/functions/ai-roast/index.ts
@"
/**
 * Simple edge function to proxy Grok AI generation.
 * Expects POST { prompt, style }
 */
export default async function handler(req: any) {
  try {
    if (req.method !== 'POST') return new Response(null, { status: 405 });
    const { prompt, style } = await req.json();
    const key = process.env.GROK_API_KEY;
    if (!key) return new Response(JSON.stringify({ error: 'GROK_API_KEY not set' }), { status: 500 });

    const body = { prompt: `Write a ${style ?? 'playful'} roast: ${prompt}`, max_tokens: 256 };

    const grokRes = await fetch('https://api.grok.ai/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });

    const data = await grokRes.json();
    const text = data.text ?? data.result ?? JSON.stringify(data);
    return new Response(JSON.stringify({ text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
"@ | Out-File -FilePath ".\backend\functions\ai-roast\index.ts" -Encoding utf8

Write-Host "Created backend/functions/ai-roast/index.ts"

# Create backend/supabase/migrations/001_init.sql
@"
-- Initial schema for RoastArena

create extension if not exists pgcrypto;

-- users
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text,
  name text,
  created_at timestamptz default now()
);

-- roasts
create table if not exists roasts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references users(id) on delete set null,
  text text not null,
  created_at timestamptz default now(),
  likes int default 0
);

-- pizzerias
create table if not exists pizzerias (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  created_at timestamptz default now()
);

-- challenges
create table if not exists challenges (
  id uuid default gen_random_uuid() primary key,
  pizzeria_id uuid references pizzerias(id) on delete cascade,
  title text,
  reward text,
  created_at timestamptz default now()
);

-- gifts / monetization
create table if not exists gifts (
  id uuid default gen_random_uuid() primary key,
  from_user uuid references users(id),
  to_user uuid references users(id),
  amount numeric(10,2),
  currency text,
  created_at timestamptz default now()
);

-- transactions
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  type text,
  amount numeric(10,2),
  currency text,
  meta jsonb,
  created_at timestamptz default now()
);
"@ | Out-File -FilePath ".\backend\supabase\migrations\001_init.sql" -Encoding utf8

Write-Host "Created backend/supabase/migrations/001_init.sql"

# Create supabase/migrations/001_init.sql
@"
-- Root-level supabase migration (mirrors backend/supabase migration)
create extension if not exists pgcrypto;

create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text,
  name text,
  created_at timestamptz default now()
);

create table if not exists roasts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references users(id) on delete set null,
  text text not null,
  created_at timestamptz default now(),
  likes int default 0
);

create table if not exists pizzerias (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  created_at timestamptz default now()
);

create table if not exists challenges (
  id uuid default gen_random_uuid() primary key,
  pizzeria_id uuid references pizzerias(id) on delete cascade,
  title text,
  reward text,
  created_at timestamptz default now()
);

create table if not exists gifts (
  id uuid default gen_random_uuid() primary key,
  from_user uuid references users(id),
  to_user uuid references users(id),
  amount numeric(10,2),
  currency text,
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  type text,
  amount numeric(10,2),
  currency text,
  meta jsonb,
  created_at timestamptz default now()
);
"@ | Out-File -FilePath ".\supabase\migrations\001_init.sql" -Encoding utf8

Write-Host "Created supabase/migrations/001_init.sql"

# Create web/app/api/checkout/route.ts
@"
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', { apiVersion: '2022-11-15' });

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();
    if (!priceId) return NextResponse.json({ error: 'priceId required' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
      cancel_url: cancelUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
"@ | Out-File -FilePath ".\web\app\api\checkout\route.ts" -Encoding utf8

Write-Host "Created web/app/api/checkout/route.ts"

# Add all files to git and commit
Write-Host "Adding files to git and committing..." -ForegroundColor Cyan
git add .
$changes = git status --porcelain
if ($changes) {
    git commit -m "chore: add scaffold and core files"
    Write-Host "Files committed to git." -ForegroundColor Green
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Push to GitHub
Write-Host "Pushing files to GitHub..." -ForegroundColor Cyan
try {
    git push -u origin main
    Write-Host "Files successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "Error pushing to GitHub: $_" -ForegroundColor Red
}

Write-Host "Bootstrap complete!" -ForegroundColor Green