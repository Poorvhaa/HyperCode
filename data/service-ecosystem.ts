import {
  Sparkles,
  Layers,
  Cpu,
  Database,
  TrendingUp,
  Brain,
  Code,
  Smartphone,
  Cloud,
  Users,
  LucideIcon
} from 'lucide-react';

export type ServiceNode = {
  id: string;
  titleKey: string;     // Translation key in Navigation or Services
  descKey: string;
  outcomeKey: string;
  href: string;
  iconName: string;
};

export const serviceNodes: ServiceNode[] = [
  {
    id: 'ai',
    titleKey: 'aiAutomation',
    descKey: 'aiDesc',
    outcomeKey: 'aiOutcome',
    href: '/solutions/ai-strategy',
    iconName: 'Sparkles'
  },
  {
    id: 'bi',
    titleKey: 'businessIntelligence',
    descKey: 'biDesc',
    outcomeKey: 'biOutcome',
    href: '/solutions/business-intelligence',
    iconName: 'Layers'
  },
  {
    id: 'data',
    titleKey: 'predictiveAnalytics',
    descKey: 'predictiveAnalyticsDesc',
    outcomeKey: 'dataOutcome',
    href: '/solutions/data-analytics',
    iconName: 'TrendingUp'
  },
  {
    id: 'software',
    titleKey: 'customApplications',
    descKey: 'customApplicationsDesc',
    outcomeKey: 'softwareOutcome',
    href: '/solutions/custom-applications',
    iconName: 'Code'
  },
  {
    id: 'web',
    titleKey: 'webDevelopment',
    descKey: 'webDevelopmentDesc',
    outcomeKey: 'webOutcome',
    href: '/solutions/web-development',
    iconName: 'Cpu'
  },
  {
    id: 'mobile',
    titleKey: 'mobileDev',
    descKey: 'mobileDevDesc',
    outcomeKey: 'mobileOutcome',
    href: '/solutions/mobile-development',
    iconName: 'Smartphone'
  },
  {
    id: 'cloud',
    titleKey: 'cloudDevOps',
    descKey: 'cloudApplicationsDesc',
    outcomeKey: 'cloudOutcome',
    href: '/solutions/cloud-applications',
    iconName: 'Cloud'
  },
  {
    id: 'digital',
    titleKey: 'digitalTransformation',
    descKey: 'digitalTransformationDesc',
    outcomeKey: 'digitalOutcome',
    href: '/solutions/digital-transformation',
    iconName: 'Brain'
  },
  {
    id: 'platforms',
    titleKey: 'dataWarehousing',
    descKey: 'dataWarehousingDesc',
    outcomeKey: 'platformOutcome',
    href: '/solutions/data-warehousing',
    iconName: 'Database'
  },
  {
    id: 'staffing',
    titleKey: 'itStaffing',
    descKey: 'itStaffingDesc',
    outcomeKey: 'staffingOutcome',
    href: '/staffing',
    iconName: 'Users'
  }
];

export const getIconComponent = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    Sparkles,
    Layers,
    TrendingUp,
    Code,
    Cpu,
    Smartphone,
    Cloud,
    Brain,
    Database,
    Users
  };
  return icons[name] || Sparkles;
};
