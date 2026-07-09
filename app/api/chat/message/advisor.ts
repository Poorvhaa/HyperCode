import enMessages from '../../../../messages/en.json';
import esMessages from '../../../../messages/es.json';

interface AdvisorResponse {
  message: string;
  suggestedPrompts: string[];
  flowTrigger?: string; // e.g. "lead_form", "consultation_form", "staffing_form"
}

function getLastTopic(history?: { sender: 'user' | 'assistant', message: string }[]): string | null {
  if (!history || history.length === 0) return null;
  // Scan backwards from the newest to oldest messages
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i].message.toLowerCase();
    if (msg.includes('cloud') || msg.includes('devops') || msg.includes('migration') || msg.includes('nube') || msg.includes('migración')) return 'cloud';
    if (msg.includes('chatbot') || msg.includes('automation') || msg.includes('automatización') || msg.includes('agent') || msg.includes('agente') || msg.includes('ai') || msg.includes('ia') || msg.includes('inteligencia artificial') || msg.includes('generative')) return 'ai';
    if (msg.includes('bi') || msg.includes('tableau') || msg.includes('power bi') || msg.includes('dashboard') || msg.includes('tablero') || msg.includes('analytics') || msg.includes('analítica') || msg.includes('reportes')) return 'bi';
    if (msg.includes('staffing') || msg.includes('talent') || msg.includes('hire') || msg.includes('contratar') || msg.includes('developer') || msg.includes('desarrolladores') || msg.includes('personal') || msg.includes('reclutamiento')) return 'staffing';
    if (msg.includes('web') || msg.includes('sitio') || msg.includes('website')) return 'web';
    if (msg.includes('mobile') || msg.includes('flutter') || msg.includes('react native') || msg.includes('ios') || msg.includes('android') || msg.includes('app')) return 'mobile';
    if (msg.includes('erp') || msg.includes('crm') || msg.includes('software')) return 'software';
    if (msg.includes('security') || msg.includes('cyber') || msg.includes('ciberseguridad') || msg.includes('pentest') || msg.includes('compliance') || msg.includes('cumplimiento')) return 'security';
    if (msg.includes('digital') || msg.includes('transformation') || msg.includes('transformación')) return 'digital';
    if (msg.includes('shopify') || msg.includes('ecommerce') || msg.includes('tienda') || msg.includes('store') || msg.includes('comercio')) return 'shopify';
  }
  return null;
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

  // 1. Topic Blueprints Mapping
  const blueprints = {
    cloud: {
      en: "HyperCode offers comprehensive **Cloud Migration & DevOps** engineering. We containerize applications, automate infrastructure deployment using Terraform, and orchestrate services with Kubernetes.\n\n* **Business Benefits:** Minimizes operational downtime, reduces infrastructure costs by up to 30%, and guarantees high-availability with auto-scaling.\n* **Capabilities:** Multi-cloud deployments (AWS, Azure, Google Cloud), CI/CD pipelines (GitHub Actions, GitLab), and cloud security governance.\n* **Next Steps:** We recommend conducting a Cloud Readiness Assessment to map your migration strategy.\n\nWould you like to discuss your cloud migration strategy, or are you planning a full migration or a hybrid cloud solution?",
      es: "HyperCode ofrece servicios integrales de **Migración a la Nube y DevOps**. Contenedorizamos aplicaciones, automatizamos el despliegue de infraestructura usando Terraform y orquestamos servicios con Kubernetes.\n\n* **Beneficios Comerciales:** Minimiza el tiempo de inactividad operativo, reduce costos de infraestructura hasta un 30% y garantiza alta disponibilidad con escalado automático.\n* **Capacidades:** Despliegues multi-nube (AWS, Azure, Google Cloud), pipelines CI/CD (GitHub Actions, GitLab) y gobernanza de seguridad en la nube.\n* **Próximos Pasos:** Recomendamos realizar una Evaluación de Preparación Cloud para trazar su estrategia.\n\n¿Le gustaría discutir su estrategia de migración, o está planeando una migración completa o una solución híbrida?",
      suggested: isEs 
        ? ["Evaluación Cloud", "Estrategia de Migración", "DevOps", "Optimización de Costos", "Contactar un Experto"]
        : ["Cloud Assessment", "Migration Strategy", "DevOps", "Cost Optimization", "Contact an Expert"]
    },
    ai: {
      en: "We design and build **AI & Automation** systems, deploying Retrieval-Augmented Generation (RAG) knowledge bases, custom LLM integrations, and autonomous agentic workflows.\n\n* **Business Benefits:** Drives efficiency, reduces customer service workloads by up to 40%, and automates manual document processing.\n* **Capabilities:** Integration with OpenAI, Anthropic, and Google Gemini API; semantic vector databases (Pinecone, pgvector); custom LangChain pipelines.\n* **Next Steps:** Schedule an AI Discovery Workshop to align technology with your business goals.\n\nAre you looking to automate internal workflows, build a customer-facing chatbot, or explore predictive AI?",
      es: "Diseñamos y construimos sistemas de **IA y Automatización**, desplegando bases de conocimiento con Generación Aumentada por Recuperación (RAG), integración de LLMs personalizados y flujos de agentes autónomos.\n\n* **Beneficios Comerciales:** Aumenta la eficiencia operativa, reduce los tiempos de soporte hasta en un 40% y automatiza el procesamiento de documentos.\n* **Capacidades:** Integración con API de OpenAI, Anthropic y Google Gemini; bases de datos vectoriales (Pinecone, pgvector); flujos personalizados con LangChain.\n* **Próximos Pasos:** Agendar un taller de descubrimiento de IA para alinear la tecnología con sus objetivos.\n\n¿Desea crear un chatbot inteligente, automatizar procesos internos o entrenar un modelo a medida?",
      suggested: isEs
        ? ["Estrategia de IA", "Automatización", "Desarrollo Chatbots", "Analítica de Datos", "Contactar un Experto"]
        : ["AI Strategy", "Process Automation", "AI Chatbot Dev", "Data Analytics", "Schedule Consultation"]
    },
    bi: {
      en: "HyperCode's **Business Intelligence** services consolidate distributed database feeds into real-time interactive reporting dashboards.\n\n* **Business Benefits:** Empowers executive decision-making, uncovers hidden inefficiencies, and establishes a single source of truth for business metrics.\n* **Capabilities:** Power BI and Tableau custom engineering, ETL pipelines, dbt data modeling, and KPI tracking design.\n* **Next Steps:** Connect with our analytics lead to review your data sources.\n\nWhich reporting tools are you using currently, and what key metrics do you need to visualize?",
      es: "Los servicios de **Inteligencia de Negocios** de HyperCode consolidan fuentes de datos distribuidas en tableros de control interactivos en tiempo real.\n\n* **Beneficios Comerciales:** Empodera la toma de decisiones ejecutivas, descubre ineficiencias ocultas y establece una fuente única de verdad para sus métricas de negocio.\n* **Capacidades:** Ingeniería a medida en Power BI y Tableau, pipelines ETL, modelado de datos con dbt y diseño de tableros KPI.\n* **Próximos Pasos:** Conectar con nuestro líder de analítica para revisar sus bases de datos.\n\n¿Qué herramientas de reportería utiliza actualmente y qué métricas clave necesita visualizar?",
      suggested: isEs
        ? ["Configurar Tablero BI", "Almacén de Datos", "Reportes y ETL", "Métricas KPI", "Contactar un Experto"]
        : ["BI Dashboard Setup", "Data Warehousing", "Reporting & ETL", "KPI Tracking", "Contact an Expert"]
    },
    data: {
      en: "Our **Data Analytics** practice builds statistical pipelines, anomaly detection systems, and predictive models to transform raw logs into actionable intelligence.\n\n* **Business Benefits:** Improves customer retention by predicting churn, optimizes supply chains, and mitigates financial risks.\n* **Capabilities:** Python (Scikit-Learn, Pandas), Snowflake, Google BigQuery, and custom machine learning algorithms.\n* **Next Steps:** Start with a Data Discovery Sprint to audit your data quality and schema.\n\nAre you looking to structure raw data feeds, perform predictive modeling, or clean existing databases?",
      es: "Nuestra práctica de **Analítica de Datos** construye pipelines estadísticos, sistemas de detección de anomalías y modelos predictivos para transformar registros crudos en inteligencia accionable.\n\n* **Beneficios Comerciales:** Mejora la retención de clientes prediciendo el churn, optimiza cadenas de suministro y mitiga riesgos financieros.\n* **Capacidades:** Python (Scikit-Learn, Pandas), Snowflake, Google BigQuery y algoritmos de aprendizaje automático a medida.\n* **Próximos Pasos:** Iniciar con un Sprint de Descubrimiento de Datos para auditar la calidad de sus esquemas.\n\n¿Busca estructurar flujos de datos en tiempo real, modelar predicciones o limpiar bases de datos existentes?",
      suggested: isEs
        ? ["Modelos Predictivos", "Ingeniería de Datos", "BigQuery / Snowflake", "Reportes BI", "Contactar un Experto"]
        : ["Predictive Models", "Data Engineering", "BigQuery / Snowflake", "BI Reporting", "Contact an Expert"]
    },
    web: {
      en: "We design and engineer high-performance **Web Applications and SaaS Platforms** focusing on speed, security, and scalable architecture.\n\n* **Business Benefits:** Fast page load speeds boost conversion rates, support user growth without performance degradation, and improve SEO ranking.\n* **Capabilities:** Next.js, React, Node.js, TypeScript, TailwindCSS, REST/GraphQL APIs, and serverless edge functions.\n* **Next Steps:** Create a functional specification document outlining your features and user roles.\n\nAre you looking to build a new SaaS product, redesign an enterprise site, or develop custom APIs?",
      es: "Diseñamos y desarrollamos **Aplicaciones Web y Plataformas SaaS** de alto rendimiento, enfocándonos en velocidad, seguridad y arquitectura escalable.\n\n* **Beneficios Comerciales:** Velocidades de carga subsegundo aumentan la conversión, soportan el crecimiento de usuarios y mejoran el posicionamiento SEO.\n* **Capacidades:** Next.js, React, Node.js, TypeScript, TailwindCSS, APIs REST/GraphQL y funciones serverless.\n* **Próximos Pasos:** Crear un documento de especificaciones técnicas que describa sus flujos y roles.\n\n¿Planea desarrollar un nuevo producto SaaS, rediseñar un sitio corporativo o estructurar integraciones de API?",
      suggested: isEs
        ? ["Desarrollo SaaS", "Desarrollo Next.js", "Integración de APIs", "Diseño de Producto", "Contactar un Experto"]
        : ["SaaS Development", "Next.js & React Dev", "API Integration", "UI/UX Product Design", "Contact an Expert"]
    },
    software: {
      en: "HyperCode builds robust, bespoke **Software Development** solutions, including custom ERPs, CRMs, and internal enterprise workflows.\n\n* **Business Benefits:** Adapts completely to your unique business logic, eliminates recurring SaaS subscription licensing costs, and secures proprietary data.\n* **Capabilities:** Next.js, Node.js, Python, PostgreSQL, Docker, and multi-tenant cloud architectures.\n* **Next Steps:** Schedule a Technical Scoping Call to document your operational bottlenecks.\n\nDo you need custom ERP workflows, a proprietary CRM solution, or a secure database upgrade?",
      es: "HyperCode construye soluciones robustas de **Desarrollo de Software a Medida**, incluyendo ERPs, CRMs personalizados y automatización de flujos internos.\n\n* **Beneficios Comerciales:** Se adapta por completo a sus procesos de negocio únicos, elimina costos de licencias SaaS recurrentes y asegura datos sensibles.\n* **Capacidades:** Next.js, Node.js, Python, PostgreSQL, Docker y arquitecturas en la nube multi-inquilino.\n* **Próximos Pasos:** Agendar una llamada de alcance técnico para documentar sus cuellos de botella.\n\n¿Necesita flujos de ERP a medida, una solución de CRM propietaria o una actualización segura de bases de datos?",
      suggested: isEs
        ? ["Desarrollo ERP", "CRM Empresarial", "Arquitectura de BD", "Auditoría de Software", "Contactar un Experto"]
        : ["Custom ERP Dev", "Enterprise CRM", "Database Architecture", "Software Audit", "Contact an Expert"]
    },
    mobile: {
      en: "We design and build premium **Mobile Applications** for iOS and Android, focusing on offline sync, speed, and clean user interfaces.\n\n* **Business Benefits:** Access clients directly via push notifications, maintain offline capabilities, and deliver a smooth touch experience.\n* **Capabilities:** Cross-platform development via React Native and Flutter, native Swift and Kotlin engineering, and secure API bindings.\n* **Next Steps:** Schedule a mobile UX session to lay out key user screens.\n\nShould we target native iOS/Android development or a cross-platform solution like Flutter or React Native?",
      es: "Diseñamos y construimos **Aplicaciones Móviles** premium para iOS y Android, con sincronización sin conexión y excelentes interfaces de usuario.\n\n* **Beneficios Comerciales:** Acceso directo a clientes mediante notificaciones push, funcionamiento offline y una experiencia táctil fluida.\n* **Capacidades:** Desarrollo multiplataforma con React Native y Flutter, desarrollo nativo con Swift y Kotlin, e integraciones seguras de API.\n* **Próximos Pasos:** Agendar una sesión de diseño UX móvil para definir las pantallas principales de su app.\n\n¿Prefiere un desarrollo nativo iOS/Android o una solución multiplataforma como Flutter o React Native?",
      suggested: isEs
        ? ["React Native", "Soluciones Flutter", "Apps iOS/Android", "Diseño UX Móvil", "Contactar un Experto"]
        : ["React Native Apps", "Flutter Solutions", "iOS/Android Apps", "Mobile UX Design", "Contact an Expert"]
    },
    staffing: {
      en: "Through **IT Staffing & Sourcing Solutions**, HyperCode acts as your recruiting partner to deploy dedicated development squads or augment internal engineering talent.\n\n* **Business Benefits:** Provides pre-screened technical profiles within 5 to 10 business days, drastically reducing recruitment times and payroll overhead.\n* **Capabilities:** Augmentation of React/Next.js developers, Python/AI engineers, site reliability engineers, and PMs (US, LatAm, India).\n* **Next Steps:** Submit your job description and hiring parameters to assign matching profiles.\n\nWhat roles and technologies are you looking to recruit, and what is your target timeline?",
      es: "A través de **Soluciones de Talento y Selección TI**, HyperCode actúa como su socio de contratación para desplegar equipos dedicados o aumentar el talento de ingeniería interno.\n\n* **Beneficios Comerciales:** Entrega perfiles técnicos pre-seleccionados en 5 a 10 días hábiles, reduciendo drásticamente tiempos de búsqueda y costos fijos.\n* **Capacidades:** Suministro de ingenieros React/Next.js, desarrolladores de Python/IA, arquitectos de nube y directores de proyectos.\n* **Próximos Pasos:** Envíe sus descripciones de puestos para comenzar a recibir perfiles candidatos.\n\n¿Qué perfiles y tecnologías busca contratar y cuál es su plazo estimado?",
      suggested: isEs
        ? ["Cotizar Personal", "Equipos Dedicados", "Aumento de Personal", "Contrato a Término", "Contactar un Experto"]
        : ["Get Staffing Quote", "Dedicated Squads", "Augment Tech Team", "Hiring Contract", "Contact an Expert"]
    },
    digital: {
      en: "HyperCode guides organizations through **Digital Transformation**, auditing legacy tech stacks, designing modern architectures, and implementing technical roadmaps.\n\n* **Business Benefits:** Eliminates system failures, automates paper-based processes, and aligns tech infrastructure with your revenue growth.\n* **Capabilities:** CTO-as-a-Service retainer advisory, legacy modernization plans, software scoping audits, and system architecture design.\n* **Next Steps:** Audit your current infrastructure setup with a virtual CTO.\n\nAre you looking to migrate legacy databases, rewrite outdated applications, or define a digital strategy?",
      es: "HyperCode guía a las organizaciones a través de la **Transformación Digital**, auditando pilas tecnológicas obsoletas, diseñando arquitecturas modernas y definiendo planes de ingeniería.\n\n* **Beneficios Comerciales:** Elimina fallos del sistema, automatiza procesos manuales y alinea la infraestructura técnica con su crecimiento de ingresos.\n* **Capacidades:** Asesoramiento tipo CTO-as-a-Service, planes de modernización legada, auditorías de alcance y diseño de arquitecturas de sistemas.\n* **Próximos Pasos:** Realizar una auditoría técnica de su infraestructura actual con un CTO virtual.\n\n¿Busca migrar bases de datos heredadas, reescribir aplicaciones obsoletas o trazar una estrategia digital?",
      suggested: isEs
        ? ["Auditoría Digital", "Modernización Legada", "Asesoría de CTO", "Automatización", "Contactar un Experto"]
        : ["Digital Audit", "Legacy Modernization", "CTO Advisory", "Process Automation", "Contact an Expert"]
    },
    shopify: {
      en: "We engineer high-converting **E-commerce & Shopify Stores** focusing on seamless checkout, mobile responsiveness, and page-load optimization.\n\n* **Business Benefits:** Enhances checkout conversion rates, optimizes catalog search speeds, and improves customer retention.\n* **Capabilities:** Shopify custom Liquid themes, Next.js Commerce headless platforms, WooCommerce, and Stripe/payment integrations.\n* **Next Steps:** Review your product catalog structure and target payment integrations.\n\nAre you looking to launch a new storefront, upgrade an existing Shopify site, or build a headless commerce platform?",
      es: "Desarrollamos tiendas de **Comercio Electrónico y Shopify** enfocadas en procesos de pago fluidos, diseño adaptativo a móviles y velocidad de carga.\n\n* **Beneficios Comerciales:** Aumenta las tasas de conversión en el checkout, optimiza las búsquedas del catálogo y mejora la retención de clientes.\n* **Capacidades:** Temas personalizados en Shopify Liquid, Next.js Commerce headless, WooCommerce e integraciones seguras de pasarelas de pago (Stripe).\n* **Próximos Pasos:** Revisar la estructura de su catálogo de productos e integraciones de pago.\n\n¿Desea lanzar una nueva tienda digital, actualizar su sitio de Shopify actual o construir una plataforma headless?",
      suggested: isEs
        ? ["Temas Shopify", "Integración Stripe", "E-commerce Headless", "Auditoría de Conversión", "Contactar un Experto"]
        : ["Shopify Custom themes", "Stripe Integration", "Headless E-commerce", "Conversion Audit", "Contact an Expert"]
    },
    security: {
      en: "Our **Cybersecurity & Compliance** practice executes security audits, penetration testing, and access management design.\n\n* **Business Benefits:** Protects enterprise data from ransomware, ensures regulatory compliance (HIPAA, GDPR, SOC2), and builds customer trust.\n* **Capabilities:** Pen-testing, security audits, identity management (IAM, OAuth), and automated vulnerability alerts.\n* **Next Steps:** Schedule a penetration test or a security configuration audit.\n\nWould you like to initiate a secure vulnerability assessment?",
      es: "Nuestra práctica de **Ciberseguridad y Cumplimiento** ejecuta auditorías de seguridad, pruebas de penetración y diseño de gestión de accesos.\n\n* **Beneficios Comerciales:** Protege los datos empresariales de ransomware, garantiza cumplimiento regulatorio (HIPAA, GDPR, SOC2) y genera confianza.\n* **Capacidades:** Penetration testing, auditorías de seguridad, gestión de identidad (IAM, OAuth) y alertas automáticas de vulnerabilidad.\n* **Próximos Pasos:** Programar un análisis de penetración o una auditoría de configuración de seguridad.\n\n¿Desea iniciar una evaluación segura de vulnerabilidades?",
      suggested: isEs
        ? ["Pruebas de Penetración", "Cumplimiento SOC2", "Auditoría de IAM", "Seguridad de Software", "Contactar un Experto"]
        : ["Penetration Testing", "SOC2 Compliance", "IAM Security Audit", "Software Security", "Contact an Expert"]
    }
  };

  // 2. Specific Action Triggers (User requests scheduling / qualification forms directly)
  if (msg.includes('schedule') || msg.includes('programar') || msg.includes('book') || msg.includes('agendar') || msg.includes('consulta') || msg.includes('consultation') || msg.includes('cita')) {
    return {
      message: rawAdvisor.consultation.message,
      suggestedPrompts: isEs 
        ? ["Agendar llamada ahora", "Volver al inicio"]
        : ["Schedule call now", "Back to Start"],
      flowTrigger: 'consultation_form'
    };
  }

  if (msg.includes('qualify') || msg.includes('calificar') || msg.includes('assessor') || msg.includes('evaluar') || msg.includes('evaluación') || msg.includes('evaluacion') || msg.includes('blueprint')) {
    return {
      message: isEs 
        ? "Perfecto. Iniciemos nuestro evaluador de proyectos para crear su propuesta técnica personalizada..."
        : "Excellent. Let's launch our project assessor to generate your custom technical blueprint...",
      suggestedPrompts: isEs 
        ? ["Calificar Plan de Proyecto", "Volver al inicio"]
        : ["Qualify Project Blueprint", "Back to Start"],
      flowTrigger: 'lead_form'
    };
  }

  if (msg.includes('staffing quote') || msg.includes('solicitar presupuesto') || msg.includes('cotización') || msg.includes('cotizacion') || msg.includes('quote')) {
    return {
      message: isEs
        ? "Excelente. Para cotizar perfiles técnicos, por favor indíquenos los roles que desea incorporar..."
        : "Great. To generate a staffing quote, please tell us the engineering roles you wish to deploy...",
      suggestedPrompts: isEs
        ? ["Cotizar Personal", "Volver al inicio"]
        : ["Get Staffing Quote", "Back to Start"],
      flowTrigger: 'staffing_form'
    };
  }

  // 3. Match Specific Service Blueprint Requests
  // AI & Automation
  if (msg.includes('chatbot') || msg.includes('rag') || msg.includes('automation') || msg.includes('automatización') || msg.includes('agent') || msg.includes('agente') || msg.includes('ai') || msg.includes('ia') || msg.includes('generativa') || msg.includes('artificial')) {
    return {
      message: isEs ? blueprints.ai.es : blueprints.ai.en,
      suggestedPrompts: blueprints.ai.suggested
    };
  }
  // Cloud & DevOps / Migration
  if (msg.includes('cloud') || msg.includes('devops') || msg.includes('migration') || msg.includes('nube') || msg.includes('migración') || msg.includes('migracion') || msg.includes('aws') || msg.includes('azure') || msg.includes('kubernetes')) {
    return {
      message: isEs ? blueprints.cloud.es : blueprints.cloud.en,
      suggestedPrompts: blueprints.cloud.suggested
    };
  }
  // Business Intelligence
  if (msg.includes('bi') || msg.includes('power bi') || msg.includes('tableau') || msg.includes('dashboard') || msg.includes('tablero') || msg.includes('reporting') || msg.includes('reportes')) {
    return {
      message: isEs ? blueprints.bi.es : blueprints.bi.en,
      suggestedPrompts: blueprints.bi.suggested
    };
  }
  // Data Analytics
  if (msg.includes('analytics') || msg.includes('analítica') || msg.includes('analitica') || msg.includes('predictive') || msg.includes('snowflake') || msg.includes('bigquery') || msg.includes('data')) {
    return {
      message: isEs ? blueprints.data.es : blueprints.data.en,
      suggestedPrompts: blueprints.data.suggested
    };
  }
  // Web Development
  if (msg.includes('web development') || msg.includes('desarrollo web') || msg.includes('next.js') || msg.includes('react') || msg.includes('saas') || msg.includes('website') || msg.includes('web')) {
    return {
      message: isEs ? blueprints.web.es : blueprints.web.en,
      suggestedPrompts: blueprints.web.suggested
    };
  }
  // Mobile Development
  if (msg.includes('mobile') || msg.includes('móvil') || msg.includes('movil') || msg.includes('flutter') || msg.includes('react native') || msg.includes('ios') || msg.includes('android') || msg.includes('app')) {
    return {
      message: isEs ? blueprints.mobile.es : blueprints.mobile.en,
      suggestedPrompts: blueprints.mobile.suggested
    };
  }
  // IT Staffing
  if (msg.includes('staffing') || msg.includes('talent') || msg.includes('hire') || msg.includes('contratar') || msg.includes('personal') || msg.includes('reclutamiento')) {
    return {
      message: isEs ? blueprints.staffing.es : blueprints.staffing.en,
      suggestedPrompts: blueprints.staffing.suggested
    };
  }
  // Digital Transformation
  if (msg.includes('digital') || msg.includes('transformation') || msg.includes('transformación') || msg.includes('transformacion') || msg.includes('legacy') || msg.includes('modernización')) {
    return {
      message: isEs ? blueprints.digital.es : blueprints.digital.en,
      suggestedPrompts: blueprints.digital.suggested
    };
  }
  // Shopify / E-commerce
  if (msg.includes('shopify') || msg.includes('ecommerce') || msg.includes('tienda') || msg.includes('store') || msg.includes('comercio') || msg.includes('woocommerce')) {
    return {
      message: isEs ? blueprints.shopify.es : blueprints.shopify.en,
      suggestedPrompts: blueprints.shopify.suggested
    };
  }
  // Security
  if (msg.includes('security') || msg.includes('cyber') || msg.includes('ciberseguridad') || msg.includes('pentest') || msg.includes('compliance') || msg.includes('cumplimiento')) {
    return {
      message: isEs ? blueprints.security.es : blueprints.security.en,
      suggestedPrompts: blueprints.security.suggested
    };
  }

  // 4. Contextual Fallback Questions (Stateful Memory Routing)
  // Security Questions
  if (msg.includes('security') || msg.includes('seguridad') || msg.includes('safe') || msg.includes('seguro')) {
    if (lastTopic === 'cloud') {
      return {
        message: isEs
          ? "**Seguridad en la Nube:** HyperCode implementa roles IAM estrictos, cifrado de datos con llaves en AWS KMS / Azure Key Vault, TLS 1.3 en tránsito y subredes VPC privadas para aislar bases de datos.\n\n¿Le gustaría que auditemos sus configuraciones de seguridad cloud?"
          : "**Cloud Security:** We implement strict IAM roles, set up AWS KMS / Azure Key Vault key encryption for data at rest, enforce TLS 1.3 for data in transit, and construct private VPC subnets to isolate databases.\n\nWould you like us to audit your cloud security configurations?",
        suggestedPrompts: blueprints.cloud.suggested
      };
    }
    if (lastTopic === 'ai') {
      return {
        message: isEs
          ? "**Seguridad de IA y LLM:** Diseñamos protocolos de gobernanza para filtrar datos sensibles (PII), establecemos proxies de VPC para llamadas externas a APIs y auditamos bases vectoriales para mitigar inyecciones de prompts.\n\n¿Desea conversar sobre cómo asegurar su pipeline de IA empresarial?"
          : "**AI & LLM Security:** We implement data governance protocols to filter PII, establish private VPC proxies for external LLM API calls, and audit vector databases to prevent prompt injection or data leakage.\n\nShould we discuss how to secure your enterprise AI pipeline?",
        suggestedPrompts: blueprints.ai.suggested
      };
    }
    if (lastTopic && ['web', 'software', 'mobile', 'shopify'].includes(lastTopic)) {
      return {
        message: isEs
          ? "**Seguridad de la Aplicación:** Seguimos las pautas OWASP Top 10, ejecutamos escaneos automáticos de vulnerabilidades en el código (SAST), implementamos autenticación de múltiples factores (MFA) e integraciones de pago seguras con PCI-DSS.\n\n¿Le gustaría una revisión de seguridad del código?"
          : "**Application Security:** We follow OWASP Top 10 guidelines, run automated SAST scans on code commits, implement Multi-Factor Authentication (MFA), and ensure PCI-DSS compliance for payment integrations.\n\nWould you like a code safety audit?",
        suggestedPrompts: blueprints[lastTopic as keyof typeof blueprints]?.suggested || blueprints.software.suggested
      };
    }
    return {
      message: isEs ? blueprints.security.es : blueprints.security.en,
      suggestedPrompts: blueprints.security.suggested
    };
  }

  // Cost / Pricing Questions
  if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('how much') || msg.includes('budget') || msg.includes('precio') || msg.includes('costo') || msg.includes('cuanto cuesta') || msg.includes('cuánto cuesta') || msg.includes('presupuesto')) {
    if (lastTopic === 'cloud') {
      return {
        message: isEs
          ? "**Costos de Infraestructura:** El presupuesto depende del tamaño de su arquitectura. Diseñamos sistemas auto-escalables y arquitecturas serverless para optimizar la facturación mensual en AWS/Azure y evitar el sobreaprovisionamiento.\n\n¿Le gustaría recibir una evaluación de optimización de costos cloud?"
          : "**Cloud Infrastructure Costs:** Pricing depends on your server count and data volume. We design serverless paths and auto-scaling setups to optimize monthly billing on AWS/Azure and eliminate over-provisioning.\n\nWould you like to receive a cloud cost optimization assessment?",
        suggestedPrompts: blueprints.cloud.suggested
      };
    }
    if (lastTopic === 'ai') {
      return {
        message: isEs
          ? "**Costo de Soluciones de IA:** Los pilotos funcionales de chatbot RAG comienzan desde $15K-$25K. Los sistemas complejos varían según consumo de tokens e integraciones. Optimizamos costos usando modelos eficientes y almacenamiento en caché.\n\n¿Desea cotizar un proyecto piloto de IA?"
          : "**AI Solution Cost:** Custom RAG chatbot prototypes start around $15K-$25K. Production systems with custom pipelines or agentic workflows range depending on complexity and token volume. We focus on caching and open-source models to reduce running costs.\n\nShall we quote a pilot project budget?",
        suggestedPrompts: blueprints.ai.suggested
      };
    }
    if (lastTopic === 'staffing') {
      return {
        message: isEs
          ? "**Tarifas de Contratación:** Ofrecemos tarifas competitivas según el seniority técnico y ubicación (EE. UU. local, LatAm nearshore, o India offshore). Las modalidades incluyen contratación permanente o squads mensuales.\n\n¿Desea cotizar perfiles específicos de desarrollo?"
          : "**Staffing Rates:** We offer competitive pricing based on technical seniority and developer location (US local, LatAm nearshore, or India offshore). Options include permanent hiring or monthly dedicated squads.\n\nWould you like to request a custom staffing quote?",
        suggestedPrompts: blueprints.staffing.suggested
      };
    }
    if (lastTopic && ['web', 'software', 'mobile', 'shopify'].includes(lastTopic)) {
      return {
        message: isEs
          ? "**Costo del Software:** Los proyectos inician desde $20K-$30K para MVPs iniciales y escalan según complejidad. Entregamos cotizaciones de precio fijo detalladas por sprints.\n\n¿Desea programar un taller de estimación de costos técnicos?"
          : "**Custom Software Cost:** Projects start at $20K-$30K for initial MVPs and scale based on feature complexity, user count, and integrations. We provide fixed-price blueprints and dedicated team options.\n\nShould we set up a scoping session to detail costs?",
        suggestedPrompts: blueprints[lastTopic as keyof typeof blueprints]?.suggested || blueprints.software.suggested
      };
    }
    return {
      message: rawAdvisor.pricing.message,
      suggestedPrompts: rawAdvisor.pricing.suggestedPrompts
    };
  }

  // Timeline / Duration Questions
  if (msg.includes('timeline') || msg.includes('time') || msg.includes('long') || msg.includes('duration') || msg.includes('plazo') || msg.includes('tiempo') || msg.includes('duración') || msg.includes('duracion') || msg.includes('cuanto tarda') || msg.includes('cuánto tarda')) {
    if (lastTopic === 'cloud') {
      return {
        message: isEs
          ? "**Plazo de Migración Cloud:** Suele requerir de 8 a 12 semanas. Esto abarca auditorías, scripts en Terraform, configuración de contenedores en Kubernetes y pruebas de carga.\n\n¿Se alinea este tiempo con sus plazos internos?"
          : "**Cloud Migration Timeline:** Migration typically takes 8 to 12 weeks. This includes database migration, setting up Terraform files, configuring Kubernetes clusters, and execution testing.\n\nDoes this timeline align with your project goals?",
        suggestedPrompts: blueprints.cloud.suggested
      };
    }
    if (lastTopic === 'ai') {
      return {
        message: isEs
          ? "**Plazo de Proyecto de IA:** Un chatbot RAG piloto está listo en 4 a 6 semanas. Los pipelines de agentes complejos y flujos de automatización de grado de producción requieren de 8 a 14 semanas.\n\n¿Está planeando un piloto rápido o un sistema a producción?"
          : "**AI Project Timeline:** A functional RAG chatbot prototype takes 4 to 6 weeks. Complete production systems with agent workflows require 8 to 14 weeks.\n\nAre you looking to launch a fast pilot or a full production system?",
        suggestedPrompts: blueprints.ai.suggested
      };
    }
    if (lastTopic === 'staffing') {
      return {
        message: isEs
          ? "**Plazo de Contratación:** Presentamos candidatos seleccionados en 5 a 10 días hábiles. Los ingenieros suelen integrarse a sus flujos de trabajo en 2 a 3 semanas.\n\n¿Tiene una necesidad inmediata o es para el próximo trimestre?"
          : "**Sourcing Timeline:** We provide matched resume profiles within 5 to 10 business days. Engineers can usually onboard and join your sprints within 2 to 3 weeks.\n\nDo you need to scale immediately or planning for next quarter?",
        suggestedPrompts: blueprints.staffing.suggested
      };
    }
    if (lastTopic && ['web', 'software', 'mobile', 'shopify'].includes(lastTopic)) {
      return {
        message: isEs
          ? "**Plazo de Desarrollo:** Soluciones web toman de 6 a 10 semanas. ERPs o plataformas SaaS corporativas grandes requieren de 3 a 6 meses de desarrollo de manera estructurada en sprints ágiles.\n\n¿Tiene alguna fecha límite crítica de lanzamiento?"
          : "**Custom Development Timeline:** Simple web solutions take 6 to 10 weeks, while large custom ERP/CRM/SaaS architectures require 3 to 6 months. We deploy in 2-week agile sprints.\n\nWhat is your target launch date?",
        suggestedPrompts: blueprints[lastTopic as keyof typeof blueprints]?.suggested || blueprints.software.suggested
      };
    }
    return {
      message: isEs 
        ? "El plazo depende del tipo de servicio. El desarrollo de software a medida toma de 2 a 6 meses, la cotización de personal toma de 1 a 2 semanas y los proyectos de IA toman de 4 a 12 semanas."
        : "Project timelines depend on scope. Software development takes 2 to 6 months, staffing takes 1 to 2 weeks, and AI pipelines take 4 to 12 weeks.",
      suggestedPrompts: isEs 
        ? ["Calificar mi proyecto", "Programar una consulta"]
        : ["Qualify my project", "Schedule a consultation"]
    };
  }

  // 5. General FAQ routes
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

  // Check off-topic
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
      message: rawAdvisor.redirect.message,
      suggestedPrompts: rawAdvisor.redirect.suggestedPrompts
    };
  }

  // Greeting Fallback
  return {
    message: rawAdvisor.greeting.message,
    suggestedPrompts: rawAdvisor.greeting.suggestedPrompts
  };
}
