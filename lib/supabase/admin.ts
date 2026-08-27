import 'server-only';

import { createClient } from '@supabase/supabase-js';

function cleanServerEnvironmentValue(value: string | undefined) {
  return value
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');
}

export function isSupabaseAdminConfigured() {
  return Boolean(
    cleanServerEnvironmentValue(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    cleanServerEnvironmentValue(process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}

export function getSupabaseAdmin() {
  const url = cleanServerEnvironmentValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const serviceKey = cleanServerEnvironmentValue(
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!url || !serviceKey) {
    throw new Error('Supabase server configuration is missing or invalid.');
  }

  new URL(url);

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
