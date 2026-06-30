import enMessages from '../../../../messages/en.json';
import esMessages from '../../../../messages/es.json';

interface AdvisorResponse {
  message: string;
  suggestedPrompts: string[];
  flowTrigger?: string; // e.g. "lead_form", "consultation_form", "staffing_form"
}

export function generateAdvisorResponse(userMessage: string, language: 'en' | 'es'): AdvisorResponse {
  const msg = userMessage.toLowerCase().trim();
  const isEs = language === 'es';
  const rawAdvisor = isEs ? esMessages.AIConsultant.advisor : enMessages.AIConsultant.advisor;

  // Timelines & Team Size advice maps
  const advisorBlueprints = {
    chatbot: {
      en: "Based on your interest in **AI Chatbot Development**, we suggest building a Retrieval-Augmented Generation (RAG) system with a custom LLM interface. \n\n* **Estimated Timeline:** 6 to 10 weeks.\n* **Suggested Team:** 1 AI Engineer, 1 DevOps Engineer, and 1 Project Manager.\n* **Required Tech:** Python, LangChain, OpenAI API / Google Gemini API, Pinecone vector database.\n* **Cross-Sell:** We recommend combining this with **Cloud & DevOps** for serverless scaling.\n\nWould you like to schedule a session to review this project blueprint?",
      es: "Según su interés en el **Desarrollo de Chatbots de IA**, sugerimos construir un sistema de Generación Aumentada por Recuperación (RAG) con una interfaz de LLM personalizada.\n\n* **Plazo Estimado:** 6 a 10 semanas.\n* **Equipo Sugerido:** 1 Ingeniero de IA, 1 Ingeniero de DevOps y 1 Director de Proyecto.\n* **Tecnología Requerida:** Python, LangChain, API de OpenAI / API de Google Gemini, base de datos vectorial Pinecone.\n* **Venta Cruzada:** Sugerimos combinarlo con **Nube y DevOps** para escalado serverless.\n\n¿Le gustaría programar una sesión técnica para revisar esta propuesta?"
    },
    erp: {
      en: "For **ERP & Custom Enterprise Software**, HyperCode engineers robust workflow, inventory, and billing systems designed to eliminate manual data entry.\n\n* **Estimated Timeline:** 3 to 6 months.\n* **Suggested Team:** 2 Full-Stack Developers, 1 Database Architect, and 1 UI/UX Designer.\n* **Required Tech:** Next.js, Node.js, PostgreSQL, Docker, AWS.\n* **Cross-Sell:** We highly recommend a **Cybersecurity Assessment** to secure corporate data assets.\n\nLet's coordinate a consultation call to review your workflow design.",
      es: "Para **ERP y Software Empresarial a Medida**, HyperCode diseña sistemas robustos de flujo de trabajo, inventario y facturación diseñados para eliminar la entrada manual de datos.\n\n* **Plazo Estimado:** 3 a 6 meses.\n* **Equipo Sugerido:** 2 Desarrolladores Full-Stack, 1 Arquitecto de Bases de Datos y 1 Diseñador UI/UX.\n* **Tecnología Requerida:** Next.js, Node.js, PostgreSQL, Docker, AWS.\n* **Venta Cruzada:** Recomendamos una **Evaluación de Ciberseguridad** para proteger sus datos corporativos.\n\nAgendemos una videoconsulta para diseñar su plan de arquitectura."
    },
    cloud: {
      en: "For **Cloud Migration & DevOps infrastructure**, we automate database transfers, containerize apps, and deploy secure CI/CD pipelines.\n\n* **Estimated Timeline:** 8 to 12 weeks.\n* **Suggested Team:** 1 Senior Cloud Solutions Architect, 1 Site Reliability Engineer (SRE).\n* **Required Tech:** Terraform, AWS / Azure, Docker, Kubernetes, GitHub Actions.\n* **Cross-Sell:** Combine with **Technology Consulting** to optimize cloud billing structures.\n\nWould you like to talk to our cloud practice director?",
      es: "Para **Migración a la Nube e Infraestructura DevOps**, automatizamos transferencias de bases de datos, contenedorizamos aplicaciones y desplegamos canalizaciones de CI/CD.\n\n* **Plazo Estimado:** 8 a 12 semanas.\n* **Equipo Sugerido:** 1 Arquitecto Senior de Soluciones en la Nube, 1 Ingeniero de Confiabilidad del Sitio (SRE).\n* **Tecnología Requerida:** Terraform, AWS / Azure, Docker, Kubernetes, GitHub Actions.\n* **Venta Cruzada:** Combine con **Consultoría Tecnológica** para optimizar la facturación de la nube.\n\n¿Desea hablar con nuestro director de infraestructura?"
    },
    talent: {
      en: "Through **IT & Non-IT Talent Solutions**, we act as your sourcing partner to deploy dedicated development squads or augment internal staff.\n\n* **Sourcing Time:** 5 to 10 business days for pre-screened candidate profiles.\n* **Roles Supported:** React/Next.js Engineers, Python Developers, Cloud Architects, PMs, and Recruiter profiles.\n* **Engagement Models:** Permanent Hire, Contract-to-Hire, or Dedicated ODC teams.\n\nLet's establish your hiring profiles now.",
      es: "Mediante las **Soluciones de Talento TI y No-TI**, actuamos como su socio de reclutamiento para desplegar equipos de desarrollo dedicados o aumentar su personal.\n\n* **Plazo de Entrega:** 5 a 10 días hábiles para perfiles pre-seleccionados.\n* **Roles Soportados:** Ingenieros de React/Next.js, Desarrolladores de Python, Arquitectos Cloud y perfiles de selección.\n* **Modelos:** Contratación Directa, Temporal o Equipos Dedicados.\n\nEstablezcamos sus perfiles de contratación hoy mismo."
    },
    cto: {
      en: "Under **CTO as a Service & Technology Consulting**, we review architecture diagrams, guide technology selection, and establish technical transformation strategies.\n\n* **Timeline:** Retainer-based (flexible hours per month).\n* **Deliverables:** Technical audit, cost-reduction strategy, system architecture design.\n* **Cross-Sell:** Best paired with **UI/UX Product Design** to validate user flows prior to coding.\n\nLet's schedule an introductory consulting call.",
      es: "Bajo **CTO as a Service y Consultoría Tecnológica**, revisamos diagramas de arquitectura, guiamos en la selección de tecnologías y definimos la estrategia de transformación.\n\n* **Plazo:** Formato de Retainer mensual flexible.\n* **Entregables:** Auditoría técnica, estrategia de reducción de costes, diseño de arquitectura de sistemas.\n* **Venta Cruzada:** Combina idealmente con **Diseño UI/UX** para validar flujos antes del desarrollo.\n\nAgendemos una videoconsulta de diagnóstico."
    },
    security: {
      en: "Our **Cybersecurity & Compliance** assessments identify vulnerabilities, execute penetration tests, and enforce secure Identity Access Management (IAM).\n\n* **Timeline:** 2 to 4 weeks for complete penetration test and mitigation report.\n* **Suggested Team:** 1 Penetration Testing Specialist, 1 Security Compliance Auditor.\n* **Cross-Sell:** Ensure secure API bindings by coupling this with **Software Development** audits.\n\nWould you like to initiate a secure assessment?",
      es: "Nuestras evaluaciones de **Ciberseguridad y Cumplimiento** identifican vulnerabilidades, realizan pruebas de penetración y configuran la gestión de accesos (IAM).\n\n* **Plazo:** 2 a 4 semanas para pruebas de penetración e informes de mitigación.\n* **Equipo Sugerido:** 1 Especialista en Penetration Testing, 1 Auditor de Cumplimiento de Seguridad.\n* **Venta Cruzada:** Asegure integraciones de API acoplándolo con auditorías de **Desarrollo de Software**.\n\n¿Desea iniciar una evaluación de seguridad?"
    },
    powerbi: {
      en: "For **Power BI, Tableau, & Data Analytics**, we design custom data pipelines, write clean ETL queries, and deploy interactive dashboards.\n\n* **Timeline:** 3 to 6 weeks.\n* **Suggested Team:** 1 BI Specialist, 1 Data Pipeline Engineer.\n* **Required Tech:** Power BI, Tableau, SQL, dbt, Snowflake.\n* **Cross-Sell:** Couple with **Generative AI** to embed natural-language search into reporting metrics.\n\nLet's connect your database to a visual reporting suite.",
      es: "Para **Power BI, Tableau y Analítica de Datos**, diseñamos flujos de datos a medida, escribimos consultas ETL limpias y desplegamos cuadros de mando.\n\n* **Plazo:** 3 a 6 semanas.\n* **Equipo Sugerido:** 1 Especialista en BI, 1 Ingeniero de Canales de Datos.\n* **Tecnología Requerida:** Power BI, Tableau, SQL, dbt, Snowflake.\n* **Venta Cruzada:** Acóplelo con **IA Generativa** para incrustar búsquedas en lenguaje natural en sus métricas.\n\nConectemos sus bases de datos a un panel ejecutivo."
    },
    shopify: {
      en: "Under **E-commerce & Marketplace Engineering**, we build high-converting Shopify, WooCommerce, or custom headless e-commerce stores.\n\n* **Timeline:** 4 to 8 weeks.\n* **Suggested Team:** 1 Front-End Developer, 1 Payment Integration Developer, 1 UI Designer.\n* **Required Tech:** Shopify Liquid / Next.js Commerce, Stripe, OMS API.\n* **Cross-Sell:** Optimize sales with **Digital Marketing (SEO & CRO)** services.\n\nLet's launch your online storefront.",
      es: "Bajo **Ingeniería de E-commerce y Marketplaces**, construimos tiendas Shopify, WooCommerce o plataformas headless de alta conversión.\n\n* **Plazo:** 4 a 8 semanas.\n* **Equipo Sugerido:** 1 Desarrollador Front-End, 1 Desarrollador de Pasarelas de Pago, 1 Diseñador UI.\n* **Tecnología Requerida:** Shopify Liquid / Next.js Commerce, Stripe, API de OMS.\n* **Venta Cruzada:** Optimice sus ventas agregando servicios de **Marketing Digital (SEO y CRO)**.\n\nLancemos su tienda digital."
    }
  };

  // Router Logic based on User Input
  // 1. AI Chatbots / Generative AI
  if (msg.includes('chatbot') || msg.includes('rag') || msg.includes('solución de ia') || msg.includes('soluciones de ia') || msg.includes('inteligencia artificial') || msg.includes('generative ai') || msg.includes('ia generativa')) {
    return {
      message: isEs ? advisorBlueprints.chatbot.es : advisorBlueprints.chatbot.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // 2. ERP / Custom Enterprise Software
  if (msg.includes('erp') || msg.includes('crm') || msg.includes('software erp') || msg.includes('software a medida') || msg.includes('custom software') || msg.includes('enterprise software')) {
    return {
      message: isEs ? advisorBlueprints.erp.es : advisorBlueprints.erp.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // 3. Cloud / DevOps / Infrastructure
  if (msg.includes('cloud') || msg.includes('devops') || msg.includes('migration') || msg.includes('migracion') || msg.includes('nube') || msg.includes('kubernetes') || msg.includes('aws') || msg.includes('azure')) {
    return {
      message: isEs ? advisorBlueprints.cloud.es : advisorBlueprints.cloud.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // 4. Staffing / Developers Sourcing
  if (msg.includes('developer') || msg.includes('dedicated') || msg.includes('hiring') || msg.includes('hire') || msg.includes('staffing') || msg.includes('talento') || msg.includes('contratar') || msg.includes('personal') || msg.includes('reclutamiento')) {
    return {
      message: isEs ? advisorBlueprints.talent.es : advisorBlueprints.talent.en,
      suggestedPrompts: isEs 
        ? ["Solicitar presupuesto", "Quiero una consulta", "Volver a servicios"] 
        : ["Get a staffing quote", "Schedule a consultation", "Go back to services"],
      flowTrigger: 'staffing_form'
    };
  }

  // 5. CTO Consulting / Strategy
  if (msg.includes('cto') || msg.includes('strategy') || msg.includes('architecture') || msg.includes('consultoria') || msg.includes('consultoría') || msg.includes('estrategia') || msg.includes('arquitectura')) {
    return {
      message: isEs ? advisorBlueprints.cto.es : advisorBlueprints.cto.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'consultation_form'
    };
  }

  // 6. Security / Pentesting / Compliance
  if (msg.includes('security') || msg.includes('cyber') || msg.includes('pentest') || msg.includes('ciberseguridad') || msg.includes('vulnerabilidad') || msg.includes('compliance') || msg.includes('cumplimiento')) {
    return {
      message: isEs ? advisorBlueprints.security.es : advisorBlueprints.security.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // 7. Power BI / Analytics / BI
  if (msg.includes('bi') || msg.includes('power bi') || msg.includes('tableau') || msg.includes('analytics') || msg.includes('dashboard') || msg.includes('analitica') || msg.includes('analítica') || msg.includes('reportes')) {
    return {
      message: isEs ? advisorBlueprints.powerbi.es : advisorBlueprints.powerbi.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // 8. E-commerce / Shopify
  if (msg.includes('shopify') || msg.includes('ecommerce') || msg.includes('store') || msg.includes('tienda') || msg.includes('comercio') || msg.includes('woocommerce')) {
    return {
      message: isEs ? advisorBlueprints.shopify.es : advisorBlueprints.shopify.en,
      suggestedPrompts: isEs 
        ? ["Quiero una consulta", "Calificar mi proyecto", "Volver a servicios"] 
        : ["Schedule a consultation", "Qualify my project", "Go back to services"],
      flowTrigger: 'lead_form'
    };
  }

  // General FAQ routes
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

  if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || msg.includes('how much') || msg.includes('budget') || msg.includes('precio') || msg.includes('costo') || msg.includes('cuanto cuesta') || msg.includes('cuánto cuesta')) {
    return {
      message: rawAdvisor.pricing.message,
      suggestedPrompts: rawAdvisor.pricing.suggestedPrompts
    };
  }

  if (msg.includes('consultation') || msg.includes('schedule') || msg.includes('appointment') || msg.includes('book') || msg.includes('call') || msg.includes('reunion') || msg.includes('reunión') || msg.includes('consulta') || msg.includes('programar') || msg.includes('agendar')) {
    return {
      message: rawAdvisor.consultation.message,
      suggestedPrompts: rawAdvisor.consultation.suggestedPrompts,
      flowTrigger: 'consultation_form'
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

  // Greeting
  return {
    message: rawAdvisor.greeting.message,
    suggestedPrompts: rawAdvisor.greeting.suggestedPrompts
  };
}
