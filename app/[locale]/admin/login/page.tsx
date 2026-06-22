'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { supabase, db } from '@/lib/db';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError(locale === 'es' ? 'Por favor complete todos los campos.' : 'Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      if (supabase) {
        // Live Supabase Auth
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }

        if (data?.user) {
          // Fetch profile and check role & status
          const profile = await db.getUserProfile(data.user.id);
          
          if (!profile) {
            // Auto create default profile if not exists (fallback)
            const defProfile = await db.saveUserProfile(data.user.id, data.user.email || email, 'Consultant');
            router.push(`/${locale}/admin`);
          } else if (!profile.is_active) {
            setError(locale === 'es' ? 'Su cuenta ha sido desactivada. Póngase en contacto con el administrador.' : 'Your account has been deactivated. Please contact an admin.');
            await supabase.auth.signOut();
          } else {
            // User is active and has a valid role
            router.push(`/${locale}/admin`);
          }
        }
      } else {
        // Fallback Mock Local Auth
        const mockRole = email.includes('recruiter') ? 'Recruiter' : email.includes('consultant') ? 'Consultant' : 'Admin';
        const mockUser = {
          email,
          role: mockRole,
          name: email.split('@')[0],
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
          is_active: true
        };
        localStorage.setItem('hypercode_admin_mock_auth', JSON.stringify(mockUser));
        router.push(`/${locale}/admin`);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl p-8 space-y-8 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F4C81]"></div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-[#0F4C81] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {locale === 'es' ? 'Portal de Administración' : 'Admin Portal'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {locale === 'es' ? 'Ingrese sus credenciales de HyperCode' : 'Sign in to access your HyperCode dashboard'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-left flex items-start gap-2.5 animate-fadeIn">
            <span className="font-semibold">{locale === 'es' ? 'Error:' : 'Error:'}</span>
            <span className="flex-1">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block text-left">
              {locale === 'es' ? 'Correo Electrónico' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="admin@hypercode.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block text-left">
              {locale === 'es' ? 'Contraseña' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 focus:border-[#0F4C81] transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{locale === 'es' ? 'Iniciando sesión...' : 'Signing in...'}</span>
              </>
            ) : (
              <>
                <span>{locale === 'es' ? 'Iniciar Sesión' : 'Sign In'}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
