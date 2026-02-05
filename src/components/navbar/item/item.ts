import styles from './item.module.css';

type Props = {
  label: string;
};

export class Item {
  private el: HTMLSpanElement;

  constructor({ label }: Props) {
    this.el = document.createElement('span');
    this.el.className = styles['item'];
    this.el.textContent = label;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(label: string): void {
    this.el.textContent = label;
  }
}
