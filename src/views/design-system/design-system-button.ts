import styles from './showcase.module.css';
import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';


export function designSystemButton(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Button' }).mount(el);

  // Colors
  const colorsSection = section('Colors');
  const colorsRow = row();
  new Button({ label: 'Primary' }).mount(colorsRow);
  new Button({ label: 'Secondary', color: 'secondary' }).mount(colorsRow);
  new Button({ label: 'Danger', color: 'danger' }).mount(colorsRow);
  colorsSection.appendChild(colorsRow);
  el.appendChild(colorsSection);

  // Disabled
  const disabledSection = section('Disabled');
  const disabledRow = row();
  new Button({ label: 'Primary', disabled: true }).mount(disabledRow);
  new Button({ label: 'Secondary', color: 'secondary', disabled: true }).mount(disabledRow);
  new Button({ label: 'Danger', color: 'danger', disabled: true }).mount(disabledRow);
  disabledSection.appendChild(disabledRow);
  el.appendChild(disabledSection);

  // Interactive
  const interactiveSection = section('Interactive');
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
  interactiveSection.appendChild(interactiveRow);
  el.appendChild(interactiveSection);

  return el;
}

function section(label: string): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['section'];
  new Title({ text: label, type: 'section' }).mount(el);
  return el;
}

function row(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['row'];
  return el;
}
