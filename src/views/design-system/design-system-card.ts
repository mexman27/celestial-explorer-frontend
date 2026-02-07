import { View } from '@/components/view/view.ts';
import styles from './showcase.module.css';
import { Card } from '@/components/card/card';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Grid } from '@/components/grid/grid';
import { List } from '@/components/list/list';

export function designSystemCard(): HTMLElement {
  const view = new View();
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Card' }).mount(el);

  // Title + Body
  const full = new Section({ title: new Title({ text: 'Title + Body', type: 'section' }) });
  const fullGrid = new Grid();
  new Card({
    title: 'Andromeda Galaxy',
    body: 'The nearest major galaxy to the Milky Way, approximately 2.5 million light-years away.',
  }).mount(fullGrid.getEl());
  new Card({
    title: 'Proxima Centauri',
    body: 'The closest known star to the Sun, a red dwarf in the Alpha Centauri system.',
  }).mount(fullGrid.getEl());
  new Card({
    title: 'Jupiter',
    body: 'The largest planet in our solar system with a mass more than twice that of all other planets combined.',
  }).mount(fullGrid.getEl());
  full.append(fullGrid.getEl());
  full.mount(el);

  // Body Only
  const bodyOnly = new Section({ title: new Title({ text: 'Body Only', type: 'section' }) });
  const bodyGrid = new Grid();
  new Card({
    body: 'A card without a title, useful for simple content blocks or status messages.',
  }).mount(bodyGrid.getEl());
  new Card({
    body: 'Another body-only card showing how the component adapts when no heading is provided.',
  }).mount(bodyGrid.getEl());
  bodyOnly.append(bodyGrid.getEl());
  bodyOnly.mount(el);

  // Title Only
  const titleOnly = new Section({ title: new Title({ text: 'Title Only', type: 'section' }) });
  const titleGrid = new Grid();
  new Card({ title: 'Empty State' }).mount(titleGrid.getEl());
  new Card({ title: 'Placeholder' }).mount(titleGrid.getEl());
  titleOnly.append(titleGrid.getEl());
  titleOnly.mount(el);

  // With Nested Content
  const nested = new Section({ title: new Title({ text: 'Nested Content', type: 'section' }) });
  const nestedGrid = new Grid();
  const nestedCard = new Card({ title: 'Star Properties' });
  const list = new List({
    items: ['Spectral type: G2V', 'Temperature: 5,778 K', 'Luminosity: 1.0 L☉', 'Age: 4.6 billion years'],
  });
  list.mount(nestedCard.getBody());
  nestedCard.mount(nestedGrid.getEl());
  nested.append(nestedGrid.getEl());
  nested.mount(el);

  view.el.appendChild(el);
  return view.el;
}
