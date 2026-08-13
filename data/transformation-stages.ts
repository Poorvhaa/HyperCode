export type TransformationStage = {
  id: string;
  progressStart: number;
  progressEnd: number;
  translationKey: string;
  metrics: Array<{
    labelKey: string;
    value: string;
  }>;
};

export const transformationStages: TransformationStage[] = [
  {
    id: 'chaos',
    progressStart: 0.00,
    progressEnd: 0.16,
    translationKey: 's1',
    metrics: [
      { labelKey: 'excelManual', value: 'Excel' },
      { labelKey: 'emailsManual', value: 'Emails' },
      { labelKey: 'disconnectedSilos', value: 'Siloed' }
    ]
  },
  {
    id: 'discovery',
    progressStart: 0.16,
    progressEnd: 0.33,
    translationKey: 's2',
    metrics: [
      { labelKey: 'aiScan', value: 'Scanning' },
      { labelKey: 'workflowsMapped', value: 'Mapped' },
      { labelKey: 'bottlenecksFound', value: 'Identified' }
    ]
  },
  {
    id: 'engineering',
    progressStart: 0.33,
    progressEnd: 0.50,
    translationKey: 's3',
    metrics: [
      { labelKey: 'typescriptCode', value: 'React/TS' },
      { labelKey: 'apiReconnect', value: 'Connected' },
      { labelKey: 'dbAssembly', value: 'Assembled' }
    ]
  },
  {
    id: 'deployment',
    progressStart: 0.50,
    progressEnd: 0.66,
    translationKey: 's4',
    metrics: [
      { labelKey: 'cloudClusters', value: 'Global' },
      { labelKey: 'cicdPipeline', value: 'Passed' },
      { labelKey: 'infraScale', value: 'Scaling' }
    ]
  },
  {
    id: 'transformation',
    progressStart: 0.66,
    progressEnd: 0.83,
    translationKey: 's5',
    metrics: [
      { labelKey: 'opsSpeed', value: '42%' },
      { labelKey: 'decisionSpeed', value: '2.4x' },
      { labelKey: 'automationFlow', value: 'Continuous' }
    ]
  },
  {
    id: 'growth',
    progressStart: 0.83,
    progressEnd: 1.00,
    translationKey: 's6',
    metrics: [
      { labelKey: 'revenueGrowth', value: '+186%' },
      { labelKey: 'manualEffort', value: '-31%' },
      { labelKey: 'uptime', value: '99.99%' }
    ]
  }
];
