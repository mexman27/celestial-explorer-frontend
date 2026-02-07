import { View } from '@/components/view/view.ts';
import styles from './showcase.module.css';
import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Flex } from '@/components/flex/flex';

export function designSystemButton(): HTMLElement {
  const view = new View();
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Button' }).mount(el);

  // Primary
  const primary = new Section({ title: new Title({ text: 'Primary', type: 'section' }) });
  const primaryFlex = new Flex();
  new Button({ label: 'Default' }).mount(primaryFlex.getEl());
  new Button({ label: 'Disabled', disabled: true }).mount(primaryFlex.getEl());
  let primaryCount = 0;
  const primaryCounter = new Button({
    label: `Clicked: ${primaryCount}`,
    onClick: () => {
      primaryCount++;
      primaryCounter.update(`Clicked: ${primaryCount}`);
    },
  });
  primaryCounter.mount(primaryFlex.getEl());
  primary.append(primaryFlex.getEl());
  primary.mount(el);

  // Secondary
  const secondary = new Section({ title: new Title({ text: 'Secondary', type: 'section' }) });
  const secondaryFlex = new Flex();
  new Button({ label: 'Default', color: 'secondary' }).mount(secondaryFlex.getEl());
  new Button({ label: 'Disabled', color: 'secondary', disabled: true }).mount(secondaryFlex.getEl());
  let secondaryCount = 0;
  const secondaryCounter = new Button({
    label: `Clicked: ${secondaryCount}`,
    color: 'secondary',
    onClick: () => {
      secondaryCount++;
      secondaryCounter.update(`Clicked: ${secondaryCount}`);
    },
  });
  secondaryCounter.mount(secondaryFlex.getEl());
  secondary.append(secondaryFlex.getEl());
  secondary.mount(el);

  // Danger
  const danger = new Section({ title: new Title({ text: 'Danger', type: 'section' }) });
  const dangerFlex = new Flex();
  new Button({ label: 'Default', color: 'danger' }).mount(dangerFlex.getEl());
  new Button({ label: 'Disabled', color: 'danger', disabled: true }).mount(dangerFlex.getEl());
  let dangerCount = 0;
  const dangerCounter = new Button({
    label: `Clicked: ${dangerCount}`,
    color: 'danger',
    onClick: () => {
      dangerCount++;
      dangerCounter.update(`Clicked: ${dangerCount}`);
    },
  });
  dangerCounter.mount(dangerFlex.getEl());
  danger.append(dangerFlex.getEl());
  danger.mount(el);

  // Success
  const success = new Section({ title: new Title({ text: 'Success', type: 'section' }) });
  const successFlex = new Flex();
  new Button({ label: 'Default', color: 'success' }).mount(successFlex.getEl());
  new Button({ label: 'Disabled', color: 'success', disabled: true }).mount(successFlex.getEl());
  let successCount = 0;
  const successCounter = new Button({
    label: `Clicked: ${successCount}`,
    color: 'success',
    onClick: () => {
      successCount++;
      successCounter.update(`Clicked: ${successCount}`);
    },
  });
  successCounter.mount(successFlex.getEl());
  success.append(successFlex.getEl());
  success.mount(el);

  // Warning
  const warning = new Section({ title: new Title({ text: 'Warning', type: 'section' }) });
  const warningFlex = new Flex();
  new Button({ label: 'Default', color: 'warning' }).mount(warningFlex.getEl());
  new Button({ label: 'Disabled', color: 'warning', disabled: true }).mount(warningFlex.getEl());
  let warningCount = 0;
  const warningCounter = new Button({
    label: `Clicked: ${warningCount}`,
    color: 'warning',
    onClick: () => {
      warningCount++;
      warningCounter.update(`Clicked: ${warningCount}`);
    },
  });
  warningCounter.mount(warningFlex.getEl());
  warning.append(warningFlex.getEl());
  warning.mount(el);

  view.el.appendChild(el);
  return view.el;
}
