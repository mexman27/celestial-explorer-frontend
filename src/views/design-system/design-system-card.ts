import styles from './showcase.module.css';
import { Card } from '@/components/card/card';

export function designSystemCard(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  const title = document.createElement('h2');
  title.className = styles['pageTitle'];
  title.textContent = 'Card';
  el.appendChild(title);

  // Title + Body
  const fullSection = section('Title + Body');
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
  fullSection.appendChild(fullGrid);
  el.appendChild(fullSection);

  // Body Only
  const bodySection = section('Body Only');
  const bodyGrid = grid();
  new Card({
    body: 'A card without a title, useful for simple content blocks or status messages.',
  }).mount(bodyGrid);
  new Card({
    body: 'Another body-only card showing how the component adapts when no heading is provided.',
  }).mount(bodyGrid);
  bodySection.appendChild(bodyGrid);
  el.appendChild(bodySection);

  // Title Only
  const titleSection = section('Title Only');
  const titleGrid = grid();
  new Card({ title: 'Empty State' }).mount(titleGrid);
  new Card({ title: 'Placeholder' }).mount(titleGrid);
  titleSection.appendChild(titleGrid);
  el.appendChild(titleSection);

  // With Nested Content
  const nestedSection = section('Nested Content');
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
  nestedSection.appendChild(nestedGrid);
  el.appendChild(nestedSection);

  return el;
}

function section(label: string): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['section'];
  const title = document.createElement('h3');
  title.className = styles['sectionTitle'];
  title.textContent = label;
  el.appendChild(title);
  return el;
}

function grid(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['grid'];
  return el;
}
