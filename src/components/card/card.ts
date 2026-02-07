import styles from './card.module.css';
import { Title } from '../title/title';

type Props = {
  title?: string;
  body?: string;
};

export class Card {
  private el: HTMLDivElement;
  private title: Title | null = null;
  private bodyEl: HTMLDivElement;

  constructor({ title, body }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['card'];

    if (title) {
      this.title = new Title({ text: title, type: 'card' });
      this.title.mount(this.el);
    }

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = styles['body'];
    if (body) {
      this.bodyEl.textContent = body;
    }
    this.el.appendChild(this.bodyEl);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getBody(): HTMLDivElement {
    return this.bodyEl;
  }

  update({ title, body }: Partial<Props>): void {
    if (title !== undefined && this.title) {
      this.title.update(title);
    }
    if (body !== undefined) {
      this.bodyEl.textContent = body;
    }
  }
}
