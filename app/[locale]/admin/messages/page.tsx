'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, ArrowLeft, AlertCircle, Bot, User, Globe, Calendar, MessageSquare } from 'lucide-react';
import { supabase, db, ChatMessage, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

const defaultHealthReport = {
  success: true,
  connection: 'green' as const,
  status: 'healthy',
  missingObjects: [] as string[],
  warnings: [] as string[],
  tables: [] as any[],
  policies: [] as string[],
  errors: {} as Record<string, string>
};

export default function AdminMessagesPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(defaultHealthReport);

  // UI Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [senderFilter, setSenderFilter] = useState('All');
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
      const msgs = await db.getAllChatMessages();
      setMessages(msgs);

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
          setHealthReport({
            ...defaultHealthReport,
            ...healthData
          });
        } else {
          setHealthReport(defaultHealthReport);
        }
      } catch (healthErr) {
        console.error('Failed to load database health report:', healthErr);
        setHealthReport(defaultHealthReport);
      }
    } catch (err) {
      console.error('Failed to load chat messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const processSearch = () => {
    return messages.filter(m => {
      // 1. Search Query Match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = m.message.toLowerCase().includes(q) || (m.conversation_id || '').toLowerCase().includes(q);
      }

      // 2. Sender Filter Match
      let matchesSender = true;
      if (senderFilter !== 'All') {
        matchesSender = m.sender === senderFilter;
      }

      // 3. Language Filter Match
      let matchesLang = true;
      if (languageFilter !== 'All') {
        matchesLang = m.language === languageFilter;
      }

      return matchesSearch && matchesSender && matchesLang;
    });
  };

  const exportCSV = () => {
    const headers = ['Message ID', 'Conversation ID', 'Sender', 'Message Text', 'Language', 'Created At'];
    const rows = messages.map(m => [
      m.id,
      m.conversation_id,
      m.sender,
      `"${m.message.replace(/"/g, '""')}"`,
      m.language || 'en',
      new Date(m.created_at).toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chat_messages_stream_${new Date().toISOString().split('T')[0]}.csv`);
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
              ? 'No tiene permisos para acceder al log de mensajes.' 
              : 'You do not have permission to view the global chatbot message logs.'}
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

  const filteredMsgs = processSearch();

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Mensajes de Chatbot' : 'Chat Messages Log'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Revise todos los mensajes enviados y recibidos por el Consultor de IA' : 'Review and search all messages sent and received by the AI Consultant'}
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
                {healthReport?.missingObjects?.length ? (
                  healthReport.missingObjects.map((obj: string, idx: number) => (
                    <div key={idx} className="font-mono text-amber-800 font-semibold">{obj}</div>
                  ))
                ) : (
                  <div className="text-emerald-700 font-semibold">
                    ✓ No missing database objects detected.
                  </div>
                )}
              </div>
              <p className="text-[10px] text-amber-650 font-medium">
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
            {/* Search and filters bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search message text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <select
                  value={senderFilter}
                  onChange={(e) => setSenderFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="All">All Senders</option>
                  <option value="user">User Messages</option>
                  <option value="assistant">AI Responses</option>
                </select>

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

            {/* Messages Log Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Sender</th>
                      <th className="py-4 px-6">Message</th>
                      <th className="py-4 px-6">Language</th>
                      <th className="py-4 px-6">Conversation ID / Session</th>
                      <th className="py-4 px-6">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {filteredMsgs.map(msg => (
                      <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-800">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase flex items-center gap-1 w-max ${
                            msg.sender === 'user' ? 'bg-slate-100 text-slate-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            {msg.sender}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-medium max-w-sm whitespace-pre-wrap">{msg.message}</td>
                        <td className="py-4 px-6 text-slate-500 uppercase">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-slate-400" />
                            {msg.language || 'en'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-[10px] truncate max-w-[150px]">
                          <span className="flex items-center gap-1" title={msg.conversation_id}>
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {msg.conversation_id}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-400">
                          {new Date(msg.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredMsgs.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No chat messages found.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
