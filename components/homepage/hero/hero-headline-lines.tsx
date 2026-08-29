'use client';

import { ReactNode } from 'react';

/**
 * Builds 3–4 editorial headline lines from existing translation keys
 * without modifying translation files.
 */
export function buildHeroHeadlineLines(
  headlineLine1: string,
  headlineGradient: string,
): ReactNode[] {
  const part1 = headlineLine1.trim();
  const part2 = headlineGradient.trim();

  // EN: "Engineering Digital Systems That Move" + "Businesses Forward"
  if (part1.endsWith('That Move') && part2.includes(' ')) {
    const [mid, accent] = part2.split(/\s+/);
    return [
      part1.replace(/\s+That Move$/, ''),
      <>That Move {mid}</>,
      <span className="text-[#25B5FF]">{accent}</span>,
    ];
  }

  // ES: "...Que Impulsan el" + "Avance Empresarial"
  if (part1.endsWith(' el') && part2.includes(' ')) {
    const [mid, accent] = part2.split(/\s+/);
    const lead = part1.replace(/\s+Que Impulsan el$/, '');
    return [lead, <>Que Impulsan el {mid}</>, <span className="text-[#25B5FF]">{accent}</span>];
  }

  // Fallback — two lines, accent on second phrase last word
  const words = part2.split(/\s+/);
  if (words.length > 1) {
    const accent = words.pop();
    return [part1, <>{words.join(' ')} <span className="text-[#25B5FF]">{accent}</span></>];
  }

  return [part1, <span className="text-[#25B5FF]">{part2}</span>];
}
