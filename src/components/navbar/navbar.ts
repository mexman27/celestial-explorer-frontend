import styles from './navbar.module.css';
import { Item } from './item/item';

type Props = {
  items: string[];
};

export class Navbar {
  private el: HTMLElement;

  constructor({ items }: Props) {
    this.el = document.createElement('nav');
    this.el.className = styles['navbar'];
    this.render(items);
  }

  private render(items: string[]): void {
    items.forEach(label => {
      new Item({ label }).mount(this.el);
    });
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  clear(): void {
    this.el.innerHTML = '';
  }

  update(items: string[]): void {
    this.clear();
    this.render(items);
  }
}
