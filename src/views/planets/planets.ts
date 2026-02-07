import { View } from '@/components/view/view.ts';

export function planets(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Discover planets across the cosmos';
  view.el.appendChild(el);
  return view.el;
}
