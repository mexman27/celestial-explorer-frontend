import styles from './view.module.css';

export class View {
  private el: HTMLDivElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['view'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
