import styles from './label.module.css';

export class Label {
  private el: HTMLLabelElement;

  constructor(text: string) {
    this.el = document.createElement('label');
    this.el.className = styles['label'];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
