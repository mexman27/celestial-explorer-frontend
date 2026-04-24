import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function starsTypes(): HTMLElement {
  const view = new View();
  new Text({ text: 'Spectral classification of stars' }).mount(view.el);
  return view.el;
}
