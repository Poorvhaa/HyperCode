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

export type CapabilityServiceId = (typeof CAPABILITY_ORDER)[number];

export const CAPABILITY_COUNT = CAPABILITY_ORDER.length;

/** @deprecated Use serviceId directly — each capability has a unique visual */
export type CapabilityVisualTheme = CapabilityServiceId;

export const CAPABILITY_SERVICES: ServiceNode[] = CAPABILITY_ORDER.map((id) => {
  const node = serviceNodes.find((n) => n.id === id);
  if (!node) throw new Error(`Missing service node: ${id}`);
  return node;
});

export function isCapabilityServiceId(id: string): id is CapabilityServiceId {
  return (CAPABILITY_ORDER as readonly string[]).includes(id);
}

export function getVisualTheme(serviceId: string): CapabilityServiceId {
  return isCapabilityServiceId(serviceId) ? serviceId : 'software';
}

/** @deprecated Use getVisualTheme */
export const VISUAL_THEME_BY_ID: Record<string, CapabilityServiceId> = Object.fromEntries(
  CAPABILITY_ORDER.map((id) => [id, id]),
) as Record<string, CapabilityServiceId>;
