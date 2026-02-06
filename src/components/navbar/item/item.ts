import styles from './item.module.css';

type Props = {
  label: string;
  href: string;
};

export class Item {
  private el: HTMLAnchorElement;

  constructor({ label, href }: Props) {
    this.el = document.createElement('a');
    this.el.href = href;
    this.el.className = styles['item'];
    this.el.textContent = label;

    this.syncActive();
    window.addEventListener('hashchange', () => this.syncActive());
  }

  private syncActive(): void {
    const hash = location.hash;
    const target = this.el.hash;
    const isActive = hash === target || hash.startsWith(target + '/');
    this.el.classList.toggle(styles['active'], isActive);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(label: string): void {
    this.el.textContent = label;
  }
}
