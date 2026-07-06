'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '@/hooks/use-form-validation';
import {
  MessageSquare,
  X,
  Minus,
  Send,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Calendar,
  Loader2,
  Maximize2,
  Bot,
  User,
  ChevronRight
} from 'lucide-react';
import { trackGAEvent } from '@/lib/analytics';


interface Message {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  created_at: string;
}

interface AIConsultantProps {
  outsideClickAction?: 'minimize' | 'close' | 'none';
}

const getCompactChipLabel = (prompt: string, locale: string): string => {
  const p = prompt.toLowerCase();
  const isEs = locale === 'es';

  if (p.includes('chatbot') || p.includes('ia')) {
    return isEs ? 'Chatbot de IA' : 'AI Chatbot';
  }
  if (p.includes('erp') || p.includes('software')) {
    return isEs ? 'Software ERP' : 'ERP Software';
  }
  if (p.includes('cloud') || p.includes('migration') || p.includes('nube')) {
    return isEs ? 'Migrar a Nube' : 'Cloud Migration';
  }
  if (p.includes('developers') || p.includes('desarrolladores') || p.includes('talent')) {
    return isEs ? 'Contratar Talento' : 'Hire Developers';
  }
  if (p.includes('cto') || p.includes('virtual cto')) {
    return isEs ? 'Consultoría CTO' : 'CTO Consulting';
  }
  if (p.includes('cyber') || p.includes('seguridad') || p.includes('pentest')) {
    return isEs ? 'Ciberseguridad' : 'Cyber Assessment';
  }
  if (p.includes('power bi') || p.includes('dashboard') || p.includes('analytics')) {
    return isEs ? 'Power BI / Tableros' : 'Power BI Dashboards';
  }
  if (p.includes('shopify') || p.includes('store') || p.includes('tienda')) {
    return isEs ? 'Tienda Shopify' : 'Shopify Store';
  }
  if (p.includes('consultation') || p.includes('consulta')) {
    return isEs ? 'Consulta' : 'Consultation';
  }

  if (prompt.length > 20) {
    return prompt.substring(0, 18) + '...';
  }
  return prompt;
};

