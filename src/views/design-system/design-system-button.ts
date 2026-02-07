import styles from './showcase.module.css';
import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';
import { Section } from '@/components/section/section';
import { Flex } from '@/components/flex/flex';

export function designSystemButton(): HTMLElement {
  const el = document.createElement('div');
  el.className = styles['page'];

  new Title({ text: 'Button' }).mount(el);

  // Colors
  const colors = new Section({ title: new Title({ text: 'Colors', type: 'section' }) });
  const colorsFlex = new Flex();
  new Button({ label: 'Primary' }).mount(colorsFlex.getEl());
  new Button({ label: 'Secondary', color: 'secondary' }).mount(colorsFlex.getEl());
  new Button({ label: 'Danger', color: 'danger' }).mount(colorsFlex.getEl());
  colors.append(colorsFlex.getEl());
  colors.mount(el);

  // Disabled
  const disabled = new Section({ title: new Title({ text: 'Disabled', type: 'section' }) });
  const disabledFlex = new Flex();
  new Button({ label: 'Primary', disabled: true }).mount(disabledFlex.getEl());
  new Button({ label: 'Secondary', color: 'secondary', disabled: true }).mount(disabledFlex.getEl());
  new Button({ label: 'Danger', color: 'danger', disabled: true }).mount(disabledFlex.getEl());
  disabled.append(disabledFlex.getEl());
  disabled.mount(el);

  // Interactive
  const interactive = new Section({ title: new Title({ text: 'Interactive', type: 'section' }) });
  const interactiveFlex = new Flex();
  let count = 0;
  const counter = new Button({
    label: `Clicked: ${count}`,
    onClick: () => {
      count++;
      counter.update(`Clicked: ${count}`);
    },
  });
  counter.mount(interactiveFlex.getEl());

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
  toggle.mount(interactiveFlex.getEl());
  targetBtn.mount(interactiveFlex.getEl());
  interactive.append(interactiveFlex.getEl());
  interactive.mount(el);

  return el;
}
