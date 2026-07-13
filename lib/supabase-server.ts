import 'server-only';

import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('[Supabase Server] Missing server configuration', {
      supabaseUrlConfigured: Boolean(supabaseUrl),
      serviceRoleConfigured: Boolean(supabaseServiceKey)
    });

    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}