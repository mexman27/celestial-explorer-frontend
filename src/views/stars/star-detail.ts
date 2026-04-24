import { View } from '@/components/view/view.ts';
import { Overlay } from '@/components/overlay/overlay.ts';
import { Title } from '@/components/title/title.ts';
import { Card } from '@/components/card/card.ts';
import { Flex } from '@/components/flex/flex.ts';
import { Link } from '@/components/link/link.ts';
import { Text } from '@/components/text/text.ts';
import { createLogger } from '@/services/logger/main.ts';
import { FIELD_GROUPS } from './star-detail.config.ts';
import { toRows } from './star-detail.transform.ts';
import { getExtraFields } from './star-detail.logic.ts';
import { fetchStarDetail } from './star-detail.http.ts';

const log = createLogger('star-detail');

export function starDetail(id: string): HTMLElement {
  const view = new View();
  const page = new Flex({ direction: 'column', gap: 4 });
  page.mount(view.el);

  new Link({ text: '← Back to Star Field', href: '#/stars' }).mount(page.el);

  const title = new Title({ text: 'Loading…', type: 'page' });
  title.mount(page.el);

  const content = new Flex({ direction: 'column', gap: 4 });
  content.mount(page.el);

  const overlay = new Overlay({ visible: true, message: 'Loading star data…' });
  overlay.mount(content.el);

  fetchStarDetail(id).then(result => {
    overlay.hide();

    if (!result.ok) {
      log.error('Failed to fetch star detail', result.error);
      new Text({ text: 'Failed to load star data.', variant: 'muted' }).mount(content.el);
      return;
    }

    const data = result.data;
    title.update(String(data.name || `Star #${id}`));

    for (const group of FIELD_GROUPS) {
      const rows = toRows(data, group.fields);
      if (rows.length === 0) continue;
      new Card({ title: group.title, rows }).mount(content.el);
    }

    const extraRows = toRows(data, getExtraFields(data));
    if (extraRows.length > 0) {
      new Card({ title: 'Other', rows: extraRows }).mount(content.el);
    }
  });

  return view.el;
}
