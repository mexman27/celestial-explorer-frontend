import styles from './header.module.css';

export class Header {
  private el: HTMLDivElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['header'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
