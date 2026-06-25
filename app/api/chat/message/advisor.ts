import enMessages from '../../../../messages/en.json';
import esMessages from '../../../../messages/es.json';

interface AdvisorResponse {
  message: string;
  suggestedPrompts: string[];
  flowTrigger?: string; // e.g. "lead_form", "consultation_form"
}

export function generateAdvisorResponse(userMessage: string, language: 'en' | 'es'): AdvisorResponse {
  const msg = userMessage.toLowerCase().trim();

  const isSpanish = language === 'es';
  const rawAdvisor = isSpanish ? esMessages.AIConsultant.advisor : enMessages.AIConsultant.advisor;

  const blocks = {
    greeting: {
      message: rawAdvisor.greeting.message,
      suggestedPrompts: rawAdvisor.greeting.suggestedPrompts,
    },
    about: {
      message: rawAdvisor.about.message,
      suggestedPrompts: rawAdvisor.about.suggestedPrompts,
    },
    location: {
      message: rawAdvisor.location.message,
      suggestedPrompts: rawAdvisor.location.suggestedPrompts,
    },
    pricing: {
      message: rawAdvisor.pricing.message,
      suggestedPrompts: rawAdvisor.pricing.suggestedPrompts,
    },
    techConsulting: {
      message: rawAdvisor.techConsulting.message,
      suggestedPrompts: rawAdvisor.techConsulting.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    aiSolutions: {
      message: rawAdvisor.aiSolutions.message,
      suggestedPrompts: rawAdvisor.aiSolutions.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    dataAnalytics: {
      message: rawAdvisor.dataAnalytics.message,
      suggestedPrompts: rawAdvisor.dataAnalytics.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    bi: {
      message: rawAdvisor.bi.message,
      suggestedPrompts: rawAdvisor.bi.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    staffing: {
      message: rawAdvisor.staffing.message,
      suggestedPrompts: rawAdvisor.staffing.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    webDev: {
      message: rawAdvisor.webDev.message,
      suggestedPrompts: rawAdvisor.webDev.suggestedPrompts,
      flowTrigger: "lead_form"
    },
    consultation: {
      message: rawAdvisor.consultation.message,
      suggestedPrompts: rawAdvisor.consultation.suggestedPrompts,
      flowTrigger: "consultation_form"
    },
    redirect: {
      message: rawAdvisor.redirect.message,
      suggestedPrompts: rawAdvisor.redirect.suggestedPrompts,
    }
  };

  // --- CLASSIFICATION ROUTER LOGIC ---

  // A. GREETINGS
  if (
    msg.match(/\b(hi|hello|hey|greetings|hola|buenos dias|buenas tardes|saludos|buen dia)\b/i) ||
    msg === ''
  ) {
    return blocks.greeting;
  }

  // B. ABOUT HYPERCODE
  if (
    msg.includes('who are you') ||
    msg.includes('what is hypercode') ||
    msg.includes('quienes son') ||
    msg.includes('quiénes son') ||
    msg.includes('que es hypercode') ||
    msg.includes('qué es hypercode')
  ) {
    return blocks.about;
  }

  // C. LOCATION
  if (
    msg.includes('location') ||
    msg.includes('address') ||
    msg.includes('where are you') ||
    msg.includes('ubicacion') ||
    msg.includes('dirección') ||
    msg.includes('direccion') ||
    msg.includes('donde estan') ||
    msg.includes('dónde están')
  ) {
    return blocks.location;
  }

  // D. PRICING
  if (
    msg.includes('price') ||
    msg.includes('cost') ||
    msg.includes('pricing') ||
    msg.includes('how much') ||
    msg.includes('budget') ||
    msg.includes('precio') ||
    msg.includes('costo') ||
    msg.includes('cuanto cuesta') ||
    msg.includes('cuánto cuesta')
  ) {
    return blocks.pricing;
  }

  // E. SERVICE FLOWS

  // 1. Tech Consulting
  if (
    msg.includes('technology consulting') ||
    msg.includes('tech consulting') ||
    msg.includes('digital transformation') ||
    msg.includes('architecture') ||
    msg.includes('consultoria tecnologica') ||
    msg.includes('consultoría tecnológica') ||
    msg.includes('transformacion digital') ||
    msg.includes('transformación digital') ||
    msg.includes('arquitectura')
  ) {
    return blocks.techConsulting;
  }

  // 2. AI Solutions
  if (
    msg.includes('ai solutions') ||
    msg.includes('artificial intelligence') ||
    msg.includes('machine learning') ||
    msg.includes('generative ai') ||
    msg.includes('llm') ||
    msg.includes('gpt') ||
    msg.includes('soluciones de ia') ||
    msg.includes('inteligencia artificial') ||
    msg.includes('aprendizaje automatico') ||
    msg.includes('ia generativa')
  ) {
    return blocks.aiSolutions;
  }

  // 3. Data Analytics
  if (
    msg.includes('data analytics') ||
    msg.includes('predictive') ||
    msg.includes('forecasting') ||
    msg.includes('analisis de datos') ||
    msg.includes('análisis de datos') ||
    msg.includes('predictivo') ||
    msg.includes('pronostico') ||
    msg.includes('pronóstico')
  ) {
    return blocks.dataAnalytics;
  }

  // 4. BI
  if (
    msg.includes('business intelligence') ||
    msg.includes('bi') ||
    msg.includes('power bi') ||
    msg.includes('tableau') ||
    msg.includes('dashboard') ||
    msg.includes('reporting') ||
    msg.includes('inteligencia de negocios') ||
    msg.includes('reportes') ||
    msg.includes('tablero')
  ) {
    return blocks.bi;
  }

  // 5. Staffing & Talent
  if (
    msg.includes('staffing') ||
    msg.includes('hire') ||
    msg.includes('talent') ||
    msg.includes('recruiting') ||
    msg.includes('augmentation') ||
    msg.includes('personal') ||
    msg.includes('contratar') ||
    msg.includes('talento') ||
    msg.includes('reclutamiento') ||
    msg.includes('aumento de personal')
  ) {
    return blocks.staffing;
  }

  // 6. Web Development
  if (
    msg.includes('web development') ||
    msg.includes('web dev') ||
    msg.includes('website') ||
    msg.includes('app development') ||
    msg.includes('react') ||
    msg.includes('next.js') ||
    msg.includes('saas') ||
    msg.includes('desarrollo web') ||
    msg.includes('sitio web') ||
    msg.includes('desarrollo de aplicaciones')
  ) {
    return blocks.webDev;
  }

  // 7. Schedule Consultation
  if (
    msg.includes('consultation') ||
    msg.includes('schedule') ||
    msg.includes('appointment') ||
    msg.includes('book') ||
    msg.includes('call') ||
    msg.includes('reunion') ||
    msg.includes('reunión') ||
    msg.includes('consulta') ||
    msg.includes('programar') ||
    msg.includes('agendar') ||
    msg.includes('llamada')
  ) {
    return blocks.consultation;
  }

  // F. OFF-TOPIC CHECK (Redirect if it does not match core domains)
  const isRelated = [
    'data', 'analytics', 'consulting', 'bi', 'dashboard', 'power bi', 'tableau',
    'staffing', 'talent', 'hire', 'recruit', 'engineer', 'developer', 'react', 'next',
    'web', 'app', 'saas', 'cloud', 'aws', 'azure', 'ai', 'intelligence', 'ml',
    'services', 'price', 'cost', 'where', 'who', 'transform', 'architecture', 'services',
    'soluciones', 'datos', 'analitica', 'consultoria', 'tablero', 'personal', 'contratar',
    'talento', 'desarrollo', 'nube', 'ia', 'inteligencia', 'aprendizaje', 'precio',
    'donde', 'quienes', 'transformacion', 'arquitectura', 'llamada', 'consulta'
  ].some(keyword => msg.includes(keyword));

  if (!isRelated) {
    return blocks.redirect;
  }

  // Fallback return greeting
  return blocks.greeting;
}
