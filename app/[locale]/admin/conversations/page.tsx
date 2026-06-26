'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, Trash2, X, ArrowLeft, AlertCircle, MessageSquare, Bot, User, Globe, Calendar, Clock } from 'lucide-react';
import { supabase, db, ChatConversation, ChatMessage, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminConversationsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(null);

  // Drawer / Conversation Messages State
  const [selectedConvo, setSelectedConvo] = useState<any | null>(null);
  const [convoMessages, setConvoMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // UI Filters State
  const [searchQuery, setSearchQuery] = useState('');
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

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const convs = await db.getAllChatConversations();
      setConversations(convs);

      // Fetch DB health status
      try {
        const token = session?.access_token || '';
        const headers: any = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const healthRes = await fetch('/api/admin/health', { headers });
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setHealthReport(healthData);
        }
      } catch (healthErr) {
        console.error('Failed to load database health report:', healthErr);
      }
    } catch (err) {
      console.error('Failed to load chat conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  // Load Messages for Drawer
  useEffect(() => {
    if (!selectedConvo) {
      setConvoMessages([]);
      return;
    }

    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const msgs = await db.getChatMessages(selectedConvo.id);
        setConvoMessages(msgs);
      } catch (err) {
        console.error('Failed to load chat messages:', err);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [selectedConvo]);

  const handleDeleteConvo = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this chatbot conversation? All logs will be lost.')) return;
    try {
      await db.deleteChatConversation(id);
      if (selectedConvo?.id === id) {
        setSelectedConvo(null);
      }
      await loadData();
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      alert('Failed to delete conversation.');
    }
  };

  const processSearch = () => {
    return conversations.filter(c => {
      // 1. Search Query Match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = [
          c.session_id,
          c.visitor_name,
          c.visitor_email
        ].some(val => val && String(val).toLowerCase().includes(q));
      }

      // 2. Language Filter Match
      let matchesLang = true;
      if (languageFilter !== 'All') {
        matchesLang = c.language === languageFilter;
      }

      return matchesSearch && matchesLang;
    });
  };

  const exportCSV = () => {
    const headers = ['Conversation ID', 'Session ID', 'Visitor Name', 'Visitor Email', 'Language', 'Created At', 'Last Active'];
    const rows = conversations.map(c => [
      c.id,
      c.session_id,
      c.visitor_name || 'Anonymous',
      c.visitor_email || '—',
      c.language || 'en',
      new Date(c.created_at).toLocaleDateString(),
      new Date(c.updated_at || c.created_at).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chatbot_conversations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              : 'You do not have permission to view the AI chatbot conversations.'}
          </p>
          <button 
            onClick={() => router.push(`/admin`)}
            className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'es' ? 'Volver al Panel' : 'Back to Dashboard'}</span>
          </button>
        </div>
      </div>
    );
  }

  const filteredConvs = processSearch();

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Conversaciones del Chatbot' : 'Chatbot Conversations'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Revise las interacciones de los visitantes con el Consultor de IA' : 'Monitor visitor interactions with the AI Consultant chatbot'}
          </p>
        </div>

        {/* DB Sync Mismatch Warning Banner */}
        {healthReport && !healthReport.success && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm text-left flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1.5 text-left">
              <h4 className="text-sm font-bold text-amber-900">Database Schema Out of Sync</h4>
              <p className="text-xs text-amber-700 leading-relaxed font-medium">
                The application code expects database elements that do not exist or differ in type within your remote Supabase schema. Writes are currently falling back to LocalStorage.
              </p>
              <div className="text-[10px] bg-white/50 border border-amber-100 rounded-lg p-3 space-y-1 max-h-28 overflow-y-auto">
                {healthReport.missingObjects.map((obj: string, idx: number) => (
                  <div key={idx} className="font-mono text-amber-800 font-semibold">{obj}</div>
                ))}
              </div>
              <p className="text-[10px] text-amber-600 font-medium">
                Please run the migration SQL file in <code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">supabase/migrations/</code> in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="h-[400px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by session ID or visitor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Languages</option>
                  <option value="en">English Only</option>
                  <option value="es">Español Only</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Conversations list */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Visitor / Session ID</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Language</th>
                      <th className="py-4 px-6">Messages</th>
                      <th className="py-4 px-6">Last Active</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {filteredConvs.map(row => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedConvo(row)}
                        className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-800 flex flex-col">
                          <span>{row.visitor_name || 'Anonymous Visitor'}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[180px]">{row.session_id}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-500">{row.visitor_email || '—'}</td>
                        <td className="py-4 px-6 text-slate-500 uppercase flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          {row.language || 'en'}
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-semibold">
                          {row.chat_messages?.[0]?.count ?? row.chat_messages_count ?? '—'} msg
                        </td>
                        <td className="py-4 px-6 text-slate-400">
                          {new Date(row.updated_at || row.created_at).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={(e) => handleDeleteConvo(row.id, e)}
                            className="p-1.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg cursor-pointer transition-all"
                            title="Delete Session"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredConvs.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No chatbot conversations found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conversation Transcript Drawer */}
        {selectedConvo && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left font-sans">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-emerald-500" />
                  Chat Session Details
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1 truncate">
                  {selectedConvo.visitor_name || 'Anonymous Visitor'}
                </h3>
                <span className="text-[9px] font-mono text-slate-400 block mt-0.5 truncate">{selectedConvo.session_id}</span>
              </div>
              <button onClick={() => setSelectedConvo(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Log Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50 flex flex-col">
              {loadingMessages ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              ) : (
                <>
                  {convoMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 max-w-[85%] ${
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
                              ? 'bg-[#0F4C81] text-white rounded-tr-none shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-[8px] text-slate-400 font-bold mt-1 px-1">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {convoMessages.length === 0 && (
                    <p className="text-xs text-slate-400 py-12 text-center my-auto">No messages recorded for this session.</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
