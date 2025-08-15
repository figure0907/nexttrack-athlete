// src/utils/tiers.ts
export const TIER_THRESHOLDS = [10,20,30,40,50,60,70,80,90,95,100] as const;
export const TIER_LABELS = [
  "Untrained","Poor","Weak","Mediocre","Good","Strong",
  "Excellent","Exceptional","Masterful","Elite","Legendary",
] as const;

export function tierOf(v: number): string {
  for (let i = 0; i < TIER_THRESHOLDS.length; i++) {
    if (v <= TIER_THRESHOLDS[i]) return TIER_LABELS[i];
  }
  return TIER_LABELS[TIER_LABELS.length - 1];
}

export function displayFromMode(value: number, mode: 0 | 1 | 2): string {
  if (mode === 2) return String(value);
  if (mode === 1) return tierOf(value);
  return "Hidden";
}

export function tierIndexOf(v: number): number {
  for (let i = 0; i < TIER_THRESHOLDS.length; i++) {
    if (v <= TIER_THRESHOLDS[i]) return i;
  }
  return TIER_THRESHOLDS.length - 1;
}

export function tierBounds(idx: number): [number, number] {
  const lo = idx === 0 ? 0 : TIER_THRESHOLDS[idx - 1];
  const hi = TIER_THRESHOLDS[idx];
  return [lo, hi];
}
