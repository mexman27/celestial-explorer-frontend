import { View } from '@/components/view/view.ts';

export function planetsExoplanets(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Planets orbiting stars beyond our Sun';
  view.el.appendChild(el);
  return view.el;
}
