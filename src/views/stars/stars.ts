import { Viewport } from '@/integrations/three/objects/viewport.ts';
import { StarField } from '@/integrations/three/objects/star-field.ts';
import type { StarPoint } from '@/integrations/three/objects/star-field.ts';
import { CameraControls } from '@/integrations/three/interactions/camera-controls.ts';
import { GaiaClient } from '@/http/gaia/main.ts';
import styles from './stars.module.css';

type StarRecord = {
  x_parsecs: number | null;
  y_parsecs: number | null;
  z_parsecs: number | null;
  spectral_class: string;
  apparent_magnitude: number | null;
};

const SPECTRAL_CLASSES = ['O', 'B', 'A', 'F', 'G', 'K', 'M'] as const;
const DEFAULT_COLOR: [number, number, number] = [0.9, 0.5, 0.2];

function parseHexColor(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function readSpectralColors(): Record<string, [number, number, number]> {
  const root = getComputedStyle(document.documentElement);
  const colors: Record<string, [number, number, number]> = {};

  for (const cls of SPECTRAL_CLASSES) {
    const value = root.getPropertyValue(`--color-star-${cls.toLowerCase()}`).trim();
    if (value) colors[cls] = parseHexColor(value);
  }

  return colors;
}

let spectralColors: Record<string, [number, number, number]> | null = null;

function spectralColor(cls: string): [number, number, number] {
  if (!spectralColors) spectralColors = readSpectralColors();
  return spectralColors[cls] ?? DEFAULT_COLOR;
}

function magnitudeToSize(mag: number | null): number {
  if (mag == null) return 0.08;
  const t = Math.max(0, Math.min(1, (6 - mag) / 10));
  return 0.05 + t * 0.35;
}

function toStarPoint(star: StarRecord): StarPoint {
  return {
    position: [star.x_parsecs!, star.y_parsecs!, star.z_parsecs!],
    color: spectralColor(star.spectral_class),
    size: magnitudeToSize(star.apparent_magnitude),
  };
}

async function loadStars(client: GaiaClient, field: StarField): Promise<void> {
  const result = await client.stars.list<StarRecord>({ page_size: 5000 });
  if (!result.ok) return;

  const points = result.data.results
    .filter(s => s.x_parsecs != null && s.y_parsecs != null && s.z_parsecs != null)
    .map(toStarPoint);

  field.setData(points);
}

export function stars(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['container'];

  const viewport = new Viewport(el, { background: 0x030308 });
  const starField = new StarField(viewport.scene);
  new CameraControls(viewport);

  viewport.camera.position.set(0, 15, 30);
  viewport.start();

  const client = new GaiaClient();
  loadStars(client, starField);

  return el;
}
