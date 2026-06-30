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
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { error: 'User profile not found', status: 403 };
  }

  if (profile.is_active === false) {
    return { error: 'Account is deactivated', status: 403 };
  }

  if (profile.role !== 'Admin') {
    return { error: 'Forbidden: Admin access required', status: 403 };
  }

  return { supabaseServer, user };
}

// GET: Retrieve all user profiles (with auto-sync and self-repair)
export async function GET(req: Request) {
  const authCheck = await checkAdmin(req);
  if ('error' in authCheck) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  const { supabaseServer } = authCheck;
  try {
    // 1. Fetch all Auth users
    const { data: { users: authUsers }, error: authError } = await supabaseServer.auth.admin.listUsers();
    if (authError) throw authError;

    // 2. Fetch all user profiles from DB
    const { data: dbProfiles, error: profileError } = await supabaseServer
      .from('user_profiles')
      .select('*');
    if (profileError) throw profileError;

    // 3. Detect schema columns dynamically
    const resSchema = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`
      }
    });
    const schema = resSchema.ok ? await resSchema.json() : null;
    const availableCols = schema?.definitions?.user_profiles?.properties 
      ? Object.keys(schema.definitions.user_profiles.properties)
      : ['id', 'email', 'role', 'created_at'];

    const profileMap = new Map(dbProfiles.map(p => [p.id, p]));
    const repairedProfiles: any[] = [];
    const validRoles = ['Admin', 'Recruiter', 'Consultant', 'Manager'];

    for (const authUser of authUsers) {
      const profile = profileMap.get(authUser.id);
      if (!profile) {
        // Missing profile - create it safely!
        const payload: any = {
          id: authUser.id,
          email: authUser.email || '',
          role: 'Consultant'
        };
        if (availableCols.includes('name')) payload.name = authUser.email?.split('@')[0] || 'User';
        if (availableCols.includes('avatar')) payload.avatar = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80`;
        if (availableCols.includes('is_active')) payload.is_active = true;
        if (availableCols.includes('created_at')) payload.created_at = authUser.created_at || new Date().toISOString();

        const { data: newProfile, error: insertErr } = await supabaseServer
          .from('user_profiles')
          .insert([payload])
          .select()
          .single();

        if (!insertErr && newProfile) {
          repairedProfiles.push(newProfile);
        }
      } else {
        // Profile exists - correct inconsistencies (email or role)
        let needsUpdate = false;
        const updatePayload: any = {};

        if (profile.email !== authUser.email) {
          updatePayload.email = authUser.email || '';
          needsUpdate = true;
        }
        if (!profile.role || !validRoles.includes(profile.role)) {
          updatePayload.role = 'Consultant';
          needsUpdate = true;
        }

        if (needsUpdate) {
          const { data: updatedProfile, error: updateErr } = await supabaseServer
            .from('user_profiles')
            .update(updatePayload)
            .eq('id', profile.id)
            .select()
            .single();

          if (!updateErr && updatedProfile) {
            repairedProfiles.push(updatedProfile);
          } else {
            repairedProfiles.push(profile);
          }
        } else {
          repairedProfiles.push(profile);
        }
      }
    }

    // Sort by created_at descending
    repairedProfiles.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

    return NextResponse.json({ profiles: repairedProfiles });
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

      // Fetch schema columns dynamically
      const resSchema = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`
        }
      });
      const schema = resSchema.ok ? await resSchema.json() : null;
      const availableCols = schema?.definitions?.user_profiles?.properties 
        ? Object.keys(schema.definitions.user_profiles.properties)
        : ['id', 'email', 'role', 'created_at'];

      const payload: any = {
        id: authUser.user.id,
        email,
        role
      };
      if (availableCols.includes('name')) payload.name = name || email.split('@')[0];
      if (availableCols.includes('avatar')) payload.avatar = `https://images.unsplash.com/photo-${1535713875002-d1d0cf377fde}?auto=format&fit=crop&w=100&h=100&q=80`;
      if (availableCols.includes('is_active')) payload.is_active = true;
      if (availableCols.includes('created_at')) payload.created_at = new Date().toISOString();

      // Create profile record safely
      const { data: profile, error: profileError } = await supabaseServer
        .from('user_profiles')
        .insert([payload])
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

      const resSchema = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`
        }
      });
      const schema = resSchema.ok ? await resSchema.json() : null;
      const availableCols = schema?.definitions?.user_profiles?.properties 
        ? Object.keys(schema.definitions.user_profiles.properties)
        : ['id', 'email', 'role', 'created_at'];

      if (!availableCols.includes('is_active')) {
        return NextResponse.json({ error: 'Status column is not present in the database schema.' }, { status: 400 });
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
