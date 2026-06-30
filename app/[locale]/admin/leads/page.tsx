'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, X, ArrowLeft, AlertCircle, Sparkles, User, Mail, Calendar, Phone, Award } from 'lucide-react';
import { supabase, db, ContactInquiry, ChatLead, UserProfile } from '@/lib/db';
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

export default function AdminLeadsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(defaultHealthReport);

  // Sub-navigation and Drawer States
  const [leadsSubTab, setLeadsSubTab] = useState<'inquiries' | 'chat_leads'>('inquiries');
  const [selectedLead, setSelectedLead] = useState<{ type: 'contact' | 'chat_lead'; data: any } | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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
      const [inqs, cLeads] = await Promise.all([
        db.getAllContactInquiries(),
        db.getAllChatLeads().catch(() => []) // Catch in case table is missing columns before migration
      ]);
      setInquiries(inqs);
      setChatLeads(cLeads);

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
      console.error('Failed to load leads data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleLeadStatusChange = async (type: 'contact' | 'chat_lead', id: string, newStatus: any) => {
    try {
      await db.updateLeadStatus(type, id, newStatus);
      if (selectedLead && selectedLead.data.id === id) {
        setSelectedLead({
          ...selectedLead,
          data: { ...selectedLead.data, status: newStatus }
        });
      }
      // Reload lists
      await loadData();
    } catch (err) {
      console.error('Failed to update lead status:', err);
      alert('Failed to update status.');
    }
  };

  const processSearch = (items: any[], searchKeys: string[]) => {
    return items.filter(item => {
      // 1. Search Query Match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = searchKeys.some(key => {
          const val = item[key];
          return val && String(val).toLowerCase().includes(q);
        });
      }

      // 2. Status Filter Match
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        matchesStatus = (item.status || 'New') === statusFilter;
      }

      return matchesSearch && matchesStatus;
    });
  };

  const exportLeadsCSV = () => {
    let dataToExport: any[] = [];
    let headers: string[] = [];
    let fileName = '';

    if (leadsSubTab === 'inquiries') {
      dataToExport = inquiries;
      headers = ['ID', 'Created At', 'Full Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status', 'Source'];
      fileName = 'contact_requests_export.csv';
    } else {
      dataToExport = chatLeads;
      headers = ['ID', 'Created At', 'Full Name', 'Email', 'Phone', 'Company', 'Industry', 'Service Interest', 'Timeline', 'Budget', 'Lead Score', 'Status'];
      fileName = 'chat_leads_export.csv';
    }

    const csvRows = [headers.join(',')];

    dataToExport.forEach(row => {
      let values: string[] = [];
      if (leadsSubTab === 'inquiries') {
        values = [
          row.id,
          row.created_at,
          `"${(row.full_name || '').replace(/"/g, '""')}"`,
          row.email,
          row.phone || '',
          `"${(row.company || '').replace(/"/g, '""')}"`,
          `"${(row.subject || '').replace(/"/g, '""')}"`,
          `"${(row.message || '').replace(/"/g, '""')}"`,
          row.status || 'New',
          row.source
        ];
      } else {
        values = [
          row.id,
          row.created_at,
          `"${(row.name || '').replace(/"/g, '""')}"`,
          row.email || '',
          row.phone || '',
          `"${(row.company || '').replace(/"/g, '""')}"`,
          row.industry || '',
          row.service_interest || row.interest || '',
          row.timeline || '',
          row.budget_range || '',
          String(row.lead_score || 0),
          row.status || 'New'
        ];
      }
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
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
              ? 'No tiene permisos para acceder al dashboard de prospectos.' 
              : 'You do not have permission to view the leads dashboard.'}
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

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Gestión de Prospectos' : 'Leads Dashboard'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Gestione formularios de contacto y prospectos de chat' : 'Manage contact inquiries and chat lead captures'}
          </p>
        </div>

        {/* DB Sync Mismatch Warning Banner */}
        {healthReport && !healthReport.success && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm text-left flex flex-col sm:flex-row items-start gap-4 animate-slideIn">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1.5">
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
            {/* Sub-tabs selectors */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => { setLeadsSubTab('inquiries'); setSelectedLead(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  leadsSubTab === 'inquiries' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {locale === 'es' ? 'Consultas de Contacto' : 'Contact form submissions'} ({inquiries.length})
              </button>
              <button
                onClick={() => { setLeadsSubTab('chat_leads'); setSelectedLead(null); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  leadsSubTab === 'chat_leads' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                {locale === 'es' ? 'Prospectos de Chat' : 'Chatbot Leads'} ({chatLeads.length})
              </button>
            </div>

            {/* Search and status filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={locale === 'es' ? 'Buscar prospectos...' : 'Search leads...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="All">{locale === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>

                <button
                  onClick={exportLeadsCSV}
                  className="px-4 py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table list */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">{locale === 'es' ? 'Nombre' : 'Name'}</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">{locale === 'es' ? 'Compañía' : 'Company'}</th>
                      {leadsSubTab === 'chat_leads' && <th className="py-4 px-6">{locale === 'es' ? 'Puntaje' : 'Score'}</th>}
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {leadsSubTab === 'inquiries' &&
                      processSearch(inquiries, ['full_name', 'email', 'company', 'subject', 'message']).map(row => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLead({ type: 'contact', data: row })}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-bold text-slate-800">{row.full_name}</td>
                          <td className="py-4 px-6 text-slate-500">{row.email}</td>
                          <td className="py-4 px-6 text-slate-500">{row.company || '—'}</td>
                          <td className="py-4 px-6 text-slate-400">{new Date(row.created_at).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              row.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              row.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                              row.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {row.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}

                    {leadsSubTab === 'chat_leads' &&
                      processSearch(chatLeads, ['name', 'email', 'company', 'industry', 'service_interest', 'interest']).map(row => (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLead({ type: 'chat_lead', data: row })}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            {row.name}
                          </td>
                          <td className="py-4 px-6 text-slate-500">{row.email || '—'}</td>
                          <td className="py-4 px-6 text-slate-500">{row.company || '—'}</td>
                          <td className="py-4 px-6 text-slate-500 font-bold text-blue-600">{row.lead_score || 0}</td>
                          <td className="py-4 px-6 text-slate-400">{new Date(row.created_at).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              row.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              row.status === 'Won' ? 'bg-emerald-100 text-emerald-800' :
                              row.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {row.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {((leadsSubTab === 'inquiries' && inquiries.length === 0) || (leadsSubTab === 'chat_leads' && chatLeads.length === 0)) && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No records found in this category.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lead Details Drawer */}
        {selectedLead && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  {selectedLead.type === 'contact' ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3 text-blue-500" />}
                  {selectedLead.type === 'contact' ? 'Contact Inquiry' : 'Chatbot Lead'}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">
                  {selectedLead.data.full_name || selectedLead.data.name || 'Anonymous Lead'}
                </h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Status update box */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                <label className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-wider block mb-2">Lead Stage</label>
                <select
                  value={selectedLead.data.status || 'New'}
                  onChange={(e) => handleLeadStatusChange(selectedLead.type, selectedLead.data.id, e.target.value)}
                  className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Profile info fields */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.email || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.phone || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.company || '—'}</p>
                </div>
                {selectedLead.type === 'contact' && (
                  <>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Industry</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.industry || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company Size</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.company_size || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Budget</p>
                      <p className="mt-1 font-semibold text-indigo-750 text-indigo-700">{selectedLead.data.budget || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Timeline</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.timeline || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Country</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.country || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Preferred Contact</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.preferred_contact_method || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Project Type</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.project_type || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Source</p>
                      <p className="mt-1 font-semibold text-slate-800 uppercase">{selectedLead.data.source || 'website'}</p>
                    </div>

                    {selectedLead.data.services && selectedLead.data.services.length > 0 && (
                      <div className="col-span-2">
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">Services Requested</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.data.services.map((srv: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-slate-700 font-semibold text-[10px] uppercase tracking-wide">
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedLead.data.required_technologies && selectedLead.data.required_technologies.length > 0 && (
                      <div className="col-span-2">
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">Preferred Technologies</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.data.required_technologies.map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-205 rounded text-slate-800 font-semibold text-[10px] uppercase tracking-wide">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedLead.type === 'chat_lead' && (
                  <>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Industry</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.industry || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Budget Range</p>
                      <p className="mt-1 font-semibold text-indigo-700">{selectedLead.data.budget_range || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Timeline</p>
                      <p className="mt-1 font-semibold text-slate-800">{selectedLead.data.timeline || '—'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Lead Score</p>
                      <p className="mt-1 font-semibold text-blue-600 flex items-center gap-1 font-bold">
                        <Award className="w-3.5 h-3.5 text-blue-500" />
                        {selectedLead.data.lead_score || 0}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Language</p>
                      <p className="mt-1 font-semibold text-slate-800 uppercase">{selectedLead.data.language || 'en'}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Text details */}
              <div className="space-y-4">
                {selectedLead.type === 'contact' && (
                  <div>
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Subject</p>
                    <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {selectedLead.data.subject}
                    </p>
                  </div>
                )}

                {selectedLead.type === 'chat_lead' && (
                  <div>
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Service Interest</p>
                    <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {selectedLead.data.service_interest || selectedLead.data.interest || '—'}
                    </p>
                  </div>
                )}

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    {selectedLead.type === 'contact' ? 'Message' : 'Message / Chat Summary'}
                  </p>
                  <p className="mt-1.5 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedLead.data.message || selectedLead.data.conversation_summary || 'No details registered.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
