import type { RGB } from './stars.types.ts';

export const SPECTRAL_CLASSES = ['O', 'B', 'A', 'F', 'G', 'K', 'M'] as const;

export const DEFAULT_COLOR: RGB = [0.9, 0.5, 0.2];

// Standard temperature boundaries for spectral classes (Kelvin), descending
export const TEMP_CLASSES: [number, string][] = [
  [30_000, 'O'],
  [10_000, 'B'],
  [7_500, 'A'],
  [6_000, 'F'],
  [5_200, 'G'],
  [3_700, 'K'],
  [0, 'M'],
];
