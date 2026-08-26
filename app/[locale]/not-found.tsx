'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HelpCircle } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const params = useParams();
  const locale = params?.locale as string || 'en';

  return (
    <main className="relative w-full bg-white text-left min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="flex-1 flex items-center justify-center py-32 bg-slate-50">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-royal-blue/10 border border-royal-blue/20 flex items-center justify-center text-royal-blue mx-auto">
            <HelpCircle size={32} />
          </div>
          
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('title')}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-7 bg-royal-blue hover:bg-[#0c3c66] text-white text-button rounded-xl transition-colors duration-200 shadow-sm"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
