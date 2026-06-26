'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Search, Download, X, ArrowLeft, AlertCircle, Briefcase, FileText, User, Mail, Phone, ExternalLink } from 'lucide-react';
import { supabase, db, JobApplication, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminCareersPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(null);

  // UI States
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
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
      const apps = await db.getAllJobApplications();
      setApplications(apps);

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
      console.error('Failed to load job applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: JobApplication['status']) => {
    try {
      await db.updateJobApplicationStatus(id, newStatus);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      await loadData();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status.');
    }
  };

  const processSearch = () => {
    return applications.filter(app => {
      // 1. Search Match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = [
          app.name,
          app.email,
          app.position,
          app.skills,
          app.message
        ].some(val => val && val.toLowerCase().includes(q));
      }

      // 2. Status Match
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        // Map user selected filter to candidate table status values if needed,
        // but since we display app status directly, matches is direct:
        matchesStatus = app.status === statusFilter;
      }

      return matchesSearch && matchesStatus;
    });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Created At', 'Name', 'Email', 'Phone', 'LinkedIn', 'Position', 'Experience (Years)', 'Skills', 'Cover Message', 'Status', 'Resume URL'];
    const rows = applications.map(app => [
      app.id,
      app.created_at,
      `"${app.name.replace(/"/g, '""')}"`,
      app.email,
      app.phone || '',
      app.linkedin || '',
      app.position,
      app.years_experience,
      `"${(app.skills || '').replace(/"/g, '""')}"`,
      `"${(app.message || '').replace(/"/g, '""')}"`,
      app.status,
      app.resume_url
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `job_applications_${new Date().toISOString().split('T')[0]}.csv`);
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

  // Gate check: Admin or Recruiter required
  const role = userProfile?.role || 'Consultant';
  if (userProfile && role !== 'Admin' && role !== 'Recruiter') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al portal de reclutamiento.' 
              : 'You do not have permission to view the recruitment portal.'}
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

  const filteredApps = processSearch();

  // Status mapping for user requested labels vs DB status:
  // User wants: Applied, Screening, Interview, Selected, Rejected
  // We map them to DB statuses: New, Reviewing, Interview, Shortlisted, Hired, Rejected
  const pipelineStatuses = [
    { label: 'Applied', value: 'New' },
    { label: 'Screening', value: 'Reviewing' },
    { label: 'Interviewing', value: 'Interview' },
    { label: 'Selected / Offer', value: 'Shortlisted' },
    { label: 'Hired', value: 'Hired' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Portal de Reclutamiento' : 'Careers Portal'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Gestione currículums y estado de postulantes técnicos' : 'Manage resume applications and screening pipelines'}
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
            {/* Search and status filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm text-left items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidates..."
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
                  <option value="All">All Stages</option>
                  <option value="New">Applied</option>
                  <option value="Reviewing">Screening</option>
                  <option value="Interview">Interviewing</option>
                  <option value="Shortlisted">Selected / Offer</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
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

            {/* Careers pipeline list */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Candidate</th>
                      <th className="py-4 px-6">Position</th>
                      <th className="py-4 px-6">Experience</th>
                      <th className="py-4 px-6">Skills</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-left">
                    {filteredApps.map(app => (
                      <tr
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-800">{app.name}</td>
                        <td className="py-4 px-6 text-slate-500">{app.position}</td>
                        <td className="py-4 px-6 text-slate-500">{app.years_experience} years</td>
                        <td className="py-4 px-6 text-slate-400 max-w-[200px] truncate">{app.skills || '—'}</td>
                        <td className="py-4 px-6 text-slate-400">{new Date(app.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            app.status === 'New' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'Reviewing' ? 'bg-amber-100 text-amber-800' :
                            app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                            app.status === 'Hired' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {app.status === 'New' ? 'Applied' :
                             app.status === 'Reviewing' ? 'Screening' :
                             app.status === 'Interview' ? 'Interview' :
                             app.status === 'Shortlisted' ? 'Selected' : app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredApps.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  No applicants registered.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Candidate Detail Drawer */}
        {selectedApp && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-slideLeft text-left">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-indigo-500" />
                  Candidate Application
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{selectedApp.name}</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Status Selector */}
              <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-2xl">
                <label className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block mb-2">Review Status</label>
                <select
                  value={selectedApp.status || 'New'}
                  onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as any)}
                  className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-550/25 focus:border-indigo-550 cursor-pointer"
                >
                  {pipelineStatuses.map(st => (
                    <option key={st.value} value={st.value}>{st.label}</option>
                  ))}
                </select>
              </div>

              {/* Data list */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedApp.phone || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Position Applied</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedApp.position}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Experience</p>
                  <p className="mt-1 font-semibold text-slate-800">{selectedApp.years_experience} years</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">LinkedIn</p>
                  <p className="mt-1 font-semibold text-indigo-700 truncate">
                    {selectedApp.linkedin ? (
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                        Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : '—'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Resume File</p>
                  <a
                    href={selectedApp.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Candidate Resume</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Skills</p>
                  <p className="mt-1.5 text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedApp.skills || 'No skills listed.'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Cover Message</p>
                  <p className="mt-1.5 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedApp.message || 'No cover message submitted.'}
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
