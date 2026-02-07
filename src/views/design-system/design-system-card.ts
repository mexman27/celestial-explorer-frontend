import styles from './showcase.module.css';
import { Card } from '@/components/card/card';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';

export function designSystemCard(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Card' }).mount(el);

  // Title + Body
  const full = new Section({ title: new Title({ text: 'Title + Body', type: 'section' }) });
  const fullGrid = grid();
  new Card({
    title: 'Andromeda Galaxy',
    body: 'The nearest major galaxy to the Milky Way, approximately 2.5 million light-years away.',
  }).mount(fullGrid);
  new Card({
    title: 'Proxima Centauri',
    body: 'The closest known star to the Sun, a red dwarf in the Alpha Centauri system.',
  }).mount(fullGrid);
  new Card({
    title: 'Jupiter',
    body: 'The largest planet in our solar system with a mass more than twice that of all other planets combined.',
  }).mount(fullGrid);
  full.append(fullGrid);
  full.mount(el);

  // Body Only
  const bodyOnly = new Section({ title: new Title({ text: 'Body Only', type: 'section' }) });
  const bodyGrid = grid();
  new Card({
    body: 'A card without a title, useful for simple content blocks or status messages.',
  }).mount(bodyGrid);
  new Card({
    body: 'Another body-only card showing how the component adapts when no heading is provided.',
  }).mount(bodyGrid);
  bodyOnly.append(bodyGrid);
  bodyOnly.mount(el);

  // Title Only
  const titleOnly = new Section({ title: new Title({ text: 'Title Only', type: 'section' }) });
  const titleGrid = grid();
  new Card({ title: 'Empty State' }).mount(titleGrid);
  new Card({ title: 'Placeholder' }).mount(titleGrid);
  titleOnly.append(titleGrid);
  titleOnly.mount(el);

  // With Nested Content
  const nested = new Section({ title: new Title({ text: 'Nested Content', type: 'section' }) });
  const nestedGrid = grid();
  const nestedCard = new Card({ title: 'Star Properties' });
  const list = document.createElement('ul');
  list.style.cssText = 'list-style: none; display: flex; flex-direction: column; gap: 0.5rem;';
  ['Spectral type: G2V', 'Temperature: 5,778 K', 'Luminosity: 1.0 L☉', 'Age: 4.6 billion years'].forEach(text => {
    const li = document.createElement('li');
    li.style.color = 'var(--color-text-secondary)';
    li.textContent = text;
    list.appendChild(li);
  });
  nestedCard.getBody().appendChild(list);
  nestedCard.mount(nestedGrid);
  nested.append(nestedGrid);
  nested.mount(el);

  return el;
}

function grid(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['grid'];
  return el;
}
