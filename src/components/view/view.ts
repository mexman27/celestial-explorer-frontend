import styles from './view.module.css';

type Props = {
  parent: HTMLElement
};

export class View {
  private el: HTMLDivElement;

  constructor({ parent }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['view'];
    parent.appendChild(this.el);
  }

  update(content: string): void {
    this.el.textContent = content;
  }
}
