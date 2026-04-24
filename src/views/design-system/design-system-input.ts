import { View } from '@/components/view/view.ts';
import { Input } from '@/components/input/main';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Grid } from '@/components/grid/grid';
import { Flex } from '@/components/flex/flex';

export function designSystemInput(): HTMLElement {
  const view = new View();
  const page = new Flex({ direction: 'column', gap: 8 });

  new Title({ text: 'Input' }).mount(page.el);

  // Default
  const defaults = new Section({ title: new Title({ text: 'Default', type: 'section' }) });
  const defaultsGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ placeholder: 'Enter text...' }).mount(defaultsGrid.el);
  new Input({ value: 'Prefilled value' }).mount(defaultsGrid.el);
  defaults.append(defaultsGrid.el);
  defaults.mount(page.el);

  // With Label
  const labeled = new Section({ title: new Title({ text: 'With Label', type: 'section' }) });
  const labeledGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Star name', placeholder: 'e.g. Proxima Centauri' }).mount(labeledGrid.el);
  new Input({ label: 'Distance', placeholder: 'Light-years' }).mount(labeledGrid.el);
  labeled.append(labeledGrid.el);
  labeled.mount(page.el);

  // With Comment
  const commented = new Section({ title: new Title({ text: 'With Comment', type: 'section' }) });
  const commentedGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Spectral type', placeholder: 'e.g. G2V', comment: 'Classification based on stellar spectra' }).mount(commentedGrid.el);
  new Input({ label: 'Magnitude', placeholder: 'e.g. 4.83', comment: 'Apparent visual magnitude' }).mount(commentedGrid.el);
  commented.append(commentedGrid.el);
  commented.mount(page.el);

  // Disabled
  const disabled = new Section({ title: new Title({ text: 'Disabled', type: 'section' }) });
  const disabledGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Read-only field', value: 'Cannot edit', disabled: true }).mount(disabledGrid.el);
  new Input({ placeholder: 'Disabled input', disabled: true }).mount(disabledGrid.el);
  disabled.append(disabledGrid.el);
  disabled.mount(page.el);

  page.mount(view.el);
  return view.el;
}
