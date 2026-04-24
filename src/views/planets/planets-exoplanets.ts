import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function planetsExoplanets(): HTMLElement {
  const view = new View();
  new Text({ text: 'Planets orbiting stars beyond our Sun' }).mount(view.el);
  return view.el;
}
