import styles from './view.module.css';

type Props = {
  content: string;
};

export class View {
  el: HTMLDivElement;

  constructor({ content }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['view'];
    this.el.textContent = content;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
