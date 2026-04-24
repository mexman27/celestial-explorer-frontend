import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function planets(): HTMLElement {
  const view = new View();
  new Text({ text: 'Discover planets across the cosmos' }).mount(view.el);
  return view.el;
}
