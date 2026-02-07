import { View } from '@/components/view/view.ts';
import { GaiaClient } from '@/http/gaia/main.ts';
import { Overlay } from '@/components/overlay/overlay.ts';
import { Title } from '@/components/title/title.ts';
import { Card } from '@/components/card/card.ts';
import { createLogger } from '@/services/logger/main.ts';

const log = createLogger('star-detail');

const FIELD_GROUPS: { title: string; fields: string[] }[] = [
  {
    title: 'Identity',
    fields: ['name', 'spectral_class', 'constellation'],
  },
  {
    title: 'Position',
    fields: ['x_parsecs', 'y_parsecs', 'z_parsecs', 'distance_parsecs', 'right_ascension', 'declination'],
  },
  {
    title: 'Physical Properties',
    fields: ['temperature_kelvin', 'apparent_magnitude', 'absolute_magnitude', 'luminosity_solar'],
  },
  {
    title: 'Motion',
    fields: ['radial_velocity', 'proper_motion_ra', 'proper_motion_dec'],
  },
];

const SKIP_FIELDS = new Set(['id']);
const GROUPED_FIELDS = new Set(FIELD_GROUPS.flatMap(g => g.fields));

function formatLabel(field: string): string {
  return field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function buildFieldCard(title: string, fields: [string, unknown][]): Card {
  const card = new Card({ title });
  const body = card.getBody();

  for (const [field, value] of fields) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.gap = 'var(--space-3)';
    row.style.padding = 'var(--space-1) 0';

    const labelEl = document.createElement('span');
    labelEl.style.color = 'var(--color-text-muted)';
    labelEl.textContent = formatLabel(field);

    const valueEl = document.createElement('span');
    valueEl.style.fontFamily = 'var(--font-family-mono)';
    valueEl.style.textAlign = 'right';
    valueEl.textContent = value == null ? '\u2014' : String(value);

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    body.appendChild(row);
  }

  return card;
}

function renderDetail(parent: HTMLElement, data: Record<string, unknown>): void {
  for (const group of FIELD_GROUPS) {
    const fields = group.fields
      .filter(f => data[f] != null && data[f] !== '')
      .map(f => [f, data[f]] as [string, unknown]);
    if (fields.length === 0) continue;

    buildFieldCard(group.title, fields).mount(parent);
  }

  const extra = Object.entries(data).filter(
    ([k, v]) => !SKIP_FIELDS.has(k) && !GROUPED_FIELDS.has(k) && v != null && v !== '',
  );
  if (extra.length > 0) {
    buildFieldCard('Other', extra).mount(parent);
  }
}

export function starDetail(id: string): HTMLElement {
  const view = new View();
  const el = view.el;
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.gap = 'var(--space-4)';

  const backLink = document.createElement('a');
  backLink.href = '#/stars';
  backLink.textContent = '\u2190 Back to Star Field';
  backLink.style.color = 'var(--color-text-secondary)';
  backLink.style.textDecoration = 'none';
  backLink.style.fontSize = 'var(--font-size-sm)';
  el.appendChild(backLink);

  const title = new Title({ text: 'Loading\u2026', type: 'page' });
  title.mount(el);

  const content = document.createElement('div');
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = 'var(--space-4)';
  content.style.position = 'relative';
  el.appendChild(content);

  const overlay = new Overlay({ visible: true, message: 'Loading star data\u2026' });
  overlay.mount(content);

  const client = new GaiaClient();
  client.stars.detail<Record<string, unknown>>(id).then(result => {
    overlay.hide();

    if (!result.ok) {
      log.error('Failed to fetch star detail', result.error);
      const msg = document.createElement('p');
      msg.style.color = 'var(--color-text-secondary)';
      msg.textContent = 'Failed to load star data.';
      content.appendChild(msg);
      return;
    }

    const data = result.data;
    title.update(String(data.name || `Star #${id}`));
    renderDetail(content, data);
  });

  return el;
}
