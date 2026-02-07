import { View } from '@/components/view/view.ts';

export function homeAbout(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'About the Celestial Explorer mission';
  view.el.appendChild(el);
  return view.el;
}
