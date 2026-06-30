'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, Trash2, ArrowLeft, AlertCircle, Mail, Globe } from 'lucide-react';
import { supabase, db, NewsletterSubscriber, UserProfile } from '@/lib/db';
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

export default function AdminNewsletterPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(defaultHealthReport);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');

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
      const subs = await db.getNewsletterSubscribers();
      setSubscribers(subs);

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
      console.error('Failed to load subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to remove this newsletter subscriber?')) return;
    try {
      await db.deleteNewsletterSubscriber(id);
      await loadData();
    } catch (err) {
      console.error('Failed to remove subscriber:', err);
      alert('Failed to remove subscriber.');
    }
  };

  const processSearch = () => {
    return subscribers.filter(sub => {
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = sub.email.toLowerCase().includes(q) || (sub.source_page || '').toLowerCase().includes(q);
      }
      return matchesSearch;
    });
  };

  const exportCSV = () => {
    const headers = ['Email', 'Language', 'Status', 'Source Page', 'Date Subscribed'];
    const rows = subscribers.map(s => [
      s.email,
      s.language || 'en',
      s.status,
      s.source_page || '',
      new Date(s.created_at).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
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

  // Gate check: Admin required
  const role = userProfile?.role || 'Consultant';
  if (userProfile && role !== 'Admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al boletín informativo.' 
              : 'You do not have permission to view the newsletter subscribers list.'}
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

  const filteredSubs = processSearch();

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Suscriptores de Boletín' : 'Newsletter Dashboard'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Gestione la lista de suscriptores al boletín de noticias' : 'Manage and monitor newsletter subscriptions'}
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
            {/* Search and export bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={exportCSV}
                  className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Newsletter list table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Preferred Language</th>
                      <th className="py-4 px-6">Source Page</th>
                      <th className="py-4 px-6">Date Subscribed</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {filteredSubs.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-500" />
                          {sub.email}
                        </td>
                        <td className="py-4 px-6 text-slate-500 uppercase flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          {sub.language || 'en'}
                        </td>
                        <td className="py-4 px-6 text-slate-500">{sub.source_page || 'Home'}</td>
                        <td className="py-4 px-6 text-slate-400">{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg cursor-pointer transition-all"
                            title="Unsubscribe Subscriber"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredSubs.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No subscribers registered.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