export default function AIConsultant({ outsideClickAction = 'minimize' }: AIConsultantProps) {
  const t = useTranslations('AIConsultant');
  const locale = useLocale();

  const [mounted, setMounted] = useState(false);
  
  // Widget Window States: 'closed' | 'minimized' | 'open'
  const [windowState, setWindowState] = useState<'closed' | 'minimized' | 'open'>('closed');
  
  // Chat States
  const [sessionId, setSessionId] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  
  // Interactive Flow States: 'chat' | 'lead_form' | 'consultation_form' | 'lead_success' | 'consultation_success'
  const [activeFlow, setActiveFlow] = useState<'chat' | 'lead_form' | 'consultation_form' | 'lead_success' | 'consultation_success'>('chat');
  const [selectedService, setSelectedService] = useState('');

  // Custom Flow States
  const [chatState, setChatState] = useState<'DEFAULT' | 'AI_SOLUTIONS' | 'STAFFING' | 'WEB_DEVELOPMENT' | 'CONSULTATION'>('DEFAULT');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mount effect with state restoration
  useEffect(() => {
    setMounted(true);
    
    const savedWindowState = localStorage.getItem('hypercode_ai_consult_window_state');
    if (savedWindowState === 'open' || savedWindowState === 'minimized') {
      setWindowState(savedWindowState);
    }
    
    const savedConvoId = localStorage.getItem('hypercode_ai_consult_conversation_id');
    if (savedConvoId) {
      setConversationId(savedConvoId);
    }

    const savedMessagesStr = localStorage.getItem('hypercode_ai_consult_messages');
    if (savedMessagesStr) {
      try {
        const parsed = JSON.parse(savedMessagesStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.warn('Failed to parse saved chat messages:', e);
      }
    }

    const savedChatState = localStorage.getItem('hypercode_ai_consult_chat_state');
    if (savedChatState) {
      setChatState(savedChatState as any);
    }

    const savedActiveFlow = localStorage.getItem('hypercode_ai_consult_active_flow');
    if (savedActiveFlow) {
      setActiveFlow(savedActiveFlow as any);
    }

    const savedPrompts = localStorage.getItem('hypercode_ai_consult_suggested_prompts');
    if (savedPrompts) {
      try {
        setSuggestedPrompts(JSON.parse(savedPrompts));
      } catch (e) {}
    }
  }, []);

  // Listen to mobile menu events to hide launcher
  useEffect(() => {
    const handleMobileMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setIsMobileMenuOpen(customEvent.detail.open);
    };
    window.addEventListener('hypercode-mobile-menu-toggle', handleMobileMenuToggle);
    return () => {
      window.removeEventListener('hypercode-mobile-menu-toggle', handleMobileMenuToggle);
    };
  }, []);

  // Persist state effects
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hypercode_ai_consult_window_state', windowState);
    }
  }, [windowState, mounted]);

  useEffect(() => {
    if (mounted && conversationId) {
      localStorage.setItem('hypercode_ai_consult_conversation_id', conversationId);
    }
  }, [conversationId, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hypercode_ai_consult_messages', JSON.stringify(messages));
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hypercode_ai_consult_chat_state', chatState);
    }
  }, [chatState, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hypercode_ai_consult_active_flow', activeFlow);
    }
  }, [activeFlow, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('hypercode_ai_consult_suggested_prompts', JSON.stringify(suggestedPrompts));
    }
  }, [suggestedPrompts, mounted]);
  const [staffingStep, setStaffingStep] = useState<number>(0);
  const [staffingData, setStaffingData] = useState({
    role: '',
    type: '',
    location: '',
    experience: '',
    timeline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [webDevStep, setWebDevStep] = useState<number>(0);
  const [webDevData, setWebDevData] = useState({
    businessType: '',
    goals: '',
    redesign: '',
    features: '',
    timeline: ''
  });

  // Form Inputs
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formIndustry, setFormIndustry] = useState('technology');
  const [formBudget, setFormBudget] = useState('between10k25k');
  const [formTimeline, setFormTimeline] = useState('medium');
  const [formMessage, setFormMessage] = useState('');
  const [formDate, setFormDate] = useState('');
  
  // Validation / Error States
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { formRef: leadFormRef, focusAndScrollToError: focusAndScrollToLeadError } = useFormValidation({
    navbarSelector: 'header',
    extraOffset: 12,
  });

  const { formRef: consultFormRef, focusAndScrollToError: focusAndScrollToConsultError } = useFormValidation({
    navbarSelector: 'header',
    extraOffset: 12,
  });

  const handleFieldChange = (field: string, value: string, setter: (val: string) => void) => {
    setter(value);
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Safe translation helper
  const getSafeTranslation = (key: string, fallback: string): string => {
    try {
      return t.has(key) ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const getDefaultPrompts = () => {
    try {
      const raw = t.raw('suggestedPrompts');
      if (Array.isArray(raw)) return raw;
    } catch {}
    return [
      "I need an AI chatbot",
      "I want ERP software",
      "I need dedicated developers",
      "I want CTO consulting"
    ];
  };

  // 1. Initialize Session ID and Load Chat
  useEffect(() => {
    let savedSessionId = localStorage.getItem('hypercode_ai_consult_session_id');
    if (!savedSessionId) {
      savedSessionId = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('hypercode_ai_consult_session_id', savedSessionId);
    }
    setSessionId(savedSessionId);
    setSuggestedPrompts(getDefaultPrompts());
  }, [t]);

  // 2. Keyboard ESC Support & Custom Open Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWindowState('closed');
      }
    };
    const handleOpenChat = () => {
      setWindowState('open');
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-hypercode-chat', handleOpenChat);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-hypercode-chat', handleOpenChat);
    };
  }, []);

  // 3. Click Outside to Close/Minimize
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        windowState === 'open' &&
        outsideClickAction !== 'none' &&
        widgetRef.current &&
        !widgetRef.current.contains(e.target as Node)
      ) {
        setWindowState(outsideClickAction);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [windowState, outsideClickAction]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeFlow]);

  // Initialize Conversation in remote DB
  const initializeConversation = async (sessId: string, currentLocale: string) => {
    try {
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessId,
          language: currentLocale
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.conversation) {
          setConversationId(data.conversation.id);
          if (messages.length === 0) {
            setMessages([
              {
                id: 'greeting',
                sender: 'assistant',
                message: t('welcomeMessage'),
                created_at: new Date().toISOString()
              }
            ]);
          }
        }
      }
    } catch (err) {
      console.error('Failed to initialize AI conversation:', err);
    }
  };

  // Trigger initialization when opening the chat
  useEffect(() => {
    if (windowState === 'open') {
      trackGAEvent({ action: 'chatbot_opened', category: 'Chatbot' });
      if (sessionId && !conversationId) {
        initializeConversation(sessionId, locale);
      }
    }
  }, [windowState, sessionId]);

  // Handle language switch synchronization with DB
  useEffect(() => {
    if (conversationId) {
      fetch('/api/chat/language-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          language: locale
        })
      }).catch(err => console.warn('Language switch sync failed:', err));

      setMessages(prev => prev.map(m => {
        if (m.id === 'greeting') {
          return { ...m, message: t('welcomeMessage') };
        }
        return m;
      }));
      setSuggestedPrompts(getDefaultPrompts());
    }
  }, [locale, conversationId, t]);

  // Helper to add user message and simulate typing assistant responses with database sync fallback
  const simulateAssistantResponse = (userMsg: string, assistantMsg: string, nextPrompts: string[], delay = 800) => {
    const userMsgId = 'user_' + Date.now();
    const newUserMessage: Message = {
      id: userMsgId,
      sender: 'user',
      message: userMsg,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Async sync user message to backend database
    fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation_id: conversationId || sessionId,
        sender: 'user',
        message: userMsg,
        language: locale
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.success && !conversationId && data.userMessage?.conversation_id) {
            setConversationId(data.userMessage.conversation_id);
          }
        });
      }
    }).catch(err => console.warn('User message sync failed:', err));

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsgId = 'assistant_' + Date.now();
      setMessages(prev => [...prev, {
        id: assistantMsgId,
        sender: 'assistant',
        message: assistantMsg,
        created_at: new Date().toISOString()
      }]);
      setSuggestedPrompts(nextPrompts);

      // Async sync assistant message to backend database
      if (conversationId || sessionId) {
        fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversation_id: conversationId || sessionId,
            sender: 'assistant',
            message: assistantMsg,
            language: locale
          })
        }).catch(err => console.warn('Assistant message sync failed:', err));
      }
    }, delay);
  };

  // 1. AI Solutions Flow
  const startAISolutionsFlow = () => {
    setChatState('AI_SOLUTIONS');
    const isEs = locale === 'es';
    const userMsg = isEs ? 'Soluciones de IA' : 'AI Solutions';
    const assistantMsg = isEs
      ? "En HyperCode, creamos capacidades avanzadas de IA para transformar empresas:\n\n• **Automatización de IA**: Automatice flujos de trabajo y tareas repetitivas.\n• **Agentes de IA**: Agentes autónomos que pueden ejecutar tareas complejas.\n• **Chatbots de IA**: Interfaces conversacionales inteligentes.\n• **Soluciones de IA personalizadas**: Modelos de aprendizaje automático a medida.\n• **IA generativa y LLM**: Integración de modelos de lenguaje grandes.\n• **Procesamiento inteligente de documentos**: Extraiga datos de documentos automáticamente.\n• **Integración de IA y ML**: Incorpore IA de manera transparente en sistemas existentes.\n\n¿Le gustaría explorar alguna de estas soluciones en más detalle?"
      : "At HyperCode, we build advanced AI capabilities to transform businesses:\n\n• **AI Automation**: Automate repetitive workflows and tasks.\n• **AI Agents**: Autonomous agents that can execute complex tasks.\n• **AI Chatbots**: Intelligent conversational interfaces.\n• **Custom AI Solutions**: Tailored machine learning models.\n• **Generative AI & LLMs**: Large language model integration.\n• **Intelligent Document Processing**: Automatically extract data from documents.\n• **AI Integration & ML**: Seamlessly embed AI into existing systems.\n\nWould you like to explore one of these solutions in more detail?";
    
    const prompts = isEs
      ? ['Chatbots de IA', 'Automatización de IA', 'Agentes de IA', 'Análisis de Datos', 'Reservar Consulta']
      : ['AI Chatbots', 'AI Automation', 'AI Agents', 'Data Analytics', 'Book Consultation'];

    simulateAssistantResponse(userMsg, assistantMsg, prompts);
  };

  const handleAISolutionsInput = (text: string) => {
    const p = text.toLowerCase().trim();
    const isEs = locale === 'es';

    if (p.includes('book consultation') || p.includes('reservar consulta')) {
      startConsultationFlow();
      return;
    }
    if (p.includes('back to start') || p.includes('volver al inicio')) {
      handleStartOver();
      return;
    }

    let answer = '';
    if (p.includes('chatbot')) {
      answer = isEs
        ? "Nuestros Chatbots de IA están construidos utilizando LLM avanzados e instrucciones de sistema sensibles al contexto para automatizar el servicio al cliente, calificar clientes potenciales y brindar asistencia instantánea las 24 horas, los 7 días de la semana."
        : "Our AI Chatbots are built using advanced LLMs and context-aware system instructions to automate customer service, qualify leads, and provide 24/7 instant assistance.";
    } else if (p.includes('automation') || p.includes('automatización') || p.includes('automatizacion')) {
      answer = isEs
        ? "Automatizamos flujos de trabajo empresariales complejos conectando bases de datos, API en la nube y componentes de aprendizaje automático para mejorar la productividad y eliminar los gastos generales manuales."
        : "We automate complex business workflows by connecting databases, cloud APIs, and machine learning components to improve productivity and eliminate manual overhead.";
    } else if (p.includes('agent') || p.includes('agente')) {
      answer = isEs
        ? "HyperCode diseña Agentes de IA autónomos que planifican, ejecutan y verifican flujos de trabajo de varios pasos. Pueden llamar a herramientas personalizadas, buscar en bases de datos de conocimiento internas y tomar decisiones dentro de límites establecidos."
        : "HyperCode designs autonomous AI Agents that plan, execute, and verify multi-step workflows. They can call custom tools, search internal knowledge bases, and make decisions within set boundaries.";
    } else if (p.includes('data') || p.includes('datos') || p.includes('analytics') || p.includes('análisis') || p.includes('analisis')) {
      answer = isEs
        ? "Nuestros servicios de Análisis de Datos le ayudan a crear modelos predictivos, ejecutar detección de anomalías en transacciones y compilar tableros interactivos usando Power BI y Tableau."
        : "Our Data Analytics services help you build predictive models, run anomaly detection on transactions, and compile interactive dashboards using Power BI and Tableau.";
    } else {
      handleSendMessage(text);
      return;
    }

    const followUp = isEs
      ? "\n\n¿Le gustaría explorar otra solución o reservar una consulta?"
      : "\n\nWould you like to explore another solution, or book a consultation?";

    const prompts = isEs
      ? ['Chatbots de IA', 'Automatización de IA', 'Agentes de IA', 'Análisis de Datos', 'Reservar Consulta', 'Volver al Inicio']
      : ['AI Chatbots', 'AI Automation', 'AI Agents', 'Data Analytics', 'Book Consultation', 'Back to Start'];

    simulateAssistantResponse(text, answer + followUp, prompts);
  };

  // 2. Staffing Flow
  const startStaffingFlow = () => {
    setChatState('STAFFING');
    setStaffingStep(1);
    setStaffingData({
      role: '',
      type: '',
      location: '',
      experience: '',
      timeline: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });

    const isEs = locale === 'es';
    const userMsg = isEs ? 'Contratar Talento' : 'Hire Talent';
    const assistantMsg = isEs
      ? "¿Para qué puesto o tecnología está buscando contratar? (ej. Desarrollador React, Ingeniero de Datos, DevOps)"
      : "What role or technology are you looking to hire for? (e.g., React Developer, Data Engineer, DevOps)";

    const prompts = isEs
      ? ['Desarrollador React', 'Ingeniero de Datos', 'Ingeniero DevOps', 'Volver al Inicio']
      : ['React Developer', 'Data Engineer', 'DevOps Engineer', 'Back to Start'];

    simulateAssistantResponse(userMsg, assistantMsg, prompts);
  };

  const handleStaffingInput = (text: string) => {
    const isEs = locale === 'es';
    if (text.toLowerCase().includes('back to start') || text.toLowerCase().includes('volver al inicio')) {
      handleStartOver();
      return;
    }

    if (staffingStep === 1) {
      setStaffingData(prev => ({ ...prev, role: text }));
      setStaffingStep(2);
      const question = isEs
        ? "¿Este puesto es por Contrato, de Tiempo Completo o Contrato a Término?"
        : "Is this position Contract, Full-Time, or Contract-to-Hire?";
      const prompts = isEs
        ? ['Contrato', 'Tiempo Completo', 'Contrato a Término']
        : ['Contract', 'Full-Time', 'Contract-to-Hire'];
      simulateAssistantResponse(text, question, prompts);
    } else if (staffingStep === 2) {
      setStaffingData(prev => ({ ...prev, type: text }));
      setStaffingStep(3);
      const question = isEs
        ? "¿Cuál es la ubicación preferida del candidato? (ej. Remoto, Presencial, Híbrido)"
        : "What is the preferred location for the candidate? (e.g., Remote, On-site, Hybrid)";
      const prompts = isEs
        ? ['Remoto', 'Presencial', 'Híbrido']
        : ['Remote', 'On-site', 'Hybrid'];
      simulateAssistantResponse(text, question, prompts);
    } else if (staffingStep === 3) {
      setStaffingData(prev => ({ ...prev, location: text }));
      setStaffingStep(4);
      const question = isEs
        ? "¿Qué nivel de experiencia se requiere para este puesto?"
        : "What level of experience is required for this position?";
      const prompts = isEs
        ? ['Junior', 'Mid-Level', 'Senior']
        : ['Junior', 'Mid-Level', 'Senior'];
      simulateAssistantResponse(text, question, prompts);
    } else if (staffingStep === 4) {
      setStaffingData(prev => ({ ...prev, experience: text }));
      setStaffingStep(5);
      const question = isEs
        ? "¿Cuál es su plazo para realizar esta contratación?"
        : "What is your timeline for making this hire?";
      const prompts = isEs
        ? ['Inmediato', '1-3 Meses', 'Flexible']
        : ['Immediate', '1-3 Months', 'Flexible'];
      simulateAssistantResponse(text, question, prompts);
    } else if (staffingStep === 5) {
      setStaffingData(prev => ({ ...prev, timeline: text }));
      setStaffingStep(6);
      const question = isEs
        ? "Para coordinar, por favor díganos su Nombre Completo:"
        : "To coordinate, please tell us your Full Name:";
      simulateAssistantResponse(text, question, []);
    } else if (staffingStep === 6) {
      setStaffingData(prev => ({ ...prev, contactName: text }));
      setStaffingStep(7);
      const question = isEs
        ? "¿Cuál es su Dirección de Correo Electrónico?"
        : "What is your Email Address?";
      simulateAssistantResponse(text, question, []);
    } else if (staffingStep === 7) {
      if (!text.includes('@') || !text.includes('.')) {
        const errorMsg = isEs
          ? "Por favor, introduzca una dirección de correo electrónico válida (ej. nombre@empresa.com):"
          : "Please enter a valid email address (e.g., name@company.com):";
        const userMsgId = 'user_' + Date.now();
        setMessages(prev => [...prev, { id: userMsgId, sender: 'user', message: text, created_at: new Date().toISOString() }]);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: 'assistant_err_' + Date.now(), sender: 'assistant', message: errorMsg, created_at: new Date().toISOString() }]);
        }, 500);
        return;
      }
      setStaffingData(prev => ({ ...prev, contactEmail: text }));
      setStaffingStep(8);
      const question = isEs
        ? "¿Cuál es su Número de Teléfono?"
        : "What is your Phone Number?";
      simulateAssistantResponse(text, question, []);
    } else if (staffingStep === 8) {
      const finalPhone = text;
      setStaffingData(prev => {
        const updated = { ...prev, contactPhone: finalPhone };
        
        // Submit the lead to DB via API
        fetch('/api/chat/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversation_id: conversationId,
            name: updated.contactName,
            email: updated.contactEmail,
            phone: updated.contactPhone,
            company: 'Staffing Client',
            industry: 'technology',
            service_interest: `Staffing: ${updated.role}`,
            budget_range: 'Flexible',
            timeline: updated.timeline,
            message: `Role: ${updated.role}\nType: ${updated.type}\nLocation: ${updated.location}\nExperience: ${updated.experience}\nTimeline: ${updated.timeline}`,
            language: locale
          })
        }).catch(err => console.warn('Submit staffing lead failed:', err));

        return updated;
      });

      setChatState('DEFAULT');
      setStaffingStep(0);
      const confirmation = isEs
        ? "¡Gracias! Su solicitud de personal ha sido registrada con éxito. Un especialista de talento de HyperCode se pondrá en contacto con usted en breve."
        : "Thank you! Your staffing request has been successfully registered. A HyperCode talent specialist will contact you shortly.";
      simulateAssistantResponse(text, confirmation, getDefaultPrompts());
    }
  };

  // 3. Web Development Flow
  const startWebDevelopmentFlow = () => {
    setChatState('WEB_DEVELOPMENT');
    setWebDevStep(1);
    setWebDevData({
      businessType: '',
      goals: '',
      redesign: '',
      features: '',
      timeline: ''
    });

    const isEs = locale === 'es';
    const userMsg = isEs ? 'Desarrollo Web' : 'Website Development';
    const assistantMsg = isEs
      ? "¿Para qué tipo de negocio es este sitio web? (ej. Comercio Electrónico, Blog, Plataforma SaaS, Sitio Corporativo)"
      : "What type of business is this website for? (e.g., E-commerce, Blog, SaaS Platform, Corporate Site)";

    const prompts = isEs
      ? ['Comercio Electrónico', 'Sitio Corporativo', 'Plataforma SaaS', 'Volver al Inicio']
      : ['E-commerce', 'Corporate Site', 'SaaS Platform', 'Back to Start'];

    simulateAssistantResponse(userMsg, assistantMsg, prompts);
  };

  const handleWebDevInput = (text: string) => {
    const isEs = locale === 'es';
    if (text.toLowerCase().includes('back to start') || text.toLowerCase().includes('volver al inicio')) {
      handleStartOver();
      return;
    }

    if (webDevStep === 1) {
      setWebDevData(prev => ({ ...prev, businessType: text }));
      setWebDevStep(2);
      const question = isEs
        ? "¿Cuáles son los objetivos principales del sitio web? (ej. Generación de prospectos, ventas en línea, presencia de marca)"
        : "What are your primary website goals? (e.g., Lead generation, online sales, brand awareness)";
      const prompts = isEs
        ? ['Generación de Prospectos', 'Ventas en Línea', 'Presencia de Marca']
        : ['Lead Generation', 'Online Sales', 'Brand Awareness'];
      simulateAssistantResponse(text, question, prompts);
    } else if (webDevStep === 2) {
      setWebDevData(prev => ({ ...prev, goals: text }));
      setWebDevStep(3);
      const question = isEs
        ? "¿Es este un proyecto de sitio web nuevo o un rediseño de un sitio existente?"
        : "Is this a new website project or a redesign of an existing site?";
      const prompts = isEs
        ? ['Sitio Web Nuevo', 'Rediseño de Sitio Existente']
        : ['New Website', 'Redesign Existing Site'];
      simulateAssistantResponse(text, question, prompts);
    } else if (webDevStep === 3) {
      setWebDevData(prev => ({ ...prev, redesign: text }));
      setWebDevStep(4);
      const question = isEs
        ? "¿Qué características específicas necesita? (ej. CMS/Blog, pasarela de pago, área de miembros)"
        : "What specific features do you need? (e.g., CMS/Blog, payment gateway, members area)";
      const prompts = isEs
        ? ['CMS / Blog', 'Integración de Pagos', 'Aplicación Web Personalizada']
        : ['CMS / Blog', 'Payment Integration', 'Custom Web Application'];
      simulateAssistantResponse(text, question, prompts);
    } else if (webDevStep === 4) {
      setWebDevData(prev => ({ ...prev, features: text }));
      setWebDevStep(5);
      const question = isEs
        ? "¿Cuál es su plazo estimado para lanzar este proyecto?"
        : "What is your estimated timeline to launch this project?";
      const prompts = isEs
        ? ['1 Mes', '1-3 Meses', 'Flexible']
        : ['1 Month', '1-3 Months', 'Flexible'];
      simulateAssistantResponse(text, question, prompts);
    } else if (webDevStep === 5) {
      setWebDevData(prev => ({ ...prev, timeline: text }));
      setWebDevStep(6);
      const question = isEs
        ? "¿Le gustaría programar una consulta con nuestro equipo de desarrollo web para calificar los detalles?"
        : "Would you like to schedule a consultation with our web development team to review the details?";
      const prompts = isEs
        ? ['Sí, programar consulta', 'No, gracias']
        : ['Yes, schedule consultation', 'No, thanks'];
      simulateAssistantResponse(text, question, prompts);
    } else if (webDevStep === 6) {
      const p = text.toLowerCase().trim();
      const isYes = p.includes('yes') || p.includes('sí') || p.includes('si') || p.includes('schedule');
      
      if (isYes) {
        setSelectedService(isEs ? 'Desarrollo Web' : 'Website Development');
        setFormMessage(
          isEs
            ? `Tipo de negocio: ${webDevData.businessType}\nObjetivos: ${webDevData.goals}\nTipo: ${webDevData.redesign}\nFunciones: ${webDevData.features}\nPlazo: ${webDevData.timeline}`
            : `Business Type: ${webDevData.businessType}\nGoals: ${webDevData.goals}\nProject: ${webDevData.redesign}\nFeatures: ${webDevData.features}\nTimeline: ${webDevData.timeline}`
        );
        setActiveFlow('lead_form');
        setChatState('DEFAULT');
        setWebDevStep(0);
        
        // Add user response to messages list
        setMessages(prev => [...prev, {
          id: 'user_opt_yes_' + Date.now(),
          sender: 'user',
          message: text,
          created_at: new Date().toISOString()
        }]);
      } else {
        setChatState('DEFAULT');
        setWebDevStep(0);
        const finalMsg = isEs
          ? "¡Entendido! Si cambia de opinión, siempre puede programar una llamada. ¿Hay algo más en lo que pueda ayudarle?"
          : "Understood! If you change your mind, you can always schedule a call later. Is there anything else I can help you with?";
        simulateAssistantResponse(text, finalMsg, getDefaultPrompts());
      }
    }
  };

  // 4. Consultation Flow
  const startConsultationFlow = () => {
    setChatState('CONSULTATION');
    setSelectedService(locale === 'es' ? 'Consulta de Tecnología' : 'Technology Consulting');
    setActiveFlow('consultation_form');
  };

  // Central Router Function
  const routeSuggestedPrompt = (prompt: string) => {
    const p = prompt.toLowerCase().trim();

    // Map AI Solutions
    if (
      p.includes('ai solutions') || 
      p.includes('soluciones de ia') || 
      p.includes('artificial intelligence') || 
      p.includes('inteligencia artificial') ||
      p === 'ai solutions' ||
      p === 'soluciones de ia'
    ) {
      startAISolutionsFlow();
      return;
    }

    // Map Hire Talent
    if (
      p.includes('hire talent') || 
      p.includes('contratar talento') || 
      p.includes('staffing') || 
      p.includes('personal') ||
      p === 'hire talent' ||
      p === 'contratar' ||
      p.includes('hire developers') ||
      p.includes('hire a developer')
    ) {
      startStaffingFlow();
      return;
    }

    // Map Website Development
    if (
      p.includes('website development') || 
      p.includes('desarrollo web') || 
      p.includes('web development') || 
      p === 'website development' ||
      p === 'desarrollo web' ||
      p.includes('web development team') ||
      p.includes('web dev')
    ) {
      startWebDevelopmentFlow();
      return;
    }

    // Map Consultation
    if (
      p.includes('consultation') || 
      p.includes('consulta') || 
      p.includes('schedule') || 
      p.includes('programar') ||
      p === 'consultation' ||
      p === 'consulta' ||
      p.includes('book') ||
      p.includes('schedule')
    ) {
      startConsultationFlow();
      return;
    }

    // Fallback: send as regular chat message
    handleSendMessage(prompt);
  };

  // Central User Submit Interceptor
  const handleUserSubmit = (text: string) => {
    if (!text.trim()) return;

    if (chatState === 'STAFFING') {
      handleStaffingInput(text);
    } else if (chatState === 'WEB_DEVELOPMENT') {
      handleWebDevInput(text);
    } else if (chatState === 'AI_SOLUTIONS') {
      handleAISolutionsInput(text);
    } else {
      routeSuggestedPrompt(text);
    }
  };

  // Send Message Handler
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending || isTyping) return;
    
    trackGAEvent({
      action: 'chatbot_message_sent',
      category: 'Chatbot',
      label: textToSend
    });
    
    const userMsgId = 'user_' + Date.now();
    const newUserMessage: Message = {
      id: userMsgId,
      sender: 'user',
      message: textToSend,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId || sessionId,
          sender: 'user',
          message: textToSend,
          language: locale
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if (!conversationId && data.userMessage?.conversation_id) {
            setConversationId(data.userMessage.conversation_id);
          }

          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: data.assistantMessage.id,
              sender: 'assistant',
              message: data.assistantMessage.message,
              created_at: data.assistantMessage.created_at
            }]);

            if (data.suggestedPrompts && data.suggestedPrompts.length > 0) {
              setSuggestedPrompts(data.suggestedPrompts);
            }

            if (data.flowTrigger === 'lead_form') {
              setSelectedService(textToSend);
              setActiveFlow('lead_form');
            } else if (data.flowTrigger === 'consultation_form') {
              setActiveFlow('consultation_form');
            }
          }, 800);
        }
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: 'error_' + Date.now(),
        sender: 'assistant',
        message: t('errors.generic'),
        created_at: new Date().toISOString()
      }]);
    } finally {
      setIsSending(false);
    }
  };

  // Lead Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});

    const newErrors: Record<string, string> = {};
    if (!formName.trim()) newErrors.name = t('errors.validation');
    
    if (!formEmail.trim()) {
      newErrors.email = t('errors.validation');
    } else if (!formEmail.includes('@') || !formEmail.includes('.')) {
      newErrors.email = t('errors.email');
    }
    
    if (!formPhone.trim()) {
      newErrors.phone = t('errors.validation');
    } else if (formPhone.replace(/\D/g, '').length < 7) {
      newErrors.phone = t('errors.phone');
    }
    
    if (!formCompany.trim()) newErrors.company = t('errors.validation');

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setTimeout(() => {
        focusAndScrollToLeadError(newErrors);
      }, 0);
      return;
    }

    setIsFormSubmitting(true);

    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          name: formName,
          email: formEmail,
          phone: formPhone,
          company: formCompany,
          industry: formIndustry,
          service_interest: selectedService || 'AI & Data Solutions',
          budget_range: t(`budgets.${formBudget}` as any),
          timeline: t(`timelines.${formTimeline}` as any),
          message: formMessage,
          language: locale,
          website_url: ''
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          trackGAEvent({
            action: 'chatbot_lead_submitted',
            category: 'Chatbot',
            label: selectedService || 'AI & Data Solutions'
          });
          setActiveFlow('lead_success');
          setMessages(prev => [...prev, {
            id: 'lead_confirm_' + Date.now(),
            sender: 'assistant',
            message: t('leadQualification.successDesc'),
            created_at: new Date().toISOString()
          }]);
        }
      } else {
        setFormError(t('errors.generic'));
      }
    } catch (err) {
      setFormError(t('errors.generic'));
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Consultation Submission
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});

    const newErrors: Record<string, string> = {};
    if (!formName.trim()) newErrors.name = t('errors.validation');
    
    if (!formEmail.trim()) {
      newErrors.email = t('errors.validation');
    } else if (!formEmail.includes('@') || !formEmail.includes('.')) {
      newErrors.email = t('errors.email');
    }
    
    if (!formPhone.trim()) {
      newErrors.phone = t('errors.validation');
    } else if (formPhone.replace(/\D/g, '').length < 7) {
      newErrors.phone = t('errors.phone');
    }

    if (!formCompany.trim()) newErrors.company = t('errors.validation');
    if (!formDate.trim()) newErrors.date = t('errors.validation');
    if (!formMessage.trim()) newErrors.message = t('errors.validation');

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setTimeout(() => {
        focusAndScrollToConsultError(newErrors);
      }, 0);
      return;
    }

    setIsFormSubmitting(true);

    try {
      const res = await fetch('/api/chat/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          company: formCompany,
          service: selectedService || 'Technology Consulting',
          message: formMessage,
          preferred_date: formDate,
          language: locale
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          trackGAEvent({
            action: 'chatbot_consultation_booked',
            category: 'Chatbot',
            label: selectedService || 'Technology Consulting'
          });
          setActiveFlow('consultation_success');
          setMessages(prev => [...prev, {
            id: 'consult_confirm_' + Date.now(),
            sender: 'assistant',
            message: t('consultationFlow.successDesc'),
            created_at: new Date().toISOString()
          }]);
        }
      } else {
        setFormError(t('errors.generic'));
      }
    } catch (err) {
      setFormError(t('errors.generic'));
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setActiveFlow('chat');
    setChatState('DEFAULT');
    setMessages([
      {
        id: 'greeting',
        sender: 'assistant',
        message: t('welcomeMessage'),
        created_at: new Date().toISOString()
      }
    ]);
    setSuggestedPrompts(getDefaultPrompts());
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCompany('');
    setFormMessage('');
    setFormDate('');
  };
  // Check if suggested queries should be shown (hide after first user message)
  const showChips = activeFlow === 'chat' && messages.filter(m => m.sender === 'user').length === 0;
  const isChatEmpty = activeFlow === 'chat' && messages.length <= 1;

  // Localized greeting parts
  const isEs = locale === 'es';
  const greetingText = isEs ? '¡Hola! 👋' : 'Hello 👋';
  const introText = isEs ? 'Soy el Consultor de IA de HyperCode.' : "I'm HyperCode AI Consultant.";
  const questionText = isEs ? '¿Cómo puedo ayudarle con sus objetivos comerciales hoy?' : 'How can I help your business today?';
  
  // Localized placeholder
  const placeholderText = isEs
    ? 'Pregunte sobre IA, contratación, automatización o transformación digital...'
    : 'Ask anything about AI, hiring, automation or digital transformation...';

  if (!mounted) return null;

  return createPortal(
    <div className={`fixed z-[999999] pointer-events-none flex flex-col items-end justify-end ${
      windowState === 'open' 
        ? 'bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto' 
        : 'bottom-5 right-5 sm:bottom-6 sm:right-6'
    }`}>
      
      {/* 1. Chat Widget Window */}
      <AnimatePresence>
        {windowState === 'open' && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-label="AI Consultant Chat Window"
            className="w-full sm:w-[380px] lg:w-[400px] xl:w-[420px] xl:max-w-[450px] xl:min-w-[390px] h-[min(80vh,calc(100vh-20px))] sm:h-[min(75vh,calc(100vh-40px))] lg:h-[min(620px,calc(100vh-48px))] xl:h-[min(650px,calc(100vh-48px))] bg-slate-900/90 dark:bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 dark:border-slate-800 rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col pointer-events-auto mb-0"
          >
            {/* Header bar (shrink-0 prevents squash) */}
            <div className="h-[76px] px-5 border-b border-white/5 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900/50 to-slate-950/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F4C81] to-[#3b82f6] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  {/* Status Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-black text-white tracking-wider uppercase leading-none">{t('title')}</h3>
                  <p className="text-[9px] text-slate-400 font-extrabold tracking-widest mt-1 leading-none uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {locale === 'es' ? 'Consejero de IA En Línea' : 'AI Advisor Online'}
                  </p>
                </div>
              </div>
              
              {/* Header Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setWindowState('minimized')}
                  title={t('actions.minimize')}
                  aria-label="Minimize AI Consultant"
                  className="w-8 h-8 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer outline-none flex items-center justify-center shrink-0"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setWindowState('closed')}
                  title={t('actions.close')}
                  aria-label="Close AI Consultant"
                  className="w-8 h-8 bg-white/5 hover:bg-rose-950/60 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer outline-none flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content or Forms */}
            {activeFlow === 'chat' ? (
              isChatEmpty ? (
                /* Empty state: welcome & suggested queries */
                <div className="flex-1 flex flex-col justify-center items-center p-5 bg-transparent min-h-0 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center max-w-[90%] text-center my-auto py-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0F4C81] to-[#3b82f6] flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-4 animate-pulse">
                      <Bot className="w-7 h-7" />
                    </div>
                    {messages.length > 0 && (
                      <div className="bg-white/5 border border-white/10 dark:bg-slate-900/50 dark:border-slate-850 p-5 rounded-3xl rounded-tl-none text-xs leading-relaxed text-slate-200 text-left shadow-lg max-w-[95%]">
                        <div className="space-y-2">
                          <p className="font-extrabold text-sm text-white flex items-center gap-1.5">{greetingText}</p>
                          <p className="text-slate-350 font-semibold">{introText}</p>
                          <p className="text-blue-400 font-bold pt-2 border-t border-white/5 mt-2">{questionText}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Suggested Queries */}
                    {showChips && suggestedPrompts.length > 0 && (
                      <div className="flex flex-col gap-3 mt-8 items-center w-full animate-fadeIn">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                          {t('suggestedTitle')}
                        </span>
                        <div className="flex flex-wrap gap-2 justify-center max-w-full">
                          {suggestedPrompts.slice(0, 8).map((prompt, idx) => (
                            <button
                              key={idx}
                              onClick={() => routeSuggestedPrompt(prompt)}
                              disabled={isSending || isTyping}
                              className="px-3.5 py-2 bg-white/5 hover:bg-[#0F4C81] hover:border-[#0F4C81] text-slate-200 rounded-2xl text-[11px] font-bold border border-white/10 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                            >
                              {getCompactChipLabel(prompt, locale)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              ) : (
                /* Active chat state: scrollable messages list */
                <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col custom-scrollbar bg-transparent min-h-0">
                  <div className="flex-grow min-h-[0px]" />
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3.5 max-w-[85%] ${
                        msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-slate-800 text-slate-300' 
                            : 'bg-gradient-to-tr from-[#0F4C81] to-[#3b82f6] text-white'
                        }`}
                      >
                        {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <div
                          className={`px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap font-semibold ${
                            msg.sender === 'user'
                              ? 'bg-[#0F4C81] text-white rounded-tr-none shadow-md'
                              : 'bg-white/5 border border-white/10 dark:bg-slate-900/50 dark:border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-[8px] text-slate-500 font-extrabold uppercase mt-1 px-1 tracking-wider">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 self-start items-center">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#3b82f6] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Bot className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                      <div className="bg-white/5 border border-white/10 dark:bg-slate-900/50 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="pb-4" />
                </div>
              )
            ) : (
              /* Non-chat active flows: forms & success screens (scrollable) */
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col custom-scrollbar bg-slate-900/40 min-h-0">
                {activeFlow === 'lead_form' && (
                  <motion.form
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleLeadSubmit}
                    className="space-y-4 text-left p-4 bg-slate-850/80 border border-slate-800 rounded-2xl animate-fadeIn"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('leadQualification.title')}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveFlow('chat')}
                        className="text-[10px] text-slate-500 hover:text-slate-350 font-bold flex items-center gap-1 cursor-pointer py-1 px-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        {t('actions.back')}
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                      {t('leadQualification.subtitle')}
                    </p>

                    {formError && (
                      <div className="p-2.5 bg-red-950/50 border border-red-800 rounded-xl text-[10px] font-bold text-red-400">
                        {formError}
                      </div>
                    )}

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.name')}</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.email')}</label>
                          <input
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.phone')}</label>
                          <input
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.company')}</label>
                          <input
                            type="text"
                            required
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.industry')}</label>
                          <select
                            value={formIndustry}
                            onChange={(e) => setFormIndustry(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] cursor-pointer outline-none"
                          >
                            <option value="technology">{t('industries.technology')}</option>
                            <option value="enterprise">{t('industries.enterprise')}</option>
                            <option value="healthcare">{t('industries.healthcare')}</option>
                            <option value="finance">{t('industries.finance')}</option>
                            <option value="retail">{t('industries.retail')}</option>
                            <option value="other">{t('industries.other')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.budget')}</label>
                          <select
                            value={formBudget}
                            onChange={(e) => setFormBudget(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] cursor-pointer outline-none"
                          >
                            <option value="under5k">{t('budgets.under5k')}</option>
                            <option value="between5k10k">{t('budgets.between5k10k')}</option>
                            <option value="between10k25k">{t('budgets.between10k25k')}</option>
                            <option value="between25k50k">{t('budgets.between25k50k')}</option>
                            <option value="over50k">{t('budgets.over50k')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.timeline')}</label>
                          <select
                            value={formTimeline}
                            onChange={(e) => setFormTimeline(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] cursor-pointer outline-none"
                          >
                            <option value="immediate">{t('timelines.immediate')}</option>
                            <option value="medium">{t('timelines.medium')}</option>
                            <option value="long">{t('timelines.long')}</option>
                            <option value="norush">{t('timelines.norush')}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.message')}</label>
                        <textarea
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isFormSubmitting}
                      className="w-full h-11 bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] hover:from-[#0d3f6b] hover:to-[#22aae6] hover:-translate-y-0.5 active:translate-y-0 transition-all text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    >
                      {isFormSubmitting ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
                      <span>{t('leadQualification.submit')}</span>
                    </button>
                  </motion.form>
                )}
                {activeFlow === 'consultation_form' && (
                  <motion.form
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleConsultationSubmit}
                    className="space-y-4 text-left p-4 bg-slate-850/80 border border-slate-800 rounded-2xl animate-fadeIn"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t('consultationFlow.title')}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveFlow('chat')}
                        className="text-[10px] text-slate-500 hover:text-slate-350 font-bold flex items-center gap-1 cursor-pointer py-1 px-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        {t('actions.back')}
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                      {t('consultationFlow.subtitle')}
                    </p>

                    {formError && (
                      <div className="p-2.5 bg-red-950/50 border border-red-800 rounded-xl text-[10px] font-bold text-red-400">
                        {formError}
                      </div>
                    )}

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.name')}</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.email')}</label>
                          <input
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.phone')}</label>
                          <input
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.company')}</label>
                          <input
                            type="text"
                            required
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('consultationFlow.date')}</label>
                          <input
                            type="text"
                            placeholder="e.g. Next Monday 10am EST"
                            required
                            value={formDate}
                            onChange={(e) => setFormDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.message')}</label>
                        <textarea
                          required
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          rows={3}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isFormSubmitting}
                      className="w-full h-11 bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] hover:from-[#0d3f6b] hover:to-[#22aae6] hover:-translate-y-0.5 active:translate-y-0 transition-all text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    >
                      {isFormSubmitting ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Calendar className="w-4.5 h-4.5" />}
                      <span>{t('consultationFlow.submit')}</span>
                    </button>
                  </motion.form>
                )}
                {(activeFlow === 'lead_success' || activeFlow === 'consultation_success') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-850/40 border border-slate-800/80 p-5 rounded-2xl text-center space-y-4 flex-1 flex flex-col justify-center max-w-[90%] mx-auto my-auto"
                  >
                    <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl shadow-lg shadow-emerald-500/10">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                        {activeFlow === 'lead_success' ? t('leadQualification.successTitle') : t('consultationFlow.successTitle')}
                      </h3>
                      <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                        {isEs 
                          ? '¡Gracias! Nuestro consultor se pondrá en contacto con usted en breve.' 
                          : 'Thank you! Our consultant will contact you shortly.'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 w-full max-w-xs mx-auto">
                      <button
                        onClick={handleStartOver}
                        className="w-full h-10 bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] hover:from-[#0d3f6b] hover:to-[#22aae6] hover:-translate-y-0.5 active:translate-y-0 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-500/10 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                      >
                        {isEs ? 'Iniciar nueva conversación' : 'Start New Conversation'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setWindowState('minimized');
                          window.location.href = '/' + locale;
                        }}
                        className="w-full h-10 border border-slate-700 hover:bg-slate-800/60 text-slate-400 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer outline-none"
                      >
                        {isEs ? 'Volver al inicio' : 'Back to Home'}
                      </button>

                      {activeFlow !== 'consultation_success' && (
                        <button
                          onClick={() => setActiveFlow('consultation_form')}
                          className="w-full h-10 border border-slate-700 bg-slate-900/30 hover:bg-slate-800/60 text-blue-400 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer outline-none"
                        >
                          {isEs ? 'Reservar consulta' : 'Book Consultation'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Suggested Queries Container (placed outside scrollable message area for active chat) */}
            <AnimatePresence>
              {activeFlow === 'chat' && !isChatEmpty && showChips && suggestedPrompts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 mt-4 mb-4 flex flex-col gap-2.5 bg-transparent border-t border-white/5 shrink-0 animate-fadeIn pt-4"
                >
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-left block px-1">
                    {t('suggestedTitle')}
                  </span>
                  <div className="flex flex-wrap gap-2 items-start justify-start">
                    {suggestedPrompts.slice(0, 8).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => routeSuggestedPrompt(prompt)}
                        disabled={isSending || isTyping}
                        className="px-3.5 py-2.5 bg-white/5 hover:bg-[#0F4C81] active:bg-[#0d3f6b] text-slate-200 hover:text-white rounded-2xl text-[11px] font-bold border border-white/10 cursor-pointer max-w-full truncate outline-none transition-all duration-300 min-h-[44px] flex items-center justify-center"
                      >
                        {getCompactChipLabel(prompt, locale)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sticky Input Bar (shrink-0, sticky, always visible at bottom) */}
            {activeFlow === 'chat' && (
              <div className="h-[74px] border-t border-white/5 bg-[#07090e]/90 flex items-center px-4 shrink-0 w-full relative">
                <div className="relative flex items-center w-full h-[56px] bg-slate-900/60 border border-white/10 rounded-full pl-5 pr-1.5 focus-within:border-[#0F4C81] focus-within:ring-2 focus-within:ring-[#0F4C81]/30 transition-all">
                  <input
                    type="text"
                    placeholder={placeholderText}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputValue.trim()) handleUserSubmit(inputValue);
                    }}
                    disabled={isSending || isTyping}
                    aria-label="Chat input message"
                    className="flex-1 bg-transparent text-xs text-white placeholder-slate-550 focus:outline-none py-1.5 outline-none font-semibold"
                  />
                  <button
                    onClick={() => handleUserSubmit(inputValue)}
                    disabled={!inputValue.trim() || isSending || isTyping}
                    aria-label="Send Message"
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0F4C81] to-[#3b82f6] disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 hover:from-[#0d3f6b] hover:to-[#22aae6] text-white flex items-center justify-center shadow-lg shadow-blue-500/10 cursor-pointer transition-all shrink-0 hover:scale-105 active:scale-95 border-none"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Launcher Button (Visible in Closed or Minimized state) */}
      <AnimatePresence>
        {(windowState === 'closed' || windowState === 'minimized') && !isMobileMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWindowState('open')}
            title={t('tooltip')}
            aria-label="Open AI Consultant"
            aria-haspopup="dialog"
            className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-[#0F4C81] to-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/25 pointer-events-auto cursor-pointer hover:shadow-blue-500/35 transition-all relative group border-none outline-none"
          >
            <Bot className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            
            {/* Outer glowing pulsing rings */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0, 0.35]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-1.5 rounded-[28px] border border-blue-500/30 pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.45, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
                ease: "easeInOut"
              }}
              className="absolute -inset-3 rounded-[32px] border border-blue-500/15 pointer-events-none"
            />

            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>,
    document.body
  );
}
