'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  MessageSquare,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  Eye,
  X,
  AlertCircle,
  Calendar,
  ChevronRight,
  Search,
  ArrowLeft,
  Globe,
  Award,
  Clock,
  Sparkles,
  Trash2
} from 'lucide-react';
import { supabase, db } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AIConsultantDashboard() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Data States
  const [conversations, setConversations] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [globalMessages, setGlobalMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  // UI States
  const [activeTab, setActiveTab] = useState<'analytics' | 'conversations' | 'leads' | 'consultations' | 'messages'>('analytics');
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [convoMessages, setConvoMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');

  // Verify Auth
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      if (supabase) {
        const { data: { session: curSess } } = await supabase.auth.getSession();
        setSession(curSess);
        if (curSess) {
          const profile = await db.getUserProfile(curSess.user.id);
          if (profile) {
            setUserProfile(profile);
          }
        } else {
          router.push(`/${locale}/admin/login`);
        }
      } else {
        const mockAuth = localStorage.getItem('hypercode_admin_mock_auth');
        if (mockAuth) {
          const parsed = JSON.parse(mockAuth);
          setSession({ user: { email: parsed.email } });
          setUserProfile(parsed);
        } else {
          router.push(`/${locale}/admin/login`);
        }
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, [locale, router]);

  // Load Data from Supabase
  const loadDashboardData = async () => {
    setLoading(true);
    setDbError(false);
    try {
      const [convs, lds, reqs, msgs] = await Promise.all([
        db.getAllChatConversations(),
        db.getAllChatLeads(),
        supabase ? supabase.from('consultation_requests').select('*').not('language', 'is', null).order('created_at', { ascending: false }).then(r => r.data || []) : Promise.resolve([]),
        db.getAllChatMessages()
      ]);
      setConversations(convs);
      setLeads(lds);
      setConsultations(reqs);
      setGlobalMessages(msgs);
    } catch (err) {
      console.warn('[Dashboard Warning] DB query failed, falling back to mock database mode:', err);
      setDbError(true);
      
      // Load Highly Realistic Mock Data for demo/fallback verification
      const mockConvs = [
        { id: 'c1', session_id: 'session_demo_johndoe', language: 'en', visitor_name: 'John Doe', visitor_email: 'john.doe@techcorp.com', created_at: new Date(Date.now() - 10000000).toISOString(), updated_at: new Date(Date.now() - 5000000).toISOString(), chat_messages: [{ count: 6 }] },
        { id: 'c2', session_id: 'session_demo_mariagomez', language: 'es', visitor_name: 'Maria Gomez', visitor_email: 'maria.gomez@innova.es', created_at: new Date(Date.now() - 25000000).toISOString(), updated_at: new Date(Date.now() - 20000000).toISOString(), chat_messages: [{ count: 9 }] },
        { id: 'c3', session_id: 'session_demo_anon', language: 'en', visitor_name: null, visitor_email: null, created_at: new Date(Date.now() - 50000000).toISOString(), updated_at: new Date(Date.now() - 48000000).toISOString(), chat_messages: [{ count: 2 }] }
      ];
      const mockLeads = [
        { id: 'l1', conversation_id: 'c1', name: 'John Doe', email: 'john.doe@techcorp.com', phone: ') 019-2834+1 (555', company: 'TechCorp Solutions', industry: 'technology', service_interest: 'AI Solutions', budget_range: '$50,000+ (Enterprise)', timeline: 'Immediate (Under 1 month)', message: 'Need custom LLM agent integrated with our Salesforce workflow.', lead_score: 95, status: 'New', language: 'en', created_at: new Date(Date.now() - 5000000).toISOString() },
        { id: 'l2', conversation_id: 'c2', name: 'Maria Gomez', email: 'maria.gomez@innova.es', phone: '+34 612 345 678', company: 'Innova Retail ES', industry: 'retail', service_interest: 'Web Development', budget_range: '$10,000 - $25,000', timeline: '1-3 months', message: 'Reconstruir portal e-commerce con Next.js y headless CMS.', lead_score: 65, status: 'Contacted', language: 'es', created_at: new Date(Date.now() - 20000000).toISOString() }
      ];
      const mockConsults = [
        { id: 'r1', name: 'John Doe', email: 'john.doe@techcorp.com', phone: '+1 (555) 019-2834', company: 'TechCorp Solutions', service: 'AI Solutions', message: 'Architecture review call', preferred_date: 'Next Tuesday 2:00 PM EST', language: 'en', status: 'new', created_at: new Date(Date.now() - 4000000).toISOString() }
      ];
 
      setConversations(mockConvs);
      setLeads(mockLeads);
      setConsultations(mockConsults);
      setGlobalMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadDashboardData();
    }
  }, [session]);

  // Real-Time Subscriptions
  useEffect(() => {
    if (!session || !supabase) return;

    const chatConvsChannel = supabase
      .channel('chat-convs-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_conversations' }, () => {
        loadDashboardData();
      })
      .subscribe();

    const chatMessagesChannel = supabase
      .channel('chat-messages-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, () => {
        loadDashboardData();
      })
      .subscribe();

    const chatLeadsChannel = supabase
      .channel('chat-leads-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_leads' }, () => {
        loadDashboardData();
      })
      .subscribe();

    const consultRequestsChannel = supabase
      .channel('consult-requests-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_requests' }, () => {
        loadDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatConvsChannel);
      supabase.removeChannel(chatMessagesChannel);
      supabase.removeChannel(chatLeadsChannel);
      supabase.removeChannel(consultRequestsChannel);
    };
  }, [session]);

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(locale === 'es' ? '¿Está seguro de eliminar esta conversación?' : 'Are you sure you want to delete this conversation?')) return;
    try {
      await db.deleteChatConversation(id);
      loadDashboardData();
      if (selectedConversation?.id === id) {
        setSelectedConversation(null);
        setConvoMessages([]);
      }
    } catch (err) {
      alert(locale === 'es' ? 'Error al eliminar conversación' : 'Failed to delete conversation');
    }
  };

  const handleDeleteLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(locale === 'es' ? '¿Está seguro de eliminar este prospecto?' : 'Are you sure you want to delete this lead?')) return;
    try {
      await db.deleteChatLead(id);
      loadDashboardData();
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (err) {
      alert(locale === 'es' ? 'Error al eliminar prospecto' : 'Failed to delete lead');
    }
  };

  const handleDeleteConsultation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(locale === 'es' ? '¿Está seguro de eliminar esta consulta?' : 'Are you sure you want to delete this consultation request?')) return;
    try {
      await db.deleteConsultationRequest(id);
      loadDashboardData();
    } catch (err) {
      alert(locale === 'es' ? 'Error al eliminar consulta' : 'Failed to delete consultation');
    }
  };

  const handleDeleteMessage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(locale === 'es' ? '¿Está seguro de eliminar este mensaje?' : 'Are you sure you want to delete this message?')) return;
    try {
      if (supabase) {
        const { error } = await supabase.from('chat_messages').delete().eq('id', id);
        if (error) throw error;
      }
      loadDashboardData();
    } catch (err) {
      alert(locale === 'es' ? 'Error al eliminar mensaje' : 'Failed to delete message');
    }
  };

  // Load chat messages when a conversation is selected
  const handleSelectConversation = async (convo: any) => {
    setSelectedConversation(convo);
    setLoadingMessages(true);
    try {
      if (dbError) {
        // Fallback mock messages
        const mockMsgs = convo.id === 'c1' ? [
          { sender: 'assistant', message: 'Hello! I am the HyperCode AI Consultant...', created_at: convo.created_at },
          { sender: 'user', message: 'Tell me about your AI solutions', created_at: new Date(new Date(convo.created_at).getTime() + 60000).toISOString() },
          { sender: 'assistant', message: 'HyperCode builds enterprise AI & Data solutions. This includes integrating custom LLMs...', created_at: new Date(new Date(convo.created_at).getTime() + 120000).toISOString() },
          { sender: 'user', message: 'I need to qualify my project details', created_at: new Date(new Date(convo.created_at).getTime() + 180000).toISOString() }
        ] : [
          { sender: 'assistant', message: '¡Hola! Soy el Consultor de IA de HyperCode...', created_at: convo.created_at },
          { sender: 'user', message: 'Necesito un equipo de desarrollo web', created_at: new Date(new Date(convo.created_at).getTime() + 60000).toISOString() }
        ];
        setConvoMessages(mockMsgs);
      } else {
        const msgs = await db.getChatMessages(convo.id);
        setConvoMessages(msgs);
      }
    } catch (err) {
      console.error('Failed to load chat messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // CSV Exporters
  const exportCSV = (type: 'conversations' | 'leads' | 'consultations' | 'messages') => {
    let data: any[] = [];
    let headers: string[] = [];
    let filename = '';

    if (type === 'conversations') {
      data = conversations;
      headers = ['ID', 'Session ID', 'Visitor Name', 'Visitor Email', 'Language', 'Started At', 'Updated At'];
      filename = 'ai_conversations.csv';
    } else if (type === 'leads') {
      data = leads;
      headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Industry', 'Service', 'Budget', 'Timeline', 'Score', 'Status', 'Language', 'Created At'];
      filename = 'ai_qualified_leads.csv';
    } else if (type === 'messages') {
      data = globalMessages;
      headers = ['ID', 'Conversation ID', 'Sender', 'Message', 'Language', 'Created At'];
      filename = 'ai_chat_messages.csv';
    } else {
      data = consultations;
      headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Preferred Date', 'Status', 'Language', 'Created At'];
      filename = 'ai_consultations.csv';
    }

    const csvRows = [headers.join(',')];
    data.forEach(item => {
      let values: string[] = [];
      if (type === 'conversations') {
        values = [
          item.id,
          item.session_id,
          `"${(item.visitor_name || '').replace(/"/g, '""')}"`,
          item.visitor_email || '',
          item.language,
          item.created_at,
          item.updated_at
        ];
      } else if (type === 'leads') {
        values = [
          item.id,
          `"${item.name.replace(/"/g, '""')}"`,
          item.email,
          item.phone,
          `"${item.company.replace(/"/g, '""')}"`,
          item.industry,
          `"${item.service_interest.replace(/"/g, '""')}"`,
          `"${item.budget_range.replace(/"/g, '""')}"`,
          `"${item.timeline.replace(/"/g, '""')}"`,
          item.lead_score.toString(),
          item.status,
          item.language,
          item.created_at
        ];
      } else if (type === 'messages') {
        values = [
          item.id,
          item.conversation_id,
          item.sender,
          `"${item.message.replace(/"/g, '""')}"`,
          item.language,
          item.created_at
        ];
      } else {
        values = [
          item.id,
          `"${item.name.replace(/"/g, '""')}"`,
          item.email,
          item.phone || '',
          `"${(item.company || '').replace(/"/g, '""')}"`,
          `"${item.service.replace(/"/g, '""')}"`,
          `"${(item.preferred_date || '').replace(/"/g, '""')}"`,
          item.status || 'New',
          item.language,
          item.created_at
        ];
      }
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters and search logic
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = searchQuery === '' ||
      (c.visitor_name && c.visitor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.visitor_email && c.visitor_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.session_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = languageFilter === 'All' || c.language === languageFilter;
    return matchesSearch && matchesLang;
  });

  const filteredLeads = leads.filter(l => {
    const matchesSearch = searchQuery === '' ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesLang = languageFilter === 'All' || l.language === languageFilter;
    return matchesSearch && matchesStatus && matchesLang;
  });

  const filteredConsultations = consultations.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.company && r.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLang = languageFilter === 'All' || r.language === languageFilter;
    return matchesSearch && matchesLang;
  });

  const filteredGlobalMessages = globalMessages.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.conversation_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = languageFilter === 'All' || m.language === languageFilter;
    return matchesSearch && matchesLang;
  });

  // Funnel & Analytics calculations
  const totalConvos = conversations.length;
  const totalLeadsCount = leads.length;
  const totalConsultsCount = consultations.length;
  const conversionRate = totalConvos > 0 ? ((totalLeadsCount / totalConvos) * 100).toFixed(1) : '0';

  const enConvos = conversations.filter(c => c.language === 'en').length;
  const esConvos = conversations.filter(c => c.language === 'es').length;

  const getPriorityBadge = (score: number) => {
    if (score >= 70) return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">High Priority</span>;
    if (score >= 40) return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Medium Priority</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">Low Priority</span>;
  };

  if (authLoading || (session && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F4C81]"></div>
      </div>
    );
  }

  // Gate check: Admin or Consultant role required
  const role = userProfile?.role || 'Consultant';
  if (userProfile && role !== 'Admin' && role !== 'Consultant') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al dashboard del consultor de IA.' 
              : 'You do not have permission to view the AI consultant dashboard.'}
          </p>
          <button 
            onClick={() => router.push(`/${locale}/admin`)}
            className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'es' ? 'Volver al Panel' : 'Back to Dashboard'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600">
      <AdminSidebar userProfile={userProfile} activeTab="ai-consultant" />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        {/* Header */}
        <div className="text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {locale === 'es' ? 'Consultor de IA y Captación de Leads' : 'AI Consultant & Leads Panel'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {locale === 'es' ? 'Audite conversaciones, analice prospectos calificados y solicitudes de consulta' : 'Audit conversation logs, review qualified leads, and verify client consultation requests'}
            </p>
          </div>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {locale === 'es' ? 'Recargar Datos' : 'Refresh Data'}
          </button>
        </div>

        {/* DB Sync Mismatch Banner */}
        {dbError && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left flex items-start gap-3 animate-slideIn">
            <AlertCircle className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">Database Tables Missing (Running in Mock Fallback Mode)</h4>
              <p className="text-xs text-amber-700 mt-0.5">
                The database tables (`chat_conversations`, `chat_messages`, `chat_leads`) were not detected or are out-of-sync. 
                Please apply the migration script in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">supabase/migrations/20260627000000_ai_consultant.sql</code> in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {/* Tab Sub-navigation */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => { setActiveTab('analytics'); setSelectedConversation(null); setSelectedLead(null); }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
            }`}
          >
            {locale === 'es' ? 'Métricas de Embudo' : 'AI Analytics'}
          </button>
          <button
            onClick={() => { setActiveTab('conversations'); setSelectedConversation(null); setSelectedLead(null); }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'conversations' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
            }`}
          >
            {locale === 'es' ? 'Conversaciones' : 'Conversations'} ({conversations.length})
          </button>
          <button
            onClick={() => { setActiveTab('messages'); setSelectedConversation(null); setSelectedLead(null); }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'messages' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
            }`}
          >
            {locale === 'es' ? 'Mensajes' : 'Chat Messages'} ({globalMessages.length})
          </button>
          <button
            onClick={() => { setActiveTab('leads'); setSelectedConversation(null); setSelectedLead(null); }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
            }`}
          >
            {locale === 'es' ? 'Prospectos Calificados' : 'Qualified Leads'} ({leads.length})
          </button>
          <button
            onClick={() => { setActiveTab('consultations'); setSelectedConversation(null); setSelectedLead(null); }}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'consultations' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
            }`}
          >
            {locale === 'es' ? 'Consultas desde Chat' : 'Consultations'} ({consultations.length})
          </button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center bg-white border border-slate-200 rounded-3xl shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* TAB 1: ANALYTICS EMBED */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between h-28">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Sessions</span>
                      <MessageSquare className="w-4 h-4 text-[#0F4C81]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold text-slate-900">{totalConvos}</span>
                      <span className="text-[9px] font-bold text-indigo-600">Active chat logs</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between h-28">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leads Qualified</span>
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold text-slate-900">{totalLeadsCount}</span>
                      <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> {conversionRate}% conv. rate
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between h-28">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultations</span>
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold text-slate-900">{totalConsultsCount}</span>
                      <span className="text-[9px] font-bold text-blue-500">Video requests</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between h-28">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language Shares</span>
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div>
                        <span className="text-base font-bold text-slate-800">EN: {enConvos}</span>
                      </div>
                      <div className="border-l border-slate-200 h-6"></div>
                      <div>
                        <span className="text-base font-bold text-slate-800">ES: {esConvos}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion funnel & Language Metrics charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Embudo */}
                  <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight">AI Lead Conversion Funnel</h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>Conversations Started</span>
                          <span>{totalConvos} (100%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>Qualified Leads Captured</span>
                          <span>{totalLeadsCount} ({conversionRate}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${conversionRate}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>Consultation Requests</span>
                          <span>{totalConsultsCount} ({totalLeadsCount > 0 ? ((totalConsultsCount / totalLeadsCount) * 100).toFixed(0) : 0}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${totalLeadsCount > 0 ? (totalConsultsCount / totalLeadsCount) * 100 : 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Interest Breakdown */}
                  <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm text-left flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">Leads by Service Interest</h3>
                    <div className="space-y-3.5">
                      {['AI Solutions', 'Web Development', 'Technology Consulting', 'Data Analytics', 'IT & Non-IT Staffing'].map(svc => {
                        const count = leads.filter(l => {
                          const leadInterest = l.service_interest.toLowerCase();
                          const filterInterest = svc.toLowerCase();
                          if (filterInterest.includes('staffing')) {
                            return leadInterest.includes('staffing');
                          }
                          return leadInterest.includes(filterInterest) || l.service_interest === svc;
                        }).length;
                        const pct = totalLeadsCount > 0 ? Math.round((count / totalLeadsCount) * 100) : 0;
                        return (
                          <div key={svc} className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-slate-600">
                              <span>{svc}</span>
                              <span>{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-500 rounded-full" style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: CONVERSATIONS TABLE */}
            {activeTab === 'conversations' && (
              <div className="space-y-4">
                
                {/* Search / Export bar */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm items-center justify-between text-left">
                  <div className="relative flex-1 w-full max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search session or visitor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]"
                    />
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <select
                      value={languageFilter}
                      onChange={(e) => setLanguageFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Languages</option>
                      <option value="en">English (EN)</option>
                      <option value="es">Spanish (ES)</option>
                    </select>

                    <button
                      onClick={() => exportCSV('conversations')}
                      className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table GRID */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">Session ID</th>
                          <th className="py-4 px-6">Visitor</th>
                          <th className="py-4 px-6">Email</th>
                          <th className="py-4 px-6">Language</th>
                          <th className="py-4 px-6">Last Message</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-left">
                        {filteredConversations.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-400">No active conversations found.</td>
                          </tr>
                        ) : (
                          filteredConversations.map(convo => (
                            <tr key={convo.id} className="hover:bg-slate-50/50">
                              <td className="py-4 px-6 font-mono font-bold text-slate-800 text-[11px] truncate max-w-[120px]">{convo.session_id}</td>
                              <td className="py-4 px-6 font-semibold text-slate-700">{convo.visitor_name || <span className="text-slate-400 font-normal">Anonymous</span>}</td>
                              <td className="py-4 px-6 text-slate-500">{convo.visitor_email || '—'}</td>
                              <td className="py-4 px-6">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 uppercase">{convo.language}</span>
                              </td>
                              <td className="py-4 px-6 text-slate-400">{new Date(convo.updated_at).toLocaleString()}</td>
                              <td className="py-4 px-6">
                                <div className="flex gap-4 items-center">
                                  <button
                                    onClick={() => handleSelectConversation(convo)}
                                    className="text-[#0F4C81] hover:text-[#0c3e6b] font-bold flex items-center gap-1 cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View Log</span>
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteConversation(convo.id, e)}
                                    className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                                    title="Delete Conversation"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: QUALIFIED LEADS */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                
                {/* Search / Status Filter bar */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm items-center justify-between text-left">
                  <div className="relative flex-1 w-full max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]"
                    />
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Stages</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>

                    <button
                      onClick={() => exportCSV('leads')}
                      className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Leads GRID */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">Name</th>
                          <th className="py-4 px-6">Company</th>
                          <th className="py-4 px-6">Service</th>
                          <th className="py-4 px-6">Budget</th>
                          <th className="py-4 px-6">Score</th>
                          <th className="py-4 px-6">Priority</th>
                          <th className="py-4 px-6">Stage</th>
                          <th className="py-4 px-6">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-left">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text-slate-400">No qualified leads captured yet.</td>
                          </tr>
                        ) : (
                          filteredLeads.map(lead => (
                            <tr key={lead.id} className="hover:bg-slate-50/50">
                              <td className="py-4 px-6 font-bold text-slate-800">{lead.name}</td>
                              <td className="py-4 px-6 text-slate-700 font-semibold">{lead.company}</td>
                              <td className="py-4 px-6 text-slate-500">{lead.service_interest}</td>
                              <td className="py-4 px-6 text-emerald-700 font-bold">{lead.budget_range}</td>
                              <td className="py-4 px-6 font-extrabold text-slate-800 flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-[#0F4C81]" />
                                <span>{lead.lead_score}</span>
                              </td>
                              <td className="py-4 px-6">{getPriorityBadge(lead.lead_score)}</td>
                              <td className="py-4 px-6">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                  lead.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                                  lead.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {lead.status || 'New'}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-4 items-center">
                                  <button
                                    onClick={() => setSelectedLead(lead)}
                                    className="text-[#0F4C81] hover:text-[#0c3e6b] font-bold flex items-center gap-1 cursor-pointer font-bold"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>Open</span>
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteLead(lead.id, e)}
                                    className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer font-bold"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: CONSULTATIONS */}
            {activeTab === 'consultations' && (
              <div className="space-y-4">
                
                {/* Search bar */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm items-center justify-between text-left">
                  <div className="relative flex-1 w-full max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]"
                    />
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => exportCSV('consultations')}
                      className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Consultation table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">Name</th>
                          <th className="py-4 px-6">Company</th>
                          <th className="py-4 px-6">Email</th>
                          <th className="py-4 px-6">Service</th>
                          <th className="py-4 px-6">Preferred Date</th>
                          <th className="py-4 px-6">Created At</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-left">
                        {filteredConsultations.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-400">No chat consultation bookings found.</td>
                          </tr>
                        ) : (
                          filteredConsultations.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50/50">
                              <td className="py-4 px-6 font-bold text-slate-800">{r.name}</td>
                              <td className="py-4 px-6 text-slate-700 font-semibold">{r.company || '—'}</td>
                              <td className="py-4 px-6 text-slate-500">{r.email}</td>
                              <td className="py-4 px-6 text-slate-500 font-bold text-[#0F4C81]">{r.service}</td>
                              <td className="py-4 px-6 text-indigo-800 font-extrabold">{r.preferred_date}</td>
                              <td className="py-4 px-6 text-slate-400">{new Date(r.created_at).toLocaleString()}</td>
                              <td className="py-4 px-6">
                                <button
                                  onClick={(e) => handleDeleteConsultation(r.id, e)}
                                  className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer font-bold"
                                  title="Delete Consultation"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: CHAT MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                
                {/* Search / Filter bar */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm items-center justify-between text-left">
                  <div className="relative flex-1 w-full max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search message, sender, or conversation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81]"
                    />
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <select
                      value={languageFilter}
                      onChange={(e) => setLanguageFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Languages</option>
                      <option value="en">English (EN)</option>
                      <option value="es">Spanish (ES)</option>
                    </select>

                    <button
                      onClick={() => exportCSV('messages')}
                      className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Messages table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">Sender</th>
                          <th className="py-4 px-6">Message</th>
                          <th className="py-4 px-6">Conversation ID</th>
                          <th className="py-4 px-6">Language</th>
                          <th className="py-4 px-6">Timestamp</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-left">
                        {filteredGlobalMessages.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-400">No chat messages found.</td>
                          </tr>
                        ) : (
                          filteredGlobalMessages.map(msg => (
                            <tr key={msg.id} className="hover:bg-slate-50/50">
                              <td className="py-4 px-6">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gradient-to-tr from-[#0F4C81] to-[#38BDF8] text-white'
                                }`}>
                                  {msg.sender}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-700 font-semibold max-w-sm truncate" title={msg.message}>
                                {msg.message}
                              </td>
                              <td className="py-4 px-6 font-mono text-[10px] text-slate-500">{msg.conversation_id}</td>
                              <td className="py-4 px-6">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">{msg.language}</span>
                              </td>
                              <td className="py-4 px-6 text-slate-400">{new Date(msg.created_at).toLocaleString()}</td>
                              <td className="py-4 px-6">
                                <button
                                  onClick={(e) => handleDeleteMessage(msg.id, e)}
                                  className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer font-bold"
                                  title="Delete Message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* 1. CHAT LOG AUDIT DRAWER */}
        {selectedConversation && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left">
            <div className="p-6 border-b border-slate-150 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversation Audit Log</span>
                <h3 className="text-base font-bold text-slate-800 mt-1">
                  Session: {selectedConversation.session_id.substring(0, 15)}...
                </h3>
              </div>
              <button
                onClick={() => { setSelectedConversation(null); setConvoMessages([]); }}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
              {loadingMessages ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
                </div>
              ) : convoMessages.length === 0 ? (
                <div className="text-center text-slate-400 py-8">No messages logged in this session.</div>
              ) : (
                convoMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse ml-auto' : 'self-start mr-auto'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user' ? 'bg-[#0F4C81] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 2. LEAD PROFILE DETAILS DRAWER */}
        {selectedLead && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left">
            <div className="p-6 border-b border-slate-150 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Qualified Lead Profile</span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* Score / priority badge card */}
              <div className="p-5 bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-2xl text-white flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lead Priority Score</span>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-xl font-black">{selectedLead.lead_score} pts</span>
                  </div>
                </div>
                <div>{getPriorityBadge(selectedLead.lead_score)}</div>
              </div>

              {/* Lead Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company Name</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.company}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Industry / Sector</p>
                  <p className="mt-1 font-semibold text-slate-800 uppercase">{selectedLead.industry}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Budget Range</p>
                  <p className="mt-1 font-semibold text-emerald-700">{selectedLead.budget_range}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Project Timeline</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.timeline}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Service Interest</p>
                  <p className="mt-1 font-semibold text-[#0F4C81]">{selectedLead.service_interest}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Language</p>
                  <p className="mt-1 font-semibold text-slate-800 uppercase">{selectedLead.language}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Project Description / Requirements</p>
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message || 'No additional project requirements registered.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
