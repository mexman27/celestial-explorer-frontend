import { View } from '@/components/view/view';

export function galaxies(): HTMLDivElement {
  const view = new View({ content: 'Journey through distant galaxies'});
  return view.el;
}
