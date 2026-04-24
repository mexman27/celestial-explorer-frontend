import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function starsBrightest(): HTMLElement {
  const view = new View();
  new Text({ text: 'The brightest stars visible from Earth' }).mount(view.el);
  return view.el;
}
