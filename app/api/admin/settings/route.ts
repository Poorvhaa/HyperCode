import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

// Authenticate caller and fetch profile details
async function checkAuth(req: Request) {
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return { error: 'Unauthorized: Missing token', status: 401 };
  }

  const supabaseServer = getSupabaseServer();
  if (!supabaseServer) {
    return { error: 'Database service unavailable', status: 500 };
  }

  const { data: { user }, error: authError } = await supabaseServer.auth.getUser(token);
  if (authError || !user) {
    return { error: `Unauthorized: ${authError?.message || 'Invalid user'}`, status: 401 };
  }

  const { data: profile, error: profileError } = await supabaseServer
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { error: 'User profile not found', status: 403 };
  }

  if (profile.is_active === false) {
    return { error: 'Account is deactivated', status: 403 };
  }

  return { supabaseServer, profile };
}

// GET: Fetch company settings and email templates
export async function GET(req: Request) {
  const auth = await checkAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { supabaseServer } = auth;
  try {
    // 1. Get company settings
    const { data: settings, error: sError } = await supabaseServer
      .from('company_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (sError) throw sError;

    // 2. Get email templates
    const { data: templates, error: tError } = await supabaseServer
      .from('email_templates')
      .select('*');

    if (tError) throw tError;

    return NextResponse.json({ settings, templates });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Update settings or templates (Admin only)
export async function POST(req: Request) {
  const auth = await checkAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { supabaseServer, profile } = auth;
  if (profile.role !== 'Admin') {
    return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'company') {
      const { company_name, email, phone, address, social_links } = body;
      const { data, error } = await supabaseServer
        .from('company_settings')
        .upsert([{
          id: 'default',
          company_name,
          email,
          phone,
          address,
          social_links,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ message: 'Company settings updated successfully', settings: data });
    }

    if (type === 'template') {
      const { id, subject, body: templateBody } = body;
      if (!id || !subject || !templateBody) {
        return NextResponse.json({ error: 'Missing template ID, subject, or body' }, { status: 400 });
      }

      const { data, error } = await supabaseServer
        .from('email_templates')
        .upsert([{
          id,
          subject,
          body: templateBody,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ message: 'Email template updated successfully', template: data });
    }

    return NextResponse.json({ error: 'Invalid update type' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
