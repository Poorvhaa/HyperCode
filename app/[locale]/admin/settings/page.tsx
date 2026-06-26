'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Settings, Mail, Shield, User, X, AlertCircle, Save, CheckCircle, Globe } from 'lucide-react';
import { supabase, db, CompanySettings, EmailTemplate, UserProfile } from '@/lib/db';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Auth States
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<'Admin' | 'Recruiter' | 'Consultant'>('Consultant');

  // Data States
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthReport, setHealthReport] = useState<any>(null);

  // Settings Sub-tab: 'company' | 'templates' | 'users'
  const [settingsSubTab, setSettingsSubTab] = useState<'company' | 'templates' | 'users'>('company');

  // Settings Form States
  const [settingsName, setSettingsName] = useState('');
  const [settingsEmail, setSettingsEmail] = useState('');
  const [settingsPhone, setSettingsPhone] = useState('');
  const [settingsAddress, setSettingsAddress] = useState('');
  const [settingsLinkedin, setSettingsLinkedin] = useState('');
  const [settingsGithub, setSettingsGithub] = useState('');

  // Notification Banner
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const showNotification = (type: 'success' | 'error', msg: string) => {
    setNotification({ type, message: msg });
    setTimeout(() => setNotification(null), 4000);
  };

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
            setUserRole(profile.role);
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

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [settings, templates, profiles] = await Promise.all([
        db.getCompanySettings(),
        db.getEmailTemplates(),
        db.getAllUserProfiles()
      ]);

      setCompanySettings(settings);
      setSettingsName(settings.company_name);
      setSettingsEmail(settings.email);
      setSettingsPhone(settings.phone || '');
      setSettingsAddress(settings.address || '');
      setSettingsLinkedin(settings.social_links?.linkedin || '');
      setSettingsGithub(settings.social_links?.github || '');

      setEmailTemplates(templates);
      setUserProfiles(profiles);

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
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.saveCompanySettings({
        company_name: settingsName,
        email: settingsEmail,
        phone: settingsPhone,
        address: settingsAddress,
        social_links: { linkedin: settingsLinkedin, github: settingsGithub }
      });
      showNotification('success', 'Company profile settings saved.');
      await loadData();
    } catch (err) {
      showNotification('error', 'Failed to save settings.');
    }
  };

  const handleSaveTemplate = async (id: string, subject: string, body: string) => {
    try {
      await db.saveEmailTemplate(id, subject, body);
      showNotification('success', 'Email template saved.');
      await loadData();
    } catch (err) {
      showNotification('error', 'Failed to save email template.');
    }
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
              ? 'No tiene permisos para acceder a la configuración del portal.' 
              : 'You do not have permission to manage administration configurations.'}
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

      <main className="flex-1 p-8 space-y-6 overflow-x-hidden relative text-left">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure company profiles, email automation templates, and admin accounts</p>
        </div>

        {notification && (
          <div className={`p-4 rounded-xl flex items-start gap-2.5 border text-xs leading-relaxed ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{notification.message}</span>
          </div>
        )}

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
            {/* Sub-tabs selectors */}
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => { setSettingsSubTab('company'); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'company' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                Company Profile
              </button>
              <button
                onClick={() => { setSettingsSubTab('templates'); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'templates' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                Email Templates
              </button>
              <button
                onClick={() => { setSettingsSubTab('users'); }}
                className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  settingsSubTab === 'users' ? 'border-[#0F4C81] text-[#0F4C81]' : 'border-transparent text-slate-400'
                }`}
              >
                User Accounts ({userProfiles.length})
              </button>
            </div>

            {/* TAB: COMPANY SETTINGS */}
            {settingsSubTab === 'company' && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl">
                <form onSubmit={handleSaveSettings} className="p-6 space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Settings className="w-4.5 h-4.5 text-[#0F4C81]" />
                    Company Settings
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">Company Name</label>
                      <input type="text" required value={settingsName} onChange={(e) => setSettingsName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">Business Email</label>
                      <input type="email" required value={settingsEmail} onChange={(e) => setSettingsEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">Business Phone</label>
                      <input type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">Office Address</label>
                      <input type="text" value={settingsAddress} onChange={(e) => setSettingsAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">LinkedIn Link</label>
                      <input type="text" value={settingsLinkedin} onChange={(e) => setSettingsLinkedin(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-450 font-bold mb-1 uppercase tracking-wider text-[10px]">GitHub Link</label>
                      <input type="text" value={settingsGithub} onChange={(e) => setSettingsGithub(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button type="submit" className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm">
                      <Save className="w-4 h-4" />
                      <span>Save Company Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: EMAIL TEMPLATES */}
            {settingsSubTab === 'templates' && (
              <div className="space-y-6 max-w-3xl">
                {emailTemplates.map(tpl => (
                  <div key={tpl.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <TemplateEditorForm tpl={tpl} onSave={handleSaveTemplate} />
                  </div>
                ))}
              </div>
            )}

            {/* TAB: USER ACCOUNTS */}
            {settingsSubTab === 'users' && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-3xl">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5 text-[#0F4C81]" />
                    Admin Portal User Accounts
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">User Account</th>
                        <th className="py-4 px-6">Role Privilege</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Created Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {userProfiles.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400 font-bold uppercase border border-slate-250">
                              {u.avatar ? <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className="flex flex-col">
                              <span>{u.name || 'Anonymous User'}</span>
                              <span className="text-[10px] text-slate-400 font-normal mt-0.5">{u.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[9px] font-bold uppercase">
                              <Shield className="w-3 h-3 text-blue-500" />
                              {u.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                              u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {u.is_active ? 'Active' : 'Deactivated'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-400">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Inner helper component for Email Template forms to isolate state
function TemplateEditorForm({ tpl, onSave }: { tpl: EmailTemplate; onSave: (id: string, subject: string, body: string) => Promise<void> }) {
  const [subject, setSubject] = useState(tpl.subject);
  const [body, setBody] = useState(tpl.body);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(tpl.id, subject, body);
    setSaving(false);
  };

  const getTemplateTitle = (id: string) => {
    switch (id) {
      case 'contact': return 'Website Contact Form Receipt Email';
      case 'consultation': return 'Technology Consultation Request Receipt Email';
      case 'application': return 'Candidate Job Application Receipt Email';
      case 'newsletter': return 'Newsletter Welcome Subscriber Email';
      default: return `Email template: ${id}`;
    }
  };

  return (
    <form onSubmit={handleSave} className="p-6 space-y-4 text-xs text-left">
      <h4 className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-2 flex items-center gap-2">
        <Mail className="w-4 h-4 text-slate-400" />
        {getTemplateTitle(tpl.id)}
      </h4>
      <div>
        <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Email Subject Line</label>
        <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 font-medium focus:outline-none" />
      </div>
      <div>
        <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">Email Content Body</label>
        <textarea required rows={5} value={body} onChange={(e) => setBody(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none" />
        <span className="text-[10px] text-slate-400 mt-1 block">Variables like <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{name}}"}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{subject}}"}</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{position}}"}</code>, or <code className="bg-slate-100 px-1 py-0.5 rounded">{"{{budget}}"}</code> will be dynamically replaced on dispatch.</span>
      </div>
      <div className="flex justify-end pt-1">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-75">
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Template'}</span>
        </button>
      </div>
    </form>
  );
}
