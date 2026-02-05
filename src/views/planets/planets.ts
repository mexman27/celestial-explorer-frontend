import { View } from '@/components/view/view';

export function planets(): HTMLDivElement {
  const view = new View({ content: 'Discover planets across the cosmos' });
  return view.el;
}
