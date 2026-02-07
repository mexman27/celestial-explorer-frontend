import { View } from '@/components/view/view.ts';

export function designSystem(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Design System';
  view.el.appendChild(el);
  return view.el;
}
