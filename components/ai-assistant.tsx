'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
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

// Localized FAQ database to match keywords and return responses in the active locale
const getFAQKnowledgeBase = (locale: string) => {
  const faqMap: Record<string, Array<{ keywords: string[]; answer: string }>> = {
    en: [
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
    ],
    es: [
      {
        keywords: ['inteligencia de negocios', 'bi', 'power bi', 'tableau', 'informes', 'paneles', 'dashboards'],
        answer: "La Inteligencia de Negocios combina informes, paneles, analítica y herramientas de visualización. HyperCode ayuda a las empresas a implementar soluciones de BI utilizando Power BI, Tableau y plataformas modernas de datos."
      },
      {
        keywords: ['analisis', 'analitica de datos', 'predictivo', 'machine learning', 'aprendizaje automatico', 'estadistica'],
        answer: "El Análisis de Datos implica limpiar, transformar y modelar datos. HyperCode se especializa en análisis estadístico avanzado, integración de aprendizaje automático y modelado predictivo."
      },
      {
        keywords: ['almacenamiento', 'data warehouse', 'lago de datos', 'snowflake', 'bigquery', 'redshift'],
        answer: "El Almacenamiento de Datos integra datos de múltiples fuentes en un repositorio en la nube. HyperCode crea lagos y almacenes de datos escalables utilizando Snowflake, Google BigQuery y AWS."
      },
      {
        keywords: ['ingenieria de datos', 'etl', 'elt', 'canalizaciones', 'pipelines', 'airflow', 'dbt'],
        answer: "La Ingeniería de Datos implica construir canalizaciones para ingerir y transformar datos. Diseñamos pipelines ETL/ELT confiables utilizando Airflow, dbt y Kafka."
      },
      {
        keywords: ['desarrollo web', 'web dev', 'next.js', 'react', 'typescript', 'frontend', 'backend', 'aplicacion personalizada'],
        answer: "El Desarrollo Web es un servicio principal de HyperCode. Diseñamos y construimos aplicaciones web personalizadas, escalables y seguras utilizando React, Next.js, TypeScript y Node.js."
      },
      {
        keywords: ['personal', 'contratar', 'reclutamiento', 'aumento de personal', 'staff augmentation'],
        answer: "HyperCode ofrece soluciones flexibles de personal de TI, incluyendo aumento de personal, personal por contrato y colocación directa."
      },
      {
        keywords: ['sobre', 'quienes somos', 'empresa', 'consultoria'],
        answer: "HyperCode es una firma consultora estratégica de tecnología y personal enfocada en BI, Ingeniería de Datos y Desarrollo Web en los EE. UU."
      }
    ]
  };

  // Fallback map for other languages: we map standard keywords to localized answers.
  // To keep it clean, we fetch it or fall back to English if the translation is not explicitly defined.
  // Since we want comprehensive support, we translate it dynamically based on the current locale
  // or return the mapped translations.
  const selectedFaqs = faqMap[locale] || faqMap.en;
  return selectedFaqs;
};

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
  
  const locale = useLocale();
  const t = useTranslations('Chatbot');

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
          // Welcome Message in Selected Language
          setMessages([
            {
              id: 'welcome',
              sender: 'assistant',
              message: t('welcome'),
              quickActions: [
                t('actions.web'),
                t('actions.bi'),
                t('actions.analytics'),
                t('actions.staffing'),
                t('actions.de'),
                t('actions.schedule'),
                t('actions.talk')
              ]
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to initialize AI assistant database session:', err);
      }
    };

    initSession();
  }, [locale, t]);

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
    const faqs = getFAQKnowledgeBase(locale);
    
    // Look up FAQ
    for (const faq of faqs) {
      if (faq.keywords.some(keyword => q.includes(keyword))) {
        return {
          found: true,
          reply: faq.answer,
          followUps: [t('actions.web'), t('actions.bi'), t('actions.staffing'), t('actions.schedule')]
        };
      }
    }

    return {
      found: false,
      reply: t('escalation')
    };
  };

  // Process User Input
  const processUserInput = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    await addMessage('user', text);
    setInputValue('');
    setIsTyping(true);

    // Dynamic localization terms for flows matching
    const noThanksText = t('actions.noThanks').toLowerCase();
    const webText = t('actions.web').toLowerCase();
    const biText = t('actions.bi').toLowerCase();
    const analyticsText = t('actions.analytics').toLowerCase();
    const staffingText = t('actions.staffing').toLowerCase();
    const deText = t('actions.de').toLowerCase();
    const scheduleText = t('actions.schedule').toLowerCase();
    const talkText = t('actions.talk').toLowerCase();

    // Simulate typing delay
    setTimeout(async () => {
      setIsTyping(false);

      // 1. LEAD QUALIFICATION FLOW
      if (activeFlow === 'lead_qualification') {
        const step = flowStep;
        const data = { ...flowData };

        if (step === 0) {
          data.companyType = text;
          setFlowData(data);
          setFlowStep(1);
          await addMessage('assistant', t('flows.lead.serviceInterest'), [
            t('actions.web'),
            t('actions.bi'),
            t('actions.analytics'),
            t('actions.de'),
            t('actions.staffing'),
            '🤝 Technology Consulting'
          ]);
        } else if (step === 1) {
          data.serviceInterest = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', t('flows.lead.challenge'));
        } else if (step === 2) {
          data.challenge = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', t('flows.lead.timeline'), [
            'Immediately',
            'Within 30 days',
            '1–3 months',
            'Just exploring'
          ]);
        } else if (step === 3) {
          data.timeline = text;
          
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
            t('flows.lead.success').replace('{score}', score.toString()),
            [t('actions.schedule'), t('actions.talk'), t('actions.noThanks')]
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
          await addMessage('assistant', t('flows.consultation.company'));
        } else if (step === 1) {
          data.company = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', t('flows.consultation.email'));
        } else if (step === 2) {
          data.email = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', t('flows.consultation.phone'));
        } else if (step === 3) {
          data.phone = text;
          setFlowData(data);
          setFlowStep(4);
          await addMessage('assistant', t('flows.consultation.service'), [
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
          await addMessage('assistant', t('flows.consultation.description'));
        } else if (step === 5) {
          data.projectDescription = text;

          try {
            await db.saveConsultationRequest(data.name, data.company, data.email, data.phone, data.serviceNeeded, "", "", data.projectDescription);
            
            // Auto-capture chat lead in chat_leads table
            const summary = [...messages, { id: 'temp', sender: 'user', message: text }].map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.message}`).join('\n');
            await db.saveChatLead({
              name: data.name,
              email: data.email,
              phone: data.phone,
              interest: data.serviceNeeded,
              conversation_summary: summary
            });
          } catch (err) {
            console.error('Failed to save consultation request:', err);
          }

          setActiveFlow('none');
          setFlowStep(0);
          setFlowData({});

          await addMessage('assistant', t('flows.consultation.success'));
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
          await addMessage('assistant', t('flows.staffing.timeline'), [
            'Immediately',
            'Within 30 days',
            '1–2 months',
            'Just exploring'
          ]);
        } else if (step === 1) {
          data.timeline = text;
          setFlowData(data);
          setFlowStep(2);
          await addMessage('assistant', t('flows.staffing.teamSize'), [
            '1 position',
            '2-5 positions',
            '5+ positions'
          ]);
        } else if (step === 2) {
          data.teamSize = text;
          setFlowData(data);
          setFlowStep(3);
          await addMessage('assistant', t('flows.staffing.location'), [
            'Remote',
            'Hybrid',
            'Onsite'
          ]);
        } else if (step === 3) {
          data.location = text;
          setFlowData(data);
          setFlowStep(4);
          await addMessage('assistant', t('flows.staffing.name'));
        } else if (step === 4) {
          data.name = text;
          setFlowData(data);
          setFlowStep(5);
          await addMessage('assistant', t('flows.staffing.company'));
        } else if (step === 5) {
          data.company = text;
          setFlowData(data);
          setFlowStep(6);
          await addMessage('assistant', t('flows.staffing.email'));
        } else if (step === 6) {
          data.email = text;
          setFlowData(data);
          setFlowStep(7);
          await addMessage('assistant', t('flows.staffing.phone'));
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

            // Auto-capture chat lead in chat_leads table
            const summary = [...messages, { id: 'temp', sender: 'user', message: text }].map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.message}`).join('\n');
            await db.saveChatLead({
              name: data.name,
              email: data.email,
              phone: data.phone,
              interest: 'IT Staffing: ' + data.roles,
              conversation_summary: summary
            });
          } catch (err) {
            console.error('Failed to save staffing request:', err);
          }

          setActiveFlow('none');
          setFlowStep(0);
          setFlowData({});

          await addMessage('assistant', t('flows.staffing.success'));
        }
        return;
      }

      // 4. DEFAULT CONVERSATION STATE
      const query = text.toLowerCase();

      // Check for lead intent triggers first
      if (query.includes('need bi consultant') || query.includes('need bi consulting') || query.includes('need database consultants') || query.includes('need bi developer') || query === 'i need bi consultants') {
        await addMessage(
          'assistant',
          locale === 'es'
            ? "¿Le gustaría programar una consulta técnica gratuita para hablar sobre sus necesidades de consultores en BI?"
            : "I can certainly help you with that! Would you like to schedule a free technical consultation with one of our BI solutions directors?",
          [t('actions.schedule'), t('actions.noThanks')]
        );
      } else if (query.includes('business intelligence') || query === biText) {
        const responseMap: Record<string, string> = {
          en: "Business Intelligence combines reporting, dashboards, analytics, and visualization tools to help organizations make data-driven decisions. HyperCode helps enterprises implement BI solutions using Power BI, Tableau, and modern data platforms.",
          es: "La Inteligencia de Negocios combina informes, paneles, analítica y herramientas de visualización. HyperCode ayuda a las empresas a implementar soluciones de BI utilizando Power BI, Tableau y plataformas modernas de datos.",
          fr: "La Business Intelligence combine reporting, tableaux de bord, analyses et outils de visualisation pour aider les entreprises à prendre des décisions basées sur les données.",
          de: "Business Intelligence kombiniert Berichte, Dashboards, Analysen und Visualisierungstools, um datengesteuerte Entscheidungen zu unterstützen.",
          it: "La Business Intelligence combina reportistica, dashboard, analisi e strumenti di visualizzazione per aiutare le organizzazioni a prendere decisioni basate sui dati.",
          pt: "O Business Intelligence combina relatórios, dashboards, análises e ferramentas de visualização para ajudar na tomada de decisões.",
          nl: "Business Intelligence combineert rapportages, dashboards, analyses en visualisatietools voor datagestuurde beslissingen.",
          ja: "ビジネスインテリジェンスは、レポート、ダッシュボード、分析、視覚化ツールを組み合わせて、意思決定を支援します。",
          ko: "비즈니스 인텔리전스는 보고서, 대시보드, 분석 및 시각화 도구를 결합하여 데이터 기반 의사 결정을 지원합니다.",
          zh: "商业智能将报告、仪表板、分析和可视化工具相结合，以帮助组织做出数据驱动 de 决策。",
          ar: "يجمع ذكاء الأعمال بين التقارير ولوحات المعلومات والتحليلات وأدوات التصور لمساعدة المؤسسات على اتخاذ قرارات قائمة على البيانات."
        };
        await addMessage(
          'assistant',
          responseMap[locale] || responseMap.en,
          [t('actions.analytics'), t('actions.schedule'), t('actions.talk')]
        );
      } else if (query.includes('data analytics') || query === analyticsText) {
        const responseMap: Record<string, string> = {
          en: "Data Analytics involves cleaning, transforming, and modeling data to discover useful information and support decision-making. HyperCode specializes in advanced statistical analysis, machine learning integration, and predictive modeling.",
          es: "El Análisis de Datos implica limpiar, transformar y modelar datos. HyperCode se especializa en análisis estadístico avanzado, integración de aprendizaje automático y modelado predictivo.",
          fr: "L'analyse de données implique le nettoyage, la transformation et la modélisation des données. HyperCode est spécialisé dans l'analyse statistique et l'apprentissage automatique.",
          de: "Datenanalyse umfasst das Bereinigen, Transformieren und Modellieren von Daten. HyperCode ist auf statistische Analysen und maschinelles Lernen spezialisiert.",
          it: "L'analisi dei dati comporta la pulizia, la trasformazione e la modellazione dei dati. HyperCode è specializzata in analisi statistiche e machine learning.",
          pt: "A análise de dados envolve a limpeza, transformação e modelagem de dados. A HyperCode é especializada em análise estatística e aprendizado de máquina.",
          nl: "Data-analyse omvat het opschonen, transformeren en modelleren van data. HyperCode is gespecialiseerd in statistische analyses en machine learning.",
          ja: "データ分析は、データをクレンジング、変換、モデリングして有益な情報を発見します。HyperCodeは統計分析や機械学習を専門としています。",
          ko: "데이터 분석은 데이터를 정제, 변환 및 모델링하여 유용한 정보를 검색합니다. HyperCode는 통계 분석과 머신러닝을 전문으로 합니다.",
          zh: "数据分析涉及清洗、转换和建模数据以发现有用信息。HyperCode 专注于高级统计分析和机器学习集成。",
          ar: "يتضمن تحليل البيانات تنظيف البيانات وتحويلها ونمذجتها لاكتشاف معلومات مفيدة. تتخصص هايبر كود في التحليل الإحصائي المتقدم وتكامل التعلم الآلي."
        };
        await addMessage(
          'assistant',
          responseMap[locale] || responseMap.en,
          [t('actions.bi'), t('actions.schedule'), t('actions.de')]
        );
      } else if (query.includes('it staffing') || query === staffingText) {
        setActiveFlow('staffing');
        setFlowStep(0);
        await addMessage('assistant', t('flows.staffing.roles'), [
          'Data Engineer',
          'BI Developer',
          'Data Analyst',
          'Business Analyst',
          'Project Manager',
          'Scrum Master',
          'Full Stack Developer',
          'DBA'
        ]);
      } else if (query.includes('data engineering') || query === deText) {
        const responseMap: Record<string, string> = {
          en: "Data Engineering involves constructing robust pipelines to ingest and transform data. HyperCode designs reliable ETL/ELT pipelines using tools like Apache Airflow, dbt, Fivetran, and Kafka to support real-time data streaming.",
          es: "La Ingeniería de Datos implica construir canalizaciones para ingerir y transformar datos. Diseñamos pipelines ETL/ELT confiables utilizando Airflow, dbt y Kafka.",
          fr: "L'ingénierie des données implique la construction de pipelines. Nous concevons des pipelines fiables avec Airflow, dbt et Kafka.",
          de: "Data Engineering befasst sich mit dem Bau von Datenpipelines. Wir entwickeln Pipelines mit Airflow, dbt und Kafka.",
          it: "L'ingegneria dei dati comporta la costruzione di pipeline di dati. Progettiamo pipeline affidabili con Airflow, dbt e Kafka.",
          pt: "A engenharia de dados envolve a construção de pipelines robustos. Projetamos pipelines eficientes com Airflow, dbt e Kafka.",
          nl: "Data Engineering omvat het bouwen van datastreams. Wij ontwerpen pipelines met Airflow, dbt en Kafka.",
          ja: "データエンジニアリングは、堅牢なパイプラインを構築します。Airflow、dbt、Kafkaを使用してリアルタイムストリーミングをサポートします。",
          ko: "데이터 엔지니어링은 데이터 파이프라인을 구축합니다. Airflow, dbt, Kafka를 사용해 실시간 스트리밍을 지원합니다.",
          zh: "数据工程涉及构建数据管道。我们使用 Airflow、dbt 和 Kafka 来设计可靠的管道以支持实时数据流。",
          ar: "تتضمن هندسة البيانات إنشاء مسارات قوية لاستيعاب البيانات وتحويلها. نقوم بتصميم مسارات ETL/ELT موثوقة باستخدام Airflow و dbt و Kafka."
        };
        await addMessage(
          'assistant',
          responseMap[locale] || responseMap.en,
          [t('actions.schedule'), t('actions.bi')]
        );
      } else if (query.includes('web development') || query === webText) {
        const responseMap: Record<string, string> = {
          en: "Web Development is a core service at HyperCode. We design and build modern, scalable, secure, and high-performance custom web applications using React, Next.js, TypeScript, Node.js, and cloud platforms like AWS and Azure.",
          es: "El Desarrollo Web es un servicio principal de HyperCode. Diseñamos y construimos aplicaciones web personalizadas, escalables y seguras utilizando React, Next.js, TypeScript y Node.js.",
          fr: "Le développement web est un service phare chez HyperCode. Nous créons des applications modernes en React et Next.js.",
          de: "Webentwicklung ist eine Kernkompetenz von HyperCode. Wir bauen moderne Webanwendungen mit React und Next.js.",
          it: "Lo sviluppo web è un servizio fondamentale in HyperCode. Progettiamo applicazioni moderne con React e Next.js.",
          pt: "O desenvolvimento web é o principal serviço da HyperCode. Criamos aplicações modernas com React e Next.js.",
          nl: "Webontwikkeling is een kernactiviteit van HyperCode. Wij ontwikkelen applicaties met React en Next.js.",
          ja: "Web開発はHyperCodeのコアサービスです。React、Next.js、TypeScript、Node.jsを使用して安全なWebアプリを構築します。",
          ko: "웹 개발은 HyperCode의 핵심 서비스입니다. React, Next.js, TypeScript, Node.js를 사용해 안전한 웹 앱을 구축합니다.",
          zh: "Web 开发是 HyperCode 的核心服务。我们使用 React、Next.js、TypeScript 和 Node.js 开发安全的 Web 应用。",
          ar: "تطوير الويب هو خدمة أساسية في هايبر كود. نحن نصمم ونبني تطبيقات ويب مخصصة باستخدام React و Next.js و TypeScript و Node.js."
        };
        await addMessage(
          'assistant',
          responseMap[locale] || responseMap.en,
          [t('actions.schedule'), t('actions.bi')]
        );
      } else if (query.includes('schedule consultation') || query === scheduleText || query.includes('book') || query.includes('reservar') || query.includes('reserveren') || query.includes('予約') || query.includes('예약')) {
        setActiveFlow('consultation');
        setFlowStep(0);
        await addMessage('assistant', t('flows.consultation.name'));
      } else if (query.includes('talk to a consultant') || query === talkText || query.includes('hablar con un consultor') || query.includes('conseiller') || query.includes('berater') || query.includes('consulente') || query.includes('相談')) {
        setActiveFlow('lead_qualification');
        setFlowStep(0);
        await addMessage('assistant', t('flows.lead.companyType'), [
          'Startup',
          'SMB',
          'Enterprise',
          'Government'
        ]);
      } else if (query === noThanksText) {
        await addMessage('assistant', t('noThanks'));
      } else {
        // Run FAQ matcher
        const faqResult = handleFAQ(text);
        if (faqResult.found) {
          await addMessage('assistant', faqResult.reply, faqResult.followUps);
        } else {
          // Low confidence escalation
          await addMessage(
            'assistant',
            t('escalation'),
            [t('actions.schedule'), t('actions.talk'), t('actions.noThanks')]
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
    addMessage('assistant', t('cancelFlowMsg'), [
      t('actions.web'),
      t('actions.bi'),
      t('actions.analytics'),
      t('actions.staffing'),
      t('actions.de'),
      t('actions.schedule')
    ]);
  };

  if (!mounted) return null;

  const isRtl = locale === 'ar';

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-[100] font-sans`}>
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
            className={`fixed bottom-24 ${isRtl ? 'left-0 sm:left-6' : 'right-0 sm:right-6'} w-full sm:w-[420px] h-[calc(100vh-120px)] sm:h-[580px] bg-slate-950/90 border border-white/10 dark:border-white/5 backdrop-blur-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40`}
          >
            {/* Header */}
            <div className={`bg-slate-900/80 px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-3 text-left ${isRtl ? 'flex-row-reverse space-x-reverse text-right' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <Sparkles size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide leading-none">{t('title')}</h3>
                  <span className="text-[9px] text-slate-400 tracking-wider mt-1 block uppercase">{t('online')}</span>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="flex items-center space-x-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-bold text-emerald-400">{t('online')}</span>
                </div>
                {activeFlow !== 'none' && (
                  <button
                    onClick={cancelFlow}
                    className="text-[9px] font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              {messages.map((msg, i) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Sender name label */}
                  <span className="text-[9px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">
                    {msg.sender === 'user' ? t('you') : t('consultant')}
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
                    <div className={`flex flex-wrap gap-2 mt-3 max-w-[95%] ${isRtl ? 'justify-end' : ''}`}>
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
                    {t('consultant')}
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
                className={`flex items-center space-x-2 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    activeFlow === 'lead_qualification'
                      ? t('placeholder')
                      : activeFlow === 'consultation'
                      ? t('placeholder')
                      : t('placeholder')
                  }
                  className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="h-[44px] w-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send size={16} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </form>
              <div className="text-[8px] text-slate-500 mt-2 text-center tracking-wider uppercase font-semibold">
                {t('secured')}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
