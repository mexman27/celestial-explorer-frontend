import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function home(): HTMLElement {
  const view = new View();
  new Text({ text: 'Welcome to Celestial Explorer' }).mount(view.el);
  return view.el;
}
