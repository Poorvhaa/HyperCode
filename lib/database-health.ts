import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Re-create a client inside the health check to avoid dependency cycles
const localSupabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
      errors: { general: 'Supabase URL or Anon Key is missing.' }
    };
  }

  // The 7 ACTUAL tables currently present in Supabase
  const actualTables = [
    'articles',
    'candidates',
    'case_studies',
    'consultation_requests'
  ];

  // The expected columns for each table based on ACTUAL Supabase schema
  const expectedSchema: Record<string, string[]> = {
    articles: [
      'id',
      'slug',
      'title',
      'excerpt',
      'content',
      'category',
      'featured_image',
      'author',
      'reading_time',
      'published_date',
      'language',
      'is_published',
      'created_at'
    ],
    candidates: [
      'id',
      'created_at',
      'name',
      'email',
      'phone',
      'linkedin',
      'resume_url',
      'skills',
      'experience',
      'availability',
      'location',
      'status'
    ],
    case_studies: [
      'id',
      'slug',
      'title',
      'industry',
      'client_type',
      'challenge',
      'solution',
      'results',
      'technologies',
      'featured_image',
      'language',
      'published_date',
      'is_published',
      'created_at'
    ],
    consultation_requests: [
      'id',
      'created_at',
      'full_name',
      'company',
      'email',
      'phone',
      'service_interest',
      'project_description',
      'budget',
      'timeline',
      'status'
    ]
  };

  let connectionStatus: 'green' | 'red' = 'red';
  let swaggerJson: any = null;

  // 1. Check Supabase Connection & Fetch OpenAPI Schema Definitions
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

  if (connectionStatus === 'red' || !swaggerJson) {
    return {
      success: false,
      connection: 'red',
      tables: actualTables.map(t => ({ name: t, status: 'red', details: 'No connection to database.' })),
      columns: [],
      rlsRead: [],
      rlsInsert: [],
      errors
    };
  }

  const definitions = swaggerJson.definitions || {};
  const paths = swaggerJson.paths || {};

  // 2. Validate Table & Column Existence
  for (const tableName of actualTables) {
    const tableDef = definitions[tableName];

    if (!tableDef) {
      tables.push({
        name: tableName,
        status: 'red',
        details: 'Table is missing from the database schema cache.'
      });
      continue;
    }

    tables.push({
      name: tableName,
      status: 'green',
      details: 'Table exists in Supabase.'
    });

    const dbProperties = tableDef.properties || {};
    const expectedCols = expectedSchema[tableName] || [];

    for (const colName of expectedCols) {
      const dbCol = dbProperties[colName];
      if (!dbCol) {
        columns.push({
          name: `${tableName}.${colName}`,
          status: 'red',
          details: `Column is missing from remote database.`
        });
      } else {
        columns.push({
          name: `${tableName}.${colName}`,
          status: 'green',
          details: `Column exists with type: ${dbCol.type || 'unknown'}`
        });
      }
    }

    // 3. Verify RLS SELECT Access (Read)
    try {
      const { error } = await localSupabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        rlsRead.push({
          name: tableName,
          status: 'red',
          details: `RLS SELECT verification failed: ${error.message}`
        });
      } else {
        rlsRead.push({
          name: tableName,
          status: 'green',
          details: 'RLS SELECT permitted (returned success code).'
        });
      }
    } catch (err: any) {
      rlsRead.push({
        name: tableName,
        status: 'red',
        details: `Failed to execute read query: ${err.message || err}`
      });
    }

    // 4. Verify RLS INSERT Access
    // We check the OpenAPI paths metadata. If the path /tableName supports the POST method,
    // it indicates that anonymous or authenticated users can insert records into this table.
    const pathKey = `/${tableName}`;
    const tablePath = paths[pathKey] || {};
    const supportsInsert = !!tablePath.post;

    if (supportsInsert) {
      rlsInsert.push({
        name: tableName,
        status: 'green',
        details: 'PostgREST allows insertions (POST method is public/defined).'
      });
    } else {
      rlsInsert.push({
        name: tableName,
        status: 'red',
        details: 'POST method not advertised in OpenAPI spec. Insertions might be blocked.'
      });
    }
  }

  const success =
    connectionStatus === 'green' &&
    tables.every(t => t.status === 'green') &&
    columns.every(c => c.status === 'green');

  return {
    success,
    connection: connectionStatus,
    tables,
    columns,
    rlsRead,
    rlsInsert,
    errors
  };
}
