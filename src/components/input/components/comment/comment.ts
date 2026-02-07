import styles from './comment.module.css';

export class Comment {
  private el: HTMLSpanElement;

  constructor(text: string) {
    this.el = document.createElement('span');
    this.el.className = styles['comment'];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
