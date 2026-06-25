'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
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

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  created_at: string;
}

interface AIConsultantProps {
  outsideClickAction?: 'minimize' | 'close' | 'none';
}

export default function AIConsultant({ outsideClickAction = 'minimize' }: AIConsultantProps) {
  const t = useTranslations('AIConsultant');
  const locale = useLocale();

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
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
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

  const getDefaultPrompts = () => [
    getSafeTranslation('suggestedPrompts.0', "Tell me about your AI solutions"),
    getSafeTranslation('suggestedPrompts.1', "Help me hire talent"),
    getSafeTranslation('suggestedPrompts.2', "I need a web development team"),
    getSafeTranslation('suggestedPrompts.3', "I want a consultation")
  ];

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

  // 2. Keyboard ESC Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWindowState('closed');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    if (windowState === 'open' && sessionId && !conversationId) {
      initializeConversation(sessionId, locale);
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

  // Send Message Handler
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending || isTyping) return;
    
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

    if (!formName || !formEmail || !formPhone || !formCompany) {
      setFormError(t('errors.validation'));
      return;
    }

    if (!formEmail.includes('@') || !formEmail.includes('.')) {
      setFormError(t('errors.email'));
      return;
    }

    if (formPhone.replace(/\D/g, '').length < 7) {
      setFormError(t('errors.phone'));
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

    if (!formName || !formEmail || !formPhone || !formCompany || !formDate || !formMessage) {
      setFormError(t('errors.validation'));
      return;
    }

    if (!formEmail.includes('@') || !formEmail.includes('.')) {
      setFormError(t('errors.email'));
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

  return (
    <div className="fixed z-50 bottom-3 right-3 left-3 sm:bottom-6 sm:right-6 sm:left-auto pointer-events-none flex flex-col items-end">
      
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
            className="w-full sm:w-[420px] md:w-[500px] h-[80vh] sm:h-[650px] max-h-[80vh] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto mb-4"
          >
            {/* Header bar (shrink-0 prevents squash) */}
            <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                  <Bot className="w-5.5 h-5.5" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-white tracking-wide uppercase leading-none">{t('title')}</h3>
                  <span className="text-[10px] text-blue-400 font-bold tracking-tight">{t('subtitle')}</span>
                </div>
              </div>
              
              {/* Header Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWindowState('minimized')}
                  title={t('actions.minimize')}
                  aria-label="Minimize AI Consultant"
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-slate-900 outline-none flex items-center justify-center shrink-0"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setWindowState('closed')}
                  title={t('actions.close')}
                  aria-label="Close AI Consultant"
                  className="bg-[#0F4C81] hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded-xl transition-colors cursor-pointer focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-slate-900 outline-none z-50 flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Container (flex-1 fills available space) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col custom-scrollbar bg-slate-900/40">
              
              {/* CHAT LOG TRANSCRIPT */}
              {activeFlow === 'chat' && (
                <>
                  {/* Spacer pushes messages to bottom naturally when short, shrinks to 0 when overflowing */}
                  <div className="flex-grow min-h-[0px]" />
                  
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 max-w-[85%] ${
                        msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                          msg.sender === 'user' ? 'bg-slate-800 text-slate-300' : 'bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] text-white'
                        }`}
                      >
                        {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                            msg.sender === 'user'
                              ? 'bg-[#0F4C81] text-white rounded-tr-none shadow-md shadow-blue-500/10'
                              : 'bg-slate-800 text-slate-200 border border-slate-750 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-[8px] text-slate-500 font-bold mt-1 px-1">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Compact chips suggested prompts inline (maximum 2 rows, automatically wraps) */}
                  {showChips && suggestedPrompts.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-2 self-start w-full animate-fadeIn">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left block px-1">
                        {t('suggestedTitle')}
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-[64px] overflow-hidden py-0.5 w-full">
                        {suggestedPrompts.slice(0, 4).map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(prompt)}
                            disabled={isSending || isTyping}
                            className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 active:bg-slate-750 text-slate-300 hover:text-white rounded-full text-[11px] font-semibold transition-all border border-slate-750 cursor-pointer max-w-full truncate outline-none focus:ring-2 focus:ring-[#38BDF8]"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5 self-start items-center">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] flex items-center justify-center text-white shrink-0">
                        <Bot className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                      <div className="bg-slate-800 border border-slate-750 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* FLOW: LEAD FORM (QUALIFICATION) */}
              {activeFlow === 'lead_form' && (
                <motion.form
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleLeadSubmit}
                  className="space-y-4 text-left p-4 bg-slate-850/80 border border-slate-800 rounded-2xl"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('leadQualification.title')}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveFlow('chat')}
                      className="text-[10px] text-slate-500 hover:text-slate-350 font-bold flex items-center gap-1 cursor-pointer"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.phone')}</label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.industry')}</label>
                        <select
                          value={formIndustry}
                          onChange={(e) => setFormIndustry(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] cursor-pointer"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] cursor-pointer"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-300 focus:outline-none focus:border-[#0F4C81] cursor-pointer"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full py-2.5 bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] hover:from-[#0d3f6b] hover:to-[#22aae6] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 transition-all"
                  >
                    {isFormSubmitting ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
                    <span>{t('leadQualification.submit')}</span>
                  </button>
                </motion.form>
              )}

              {/* FLOW: CONSULTATION FORM */}
              {activeFlow === 'consultation_form' && (
                <motion.form
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleConsultationSubmit}
                  className="space-y-4 text-left p-4 bg-slate-850/80 border border-slate-800 rounded-2xl"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {t('consultationFlow.title')}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveFlow('chat')}
                      className="text-[10px] text-slate-500 hover:text-slate-350 font-bold flex items-center gap-1 cursor-pointer"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('leadQualification.phone')}</label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F4C81] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full py-2.5 bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] hover:from-[#0d3f6b] hover:to-[#22aae6] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 transition-all"
                  >
                    {isFormSubmitting ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Calendar className="w-4.5 h-4.5" />}
                    <span>{t('consultationFlow.submit')}</span>
                  </button>
                </motion.form>
              )}

              {/* FLOWS SUCCESS SCREENS */}
              {(activeFlow === 'lead_success' || activeFlow === 'consultation_success') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-850/80 border border-slate-800 p-6 rounded-3xl text-center space-y-4 flex-1 flex flex-col justify-center"
                >
                  <div className="w-14 h-14 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    {activeFlow === 'lead_success' ? t('leadQualification.successTitle') : t('consultationFlow.successTitle')}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    {activeFlow === 'lead_success' ? t('leadQualification.successDesc') : t('consultationFlow.successDesc')}
                  </p>

                  <button
                    onClick={handleStartOver}
                    className="px-5 py-2.5 border border-slate-750 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs tracking-wider uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 justify-center mx-auto"
                  >
                    {t('actions.startOver')}
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sticky Input Bar (shrink-0, sticky, always visible at bottom) */}
            {activeFlow === 'chat' && (
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2 shrink-0 sticky bottom-0 z-10 w-full">
                <input
                  type="text"
                  placeholder={t('placeholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage(inputValue);
                  }}
                  disabled={isSending || isTyping}
                  aria-label="Chat input message"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#38BDF8] transition-all placeholder-slate-500 outline-none"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isSending || isTyping}
                  aria-label="Send Message"
                  className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] disabled:from-slate-800 disabled:to-slate-800 hover:from-[#0d3f6b] hover:to-[#22aae6] text-white flex items-center justify-center shadow-md shadow-blue-500/10 cursor-pointer focus:ring-2 focus:ring-[#38BDF8] outline-none transition-all shrink-0"
                >
                  {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Launcher Button (Visible in Closed or Minimized state) */}
      <AnimatePresence>
        {(windowState === 'closed' || windowState === 'minimized') && (
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
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] text-white flex items-center justify-center shadow-xl shadow-blue-500/25 pointer-events-auto cursor-pointer hover:shadow-blue-500/35 transition-all relative group focus:ring-4 focus:ring-blue-400 outline-none"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            <span className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping pointer-events-none scale-105 duration-2000" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border-2 border-slate-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
