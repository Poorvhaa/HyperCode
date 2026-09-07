const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found at:', envPath);
  process.exit(1);
}

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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configurations in .env.local.');
  console.error('URL:', supabaseUrl ? 'Set' : 'NOT Set');
  console.error('Service Key:', supabaseServiceKey ? 'Set' : 'NOT Set');
  process.exit(1);
}

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

const articles = [
  // --- ENGLISH ARTICLES ---
  {
    slug: 'enterprise-generative-ai-strategic-innovation',
    title: 'How Enterprise Generative AI Drives Strategic Innovation',
    excerpt: 'How organizations can use generative AI to improve operations, strengthen decision-making, accelerate innovation, and build secure, scalable AI capabilities.',
    content: `<p class="lead">How organizations can use generative AI to improve operations, strengthen decision-making, accelerate innovation, and build secure, scalable AI capabilities.</p>`,
    category: 'AI',
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Robert Vance',
      role: 'Practice Director, AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      bio: 'Robert directs our AI practice, engineering secure custom large language model integrations and agent networks for enterprises.'
    },
    reading_time: '8 min read',
    language: 'en',
    is_published: true
  },
  {
    slug: 'ai-in-healthcare',
    title: 'AI in Healthcare: How Intelligent Automation Is Transforming Enterprise Healthcare Operations',
    excerpt: 'A practical enterprise guide to healthcare AI automation, secure architecture, governance, clinical support, predictive analytics, and responsible implementation.',
    content: `<p class="lead">A practical enterprise guide to healthcare AI automation, secure architecture, governance, clinical support, predictive analytics, and responsible implementation.</p>`,
    category: 'AI',
    featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Robert Vance',
      role: 'Practice Director, AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      bio: 'Robert directs our AI practice, engineering secure custom large language model integrations and agent networks for enterprises.'
    },
    reading_time: '18 min read',
    language: 'en',
    is_published: true
  },
  // --- SPANISH ARTICLES ---
  {
    slug: 'enterprise-generative-ai-strategic-innovation',
    title: 'Cómo la IA generativa empresarial impulsa la innovación estratégica',
    excerpt: 'Cómo las organizaciones pueden utilizar la IA generativa para mejorar las operaciones, fortalecer la toma de decisiones, acelerar la innovación y construir capacidades de IA seguras y escalables.',
    content: `<p class="lead">Cómo las organizaciones pueden utilizar la IA generativa para mejorar las operaciones, fortalecer la toma de decisiones, acelerar la innovación y construir capacidades de IA seguras y escalables.</p>`,
    category: 'AI',
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Robert Vance',
      role: 'Director de Práctica, IA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      bio: 'Robert dirige nuestra práctica de IA empresarial, construyendo integraciones seguras de modelos de lenguaje grandes (LLM) y redes de agentes autónomos.'
    },
    reading_time: '8 min de lectura',
    language: 'es',
    is_published: true
  },
  {
    slug: 'ai-in-healthcare',
    title: 'IA en la atención médica: cómo la automatización inteligente está transformando las operaciones empresariales de salud',
    excerpt: 'Una guía empresarial práctica sobre automatización de IA en salud, arquitectura segura, gobernanza, soporte clínico, análisis predictivo e implementación responsable.',
    content: `<p class="lead">Una guía empresarial práctica sobre automatización de IA en salud, arquitectura segura, gobernanza, soporte clínico, análisis predictivo e implementación responsable.</p>`,
    category: 'AI',
    featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Robert Vance',
      role: 'Director de Práctica, IA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      bio: 'Robert dirige nuestra práctica de IA empresarial, construyendo integraciones seguras de modelos de lenguaje grandes (LLM) y redes de agentes autónomos.'
    },
    reading_time: '18 min de lectura',
    language: 'es',
    is_published: true
  }
];

