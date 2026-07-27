import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase server configuration is missing or invalid.'
    );
  }

  new URL(url);

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function verifySupabaseConnectivity() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');

  if (!url || !anonKey) {
    throw new Error('Supabase server configuration is missing or invalid.');
  }

  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  // 1. DNS Lookup (Using dynamic import to avoid client-side bundling issues)
  try {
    const dns = await import('node:dns/promises');
    await dns.lookup(hostname);
  } catch (dnsErr: any) {
    console.error('[Supabase Connection Diagnostic] DNS lookup failed', {
      hostname,
      code: dnsErr.code || dnsErr.name,
      message: dnsErr.message,
      cause: dnsErr.cause
    });
    throw new Error('Supabase hostname unreachable.');
  }

  // 2. HTTPS Fetch
  try {
    await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: anonKey
      }
    });
  } catch (fetchErr: any) {
    console.error('[Supabase Connection Diagnostic] HTTPS fetch failed', {
      hostname,
      code: fetchErr.code || fetchErr.name,
      message: fetchErr.message,
      cause: fetchErr.cause
    });
    throw new Error('Supabase hostname unreachable.');
  }
}