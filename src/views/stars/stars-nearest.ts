import { View } from '@/components/view/view.ts';

export function starsNearest(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Stars closest to our Solar System';
  view.el.appendChild(el);
  return view.el;
}
