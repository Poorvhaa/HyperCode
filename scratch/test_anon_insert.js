const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  try {
    // 1. Create conversation with anon key
    console.log('Creating conversation with anon key...');
    const { data: conv, error: convErr } = await supabase
      .from('chat_conversations')
      .insert([{
        session_id: 'test-anon-' + Math.random().toString(36).substring(2, 7),
        language: 'en'
      }])
      .select()
      .single();

    if (convErr) {
      console.error('Conversation create error (anon):', convErr);
      return;
    }
    
    console.log('Created conversation:', conv.id);

    // 2. Try to insert lead with anon key
    const leadPayload = {
      conversation_id: conv.id,
      name: 'John Doe',
      email: 'john.doe@enterprise.com',
      phone: '+1 555-0199',
      company: 'Enterprise Corp',
      industry: 'finance',
      service_interest: 'AI Solutions',
      budget_range: 'between25k50k',
      timeline: 'immediate',
      message: 'Need a custom LLM fine-tuning squad.',
      lead_score: 95,
      language: 'en'
    };

    console.log('Inserting lead with anon key:', leadPayload);
    const { data: lead, error: leadErr } = await supabase
      .from('chat_leads')
      .insert([leadPayload])
      .select()
      .single();

    if (leadErr) {
      console.error('Lead insert error (anon):', leadErr);
    } else {
      console.log('Lead insert success (anon):', lead);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

run();
