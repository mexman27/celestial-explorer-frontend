import { View } from '@/components/view/view.ts';

export function galaxiesSpiral(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Galaxies with spiral arm structures';
  view.el.appendChild(el);
  return view.el;
}
