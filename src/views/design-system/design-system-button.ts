import styles from './showcase.module.css';
import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';


export function designSystemButton(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Button' }).mount(el);

  // Colors
  const colors = new Section({ title: new Title({ text: 'Colors', type: 'section' }) });
  const colorsRow = row();
  new Button({ label: 'Primary' }).mount(colorsRow);
  new Button({ label: 'Secondary', color: 'secondary' }).mount(colorsRow);
  new Button({ label: 'Danger', color: 'danger' }).mount(colorsRow);
  colors.append(colorsRow);
  colors.mount(el);

  // Disabled
  const disabled = new Section({ title: new Title({ text: 'Disabled', type: 'section' }) });
  const disabledRow = row();
  new Button({ label: 'Primary', disabled: true }).mount(disabledRow);
  new Button({ label: 'Secondary', color: 'secondary', disabled: true }).mount(disabledRow);
  new Button({ label: 'Danger', color: 'danger', disabled: true }).mount(disabledRow);
  disabled.append(disabledRow);
  disabled.mount(el);

  // Interactive
  const interactive = new Section({ title: new Title({ text: 'Interactive', type: 'section' }) });
  const interactiveRow = row();
  let count = 0;
  const counter = new Button({
    label: `Clicked: ${count}`,
    onClick: () => {
      count++;
      counter.update(`Clicked: ${count}`);
    },
  });
  counter.mount(interactiveRow);

  const targetBtn = new Button({ label: 'Toggle me', color: 'danger' });
  let isDisabled = false;
  const toggle = new Button({
    label: 'Toggle disable',
    color: 'secondary',
    onClick: () => {
      isDisabled = !isDisabled;
      isDisabled ? targetBtn.disable() : targetBtn.enable();
    },
  });
  toggle.mount(interactiveRow);
  targetBtn.mount(interactiveRow);
  interactive.append(interactiveRow);
  interactive.mount(el);

  return el;
}

function row(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['row'];
  return el;
}
