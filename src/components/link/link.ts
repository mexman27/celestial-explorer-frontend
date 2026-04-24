import styles from './link.module.css';

type Props = {
  text: string;
  href: string;
};

export class Link {
  el: HTMLAnchorElement;

  constructor({ text, href }: Props) {
    this.el = document.createElement('a');
    this.el.className = styles['link'];
    this.el.href = href;
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
