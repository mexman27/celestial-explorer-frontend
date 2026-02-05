import { View } from '@/components/view/view';

export function stars(): HTMLDivElement {
  const view = new View({ content: 'Explore the stars of our universe' });
  return view.el;
}
