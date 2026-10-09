export interface ServiceImageAlt {
  en: string;
  es: string;
}

export const SERVICE_IMAGE_ALTS: Record<string, ServiceImageAlt> = {
  // AI & Automation
  'ai-workflow-automation': {
    en: 'Documents flowing through connected automated workflow steps into approved outcomes',
    es: 'Documentos que fluyen por pasos de flujo de trabajo automatizados y conectados hasta resultados aprobados'
  },
  'ai-integration': {
    en: 'Business applications connected through a central AI integration hub to a live dashboard',
    es: 'Aplicaciones empresariales conectadas mediante un centro de integración de IA a un panel en tiempo real'
  },
  'ai-consulting': {
    en: 'AI consulting roadmap shown as a staged glass model with use-case tiles and analytics panels',
    es: 'Hoja de ruta de consultoría de IA representada como un modelo de cristal por etapas con casos de uso y paneles analíticos'
  },
  'generative-ai-solutions': {
    en: 'A generative AI prompt bar producing images, documents and content cards',
    es: 'Una barra de instrucciones de IA generativa que produce imágenes, documentos y tarjetas de contenido'
  },
  'ai-chatbot-development': {
    en: 'AI chatbot conversations on a smartphone and a web chat window connected to a knowledge source',
    es: 'Conversaciones de un chatbot de IA en un teléfono y en una ventana de chat web conectadas a una fuente de conocimiento'
  },
  'ai-voice-agents': {
    en: 'A headset voice wave feeding an AI voice agent that books appointments and routes calls',
    es: 'Una onda de voz desde unos auriculares que alimenta a un agente de voz con IA que agenda citas y enruta llamadas'
  },
  'ai-customer-support-automation': {
    en: 'Customer support tickets from email, chat and phone automatically routed and resolved on one console',
    es: 'Tickets de soporte de correo, chat y teléfono enrutados y resueltos automáticamente en una sola consola'
  },
  'ai-sales-assistants': {
    en: 'An AI sales funnel qualifying leads into a rising revenue chart with a trophy',
    es: 'Un embudo de ventas con IA que califica prospectos hacia un gráfico de ingresos en crecimiento con un trofeo'
  },
  'ai-hr-automation': {
    en: 'Candidate profile cards passing through an automated HR screening gate to an onboarding checklist',
    es: 'Perfiles de candidatos que pasan por un filtro automatizado de RR. HH. hacia una lista de incorporación'
  },
  'ai-document-processing': {
    en: 'A stack of paper documents converted by AI into structured data fields stored in a database',
    es: 'Una pila de documentos en papel convertida por IA en campos de datos estructurados guardados en una base de datos'
  },
  'ai-knowledge-base-rag': {
    en: 'Company documents indexed into a knowledge graph that returns grounded answers',
    es: 'Documentos de la empresa indexados en un grafo de conocimiento que devuelve respuestas fundamentadas'
  },
  'ai-analytics': {
    en: 'AI analytics display surfacing patterns, anomalies and insights from streaming data',
    es: 'Pantalla de analítica con IA que revela patrones, anomalías e ideas a partir de datos en flujo'
  },
  'custom-ai-model-development': {
    en: 'Training data flowing into a layered custom AI model with a learning curve and a security shield',
    es: 'Datos de entrenamiento que fluyen hacia un modelo de IA personalizado por capas con una curva de aprendizaje y un escudo de seguridad'
  },

  // Software Development
  'custom-software-development': {
    en: 'Custom software being assembled layer by layer between a desktop monitor and a laptop',
    es: 'Software a medida ensamblado capa por capa entre un monitor de escritorio y un portátil'
  },
  'enterprise-software': {
    en: 'Connected enterprise software modules for finance, operations, security and logistics',
    es: 'Módulos de software empresarial conectados para finanzas, operaciones, seguridad y logística'
  },
  'saas-development': {
    en: 'A cloud SaaS platform serving subscription dashboards and tenant workspaces',
    es: 'Una plataforma SaaS en la nube que ofrece paneles de suscripción y espacios de trabajo por cliente'
  },
  'crm-development': {
    en: 'A CRM interface with a customer contact grid and a customer profile panel',
    es: 'Una interfaz CRM con una cuadrícula de contactos y un panel de perfil de cliente'
  },
  'erp-development': {
    en: 'An ERP hub connecting sales, procurement, manufacturing, warehouse and people operations',
    es: 'Un núcleo ERP que conecta ventas, compras, fabricación, almacén y gestión de personas'
  },
  'inventory-systems': {
    en: 'Warehouse shelves scanned into an inventory management tablet with stock levels and alerts',
    es: 'Estanterías de almacén escaneadas en una tableta de gestión de inventario con niveles de stock y alertas'
  },
  'billing-systems': {
    en: 'Automated billing producing invoices, card payments and recurring revenue charts',
    es: 'Facturación automatizada que genera facturas, pagos con tarjeta y gráficos de ingresos recurrentes'
  },
  'pos-systems': {
    en: 'A retail point-of-sale terminal with card reader and receipt printer synced to the cloud',
    es: 'Un terminal de punto de venta minorista con lector de tarjetas e impresora de recibos sincronizado con la nube'
  },
  'workflow-systems': {
    en: 'A digital workflow with request, review, team approval and completion steps',
    es: 'Un flujo de trabajo digital con pasos de solicitud, revisión, aprobación del equipo y finalización'
  },
  'api-development': {
    en: 'Secure API gateway connecting web, mobile and data services',
    es: 'Pasarela de API segura que conecta servicios web, móviles y de datos'
  },
  'legacy-modernization': {
    en: 'A legacy computer system migrating into modern modular cloud services and dashboards',
    es: 'Un sistema informático heredado que migra a servicios modulares en la nube y paneles modernos'
  },

  // Web Development
  'corporate-websites': {
    en: 'A corporate website with an office tower hero, service cards and leadership section on desktop and laptop',
    es: 'Un sitio web corporativo con una torre de oficinas, tarjetas de servicios y sección de liderazgo en escritorio y portátil'
  },
  'business-websites': {
    en: 'A small business website on a laptop and smartphone with location, contact and review features',
    es: 'Un sitio web para pequeñas empresas en portátil y teléfono con ubicación, contacto y reseñas'
  },
  'portfolio-websites': {
    en: 'A portfolio website gallery of architecture and product photography on a large monitor',
    es: 'Una galería de sitio web de portafolio con fotografía de arquitectura y producto en un monitor grande'
  },
  'landing-pages': {
    en: 'A high-converting landing page with a call-to-action button and a rising performance arrow',
    es: 'Una página de aterrizaje de alta conversión con un botón de llamada a la acción y una flecha de rendimiento ascendente'
  },
  'ecommerce-websites': {
    en: 'An online store with a product catalog on a laptop and a secure checkout on a smartphone',
    es: 'Una tienda en línea con catálogo de productos en un portátil y un pago seguro en un teléfono'
  },
  'marketplace-development': {
    en: 'A multi-vendor marketplace hub connecting many seller storefronts',
    es: 'Un centro de marketplace multivendedor que conecta muchas tiendas de vendedores'
  },
  'booking-systems': {
    en: 'An online booking calendar on a tablet and smartphone with confirmed appointment slots',
    es: 'Un calendario de reservas en línea en tableta y teléfono con citas confirmadas'
  },
  'customer-portals': {
    en: 'A secure customer portal on desktop and mobile protected by a shield and access key',
    es: 'Un portal de clientes seguro en escritorio y móvil protegido por un escudo y una llave de acceso'
  },
  'admin-dashboards': {
    en: 'An admin dashboard with user management, KPI tiles and a permissions matrix on two monitors',
    es: 'Un panel de administración con gestión de usuarios, indicadores clave y una matriz de permisos en dos monitores'
  },
  'cms-development': {
    en: 'A block-based CMS editor publishing the same content to a website, tablet and smartphone',
    es: 'Un editor CMS por bloques que publica el mismo contenido en un sitio web, una tableta y un teléfono'
  },
  'progressive-web-apps': {
    en: 'A progressive web app installing to a phone home screen with offline, speed and push notification icons',
    es: 'Una aplicación web progresiva instalándose en la pantalla de inicio de un teléfono con iconos de modo sin conexión, velocidad y notificaciones'
  },

  // Mobile Development
  'android-apps': {
    en: 'Three Android smartphones running a business app in front of code and device testing panels',
    es: 'Tres teléfonos Android con una aplicación empresarial frente a paneles de código y pruebas en dispositivos'
  },
  'ios-apps': {
    en: 'A native iOS app shown on an iPhone, a smartwatch and an iPad',
    es: 'Una aplicación iOS nativa mostrada en un iPhone, un reloj inteligente y un iPad'
  },
  'cross-platform-apps': {
    en: 'One shared codebase syncing the same app to two phones, a tablet and a laptop',
    es: 'Un único código base que sincroniza la misma aplicación en dos teléfonos, una tableta y un portátil'
  },
  'flutter-development': {
    en: 'Flutter widget layers assembling into the same app screen on phones and a web browser',
    es: 'Capas de widgets de Flutter que forman la misma pantalla de aplicación en teléfonos y en un navegador web'
  },
  'react-native-development': {
    en: 'React Native code on a laptop hot-reloading a UI change onto two smartphones',
    es: 'Código React Native en un portátil que recarga en caliente un cambio de interfaz en dos teléfonos'
  },
  'enterprise-mobile-apps': {
    en: 'A rugged enterprise mobile app in a warehouse with secure sign-on, task checklist and barcode scanning',
    es: 'Una aplicación móvil empresarial robusta en un almacén con inicio de sesión seguro, lista de tareas y escaneo de códigos'
  },
  'on-demand-apps': {
    en: 'An on-demand service app with live map tracking, ratings and delivery routes across a city',
    es: 'Una aplicación de servicios bajo demanda con seguimiento en mapa, valoraciones y rutas de entrega por la ciudad'
  },

  // Cloud & DevOps
  'cloud-migration': {
    en: 'Applications and databases moving from an on-premise office building to a cloud platform following a migration checklist',
    es: 'Aplicaciones y bases de datos que se trasladan de un edificio local a una plataforma en la nube siguiendo una lista de migración'
  },
  'aws-cloud-solutions': {
    en: 'A multi-zone cloud architecture with compute, databases, load balancing, serverless and auto scaling',
    es: 'Una arquitectura en la nube multizona con cómputo, bases de datos, balanceo de carga, serverless y escalado automático'
  },
  'azure-cloud-solutions': {
    en: 'A hybrid enterprise cloud linking a laptop, identity directory and office building through secure connections',
    es: 'Una nube empresarial híbrida que une un portátil, un directorio de identidades y una oficina mediante conexiones seguras'
  },
  'google-cloud-solutions': {
    en: 'A global cloud network feeding data analytics charts and a machine learning pipeline',
    es: 'Una red global en la nube que alimenta gráficos de analítica de datos y un pipeline de aprendizaje automático'
  },
  'docker-containerization': {
    en: 'Application containers stacked on a cargo ship and lifted to a laptop and the cloud',
    es: 'Contenedores de aplicaciones apilados en un buque de carga y elevados hacia un portátil y la nube'
  },
  'kubernetes-orchestration': {
    en: 'A central control plane orchestrating pods across a ring of worker nodes',
    es: 'Un plano de control central que orquesta pods en un anillo de nodos de trabajo'
  },
  'ci-cd-pipelines': {
    en: 'A CI/CD pipeline moving code through build, test and security stations to a cloud release',
    es: 'Un pipeline CI/CD que lleva el código por etapas de compilación, pruebas y seguridad hasta un despliegue en la nube'
  },
  'server-deployment': {
    en: 'A deployment completing on a laptop and going live worldwide with SSL and load balancing',
    es: 'Un despliegue que finaliza en un portátil y se publica globalmente con SSL y balanceo de carga'
  },
  'monitoring-observability': {
    en: 'Observability dashboards with latency spikes, a service dependency map, traces and alerts',
    es: 'Paneles de observabilidad con picos de latencia, mapa de dependencias de servicios, trazas y alertas'
  },
  'infrastructure-automation': {
    en: 'Infrastructure-as-code blueprint provisioning identical cloud environments layer by layer',
    es: 'Plano de infraestructura como código que aprovisiona entornos en la nube idénticos capa por capa'
  },

  // Talent Solutions
  'permanent-staffing': {
    en: 'A hiring manager shaking hands with a new full-time employee over a signed offer',
    es: 'Una responsable de contratación estrecha la mano de un nuevo empleado a tiempo completo tras firmar la oferta'
  },
  'contract-staffing': {
    en: 'A contract IT professional welcomed into a project team room with a timeline and sprint board',
    es: 'Un profesional de TI por contrato recibido en la sala del equipo de proyecto con cronograma y tablero de sprint'
  },
  'contract-to-hire': {
    en: 'An engineer receiving a full-time offer as a trial-period timeline turns into a permanent role',
    es: 'Un ingeniero recibe una oferta a tiempo completo mientras su periodo de prueba se convierte en un puesto permanente'
  },
  'executive-search': {
    en: 'A confidential executive search conversation in a boardroom overlooking the city at dusk',
    es: 'Una conversación confidencial de búsqueda de ejecutivos en una sala de juntas con vista a la ciudad al atardecer'
  },
  'bulk-hiring': {
    en: 'A large group of new hires in an onboarding session with a hiring funnel on screen',
    es: 'Un gran grupo de nuevas contrataciones en una sesión de incorporación con un embudo de selección en pantalla'
  },
  'campus-recruitment': {
    en: 'Graduating students meeting a recruiter at a campus career fair booth',
    es: 'Estudiantes a punto de graduarse conversan con un reclutador en una feria de empleo universitaria'
  },
  'recruitment-process-outsourcing': {
    en: 'An end-to-end recruitment process from sourcing and screening to offer and onboarding, with time-to-hire falling',
    es: 'Un proceso de reclutamiento integral desde la búsqueda y el filtrado hasta la oferta y la incorporación, con menor tiempo de contratación'
  },
  'staff-augmentation': {
    en: 'Specialist engineers joining an in-house development team at a shared workstation',
    es: 'Ingenieros especialistas que se integran a un equipo de desarrollo interno en una estación de trabajo compartida'
  },
  'dedicated-teams': {
    en: 'A dedicated cross-functional product team in front of a sprint roadmap and wireframes',
    es: 'Un equipo de producto dedicado y multifuncional frente a una hoja de ruta de sprints y wireframes'
  },
  'offshore-development-center': {
    en: 'An offshore development center with engineers at workstations and a video call with the client team',
    es: 'Un centro de desarrollo offshore con ingenieros en sus puestos y una videollamada con el equipo del cliente'
  },

  // Digital Transformation
  'business-process-automation': {
    en: 'Paper forms turned into an automated business process with approval, notification and archive steps',
    es: 'Formularios en papel convertidos en un proceso de negocio automatizado con pasos de aprobación, notificación y archivo'
  },
  'digital-transformation-consulting': {
    en: 'A consultant presenting a transformation roadmap from legacy systems to a connected digital ecosystem',
    es: 'Un consultor presenta una hoja de ruta de transformación desde sistemas heredados hacia un ecosistema digital conectado'
  },
  'digital-strategy': {
    en: 'A glass chessboard of digital icons beneath a strategy roadmap leading to a target',
    es: 'Un tablero de ajedrez de cristal con iconos digitales bajo una hoja de ruta estratégica que conduce a un objetivo'
  },
  'process-optimization': {
    en: 'A tangled process with bottlenecks streamlined into a short, efficient path with an efficiency gauge',
    es: 'Un proceso enredado con cuellos de botella simplificado en un camino corto y eficiente con un indicador de eficiencia'
  },
  'paperless-office': {
    en: 'A stack of paper files digitized into organized, signed documents on a laptop and tablet',
    es: 'Una pila de archivos en papel digitalizada en documentos organizados y firmados en un portátil y una tableta'
  },

  // Data & Analytics
  'power-bi-dashboards': {
    en: 'An executive report dashboard with KPI tiles, charts, a map and a heatmap on a monitor and tablet',
    es: 'Un panel de informes ejecutivos con indicadores clave, gráficos, mapa y mapa de calor en un monitor y una tableta'
  },
  'tableau-dashboards': {
    en: 'An interactive visual analytics workbook with a scatter plot, treemap and stacked area chart',
    es: 'Un libro de analítica visual interactiva con diagrama de dispersión, mapa de árbol y gráfico de áreas apiladas'
  },
  'data-warehousing': {
    en: 'A data warehouse ingesting multiple sources into organized subject areas with analytics on top',
    es: 'Un almacén de datos que integra múltiples fuentes en áreas temáticas organizadas con analítica en la parte superior'
  },
  'etl-pipelines': {
    en: 'An ETL pipeline extracting, transforming and loading raw data from several sources into clean storage',
    es: 'Un pipeline ETL que extrae, transforma y carga datos sin procesar de varias fuentes en un almacenamiento limpio'
  },
  'business-intelligence': {
    en: 'Executives reviewing a business intelligence dashboard on a wall display and tablet',
    es: 'Ejecutivos revisando un panel de inteligencia de negocios en una pantalla de pared y una tableta'
  },
  'data-visualization': {
    en: 'Data visualization forms including flowing ribbons, a sunburst chart, 3D bars and a network graph',
    es: 'Formas de visualización de datos con cintas de flujo, gráfico de rayos de sol, barras 3D y un grafo de red'
  },
  'predictive-analytics': {
    en: 'A time-series forecast with a confidence band, demand forecast bars and a risk gauge',
    es: 'Un pronóstico de series temporales con banda de confianza, barras de previsión de demanda y un indicador de riesgo'
  },

  // Cybersecurity
  'security-assessment': {
    en: 'A protected digital estate under a security dome scanned for weak points with a risk gauge',
    es: 'Un entorno digital protegido bajo una cúpula de seguridad analizado en busca de puntos débiles con un indicador de riesgo'
  },
  'vulnerability-assessment': {
    en: 'A vulnerability scan dashboard with flagged network nodes, severity chart and remediation list',
    es: 'Un panel de análisis de vulnerabilidades con nodos de red señalados, gráfico de severidad y lista de remediación'
  },
  'penetration-testing': {
    en: 'An ethical security tester tracing an attack path through layered defenses and documenting findings',
    es: 'Un especialista en pruebas de seguridad ética traza una ruta de ataque a través de defensas por capas y documenta los hallazgos'
  },
  'security-audits': {
    en: 'A security audit checklist, audit report, access logs and a verified shield on an auditor\'s desk',
    es: 'Lista de auditoría de seguridad, informe de auditoría, registros de acceso y un escudo verificado en el escritorio de un auditor'
  },
  'compliance-consulting': {
    en: 'A balanced scale weighing policy documents against a verified shield, surrounded by certification seals',
    es: 'Una balanza que equilibra documentos de políticas con un escudo verificado, rodeada de sellos de certificación'
  },
  'identity-access-management': {
    en: 'Identities verified by fingerprint, face scan and multi-factor approval before role-based access to apps',
    es: 'Identidades verificadas con huella, reconocimiento facial y aprobación multifactor antes del acceso a aplicaciones según el rol'
  },

  // UI/UX Design
  'ui-design': {
    en: 'A UI design canvas with an app screen, color palette, layout grid and component inspector',
    es: 'Un lienzo de diseño de interfaz con pantalla de aplicación, paleta de colores, cuadrícula y panel de componentes'
  },
  'ux-research': {
    en: 'A UX researcher running a usability test with a participant in front of an affinity map and journey chart',
    es: 'Una investigadora UX realiza una prueba de usabilidad con un participante frente a un mapa de afinidad y un mapa de experiencia'
  },
  'wireframing': {
    en: 'Hand-drawn web and mobile wireframes linked in a user flow, digitized on a laptop',
    es: 'Wireframes web y móviles dibujados a mano y enlazados en un flujo de usuario, digitalizados en un portátil'
  },
  'prototyping': {
    en: 'Linked prototype screens on a monitor and a clickable prototype tested on a smartphone',
    es: 'Pantallas de prototipo enlazadas en un monitor y un prototipo interactivo probado en un teléfono'
  },
  'design-systems': {
    en: 'A design system library of color tokens, type scale, buttons, inputs and icons assembling a consistent screen',
    es: 'Una biblioteca de sistema de diseño con tokens de color, escala tipográfica, botones, campos e iconos que forman una pantalla coherente'
  },
  'product-design': {
    en: 'A product design team mapping user flows, screen mockups and feature priorities',
    es: 'Un equipo de diseño de producto que define flujos de usuario, maquetas de pantallas y prioridades de funciones'
  },
  'branding': {
    en: 'A brand identity kit with stationery, color palette swatches and brand guidelines on a tablet',
    es: 'Un kit de identidad de marca con papelería, muestras de paleta de colores y guía de marca en una tableta'
  },

  // Digital Marketing
  'seo-optimization': {
    en: 'A search result rising to the top position surrounded by traffic, speed, links and sitemap icons',
    es: 'Un resultado de búsqueda que sube a la primera posición rodeado de iconos de tráfico, velocidad, enlaces y mapa del sitio'
  },
  'local-seo': {
    en: 'A local map search on a smartphone highlighting a top-rated neighborhood shop',
    es: 'Una búsqueda en mapa local en un teléfono que destaca una tienda del barrio con las mejores valoraciones'
  },
  'google-ads': {
    en: 'A pay-per-click campaign dashboard with an ad preview, conversion trends, keyword bids and budget pacing',
    es: 'Un panel de campañas de pago por clic con vista previa del anuncio, tendencias de conversión, pujas por palabra clave y ritmo de presupuesto'
  },
  'social-media-marketing': {
    en: 'A social media post generating reactions, comments, shares and follower growth',
    es: 'Una publicación en redes sociales que genera reacciones, comentarios, compartidos y crecimiento de seguidores'
  },
  'linkedin-marketing': {
    en: 'A professional network graph rising from a laptop feed into a B2B lead-generation funnel',
    es: 'Un grafo de red profesional que surge del feed en un portátil hacia un embudo de generación de prospectos B2B'
  },
  'content-marketing': {
    en: 'A blog article branching into video, podcast, infographic, newsletter and social content',
    es: 'Un artículo de blog que se ramifica en video, pódcast, infografía, boletín y contenido para redes sociales'
  },
  'email-marketing': {
    en: 'An automated email journey from a laptop to an opened email on a smartphone with open and click metrics',
    es: 'Un recorrido de correo automatizado desde un portátil hasta un correo abierto en un teléfono con métricas de apertura y clics'
  },
  'conversion-rate-optimization': {
    en: 'Two landing page variants with a click heatmap, a conversion funnel and a winning variant chart',
    es: 'Dos variantes de página de aterrizaje con mapa de calor de clics, embudo de conversión y gráfico de la variante ganadora'
  },

  // E-commerce
  'shopify-development': {
    en: 'A lifestyle product store with a theme customizer on a laptop and mobile checkout on a smartphone',
    es: 'Una tienda de productos de estilo de vida con personalizador de tema en un portátil y pago móvil en un teléfono'
  },
  'woocommerce-development': {
    en: 'A content-rich online store combining blog articles, product cards and toggleable extensions',
    es: 'Una tienda en línea rica en contenido que combina artículos de blog, tarjetas de producto y extensiones activables'
  },
  'magento-development': {
    en: 'An enterprise commerce engine powering multiple regional storefronts, a large catalog and B2B ordering',
    es: 'Un motor de comercio empresarial que impulsa varias tiendas regionales, un amplio catálogo y pedidos B2B'
  },
  'payment-gateway-integration': {
    en: 'Card, mobile and web payments passing through a secure payment gateway to the bank with approval',
    es: 'Pagos con tarjeta, móvil y web que pasan por una pasarela de pago segura hasta el banco con aprobación'
  },
  'order-management-systems': {
    en: 'An order management dashboard tracking orders from new to delivered in front of a fulfillment center',
    es: 'Un panel de gestión de pedidos que sigue los pedidos desde nuevos hasta entregados frente a un centro logístico'
  },

  // Technology Consulting
  'technology-consulting': {
    en: 'A technology consultant presenting an architecture assessment, technology radar and roadmap to leaders',
    es: 'Un consultor tecnológico presenta a los directivos una evaluación de arquitectura, un radar tecnológico y una hoja de ruta'
  },
  'ai-strategy': {
    en: 'An AI adoption roadmap rising through assess, pilot and scale phases beside a prioritization matrix and governance shield',
    es: 'Una hoja de ruta de adopción de IA que avanza por fases de evaluación, piloto y escalado junto a una matriz de priorización y un escudo de gobernanza'
  },
  'cto-as-a-service': {
    en: 'A fractional CTO guiding a founding team through a system architecture sketch on a whiteboard',
    es: 'Un CTO fraccional guía al equipo fundador con un boceto de arquitectura de sistemas en una pizarra'
  },
  'startup-consulting': {
    en: 'Startup founders and an advisor reviewing an MVP roadmap and app prototype in a coworking space',
    es: 'Fundadores de una startup y un asesor revisan una hoja de ruta de MVP y un prototipo de aplicación en un espacio de coworking'
  },
  'product-consulting': {
    en: 'A product strategy board with vision, roadmap horizons, prioritization scale, persona and metrics',
    es: 'Un tablero de estrategia de producto con visión, horizontes de hoja de ruta, balanza de priorización, persona y métricas'
  },
  'software-architecture': {
    en: 'A layered software architecture model with gateway, microservices, event bus and data stores on a blueprint',
    es: 'Un modelo de arquitectura de software por capas con pasarela, microservicios, bus de eventos y almacenes de datos sobre un plano'
  }
};

export function getServiceImage(slug: string, isEs: boolean): { src: string; alt: string } | undefined {
  const alt = SERVICE_IMAGE_ALTS[slug];
  if (!alt) return undefined;
  return { src: `/images/services/${slug}.webp`, alt: isEs ? alt.es : alt.en };
}
