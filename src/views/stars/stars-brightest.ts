import { View } from '@/components/view/view.ts';

export function starsBrightest(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'The brightest stars visible from Earth';
  view.el.appendChild(el);
  return view.el;
}
