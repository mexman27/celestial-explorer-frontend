import styles from './flex.module.css';

export class Flex {
  private el: HTMLDivElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['flex'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getEl(): HTMLDivElement {
    return this.el;
  }
}
