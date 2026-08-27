import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '')
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\s/g, '');

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\s/g, '');

export const isSupabaseBrowserConfigured = Boolean(
  supabaseUrl && supabaseAnonKey
);

export const supabaseBrowser = isSupabaseBrowserConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
