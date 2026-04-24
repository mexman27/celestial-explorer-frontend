import styles from './link.module.css';
import { isSafeUrl } from '@/services/url/is-safe-url.ts';

type Props = {
  text: string;
  href: string;
};

export class Link {
  el: HTMLElement;

  constructor({ text, href }: Props) {
    if (isSafeUrl(href)) {
      const a = document.createElement('a');
      a.href = href;
      this.el = a;
    } else {
      this.el = document.createElement('span');
    }
    this.el.className = styles['link'];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
