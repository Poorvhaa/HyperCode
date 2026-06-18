'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Database,
  Briefcase,
  TrendingUp,
  Cpu,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { db } from '@/lib/db';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  quickActions?: string[];
  followUps?: string[];
}

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['business intelligence', 'bi', 'power bi', 'tableau', 'reporting', 'dashboard'],
    answer: "Business Intelligence combines reporting, dashboards, analytics, and visualization tools to help organizations make data-driven decisions. HyperCode helps enterprises implement BI solutions using technologies such as Power BI, Tableau, and modern data platforms."
  },
  {
    keywords: ['analytics', 'data analytics', 'predictive', 'machine learning', 'ml', 'statistics'],
    answer: "Data Analytics involves cleaning, transforming, and modeling data to discover useful information and support decision-making. HyperCode specializes in advanced statistical analysis, machine learning integration, and predictive modeling."
  },
  {
    keywords: ['warehouse', 'data warehousing', 'data lake', 'snowflake', 'bigquery', 'redshift', 'synapse'],
    answer: "Data Warehousing integrates data from multiple sources into a central cloud repository. HyperCode builds scalable cloud data lakes and warehouses using Snowflake, Google BigQuery, Amazon Redshift, and Microsoft Azure Synapse."
  },
  {
    keywords: ['engineering', 'data engineering', 'etl', 'elt', 'pipelines', 'airflow', 'dbt', 'fivetran'],
    answer: "Data Engineering involves constructing robust pipelines to ingest and transform data. HyperCode designs reliable ETL/ELT pipelines using tools like Apache Airflow, dbt, Fivetran, and Kafka to support real-time data streaming."
  },
  {
    keywords: ['web development', 'web dev', 'next.js', 'react', 'typescript', 'frontend', 'backend', 'full stack', 'custom application', 'api integration'],
    answer: "Web Development is a core service at HyperCode. We design and build modern, scalable, secure, and high-performance custom web applications using React, Next.js, TypeScript, Node.js, and cloud platforms like AWS and Azure."
  },
  {
    keywords: ['big data', 'spark', 'hadoop', 'kafka', 'flink'],
    answer: "Big Data solutions handle high-volume, high-velocity data. HyperCode implements distributed computing architectures using Hadoop, Apache Spark, and Kafka to process streaming analytics at massive scale."
  },
  {
    keywords: ['staffing', 'hire', 'augment', 'recruitment', 'contract', 'placement', 'staff augmentation'],
    answer: "HyperCode offers flexible IT Staffing solutions, including staff augmentation (scaling existing teams), contract staffing (project-based resources), direct placement (permanent recruitment), and contract-to-hire arrangements."
  },
  {
    keywords: ['about', 'hypercode', 'who is', 'company', 'consulting'],
    answer: "HyperCode is a premier strategic technology consulting and IT staffing firm focused on Business Intelligence, Data Analytics, and Cloud Engineering. We serve commercial enterprises and government agencies across the US."
  },
  {
    keywords: ['location', 'headquarter', 'illinois', 'chicago', 'schaumburg'],
    answer: "HyperCode is headquartered in Schaumburg, Illinois, serving clients and deploying expert technical consultants nationwide."
  },
  {
    keywords: ['price', 'cost', 'rates', 'pricing'],
    answer: "Our consulting and staffing rates depend on project scope, technology stack, and required expertise. We offer free initial consultations to provide custom proposals. Click 'Schedule Consultation' or ask me to schedule one!"
  }
];

