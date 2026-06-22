const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function run() {
  try {
    console.log('Checking storage buckets...');
    const { data: buckets, error: bError } = await supabase.storage.listBuckets();
    if (bError) {
      console.error('Error listing buckets:', bError);
    } else {
      console.log('Buckets list:', buckets.map(b => ({ name: b.name, public: b.public })));
    }

    console.log('Testing job_applications select...');
    const { data: jobApps, error: jaError } = await supabase.from('job_applications').select('*').limit(1);
    if (jaError) {
      console.error('Error query job_applications:', jaError);
    } else {
      console.log('job_applications select success, rows:', jobApps.length);
    }

    console.log('Testing candidates select...');
    const { data: candidates, error: cError } = await supabase.from('candidates').select('*').limit(1);
    if (cError) {
      console.error('Error query candidates:', cError);
    } else {
      console.log('candidates select success, rows:', candidates.length);
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

run();
