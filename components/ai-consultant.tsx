'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import {
  MessageSquare,
  X,
  Send,
  RefreshCw,
  Sparkles,
  Bot,
  User,
  Loader2,
  Calendar,
  Mail
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isCTA?: boolean;
}

export default function AIConsultant() {
  const t = useTranslations('AIConsultant');
  const locale = useLocale();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Generate fresh session ID on mount
  useEffect(() => {
    setMounted(true);
    const generateUUID = () => {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      return 'session_' + Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
    };
    setSessionId(generateUUID());
  }, []);

  // Scroll to bottom on new messages or typing state
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opening panel
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  const handleStartOver = () => {
    const freshUUID = (() => {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      return 'session_' + Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
    })();
    setSessionId(freshUUID);
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
    setErrorText(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setErrorText(null);

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      // Normalize history payload for backend call
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: text.trim(),
          language: locale,
          history: historyPayload
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || t('errors.generic'));
      }

      const assistantMessage: Message = { role: 'assistant', content: data.message };
      const nextMessages = [...updatedMessages, assistantMessage];

      // Insert inline CTA if user has completed 2 exchanges and assistant hasn't offered CTA yet
      const userExchanges = nextMessages.filter(m => m.role === 'user').length;
      const hasCTAAlready = nextMessages.some(m => m.isCTA);

      if (userExchanges >= 2 && !hasCTAAlready) {
        nextMessages.push({
          role: 'assistant',
          content: t('ctaOffer'),
          isCTA: true
        });
      }

      setMessages(nextMessages);
    } catch (err) {
      console.error('[AI Consultant Client Error]', err);
      setErrorText(t('errors.generic'));
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: t('actions.buildSoftware'), query: locale === 'es' ? 'Quiero construir un software' : 'I want to build software' },
    { label: t('actions.modernizeSystems'), query: locale === 'es' ? 'Quiero modernizar mis sistemas' : 'I want to modernize legacy systems' },
    { label: t('actions.aiAutomation'), query: locale === 'es' ? 'Quiero integrar inteligencia artificial y automatización' : 'I want AI and automation integration' },
    { label: t('actions.estimateProject'), query: locale === 'es' ? '¿Cómo puedo estimar el costo de mi proyecto?' : 'How do I estimate project scope and cost?' }
  ];

  return createPortal(
    <div className="fixed bottom-0 right-0 z-[999999] pointer-events-none">
      
      {/* 1. Compact Premium Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="HyperCode AI Consultant Chat"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[620px] sm:max-w-[calc(100vw-48px)] sm:max-h-[calc(100vh-48px)] sm:rounded-[24px] bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-all duration-300"
          style={{
            boxShadow: '0 20px 50px -12px rgba(20, 91, 255, 0.15)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#145BFF] to-[#00C9A7] flex items-center justify-center text-white shadow-md shadow-blue-500/10">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-slate-900 leading-none">{t('title')}</h2>
                <div className="text-[11px] font-semibold text-emerald-600 tracking-wide mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('status')}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close panel"
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.length === 0 ? (
              /* Welcome Greeting & Quick Actions */
              <div className="h-full flex flex-col justify-center py-6 text-center space-y-6">
                <div className="space-y-3 px-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-[#145BFF] shadow-inner">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 leading-relaxed max-w-xs mx-auto">
                    {t('welcomeMessage')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5 px-6">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(action.query)}
                      className="w-full text-left bg-white border border-slate-200 text-slate-700 hover:text-[#145BFF] hover:border-[#145BFF]/30 hover:bg-blue-50/10 font-bold px-4 py-3.5 rounded-2xl transition duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer text-xs flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30"
                    >
                      <span>{action.label}</span>
                      <Sparkles className="w-3.5 h-3.5 text-slate-350 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat Message Stream */
              <div className="space-y-4">
                {messages.map((m, idx) => {
                  const isBot = m.role === 'assistant';
                  if (m.isCTA) {
                    return (
                      <div
                        key={idx}
                        className="p-5 bg-white border border-slate-200 rounded-[20px] text-slate-800 space-y-4 shadow-sm text-left animate-fadeIn max-w-[90%] mr-auto"
                      >
                        <div className="flex items-center gap-2 pb-1 text-slate-905">
                          <Bot className="w-4 h-4 text-[#145BFF]" />
                          <span className="text-xs font-bold tracking-wide">
                            {t('title')}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                          {m.content}
                        </p>
                        <div className="flex flex-col gap-2 pt-1">
                          <a
                            href={`/${locale}/consultation`}
                            className="w-full h-11 bg-[#145BFF] hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-center"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>{t('actions.scheduleConsultation')}</span>
                          </a>
                          <a
                            href={`/${locale}/contact`}
                            className="w-full h-11 bg-white border border-slate-200 hover:bg-slate-50 text-slate-705 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-300 text-center"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{t('actions.contactHyperCode')}</span>
                          </a>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex gap-3 max-w-[85%] text-left ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-3xs select-none ${
                        isBot ? 'bg-blue-50 border-blue-100 text-[#145BFF]' : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        {isBot ? <Bot size={15} /> : <User size={15} />}
                      </div>
                      <div className={`p-3.5 rounded-[18px] border text-xs font-semibold leading-relaxed ${
                        isBot ? 'bg-white border-slate-200 text-slate-700 shadow-2xs' : 'bg-[#145BFF]/10 border-[#145BFF]/20 text-slate-800'
                      }`}>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Error Banner */}
                {errorText && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-[18px] text-xs font-bold text-left animate-fadeIn">
                    {errorText}
                  </div>
                )}

                {/* Typing state */}
                {isTyping && (
                  <div className="flex gap-3 max-w-[80%] text-left mr-auto select-none items-center">
                    <div className="w-8 h-8 rounded-full border border-blue-100 bg-blue-50 text-[#145BFF] flex items-center justify-center shrink-0 shadow-3xs">
                      <Bot size={15} className="animate-pulse" />
                    </div>
                    <div className="p-3.5 rounded-[18px] border border-slate-200 bg-white text-slate-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <span>{t('typing')}</span>
                      <span className="flex items-center gap-0.5 mt-0.5">
                        <span className="w-1 h-1 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-slate-350 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Bottom Input Bar */}
          <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0">
            <button
              onClick={handleStartOver}
              title={t('actions.resetChat')}
              aria-label="Reset chat and start fresh"
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </button>

            <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-[#145BFF] focus-within:ring-2 focus-within:ring-[#145BFF]/25 transition duration-200 h-11 px-3">
              <input
                ref={chatInputRef}
                type="text"
                placeholder={t('placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) handleSendMessage(inputValue);
                }}
                disabled={isTyping}
                aria-label="Type message text"
                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none outline-none font-semibold disabled:opacity-50"
              />
            </div>

            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="w-11 h-11 bg-[#145BFF] disabled:bg-slate-100 disabled:text-slate-400 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center cursor-pointer transition duration-200 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-1"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Launcher Button */}
      {(!isOpen) && (
        <button
          onClick={() => setIsOpen(true)}
          title={t('tooltip')}
          aria-label="Open AI Consultant"
          aria-haspopup="dialog"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-[#145BFF] to-[#00C9A7] text-white flex items-center justify-center shadow-xl shadow-blue-500/25 pointer-events-auto cursor-pointer hover:shadow-blue-500/35 transition duration-200 shrink-0 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#145BFF] border-none group"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-105 transition duration-200" />
          
          {/* Subtle outer glowing pulsing ring */}
          <div
            className="absolute -inset-1 rounded-full border border-blue-500/20 pointer-events-none animate-ping"
            style={{ animationDuration: '3s' }}
          />

          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      )}

    </div>,
    document.body
  );
}
