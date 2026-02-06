import styles from './sidebar.module.css';
import { SidebarNav } from './nav/nav';

type Props = {
  nav: SidebarNav;
};

export class Sidebar {
  private el: HTMLElement;

  constructor({ nav }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['sidebar'];
    nav.mount(this.el);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
