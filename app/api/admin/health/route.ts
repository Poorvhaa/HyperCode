import { NextResponse } from 'next/server';
import { runDbHealthCheck } from '@/lib/database-health';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (supabaseUrl && supabaseAnonKey) {
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const supabaseServer = getSupabaseServer();
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 500 });
    }

    const { data: { user }, error: authError } = await supabaseServer.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: `Unauthorized: ${authError?.message || 'Invalid user'}` }, { status: 401 });
    }

    // Fetch user profile role
    const { data: profile, error: profileError } = await supabaseServer
      .from('user_profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 403 });
    }

    if (!profile.is_active) {
      return NextResponse.json({ error: 'Account is deactivated' }, { status: 403 });
    }

    if (profile.role !== 'Admin' && profile.role !== 'Consultant') {
      return NextResponse.json({ error: 'Forbidden: Admin or Consultant access required' }, { status: 403 });
    }
  }

  try {
    const report = await runDbHealthCheck();
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
