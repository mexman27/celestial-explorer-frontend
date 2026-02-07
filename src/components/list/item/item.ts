import styles from './item.module.css';

export class Item {
  private el: HTMLLIElement;

  constructor(text: string) {
    this.el = document.createElement('li');
    this.el.className = styles['item'];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
