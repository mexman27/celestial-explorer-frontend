import styles from './list.module.css';
import { Item } from './item/item';

type Props = {
  items: string[];
  type?: 'ol' | 'ul';
};

export class List {
  private el: HTMLUListElement | HTMLOListElement;

  constructor({ items, type = 'ul' }: Props) {
    this.el = document.createElement(type);
    this.el.className = styles['list'];

    items.forEach(text => {
      new Item(text).mount(this.el);
    });
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getEl(): HTMLUListElement | HTMLOListElement {
    return this.el;
  }
}
