import { View } from '@/components/view/view.ts';
import { Viewport } from '@/integrations/three/objects/viewport.ts';
import { StarField } from '@/integrations/three/objects/star-field.ts';
import type { StarPoint } from '@/integrations/three/objects/star-field.ts';
import { CameraControls } from '@/integrations/three/interactions/camera-controls.ts';
import { StarPicker } from '@/integrations/three/interactions/star-picker.ts';
import { SceneTooltip } from '@/integrations/three/overlays/scene-tooltip/scene-tooltip.ts';
import { Overlay } from '@/components/overlay/overlay.ts';
import { createLogger } from '@/services/logger/main.ts';
import { SPECTRAL_CLASSES } from './stars.config.ts';
import type { SpectralColorMap, StarRecord } from './stars.types.ts';
import { parseHexColor } from './stars.transform.ts';
import { buildTooltipRows } from './stars.logic.ts';
import { loadStars } from './stars.http.ts';

const log = createLogger('stars');

export function stars(): HTMLElement {
  const spectralColors: SpectralColorMap = {};
  const root = getComputedStyle(document.documentElement);
  for (const cls of SPECTRAL_CLASSES) {
    const value = root.getPropertyValue(`--color-star-${cls.toLowerCase()}`).trim();
    if (value) spectralColors[cls] = parseHexColor(value);
  }

  const view = new View({ padding: 'p0' });
  const el = view.el;

  const viewport = new Viewport(el, { background: 0x030308 });
  const starField = new StarField(viewport.scene);

  viewport.camera.position.set(0, 15, 30);
  new CameraControls(viewport);

  const tooltip = new SceneTooltip();
  tooltip.mount(el);

  const records: StarRecord[] = [];
  const points: StarPoint[] = [];
  let pinned = false;

  new StarPicker(viewport, starField, {
    onHover(hit) {
      if (pinned) {
        viewport.setCursor(hit ? 'pointer' : 'default');
        return;
      }

      if (!hit || !records[hit.instanceId]) {
        tooltip.hide();
        viewport.setCursor('default');
        return;
      }

      viewport.setCursor('pointer');
      tooltip.show(buildTooltipRows(records[hit.instanceId]), hit.screenX, hit.screenY);
    },
    onClick(hit) {
      starField.clearHighlight();

      if (!hit || !records[hit.instanceId]) {
        pinned = false;
        tooltip.hide();
        return;
      }

      pinned = true;
      starField.highlight(hit.instanceId);
      const record = records[hit.instanceId];
      tooltip.show(buildTooltipRows(record), hit.screenX, hit.screenY);
      tooltip.setInteractive(true);
      tooltip.addLink('View Details →', `#/stars?id=${record.id}`);
    },
  });

  const overlay = new Overlay({ visible: true, message: 'Loading stars…' });
  overlay.mount(el);

  viewport.start();

  loadStars(spectralColors, points, records).finally(() => {
    starField.setData(points);
    log.info(`Loaded ${points.length} stars`);
    overlay.hide();
  });

  return el;
}
