import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

// Helper to authenticate request and verify Admin role
async function checkAdmin(req: Request) {
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return { error: 'Unauthorized: Missing token', status: 401 };
  }

  const supabaseServer = getSupabaseServer();
  if (!supabaseServer) {
    return { error: 'Database service unavailable', status: 500 };
  }

  // Get user from token
  const { data: { user }, error: authError } = await supabaseServer.auth.getUser(token);
  if (authError || !user) {
    return { error: `Unauthorized: ${authError?.message || 'Invalid user'}`, status: 401 };
  }

  // Fetch role
  const { data: profile, error: profileError } = await supabaseServer
    .from('user_profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { error: 'User profile not found', status: 403 };
  }

  if (!profile.is_active) {
    return { error: 'Account is deactivated', status: 403 };
  }

  if (profile.role !== 'Admin') {
    return { error: 'Forbidden: Admin access required', status: 403 };
  }

  return { supabaseServer, user };
}

// GET: Retrieve all user profiles
export async function GET(req: Request) {
  const authCheck = await checkAdmin(req);
  if ('error' in authCheck) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  const { supabaseServer } = authCheck;
  try {
    const { data: profiles, error } = await supabaseServer
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ profiles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Manage admin users (Create, update role, activate/deactivate)
export async function POST(req: Request) {
  const authCheck = await checkAdmin(req);
  if ('error' in authCheck) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  const { supabaseServer } = authCheck;
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'create') {
      const { email, password, role, name } = body;
      if (!email || !password || !role) {
        return NextResponse.json({ error: 'Missing email, password, or role' }, { status: 400 });
      }

      // Create auth user
      const { data: authUser, error: createError } = await supabaseServer.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError || !authUser.user) {
        throw new Error(createError?.message || 'Failed to create Auth user');
      }

      // Create profile record (upsert/insert)
      const { data: profile, error: profileError } = await supabaseServer
        .from('user_profiles')
        .insert([{
          id: authUser.user.id,
          email,
          role,
          name: name || email.split('@')[0],
          avatar: `https://images.unsplash.com/photo-${1535713875002-d1d0cf377fde}?auto=format&fit=crop&w=100&h=100&q=80`,
          is_active: true,
        }])
        .select()
        .single();

      if (profileError) {
        // Clean up Auth user if profile fails
        await supabaseServer.auth.admin.deleteUser(authUser.user.id);
        throw new Error(`Profile creation failed: ${profileError.message}`);
      }

      return NextResponse.json({ message: 'User created successfully', profile });
    }

    if (action === 'update_role') {
      const { userId, role } = body;
      if (!userId || !role) {
        return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 });
      }

      const { data: profile, error } = await supabaseServer
        .from('user_profiles')
        .update({ role })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ message: 'User role updated', profile });
    }

    if (action === 'toggle_active') {
      const { userId, is_active } = body;
      if (userId === authCheck.user.id) {
        return NextResponse.json({ error: 'You cannot deactivate your own account' }, { status: 400 });
      }

      const { data: profile, error } = await supabaseServer
        .from('user_profiles')
        .update({ is_active })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ message: `User status changed to ${is_active ? 'active' : 'inactive'}`, profile });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
