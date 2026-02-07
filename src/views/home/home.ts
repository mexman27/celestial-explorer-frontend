import { View } from '@/components/view/view.ts';

export function home(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Welcome to Celestial Explorer';
  view.el.appendChild(el);
  return view.el;
}
