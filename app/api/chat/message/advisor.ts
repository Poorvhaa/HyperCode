import enMessages from '../../../../messages/en.json';
import esMessages from '../../../../messages/es.json';

interface AdvisorResponse {
  message: string;
  suggestedPrompts: string[];
  flowTrigger?: string; // e.g. "lead_form", "consultation_form", "staffing_form"
}

interface UserContext {
  companySize?: 'startup' | 'growth' | 'enterprise';
  teamSize?: string;
  provider?: string;
  challenges?: string;
}

function getLastTopic(history?: { sender: 'user' | 'assistant', message: string }[]): string | null {
  if (!history || history.length === 0) return null;
  // Scan backwards from newest to oldest to find the last topic discussed
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i].message.toLowerCase();
    if (msg.includes('cto') || msg.includes('architecture') || msg.includes('mvp') || msg.includes('strategy') || msg.includes('arquitectura') || msg.includes('estrategia') || msg.includes('asesoría')) return 'cto';
    if (msg.includes('cloud') || msg.includes('devops') || msg.includes('migration') || msg.includes('nube') || msg.includes('migración')) return 'cloud';
    if (msg.includes('chatbot') || msg.includes('automation') || msg.includes('automatización') || msg.includes('ai') || msg.includes('ia') || msg.includes('generative') || msg.includes('inteligencia')) return 'ai';
    if (msg.includes('bi') || msg.includes('power bi') || msg.includes('tableau') || msg.includes('dashboard') || msg.includes('tablero') || msg.includes('kpi')) return 'bi';
    if (msg.includes('analytics') || msg.includes('analítica') || msg.includes('data') || msg.includes('datos') || msg.includes('platforms')) return 'data';
    if (msg.includes('staffing') || msg.includes('augmentation') || msg.includes('contratar') || msg.includes('talento') || msg.includes('personal') || msg.includes('sourcing')) return 'staffing';
    if (msg.includes('web') || msg.includes('next.js') || msg.includes('saas') || msg.includes('react')) return 'web';
    if (msg.includes('mobile') || msg.includes('flutter') || msg.includes('app') || msg.includes('móvil')) return 'mobile';
    if (msg.includes('software') || msg.includes('erp') || msg.includes('crm')) return 'software';
    if (msg.includes('security') || msg.includes('cyber') || msg.includes('seguridad') || msg.includes('compliance') || msg.includes('soc2')) return 'security';
    if (msg.includes('digital') || msg.includes('transformation') || msg.includes('transformación')) return 'digital';
    if (msg.includes('cost') || msg.includes('costo') || msg.includes('price') || msg.includes('precio') || msg.includes('optimización') || msg.includes('optimizacion')) return 'cost';
  }
  return null;
}

function extractUserContext(history?: { sender: 'user' | 'assistant', message: string }[]): UserContext {
  const context: UserContext = {};
  if (!history) return context;
  for (const h of history) {
    if (h.sender !== 'user') continue;
    const msg = h.message.toLowerCase();
    
    // Detect company stage
    if (msg.includes('startup')) context.companySize = 'startup';
    else if (msg.includes('growth') || msg.includes('crecimiento') || msg.includes('scaleup')) context.companySize = 'growth';
    else if (msg.includes('enterprise') || msg.includes('corporate') || msg.includes('corporativo')) context.companySize = 'enterprise';

    // Detect team size / engineer counts
    const teamMatch = msg.match(/(\d+)\s*(engineers|developers|people|devs|ingenieros|desarrolladores|personas)/);
    if (teamMatch) {
      context.teamSize = teamMatch[1];
    }
    
    // Detect cloud provider
    if (msg.includes('aws') || msg.includes('amazon')) context.provider = 'AWS';
    else if (msg.includes('azure') || msg.includes('microsoft')) context.provider = 'Azure';
    else if (msg.includes('gcp') || msg.includes('google cloud')) context.provider = 'Google Cloud';
  }
  return context;
}

