import styles from './sidebar.module.css';

export class Sidebar {
  private el: HTMLElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['sidebar'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
