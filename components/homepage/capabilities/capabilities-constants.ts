import type { ServiceNode } from '@/data/service-ecosystem';
import { serviceNodes } from '@/data/service-ecosystem';

/** Flat capability order — matches existing homepage service groups */
export const CAPABILITY_ORDER = [
  'ai',
  'bi',
  'data',
  'platforms',
  'software',
  'web',
  'mobile',
  'cloud',
  'digital',
  'staffing',
] as const;

export type CapabilityVisualTheme =
  | 'automation'
  | 'analytics'
  | 'software'
  | 'cloud'
  | 'staffing';

export const VISUAL_THEME_BY_ID: Record<string, CapabilityVisualTheme> = {
  ai: 'automation',
  bi: 'analytics',
  data: 'analytics',
  platforms: 'analytics',
  software: 'software',
  web: 'software',
  mobile: 'software',
  cloud: 'cloud',
  digital: 'cloud',
  staffing: 'staffing',
};

export const CAPABILITY_SERVICES: ServiceNode[] = CAPABILITY_ORDER.map((id) => {
  const node = serviceNodes.find((n) => n.id === id);
  if (!node) throw new Error(`Missing service node: ${id}`);
  return node;
});

export function getVisualTheme(serviceId: string): CapabilityVisualTheme {
  return VISUAL_THEME_BY_ID[serviceId] ?? 'software';
}
