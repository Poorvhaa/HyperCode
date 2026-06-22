const axios = require('axios');
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

async function run() {
  try {
    const res = await axios.get(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });

    const paths = Object.keys(res.data.paths);
    const rpcPaths = paths.filter(p => p.startsWith('/rpc/'));
    console.log('Available RPC paths:');
    rpcPaths.forEach(p => console.log(' ', p));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
