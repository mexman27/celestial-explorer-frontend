import { View } from '@/components/view/view.ts';

export function starsTypes(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Spectral classification of stars';
  view.el.appendChild(el);
  return view.el;
}
