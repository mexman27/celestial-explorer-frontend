import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function planetsGasGiants(): HTMLElement {
  const view = new View();
  new Text({ text: 'Massive planets composed primarily of gas' }).mount(view.el);
  return view.el;
}
