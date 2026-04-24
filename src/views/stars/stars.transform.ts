import type { StarPoint } from '@/integrations/three/objects/star-field.ts';
import type { RGB, SpectralColorMap, StarRecord } from './stars.types.ts';
import { resolveClass, magnitudeToSize, lookupColor } from './stars.logic.ts';

export function parseHexColor(hex: string): RGB {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export function toStarPoint(star: StarRecord, colors: SpectralColorMap): StarPoint {
  return {
    position: [star.x_parsecs!, star.y_parsecs!, star.z_parsecs!],
    color: lookupColor(resolveClass(star), colors),
    size: magnitudeToSize(star.apparent_magnitude),
  };
}
