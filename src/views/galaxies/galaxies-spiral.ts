import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function galaxiesSpiral(): HTMLElement {
  const view = new View();
  new Text({ text: 'Galaxies with spiral arm structures' }).mount(view.el);
  return view.el;
}
