import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function planetsRocky(): HTMLElement {
  const view = new View();
  new Text({ text: 'Terrestrial planets with solid surfaces' }).mount(view.el);
  return view.el;
}
