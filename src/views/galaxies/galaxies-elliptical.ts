import { View } from '@/components/view/view.ts';

export function galaxiesElliptical(): HTMLElement {
  const view = new View();
  const el = document.createElement('p');
  el.textContent = 'Smooth, featureless ellipsoidal galaxies';
  view.el.appendChild(el);
  return view.el;
}
