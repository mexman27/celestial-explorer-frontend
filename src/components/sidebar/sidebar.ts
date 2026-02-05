import styles from './sidebar.module.css';

type Props = {
  parent: HTMLElement
};

export class Sidebar {
  private el: HTMLElement;

  constructor({ parent }: Props ) {
    this.el = document.createElement('div');
    this.el.className = styles['sidebar'];
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
