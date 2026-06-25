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
  const tables = [
    'chat_conversations',
    'chat_messages',
    'chat_leads',
    'consultation_requests',
    'newsletter_subscribers',
    'candidates'
  ];
  
  // Use RPC or direct select to inspect columns
  for (const table of tables) {
    try {
      console.log(`\n=== Table: ${table} ===`);
      // Try to fetch 1 row
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.error(`Error selecting from ${table}:`, error.message || error);
      } else {
        console.log(`Select succeeded. Row count: ${data.length}`);
        if (data.length > 0) {
          console.log(`Columns (from data):`, Object.keys(data[0]));
        }
      }
      
      // Let's query information_schema if possible using a custom query or pg_rpc.
      // Alternatively, let's select from the table using postgrest where we query a non-existent column to see the error message which lists valid columns, or just use RPC if available.
      // But a clean way is to query postgrest API /rest/v1/table using HTTP or select '*'
      // Let's also check if we can get table description by inserting an empty object or using another API.
    } catch (err) {
      console.error(`Unexpected error for ${table}:`, err);
    }
  }
}

run();
