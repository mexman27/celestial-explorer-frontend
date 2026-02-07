import { View } from '@/components/view/view.ts';

export function galaxies(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Journey through distant galaxies';
  view.el.appendChild(el);
  return view.el;
}
