'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Sparkles, Cpu, Send, RefreshCw, Lock, Server, Smartphone, Brain, Database, Globe, ShoppingCart, Network, Activity, Code, User, Bot, X, CheckCircle, Cloud, ChevronRight, Eye } from 'lucide-react';

// Suggested prompt chips based on HyperCode capabilities
const suggestedPromptsList = {
  en: [
    { text: 'Build an AI Strategy', query: 'I want to build an enterprise AI strategy. How can HyperCode help us design and implement it?' },
    { text: 'Modernize Legacy Systems', query: 'What is HyperCode\'s process for modernizing legacy systems and software architectures?' },
    { text: 'Estimate Project Cost', query: 'Can you estimate the budget and timeline for a custom enterprise software project?' },
    { text: 'Recommend Tech Stack', query: 'What technology stack does HyperCode recommend for highly scalable, secure web applications?' }
  ],
  es: [
    { text: 'Construir Estrategia de IA', query: 'Quiero diseñar una estrategia de IA empresarial. ¿Cómo puede HyperCode ayudarnos a diseñarla e implementarla?' },
    { text: 'Modernizar Sistemas Heredados', query: '¿Cuál es el proceso de HyperCode para modernizar sistemas heredados y arquitecturas de software?' },
    { text: 'Estimar Costo de Proyecto', query: '¿Puede estimar el presupuesto y el plazo para un proyecto de software empresarial personalizado?' },
    { text: 'Recomendar Stack Tecnológico', query: '¿Qué stack tecnológico recomienda HyperCode para aplicaciones web altamente escalables y seguras?' }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
} as const;

const chipVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
} as const;

// Tech tags mapping for the visual workspace
const techModules = [
  { id: 'next', label: 'React & Next.js', icon: Code, keywords: ['react', 'next', 'frontend', 'website', 'portal', 'ui', 'js'] },
  { id: 'python', label: 'AI Agent Orchestrator', icon: Brain, keywords: ['python', 'agent', 'ai', 'llm', 'openai', 'automation', 'langchain'] },
  { id: 'cloud', label: 'AWS/Azure Scale', icon: Cloud, keywords: ['aws', 'cloud', 'azure', 'infrastructure', 'devops', 'kubernetes'] },
  { id: 'postgres', label: 'Postgres Database', icon: Database, keywords: ['postgres', 'database', 'sql', 'supabase', 'warehouse', 'storage'] },
  { id: 'bi', label: 'BI Dashboard', icon: Activity, keywords: ['power bi', 'tableau', 'bi', 'analytics', 'report', 'outcomes', 'dashboard'] }
];

