import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function galaxiesDwarf(): HTMLElement {
  const view = new View();
  new Text({ text: 'Small galaxies with only a few billion stars' }).mount(view.el);
  return view.el;
}
