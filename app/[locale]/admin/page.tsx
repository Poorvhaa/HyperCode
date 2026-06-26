'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  FileText,
  Briefcase,
  Users,
  Mail,
  Calendar,
  MessageSquare,
  Activity,
  Globe,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  db,
  ContactInquiry,
  ConsultationRequest,
  JobApplication,
  Candidate,
  NewsletterSubscriber,
  Article,
  CaseStudy,
  UserProfile,
  supabase
} from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminOverviewPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Authentication States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState<'Admin' | 'Recruiter' | 'Consultant'>('Consultant');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Database Data States
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [chatConversations, setChatConversations] = useState<any[]>([]);
  const [chatLeads, setChatLeads] = useState<any[]>([]);

  // Health and Loading States
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(null);

  // 1. Check Authentication & Load Profile on Mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      if (supabase) {
        try {
          const { data: { session: curSess } } = await supabase.auth.getSession();
          setSession(curSess);
          if (curSess) {
            const profile = await db.getUserProfile(curSess.user.id);
            if (profile) {
              if (!profile.is_active) {
                await supabase.auth.signOut();
                router.push(`/${locale}/admin/login`);
                return;
              }
              setUserRole(profile.role);
              setUserProfile(profile);
            } else {
              const defProfile = await db.saveUserProfile(curSess.user.id, curSess.user.email || '', 'Consultant');
              setUserRole(defProfile.role);
              setUserProfile(defProfile);
            }
          } else {
            router.push(`/${locale}/admin/login`);
          }
        } catch (err) {
          console.error('Auth verification error:', err);
        }
      } else {
        const mockAuth = localStorage.getItem('hypercode_admin_mock_auth');
        if (mockAuth) {
          const parsed = JSON.parse(mockAuth);
          setSession({ user: { email: parsed.email } });
          setUserRole(parsed.role);
          setUserProfile(parsed);
        } else {
          router.push(`/${locale}/admin/login`);
        }
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, [locale, router]);

  // 2. Fetch Data
  useEffect(() => {
    if (!session) return;

    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [
          inqs,
          cons,
          apps,
          cands,
          subs,
          arts,
          studies,
          convs,
          cLeads
        ] = await Promise.all([
          db.getAllContactInquiries(),
          db.getAllConsultations(),
          db.getAllJobApplications(),
          db.getAllCandidates(),
          db.getNewsletterSubscribers(),
          db.getAllArticles(),
          db.getAllCaseStudies(),
          db.getAllChatConversations().catch(() => []),
          db.getAllChatLeads().catch(() => [])
        ]);

        setInquiries(inqs);
        setConsultations(cons);
        setApplications(apps);
        setCandidates(cands);
        setSubscribers(subs);
        setArticles(arts);
        setCaseStudies(studies);
        setChatConversations(convs);
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
            setHealthReport(healthData);
          }
        } catch (healthErr) {
          console.error('Failed to load database health report:', healthErr);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [session, userRole]);

  if (authLoading || (session && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F4C81]"></div>
      </div>
    );
  }

  // Calculate Unified Totals
  const totalLeads = inquiries.length + chatLeads.length;
  // Consultation requests include both standard page forms and chatbot consultations
  const totalConsultations = consultations.length;

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-600 font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Resumen General' : 'Admin Overview'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {locale === 'es' ? 'Resumen general de operaciones de HyperCode' : 'HyperCode central operational dashboard'}
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
            {/* KPI Counts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Leads */}
              <div onClick={() => router.push(`/admin/leads`)} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
                  <div className="p-1.5 rounded-lg bg-blue-50 text-[#0F4C81]">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{totalLeads}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#0F4C81] flex items-center font-semibold">
                    {locale === 'es' ? 'Ver todos' : 'View all'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              {/* Consultations */}
              <div onClick={() => router.push(`/admin/consultations`)} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultations</span>
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{totalConsultations}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-600 flex items-center font-semibold">
                    {locale === 'es' ? 'Ver todas' : 'View all'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              {/* Chat Conversations */}
              <div onClick={() => router.push(`/admin/conversations`)} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chat Sessions</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{chatConversations.length}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 flex items-center font-semibold">
                    {locale === 'es' ? 'Ver chats' : 'View sessions'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

              {/* Newsletter Subscribers */}
              <div onClick={() => router.push(`/admin/newsletter`)} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between h-28 cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscribers</span>
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{subscribers.filter(s => s.status === 'subscribed').length}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-purple-600 flex items-center font-semibold">
                    {locale === 'es' ? 'Ver lista' : 'View list'} <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-KPI CMS and Talent Pool */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div onClick={() => router.push(`/admin/careers`)} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex items-center justify-between cursor-pointer group">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Applications</h4>
                  <span className="text-2xl font-bold text-slate-800 mt-2 block">{applications.length}</span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">CMS Articles</h4>
                  <span className="text-2xl font-bold text-slate-800 mt-2 block">{articles.length}</span>
                </div>
                <div className="p-3 bg-blue-50 text-[#0F4C81] rounded-2xl">
                  <Globe className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Case Studies</h4>
                  <span className="text-2xl font-bold text-slate-800 mt-2 block">{caseStudies.length}</span>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Activity Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
              {/* Recent leads table */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Leads & Inquiries</h3>
                  <button onClick={() => router.push(`/admin/leads`)} className="text-xs font-bold text-[#0F4C81] hover:underline flex items-center gap-1 cursor-pointer">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiries.slice(0, 4).map((lead: any, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{lead.full_name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lead.email}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-slate-150 text-slate-600'
                      }`}>
                        {lead.status || 'New'}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-xs text-slate-400 py-4 text-center">No contact inquiries registered yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Applicants */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Job Applicants</h3>
                  <button onClick={() => router.push(`/admin/careers`)} className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{app.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{app.position}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        app.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-slate-150 text-slate-600'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-xs text-slate-400 py-4 text-center">No career applications submitted yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
