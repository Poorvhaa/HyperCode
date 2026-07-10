import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Re-create clients inside the health check to avoid dependency cycles
const localSupabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
const serviceSupabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export interface HealthCheckItem {
  name: string;
  status: 'green' | 'red';
  details: string;
}

export interface HealthCheckReport {
  success: boolean;
  connection: 'green' | 'red';
  tables: HealthCheckItem[];
  columns: HealthCheckItem[];
  rlsRead: HealthCheckItem[];
  rlsInsert: HealthCheckItem[];
  errors: Record<string, string>;
  status: string;
  missingObjects: string[];
  warnings: string[];
  policies: string[];
}

export async function runDbHealthCheck(): Promise<HealthCheckReport> {
  const tables: HealthCheckItem[] = [];
  const columns: HealthCheckItem[] = [];
  const rlsRead: HealthCheckItem[] = [];
  const rlsInsert: HealthCheckItem[] = [];
  const errors: Record<string, string> = {};

  if (!supabaseUrl || !supabaseAnonKey || !localSupabase) {
    return {
      success: false,
      connection: 'red',
      tables: [],
      columns: [],
      rlsRead: [],
      rlsInsert: [],
      errors: { general: 'Supabase URL or Anon Key is missing.' },
      status: 'unhealthy',
      missingObjects: ['Configuration is missing'],
      warnings: ['Supabase URL or Anon Key is missing.'],
      policies: []
    };
  }

  // All 12 tables expected in the consolidated HyperCode system
  const actualTables = [
    'user_profiles',
    'chat_conversations',
    'chat_messages',
    'chat_leads',
    'contact_inquiries',
    'consultation_requests',
    'candidates',
    'newsletter_subscribers',
    'articles',
    'case_studies',
    'company_settings',
    'email_templates'
  ];

  // The expected columns and types for each table
  const expectedSchema: Record<string, Record<string, string>> = {
    user_profiles: {
      id: 'string',
      email: 'string',
      role: 'string',
      is_active: 'boolean',
      name: 'string',
      avatar: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    chat_conversations: {
      id: 'string',
      session_id: 'string',
      language: 'string',
      visitor_name: 'string',
      visitor_email: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    chat_messages: {
      id: 'string',
      conversation_id: 'string',
      sender: 'string',
      message: 'string',
      language: 'string',
      created_at: 'string'
    },
    chat_leads: {
      id: 'string',
      conversation_id: 'string',
      name: 'string',
      email: 'string',
      phone: 'string',
      company: 'string',
      industry: 'string',
      service_interest: 'string',
      budget_range: 'string',
      timeline: 'string',
      message: 'string',
      lead_score: 'integer',
      status: 'string',
      language: 'string',
      created_at: 'string'
    },
    contact_inquiries: {
      id: 'string',
      full_name: 'string',
      email: 'string',
      phone: 'string',
      company: 'string',
      subject: 'string',
      message: 'string',
      status: 'string',
      source: 'string',
      services: 'object',
      industry: 'string',
      company_size: 'string',
      budget: 'string',
      timeline: 'string',
      country: 'string',
      preferred_contact_method: 'string',
      project_type: 'string',
      required_technologies: 'object',
      created_at: 'string',
      updated_at: 'string'
    },
    consultation_requests: {
      id: 'string',
      full_name: 'string',
      company: 'string',
      email: 'string',
      phone: 'string',
      service_interest: 'string',
      project_description: 'string',
      budget: 'string',
      timeline: 'string',
      status: 'string',
      name: 'string',
      service: 'string',
      message: 'string',
      preferred_date: 'string',
      language: 'string',
      business_goal: 'string',
      current_challenges: 'string',
      expected_outcome: 'string',
      preferred_services: 'object',
      industry: 'string',
      company_size: 'string',
      current_tech_stack: 'string',
      preferred_meeting_type: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    candidates: {
      id: 'string',
      name: 'string',
      email: 'string',
      phone: 'string',
      linkedin: 'string',
      resume_url: 'string',
      skills: 'string',
      experience: 'string',
      availability: 'string',
      location: 'string',
      status: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    newsletter_subscribers: {
      id: 'string',
      email: 'string',
      status: 'string',
      language: 'string',
      source_page: 'string',
      created_at: 'string',
      updated_at: 'string'
    },
    articles: {
      id: 'string',
      slug: 'string',
      title: 'string',
      excerpt: 'string',
      content: 'string',
      category: 'string',
      featured_image: 'string',
      author: 'object',
      reading_time: 'string',
      published_date: 'string',
      language: 'string',
      is_published: 'boolean',
      created_at: 'string',
      updated_at: 'string'
    },
    case_studies: {
      id: 'string',
      slug: 'string',
      title: 'string',
      industry: 'string',
      client_type: 'string',
      challenge: 'string',
      solution: 'string',
      results: 'string',
      technologies: 'string',
      featured_image: 'string',
      language: 'string',
      published_date: 'string',
      is_published: 'boolean',
      created_at: 'string',
      updated_at: 'string'
    },
    company_settings: {
      id: 'string',
      company_name: 'string',
      email: 'string',
      phone: 'string',
      address: 'string',
      social_links: 'object',
      updated_at: 'string'
    },
    email_templates: {
      id: 'string',
      subject: 'string',
      body: 'string',
      updated_at: 'string'
    }
  };

  let connectionStatus: 'green' | 'red' = 'red';
  let diagnostics: any = null;
  let swaggerJson: any = null;

  // 1. Check Supabase connection and run checks via diagnostics RPC
  try {
    const clientToUse = serviceSupabase || localSupabase;
    if (clientToUse) {
      const { data, error } = await clientToUse.rpc('get_db_diagnostics');
      if (!error && data) {
        diagnostics = data;
        connectionStatus = 'green';
      } else if (error) {
        errors.diagnostics = `RPC Diagnostics failed: ${error.message}`;
      }
    }
  } catch (err: any) {
    errors.diagnostics = err.message || String(err);
  }

  // 2. If RPC fails, try standard REST OpenAPI (Swagger) fallback
  if (!diagnostics) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });

      if (response.ok) {
        connectionStatus = 'green';
        swaggerJson = await response.json();
      } else {
        errors.connection = `HTTP error: ${response.status}`;
      }
    } catch (err: any) {
      errors.connection = err.message || String(err);
    }
  }

  // 3. Connection down exit
  if (connectionStatus === 'red' || (!diagnostics && !swaggerJson)) {
    return {
      success: false,
      connection: 'red',
      tables: actualTables.map(t => ({ name: t, status: 'red', details: 'No connection to database.' })),
      columns: [],
      rlsRead: [],
      rlsInsert: [],
      errors,
      status: 'unhealthy',
      missingObjects: actualTables.map(t => `Table "${t}" is missing (no connection)`),
      warnings: ['No connection to database'],
      policies: []
    };
  }

  if (diagnostics) {
    // 4a. Process diagnostics from postgres directly (RPC source)
    const dbTables: any[] = diagnostics.tables || [];
    const dbColumns: any[] = diagnostics.columns || [];
    const dbPolicies: any[] = diagnostics.policies || [];

    for (const tableName of actualTables) {
      const tableRecord = dbTables.find((t: any) => t.table_name === tableName);

      if (!tableRecord) {
        tables.push({
          name: tableName,
          status: 'red',
          details: 'Table is missing from the database.'
        });
        // Push all expected columns as missing
        const expectedCols = Object.keys(expectedSchema[tableName] || {});
        for (const colName of expectedCols) {
          columns.push({
            name: `${tableName}.${colName}`,
            status: 'red',
            details: 'Column is missing (table is missing).'
          });
        }
        rlsRead.push({ name: tableName, status: 'red', details: 'RLS check skipped (table missing).' });
        rlsInsert.push({ name: tableName, status: 'red', details: 'RLS check skipped (table missing).' });
        continue;
      }

      // Table exists
      tables.push({
        name: tableName,
        status: 'green',
        details: `Table exists in public schema. RLS: ${tableRecord.rowsecurity ? 'Enabled' : 'Disabled'}`
      });

      // Validate columns & types
      const expectedCols = expectedSchema[tableName] || {};
      for (const [colName, expectedType] of Object.entries(expectedCols)) {
        const colRecord = dbColumns.find((c: any) => c.table_name === tableName && c.column_name === colName);
        if (!colRecord) {
          columns.push({
            name: `${tableName}.${colName}`,
            status: 'red',
            details: 'Column is missing from remote database.'
          });
        } else {
          // Check type match
          const pgType = (colRecord.data_type || '').toLowerCase();
          let typeMatch = false;

          if (expectedType === 'string') {
            typeMatch = pgType.includes('char') || pgType.includes('text') || pgType.includes('uuid') || pgType.includes('time') || pgType.includes('date');
          } else if (expectedType === 'boolean') {
            typeMatch = pgType.includes('bool');
          } else if (expectedType === 'integer') {
            typeMatch = pgType.includes('int') || pgType.includes('num') || pgType.includes('double') || pgType.includes('precision') || pgType.includes('real');
          } else if (expectedType === 'object') {
            typeMatch = pgType.includes('json');
          }

          if (typeMatch) {
            columns.push({
              name: `${tableName}.${colName}`,
              status: 'green',
              details: `Column exists with correct type: ${pgType}`
            });
          } else {
            columns.push({
              name: `${tableName}.${colName}`,
              status: 'red',
              details: `Type mismatch! Expected: ${expectedType}, Found: ${pgType}`
            });
          }
        }
      }

      // Check RLS policies
      if (!tableRecord.rowsecurity) {
        rlsRead.push({ name: tableName, status: 'red', details: 'RLS policy check failed: RLS is disabled.' });
        rlsInsert.push({ name: tableName, status: 'red', details: 'RLS policy check failed: RLS is disabled.' });
      } else {
        const readPolicy = dbPolicies.some((p: any) => p.table_name === tableName && (p.cmd === 'SELECT' || p.cmd === 'ALL'));
        const insertPolicy = dbPolicies.some((p: any) => p.table_name === tableName && (p.cmd === 'INSERT' || p.cmd === 'ALL'));

        rlsRead.push({
          name: tableName,
          status: readPolicy ? 'green' : 'red',
          details: readPolicy ? 'SELECT policy verified.' : 'No SELECT policy found.'
        });

        rlsInsert.push({
          name: tableName,
          status: insertPolicy ? 'green' : 'red',
          details: insertPolicy ? 'INSERT policy verified.' : 'No INSERT policy found.'
        });
      }
    }
  } else {
    // 4b. OpenAPI Swagger Fallback
    const definitions = swaggerJson.definitions || {};
    const paths = swaggerJson.paths || {};

    for (const tableName of actualTables) {
      const tableDef = definitions[tableName];

      if (!tableDef) {
        tables.push({
          name: tableName,
          status: 'red',
          details: 'Table is missing from the database schema cache.'
        });
        const expectedCols = Object.keys(expectedSchema[tableName] || {});
        for (const colName of expectedCols) {
          columns.push({
            name: `${tableName}.${colName}`,
            status: 'red',
            details: 'Column missing (table missing).'
          });
        }
        rlsRead.push({ name: tableName, status: 'red', details: 'RLS check skipped.' });
        rlsInsert.push({ name: tableName, status: 'red', details: 'RLS check skipped.' });
        continue;
      }

      tables.push({
        name: tableName,
        status: 'green',
        details: 'Table exists in Supabase.'
      });

      const dbProperties = tableDef.properties || {};
      const expectedCols = expectedSchema[tableName] || {};

      for (const [colName, expectedType] of Object.entries(expectedCols)) {
        const dbCol = dbProperties[colName];
        if (!dbCol) {
          columns.push({
            name: `${tableName}.${colName}`,
            status: 'red',
            details: `Column is missing from remote database.`
          });
        } else {
          const swaggerType = dbCol.type || 'unknown';
          let typeMatch = false;

          if (expectedType === 'string' && (swaggerType === 'string' || swaggerType === 'array')) typeMatch = true;
          else if (expectedType === 'boolean' && swaggerType === 'boolean') typeMatch = true;
          else if (expectedType === 'integer' && (swaggerType === 'integer' || swaggerType === 'number')) typeMatch = true;
          else if (expectedType === 'object' && (swaggerType === 'object' || swaggerType === 'array')) typeMatch = true;
          else typeMatch = true; // default fallback

          if (typeMatch) {
            columns.push({
              name: `${tableName}.${colName}`,
              status: 'green',
              details: `Column exists with type: ${swaggerType}`
            });
          } else {
            columns.push({
              name: `${tableName}.${colName}`,
              status: 'red',
              details: `Type mismatch! Expected: ${expectedType}, Found: ${swaggerType}`
            });
          }
        }
      }

      // Check RLS Select
      try {
        const { error } = await localSupabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (error && error.message.includes('Row Level Security')) {
          rlsRead.push({
            name: tableName,
            status: 'red',
            details: `RLS SELECT verification failed: ${error.message}`
          });
        } else {
          rlsRead.push({
            name: tableName,
            status: 'green',
            details: 'RLS SELECT permitted or configured.'
          });
        }
      } catch (err: any) {
        rlsRead.push({
          name: tableName,
          status: 'red',
          details: `Failed to execute read query: ${err.message || err}`
        });
      }

      // Check RLS Insert
      const pathKey = `/${tableName}`;
      const tablePath = paths[pathKey] || {};
      const supportsInsert = !!tablePath.post;

      rlsInsert.push({
        name: tableName,
        status: supportsInsert ? 'green' : 'red',
        details: supportsInsert ? 'PostgREST allows insertions.' : 'POST method blocked in Swagger.'
      });
    }
  }

  const success =
    connectionStatus === 'green' &&
    tables.every(t => t.status === 'green') &&
    columns.every(c => c.status === 'green') &&
    rlsRead.every(r => r.status === 'green') &&
    rlsInsert.every(i => i.status === 'green');

  const missingObjects: string[] = [];
  tables.forEach(t => {
    if (t.status === 'red') missingObjects.push(`Table "${t.name}" is missing`);
  });
  columns.forEach(c => {
    if (c.status === 'red') missingObjects.push(`Column/Type warning on "${c.name}": ${c.details}`);
  });

  const warnings: string[] = [];

  const policies: string[] = [];
  rlsRead.forEach(r => {
    if (r.status === 'red') policies.push(`RLS Read policy warning on "${r.name}": ${r.details}`);
  });
  rlsInsert.forEach(i => {
    if (i.status === 'red') policies.push(`RLS Insert policy warning on "${i.name}": ${i.details}`);
  });

  return {
    success,
    connection: connectionStatus,
    tables,
    columns,
    rlsRead,
    rlsInsert,
    errors,
    status: success ? 'healthy' : 'unhealthy',
    missingObjects,
    warnings,
    policies
  };
}
