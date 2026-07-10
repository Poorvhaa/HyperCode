export interface Metric {
  value: string;
  label: string;
}

export interface RelatedService {
  name: string;
  slug: string;
}

export interface CaseStudyItem {
  slug: string;
  industry: string;
  clientType: string;
  title: string;
  challenge: string;
  solution: string;
  implementation: string;
  businessImpact: string;
  duration: string;
  technologies: string[];
  services: string[];
  featuredImage: string;
  metrics: Metric[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  relatedServices: RelatedService[];
  relatedCaseStudies: string[]; // Slugs of related case studies
}

export const CASE_STUDIES: Record<string, { en: CaseStudyItem; es: CaseStudyItem }> = {
  'healthcare-ai-billing-automation': {
    en: {
      slug: 'healthcare-ai-billing-automation',
      industry: 'Healthcare',
      clientType: 'Healthcare Network',
      title: 'AI-Powered Claims & Billing Automation',
      challenge: 'The client, a multi-state healthcare provider network, was struggling with high claims rejection rates (over 18%) and an average billing cycle latency of 45 days. Manual verification of electronic health records (EHR) against insurance billing codes created severe administrative bottlenecks and delayed revenue capture.',
      solution: 'HyperCode designed and deployed an automated agentic AI document parsing pipeline. Leveraging Azure OpenAI models, Python workflow orchestration, and LangChain, the solution automatically extracts diagnostic details from EHR clinical notes, cross-checks them against ICD-10 medical coding databases, and highlights compliance anomalies before claim submission.',
      implementation: 'We initiated the project with a 3-week discovery phase mapping the client\'s electronic health record database structures. We built high-throughput ingestion adapters using Python and Docker to process incoming clinical records. The heart of the platform utilizes custom LLM extraction chains that identify diagnosis and procedure matches. We implemented a human-in-the-loop review interface for anomalies scoring below a 95% confidence threshold, ensuring clinical accuracy while maximizing automation.',
      businessImpact: 'The automated claim validation system led to a 50% improvement in customer billing response times, lowered claims rejection rates to less than 3%, and reduced billing error rates by 85%. Annual administrative savings reached $1.2M.',
      duration: '12 Weeks',
      technologies: ['OpenAI', 'Azure', 'Python', 'Docker'],
      services: ['AI Strategy', 'Automation', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800',
      metrics: [
        { value: '50%', label: 'Response Improvement' },
        { value: '85%', label: 'Billing Error Reduction' },
        { value: '<3%', label: 'Rejection Rate' }
      ],
      seo: {
        title: 'Healthcare AI Billing Automation Case Study | HyperCode',
        description: 'See how HyperCode utilized Azure OpenAI and Python workflows to automate medical claims billing, reducing rejection rates to under 3% for a healthcare network.',
        ogTitle: 'AI-Powered Claims & Billing Automation | HyperCode Case Study',
        ogDescription: 'Automating EHR parsing and claim validation for a multi-state healthcare network using advanced LLMs and Python.'
      },
      relatedServices: [
        { name: 'AI Consulting', slug: 'ai-consulting' },
        { name: 'AI Workflow Automation', slug: 'ai-workflow-automation' },
        { name: 'AI Document Processing', slug: 'ai-document-processing' }
      ],
      relatedCaseStudies: ['healthcare-patient-mobile-app', 'saas-cloud-devops-migration']
    },
    es: {
      slug: 'healthcare-ai-billing-automation',
      industry: 'Salud',
      clientType: 'Red de Atención Médica',
      title: 'Automatización de Reclamaciones y Facturación con IA',
      challenge: 'El cliente, una red de proveedores de salud multiestatal, enfrentaba altas tasas de rechazo de reclamos (más del 18%) y un retraso promedio en el ciclo de facturación de 45 días. La verificación manual de los registros médicos electrónicos (EHR) contra los códigos de facturación de seguros creaba cuellos de botella administrativos severos y retrasaba la recaudación de ingresos.',
      solution: 'HyperCode diseñó y desplegó una tubería automatizada de análisis de documentos con IA agéntica. Aprovechando los modelos de Azure OpenAI, la orquestación de flujos de trabajo en Python y LangChain, la solución extrae automáticamente detalles de diagnóstico de las notas clínicas, los coteja con las bases de datos de codificación médica ICD-10 y resalta las anomalías de cumplimiento antes del envío.',
      implementation: 'Iniciamos el proyecto con una fase de descubrimiento de 3 semanas mapeando las estructuras de bases de datos de EHR del cliente. Construimos adaptadores de ingesta de alto rendimiento utilizando Python y Docker para procesar los registros clínicos entrantes. El núcleo de la plataforma utiliza cadenas de extracción de LLM personalizadas que identifican coincidencias de diagnósticos y procedimientos. Implementamos una interfaz de revisión humana para anomalías por debajo de un umbral de confianza del 95%, asegurando la precisión clínica al tiempo que se maximiza la automatización.',
      businessImpact: 'El sistema de validación automatizada de reclamos condujo a una mejora del 50% en los tiempos de respuesta de facturación al cliente, redujo las tasas de rechazo a menos del 3% y disminuyó las tasas de error de facturación en un 85%. Los ahorros administrativos anuales alcanzaron $1.2 millones.',
      duration: '12 Semanas',
      technologies: ['OpenAI', 'Azure', 'Python', 'Docker'],
      services: ['Estrategia de IA', 'Automatización', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800',
      metrics: [
        { value: '50%', label: 'Mejora de Respuesta' },
        { value: '85%', label: 'Reducción de Errores' },
        { value: '<3%', label: 'Tasa de Rechazo' }
      ],
      seo: {
        title: 'Estudio de Caso: Automatización de Facturación con IA en Salud | HyperCode',
        description: 'Vea cómo HyperCode utilizó flujos de trabajo de Azure OpenAI y Python para automatizar la facturación de reclamaciones médicas, reduciendo los rechazos a menos del 3%.',
        ogTitle: 'Automatización de Reclamaciones con IA | Estudio de Caso HyperCode',
        ogDescription: 'Automatización del análisis de registros médicos electrónicos para una red de salud multiestatal usando LLMs y Python.'
      },
      relatedServices: [
        { name: 'Consultoría de IA', slug: 'ai-consulting' },
        { name: 'Automatización de Flujos con IA', slug: 'ai-workflow-automation' },
        { name: 'Procesamiento de Documentos con IA', slug: 'ai-document-processing' }
      ],
      relatedCaseStudies: ['healthcare-patient-mobile-app', 'saas-cloud-devops-migration']
    }
  },
  'retail-inventory-bi-analytics': {
    en: {
      slug: 'retail-inventory-bi-analytics',
      industry: 'Retail',
      clientType: 'Global Retail Brand',
      title: 'Real-Time Multi-Channel Inventory Intelligence',
      challenge: 'A global retail enterprise with over 500 physical brick-and-mortar storefronts and a high-traffic e-commerce portal suffered from stock synchronization lag. Inventory data was batch-updated once every 24 hours, leading to frequent stockouts on trending items and over $5M in annual write-downs due to overstocked seasonal inventory.',
      solution: 'HyperCode engineered a real-time data orchestration platform to centralize multi-channel transactions. Using Snowflake as a central data lakehouse, Microsoft Fabric for pipeline automation, and Power BI/Tableau for executive dashboards, we enabled instant insights into store-level supply chain metrics.',
      implementation: 'We established event-driven pipelines running on Azure, capturing point-of-sale (POS) terminal changes and e-commerce cart events in real time. We built medallion architecture data pipelines (Bronze to Gold tables) in Snowflake, enabling clean, business-ready models. We then designed highly interactive Power BI and Tableau operational reports configured with scheduled direct query connections, giving procurement managers instant visibility.',
      businessImpact: 'The client achieved a 42% reduction in operational reporting time and saved $1.8M in annual inventory carrying costs by optimizing supply reorder schedules. Stockouts on popular items fell by 74%.',
      duration: '8 Weeks',
      technologies: ['Power BI', 'Snowflake', 'Microsoft Fabric', 'SQL Server', 'Tableau'],
      services: ['Business Intelligence', 'Data Engineering'],
      featuredImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800',
      metrics: [
        { value: '42%', label: 'Reporting Time Saved' },
        { value: '$1.8M', label: 'Inventory Cost Saved' },
        { value: '-74%', label: 'Stockout Occurrences' }
      ],
      seo: {
        title: 'Retail Inventory Business Intelligence Case Study | HyperCode',
        description: 'Discover how HyperCode built a real-time Snowflake and Power BI inventory intelligence system to save $1.8M in inventory costs for a global retail brand.',
        ogTitle: 'Real-Time Multi-Channel Inventory Intelligence | HyperCode',
        ogDescription: 'Optimizing supply chain visibility using Snowflake, Microsoft Fabric, and Power BI dashboards.'
      },
      relatedServices: [
        { name: 'Business Intelligence', slug: 'business-intelligence-consulting' },
        { name: 'Data Engineering Solutions', slug: 'data-engineering-solutions' },
        { name: 'Data Warehousing Services', slug: 'data-warehousing-services' }
      ],
      relatedCaseStudies: ['manufacturing-enterprise-data-platform', 'ecommerce-headless-web-development']
    },
    es: {
      slug: 'retail-inventory-bi-analytics',
      industry: 'Comercio Minorista',
      clientType: 'Marca Global de Retail',
      title: 'Inteligencia de Inventario Multicanal en Tiempo Real',
      challenge: 'Una empresa minorista global con más de 500 tiendas físicas y un portal de comercio electrónico de alto tráfico sufría por retrasos en la sincronización de stock. Los datos de inventario se actualizaban en lotes una vez cada 24 horas, lo que provocaba frecuentes pérdidas de stock en artículos populares y más de $5 millones en depreciaciones anuales debido a inventario estacional sobreabastecido.',
      solution: 'HyperCode diseñó una plataforma de orquestación de datos en tiempo real para centralizar las transacciones multicanal. Usando Snowflake como almacén de datos central, Microsoft Fabric para la automatización de canalizaciones y Power BI/Tableau para tableros ejecutivos, permitimos obtener información instantánea sobre las métricas de la cadena de suministro a nivel de tienda.',
      implementation: 'Establecimos canalizaciones dirigidas por eventos en Azure, capturando cambios en terminales de punto de venta (POS) y eventos de carritos en tiempo real. Construimos canalizaciones de datos con arquitectura de medallón (tablas Bronze a Gold) en Snowflake. Luego, diseñamos informes operativos en Power BI y Tableau configurados con conexiones de consulta directa, brindando a los gerentes de compras visibilidad instantánea.',
      businessImpact: 'El cliente logró una reducción del 42% en el tiempo de generación de informes operativos y ahorró $1.8 millones en costos anuales de almacenamiento de inventario al optimizar los programas de reabastecimiento. Las roturas de stock cayeron un 74%.',
      duration: '8 Semanas',
      technologies: ['Power BI', 'Snowflake', 'Microsoft Fabric', 'SQL Server', 'Tableau'],
      services: ['Inteligencia de Negocios', 'Ingeniería de Datos'],
      featuredImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800',
      metrics: [
        { value: '42%', label: 'Tiempo de Informes Ahorrado' },
        { value: '$1.8M', label: 'Ahorro en Costes de Inventario' },
        { value: '-74%', label: 'Roturas de Stock' }
      ],
      seo: {
        title: 'Estudio de Caso: BI de Inventario Minorista | HyperCode',
        description: 'Descubra cómo HyperCode construyó un sistema en tiempo real con Snowflake y Power BI para ahorrar $1.8 millones en costos de inventario para una marca de retail.',
        ogTitle: 'Inteligencia de Inventario Multicanal en Tiempo Real | HyperCode',
        ogDescription: 'Optimización de la visibilidad de la cadena de suministro utilizando Snowflake, Microsoft Fabric y Power BI.'
      },
      relatedServices: [
        { name: 'Inteligencia de Negocios', slug: 'business-intelligence-consulting' },
        { name: 'Soluciones de Ingeniería de Datos', slug: 'data-engineering-solutions' },
        { name: 'Servicios de Almacenamiento de Datos', slug: 'data-warehousing-services' }
      ],
      relatedCaseStudies: ['manufacturing-enterprise-data-platform', 'ecommerce-headless-web-development']
    }
  },
  'financial-risk-data-analytics': {
    en: {
      slug: 'financial-risk-data-analytics',
      industry: 'Finance',
      clientType: 'Financial Services Firm',
      title: 'High-Performance Risk Modeling & Analytics Workspace',
      challenge: 'The client\'s legacy batch risk scoring systems took upwards of 48 hours to evaluate credit and market risk vectors against their active loan portfolio databases. This latency prevented real-time risk adjustments during volatile market swings, exposing the firm to potential compliance penalties and capital allocation inefficiencies.',
      solution: 'HyperCode designed and implemented an enterprise-grade analytics workspace using Databricks and AWS. Utilizing PyTorch and Python-based ML models, we built parallel execution scoring pipelines that ingest raw transaction logs and deliver real-time risk analytics dashboards.',
      implementation: 'We established a scalable Databricks workspace on AWS configured with auto-scaling Spark clusters. The risk scoring code was refactored from legacy single-threaded scripts into PySpark parallel processing jobs. We utilized MLflow for credit model deployment and tracking, exposing output vectors to dynamic Tableau reports via Athena queries, which refresh every 15 minutes.',
      businessImpact: 'The new analytics workspace yielded 65% faster data processing runtimes and 3x faster risk assessment modeling cycles, allowing the treasury team to adjust capital hedging margins within minutes instead of days.',
      duration: '6 Months',
      technologies: ['Databricks', 'Python', 'AWS', 'PyTorch', 'Tableau'],
      services: ['Data Engineering', 'Business Intelligence', 'AI Strategy'],
      featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800',
      metrics: [
        { value: '65%', label: 'Pipeline Speedup' },
        { value: '3x', label: 'Faster Analytics' },
        { value: '15m', label: 'Dashboard Refresh Rate' }
      ],
      seo: {
        title: 'Financial Risk Analytics Databricks Case Study | HyperCode',
        description: 'Learn how HyperCode implemented a Databricks and PySpark analytics platform on AWS to speed up credit risk scoring processing by 65% for a financial services firm.',
        ogTitle: 'High-Performance Risk Modeling & Analytics | HyperCode',
        ogDescription: 'Accelerating financial risk profiling and portfolio analytics using Databricks, AWS, and PySpark.'
      },
      relatedServices: [
        { name: 'Data Analytics Services', slug: 'data-analytics-services' },
        { name: 'Data Engineering Solutions', slug: 'data-engineering-solutions' },
        { name: 'AI Consulting', slug: 'ai-consulting' }
      ],
      relatedCaseStudies: ['financial-staff-augmentation', 'retail-inventory-bi-analytics']
    },
    es: {
      slug: 'financial-risk-data-analytics',
      industry: 'Finanzas',
      clientType: 'Firma de Servicios Financieros',
      title: 'Espacio de Trabajo de Modelado y Analítica de Riesgos de Alto Rendimiento',
      challenge: 'Los sistemas heredados de scoring de riesgo por lotes del cliente tardaban más de 48 horas en evaluar los vectores de riesgo crediticio y de mercado contra sus bases de datos activas de préstamos. Esta latencia impedía ajustes de riesgo en tiempo real durante periodos de volatilidad, exponiendo a la firma a sanciones de cumplimiento e ineficiencias en la asignación de capital.',
      solution: 'HyperCode diseñó e implementó un espacio de trabajo analítico de nivel empresarial utilizando Databricks y AWS. Utilizando PyTorch y modelos de ML basados en Python, construimos canalizaciones de scoring en paralelo que procesan registros de transacciones crudos y entregan paneles de control de riesgo en tiempo real.',
      implementation: 'Establecimos un espacio de trabajo escalable de Databricks en AWS configurado con clústeres Spark de autoescalado. El código de scoring de riesgo se refactorizó de scripts de un solo hilo a trabajos de procesamiento en paralelo PySpark. Utilizamos MLflow para el seguimiento de modelos de crédito, exponiendo los resultados a Tableau a través de consultas Athena que se actualizan cada 15 minutos.',
      businessImpact: 'El espacio de trabajo analítico generó un procesamiento de datos un 65% más rápido y ciclos de modelado 3 veces más rápidos, lo que permite al equipo de tesorería ajustar márgenes de cobertura de capital en minutos en lugar de días.',
      duration: '6 Meses',
      technologies: ['Databricks', 'Python', 'AWS', 'PyTorch', 'Tableau'],
      services: ['Ingeniería de Datos', 'Inteligencia de Negocios', 'Estrategia de IA'],
      featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800',
      metrics: [
        { value: '65%', label: 'Procesamiento Rápido' },
        { value: '3x', label: 'Analítica más Rápida' },
        { value: '15m', label: 'Actualización de Panel' }
      ],
      seo: {
        title: 'Estudio de Caso: Analítica de Riesgo Financiero con Databricks | HyperCode',
        description: 'Vea cómo HyperCode implementó una plataforma analítica con Databricks y PySpark en AWS para acelerar el scoring de riesgos crediticios en un 65%.',
        ogTitle: 'Modelado de Riesgos y Analítica de Alto Rendimiento | HyperCode',
        ogDescription: 'Aceleración del perfilado de riesgo financiero utilizando Databricks, AWS y PySpark.'
      },
      relatedServices: [
        { name: 'Servicios de Analítica de Datos', slug: 'data-analytics-services' },
        { name: 'Soluciones de Ingeniería de Datos', slug: 'data-engineering-solutions' },
        { name: 'Consultoría de IA', slug: 'ai-consulting' }
      ],
      relatedCaseStudies: ['financial-staff-augmentation', 'retail-inventory-bi-analytics']
    }
  },
  'logistics-dispatch-software-development': {
    en: {
      slug: 'logistics-dispatch-software-development',
      industry: 'Logistics',
      clientType: 'Logistics Enterprise',
      title: 'Custom Enterprise Dispatch & Fleet Orchestration Portal',
      challenge: 'A national logistics firm managing a fleet of 1,200+ trucks relied on legacy, high-latency dispatch software. The system struggled to handle real-time route changes and driver scheduling constraints, causing route delays, missed delivery windows, and excess driver idle time costing over $3M annually.',
      solution: 'HyperCode engineered a bespoke web-based fleet orchestration portal. Utilizing React for a fluid user interface, .NET Core microservices, and high-performance SQL Server clustering, we developed a dynamic dispatch dashboard with automated route optimization engines.',
      implementation: 'Our development team designed a modern React front-end communicating with containerized .NET API gateways hosted on Azure. We implemented a route planning engine utilizing open-source GIS libraries that computes traffic patterns and vehicle capacity. Database queries in SQL Server were optimized with custom spatial indexing, reducing route loading delays from 45 seconds to sub-second speeds.',
      businessImpact: 'The dispatch solution drove a 40% increase in operational fleet efficiency, reduced route-planning overhead by 50%, and achieved a 95% on-time dispatch rate within the first 90 days of deployment.',
      duration: '9 Months',
      technologies: ['.NET', 'React', 'SQL Server', 'Docker', 'Kubernetes'],
      services: ['Software Engineering', 'Digital Transformation', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
      metrics: [
        { value: '40%', label: 'Operational Efficiency' },
        { value: '95%', label: 'On-Time Dispatch Rate' },
        { value: 'Sub-1s', label: 'Route Computation' }
      ],
      seo: {
        title: 'Custom Logistics Dispatch Software Case Study | HyperCode',
        description: 'Read how HyperCode built a custom fleet orchestration and dispatch portal using React and .NET Core to increase operational efficiency by 40% for a logistics firm.',
        ogTitle: 'Custom Enterprise Dispatch & Fleet Orchestration | HyperCode',
        ogDescription: 'Engineering high-throughput routing systems using React, .NET Core microservices, and SQL Server.'
      },
      relatedServices: [
        { name: 'Custom Software Development', slug: 'custom-software-development' },
        { name: 'Enterprise Software', slug: 'enterprise-software' },
        { name: 'Web Development Services', slug: 'web-development-services' }
      ],
      relatedCaseStudies: ['saas-cloud-devops-migration', 'insurance-digital-transformation']
    },
    es: {
      slug: 'logistics-dispatch-software-development',
      industry: 'Logística',
      clientType: 'Empresa de Logística',
      title: 'Portal Personalizado de Despacho y Orquestación de Flotas',
      challenge: 'Una empresa nacional de logística que gestionaba una flota de más de 1,200 camiones dependía de un software de despacho heredado y de alta latencia. El sistema tenía dificultades para manejar cambios de ruta en tiempo real y restricciones de programación de conductores, lo que causaba retrasos en las rutas y pérdidas de ventanas de entrega, costando más de $3 millones anuales.',
      solution: 'HyperCode desarrolló un portal web a medida de orquestación de flotas. Utilizando React para la interfaz de usuario, microservicios en .NET Core y agrupación de SQL Server de alto rendimiento, desarrollamos un tablero dinámico con motores de optimización de rutas automatizados.',
      implementation: 'Nuestro equipo diseñó una interfaz React que se comunica con puertas de enlace API de .NET alojadas en Azure. Implementamos un motor de planificación de rutas que utiliza bibliotecas SIG de código abierto que calcula patrones de tráfico y capacidad de vehículos. Las consultas en SQL Server se optimizaron con índices espaciales, reduciendo los tiempos de cálculo a menos de un segundo.',
      businessImpact: 'La solución impulsó un aumento del 40% en la eficiencia operativa de la flota, redujo la planificación de rutas en un 50% y logró una tasa de despacho a tiempo del 95% dentro de los primeros 90 días.',
      duration: '9 Meses',
      technologies: ['.NET', 'React', 'SQL Server', 'Docker', 'Kubernetes'],
      services: ['Software y Sistemas', 'Transformación Digital', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
      metrics: [
        { value: '40%', label: 'Eficiencia Operativa' },
        { value: '95%', label: 'Despacho a Tiempo' },
        { value: 'Sub-1s', label: 'Cálculo de Rutas' }
      ],
      seo: {
        title: 'Estudio de Caso: Software de Despacho Logístico a Medida | HyperCode',
        description: 'Lea cómo HyperCode construyó un portal de despacho y orquestación de flotas usando React y .NET Core para aumentar la eficiencia de una firma logística en un 40%.',
        ogTitle: 'Portal Personalizado de Despacho y Orquestación de Flotas | HyperCode',
        ogDescription: 'Ingeniería de sistemas de enrutamiento utilizando React, microservicios .NET Core y SQL Server.'
      },
      relatedServices: [
        { name: 'Desarrollo de Software a Medida', slug: 'custom-software-development' },
        { name: 'Software Empresarial', slug: 'enterprise-software' },
        { name: 'Desarrollo Web', slug: 'web-development-services' }
      ],
      relatedCaseStudies: ['saas-cloud-devops-migration', 'insurance-digital-transformation']
    }
  },
  'ecommerce-headless-web-development': {
    en: {
      slug: 'ecommerce-headless-web-development',
      industry: 'Technology',
      clientType: 'E-commerce Platform',
      title: 'Headless Next.js Storefront Architecture',
      challenge: 'A high-traffic e-commerce brand operating on a monolithic platform experienced severe mobile slowdowns (mobile page speed score of 34/100). The slow loading speed led to high shopping cart abandonment rates, resulting in flatlining online revenue and rising customer acquisition costs.',
      solution: 'HyperCode migrated the brand to a modern, decoupled headless architecture. We developed a highly responsive, blazing-fast web application using Next.js, React, Node.js, and Tailwind CSS, connected to their product catalog APIs.',
      implementation: 'We designed the frontend using Next.js App Router and Tailwind CSS for rapid styling. To maximize speed, we implemented Incremental Static Regeneration (ISR), pre-rendering product detail pages at build time while updating inventory in the background. The frontend was deployed on Vercel edge networks, achieving server response times of less than 50ms worldwide.',
      businessImpact: 'The headless storefront produced a 35% increase in mobile conversion rates, reduced page load latency by 60%, and achieved a perfect 100/100 Core Web Vitals performance score.',
      duration: '12 Weeks',
      technologies: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Docker'],
      services: ['Software Engineering', 'Digital Transformation'],
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      metrics: [
        { value: '35%', label: 'Mobile Conversion Rise' },
        { value: '-60%', label: 'Page Load Latency' },
        { value: '100', label: 'Lighthouse Score' }
      ],
      seo: {
        title: 'Headless Next.js E-commerce Case Study | HyperCode',
        description: 'See how HyperCode migrated a legacy retail storefront to headless Next.js and Tailwind CSS, increasing conversion rates by 35% and achieving a 100/100 Lighthouse score.',
        ogTitle: 'Headless Next.js Storefront Migration | HyperCode Case Study',
        ogDescription: 'Optimizing e-commerce page speeds and conversion ratios using Next.js, React, and Edge delivery.'
      },
      relatedServices: [
        { name: 'Web Development Services', slug: 'web-development-services' },
        { name: 'SaaS Development', slug: 'saas-development' },
        { name: 'UI Design', slug: 'ui-design' }
      ],
      relatedCaseStudies: ['retail-inventory-bi-analytics', 'healthcare-patient-mobile-app']
    },
    es: {
      slug: 'ecommerce-headless-web-development',
      industry: 'Tecnología',
      clientType: 'Plataforma de E-commerce',
      title: 'Arquitectura de Tienda Headless con Next.js',
      challenge: 'Una marca de comercio electrónico con alto tráfico experimentaba una grave desaceleración en dispositivos móviles (puntuación de velocidad móvil de 34/100). El tiempo de carga provocaba altas tasas de abandono de carritos, estancando los ingresos en línea y aumentando los costos de adquisición.',
      solution: 'HyperCode migró la marca a una arquitectura desacoplada headless. Desarrollamos una aplicación web ultrarrápida y responsiva utilizando Next.js, React, Node.js y Tailwind CSS, conectada a las API de catálogo de productos existentes.',
      implementation: 'Diseñamos la interfaz utilizando Next.js App Router y Tailwind CSS. Para maximizar la velocidad, implementamos Regeneración Estática Incremental (ISR), renderizando previamente las páginas de detalles del producto en el tiempo de compilación. La interfaz se desplegó en redes Edge, logrando tiempos de respuesta de servidor inferiores a 50 ms.',
      businessImpact: 'La nueva tienda headless generó un aumento del 35% en las tasas de conversión móvil, redujo los tiempos de carga en un 60% y logró una puntuación perfecta de rendimiento de 100/100 en Core Web Vitals.',
      duration: '12 Semanas',
      technologies: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'Docker'],
      services: ['Desarrollo de Software a Medida', 'Transformación Digital'],
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      metrics: [
        { value: '35%', label: 'Conversión Móvil' },
        { value: '-60%', label: 'Latencia de Carga' },
        { value: '100', label: 'Puntuación Lighthouse' }
      ],
      seo: {
        title: 'Estudio de Caso: E-commerce Headless con Next.js | HyperCode',
        description: 'Vea cómo HyperCode migró una tienda minorista a Next.js headless y Tailwind CSS, aumentando las conversiones en un 35% y logrando un Lighthouse de 100/100.',
        ogTitle: 'Arquitectura de Tienda Headless con Next.js | HyperCode',
        ogDescription: 'Optimización de velocidades de e-commerce utilizando Next.js, React y entrega en el Edge.'
      },
      relatedServices: [
        { name: 'Desarrollo Web', slug: 'web-development-services' },
        { name: 'Desarrollo SaaS', slug: 'saas-development' },
        { name: 'Diseño UI', slug: 'ui-design' }
      ],
      relatedCaseStudies: ['retail-inventory-bi-analytics', 'healthcare-patient-mobile-app']
    }
  },
  'healthcare-patient-mobile-app': {
    en: {
      slug: 'healthcare-patient-mobile-app',
      industry: 'Healthcare',
      clientType: 'Healthcare Provider',
      title: 'Secure Patient Engagement Mobile Application',
      challenge: 'A healthcare system with multiple specialist clinics experienced high patient scheduling drop-offs. Patients were forced to call administrative lines to schedule visits, verify check-ins, or review test results, creating long call center queues and driving administrative costs up.',
      solution: 'HyperCode built fully secure, HIPAA-compliant patient-facing iOS and Android applications. Utilizing React Native for cross-platform efficiency, a secure Node.js middleware layer, and SQL Server databases, we unified scheduling, medical notes, and billing.',
      implementation: 'We established secure OAuth 2.0 and biometric user authentication to protect Patient Health Information (PHI). We built real-time appointment sync connectors to the clinic\'s internal SQL Server databases. Push notification flows were integrated to remind patients of scheduling windows, drastically reducing missed appointments.',
      businessImpact: 'The mobile portal drove a 50% improvement in patient self-scheduling engagement and lowered patient-related call center workload by 30%, saving the clinic network over $450K annually in support costs.',
      duration: '6 Months',
      technologies: ['React', 'Node.js', 'AWS', 'SQL Server'],
      services: ['Software Engineering', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
      metrics: [
        { value: '50%', label: 'Patient Engagement Rise' },
        { value: '-30%', label: 'Call Center Volume' },
        { value: '100%', label: 'HIPAA Audits Compliance' }
      ],
      seo: {
        title: 'HIPAA Patient Mobile App Case Study | HyperCode',
        description: 'Discover how HyperCode engineered a secure, HIPAA-compliant patient mobile app using React Native and SQL Server to lower call center overhead by 30%.',
        ogTitle: 'Secure Patient Engagement Mobile Application | HyperCode',
        ogDescription: 'Developing React Native iOS and Android patient portals with secure SQL Server integrations.'
      },
      relatedServices: [
        { name: 'Mobile App Development', slug: 'mobile-app-development' },
        { name: 'API Development', slug: 'api-development' },
        { name: 'Security Audits', slug: 'security-audits' }
      ],
      relatedCaseStudies: ['healthcare-ai-billing-automation', 'ecommerce-headless-web-development']
    },
    es: {
      slug: 'healthcare-patient-mobile-app',
      industry: 'Salud',
      clientType: 'Proveedor de Atención Médica',
      title: 'Aplicación Móvil Segura para el Paciente',
      challenge: 'Un sistema de salud con múltiples clínicas especializadas experimentaba una alta tasa de abandono en la programación de citas. Los pacientes se veían obligados a llamar a líneas administrativas para programar visitas o revisar análisis, lo que generaba largas colas en el centro de llamadas.',
      solution: 'HyperCode construyó aplicaciones iOS y Android seguras y conformes con HIPAA. Utilizando React Native para la eficiencia multiplataforma, un middleware seguro en Node.js y bases de datos SQL Server, unificamos citas, notas médicas y pagos.',
      implementation: 'Establecimos autenticación OAuth 2.0 y biométrica segura para proteger la información médica protegida (PHI). Construimos conectores de sincronización de citas en tiempo real con las bases de datos SQL Server internas. Los flujos de notificación push se integraron para recordar citas, reduciendo drásticamente las inasistencias.',
      businessImpact: 'El portal móvil impulsó una mejora del 50% en la programación autónoma de citas por parte del paciente y redujo el volumen de llamadas de soporte en un 30%, ahorrando más de $450 mil anuales.',
      duration: '6 Meses',
      technologies: ['React', 'Node.js', 'AWS', 'SQL Server'],
      services: ['Desarrollo de Software a Medida', 'DevOps'],
      featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
      metrics: [
        { value: '50%', label: 'Interacción del Paciente' },
        { value: '-30%', label: 'Volumen de Llamadas' },
        { value: '100%', label: 'Cumplimiento de HIPAA' }
      ],
      seo: {
        title: 'Estudio de Caso: App Móvil de Salud HIPAA | HyperCode',
        description: 'Descubra cómo HyperCode desarrolló una aplicación móvil segura y conforme a HIPAA con React Native y SQL Server para reducir llamadas en un 30%.',
        ogTitle: 'Aplicación Móvil Segura para el Paciente | HyperCode',
        ogDescription: 'Desarrollo de portales para pacientes en React Native iOS y Android con integraciones seguras de SQL Server.'
      },
      relatedServices: [
        { name: 'Desarrollo de Aplicaciones Móviles', slug: 'mobile-app-development' },
        { name: 'Desarrollo de APIs', slug: 'api-development' },
        { name: 'Auditorías de Seguridad', slug: 'security-audits' }
      ],
      relatedCaseStudies: ['healthcare-ai-billing-automation', 'ecommerce-headless-web-development']
    }
  },
  'saas-cloud-devops-migration': {
    en: {
      slug: 'saas-cloud-devops-migration',
      industry: 'Technology',
      clientType: 'SaaS Company',
      title: 'Infrastructure Containerization & Cloud DevOps Architecture',
      challenge: 'The client, a fast-growing B2B SaaS platform, suffered from unstable product deployments, manual infrastructure configuration drifts, and high cloud overhead expenses. Lack of automated continuous delivery pipelines resulted in production release window outages and slow scale-ups during peak usage hours.',
      solution: 'HyperCode restructured the client\'s cloud architecture on AWS. We containerized their microservices using Docker, deployed AWS EKS (Kubernetes) for cluster orchestration, and automated resource configuration using Terraform infrastructure-as-code.',
      implementation: 'We established automated CI/CD pipelines using GitHub Actions, ensuring that every code merge initiates static analysis, automated unit tests, and Docker image builds. The builds are deployed to staging and production Kubernetes environments without downtime using rolling update strategies. We automated AWS server provisioning via Terraform, eliminating manual console changes.',
      businessImpact: 'The cloud modernization effort achieved a 30% reduction in monthly cloud costs and reached 90% deployment automation, eliminating deployment-related application downtime completely.',
      duration: '16 Weeks',
      technologies: ['AWS', 'Kubernetes', 'Docker', 'Python'],
      services: ['Cloud Migration', 'DevOps', 'Automation'],
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800',
      metrics: [
        { value: '-30%', label: 'Cloud Costs Saved' },
        { value: '90%', label: 'Deployment Automation' },
        { value: '0m', label: 'Release Downtime' }
      ],
      seo: {
        title: 'SaaS Cloud DevOps & Kubernetes Case Study | HyperCode',
        description: 'Read how HyperCode optimized a SaaS company\'s infrastructure using AWS EKS, Docker, and Terraform, lowering cloud spend by 30% and automating 90% of deployments.',
        ogTitle: 'Kubernetes Infrastructure & Cloud DevOps | HyperCode Case Study',
        ogDescription: 'Automating enterprise application environments on AWS using Kubernetes clusters and Terraform CI/CD pipelines.'
      },
      relatedServices: [
        { name: 'Cloud Migration', slug: 'cloud-migration' },
        { name: 'DevOps Services', slug: 'devops-services' },
        { name: 'Kubernetes Orchestration', slug: 'kubernetes-orchestration' }
      ],
      relatedCaseStudies: ['logistics-dispatch-software-development', 'healthcare-ai-billing-automation']
    },
    es: {
      slug: 'saas-cloud-devops-migration',
      industry: 'Tecnología',
      clientType: 'Compañía SaaS',
      title: 'Contenedores de Infraestructura y Arquitectura Cloud DevOps',
      challenge: 'El cliente, una plataforma SaaS B2B de rápido crecimiento, sufría de despliegues inestables, desviaciones de configuración de infraestructura manuales y altos costos de nube. La falta de pipelines de entrega automatizados resultaba en interrupciones durante lanzamientos a producción.',
      solution: 'HyperCode reestructuró la arquitectura de nube del cliente en AWS. Contenedorizamos sus microservicios usando Docker, desplegamos AWS EKS (Kubernetes) para la orquestación y automatizamos la infraestructura utilizando Terraform.',
      implementation: 'Establecimos flujos automatizados de CI/CD utilizando GitHub Actions, garantizando que cada fusión de código inicie análisis estáticos, pruebas unitarias y compilación de imágenes Docker. Los despliegues se realizan en Kubernetes en entornos de prueba y producción sin inactividad utilizando estrategias de actualización continua.',
      businessImpact: 'El esfuerzo de modernización de nube logró una reducción del 30% en los costos mensuales de nube y alcanzó una automatización del 90% en los despliegues, eliminando los tiempos de inactividad de lanzamiento.',
      duration: '16 Semanas',
      technologies: ['AWS', 'Kubernetes', 'Docker', 'Python'],
      services: ['Migración de Nube', 'DevOps', 'Automatización'],
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800',
      metrics: [
        { value: '-30%', label: 'Coste de Nube Ahorrado' },
        { value: '90%', label: 'Despliegues Automatizados' },
        { value: '0m', label: 'Inactividad de Lanzamiento' }
      ],
      seo: {
        title: 'Estudio de Caso: DevOps Cloud y Kubernetes en SaaS | HyperCode',
        description: 'Vea cómo HyperCode optimizó la infraestructura de una empresa SaaS usando AWS EKS, Docker y Terraform, reduciendo costos de nube en un 30%.',
        ogTitle: 'Infraestructura de Kubernetes y Cloud DevOps | HyperCode',
        ogDescription: 'Automatización de entornos de aplicaciones empresariales en AWS utilizando clústeres de Kubernetes.'
      },
      relatedServices: [
        { name: 'Migración a la Nube', slug: 'cloud-migration' },
        { name: 'Servicios de DevOps', slug: 'devops-services' },
        { name: 'Orquestación de Kubernetes', slug: 'kubernetes-orchestration' }
      ],
      relatedCaseStudies: ['logistics-dispatch-software-development', 'healthcare-ai-billing-automation']
    }
  },
  'insurance-digital-transformation': {
    en: {
      slug: 'insurance-digital-transformation',
      industry: 'Finance',
      clientType: 'Insurance Organization',
      title: 'Legacy Process Modernization & Cloud Claims Platform',
      challenge: 'An insurance network with millions of active policies processed auto and property claims using paper filings and legacy mainframe databases. A single claim required manual transfer across 4 systems, resulting in an average processing delay of 21 days and high administrative claim handling costs.',
      solution: 'HyperCode orchestrated a complete digital transformation. We designed a modern claim intake web portal, implemented optical character recognition (OCR) data capture interfaces, and migrated legacy mainframe workflows to Microsoft Azure cloud databases.',
      implementation: 'We established secure cloud sync pipelines to migrate legacy IBM database schemas to Azure SQL. We built a modern React web portal for policyholders to upload media and submit claims directly. We integrated machine learning OCR services to automatically extract details from upload photos and repair invoices, triggering automated approval workflows.',
      businessImpact: 'The digital claims platform slashed processing times from 21 days to less than 24 hours, cut claim handling administrative costs by 45%, and increased policyholder satisfaction metrics by 65%.',
      duration: '6 Months',
      technologies: ['.NET', 'React', 'Azure', 'SQL Server', 'OpenAI'],
      services: ['Digital Transformation', 'Cloud Migration', 'Software Engineering'],
      featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
      metrics: [
        { value: '<24h', label: 'Claims Processing Time' },
        { value: '-45%', label: 'Administrative Savings' },
        { value: '+65%', label: 'Customer Satisfaction' }
      ],
      seo: {
        title: 'Insurance Digital Transformation Case Study | HyperCode',
        description: 'Learn how HyperCode engineered a digital claims platform on Azure, reducing insurance claims processing from 21 days to under 24 hours for an insurance organization.',
        ogTitle: 'Insurance Digital Transformation & Cloud Migration | HyperCode',
        ogDescription: 'Modernizing insurance claim management workflows using React, .NET Core, and Azure database pipelines.'
      },
      relatedServices: [
        { name: 'Digital Transformation', slug: 'digital-transformation' },
        { name: 'Cloud Migration', slug: 'cloud-migration' },
        { name: 'Custom Software Development', slug: 'custom-software-development' }
      ],
      relatedCaseStudies: ['logistics-dispatch-software-development', 'saas-cloud-devops-migration']
    },
    es: {
      slug: 'insurance-digital-transformation',
      industry: 'Finanzas',
      clientType: 'Organización de Seguros',
      title: 'Modernización de Procesos Heredados y Plataforma de Siniestros',
      challenge: 'Una red de seguros con millones de pólizas procesaba siniestros utilizando archivos físicos de papel y bases de datos obsoletas. Un solo siniestro requería transferencia manual entre 4 sistemas, lo que generaba un retraso promedio de 21 días.',
      solution: 'HyperCode orquestó una transformación digital completa. Diseñamos un portal web moderno de recepción de siniestros, implementamos reconocimiento de caracteres (OCR) y migramos flujos heredados a Azure.',
      implementation: 'Establecimos flujos seguros de sincronización para migrar bases de datos heredadas a Azure SQL. Construimos un portal React para asegurados. Integramos servicios de OCR de aprendizaje automático para extraer automáticamente datos de fotos y facturas subidas, activando aprobaciones automáticas.',
      businessImpact: 'La plataforma digital redujo los tiempos de procesamiento de 21 días a menos de 24 horas, disminuyó los costos administrativos en un 45% y aumentó la satisfacción de los clientes en un 65%.',
      duration: '6 Meses',
      technologies: ['.NET', 'React', 'Azure', 'SQL Server', 'OpenAI'],
      services: ['Transformación Digital', 'Migración de Nube', 'Desarrollo de Software a Medida'],
      featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
      metrics: [
        { value: '<24h', label: 'Procesamiento de Siniestros' },
        { value: '-45%', label: 'Ahorro Administrativo' },
        { value: '+65%', label: 'Satisfacción del Cliente' }
      ],
      seo: {
        title: 'Estudio de Caso: Transformación Digital en Seguros | HyperCode',
        description: 'Vea cómo HyperCode desarrolló una plataforma digital en Azure, reduciendo el procesamiento de siniestros de 21 días a menos de 24 horas.',
        ogTitle: 'Transformación Digital en Seguros | HyperCode',
        ogDescription: 'Modernización del procesamiento de siniestros utilizando React, .NET Core y Azure.'
      },
      relatedServices: [
        { name: 'Transformación Digital', slug: 'digital-transformation' },
        { name: 'Migración a la Nube', slug: 'cloud-migration' },
        { name: 'Desarrollo de Software a Medida', slug: 'custom-software-development' }
      ],
      relatedCaseStudies: ['logistics-dispatch-software-development', 'saas-cloud-devops-migration']
    }
  },
  'financial-staff-augmentation': {
    en: {
      slug: 'financial-staff-augmentation',
      industry: 'Finance',
      clientType: 'Financial Institution',
      title: 'Rapid Scaling of Cloud Data Engineering Team',
      challenge: 'The client, a regional commercial banking institution, was undertaking a major system migration from an on-premise data center to Azure cloud. Due to a highly competitive technical labor market, they faced a critical deficit of 8 senior .NET and database engineers, threatening to delay their regulatory migration milestone by 6 months.',
      solution: 'HyperCode provided a rapid staff augmentation solution. Within 14 days, we placed 8 certified senior cloud data engineers directly into the client\'s active scrum sprints, resolving the capability deficit.',
      implementation: 'We utilized our vetted candidate database to match the client\'s technical requirements (.NET Core, Azure Data Factory, and SQL Server optimization). Our pre-vetted engineers integrated into the client\'s workflows on day one, working under their direct management while supported by HyperCode\'s continuous technical consulting frameworks.',
      businessImpact: 'The database migration project was delivered 3 weeks ahead of the compliance deadline. The client achieved a 100% engineering resource match rate and avoided over $1.5M in potential regulatory delays.',
      duration: '6 Months',
      technologies: ['.NET', 'Azure', 'SQL Server'],
      services: ['IT Staffing', 'Software Engineering'],
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
      metrics: [
        { value: '14 Days', label: 'Time-to-Deploy' },
        { value: '100%', label: 'Resource Match Rate' },
        { value: '+3 Wks', label: 'Ahead of Schedule' }
      ],
      seo: {
        title: 'Financial IT Staff Augmentation Case Study | HyperCode',
        description: 'Read how HyperCode deployed 8 pre-vetted senior .NET and Azure cloud engineers within 14 days to keep a bank\'s database migration project 3 weeks ahead of schedule.',
        ogTitle: 'Rapid Scaling of Cloud Data Engineering Team | HyperCode',
        ogDescription: 'Accelerating financial system migrations via specialized developer staffing solutions.'
      },
      relatedServices: [
        { name: 'IT Staffing Solutions', slug: 'it-staffing-solutions' },
        { name: 'Staff Augmentation Services', slug: 'staff-augmentation-services' },
        { name: 'Custom Software Development', slug: 'custom-software-development' }
      ],
      relatedCaseStudies: ['financial-risk-data-analytics', 'logistics-dispatch-software-development']
    },
    es: {
      slug: 'financial-staff-augmentation',
      industry: 'Finanzas',
      clientType: 'Institución Financiera',
      title: 'Escalado Rápido de Equipo de Ingeniería de Datos Cloud',
      challenge: 'El cliente, una institución de banca comercial, estaba llevando a cabo una gran migración de sus sistemas locales a la nube de Azure. Debido a un mercado laboral altamente competitivo, enfrentaban un déficit de 8 ingenieros de datos y .NET senior, amenazando con retrasar el proyecto por 6 meses.',
      solution: 'HyperCode proporcionó una solución de aumento de personal rápida. En 14 días, desplegamos 8 ingenieros de datos en la nube senior certificados directamente en los sprints del cliente, resolviendo el déficit.',
      implementation: 'Utilizamos nuestra base de candidatos evaluados para que coincidieran con los requisitos técnicos (.NET, Azure Data Factory y optimización de SQL Server). Nuestros ingenieros se integraron de inmediato, trabajando bajo su administración directa y con el soporte técnico de HyperCode.',
      businessImpact: 'El proyecto de migración se entregó 3 semanas antes del plazo de cumplimiento. El cliente logró una satisfacción del 100% del personal y evitó más de $1.5 millones en costos de retrasos.',
      duration: '6 Meses',
      technologies: ['.NET', 'Azure', 'SQL Server'],
      services: ['Búsqueda y Selección de Talento TI', 'Desarrollo de Software a Medida'],
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
      metrics: [
        { value: '14 Días', label: 'Tiempo de Despliegue' },
        { value: '100%', label: 'Coincidencia de Recursos' },
        { value: '+3 Sem', label: 'Adelantado al Plazo' }
      ],
      seo: {
        title: 'Estudio de Caso: Aumento de Personal TI en Finanzas | HyperCode',
        description: 'Vea cómo HyperCode desplegó 8 ingenieros .NET y Azure senior en 14 días para adelantar un proyecto bancario 3 semanas.',
        ogTitle: 'Escalado Rápido de Equipo de Ingeniería Cloud | HyperCode',
        ogDescription: 'Aceleración de la migración de sistemas bancarios mediante soluciones de dotación de personal técnico especializado.'
      },
      relatedServices: [
        { name: 'Soluciones de Personal de TI', slug: 'it-staffing-solutions' },
        { name: 'Servicios de Aumento de Personal', slug: 'staff-augmentation-services' },
        { name: 'Desarrollo de Software a Medida', slug: 'custom-software-development' }
      ],
      relatedCaseStudies: ['financial-risk-data-analytics', 'logistics-dispatch-software-development']
    }
  },
  'manufacturing-enterprise-data-platform': {
    en: {
      slug: 'manufacturing-enterprise-data-platform',
      industry: 'Manufacturing',
      clientType: 'Manufacturing Enterprise',
      title: 'Real-Time Industrial IoT Analytics Platform',
      challenge: 'A Fortune 500 manufacturing company running 12 assembly plants faced severe bottlenecks in operational efficiency. Machine telemetry data (vibration, temperature, fluid pressures) was trapped in local controller databases, preventing predictive maintenance and resulting in unexpected assembly line breakdowns costing $150K per hour in idle production time.',
      solution: 'HyperCode built a unified enterprise IoT analytics platform. Combining Snowflake as a high-volume data lakehouse, Databricks for real-time streaming analytics, and Azure Event Hubs for telemetry ingestion, we enabled automated anomaly alerts.',
      implementation: 'We designed ingestion pipelines using Azure IoT Edge hubs, capturing telemetry from 5,000+ factory sensors. The streaming data is ingested into Snowflake at sub-minute intervals. We engineered Python-based predictive maintenance models in Databricks that analyze sensor trends, automatically triggering service tickets in the client\'s ERP when anomaly patterns emerge.',
      businessImpact: 'The IoT platform achieved a 45% reduction in unplanned factory floor downtime, saved $2.4M in unscheduled equipment repair costs, and allowed maintenance dispatchers to address issues hours before a breakdown occurs.',
      duration: '9 Months',
      technologies: ['Snowflake', 'Databricks', 'Azure', 'Python'],
      services: ['Data Engineering', 'Business Intelligence', 'Digital Transformation'],
      featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
      metrics: [
        { value: '-45%', label: 'Unplanned Downtime' },
        { value: '$2.4M', label: 'Maintenance Cost Saved' },
        { value: '5,000+', label: 'IoT Sensors Tracked' }
      ],
      seo: {
        title: 'Manufacturing IoT Data Platform Case Study | HyperCode',
        description: 'Read how HyperCode built an industrial IoT predictive analytics platform using Snowflake and Databricks to save $2.4M in maintenance costs for a manufacturer.',
        ogTitle: 'Real-Time Industrial IoT Analytics Platform | HyperCode Case Study',
        ogDescription: 'Ingesting and modeling factory telemetry data for predictive maintenance using Snowflake and Databricks.'
      },
      relatedServices: [
        { name: 'Data Engineering Solutions', slug: 'data-engineering-solutions' },
        { name: 'Data Analytics Services', slug: 'data-analytics-services' },
        { name: 'Business Intelligence', slug: 'business-intelligence-consulting' }
      ],
      relatedCaseStudies: ['retail-inventory-bi-analytics', 'saas-cloud-devops-migration']
    },
    es: {
      slug: 'manufacturing-enterprise-data-platform',
      industry: 'Manufactura',
      clientType: 'Empresa de Manufactura',
      title: 'Plataforma de Analítica de IoT Industrial en Tiempo Real',
      challenge: 'Una empresa de manufactura Fortune 500 con 12 plantas enfrentaba cuellos de botella en su eficiencia. Los datos de telemetría de las máquinas estaban atrapados en bases de datos locales, impidiendo el mantenimiento predictivo y resultando en paradas inesperadas de producción de $150 mil por hora.',
      solution: 'HyperCode construyó una plataforma unificada de analítica de IoT. Combinando Snowflake como almacén de datos de alto volumen, Databricks para analítica en tiempo real y Azure para la ingesta de telemetría, habilitamos alertas automáticas.',
      implementation: 'Diseñamos pipelines utilizando Azure IoT Edge hubs, capturando telemetría de más de 5,000 sensores. Los datos se transmiten a Snowflake en intervalos de sub-minuto. Desarrollamos modelos en Databricks con Python que analizan las tendencias de los sensores, generando órdenes de servicio en el ERP.',
      businessImpact: 'La plataforma de IoT logró una reducción del 45% en los tiempos de inactividad de fábrica, ahorró $2.4 millones en reparaciones no programadas y permitió resolver problemas antes de que ocurriera una avería.',
      duration: '9 Meses',
      technologies: ['Snowflake', 'Databricks', 'Azure', 'Python'],
      services: ['Ingeniería de Datos', 'Inteligencia de Negocios', 'Transformación Digital'],
      featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
      metrics: [
        { value: '-45%', label: 'Inactividad de Fábrica' },
        { value: '$2.4M', label: 'Coste de Mantenimiento' },
        { value: '5,000+', label: 'Sensores IoT Monitoreados' }
      ],
      seo: {
        title: 'Estudio de Caso: Plataforma de Datos IoT en Manufactura | HyperCode',
        description: 'Vea cómo HyperCode construyó una plataforma de analítica predictiva de IoT industrial con Snowflake y Databricks para ahorrar $2.4 millones.',
        ogTitle: 'Analítica de IoT Industrial en Tiempo Real | HyperCode',
        ogDescription: 'Ingesta y modelado de datos de telemetría de fábrica para mantenimiento predictivo utilizando Snowflake.'
      },
      relatedServices: [
        { name: 'Soluciones de Ingeniería de Datos', slug: 'data-engineering-solutions' },
        { name: 'Servicios de Analítica de Datos', slug: 'data-analytics-services' },
        { name: 'Inteligencia de Negocios', slug: 'business-intelligence-consulting' }
      ],
      relatedCaseStudies: ['retail-inventory-bi-analytics', 'saas-cloud-devops-migration']
    }
  }
};

export function getCaseStudies(locale: string): CaseStudyItem[] {
  const isEs = locale === 'es';
  return Object.values(CASE_STUDIES).map((study) => (isEs ? study.es : study.en));
}

export function getCaseStudyBySlug(slug: string, locale: string): CaseStudyItem | null {
  const study = CASE_STUDIES[slug];
  if (!study) return null;
  return locale === 'es' ? study.es : study.en;
}

export function getCaseStudiesByCategory(categoryId: string, locale: string): CaseStudyItem[] {
  const all = getCaseStudies(locale);
  switch (categoryId) {
    case 'ai-automation':
      return all.filter(s => s.slug === 'healthcare-ai-billing-automation' || s.slug === 'manufacturing-enterprise-data-platform');
    case 'software-development':
      return all.filter(s => s.slug === 'logistics-dispatch-software-development' || s.slug === 'financial-staff-augmentation');
    case 'web-development':
      return all.filter(s => s.slug === 'ecommerce-headless-web-development' || s.slug === 'healthcare-patient-mobile-app');
    case 'mobile-development':
      return all.filter(s => s.slug === 'healthcare-patient-mobile-app' || s.slug === 'ecommerce-headless-web-development');
    case 'cloud-devops':
      return all.filter(s => s.slug === 'saas-cloud-devops-migration' || s.slug === 'manufacturing-enterprise-data-platform');
    case 'talent-solutions':
      return all.filter(s => s.slug === 'financial-staff-augmentation' || s.slug === 'logistics-dispatch-software-development');
    case 'digital-transformation':
      return all.filter(s => s.slug === 'insurance-digital-transformation' || s.slug === 'saas-cloud-devops-migration');
    case 'data-analytics':
      return all.filter(s => s.slug === 'retail-inventory-bi-analytics' || s.slug === 'financial-risk-data-analytics');
    case 'cybersecurity':
      return all.filter(s => s.slug === 'saas-cloud-devops-migration' || s.slug === 'financial-risk-data-analytics');
    case 'ui-ux-design':
      return all.filter(s => s.slug === 'ecommerce-headless-web-development' || s.slug === 'healthcare-patient-mobile-app');
    case 'ecommerce':
      return all.filter(s => s.slug === 'ecommerce-headless-web-development' || s.slug === 'retail-inventory-bi-analytics');
    case 'technology-consulting':
      return all.filter(s => s.slug === 'manufacturing-enterprise-data-platform' || s.slug === 'insurance-digital-transformation');
    default:
      return all.filter(s => s.slug === 'saas-cloud-devops-migration' || s.slug === 'logistics-dispatch-software-development');
  }
}

