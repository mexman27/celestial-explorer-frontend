import styles from './showcase.module.css';
import { Input } from '@/components/input/main';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Grid } from '@/components/grid/grid';

export function designSystemInput(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Input' }).mount(el);

  // Default
  const defaults = new Section({ title: new Title({ text: 'Default', type: 'section' }) });
  const defaultsGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ placeholder: 'Enter text...' }).mount(defaultsGrid.getEl());
  new Input({ value: 'Prefilled value' }).mount(defaultsGrid.getEl());
  defaults.append(defaultsGrid.getEl());
  defaults.mount(el);

  // With Label
  const labeled = new Section({ title: new Title({ text: 'With Label', type: 'section' }) });
  const labeledGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Star name', placeholder: 'e.g. Proxima Centauri' }).mount(labeledGrid.getEl());
  new Input({ label: 'Distance', placeholder: 'Light-years' }).mount(labeledGrid.getEl());
  labeled.append(labeledGrid.getEl());
  labeled.mount(el);

  // With Comment
  const commented = new Section({ title: new Title({ text: 'With Comment', type: 'section' }) });
  const commentedGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Spectral type', placeholder: 'e.g. G2V', comment: 'Classification based on stellar spectra' }).mount(commentedGrid.getEl());
  new Input({ label: 'Magnitude', placeholder: 'e.g. 4.83', comment: 'Apparent visual magnitude' }).mount(commentedGrid.getEl());
  commented.append(commentedGrid.getEl());
  commented.mount(el);

  // With Toggle
  const toggled = new Section({ title: new Title({ text: 'With Toggle', type: 'section' }) });
  const toggledGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Custom name', toggle: true, placeholder: 'Override default name' }).mount(toggledGrid.getEl());
  new Input({ label: 'Notes', toggle: true, placeholder: 'Optional notes', comment: 'Toggle to enable field' }).mount(toggledGrid.getEl());
  toggled.append(toggledGrid.getEl());
  toggled.mount(el);

  // Disabled
  const disabled = new Section({ title: new Title({ text: 'Disabled', type: 'section' }) });
  const disabledGrid = new Grid({ columns: ['1fr', '1fr'] });
  new Input({ label: 'Read-only field', value: 'Cannot edit', disabled: true }).mount(disabledGrid.getEl());
  new Input({ placeholder: 'Disabled input', disabled: true }).mount(disabledGrid.getEl());
  disabled.append(disabledGrid.getEl());
  disabled.mount(el);

  return el;
}
