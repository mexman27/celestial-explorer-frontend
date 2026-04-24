import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function starsNearest(): HTMLElement {
  const view = new View();
  new Text({ text: 'Stars closest to our Solar System' }).mount(view.el);
  return view.el;
}
