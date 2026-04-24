import { View } from '@/components/view/view.ts';
import { Text } from '@/components/text/text.ts';

export function homeOverview(): HTMLElement {
  const view = new View();
  new Text({ text: 'Overview of the Celestial Explorer project' }).mount(view.el);
  return view.el;
}
