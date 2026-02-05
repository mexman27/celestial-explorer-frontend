import styles from './header.module.css';
import { Navbar } from '../navbar/navbar';

type Props = {
  title: string;
  navbar: Navbar;
};

export class Header {
  private el: HTMLDivElement;
  private titleEl: HTMLSpanElement;

  constructor({ title, navbar }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['header'];

    this.titleEl = document.createElement('span');
    this.titleEl.textContent = title;
    this.el.appendChild(this.titleEl);

    navbar.mount(this.el);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(title: string): void {
    this.titleEl.textContent = title;
  }
}