export function AIConsultantInvitation() {
  const tAI = useTranslations('AIConsultant');
  const tSolutions = useTranslations('SolutionsPage');
  const locale = useLocale();

  const sectionRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // States
  const [activeFlow, setActiveFlow] = useState<'idle' | 'chat' | 'lead_form' | 'lead_success'>('idle');
  const [sessionId, setSessionId] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<{ id: string; sender: 'user' | 'bot' | 'system'; message: string; timestamp: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [discoveredTech, setDiscoveredTech] = useState<string[]>([]);
  const [progressVal, setProgressVal] = useState(0);

  // Lead Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formTimeline, setFormTimeline] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Track scroll entry to morph project timeline to AI Core
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24
  });

  useMotionValueEvent(smoothScroll, 'change', (latest) => {
    setProgressVal(latest);
  });

  // Scale & opacity transformations for the AI Core entry
  const entryScale = useTransform(smoothScroll, [0, 0.5], [0.5, 1.0], { clamp: true });
  const entryOpacity = useTransform(smoothScroll, [0, 0.4], [0, 1.0], { clamp: true });

  // Initialize Session
  const initAISession = async () => {
    let freshSessionId;
    if (typeof window !== 'undefined') {
      if (window.crypto && window.crypto.randomUUID) {
        freshSessionId = window.crypto.randomUUID();
      } else {
        freshSessionId = 'session_' + Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
      }
    } else {
      freshSessionId = 'session_ssr';
    }

    setSessionId(freshSessionId);

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: freshSessionId,
          language: locale
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data?.conversation?.id) {
        setConversationId(data.conversation.id);
        // Add welcome message
        setMessages([
          {
            id: 'welcome',
            sender: 'bot',
            message: tAI('welcomeMessage') || 'Hello! I am your HyperCode Technical Advisor. How can I assist you today?',
            timestamp: new Date().toISOString()
          }
        ]);
        setActiveFlow('chat');
        return true;
      }
    } catch (err) {
      console.error('[AI Consultant Init Failed]', err);
    }
    return false;
  };

  const handlePromptClick = async (query: string) => {
    setInputText(query);
    if (activeFlow !== 'chat') {
      const success = await initAISession();
      if (!success) return;
    }
    
    // Focus the input field after state is updated and DOM is updated
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }, 150);
  };

  // Scroll message thread to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Scan conversations for tech keywords to update the visual workspace
  const scanForTech = (text: string) => {
    const lower = text.toLowerCase();
    const matches: string[] = [];
    techModules.forEach(mod => {
      if (mod.keywords.some(kw => lower.includes(kw))) {
        matches.push(mod.id);
      }
    });
    if (matches.length > 0) {
      setDiscoveredTech(prev => Array.from(new Set([...prev, ...matches])));
    }
  };

  // Send message to API
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Math.random().toString(),
      sender: 'user' as const,
      message: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    scanForTech(text);

    const historyPayload = [...messages, userMsg].map(m => ({
      sender: m.sender,
      message: m.message
    }));

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          session_id: sessionId,
          sender: 'user',
          message: text,
          language: locale,
          history: historyPayload,
          timestamp: new Date().toISOString(),
          state: { leadData: {}, leadSubmitted: false }
        })
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        const botMsg = {
          id: Math.random().toString(),
          sender: 'bot' as const,
          message: data.message,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMsg]);
        scanForTech(data.message);

        // Check if backend requests lead qualification form
        if (data.flowTrigger === 'lead_form') {
          setActiveFlow('lead_form');
        }
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: 'err',
            sender: 'bot' as const,
            message: tAI('errors.generic') || 'Unable to connect to AI consultant. Please try again.',
            timestamp: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.error('[AI Message failed]', err);
    } finally {
      setIsTyping(false);
    }
  };

  // Submit lead form to DB
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Simple validation
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = tAI('errors.validationName') || 'Name is required.';
    if (!formEmail.trim() || !formEmail.includes('@')) errors.email = tAI('errors.email') || 'Enter valid email.';
    if (!formCompany.trim()) errors.company = tAI('errors.validationCompany') || 'Company is required.';
    if (!formPhone.trim()) errors.phone = tAI('errors.validationPhone') || 'Phone is required.';
    if (!formMessage.trim()) errors.message = tAI('errors.validationMessage') || 'Message is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmittingForm(true);

    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          conversation_id: conversationId,
          name: formName,
          email: formEmail,
          company: formCompany,
          phone: formPhone,
          message: formMessage,
          budget: formBudget,
          timeline: formTimeline,
          language: locale
        })
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setActiveFlow('lead_success');
      } else {
        setFormErrors({ form: data?.error || 'Failed to submit project blueprint.' });
      }
    } catch (err) {
      console.error('[Lead Submit Failed]', err);
      setFormErrors({ form: 'Network error submitting request.' });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const prompts = suggestedPromptsList[locale as 'en' | 'es'] || suggestedPromptsList.en;

  return (
    <section
      ref={sectionRef}
      id="ai-consultant"
      className="relative py-24 bg-gradient-to-br from-[#F7FAFF] to-[#F4FBF7] border-b border-slate-200 overflow-hidden bg-[radial-gradient(circle,rgba(20,91,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      {/* Blueprint Data Streams dissolving and merging */}
      {progressVal < 0.3 && (
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden pointer-events-none">
          <motion.div
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 w-96 h-full bg-gradient-to-r from-royal-blue/0 via-royal-blue/30 to-royal-blue/0"
          />
        </div>
      )}

      {/* Radial lighting glow spots */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-green/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ==========================================
              LEFT COLUMN: STORYTELLING & TRUST
              ========================================== */}
          <div className="col-span-1 lg:col-span-5 text-left z-20 flex flex-col justify-center h-full">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
                <Sparkles size={12} className="text-royal-blue animate-pulse" />
                {locale === 'es' ? 'CONSULTOR DE IA DISPONIBLE' : 'AI CONSULTANT ONLINE'}
              </span>
              <h2 className="text-h2 text-slate-900">
                {locale === 'es' ? '¿Listo para Consultar con IA?' : 'Meet Your AI Consultant'}
              </h2>
              <p className="text-body text-slate-500">
                {locale === 'es'
                  ? 'Obtenga respuestas instantáneas sobre nuestros servicios, metodologías de entrega, cotizaciones y perfiles de ingenieros. Nuestro consultor cognitivo puede ayudarle a estructurar su proyecto en tiempo real.'
                  : 'Get instant answers about our services, engagement models, delivery timelines, and technology architectures. Chat directly with our cognitive agent to map out your digital solution in seconds.'}
              </p>
            </div>

            {/* Enterprise Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 py-6 sm:py-8 my-6 border-y border-slate-150/60">
              <div className="space-y-1">
                <div className="text-h2 text-slate-900 leading-none">{tSolutions('stats.retentionNum')}</div>
                <div className="text-eyebrow text-slate-450">{tSolutions('stats.retentionLabel')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-h2 text-slate-900 leading-none">{tSolutions('stats.deploymentsNum')}</div>
                <div className="text-eyebrow text-slate-450">{tSolutions('stats.deploymentsLabel')}</div>
              </div>
            </div>

            {/* Security Compliance Badge */}
            <div className="flex items-center gap-3.5 mb-8 sm:mb-10">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/85 text-royal-blue shadow-2xs shrink-0">
                <Lock size={18} />
              </div>
              <div className="leading-tight">
                <div className="text-eyebrow text-slate-800">{tSolutions('why.securityTitle')}</div>
                <div className="text-caption text-slate-400 font-semibold mt-1">Compliant architecture engineering</div>
              </div>
            </div>

            {/* Suggested Prompts Section */}
            <div className="pt-8 border-t border-slate-150/60 space-y-4">
              <h3 className="text-h4 text-slate-800">
                {locale === 'es' ? 'Prueba preguntando...' : 'Try asking...'}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:grid lg:grid-cols-2 lg:gap-3"
              >
                {prompts.map((p, idx) => (
                  <motion.button
                    key={idx}
                    variants={chipVariants}
                    onClick={() => handlePromptClick(p.query)}
                    className="w-full sm:w-auto lg:w-full bg-white border border-slate-200/80 text-slate-700 font-medium px-5 py-3 rounded-full hover:bg-white hover:border-royal-blue/30 hover:text-slate-900 transition-all duration-350 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-[0_8px_20px_rgba(20,91,255,0.08)] cursor-pointer text-button text-center flex items-center justify-center min-h-[48px]"
                  >
                    {p.text}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ==========================================
              RIGHT COLUMN: INTERACTIVE COMMAND CONSOLE
              ========================================== */}
          <div className="col-span-1 lg:col-span-7 relative min-h-[500px] flex items-center justify-center pointer-events-auto">
            
            <AnimatePresence mode="wait">
              {/* 1. IDLE STATE: Holographic AI Core & Orbiting Prompt Chips */}
              {activeFlow === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full h-[460px] flex items-center justify-center"
                >
                  {/* Holographic AI Core */}
                  <motion.div
                    style={{
                      scale: entryScale,
                      opacity: entryOpacity
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Spinning ring 1 */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-[220px] h-[220px] border border-dashed border-royal-blue/15 rounded-full"
                    />
                    
                    {/* Spinning ring 2 (tilted counter-clockwise) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-[180px] h-[180px] border border-dashed border-green/10 rounded-full transform -rotate-45"
                    />

                    {/* Glowing Core Sphere */}
                    <div className="w-[140px] h-[140px] rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-lg flex flex-col items-center justify-center p-3 select-none bg-[radial-gradient(circle_at_center,rgba(20,91,255,0.04)_0%,transparent_75%)]">
                      <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-royal-blue/10 to-green/5 blur-sm animate-pulse" />
                      <Cpu size={28} className="text-royal-blue animate-pulse relative z-10" />
                      <span className="text-[8px] font-black text-slate-800 tracking-widest uppercase mt-2 z-10">AI COMMAND</span>
                    </div>
                  </motion.div>

                  {/* Circular Orbiting Prompt Chips */}
                  {prompts.map((p, idx) => {
                    // Position them radially around the core
                    const angle = idx * 90 - 45;
                    const rad = (angle * Math.PI) / 180;
                    const radius = 175;
                    const x = radius * Math.cos(rad);
                    const y = radius * Math.sin(rad);

                    return (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(p.query)}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className="px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:border-royal-blue/20 hover:shadow-md transition text-[9px] font-black tracking-tight uppercase text-slate-700 shadow-2xs hover:scale-105 cursor-pointer max-w-[130px] text-center"
                      >
                        {p.text}
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* 2. CHAT SESSION STATE: Glass Conversation Console & Reactive Tech Workspace */}
              {activeFlow === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="w-full h-[520px] grid grid-cols-12 gap-5 pointer-events-auto"
                >
                  {/* Chat interface panel (8 columns on Desktop, full on Mobile) */}
                  <div className="col-span-12 md:col-span-9 rounded-3xl border border-[#94a3b8]/18 bg-white/70 backdrop-blur-md p-5 shadow-soft flex flex-col justify-between h-full bg-[radial-gradient(circle,rgba(20,91,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]">
                    {/* Status header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                        <span className="text-[9px] font-black tracking-widest text-slate-800 uppercase">SYSTEM ACTIVE</span>
                      </div>
                      <div className="text-[8px] font-bold text-slate-400 font-mono">STATE: SECURE</div>
                    </div>

                    {/* Messages thread */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none max-h-[360px]">
                      {messages.map((m) => {
                        const isBot = m.sender === 'bot';
                        return (
                          <div
                            key={m.id}
                            className={`flex gap-3 max-w-[85%] text-left ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                          >
                            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs select-none ${
                              isBot ? 'bg-royal-blue/5 border-royal-blue/10 text-royal-blue' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}>
                              {isBot ? <Cpu size={13} /> : <User size={13} />}
                            </div>
                            <div className={`p-3.5 rounded-2xl border text-xs font-semibold leading-relaxed ${
                              isBot ? 'bg-white border-slate-200 text-slate-700' : 'bg-royal-blue/5 border-royal-blue/10 text-royal-blue'
                            }`}>
                              <p className="whitespace-pre-wrap">{m.message}</p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Typing indicator */}
                      {isTyping && (
                        <div className="flex gap-3 max-w-[85%] text-left mr-auto select-none">
                          <div className="w-7 h-7 rounded-lg border border-royal-blue/15 bg-royal-blue/5 text-royal-blue flex items-center justify-center shrink-0">
                            <Cpu size={13} className="animate-spin" />
                          </div>
                          <div className="p-3.5 rounded-2xl border border-slate-150 bg-white text-slate-400 text-xs font-bold flex items-center gap-1">
                            <span>{tAI('typing') || 'Analyzing parameters...'}</span>
                            <span className="flex items-center gap-0.5">
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Bottom message input */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputText);
                      }}
                      className="flex items-center gap-2 pt-3 border-t border-slate-100"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setMessages([]);
                          initAISession();
                        }}
                        className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        title={tAI('actions.startOver')}
                      >
                        <RefreshCw size={14} />
                      </button>
                      
                      <input
                        ref={chatInputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={tAI('placeholder') || 'Describe project goal...'}
                        className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-royal-blue focus:bg-white transition"
                      />

                      <button
                        type="submit"
                        disabled={!inputText.trim() || isTyping}
                        className="p-3 bg-royal-blue text-white rounded-xl hover:bg-deep-navy disabled:bg-slate-200 disabled:text-slate-450 transition cursor-pointer"
                      >
                        <Send size={14} />
                      </button>
                    </form>
                  </div>

                  {/* Reactive tech workspace (3 columns on Desktop, hidden on Mobile) */}
                  <div className="hidden md:flex col-span-3 flex-col justify-start space-y-4 h-full pl-2">
                    <div className="text-[8.5px] font-black text-slate-450 uppercase tracking-widest text-left select-none pb-2 border-b border-slate-100">
                      Solution Blueprint
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto scrollbar-none pr-1">
                      <AnimatePresence>
                        {techModules.map((mod) => {
                          const isFound = discoveredTech.includes(mod.id);
                          const ModIcon = mod.icon;

                          return (
                            <motion.div
                              key={mod.id}
                              initial={{ opacity: 0.18, scale: 0.95 }}
                              animate={{ 
                                opacity: isFound ? 1.0 : 0.2, 
                                scale: isFound ? 1.02 : 0.95,
                                borderColor: isFound ? '#145BFF' : '#E2E8F0' 
                              }}
                              className={`p-3 rounded-2xl border bg-white flex items-center gap-2.5 shadow-2xs select-none transition-colors duration-500`}
                            >
                              <div className={`p-1.5 rounded-lg border text-xs ${isFound ? 'bg-royal-blue/5 border-royal-blue/10 text-royal-blue animate-bounce' : 'bg-slate-50 border-slate-150 text-slate-400'}`}>
                                <ModIcon size={14} />
                              </div>
                              <div className="leading-none text-left">
                                <div className={`text-[9px] font-black tracking-tight ${isFound ? 'text-slate-800' : 'text-slate-400'}`}>{mod.label}</div>
                                <div className="text-[6.5px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
                                  {isFound ? 'ACTIVE' : 'STANDBY'}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. LEAD QUALIFICATION FORM STATE: Multi-Step Glass lead Form */}
              {activeFlow === 'lead_form' && (
                <motion.div
                  key="lead_form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full max-w-lg rounded-3xl border border-[#94a3b8]/18 bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-soft text-left"
                >
                  <div className="space-y-4 pb-4 border-b border-slate-100 select-none">
                    <h3 className="text-h4 text-slate-900">
                      {tAI('leadQualification.title') || 'AI Project Assessor'}
                    </h3>
                    <p className="text-body-sm text-slate-500">
                      {tAI('leadQualification.subtitle') || 'Submit requirements to generate a project scoping blueprint.'}
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-4 mt-5">
                    {formErrors.form && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">
                        {formErrors.form}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.name')}</label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        />
                        {formErrors.name && <span className="text-[9px] font-bold text-rose-500 block">{formErrors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.email')}</label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        />
                        {formErrors.email && <span className="text-[9px] font-bold text-rose-500 block">{formErrors.email}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Company */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.company')}</label>
                        <input
                          type="text"
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        />
                        {formErrors.company && <span className="text-[9px] font-bold text-rose-500 block">{formErrors.company}</span>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.phone')}</label>
                        <input
                          type="text"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        />
                        {formErrors.phone && <span className="text-[9px] font-bold text-rose-500 block">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Budget */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.budget')}</label>
                        <select
                          value={formBudget}
                          onChange={(e) => setFormBudget(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        >
                          <option value=""></option>
                          <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                          <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000+">$100,000+</option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-1">
                        <label className="text-eyebrow text-slate-450">{tAI('leadQualification.timeline')}</label>
                        <select
                          value={formTimeline}
                          onChange={(e) => setFormTimeline(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition"
                        >
                          <option value=""></option>
                          <option value="&lt; 1 Month">&lt; 1 Month</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="3 - 6 Months">3 - 6 Months</option>
                          <option value="6+ Months">6+ Months</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-eyebrow text-slate-450">{tAI('leadQualification.message')}</label>
                      <textarea
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200/80 focus:border-royal-blue focus:bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition resize-none"
                      />
                      {formErrors.message && <span className="text-[9px] font-bold text-rose-500 block">{formErrors.message}</span>}
                    </div>

                    <div className="flex justify-between gap-4 pt-4 border-t border-slate-100 mt-2 select-none">
                      <button
                        type="button"
                        onClick={() => setActiveFlow('chat')}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-bold transition cursor-pointer"
                      >
                        {tAI('actions.back') || 'Back'}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingForm}
                        className="px-6 py-2.5 bg-royal-blue text-white rounded-xl hover:bg-deep-navy text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {isSubmittingForm && (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        )}
                        <span>{tAI('leadQualification.submit') || 'Qualify Blueprint'}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* 4. SUCCESS STATE: blueprint routing acknowledgment */}
              {activeFlow === 'lead_success' && (
                <motion.div
                  key="lead_success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md rounded-3xl border border-[#94a3b8]/18 bg-white/70 p-8 shadow-soft text-center select-none"
                >
                  <div className="w-14 h-14 rounded-full bg-green/10 border border-green/20 text-green flex items-center justify-center mx-auto mb-5 shadow-2xs">
                    <CheckCircle size={26} />
                  </div>
                  <h3 className="text-h3 text-slate-900 mb-2">
                    {tAI('leadQualification.successTitle') || 'Project Qualified!'}
                  </h3>
                  <p className="text-body-sm text-slate-500 mb-6">
                    {tAI('leadQualification.successDesc') || 'A solutions director will contact you with a customized architecture blueprint.'}
                  </p>
                  <button
                    onClick={() => {
                      setFormName('');
                      setFormEmail('');
                      setFormCompany('');
                      setFormPhone('');
                      setFormMessage('');
                      setFormBudget('');
                      setFormTimeline('');
                      setMessages([]);
                      initAISession();
                    }}
                    className="w-full py-3 bg-royal-blue text-white rounded-xl hover:bg-deep-navy font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
                  >
                    {tAI('actions.startOver') || 'New Advice Session'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
