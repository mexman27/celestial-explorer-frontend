import { View } from '@/components/view/view.ts';
import { Card } from '@/components/card/card';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Grid } from '@/components/grid/grid';
import { List } from '@/components/list/list';
import { Flex } from '@/components/flex/flex';

export function designSystemCard(): HTMLElement {
  const view = new View();
  const page = new Flex({ direction: 'column', gap: 8 });

  new Title({ text: 'Card' }).mount(page.el);

  // Title + Body
  const full = new Section({ title: new Title({ text: 'Title + Body', type: 'section' }) });
  const fullGrid = new Grid();
  new Card({
    title: 'Andromeda Galaxy',
    body: 'The nearest major galaxy to the Milky Way, approximately 2.5 million light-years away.',
  }).mount(fullGrid.el);
  new Card({
    title: 'Proxima Centauri',
    body: 'The closest known star to the Sun, a red dwarf in the Alpha Centauri system.',
  }).mount(fullGrid.el);
  new Card({
    title: 'Jupiter',
    body: 'The largest planet in our solar system with a mass more than twice that of all other planets combined.',
  }).mount(fullGrid.el);
  full.append(fullGrid.el);
  full.mount(page.el);

  // Body Only
  const bodyOnly = new Section({ title: new Title({ text: 'Body Only', type: 'section' }) });
  const bodyGrid = new Grid();
  new Card({
    body: 'A card without a title, useful for simple content blocks or status messages.',
  }).mount(bodyGrid.el);
  new Card({
    body: 'Another body-only card showing how the component adapts when no heading is provided.',
  }).mount(bodyGrid.el);
  bodyOnly.append(bodyGrid.el);
  bodyOnly.mount(page.el);

  // Title Only
  const titleOnly = new Section({ title: new Title({ text: 'Title Only', type: 'section' }) });
  const titleGrid = new Grid();
  new Card({ title: 'Empty State' }).mount(titleGrid.el);
  new Card({ title: 'Placeholder' }).mount(titleGrid.el);
  titleOnly.append(titleGrid.el);
  titleOnly.mount(page.el);

  // With Nested Content
  const nested = new Section({ title: new Title({ text: 'Nested Content', type: 'section' }) });
  const nestedGrid = new Grid();
  const nestedCard = new Card({ title: 'Star Properties' });
  const list = new List({
    items: ['Spectral type: G2V', 'Temperature: 5,778 K', 'Luminosity: 1.0 L☉', 'Age: 4.6 billion years'],
  });
  list.mount(nestedCard.body);
  nestedCard.mount(nestedGrid.el);
  nested.append(nestedGrid.el);
  nested.mount(page.el);

  page.mount(view.el);
  return view.el;
}
