import { View } from '@/components/view/view.ts';

export function galaxiesDwarf(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Small galaxies with only a few billion stars';
  view.el.appendChild(el);
  return view.el;
}
