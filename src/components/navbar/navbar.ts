import styles from './navbar.module.css';

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
    this.el.innerHTML = '';
    items.forEach(item => {
      const span = document.createElement('span');
      span.className = styles['item'];
      span.textContent = item;
      this.el.appendChild(span);
    });
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(items: string[]): void {
    this.render(items);
  }
}
