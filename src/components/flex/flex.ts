import styles from './flex.module.css';

type Direction = 'row' | 'column';
type Space = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

type Props = {
  direction?: Direction;
  gap?: Space;
};

export class Flex {
  el: HTMLDivElement;

  constructor({ direction = 'row', gap }: Props = {}) {
    this.el = document.createElement('div');
    this.el.className = styles[direction];
    if (gap) this.el.style.gap = `var(--space-${gap})`;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getEl(): HTMLDivElement {
    return this.el;
  }
}
