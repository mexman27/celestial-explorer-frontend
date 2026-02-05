import styles from './sidebar.module.css';

type Props = {
  content: string;
};

export class Sidebar {
  private el: HTMLElement;

  constructor({ content }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['sidebar'];
    this.el.textContent = content;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
