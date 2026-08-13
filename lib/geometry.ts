const DEFAULT_PRECISION = 1000;

export function roundGeometry(
  value: number,
  precision = DEFAULT_PRECISION
): number {
  return Math.round(value * precision) / precision;
}

export function formatGeometry(
  value: number,
  digits = 3
): string {
  return roundGeometry(value).toFixed(digits);
}

export function centerOffset(value: number): string {
  const rounded = roundGeometry(value);

  if (Object.is(rounded, -0) || rounded === 0) {
    return '50%';
  }

  const magnitude = formatGeometry(Math.abs(rounded));

  return rounded > 0
    ? `calc(50% + ${magnitude}px)`
    : `calc(50% - ${magnitude}px)`;
}
