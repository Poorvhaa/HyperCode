'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, X, ArrowLeft, AlertCircle, Calendar, User, Mail, Phone, DollarSign, Clock, HelpCircle } from 'lucide-react';
import { supabase, db, ConsultationRequest, UserProfile } from '@/lib/db';
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

export default function AdminConsultationsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(defaultHealthReport);

  // UI States
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRequest | null>(null);
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
      const cons = await db.getAllConsultations();
      setConsultations(cons);

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
      console.error('Failed to load consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await db.updateLeadStatus('consultation', id, newStatus);
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation({ ...selectedConsultation, status: newStatus });
      }
      await loadData();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status.');
    }
  };

  const processSearch = () => {
    return consultations.filter(con => {
      // 1. Search Query Match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = [
          con.full_name,
          con.email,
          con.company,
          con.service_interest,
          con.project_description
        ].some(val => val && String(val).toLowerCase().includes(q));
      }

      // 2. Status Match
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        matchesStatus = con.status === statusFilter;
      }

      return matchesSearch && matchesStatus;
    });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Created At', 'Full Name', 'Company', 'Email', 'Phone', 'Service Interest', 'Project Description', 'Budget', 'Timeline', 'Status'];
    const rows = consultations.map(con => [
      con.id,
      con.created_at,
      `"${con.full_name.replace(/"/g, '""')}"`,
      `"${(con.company || '').replace(/"/g, '""')}"`,
      con.email,
      con.phone || '',
      con.service_interest,
      `"${con.project_description.replace(/"/g, '""')}"`,
      con.budget || '',
      con.timeline || '',
      con.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `consultation_requests_${new Date().toISOString().split('T')[0]}.csv`);
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
              ? 'No tiene permisos para acceder al dashboard de consultas.' 
              : 'You do not have permission to view the consultation requests.'}
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

  const filteredCons = processSearch();

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Solicitudes de Consulta' : 'Consultations Dashboard'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Gestione solicitudes de consultoría tecnológica programadas' : 'Manage and monitor scheduled technology consultation requests'}
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
            {/* Search and status filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search consultations..."
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
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
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

            {/* Consultations Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Client Name</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Company</th>
                      <th className="py-4 px-6">Service Interest</th>
                      <th className="py-4 px-6">Date Registered</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {filteredCons.map(row => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedConsultation(row)}
                        className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          {row.full_name}
                        </td>
                        <td className="py-4 px-6 text-slate-500">{row.email}</td>
                        <td className="py-4 px-6 text-slate-500">{row.company || '—'}</td>
                        <td className="py-4 px-6 text-slate-550 font-medium">{row.service_interest}</td>
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
              {filteredCons.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No consultation requests found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details Drawer */}
        {selectedConsultation && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left font-sans">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  Consultation Request
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{selectedConsultation.full_name}</h3>
              </div>
              <button onClick={() => setSelectedConsultation(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Status Selector */}
              <div className="p-4 bg-amber-50/50 border border-amber-150 rounded-2xl">
                <label className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-2">Lead Stage</label>
                <select
                  value={selectedConsultation.status || 'New'}
                  onChange={(e) => handleStatusChange(selectedConsultation.id, e.target.value as any)}
                  className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-550/25 focus:border-amber-550 cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Data list */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.email}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.phone || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.company || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company Size</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.company_size || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Industry</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.industry || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Meeting Type</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.preferred_meeting_type || '—'}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Budget</p>
                  <p className="mt-1 font-semibold text-emerald-700 flex items-center gap-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedConsultation.budget || '—'}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Timeline</p>
                  <p className="mt-1 font-semibold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedConsultation.timeline || '—'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Current Tech Stack</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedConsultation.current_tech_stack || '—'}</p>
                </div>
                {selectedConsultation.preferred_services && selectedConsultation.preferred_services.length > 0 && (
                  <div className="col-span-2">
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">Preferred Services</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedConsultation.preferred_services.map((srv: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-slate-700 font-semibold text-[10px] uppercase tracking-wide">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Primary Service Interest</p>
                  <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedConsultation.service_interest}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Business Goal</p>
                  <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedConsultation.business_goal || '—'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Current Challenges</p>
                  <p className="mt-1.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedConsultation.current_challenges || '—'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Expected Outcome</p>
                  <p className="mt-1.5 font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedConsultation.expected_outcome || '—'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Project Overview</p>
                  <p className="mt-1.5 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedConsultation.project_description || 'No description provided.'}
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
