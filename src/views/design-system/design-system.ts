import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function designSystem(): HTMLElement {
  const view = new View();
  new Text({ text: 'Design System' }).mount(view.el);
  return view.el;
}
