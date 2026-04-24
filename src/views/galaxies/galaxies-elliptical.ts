import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function galaxiesElliptical(): HTMLElement {
  const view = new View();
  new Text({ text: 'Smooth, featureless ellipsoidal galaxies' }).mount(view.el);
  return view.el;
}
