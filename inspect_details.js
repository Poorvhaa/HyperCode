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
  
  // We can query database columns using the postgrest client or SQL query
  // Since we cannot run raw SQL queries directly via the supabase-js client unless we have a specific RPC,
  // we can check if there's a list_rpc or helper in the workspace.
  // Wait! We can use standard HTTP requests to the Postgrest OpenAPI spec or just query columns using RPC if a query RPC exists,
  // or we can just try to insert a dummy row or read the OpenAPI schema.
  // Actually, we can fetch the OpenAPI schema from Supabase directly!
  // Let's do an HTTP fetch of the OpenAPI documentation for the Postgrest API, which details all tables and columns.
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseServiceKey}`);
    const schema = await res.json();
    console.log("=== API SCHEMA TABLES ===");
    for (const tableName of tables) {
      const tableDef = schema.definitions[tableName];
      if (tableDef) {
        console.log(`\nTable: ${tableName}`);
        console.log(`Required properties:`, tableDef.required);
        console.log(`Properties:`);
        for (const [colName, colProps] of Object.entries(tableDef.properties)) {
          console.log(`  - ${colName}: ${colProps.type} (${colProps.format || ''})`);
        }
      } else {
        console.log(`\nTable ${tableName} not found in schema definitions.`);
      }
    }
  } catch (err) {
    console.error("Error fetching schema definitions:", err);
  }
}

run();
