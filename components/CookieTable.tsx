'use client';

import { useTranslations } from 'next-intl';

export function CookieTable() {
  const t = useTranslations('CookiePolicy');

  const cookiesList = [
    {
      name: 'cookieConsent',
      purpose: t('tableConsentPurpose'),
      duration: '180 days',
      type: t('tableTypeNecessary'),
      provider: 'HyperCode',
    },
    {
      name: 'language',
      purpose: t('tableLanguagePurpose'),
      duration: '1 year',
      type: t('tableTypeFunctional'),
      provider: 'HyperCode',
    },
    {
      name: '_ga',
      purpose: t('tableGaPurpose'),
      duration: '2 years',
      type: t('tableTypeAnalytics'),
      provider: 'Google',
    },
    {
      name: '_gid',
      purpose: t('tableGidPurpose'),
      duration: '24 hours',
      type: t('tableTypeAnalytics'),
      provider: 'Google',
    },
    {
      name: '_clck / _clsk',
      purpose: t('tableClarityPurpose'),
      duration: '1 year',
      type: t('tableTypeAnalytics'),
      provider: 'Microsoft',
    },
    {
      name: 'UserMatchHistory',
      purpose: t('tableLinkedInPurpose'),
      duration: '30 days',
      type: t('tableTypeMarketing'),
      provider: 'LinkedIn',
    },
    {
      name: '_fbp',
      purpose: t('tableMetaPurpose'),
      duration: '90 days',
      type: t('tableTypeMarketing'),
      provider: 'Meta',
    },
  ];

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white my-6">
      <table className="w-full text-left border-collapse text-slate-700 text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4">{t('tableHeaderCookie')}</th>
            <th className="px-6 py-4">{t('tableHeaderPurpose')}</th>
            <th className="px-6 py-4">{t('tableHeaderDuration')}</th>
            <th className="px-6 py-4">{t('tableHeaderType')}</th>
            <th className="px-6 py-4">{t('tableHeaderProvider')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium">
          {cookiesList.map((cookie, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{cookie.name}</td>
              <td className="px-6 py-4 text-slate-500 leading-relaxed max-w-xs sm:max-w-md">{cookie.purpose}</td>
              <td className="px-6 py-4 text-slate-400 text-xs">{cookie.duration}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                  cookie.type === 'Necessary' || cookie.type === 'Necesaria' || cookie.type === 'Estrictamente necesarias'
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : cookie.type === 'Functional' || cookie.type === 'Funcional' || cookie.type === 'Funcionales'
                    ? 'bg-purple-50 text-purple-700 border border-purple-100'
                    : cookie.type === 'Analytics' || cookie.type === 'Analítica' || cookie.type === 'De analítica'
                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                    : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                  {cookie.type}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-900 font-bold">{cookie.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
