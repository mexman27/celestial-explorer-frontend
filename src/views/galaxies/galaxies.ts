import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function galaxies(): HTMLElement {
  const view = new View();
  new Text({ text: 'Journey through distant galaxies' }).mount(view.el);
  return view.el;
}