export function AIAssistant() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Conversational Flow State
  const [activeFlow, setActiveFlow] = useState<'none' | 'lead_qualification' | 'consultation' | 'staffing'>('none');
  const [flowStep, setFlowStep] = useState(0);
  const [flowData, setFlowData] = useState<any>({});
  
  const [conversationId, setConversationId] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Session
  useEffect(() => {
    setMounted(true);
    const initSession = async () => {
      try {
        let sessionId = localStorage.getItem('hypercode_ai_session_id');
        if (!sessionId) {
          sessionId = 'sess_' + Math.random().toString(36).substring(2, 11);
          localStorage.setItem('hypercode_ai_session_id', sessionId);
        }

        const conv = await db.getConversation(sessionId);
        setConversationId(conv.id);

        // Load History
        const allMsgs = await db.getAllMessages();
        const history = allMsgs.filter(m => m.conversation_id === conv.id);

        if (history.length > 0) {
          setMessages(history.map(m => ({
            id: m.id,
            sender: m.sender,
            message: m.message
          })));
        } else {
          // Welcome Message
          setMessages([
            {
              id: 'welcome',
              sender: 'assistant',
              message: "Hello 👋\n\nI'm HyperCode AI.\n\nI can help you learn about our Web Development, Business Intelligence, Data Analytics, Data Engineering, and IT Staffing services.\n\nHow can I assist you today?",
              quickActions: [
                '🌐 Web Development',
                '📊 Business Intelligence',
                '📈 Data Analytics',
                '🏢 IT Staffing',
                '☁ Data Engineering',
                '📅 Schedule Consultation',
                '💬 Talk to a Consultant'
              ]
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to initialize AI assistant database session:', err);
      }
    };

    initSession();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const addMessage = async (sender: 'user' | 'assistant', text: string, quickActions?: string[], followUps?: string[]) => {
    const tempId = Math.random().toString(36).substring(2, 9);
    setMessages(prev => [...prev, { id: tempId, sender, message: text, quickActions, followUps }]);
    
    if (conversationId) {
      try {
        await db.saveMessage(conversationId, sender, text);
      } catch (err) {
        console.error('Failed to save message in database:', err);
      }
    }
  };

  const handleFAQ = (query: string): { found: boolean; reply: string; followUps?: string[] } => {
    const q = query.toLowerCase();
    
    // Look up FAQ
    for (const faq of FAQ_KNOWLEDGE_BASE) {
      if (faq.keywords.some(keyword => q.includes(keyword))) {
        return {
          found: true,
          reply: faq.answer,
          followUps: ['🌐 Web Development', '📊 Business Intelligence', '🏢 IT Staffing', '📅 Schedule Consultation']
        };
      }
    }

    return {
      found: false,
      reply: "I want to make sure you get the most accurate information. Would you like to connect directly with one of our senior consultants?"
    };
  };

  // Process User Input
  const processUserInput = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    await addMessage('user', text);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      setIsTyping(false);

      // 1. LEAD QUALIFICATION FLOW
      if (activeFlow === 'lead_qualification') {
        const step = flowStep;
        const data = { ...flowData };

        if (step === 0) {
          // Organization type
          data.companyType = text;
          setFlowData(data);
          setFlowStep(1);
          await addMessage('assistant', "Which service are you most interested in?", [
            '🌐 Web Development',
            '📊 Business Intelligence',
            '📈 Data Analytics',
            '☁ Data Engineering',
            '🏢 IT Staffing',
            '🤝 Technology Consulting'
          ]);
        } else if (step === 1) {
          // Service interest
          data.serviceInterest = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', "What specific data or consulting challenge are you trying to solve? (e.g. slow Power BI dashboards, data pipeline latency, database administration bottleneck)");
        } else if (step === 2) {
          // Challenge
          data.challenge = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', "How soon do you need assistance with this project?", [
            'Immediately',
            'Within 30 days',
            '1–3 months',
            'Just exploring'
          ]);
        } else if (step === 3) {
          // Timeline - Complete Flow
          data.timeline = text;
          
          // Calculate Lead Score
          let score = 0;
          if (data.companyType === 'Enterprise' || data.companyType === 'Government') score += 3;
          else score += 1;

          if (data.timeline === 'Immediately') score += 3;
          else if (data.timeline === 'Within 30 days') score += 2;
          else if (data.timeline === '1–3 months') score += 1;

          try {
            await db.saveQualifiedLead(conversationId, data.companyType, data.serviceInterest, data.challenge, data.timeline, score);
          } catch (err) {
            console.error('Failed to save qualified lead:', err);
          }

          setActiveFlow('none');
          setFlowStep(0);
          setFlowData({});

          await addMessage(
            'assistant',
            `Thank you! I've qualified your inquiry (Routing Priority Score: ${score}/6) and notified our executive consultant team. Would you like to schedule a formal consultation now?`,
            ['📅 Schedule Consultation', '💬 Talk to a Consultant', '❌ No thanks']
          );
        }
        return;
      }

      // 2. CONSULTATION BOOKING FLOW
      if (activeFlow === 'consultation') {
        const step = flowStep;
        const data = { ...flowData };

        if (step === 0) {
          data.name = text;
          setFlowData(data);
          setFlowStep(1);
          await addMessage('assistant', "Thank you. What company do you represent?");
        } else if (step === 1) {
          data.company = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', "What is your professional email address?");
        } else if (step === 2) {
          data.email = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', "What is your phone number?");
        } else if (step === 3) {
          data.phone = text;
          setFlowData(data);
          setFlowStep(4);
          await addMessage('assistant', "Which service area do you need help with?", [
            'Web Development',
            'Business Intelligence',
            'Data Analytics',
            'Data Engineering',
            'IT Staffing',
            'Technology Consulting'
          ]);
        } else if (step === 4) {
          data.serviceNeeded = text;
          setFlowData(data);
          setFlowStep(5);
          await addMessage('assistant', "Please describe your project or requirements briefly.");
        } else if (step === 5) {
          data.projectDescription = text;

          try {
            await db.saveConsultationRequest(data.name, data.company, data.email, data.phone, data.serviceNeeded, data.projectDescription);
          } catch (err) {
            console.error('Failed to save consultation request:', err);
          }

          setActiveFlow('none');
          setFlowStep(0);
          setFlowData({});

          await addMessage('assistant', "Excellent! Your consultation request has been logged. A HyperCode advisor will reach out to you within 24 business hours to confirm the calendar slot. Thank you!");
        }
        return;
      }

      // 3. IT STAFFING FLOW
      if (activeFlow === 'staffing') {
        const step = flowStep;
        const data = { ...flowData };

        if (step === 0) {
          data.roles = text;
          setFlowData(data);
          setFlowStep(1);
          await addMessage('assistant', "What is your target hiring timeline?", [
            'Immediately',
            'Within 30 days',
            '1–2 months',
            'Just exploring'
          ]);
        } else if (step === 1) {
          data.timeline = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', "What is the size of the team or resources needed?", [
            '1 position',
            '2-5 positions',
            '5+ positions'
          ]);
        } else if (step === 2) {
          data.teamSize = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', "What is the location preference?", [
            'Remote',
            'Hybrid',
            'Onsite'
          ]);
        } else if (step === 3) {
          data.location = text;
          setFlowData(data);
          setFlowStep(4);
          await addMessage('assistant', "Understood. Please provide your contact details to log this request. What is your full name?");
        } else if (step === 4) {
          data.name = text;
          setFlowData(data);
          setFlowStep(5);
          await addMessage('assistant', "What is your company's name?");
        } else if (step === 5) {
          data.company = text;
          setFlowData(data);
          setFlowStep(6);
          await addMessage('assistant', "What is your professional email address?");
        } else if (step === 6) {
          data.email = text;
          setFlowData(data);
          setFlowStep(7);
          await addMessage('assistant', "What is your phone number?");
        } else if (step === 7) {
          data.phone = text;

          try {
            await db.saveStaffingRequest(
              data.name,
              data.company,
              data.email,
              data.phone,
              data.roles,
              data.timeline,
              data.teamSize,
              data.location
            );
          } catch (err) {
            console.error('Failed to save staffing request:', err);
          }

          setActiveFlow('none');
          setFlowStep(0);
          setFlowData({});

          await addMessage('assistant', "Thank you! Your staffing request has been registered in our database. Our technical recruiters will search our expert talent network and reach out within 24 hours with matching profiles.");
        }
        return;
      }

      // 4. DEFAULT CONVERSATION STATE
      const query = text.toLowerCase();

      // Check for quick triggers
      if (query.includes('business intelligence') || query === '📊 business intelligence') {
        await addMessage(
          'assistant',
          "Business Intelligence combines reporting, dashboards, analytics, and visualization tools to help organizations make data-driven decisions. HyperCode helps enterprises implement BI solutions using technologies such as Power BI, Tableau, and modern data platforms.",
          ['📈 Data Analytics', '📅 Schedule Consultation', '💬 Talk to a Consultant']
        );
      } else if (query.includes('data analytics') || query === '📈 data analytics') {
        await addMessage(
          'assistant',
          "Data Analytics involves cleaning, transforming, and modeling data to discover useful information and support decision-making. HyperCode specializes in advanced statistical analysis, machine learning integration, and predictive modeling.",
          ['📊 Business Intelligence', '📅 Schedule Consultation', '☁ Data Engineering']
        );
      } else if (query.includes('it staffing') || query === '🏢 it staffing') {
        setActiveFlow('staffing');
        setFlowStep(0);
        await addMessage('assistant', "Let's capture your staffing requirements. Which roles are you hiring for?", [
          'Data Engineer',
          'BI Developer',
          'Data Analyst',
          'Business Analyst',
          'Project Manager',
          'Scrum Master',
          'Full Stack Developer',
          'DBA'
        ]);
      } else if (query.includes('data engineering') || query === '☁ data engineering') {
        await addMessage(
          'assistant',
          "Data Engineering involves constructing robust pipelines to ingest and transform data. HyperCode designs reliable ETL/ELT pipelines using tools like Apache Airflow, dbt, Fivetran, and Kafka to support real-time data streaming.",
          ['📅 Schedule Consultation', '📊 Business Intelligence']
        );
      } else if (query.includes('web development') || query === '🌐 web development') {
        await addMessage(
          'assistant',
          "Web Development is a core service at HyperCode. We design and build modern, scalable, secure, and high-performance custom web applications using React, Next.js, TypeScript, Node.js, and cloud platforms like AWS and Azure.",
          ['📅 Schedule Consultation', '📊 Business Intelligence']
        );
      } else if (query.includes('schedule consultation') || query === '📅 schedule consultation' || query.includes('book')) {
        setActiveFlow('consultation');
        setFlowStep(0);
        await addMessage('assistant', "Let's get your consultation scheduled. What is your full name?");
      } else if (query.includes('talk to a consultant') || query === '💬 talk to a consultant' || query.includes('advisor')) {
        setActiveFlow('lead_qualification');
        setFlowStep(0);
        await addMessage('assistant', "What type of organization do you represent?", [
          'Startup',
          'SMB',
          'Enterprise',
          'Government'
        ]);
      } else if (query === '❌ no thanks') {
        await addMessage('assistant', "Alright! Let me know if you need help with any other Business Intelligence or IT staffing topics.");
      } else {
        // Run FAQ matcher
        const faqResult = handleFAQ(text);
        if (faqResult.found) {
          await addMessage('assistant', faqResult.reply, faqResult.followUps);
        } else {
          // Low confidence escalation
          await addMessage(
            'assistant',
            "I want to make sure you get the most accurate information. Would you like to speak directly with a HyperCode advisor?",
            ['📅 Schedule Consultation', '💬 Talk to a Consultant', '❌ No thanks']
          );
        }
      }
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    processUserInput(action);
  };

  const cancelFlow = () => {
    setActiveFlow('none');
    setFlowStep(0);
    setFlowData({});
    addMessage('assistant', "Intake process cancelled. How else can I assist you?", [
      '🌐 Web Development',
      '📊 Business Intelligence',
      '📈 Data Analytics',
      '🏢 IT Staffing',
      '☁ Data Engineering',
      '📅 Schedule Consultation'
    ]);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-xl cursor-pointer relative z-50 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="animate-pulse" />}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed bottom-24 right-0 sm:right-6 w-full sm:w-[420px] h-[calc(100vh-120px)] sm:h-[580px] bg-slate-950/90 border border-white/10 dark:border-white/5 backdrop-blur-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <Sparkles size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide leading-none">HyperCode AI</h3>
                  <span className="text-[9px] text-slate-400 tracking-wider mt-1 block uppercase">BI & Staffing Consultant</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-bold text-emerald-400">ONLINE</span>
                </div>
                {activeFlow !== 'none' && (
                  <button
                    onClick={cancelFlow}
                    className="text-[9px] font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
              {messages.map((msg, i) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Sender name label */}
                  <span className="text-[9px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">
                    {msg.sender === 'user' ? 'You' : 'HyperCode Consultant'}
                  </span>
                  
                  {/* Message bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.message}
                  </div>

                  {/* Quick Action Buttons */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 max-w-[95%]">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="text-xs bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-primary transition-all py-2 px-3 rounded-lg flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">
                    HyperCode Consultant
                  </span>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  processUserInput(inputValue);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    activeFlow === 'lead_qualification'
                      ? "Choose option or type message..."
                      : activeFlow === 'consultation'
                      ? "Type details..."
                      : "Ask about BI, Analytics, Staffing..."
                  }
                  className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="h-[44px] w-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-[8px] text-slate-500 mt-2 text-center tracking-wider uppercase font-semibold">
                🔒 Secured Cloud Platform
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