export function generateAdvisorResponse(
  userMessage: string,
  language: 'en' | 'es',
  history?: { sender: 'user' | 'assistant', message: string }[]
): AdvisorResponse {
  const msg = userMessage.toLowerCase().trim();
  const isEs = language === 'es';
  const rawAdvisor = isEs ? esMessages.AIConsultant.advisor : enMessages.AIConsultant.advisor;

  const lastTopic = getLastTopic(history);
  const userContext = extractUserContext(history);

  // 1. Check for Contact Sales / Consultation Intake Intent
  const isSales = msg.includes('contact sales') || msg.includes('schedule call') || msg.includes('book consultation') || msg.includes('sales') || msg.includes('ventas') || msg.includes('expert') || msg.includes('contactar experto') || msg.includes('scoping call') || msg.includes('llamada de alcance') || msg.includes('consultation') || msg.includes('consulta') || msg.includes('cita') || msg.includes('agendar') || msg.includes('programar') || msg.includes('book');

  if (isSales) {
    return {
      message: isEs
        ? "Excelente. Para programar una llamada de alcance técnico con nuestro director de práctica, por favor seleccione una de las siguientes opciones o complete el formulario de consulta."
        : "Excellent. To schedule a technical scoping call with our practice director, please select one of the options below or submit the consultation request form.",
      suggestedPrompts: isEs
        ? ["Agendar llamada ahora", "Calificar mi proyecto", "Volver al inicio"]
        : ["Schedule call now", "Qualify my project", "Back to Start"],
      flowTrigger: 'consultation_form'
    };
  }

  // 2. Identify Predefined Intents / Topics
  const isCTO = msg.includes('cto') || msg.includes('chief technology officer') || msg.includes('architecture review') || msg.includes('product strategy') || msg.includes('mvp dev') || msg.includes('mvp development') || msg.includes('evaluación de arquitectura') || msg.includes('estrategia de producto') || msg.includes('desarrollo de mvp') || msg.includes('revisión de arquitectura') || msg.includes('revisión técnica') || msg.includes('technical review') || msg.includes('technical bottlenecks');
  const isAI = msg.includes('chatbot') || msg.includes('rag') || msg.includes('automation') || msg.includes('automatización') || msg.includes('agent') || msg.includes('agente') || msg.includes('ai') || msg.includes('ia') || msg.includes('generativa') || msg.includes('generative') || msg.includes('artificial') || msg.includes('copilot') || msg.includes('inteligencia artificial');
  const isCloud = msg.includes('cloud') || msg.includes('devops') || msg.includes('migration') || msg.includes('nube') || msg.includes('migración') || msg.includes('migracion') || msg.includes('aws') || msg.includes('azure') || msg.includes('gcp') || msg.includes('kubernetes') || msg.includes('terraform') || msg.includes('ci/cd') || msg.includes('ci-cd');
  const isBI = msg.includes('bi') || msg.includes('power bi') || msg.includes('tableau') || msg.includes('dashboard') || msg.includes('tablero') || msg.includes('reporting') || msg.includes('reportes') || msg.includes('kpi') || msg.includes('etl') || msg.includes('métrica') || msg.includes('metrics');
  const isData = msg.includes('analytics') || msg.includes('analítica') || msg.includes('analitica') || msg.includes('predictive') || msg.includes('snowflake') || msg.includes('bigquery') || msg.includes('data platform') || msg.includes('plataforma de datos') || msg.includes('data engineering') || msg.includes('ingeniería de datos') || msg.includes('big data') || msg.includes('platforms');
  const isSoftware = msg.includes('software development') || msg.includes('custom software') || msg.includes('desarrollo de software') || msg.includes('erp') || msg.includes('crm') || msg.includes('enterprise crm') || msg.includes('crm empresarial') || msg.includes('desarrollo erp');
  const isWeb = msg.includes('web development') || msg.includes('desarrollo web') || msg.includes('next.js') || msg.includes('react') || msg.includes('saas') || msg.includes('website') || msg.includes('web');
  const isMobile = msg.includes('mobile') || msg.includes('móvil') || msg.includes('movil') || msg.includes('flutter') || msg.includes('react native') || msg.includes('ios') || msg.includes('android') || msg.includes('app') || msg.includes('aplicación móvil') || msg.includes('aplicacion movil');
  const isStaffing = msg.includes('staffing') || msg.includes('augmentation') || msg.includes('augment') || msg.includes('sourcing') || msg.includes('hire talent') || msg.includes('contratar talento') || msg.includes('personal') || msg.includes('reclutamiento') || msg.includes('developers') || msg.includes('desarrolladores') || msg.includes('talent');
  const isDigital = msg.includes('digital') || msg.includes('transformation') || msg.includes('transformación') || msg.includes('transformacion') || msg.includes('legacy') || msg.includes('modernización') || msg.includes('modernizacion') || msg.includes('audit');
  const isSecurity = msg.includes('security') || msg.includes('cyber') || msg.includes('ciberseguridad') || msg.includes('pentest') || msg.includes('penetration testing') || msg.includes('compliance') || msg.includes('cumplimiento') || msg.includes('soc2') || msg.includes('iam');
  const isCost = msg.includes('cost optimization') || msg.includes('cost reduction') || msg.includes('reduce cost') || msg.includes('optimización de costos') || msg.includes('optimización de costo') || msg.includes('costos') || msg.includes('costo') || msg.includes('billing') || msg.includes('factura');

  // 3. Define Main Blueprint Responses
  const blueprints = {
    cto: {
      en: "HyperCode's **CTO Advisory & Product Strategy** services help organizations make strategic technology decisions, scale engineering teams, modernize software architecture, and align technology with business goals.\n\n* **Core Focus:** Architecture reviews, MVP scoping, technology selections, and developer workflow scaling.\n* **Business Benefits:** Accelerates time-to-market, mitigates engineering technical debt early, and establishes clean pipelines.\n\nWhat stage is your company currently in: startup, growth, or enterprise?",
      es: "Los servicios de **Asesoría de CTO y Estrategia de Producto** de HyperCode ayudan a las organizaciones a tomar decisiones tecnológicas estratégicas, escalar equipos de ingeniería, modernizar la arquitectura de software y alinear la tecnología con los objetivos comerciales.\n\n* **Enfoque Principal:** Revisiones de arquitectura, alcance de MVP, selección de tecnologías y escalado de flujos de trabajo de desarrolladores.\n* **Beneficios Comerciales:** Acelera el lanzamiento al mercado, mitiga la deuda técnica tempranamente y establece pipelines limpios.\n\n¿En qué etapa se encuentra su empresa actualmente: startup, crecimiento o corporativo?",
      suggested: isEs
        ? ["Startup", "Crecimiento", "Corporativo", "Revisión de Arquitectura", "Programar Consulta"]
        : ["Startup", "Growth", "Enterprise", "Architecture Review", "Schedule Consultation"]
    },
    ai: {
      en: "We design and engineer bespoke **AI & Automation** systems, deploying Retrieval-Augmented Generation (RAG) knowledge bases, custom LLM integrations, and autonomous agentic workflows.\n\n* **Capabilities:** OpenAI/Gemini/Anthropic API integrations, semantic search engines (Pinecone, pgvector), and custom LangChain pipelines.\n* **Business Benefits:** Minimizes client support workloads, automates text auditing, and increases business efficiency.\n\nWhich business process would you like to automate first: customer support, data entry, or search?",
      es: "Diseñamos y desarrollamos sistemas personalizados de **IA y Automatización**, implementando bases de conocimiento con RAG, integraciones de LLM a medida y flujos de agentes autónomos.\n\n* **Capacidades:** Integración con APIs de OpenAI/Gemini/Anthropic, motores de búsqueda semántica (Pinecone, pgvector) y pipelines con LangChain.\n* **Beneficios Comerciales:** Minimiza las cargas de soporte técnico, automatiza auditorías de texto y mejora la eficiencia.\n\n¿Qué proceso de negocio le gustaría automatizar primero: soporte al cliente, ingreso de datos o búsqueda?",
      suggested: isEs
        ? ["Soporte al cliente", "Ingreso de datos", "Búsqueda semántica", "Programar Consulta"]
        : ["Customer Support", "Data Entry", "Semantic Search", "Schedule Consultation"]
    },
    cloud: {
      en: "HyperCode delivers robust **Cloud Migration & DevOps** engineering. We containerize application stacks, automate infrastructure setup (IaC), and orchestrate deployment pipelines.\n\n* **Capabilities:** AWS, Azure, Google Cloud deployments, Kubernetes, Terraform IaC, and secure CI/CD pipelines.\n* **Business Benefits:** Eliminates system downtime, reduces cloud bills, and enables zero-downtime rolling deploys.\n\nAre you planning a full cloud migration or a hybrid approach?",
      es: "HyperCode ofrece ingeniería de **Migración Cloud y DevOps** de alto nivel. Contenedorizamos aplicaciones, automatizamos configuraciones de infraestructura (IaC) y orquestamos despliegues.\n\n* **Capacidades:** Implementaciones en AWS, Azure y Google Cloud, Kubernetes, Terraform IaC y pipelines CI/CD seguros.\n* **Beneficios de Negocio:** Elimina caídas del sistema, reduce la factura cloud y permite despliegues continuos sin interrupciones.\n\n¿Está planeando una migración completa a la nube o un enfoque híbrido?",
      suggested: isEs
        ? ["Migración Completa", "Enfoque Híbrido", "Optimización de Costos", "Programar Consulta"]
        : ["Full Cloud Migration", "Hybrid Approach", "Cost Optimization", "Schedule Consultation"]
    },
    bi: {
      en: "Our **Business Intelligence** services connect scattered database systems into interactive reporting panels.\n\n* **Capabilities:** Custom Tableau and Power BI setup, ETL modeling, and data warehouse staging.\n* **Business Benefits:** Replaces guessing with data-driven metrics and exposes operation bottlenecks.\n\nWhich database or reporting tools are you currently using?",
      es: "Nuestros servicios de **Inteligencia de Negocios** conectan bases de datos distribuidas en paneles de control interactivos.\n\n* **Capacidades:** Configuraciones personalizadas de Tableau y Power BI, modelado ETL y almacenes de datos.\n* **Beneficios Comerciales:** Reemplaza estimaciones con métricas reales y expone cuellos de botella.\n\n¿Qué herramientas de base de datos o reportería está utilizando actualmente?",
      suggested: isEs
        ? ["Power BI", "Tableau", "Métricas KPI", "Programar Consulta"]
        : ["Power BI", "Tableau", "KPI Metrics", "Schedule Consultation"]
    },
    data: {
      en: "Our **Data Analytics & Platform** engineering structures clean data pipelines, sets up warehouse architectures, and deploys predictive statistical modeling.\n\n* **Capabilities:** Snowflake, Google BigQuery setups, Python processing pipelines, and data cleaning scripts.\n* **Business Benefits:** Provides real-time event analytics and predicts customer churn patterns.\n\nAre you looking to structure raw data feeds, perform predictive modeling, or clean existing databases?",
      es: "Nuestra ingeniería de **Analítica de Datos y Plataformas** estructura flujos de datos limpios, diseña almacenes de datos y despliega modelado estadístico predictivo.\n\n* **Capacidades:** Snowflake, BigQuery, pipelines de procesamiento en Python y scripts de limpieza de datos.\n* **Beneficios de Negocio:** Proporciona analíticas en tiempo real y predice patrones de comportamiento.\n\n¿Busca estructurar flujos de datos crudos, realizar modelado predictivo o limpiar bases de datos existentes?",
      suggested: isEs
        ? ["Modelos Predictivos", "Ingeniería de Datos", "Snowflake / BigQuery", "Programar Consulta"]
        : ["Predictive Models", "Data Engineering", "Snowflake / BigQuery", "Schedule Consultation"]
    },
    software: {
      en: "HyperCode designs custom **Bespoke Software Development** projects, automating workflows via tailor-made ERPs, CRMs, and internal systems.\n\n* **Capabilities:** Full-stack development, multi-tenant cloud software, security compliance, and custom database schemas.\n* **Business Benefits:** Eliminates recurring license fees and guarantees complete alignment with your business logic.\n\nDo you need to build custom ERP workflows, a proprietary CRM solution, or modern databases?",
      es: "HyperCode diseña proyectos de **Desarrollo de Software a Medida**, automatizando operaciones con ERPs y CRMs personalizados.\n\n* **Capacidades:** Desarrollo full-stack, software multi-inquilino, cumplimiento de seguridad y esquemas de bases de datos.\n* **Beneficios:** Elimina licencias de software recurrentes y garantiza alineación absoluta con sus reglas comerciales.\n\n¿Necesita flujos de ERP a medida, un CRM propio o modernizar sus bases de datos?",
      suggested: isEs
        ? ["Desarrollo ERP", "CRM Empresarial", "Arquitectura de BD", "Programar Consulta"]
        : ["Custom ERP Dev", "Enterprise CRM", "Database Architecture", "Schedule Consultation"]
    },
    web: {
      en: "Our **Web Development** practice builds high-converting SaaS platforms and web portals with clean visual designs and high performance metrics.\n\n* **Stack:** Next.js, React, Node.js, and serverless edge delivery.\n* **Business Benefits:** Sub-second page speeds improve conversion rates and bolster SEO indexing.\n\nAre you building a new SaaS platform, redone an enterprise site, or developing custom APIs?",
      es: "Nuestra práctica de **Desarrollo Web** construye plataformas SaaS y portales web de alto rendimiento con diseños visuales limpios.\n\n* **Stack:** Next.js, React, Node.js y funciones edge serverless.\n* **Beneficios:** Velocidades de carga subsegundo que impulsan la conversión y mejoran el SEO.\n\n¿Planea construir un nuevo SaaS, rediseñar un sitio corporativo o desarrollar APIs a medida?",
      suggested: isEs
        ? ["Desarrollo SaaS", "Desarrollo Next.js", "Integración de APIs", "Programar Consulta"]
        : ["SaaS Development", "Next.js & React Dev", "API Integration", "Schedule Consultation"]
    },
    mobile: {
      en: "We develop premium **Mobile Applications** for iOS and Android, focusing on seamless performance, offline caching, and responsive designs.\n\n* **Capabilities:** Cross-platform React Native and Flutter apps, or native Swift and Android Kotlin frameworks.\n* **Business Benefits:** Direct engagement via push alerts and full hardware integration.\n\nShould we target native iOS/Android development or a cross-platform solution like Flutter?",
      es: "Desarrollamos **Aplicaciones Móviles** premium para iOS y Android, con alto rendimiento y almacenamiento en caché sin conexión.\n\n* **Capacidades:** Aplicaciones multiplataforma con React Native y Flutter, o desarrollos nativos Swift y Kotlin.\n* **Beneficios:** Interacción directa con notificaciones push e integración de hardware.\n\n¿Prefiere un desarrollo nativo iOS/Android o una solución multiplataforma como Flutter?",
      suggested: isEs
        ? ["React Native", "Soluciones Flutter", "Apps iOS/Android", "Programar Consulta"]
        : ["React Native Apps", "Flutter Solutions", "iOS/Android Apps", "Schedule Consultation"]
    },
    staffing: {
      en: "Our **Talent Solutions & IT Staff Augmentation** supplies pre-screened technical engineers directly to your team or recruits dedicated squads.\n\n* **Offerings:** Dedicated developer teams, temporary contractors, or direct hire placements.\n* **Business Benefits:** Onboard high-quality engineers within 5 to 10 days, saving hiring costs.\n\nWhat technology skills are you looking to bring on: frontend, backend, or cloud infrastructure?",
      es: "Nuestras **Soluciones de Talento y Aumento de Personal TI** suministran ingenieros técnicos pre-seleccionados directamente a sus equipos.\n\n* **Modelos:** Equipos dedicados, contratistas temporales o colocaciones directas.\n* **Beneficios:** Incorpore ingenieros en 5-10 días hábiles, ahorrando costos de reclutamiento.\n\n¿Qué habilidades de desarrollo busca incorporar: frontend, backend o infraestructura cloud?",
      suggested: isEs
        ? ["Cotizar Personal", "Aumento de Personal", "Equipos Dedicados", "Programar Consulta"]
        : ["Get Staffing Quote", "Augment Tech Team", "Dedicated Squads", "Schedule Consultation"]
    },
    digital: {
      en: "HyperCode leads **Digital Transformation** audits, helping organizations transition from legacy monoliths to modern microservices.\n\n* **Core Focus:** Scoping legacy tech stacks, workflow automation maps, and technical audits.\n* **Business Benefits:** Drastically cuts operational friction and avoids system outages.\n\nAre you looking to modernize legacy databases or rewrite outdated web applications?",
      es: "HyperCode lidera auditorías de **Transformación Digital**, ayudando a empresas a transicionar de plataformas legadas a microservicios.\n\n* **Enfoque:** Diagnóstico de stacks obsoletos, mapas de automatización y auditorías técnicas.\n* **Beneficios:** Reduce la fricción operativa y evita costosas caídas de sistemas antiguos.\n\n¿Busca modernizar bases de datos heredadas o reescribir aplicaciones obsoletas?",
      suggested: isEs
        ? ["Auditoría Digital", "Modernización Legada", "Asesoría de CTO", "Programar Consulta"]
        : ["Digital Audit", "Legacy Modernization", "CTO Advisory", "Schedule Consultation"]
    },
    security: {
      en: "Our **Cybersecurity & Compliance** practice executes pen-testing, audits configurations, and secures corporate network architectures.\n\n* **Offerings:** SOC2 setup support, database audits, and penetration testing reports.\n* **Business Benefits:** Defends proprietary user data and guarantees strict compliance benchmarks.\n\nWould you like to initiate a secure penetration test or a compliance audit?",
      es: "Nuestra práctica de **Ciberseguridad y Cumplimiento** ejecuta pruebas de penetración, audita configuraciones y asegura accesos.\n\n* **Modelos:** Soporte para cumplimiento SOC2, auditorías de accesos y reportes de penetración.\n* **Beneficios:** Protege datos comerciales sensibles y asegura estándares regulados.\n\n¿Desea iniciar una prueba de penetración o una auditoría de cumplimiento?",
      suggested: isEs
        ? ["Pruebas de Penetración", "Cumplimiento SOC2", "Auditoría de IAM", "Programar Consulta"]
        : ["Penetration Testing", "SOC2 Compliance", "IAM Security Audit", "Schedule Consultation"]
    },
    cost: {
      en: "Our **Cloud Cost Optimization** auditing scans cloud resources (AWS, Azure, GCP) to right-size database instances and identify billing waste.\n\n* **Business Benefits:** Lowers monthly server costs by 25% to 40% while preserving performance thresholds.\n* **Capabilities:** Auto-scaling architectures, Spot instance configurations, and cache systems.\n\nAre you planning a cost optimization audit for AWS, Azure, or a hybrid cloud setup?",
      es: "Nuestras auditorías de **Optimización de Costos en la Nube** escanean recursos (AWS, Azure, GCP) para redimensionar bases de datos y cortar desperdicio.\n\n* **Beneficios:** Reduce el gasto de servidores mensuales del 25% al 40% manteniendo el rendimiento.\n* **Capacidades:** Arquitecturas auto-escalables, configuración de instancias Spot y caching.\n\n¿Planea una auditoría de costos para AWS, Azure o una nube híbrida?",
      suggested: isEs
        ? ["Optimización AWS", "Optimización Azure", "Llamada de Alcance", "Programar Consulta"]
        : ["AWS Cost Audit", "Azure Cost Audit", "Scoping Session", "Schedule Consultation"]
    }
  };

  // 4. State-Aware Follow-Up Route Handler
  if (lastTopic) {
    // A. CTO Context Follow-ups
    if (lastTopic === 'cto') {
      if (msg.includes('startup') || msg.includes('growth') || msg.includes('crecimiento') || msg.includes('enterprise') || msg.includes('corporativo')) {
        const stage = msg.includes('startup') ? (isEs ? 'startup' : 'startup') : (msg.includes('growth') || msg.includes('crecimiento') ? (isEs ? 'crecimiento' : 'growth') : (isEs ? 'corporativo' : 'enterprise'));
        return {
          message: isEs
            ? `Entendido. Dirigir una empresa en etapa de **${stage}** requiere equilibrar el desarrollo ágil de funciones con una infraestructura estable. HyperCode ayuda a estructurar equipos de desarrollo y mitigar cuellos de botella.\n\n¿Cuál es su mayor desafío tecnológico actual? (ej. lentitud de lanzamiento, infraestructura inestable, falta de desarrolladores)`
            : `Understood. Running a **${stage}** stage company requires balancing rapid feature shipping with infrastructure stability. HyperCode helps structure engineering teams and mitigate technical hurdles.\n\nWhat is your biggest technology challenge today? (e.g., slow feature shipping, scaling infrastructure, lack of developers)`,
          suggestedPrompts: isEs
            ? ["Lentitud de funciones", "Escalar Infraestructura", "Revisión de Arquitectura", "Programar Consulta"]
            : ["Slow feature shipping", "Scaling Infrastructure", "Architecture Review", "Schedule Consultation"]
        };
      }
      
      // Generic question routing in CTO
      if (msg.includes('security') || msg.includes('seguridad')) {
        return {
          message: isEs
            ? "**Seguridad en Asesoría de CTO:** Integramos pautas SecOps en la arquitectura, diseñamos políticas de IAM y aseguramos cumplimiento (SOC2/HIPAA) de forma temprana.\n\n¿Desea una revisión de arquitectura técnica enfocada en ciberseguridad?"
            : "**Security in CTO Advisory:** We embed SecOps protocols in the architecture, define database IAM roles, and build SOC2/HIPAA compliance from scratch.\n\nWould you like a technical review focusing on cybersecurity?",
          suggestedPrompts: blueprints.security.suggested
        };
      }
      if (msg.includes('cost') || msg.includes('price') || msg.includes('costo') || msg.includes('precio')) {
        return {
          message: isEs
            ? "**Precios de Asesoría de CTO:** Ofrecemos servicios de CTO fraccional por horas o iguala mensual (comenzando desde $5,000/mes) para guiar decisiones estratégicas.\n\n¿Le gustaría cotizar una revisión de su plan tecnológico?"
            : "**CTO Advisory Pricing:** We offer fractional CTO advisory on an hourly basis or monthly retainer (starting around $5,000/month) to oversee strategy.\n\nWould you like to calculate an estimate for your technical audit?",
          suggestedPrompts: isEs ? ["Calificar mi proyecto", "Programar Consulta"] : ["Qualify my project", "Schedule Consultation"]
        };
      }
      if (msg.includes('timeline') || msg.includes('time') || msg.includes('plazo') || msg.includes('tiempo')) {
        return {
          message: isEs
            ? "**Plazos de Consultoría CTO:** Las auditorías técnicas duran de 2 a 4 semanas. Los acompañamientos mensuales se estructuran en períodos trimestrales.\n\n¿Tiene un hito técnico crítico programado?"
            : "**CTO Advisory Timelines:** Reviews require 2 to 4 weeks. Long-term advisory retainers are typically structured on a quarterly cycle.\n\nDo you have an upcoming product release milestone?",
          suggestedPrompts: isEs ? ["Revisión de Arquitectura", "Programar Consulta"] : ["Architecture Review", "Schedule Consultation"]
        };
      }

      // Catch-all for CTO
      return {
        message: isEs
          ? "Entendido. Nuestros servicios de asesoría de CTO están diseñados para diagnosticar precisamente estos cuellos de botella de entrega, auditar la arquitectura del código y establecer hojas de ruta técnicas.\n\n¿Le gustaría programar una llamada de alcance de 15 minutos para revisar esto con uno de nuestros arquitectos?"
          : "Understood. Our CTO advisory practices are designed to diagnose precisely these engineering bottlenecks, audit architectural health, and establish clear roadmaps.\n\nWould you like to schedule a 15-minute scoping call to review this with one of our principal architects?",
        suggestedPrompts: isEs
          ? ["Agendar llamada ahora", "Calificar mi proyecto", "Volver al inicio"]
          : ["Schedule call now", "Qualify my project", "Back to Start"]
      };
    }

    // B. AI Context Follow-ups
    if (lastTopic === 'ai') {
      if (msg.includes('support') || msg.includes('soporte') || msg.includes('customer') || msg.includes('cliente')) {
        return {
          message: isEs
            ? "Excelente. Para automatizar el soporte, típicamente implementamos agentes de IA conectados a bases vectoriales RAG seguras, reduciendo un 40% las consultas repetitivas.\n\n¿Su base de datos de conocimiento está guardada en PDFs, bases de datos SQL o páginas web?"
            : "Great. Automating support usually involves deploying AI agents connected to secure RAG vector stores, cutting repetitive tickets by up to 40%.\n\nIs your knowledge base currently stored in PDFs, SQL databases, or web docs?",
          suggestedPrompts: isEs
            ? ["Archivos PDF", "Bases de datos SQL", "Estrategia de IA", "Programar Consulta"]
            : ["PDF Files", "SQL Databases", "AI Strategy", "Schedule Consultation"]
        };
      }
      if (msg.includes('security') || msg.includes('seguridad')) {
        return {
          message: isEs
            ? "**Seguridad de IA:** Filtramos datos confidenciales (PII), establecemos proxies de VPC para APIs externas y auditamos inyecciones de prompts en bases vectoriales.\n\n¿Desea agendar una llamada para asegurar su flujo de IA?"
            : "**AI Security:** We route calls through VPC proxies to prevent data leaks, strip PII, and secure vector databases from prompt injection.\n\nShould we set up a call to review your enterprise AI security guidelines?",
          suggestedPrompts: blueprints.ai.suggested
        };
      }
      if (msg.includes('cost') || msg.includes('price') || msg.includes('costo') || msg.includes('precio')) {
        return {
          message: isEs
            ? "**Costo de Proyectos de IA:** Los chatbots RAG piloto inician desde $15K-$25K. Los costos continuos de APIs de LLM se optimizan usando modelos eficientes y caching.\n\n¿Le gustaría calificar las especificaciones de su proyecto para recibir un presupuesto?"
            : "**AI Project Costs:** Prototype RAG pilots start around $15K-$25K. Run-time costs are minimized by using vector caches and right-sized models.\n\nWould you like to qualify your project details to get a pricing blueprint?",
          suggestedPrompts: isEs ? ["Calificar Plan de Proyecto", "Programar Consulta"] : ["Qualify Project Blueprint", "Schedule Consultation"]
        };
      }
      if (msg.includes('timeline') || msg.includes('time') || msg.includes('plazo') || msg.includes('tiempo')) {
        return {
          message: isEs
            ? "**Plazo de IA:** Desarrollar e integrar un chatbot piloto funcional toma de 4 a 6 semanas. Agentes de producción completos requieren de 8 a 12 semanas.\n\n¿Busca lanzar un MVP rápido o un sistema final?"
            : "**AI Project Timelines:** A pilot RAG setup takes 4 to 6 weeks. High-grade agent pipelines take 8 to 12 weeks of engineering.\n\nAre you looking to build a quick MVP or a production pipeline?",
          suggestedPrompts: blueprints.ai.suggested
        };
      }

      // Catch-all for AI
      return {
        message: isEs
          ? "Interesante. Implementar flujos de trabajo de IA para ese proceso puede generar un gran retorno de inversión. HyperCode se especializa en integrar APIs de LLM avanzadas de forma segura y optimizar los costos de ejecución.\n\n¿Le gustaría programar un Taller de Descubrimiento de IA de 15 minutos?"
          : "Interesting. Embedding AI workflows into that process can drive high business ROI. HyperCode specializes in safely integrating LLM APIs and optimizing production inference costs.\n\nWould you like to schedule a 15-minute AI Discovery session?",
        suggestedPrompts: isEs
          ? ["Agendar llamada ahora", "Calificar mi proyecto", "Volver al inicio"]
          : ["Schedule call now", "Qualify my project", "Back to Start"]
      };
    }

    // C. Cloud Context Follow-ups
    if (lastTopic === 'cloud') {
      if (msg.includes('full') || msg.includes('completa') || msg.includes('hybrid') || msg.includes('híbrido') || msg.includes('hibrido')) {
        const type = msg.includes('full') || msg.includes('completa') ? (isEs ? 'completa' : 'full') : (isEs ? 'híbrida' : 'hybrid');
        return {
          message: isEs
            ? `Correcto. Una migración **${type}** requiere una landing zone segura en la nube, IaC (Terraform) y pipelines de migración de bases de datos estructurados.\n\n¿Qué proveedor de nube prefiere: AWS, Azure o Google Cloud?`
            : `Understood. Executing a **${type}** cloud migration requires robust landing zones, automated IaC (Terraform), and mapped database migration pipelines.\n\nWhich cloud provider is your primary target: AWS, Azure, or Google Cloud?`,
          suggestedPrompts: isEs
            ? ["AWS", "Azure", "Google Cloud", "Programar Consulta"]
            : ["AWS", "Azure", "Google Cloud", "Schedule Consultation"]
        };
      }
      if (msg.includes('aws') || msg.includes('azure') || msg.includes('google cloud') || msg.includes('gcp')) {
        const cloud = msg.toUpperCase();
        return {
          message: isEs
            ? `Excelente. Diseñamos arquitecturas optimizadas para **${cloud}** utilizando Terraform, orquestación en EKS/AKS y pipelines de CI/CD avanzados.\n\n¿Le gustaría recibir una sesión de Evaluación de Nube personalizada?`
            : `Great choice. We build optimized infrastructure blueprints for **${cloud}** using Terraform modules, EKS/AKS container hosting, and clean CI/CD pipelines.\n\nWould you like to schedule a Cloud Assessment review call?`,
          suggestedPrompts: isEs ? ["Evaluación Cloud", "Programar Consulta"] : ["Cloud Assessment", "Schedule Consultation"]
        };
      }
      if (msg.includes('security') || msg.includes('seguridad')) {
        return {
          message: isEs
            ? "**Seguridad en Nube:** Implementamos firewalls VPC, cifrado KMS de bases de datos, redes privadas y control de políticas IAM estrictas.\n\n¿Desea conversar sobre la seguridad de su nube actual?"
            : "**Cloud Security:** We enforce strict VPC subnets, AWS KMS key encryption for data at rest, and least-privilege IAM policies.\n\nWould you like a cloud security audit scoping call?",
          suggestedPrompts: blueprints.cloud.suggested
        };
      }

      // Catch-all for Cloud
      return {
        message: isEs
          ? "Comprendido. La modernización y migración a la nube eliminan los fallos de hardware y aumentan la velocidad de despliegue de sus servicios.\n\n¿Le gustaría programar una sesión de Evaluación de Nube para planificar la estrategia?"
          : "Understood. Modernizing your cloud setup and executing migrations removes downtime risks and accelerates team velocity.\n\nWould you like to schedule a Cloud Assessment scoping call?",
        suggestedPrompts: isEs
          ? ["Agendar llamada ahora", "Calificar mi proyecto", "Volver al inicio"]
          : ["Schedule call now", "Qualify my project", "Back to Start"]
      };
    }

    // D. Staffing Context Follow-ups
    if (lastTopic === 'staffing') {
      if (msg.includes('frontend') || msg.includes('backend') || msg.includes('cloud') || msg.includes('fullstack') || msg.includes('full stack')) {
        return {
          message: isEs
            ? "Entendido. Suministramos desarrolladores experimentados (Next.js/React para frontend, Python/Node para backend o DevOps para nube) listos para integrarse.\n\n¿Necesita incorporar desarrolladores individuales o prefiere un equipo dedicado gestionado por HyperCode?"
            : "Understood. We deploy engineers (React/Next.js for front, Node/Python/Go for back, Terraform/K8s for cloud) ready to integrate into your sprints.\n\nDo you need individual staff augmentation developers or a fully managed dedicated squad?",
          suggestedPrompts: isEs
            ? ["Aumento de Personal", "Equipos Dedicados", "Cotizar Personal", "Programar Consulta"]
            : ["Staff Augmentation", "Dedicated Squads", "Get Staffing Quote", "Schedule Consultation"]
        };
      }
      if (msg.includes('cost') || msg.includes('price') || msg.includes('costo') || msg.includes('precio')) {
        return {
          message: isEs
            ? "**Costos de Staffing:** Nuestras tarifas por hora varían según el rol, seniority y ubicación (local en EE. UU., nearshore en LatAm o offshore en India).\n\n¿Le gustaría cotizar tarifas para roles de desarrollo específicos?"
            : "**Staffing Pricing:** Hourly rates are tailored based on developer seniority and target zone (local US, nearshore LatAm, or offshore India).\n\nWould you like to request a custom staffing rate card?",
          suggestedPrompts: isEs ? ["Cotizar Personal", "Programar Consulta"] : ["Get Staffing Quote", "Schedule Consultation"]
        };
      }

      // Catch-all for Staffing
      return {
        message: isEs
          ? "Excelente. Para brindarle tarifas precisas y perfiles calificados, le recomendamos realizar una rápida cotización de personal.\n\n¿Le gustaría cotizar los perfiles técnicos de su interés ahora?"
          : "Excellent. To provide accurate rates and matched candidate profiles, we recommend requesting a quick staffing quote.\n\nWould you like to build a custom staffing quote now?",
        suggestedPrompts: isEs
          ? ["Cotizar Personal", "Agendar llamada ahora", "Volver al inicio"]
          : ["Get Staffing Quote", "Schedule call now", "Back to Start"]
      };
    }
  }

  // 5. Match Intents to Blueprints
  if (isCTO) {
    return {
      message: blueprints.cto[language],
      suggestedPrompts: blueprints.cto.suggested
    };
  }
  if (isAI) {
    return {
      message: blueprints.ai[language],
      suggestedPrompts: blueprints.ai.suggested
    };
  }
  if (isCloud) {
    return {
      message: blueprints.cloud[language],
      suggestedPrompts: blueprints.cloud.suggested
    };
  }
  if (isBI) {
    return {
      message: blueprints.bi[language],
      suggestedPrompts: blueprints.bi.suggested
    };
  }
  if (isData) {
    return {
      message: blueprints.data[language],
      suggestedPrompts: blueprints.data.suggested
    };
  }
  if (isSoftware) {
    return {
      message: blueprints.software[language],
      suggestedPrompts: blueprints.software.suggested
    };
  }
  if (isWeb) {
    return {
      message: blueprints.web[language],
      suggestedPrompts: blueprints.web.suggested
    };
  }
  if (isMobile) {
    return {
      message: blueprints.mobile[language],
      suggestedPrompts: blueprints.mobile.suggested
    };
  }
  if (isStaffing) {
    return {
      message: blueprints.staffing[language],
      suggestedPrompts: blueprints.staffing.suggested
    };
  }
  if (isDigital) {
    return {
      message: blueprints.digital[language],
      suggestedPrompts: blueprints.digital.suggested
    };
  }
  if (isSecurity) {
    return {
      message: blueprints.security[language],
      suggestedPrompts: blueprints.security.suggested
    };
  }
  if (isCost) {
    return {
      message: blueprints.cost[language],
      suggestedPrompts: blueprints.cost.suggested
    };
  }

  // 6. Generic Fallback Router (Prevents greeting repeats - Task 6)
  const isRelated = [
    'data', 'analytics', 'consulting', 'bi', 'dashboard', 'power bi', 'tableau',
    'staffing', 'talent', 'hire', 'recruit', 'engineer', 'developer', 'react', 'next',
    'web', 'app', 'saas', 'cloud', 'aws', 'azure', 'ai', 'intelligence', 'ml',
    'services', 'price', 'cost', 'where', 'who', 'transform', 'architecture', 'security',
    'shopify', 'ecommerce', 'erp', 'crm', 'pentest', 'cyber',
    'soluciones', 'datos', 'analitica', 'consultoria', 'tablero', 'personal', 'contratar',
    'talento', 'desarrollo', 'nube', 'ia', 'inteligencia', 'aprendizaje', 'precio',
    'donde', 'quienes', 'transformacion', 'arquitectura', 'ciberseguridad', 'tienda'
  ].some(keyword => msg.includes(keyword));

  if (!isRelated) {
    return {
      message: isEs
        ? "Puedo asistirle con nuestros servicios técnicos de consultoría corporativa. Por favor seleccione un tema de interés:\n\n• **Migración Cloud & DevOps**\n• **IA y Automatización**\n• **Consultoría de CTO**\n• **Aumento de Personal TI**\n• **Desarrollo de Software a Medida**\n\n¿En qué área se está enfocando?"
        : "I can assist you with our professional technology consulting practices. Please select a core topic below:\n\n• **Cloud Migration & DevOps**\n• **AI & Automation**\n• **CTO Advisory & Product Strategy**\n• **IT Staff Augmentation**\n• **Custom Software & Web Development**\n\nWhich area are you focusing on?",
      suggestedPrompts: isEs
        ? ["Consultoría de CTO", "IA y Automatización", "Migración Cloud", "Aumento de Personal TI", "Volver al inicio"]
        : ["CTO Consulting", "AI & Automation", "Cloud Migration", "IT Staffing", "Back to Start"]
    };
  }

  // 7. General FAQ Fallbacks (Fallback to rawAdvisor messages if matched, without greeting)
  if (msg.includes('who are you') || msg.includes('what is hypercode') || msg.includes('quienes son') || msg.includes('quiénes son') || msg.includes('que es hypercode') || msg.includes('qué es hypercode')) {
    return {
      message: rawAdvisor.about.message,
      suggestedPrompts: rawAdvisor.about.suggestedPrompts
    };
  }

  if (msg.includes('location') || msg.includes('address') || msg.includes('where are you') || msg.includes('ubicacion') || msg.includes('dirección') || msg.includes('direccion') || msg.includes('donde estan') || msg.includes('dónde están')) {
    return {
      message: rawAdvisor.location.message,
      suggestedPrompts: rawAdvisor.location.suggestedPrompts
    };
  }

  // Final Router Fallback (keeps active focus instead of greeting)
  return {
    message: isEs
      ? "Para comenzar, seleccione uno de nuestros servicios principales o describa su requerimiento tecnológico para que un director de práctica le genere una propuesta."
      : "To begin, select one of our primary core service practices or describe your technical requirements so a director can review them.",
    suggestedPrompts: isEs
      ? ["Consultoría de CTO", "IA y Automatización", "Migración Cloud", "Aumento de Personal TI"]
      : ["CTO Consulting", "AI & Automation", "Cloud Migration", "IT Staffing"]
  };
}
