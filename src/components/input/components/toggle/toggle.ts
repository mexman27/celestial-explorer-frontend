import styles from './toggle.module.css';

export class Toggle {
  private el: HTMLInputElement;

  constructor() {
    this.el = document.createElement('input');
    this.el.type = 'checkbox';
    this.el.className = styles['toggle'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
