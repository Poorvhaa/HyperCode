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
    console.log('Fetching OpenAPI schema from PostgREST with service role key...');
    const res = await axios.get(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });

    const definitions = res.data.definitions;
    const tables = ['articles', 'case_studies', 'newsletter_subscribers', 'user_profiles'];
    
    for (const table of tables) {
      if (definitions[table]) {
        console.log(`\n=== Table: ${table} ===`);
        const properties = definitions[table].properties;
        const required = definitions[table].required || [];
        for (const [propName, propDetails] of Object.entries(properties)) {
          const isRequired = required.includes(propName) ? 'REQUIRED' : 'OPTIONAL';
          console.log(`  ${propName}: ${propDetails.type} (${propDetails.format || 'no format'}, ${isRequired})`);
        }
      } else {
        console.log(`\nTable ${table} not found in OpenAPI definitions.`);
      }
    }
  } catch (err) {
    console.error('Error fetching schema:', err.message);
  }
}

run();