const caseStudies = [
  // --- ENGLISH CASE STUDIES ---
  {
    slug: 'omnichannel-retail-analytics-snowflake-powerbi',
    title: 'Omnichannel Retail Analytics: Connecting Snowflake and Power BI',
    industry: 'Retail BI',
    client_type: 'National Retail Chain',
    challenge: 'The client faced fragmented data across physical store POS terminals and their e-commerce Shopify platform. Analyzing consolidated margins, inventory levels, and customer lifetime value took hours of manual work in Excel, resulting in out-of-stock events and delayed promotions.',
    solution: 'We engineered a centralized modern data platform. We automated ingestion from POS APIs and Shopify databases using Fivetran directly into Snowflake. We set up dbt transformations to clean and model star-schema datasets, and configured highly optimized, direct-query Power BI dashboards for executive leadership.',
    results: 'The executive team gained near-real-time visibility into sales margins across all store clusters. Out-of-stock occurrences dropped by 18% in the first quarter of deployment. Manual Excel reporting overhead was reduced to zero, saving their analytics team 30 hours of work per week.',
    technologies: 'Snowflake, Power BI, dbt, Fivetran',
    featured_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    is_published: true
  },
  {
    slug: 'hipaa-compliant-patient-telemetry-cloud-migration',
    title: 'Migrating Legacy Patient Telemetry to a HIPAA-Compliant Data Cloud',
    industry: 'Healthcare',
    client_type: 'Healthcare Provider Network',
    challenge: 'A large regional healthcare network hosted patient check-in records and medical treatment logs on legacy SQL databases. They struggled with scale limitations during peak times, database maintenance downtime, and security compliance audits under strict federal regulations.',
    solution: 'We migrated the client to AWS cloud environments, designing a HIPAA-compliant Snowflake data architecture. We deployed column-level masking for Protected Health Information (PHI), encrypted all storage volumes with custom AWS KMS keys, and structured audit logs using Apache Airflow orchestration pipelines.',
    results: 'The healthcare network achieved 100% compliance in their annual regulatory audit. Search queries for patient histories completed in under two seconds instead of minutes. Computing storage cost decreased by 35% due to Snowflake Auto-Suspend and storage compression.',
    technologies: 'AWS, Snowflake, dbt, Apache Airflow',
    featured_image: 'https://images.unsplash.com/photo-1504813184591-01552ff75805?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    is_published: true
  },
  {
    slug: 'financial-data-lakehouse-modernization',
    title: 'Financial Data Lakehouse Modernization for Real-Time Execution Audit',
    industry: 'Cloud DW',
    client_type: 'Global Investment Fund',
    challenge: 'The investment firm processed high-volume financial trade logs. Their traditional relational servers suffered query timeouts when analyzing daily transaction telemetry, hindering auditing teams from verifying execution pricing benchmarks on time.',
    solution: 'We deployed a unified Lakehouse platform using Databricks on Microsoft Azure. We converted raw log ingestion to Delta Lake format with Spark streaming nodes, enabling ACID transaction support on top of cheap object storage, and built optimized analytics tables.',
    results: 'Daily auditing times dropped from 6 hours to under 15 minutes. The trading team gained the capability to analyze transaction cost metrics in near-real-time. Platform maintenance overhead dropped by 50% due to automated cloud cluster management.',
    technologies: 'Databricks, Delta Lake, Azure, Spark',
    featured_image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    is_published: true
  },
  {
    slug: 'nextjs-custom-portal-logistics-fleet',
    title: 'Next.js Custom Portal for Logistics Fleet Orchestration',
    industry: 'Enterprise Web',
    client_type: 'Logistics & Transport Enterprise',
    challenge: 'The client managed thousands of transport shipments across North America using outdated communication channels (email, phone, text). Drivers and dispatchers lacked a central system to view route updates, upload digital bills of lading, and request fuel cards.',
    solution: 'We designed and built a mobile-first web portal using Next.js, Tailwind CSS, and Supabase. The portal features responsive driver check-in pages, integrated real-time GPS coordinates via map APIs, automated push notifications, and secure digital file uploads for billing.',
    results: 'Shipment check-in delays dropped by 45% within the first month. Driver retention increased due to the modern mobile application experience. Dispatchers eliminated manual tracking logs, resolving issues 3x faster using the interactive dashboard.',
    technologies: 'Next.js, Tailwind CSS, Supabase, Node.js',
    featured_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    is_published: true
  },
  {
    slug: 'rapid-deployment-cloud-migration-scrum-squads',
    title: 'Rapid Deployment of Cloud Migration Scrum Squads',
    industry: 'Staffing',
    client_type: 'Fintech Startup',
    challenge: 'The client needed to migrate their banking software to AWS Kubernetes platforms to meet compliance deadlines. They lacked certified cloud engineers, DevOps administrators, and technical scrum masters internally, facing project delays.',
    solution: 'We rapidly assembled and deployed a dedicated tech squad of four senior certified Cloud/DevOps engineers. We integrated them directly into the client\'s daily sprints, setting up automated CI/CD deployment pipelines, infrastructure as code using Terraform, and microservices clustering.',
    results: 'The Kubernetes cloud environment was deployed and verified 3 weeks ahead of schedule. The fintech company passed their audit with zero security issues. The client\'s internal engineering team received thorough training on managing Kubernetes deployments.',
    technologies: 'Kubernetes, Terraform, AWS, DevOps',
    featured_image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    is_published: true
  },

  // --- SPANISH CASE STUDIES ---
  {
    slug: 'analitica-minorista-omnicanal-snowflake-powerbi',
    title: 'Analítica de comercio minorista omnicanal: conectando Snowflake y Power BI',
    industry: 'Retail BI',
    client_type: 'Cadena de Tiendas Nacional',
    challenge: 'El cliente tenía datos dispersos entre terminales de tiendas físicas y su comercio en línea Shopify. Analizar márgenes unificados e inventario requería muchas horas manuales de Excel, causando quiebres de stock frecuentes.',
    solution: 'Diseñamos una plataforma de datos moderna. Automatizamos la ingesta de Shopify y puntos de venta en Snowflake usando Fivetran. Estructuramos modelos de datos mediante dbt y configuramos tableros directos en Power BI para los directores.',
    results: 'La gerencia obtuvo visibilidad total de las ventas por sucursales. Las pérdidas por falta de stock disminuyeron en un 18%. El tiempo dedicado a generar informes semanales se redujo a cero, liberando 30 horas analíticas semanales.',
    technologies: 'Snowflake, Power BI, dbt, Fivetran',
    featured_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    language: 'es',
    is_published: true
  },
  {
    slug: 'migracion-telemetria-pacientes-nube-hipaa',
    title: 'Migración de telemetría de pacientes a una nube de datos compatible con HIPAA',
    industry: 'Healthcare',
    client_type: 'Red de Proveedores de Salud',
    challenge: 'Una red regional de salud alojaba registros de pacientes en servidores locales propensos a caídas por saturación. Esto dificultaba pasar auditorías de seguridad bajo regulaciones HIPAA federales.',
    solution: 'Migramos el entorno a AWS bajo una arquitectura segura de Snowflake. Implementamos enmascaramiento de datos personales, cifrado con claves AWS KMS y registro automatizado de accesos mediante Airflow.',
    results: 'La red médica obtuvo 100% de cumplimiento en su auditoría federal anual. Las búsquedas de historiales médicos bajaron a menos de dos segundos. Los costos de hardware bajaron un 35% gracias al autoapagado de Snowflake.',
    technologies: 'AWS, Snowflake, dbt, Apache Airflow',
    featured_image: 'https://images.unsplash.com/photo-1504813184591-01552ff75805?auto=format&fit=crop&w=800&q=80',
    language: 'es',
    is_published: true
  },
  {
    slug: 'modernizacion-lakehouse-datos-financieros',
    title: 'Modernización del Lakehouse de datos financieros para auditorías en tiempo real',
    industry: 'Cloud DW',
    client_type: 'Fondo de Inversión Global',
    challenge: 'Una firma de inversiones procesaba millones de transacciones por segundo. Su base de datos tradicional colapsaba al realizar auditorías, impidiendo comprobar precios de ejecución a tiempo.',
    solution: 'Instalamos una plataforma Lakehouse utilizando Databricks en Azure. Convertimos los registros de transacciones a formato Delta Lake y estructuramos un flujo de streaming con Spark para optimizar las consultas.',
    results: 'El proceso de auditoría diaria pasó de requerir 6 horas a completarse en 15 minutos. El equipo de inversiones analiza costos en tiempo real. Se redujeron a la mitad las tareas de mantenimiento de servidores.',
    technologies: 'Databricks, Delta Lake, Azure, Spark',
    featured_image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    language: 'es',
    is_published: true
  },
  {
    slug: 'portal-personalizado-nextjs-flotas-logisticas',
    title: 'Portal personalizado en Next.js para la orquestación de flotas logísticas',
    industry: 'Enterprise Web',
    client_type: 'Empresa de Logística y Transporte',
    challenge: 'La empresa controlaba miles de despachos mediante correos electrónicos e intercambio telefónico de datos. Los transportistas no contaban con un sistema ágil para reportar incidentes o adjuntar hojas de ruta.',
    solution: 'Desarrollamos un portal responsivo utilizando Next.js, Tailwind CSS y Supabase. El sistema permite registrar ubicaciones GPS por mapa, alertas de estado inmediatas y digitalizar facturación con carga segura de archivos.',
    results: 'Los retrasos en confirmación de despachos bajaron 45% en 30 días. Los conductores valoraron positivamente la usabilidad del sistema móvil. La mesa de ayuda resolvió incidencias 3 veces más rápido.',
    technologies: 'Next.js, Tailwind CSS, Supabase, Node.js',
    featured_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    language: 'es',
    is_published: true
  },
  {
    slug: 'despliegue-rapido-equipos-migracion-nube',
    title: 'Despliegue rápido de equipos de migración a la nube (Scrum Squads)',
    industry: 'Staffing',
    client_type: 'Startup de Fintech',
    challenge: 'La fintech requería migrar sus aplicativos bancarios a Kubernetes en AWS para cumplir con plazos normativos. Carecían de especialistas en nube internos y se arriesgaban a sanciones por demora.',
    solution: 'Asignamos e integramos un equipo técnico compuesto por 4 ingenieros sénior de Cloud y DevOps. Configuramos integración continua (CI/CD) automatizada e Infraestructura como Código (IaC) con Terraform.',
    results: 'El entorno de nube productivo se desplegó y auditó con éxito 3 semanas antes del plazo límite. La fintech superó la revisión con cero no-conformidades. Se capacitó al equipo del cliente en operaciones Kubernetes.',
    technologies: 'Kubernetes, Terraform, AWS, DevOps',
    featured_image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    language: 'es',
    is_published: true
  }
];

