import { View } from '@/components/view/view.ts';

export function homeOverview(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Overview of the Celestial Explorer project';
  view.el.appendChild(el);
  return view.el;
}
