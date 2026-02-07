import { View } from '@/components/view/view.ts';

export function homeGettingStarted(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Getting started with Celestial Explorer';
  view.el.appendChild(el);
  return view.el;
}
