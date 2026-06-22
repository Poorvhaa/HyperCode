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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function run() {
  const tables = ['articles', 'case_studies', 'newsletter_subscribers', 'chat_leads', 'chat_messages', 'user_profiles'];
  for (const table of tables) {
    try {
      console.log(`Querying ${table} columns...`);
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.error(`Error querying ${table}:`, error);
      } else {
        console.log(`${table} columns:`, data.length > 0 ? Object.keys(data[0]) : 'Table is empty, trying to fetch schema info or insert/rollback');
      }
    } catch (err) {
      console.error(`Unexpected error for ${table}:`, err);
    }
  }
}

run();
