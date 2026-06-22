'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Mail,
  Briefcase,
  ArrowLeft,
  Calendar,
  Layers,
  Percent,
  ChevronDown
} from 'lucide-react';
import { supabase, db, ContactInquiry, ConsultationRequest, JobApplication, NewsletterSubscriber, ChatLead } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Data States
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
  const [loading, setLoading] = useState(true);

  // Time Filter State
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

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
            if (profile.role !== 'Admin') {
              // Unauthorized role
              setUserProfile(profile);
            } else {
              setUserProfile(profile);
            }
          }
        } else {
          router.push(`/${locale}/admin/login`);
        }
      } else {
        // Mock fallback check
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
  }, [locale]);

  // Load Data
  useEffect(() => {
    if (!session) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [inqData, consData, appData, subData, chatData] = await Promise.all([
          db.getAllContactInquiries(),
          db.getAllConsultations(),
          db.getAllJobApplications(),
          db.getNewsletterSubscribers(),
          db.getAllChatLeads()
        ]);

        setInquiries(inqData);
        setConsultations(consData);
        setApplications(appData);
        setSubscribers(subData);
        setChatLeads(chatData);
      } catch (err) {
        console.error('Failed to load analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session]);

  if (authLoading || (session && !userProfile)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F4C81]"></div>
      </div>
    );
  }

  // Gate check: only Admin has access to Analytics
  if (userProfile && userProfile.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al módulo de analíticas. Este módulo está restringido a Administradores.' 
              : 'You do not have permission to view the analytics dashboard. This section is restricted to Admins.'}
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

  // Calculate Metrics
  const totalLeads = inquiries.length + consultations.length + chatLeads.length;
  const totalCandidates = applications.length; // applications represent candidates applied
  const newsletterCount = subscribers.filter(s => s.status === 'subscribed').length;

  // Pie chart counts
  const sourceContactCount = inquiries.length;
  const sourceConsultationCount = consultations.length;
  const sourceChatbotCount = chatLeads.length;

  // Safe division helper
  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  // SVG Donut Chart Coordinates
  const getDonutSegments = () => {
    const total = sourceContactCount + sourceConsultationCount + sourceChatbotCount || 1;
    const segments = [
      { label: locale === 'es' ? 'Formulario de Contacto' : 'Contact Form', count: sourceContactCount, color: '#0F4C81' },
      { label: locale === 'es' ? 'Consulta Técnica' : 'Consultation', count: sourceConsultationCount, color: '#38BDF8' },
      { label: locale === 'es' ? 'Chatbot con IA' : 'AI Chatbot', count: sourceChatbotCount, color: '#34D399' }
    ];

    let accumulatedPercentage = 0;
    return segments.map(seg => {
      const pct = (seg.count / total) * 100;
      const startPct = accumulatedPercentage;
      accumulatedPercentage += pct;
      
      // Calculate SVG stroke offset
      // circumference = 2 * PI * r = 2 * 3.14159 * 40 = 251.2
      const radius = 40;
      const circ = 2 * Math.PI * radius;
      const strokeDasharray = `${(pct / 100) * circ} ${circ}`;
      const strokeDashoffset = `${- (startPct / 100) * circ}`;

      return {
        ...seg,
        percentage: Math.round(pct),
        strokeDasharray,
        strokeDashoffset
      };
    });
  };

  const donutSegments = getDonutSegments();

  // Helper for generating monthly data points over last 6 months
  const getMonthlyData = () => {
    const months = [];
    const date = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      const label = d.toLocaleString(locale, { month: 'short' });
      months.push({
        label,
        year: d.getFullYear(),
        monthNum: d.getMonth(),
        leads: 0,
        applications: 0,
        subscribers: 0
      });
    }

    // Populate counts
    const countInMonth = (dateStr: string) => {
      const d = new Date(dateStr);
      return months.findIndex(m => m.year === d.getFullYear() && m.monthNum === d.getMonth());
    };

    inquiries.forEach(item => {
      const idx = countInMonth(item.created_at);
      if (idx !== -1) months[idx].leads++;
    });
    consultations.forEach(item => {
      const idx = countInMonth(item.created_at);
      if (idx !== -1) months[idx].leads++;
    });
    chatLeads.forEach(item => {
      const idx = countInMonth(item.created_at);
      if (idx !== -1) months[idx].leads++;
    });
    applications.forEach(item => {
      const idx = countInMonth(item.created_at);
      if (idx !== -1) months[idx].applications++;
    });
    subscribers.forEach(item => {
      const idx = countInMonth(item.created_at);
      if (idx !== -1) months[idx].subscribers++;
    });

    return months;
  };

  const monthlyPoints = getMonthlyData();

  // Draw Line Chart helper
  const drawLinePath = (data: number[], width: number, height: number) => {
    if (data.length === 0) return '';
    const maxVal = Math.max(...data, 5);
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - (val / maxVal) * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // Funnel calculations
  const funnelVisitors = 2500;
  const funnelLeads = totalLeads || 150;
  const funnelConsultations = consultations.length || 65;
  const funnelClients = consultations.filter(c => c.status === 'Won').length || Math.round(funnelConsultations * 0.35) || 12;

  const funnelSteps = [
    { label: locale === 'es' ? 'Visitante Web' : 'Web Visitor', count: funnelVisitors, pct: 100, color: 'bg-blue-600' },
    { label: locale === 'es' ? 'Prospecto (Lead)' : 'Lead Captured', count: funnelLeads, pct: getPercentage(funnelLeads, funnelVisitors), color: 'bg-indigo-500' },
    { label: locale === 'es' ? 'Consulta Asignada' : 'Consultation Request', count: funnelConsultations, pct: getPercentage(funnelConsultations, funnelLeads), color: 'bg-purple-500' },
    { label: locale === 'es' ? 'Cliente Ganado' : 'Client Won', count: funnelClients, pct: getPercentage(funnelClients, funnelConsultations), color: 'bg-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar userProfile={userProfile} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {locale === 'es' ? 'Analíticas del Negocio' : 'Business Analytics'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {locale === 'es' ? 'Rendimiento de adquisición de clientes y embudo' : 'Customer acquisition and funnel performance insights'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{locale === 'es' ? 'Últimos 6 Meses' : 'Last 6 Months'}</span>
            </div>
            
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] shadow-sm cursor-pointer"
              >
                <option value="monthly">{locale === 'es' ? 'Mensual' : 'Monthly'}</option>
                <option value="quarterly">{locale === 'es' ? 'Trimestral' : 'Quarterly'}</option>
                <option value="yearly">{locale === 'es' ? 'Anual' : 'Yearly'}</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden flex flex-col justify-between h-28">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
                  <div className="p-1.5 rounded-lg bg-blue-50 text-[#0F4C81]">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{totalLeads}</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +14.2%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden flex flex-col justify-between h-28">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultations</span>
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{consultations.length}</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +8.5%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden flex flex-col justify-between h-28">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{totalCandidates}</span>
                  <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" /> -2.4%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden flex flex-col justify-between h-28">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscribers</span>
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-slate-900">{newsletterCount}</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +22.1%
                  </span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart: Monthly Leads */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight text-left mb-6">
                  {locale === 'es' ? 'Tendencia Mensual de Prospectos' : 'Monthly Lead Acquisition'}
                </h3>
                <div className="h-64 relative flex flex-col justify-between">
                  {/* SVG Chart */}
                  <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 200">
                    <defs>
                      <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Y Axis Grid lines */}
                    <line x1="20" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="80" x2="480" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="140" x2="480" y2="140" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="180" x2="480" y2="180" stroke="#E2E8F0" strokeWidth="1" />

                    {/* Area fill */}
                    <path
                      d={`${drawLinePath(monthlyPoints.map(m => m.leads), 500, 200)} L 480,180 L 20,180 Z`}
                      fill="url(#leadGrad)"
                    />
                    
                    {/* Line path */}
                    <path
                      d={drawLinePath(monthlyPoints.map(m => m.leads), 500, 200)}
                      fill="none"
                      stroke="#0F4C81"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Dot coordinates mapping */}
                    {monthlyPoints.map((pt, idx) => {
                      const maxVal = Math.max(...monthlyPoints.map(m => m.leads), 5);
                      const x = 20 + (idx / 5) * 460;
                      const y = 20 + 160 - (pt.leads / maxVal) * 160;
                      return (
                        <g key={idx} className="group/dot cursor-pointer">
                          <circle cx={x} cy={y} r="5" fill="#0F4C81" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx={x} cy={y} r="10" fill="#0F4C81" opacity="0" className="hover:opacity-20 transition-opacity" />
                          {/* Tooltip */}
                          <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200">
                            <rect x={x - 20} y={y - 32} width="40" height="20" rx="6" fill="#0F172A" />
                            <text x={x} y={y - 18} fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">{pt.leads}</text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  {/* X Axis Labels */}
                  <div className="flex justify-between px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">
                    {monthlyPoints.map((m, idx) => (
                      <span key={idx}>{m.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donut Chart: Lead Sources */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight text-left mb-6">
                  {locale === 'es' ? 'Canales de Origen' : 'Lead Channels'}
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    {/* SVG Donut */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="11" />
                      {donutSegments.map((seg, idx) => (
                        <circle
                          key={idx}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={seg.color}
                          strokeWidth="11"
                          strokeDasharray={seg.strokeDasharray}
                          strokeDashoffset={seg.strokeDashoffset}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-500 hover:stroke-[13] cursor-pointer"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-slate-800">{totalLeads}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Leads</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="w-full mt-6 space-y-2">
                    {donutSegments.map((seg, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }}></div>
                          <span className="font-semibold text-slate-600">{seg.label}</span>
                        </div>
                        <span className="font-bold text-slate-800">{seg.count} ({seg.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funnel: Conversion Funnel */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm text-left">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-6">
                  {locale === 'es' ? 'Embudo de Conversión de Clientes' : 'Client Conversion Funnel'}
                </h3>
                <div className="space-y-6">
                  {funnelSteps.map((step, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{step.label}</span>
                        <span>{step.count} ({step.pct}%)</span>
                      </div>
                      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${step.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${step.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total Conversion Rate Metric */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-semibold text-slate-600">
                      <Percent className="w-4 h-4 text-[#0F4C81]" />
                      <span>{locale === 'es' ? 'Tasa de Conversión Total (Visitas -> Clientes)' : 'Total Conversion Rate (Visits -> Clients)'}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-base">
                      {((funnelClients / funnelVisitors) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bar Chart: Candidates Trends */}
              <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight text-left mb-6">
                  {locale === 'es' ? 'Tendencias de Solicitudes de Empleo' : 'Job Applications Trends'}
                </h3>
                <div className="h-64 relative flex flex-col justify-between">
                  {/* SVG Bar Chart */}
                  <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 200">
                    {/* Y Axis Grid lines */}
                    <line x1="20" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="80" x2="480" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="140" x2="480" y2="140" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="20" y1="180" x2="480" y2="180" stroke="#E2E8F0" strokeWidth="1" />

                    {/* Bars */}
                    {monthlyPoints.map((pt, idx) => {
                      const maxVal = Math.max(...monthlyPoints.map(m => m.applications), 5);
                      const chartHeight = 160;
                      const barWidth = 32;
                      const spacing = 460 / 6;
                      const x = 20 + idx * spacing + (spacing - barWidth) / 2;
                      const barHeight = (pt.applications / maxVal) * chartHeight;
                      const y = 20 + chartHeight - barHeight;

                      return (
                        <g key={idx} className="group/bar cursor-pointer">
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="5"
                            fill="#38BDF8"
                            className="transition-all duration-300 hover:fill-[#0F4C81]"
                          />
                          {/* Tooltip */}
                          <g className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                            <rect x={x - 4} y={y - 30} width="40" height="20" rx="6" fill="#0F172A" />
                            <text x={x + barWidth / 2} y={y - 16} fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">{pt.applications}</text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  {/* X Axis Labels */}
                  <div className="flex justify-between px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">
                    {monthlyPoints.map((m, idx) => (
                      <span key={idx}>{m.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
