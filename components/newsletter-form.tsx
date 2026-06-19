'use client';

import { useTranslations } from 'next-intl';

export function NewsletterForm() {
  const t = useTranslations('Insights');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('newsletterSuccess'));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="email"
        placeholder={t('newsletterPlaceholder')}
        required
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm font-semibold"
      />
      <button
        type="submit"
        className="h-11 px-6 bg-[#0F4C81] text-white rounded-xl font-semibold text-xs hover:bg-[#0c3c66] transition-colors duration-200 cursor-pointer border-none"
      >
        {t('newsletterButton')}
      </button>
    </form>
  );
}
