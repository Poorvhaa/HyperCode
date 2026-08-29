export const STAGE_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

export type StageNumber = (typeof STAGE_NUMBERS)[number];

export const STAGE_COUNT = STAGE_NUMBERS.length;

/** @deprecated Use STAGE_COUNT — kept for orbital visual geometry helpers */
export const CAPABILITY_IDS = ['ai', 'cloud', 'data', 'software', 'automation', 'talent'] as const;

export type CapabilityId = (typeof CAPABILITY_IDS)[number];

export const CAPABILITY_COUNT = STAGE_COUNT;

export function getActiveStageIndex(scrollProgress: number): number {
  if (scrollProgress >= 1) return STAGE_COUNT - 1;
  return Math.min(STAGE_COUNT - 1, Math.floor(scrollProgress * STAGE_COUNT));
}

/** @deprecated Use getActiveStageIndex */
export const getActiveCapabilityIndex = getActiveStageIndex;

/** Orbital positions around the central core (Y-up, XZ plane with depth) */
export function getCapabilityPosition(index: number, radius = 2.15): [number, number, number] {
  const angle = (index / CAPABILITY_COUNT) * Math.PI * 2 - Math.PI / 2;
  const y = Math.sin(index * 1.05) * 0.28;
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}

/** Normalized 2D positions for SVG fallback (0–1 space) */
export function getCapabilityPosition2D(index: number): { x: number; y: number } {
  const roundCoord = (n: number) => Math.round(n * 100) / 100;
  const angle = (index / CAPABILITY_COUNT) * Math.PI * 2 - Math.PI / 2;
  const r = 0.36;
  return {
    x: roundCoord(0.5 + Math.cos(angle) * r),
    y: roundCoord(0.5 + Math.sin(angle) * r),
  };
}

export function getNodeProgress(scrollProgress: number, index: number): number {
  const raw = scrollProgress * CAPABILITY_COUNT - index;
  return Math.min(1, Math.max(0, raw));
}

export function getAllNodeProgress(scrollProgress: number): number[] {
  return CAPABILITY_IDS.map((_, i) => getNodeProgress(scrollProgress, i));
}
