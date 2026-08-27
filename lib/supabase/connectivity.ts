import 'server-only';

function cleanServerEnvironmentValue(value: string | undefined) {
  return value
    ?.trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s/g, '');
}

export async function verifySupabaseConnectivity() {
  const url = cleanServerEnvironmentValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const anonKey = cleanServerEnvironmentValue(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!url || !anonKey) {
    throw new Error('Supabase server configuration is missing or invalid.');
  }

  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

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

  try {
    await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: { apikey: anonKey }
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
