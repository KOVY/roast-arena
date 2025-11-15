import { createClient } from '@supabase/supabase-js';

// Use placeholders during build time only to prevent build failures
// At runtime, the app will use proper env vars set in Vercel
const isBuildTime = typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || (isBuildTime ? 'https://placeholder.supabase.co' : '');
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (isBuildTime ? 'placeholder-anon-key' : '');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Supabase env vars are not set: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (!isBuildTime) {
    throw new Error('Missing required Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabaseClient;
