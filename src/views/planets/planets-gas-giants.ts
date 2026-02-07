import { View } from '@/components/view/view.ts';

export function planetsGasGiants(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Massive planets composed primarily of gas';
  view.el.appendChild(el);
  return view.el;
}
