import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function homeGettingStarted(): HTMLElement {
  const view = new View();
  new Text({ text: 'Getting started with Celestial Explorer' }).mount(view.el);
  return view.el;
}
