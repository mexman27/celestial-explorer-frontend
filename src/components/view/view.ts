import styles from './view.module.css';

export class View {
  el: HTMLDivElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['view'];
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
