/**
 * Verified HyperCode metrics used for trust-section count-up stats.
 * Values align with SolutionsPage.stats and About.stats in messages/*.json.
 */
export type TrustMetricSuffix = '+' | '%';

export type TrustMetric = {
  id: 'projects' | 'retention' | 'experience';
  target: number;
  suffix: TrustMetricSuffix;
  labelKey: `stats.${TrustMetric['id']}.label`;
};

export const TRUST_METRICS: TrustMetric[] = [
  {
    id: 'projects',
    target: 150,
    suffix: '+',
    labelKey: 'stats.projects.label',
  },
  {
    id: 'retention',
    target: 99,
    suffix: '%',
    labelKey: 'stats.retention.label',
  },
  {
    id: 'experience',
    target: 12,
    suffix: '+',
    labelKey: 'stats.experience.label',
  },
];
