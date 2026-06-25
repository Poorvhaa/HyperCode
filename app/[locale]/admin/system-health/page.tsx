'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Shield, ArrowLeft, Activity, CheckCircle, XCircle, Database, Lock, Key, AlertCircle } from 'lucide-react';
import { supabase, db, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';
import { HealthCheckReport } from '@/lib/database-health';

export default function SystemHealthPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data States
  const [healthReport, setHealthReport] = useState<HealthCheckReport | null>(null);
  const [loading, setLoading] = useState(true);

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
  const loadHealthData = async () => {
    setLoading(true);
    try {
      const token = session?.access_token || '';
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch('/api/admin/health', { headers });
      if (response.ok) {
        const data = await response.json();
        setHealthReport(data);
      } else {
        console.error('Failed to load health report. HTTP status:', response.status);
      }
    } catch (err) {
      console.error('Error fetching system health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadHealthData();
  }, [session]);

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
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800">{locale === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h2>
          <p className="text-sm text-slate-600">
            {locale === 'es' 
              ? 'No tiene permisos para acceder al diagnóstico de salud del sistema.' 
              : 'You do not have permission to view the system health diagnosis.'}
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
      <AdminSidebar userProfile={userProfile} activeTab="health" />

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative text-left">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#0F4C81]" />
              <span>{locale === 'es' ? 'Salud del Sistema' : 'System Health'}</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {locale === 'es' 
                ? 'Monitoree el estado de conexión de la base de datos Supabase, tablas, columnas y políticas RLS' 
                : 'Monitor Supabase database connection status, table existence, column schema, and RLS policies'}
            </p>
          </div>
          <button
            onClick={loadHealthData}
            disabled={loading}
            className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (locale === 'es' ? 'Actualizando...' : 'Refreshing...') : (locale === 'es' ? 'Actualizar' : 'Refresh')}
          </button>
        </div>

        {loading && !healthReport ? (
          <div className="h-[400px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81]"></div>
          </div>
        ) : healthReport ? (
          <div className="space-y-6">
            {/* Connection Card */}
            <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${healthReport.connection === 'green' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {locale === 'es' ? 'Conexión a Supabase' : 'Supabase Database Connection'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {healthReport.connection === 'green'
                      ? (locale === 'es' ? 'Conexión activa y estable' : 'Active and stable connection to REST API')
                      : (locale === 'es' ? 'Error al conectar con la base de datos' : 'Connection failed to resolve')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {healthReport.connection === 'green' ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>ONLINE</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>OFFLINE</span>
                  </span>
                )}
              </div>
            </div>

            {/* Error Message if offline */}
            {healthReport.errors.connection && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-medium">
                <AlertCircle className="w-4 h-4 inline mr-2 align-middle" />
                <span>Error details: {healthReport.errors.connection}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tables Exist Check */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {locale === 'es' ? 'Estado de Tablas' : 'Table Schema Status'}
                  </span>
                </div>
                <div className="p-4 divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                  {healthReport.tables.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-700 font-semibold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">{item.details}</span>
                        {item.status === 'green' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RLS Read Policies Check */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {locale === 'es' ? 'Acceso RLS (Lectura)' : 'RLS Read Policy Status (SELECT)'}
                  </span>
                </div>
                <div className="p-4 divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                  {healthReport.rlsRead.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-700 font-semibold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">{item.details}</span>
                        {item.status === 'green' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RLS Insert Policies Check */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Key className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {locale === 'es' ? 'Permisos de Inserción' : 'RLS Write Policy Status (INSERT)'}
                  </span>
                </div>
                <div className="p-4 divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                  {healthReport.rlsInsert.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-700 font-semibold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">{item.details}</span>
                        {item.status === 'green' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columns Check */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {locale === 'es' ? 'Validación de Columnas' : 'Database Column Validation'}
                  </span>
                </div>
                <div className="p-4 divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                  {healthReport.columns.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-750 text-[11px] font-semibold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-450 font-medium">{item.details}</span>
                        {item.status === 'green' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
            <p className="text-slate-400 text-sm">Failed to generate health report.</p>
          </div>
        )}
      </main>
    </div>
  );
}
