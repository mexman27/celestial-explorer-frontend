import styles from './header.module.css';

type Props = {
  title: string;
};

export class Header {
  private el: HTMLDivElement;

  constructor({ title }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['header'];
    this.el.textContent = title;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(title: string): void {
    this.el.textContent = title;
  }
}
