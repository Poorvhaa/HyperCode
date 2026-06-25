'use client';

import { useTransition } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Globe,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  User,
  Shield,
  MessageSquare,
  Users,
  Activity
} from 'lucide-react';
import { supabase } from '@/lib/db';

interface SidebarProps {
  userProfile: {
    name: string | null;
    email: string;
    role: 'Admin' | 'Recruiter' | 'Consultant';
    avatar: string | null;
  } | null;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
}

export default function AdminSidebar({ userProfile, activeTab, onTabChange }: SidebarProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || 'en';
  const [, startTransition] = useTransition();

  const handleLogout = async () => {
    if (confirm(locale === 'es' ? '¿Está seguro de que desea salir?' : 'Are you sure you want to log out?')) {
      if (supabase) {
        await supabase.auth.signOut();
      } else {
        localStorage.removeItem('hypercode_admin_mock_auth');
      }
      router.push(`/${locale}/admin/login`);
    }
  };

  const handleNav = (tab: string, path: string) => {
    const localTabs = ['dashboard', 'applications', 'cms', 'subscribers', 'settings'];
    if (onTabChange && pathname.endsWith('/admin') && localTabs.includes(tab)) {
      onTabChange(tab);
    } else {
      router.push(`/${locale}${path}`);
    }
  };

  const role = userProfile?.role || 'Consultant';

  const isTabActive = (tabName: string, pathName: string) => {
    if (pathname.includes(pathName)) return true;
    if (pathname.endsWith('/admin') && activeTab === tabName) return true;
    return false;
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#0F4C81] flex items-center justify-center text-white font-bold text-lg">
          H
        </div>
        <div>
          <h2 className="font-bold text-slate-800 tracking-tight text-base leading-none">HyperCode</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin Portal</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5">
        {/* Admin and Consultant Access */}
        {(role === 'Admin' || role === 'Consultant') && (
          <>
            <button
              onClick={() => handleNav('dashboard', '/admin')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.endsWith('/admin') && (!activeTab || activeTab === 'dashboard')
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{locale === 'es' ? 'Resumen' : 'Overview'}</span>
            </button>

            <button
              onClick={() => handleNav('leads', '/admin/leads')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.includes('/admin/leads')
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{locale === 'es' ? 'Prospectos (Leads)' : 'Leads'}</span>
            </button>


            <button
              onClick={() => handleNav('health', '/admin/system-health')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.includes('/admin/system-health')
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{locale === 'es' ? 'Salud del Sistema' : 'System Health'}</span>
            </button>
          </>
        )}

        {/* Admin and Recruiter Access */}
        {(role === 'Admin' || role === 'Recruiter') && (
          <button
            onClick={() => handleNav('applications', '/admin?tab=applications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              pathname.endsWith('/admin') && ['applications', 'candidates'].includes(activeTab || '')
                ? 'bg-blue-50 text-[#0F4C81]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{locale === 'es' ? 'Carreras (Careers)' : 'Careers'}</span>
          </button>
        )}

        {/* Admin Only Access */}
        {role === 'Admin' && (
          <>
            <button
              onClick={() => handleNav('cms', '/admin?tab=cms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.endsWith('/admin') && activeTab === 'cms'
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'es' ? 'Artículos CMS' : 'Content CMS'}</span>
            </button>

            <button
              onClick={() => handleNav('subscribers', '/admin?tab=subscribers')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.endsWith('/admin') && activeTab === 'subscribers'
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>{locale === 'es' ? 'Boletín (Newsletter)' : 'Newsletter'}</span>
            </button>

            <button
              onClick={() => handleNav('analytics', '/admin/analytics')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.includes('/admin/analytics')
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{locale === 'es' ? 'Analíticas' : 'Analytics'}</span>
            </button>

            <button
              onClick={() => handleNav('settings', '/admin?tab=settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.endsWith('/admin') && activeTab === 'settings'
                  ? 'bg-blue-50 text-[#0F4C81]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{locale === 'es' ? 'Configuración' : 'Settings'}</span>
            </button>
          </>
        )}
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center text-slate-500 font-bold uppercase">
            {userProfile?.avatar ? (
              <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {userProfile?.name || userProfile?.email.split('@')[0] || 'User'}
            </p>
            <div className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[9px] font-bold uppercase">
              <Shield className="w-2.5 h-2.5" />
              <span>{role}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-250 hover:bg-red-50 hover:text-red-700 rounded-xl text-xs font-semibold text-slate-600 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{locale === 'es' ? 'Cerrar Sesión' : 'Log Out'}</span>
        </button>
      </div>
    </aside>
  );
}
