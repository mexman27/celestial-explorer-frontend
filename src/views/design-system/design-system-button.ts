import { View } from '@/components/view/view.ts';
import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Flex } from '@/components/flex/flex';

export function designSystemButton(): HTMLElement {
  const view = new View();
  const page = new Flex({ direction: 'column', gap: 8 });

  new Title({ text: 'Button' }).mount(page.el);

  // Primary
  const primary = new Section({ title: new Title({ text: 'Primary', type: 'section' }) });
  const primaryFlex = new Flex();
  new Button({ label: 'Default' }).mount(primaryFlex.el);
  new Button({ label: 'Disabled', disabled: true }).mount(primaryFlex.el);
  let primaryCount = 0;
  const primaryCounter = new Button({
    label: `Clicked: ${primaryCount}`,
    onClick: () => {
      primaryCount++;
      primaryCounter.update(`Clicked: ${primaryCount}`);
    },
  });
  primaryCounter.mount(primaryFlex.el);
  primary.append(primaryFlex.el);
  primary.mount(page.el);

  // Secondary
  const secondary = new Section({ title: new Title({ text: 'Secondary', type: 'section' }) });
  const secondaryFlex = new Flex();
  new Button({ label: 'Default', color: 'secondary' }).mount(secondaryFlex.el);
  new Button({ label: 'Disabled', color: 'secondary', disabled: true }).mount(secondaryFlex.el);
  let secondaryCount = 0;
  const secondaryCounter = new Button({
    label: `Clicked: ${secondaryCount}`,
    color: 'secondary',
    onClick: () => {
      secondaryCount++;
      secondaryCounter.update(`Clicked: ${secondaryCount}`);
    },
  });
  secondaryCounter.mount(secondaryFlex.el);
  secondary.append(secondaryFlex.el);
  secondary.mount(page.el);

  // Danger
  const danger = new Section({ title: new Title({ text: 'Danger', type: 'section' }) });
  const dangerFlex = new Flex();
  new Button({ label: 'Default', color: 'danger' }).mount(dangerFlex.el);
  new Button({ label: 'Disabled', color: 'danger', disabled: true }).mount(dangerFlex.el);
  let dangerCount = 0;
  const dangerCounter = new Button({
    label: `Clicked: ${dangerCount}`,
    color: 'danger',
    onClick: () => {
      dangerCount++;
      dangerCounter.update(`Clicked: ${dangerCount}`);
    },
  });
  dangerCounter.mount(dangerFlex.el);
  danger.append(dangerFlex.el);
  danger.mount(page.el);

  // Success
  const success = new Section({ title: new Title({ text: 'Success', type: 'section' }) });
  const successFlex = new Flex();
  new Button({ label: 'Default', color: 'success' }).mount(successFlex.el);
  new Button({ label: 'Disabled', color: 'success', disabled: true }).mount(successFlex.el);
  let successCount = 0;
  const successCounter = new Button({
    label: `Clicked: ${successCount}`,
    color: 'success',
    onClick: () => {
      successCount++;
      successCounter.update(`Clicked: ${successCount}`);
    },
  });
  successCounter.mount(successFlex.el);
  success.append(successFlex.el);
  success.mount(page.el);

  // Warning
  const warning = new Section({ title: new Title({ text: 'Warning', type: 'section' }) });
  const warningFlex = new Flex();
  new Button({ label: 'Default', color: 'warning' }).mount(warningFlex.el);
  new Button({ label: 'Disabled', color: 'warning', disabled: true }).mount(warningFlex.el);
  let warningCount = 0;
  const warningCounter = new Button({
    label: `Clicked: ${warningCount}`,
    color: 'warning',
    onClick: () => {
      warningCount++;
      warningCounter.update(`Clicked: ${warningCount}`);
    },
  });
  warningCounter.mount(warningFlex.el);
  warning.append(warningFlex.el);
  warning.mount(page.el);

  page.mount(view.el);
  return view.el;
}
