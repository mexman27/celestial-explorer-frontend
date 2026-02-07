import { View } from '@/components/view/view.ts';

export function planetsRocky(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Terrestrial planets with solid surfaces';
  view.el.appendChild(el);
  return view.el;
}
