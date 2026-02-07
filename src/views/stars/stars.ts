import { Viewport } from '@/integrations/three/objects/viewport.ts';
import { StarField } from '@/integrations/three/objects/star-field.ts';
import type { StarPoint } from '@/integrations/three/objects/star-field.ts';
import { CameraControls } from '@/integrations/three/interactions/camera-controls.ts';
import { StarPicker } from '@/integrations/three/interactions/star-picker.ts';
import { GaiaClient } from '@/http/gaia/main.ts';
import { createLogger } from '@/services/logger/main.ts';
import { SceneTooltip } from '@/integrations/three/overlays/scene-tooltip/scene-tooltip.ts';
import styles from './stars.module.css';

const log = createLogger('stars');

type StarRecord = {
  name: string;
  x_parsecs: number | null;
  y_parsecs: number | null;
  z_parsecs: number | null;
  spectral_class: string;
  apparent_magnitude: number | null;
  temperature_kelvin: number | null;
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

// Standard temperature boundaries for spectral classes (Kelvin)
const TEMP_CLASSES: [number, string][] = [
  [30_000, 'O'],
  [10_000, 'B'],
  [7_500, 'A'],
  [6_000, 'F'],
  [5_200, 'G'],
  [3_700, 'K'],
  [0, 'M'],
];

function classFromTemperature(temp: number): string {
  for (const [minTemp, cls] of TEMP_CLASSES) {
    if (temp >= minTemp) return cls;
  }
  return 'M';
}

function resolveClass(star: StarRecord): string {
  if (star.spectral_class) return star.spectral_class[0];
  if (star.temperature_kelvin != null) return classFromTemperature(star.temperature_kelvin);
  return '';
}

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
    color: spectralColor(resolveClass(star)),
    size: magnitudeToSize(star.apparent_magnitude),
  };
}

const RENDER_BATCH = 500;

async function loadStars(
  client: GaiaClient,
  field: StarField,
  records: StarRecord[],
): Promise<void> {
  const points: StarPoint[] = [];
  let lastRender = 0;

  for await (const page of client.stars.paginate<StarRecord>({ page_size: 5000 })) {
    if (!page.ok) {
      log.error('Failed to fetch stars', page.error);
      break;
    }

    const valid = page.data.results.filter(
      s => s.x_parsecs != null && s.y_parsecs != null && s.z_parsecs != null,
    );

    log.debug(`Page: ${page.data.results.length} total, ${valid.length} with coords`);

    points.push(...valid.map(toStarPoint));
    records.push(...valid);

    if (points.length - lastRender >= RENDER_BATCH) {
      log.debug(`Rendering batch: ${points.length}/${page.data.count}`);
      field.setData(points);
      lastRender = points.length;
    }
  }

  if (points.length !== lastRender) {
    field.setData(points);
  }

  log.info(`Loaded ${points.length} stars`);
}

export function stars(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['container'];

  const viewport = new Viewport(el, { background: 0x030308 });
  const starField = new StarField(viewport.scene);

  viewport.camera.position.set(0, 15, 30);
  new CameraControls(viewport);

  const tooltip = new SceneTooltip();
  tooltip.mount(el);

  const records: StarRecord[] = [];

  new StarPicker(viewport, starField, {
    onHover(hit) {
      if (!hit || !records[hit.instanceId]) {
        tooltip.hide();
        return;
      }

      const r = records[hit.instanceId];
      const distance = Math.sqrt(
        r.x_parsecs! ** 2 + r.y_parsecs! ** 2 + r.z_parsecs! ** 2,
      );

      const cls = resolveClass(r);
      const rows = [
        { label: 'Class', value: cls || '—' },
        { label: 'Distance', value: `${distance.toFixed(2)} pc` },
      ];
      if (r.apparent_magnitude != null) {
        rows.splice(1, 0, { label: 'Magnitude', value: r.apparent_magnitude.toFixed(2) });
      }
      if (r.name) {
        rows.unshift({ label: 'Name', value: r.name });
      }

      tooltip.show(rows, hit.screenX, hit.screenY);
    },
  });

  viewport.start();

  const client = new GaiaClient();
  loadStars(client, starField, records);

  return el;
}
