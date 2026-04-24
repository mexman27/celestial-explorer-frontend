import { DEFAULT_COLOR, TEMP_CLASSES } from './stars.config.ts';
import type { RGB, SpectralColorMap, StarRecord } from './stars.types.ts';

export function classFromTemperature(temp: number): string {
  for (const [minTemp, cls] of TEMP_CLASSES) {
    if (temp >= minTemp) return cls;
  }
  return 'M';
}

export function resolveClass(star: StarRecord): string {
  if (star.spectral_class) return star.spectral_class[0];
  if (star.temperature_kelvin != null) return classFromTemperature(star.temperature_kelvin);
  return '';
}

export function lookupColor(cls: string, colors: SpectralColorMap): RGB {
  return colors[cls] ?? DEFAULT_COLOR;
}

export function magnitudeToSize(mag: number | null): number {
  if (mag == null) return 0.08;
  const t = Math.max(0, Math.min(1, (6 - mag) / 10));
  return 0.05 + t * 0.35;
}

export type TooltipRow = { label: string; value: string };

export function buildTooltipRows(star: StarRecord): TooltipRow[] {
  const cls = resolveClass(star);
  const distance = Math.sqrt(
    star.x_parsecs! ** 2 + star.y_parsecs! ** 2 + star.z_parsecs! ** 2,
  );
  const rows: TooltipRow[] = [
    { label: 'Class', value: cls || '—' },
    { label: 'Distance', value: `${distance.toFixed(2)} pc` },
  ];
  if (star.apparent_magnitude != null) {
    rows.splice(1, 0, { label: 'Magnitude', value: star.apparent_magnitude.toFixed(2) });
  }
  if (star.name) {
    rows.unshift({ label: 'Name', value: star.name });
  }
  return rows;
}
