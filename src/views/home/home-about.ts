import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function homeAbout(): HTMLElement {
  const view = new View();
  new Text({ text: 'About the Celestial Explorer mission' }).mount(view.el);
  return view.el;
}
