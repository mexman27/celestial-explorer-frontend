import styles from './item.module.css';
import { isSafeUrl } from '@/services/url/is-safe-url.ts';

type Props = {
  label: string;
  href: string;
};

export class Item {
  private el: HTMLElement;
  private href: string;

  constructor({ label, href }: Props) {
    this.href = href;
    if (isSafeUrl(href)) {
      const a = document.createElement('a');
      a.href = href;
      this.el = a;
    } else {
      this.el = document.createElement('span');
    }
    this.el.className = styles['item'];
    this.el.textContent = label;

    this.syncActive();
    window.addEventListener('hashchange', () => this.syncActive());
  }

  private syncActive(): void {
    const hash = location.hash;
    const isActive = hash === this.href || hash.startsWith(this.href + '/');
    this.el.classList.toggle(styles['active'], isActive);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(label: string): void {
    this.el.textContent = label;
  }
}
