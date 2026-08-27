'use client';

import { useTranslations } from 'next-intl';

const PARTNERS = [
  { name: 'Microsoft', typeKey: 'microsoftType' },
  { name: 'Azure', typeKey: 'azureType' },
  { name: 'AWS', typeKey: 'awsType' },
  { name: 'Snowflake', typeKey: 'snowflakeType' },
  { name: 'Databricks', typeKey: 'databricksType' },
  { name: 'Tableau', typeKey: 'tableauType' },
] as const;

export function TechPartnersSection() {
  const t = useTranslations('HomepageRedesign.TechPartners');

  return (
    <div className="bg-white border-b border-slate-200/70">
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 lg:pt-14 pb-8 sm:pb-10">
        <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-slate-400">
          {t('eyebrow')}
        </p>
        <ul
          className="mt-4 sm:mt-5 flex flex-wrap items-baseline gap-x-1 gap-y-2 sm:gap-x-2"
          aria-label={t('eyebrow')}
        >
          {PARTNERS.map((partner, index) => (
            <li key={partner.name} className="inline-flex items-baseline gap-1.5 sm:gap-2 min-w-0">
              {index > 0 ? (
                <span className="text-slate-300 select-none pr-1 sm:pr-2" aria-hidden="true">
                  /
                </span>
              ) : null}
              <span className="text-[0.8125rem] sm:text-sm font-semibold tracking-tight text-slate-800 whitespace-normal">
                {partner.name}
              </span>
              <span className="text-[0.6875rem] sm:text-xs font-medium text-slate-400 whitespace-normal">
                {t(partner.typeKey)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
