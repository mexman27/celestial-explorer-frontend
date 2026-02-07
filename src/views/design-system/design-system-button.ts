import styles from './showcase.module.css';
import { Button } from '@/components/button/button';

export function designSystemButton(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  const title = document.createElement('h2');
  title.className = styles['pageTitle'];
  title.textContent = 'Button';
  el.appendChild(title);

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
  const disabledPrimary = new Button({ label: 'Primary' });
  disabledPrimary.setDisabled(true);
  disabledPrimary.mount(disabledRow);
  const disabledSecondary = new Button({ label: 'Secondary', color: 'secondary' });
  disabledSecondary.setDisabled(true);
  disabledSecondary.mount(disabledRow);
  const disabledDanger = new Button({ label: 'Danger', color: 'danger' });
  disabledDanger.setDisabled(true);
  disabledDanger.mount(disabledRow);
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
  let disabled = false;
  const toggle = new Button({
    label: 'Toggle disable',
    color: 'secondary',
    onClick: () => {
      disabled = !disabled;
      targetBtn.setDisabled(disabled);
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
  const title = document.createElement('h3');
  title.className = styles['sectionTitle'];
  title.textContent = label;
  el.appendChild(title);
  return el;
}

function row(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['row'];
  return el;
}