async function seed() {
  try {
    console.log('Starting DB Seed...');

    // 1. Clean existing records (Optional, safe with where filter, but we want a clean wipe)
    console.log('Wiping existing articles...');
    const { error: artDelError } = await supabase
      .from('articles')
      .delete()
      .neq('slug', 'does_not_exist_prevent_accidents_but_delete_all');
    if (artDelError) {
      console.warn('Wiping articles warning/error:', artDelError);
    }

    console.log('Wiping existing case studies...');
    const { error: csDelError } = await supabase
      .from('case_studies')
      .delete()
      .neq('slug', 'does_not_exist_prevent_accidents_but_delete_all');
    if (csDelError) {
      console.warn('Wiping case studies warning/error:', csDelError);
    }

    // 2. Insert Articles
    console.log(`Inserting ${articles.length} articles...`);
    const { data: insertedArts, error: artInsError } = await supabase
      .from('articles')
      .insert(articles)
      .select();
    
    if (artInsError) {
      console.error('Error inserting articles:', artInsError);
    } else {
      console.log(`Successfully inserted ${insertedArts.length} articles.`);
    }

    // 3. Insert Case Studies
    console.log(`Inserting ${caseStudies.length} case studies...`);
    const { data: insertedCS, error: csInsError } = await supabase
      .from('case_studies')
      .insert(caseStudies)
      .select();

    if (csInsError) {
      console.error('Error inserting case studies:', csInsError);
    } else {
      console.log(`Successfully inserted ${insertedCS.length} case studies.`);
    }

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Seed crash:', err);
  }
}

seed();
