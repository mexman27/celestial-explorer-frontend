import styles from './card.module.css';

type Props = {
  title?: string;
  body?: string;
};

export class Card {
  private el: HTMLDivElement;
  private titleEl: HTMLHeadingElement | null = null;
  private bodyEl: HTMLDivElement;

  constructor({ title, body }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['card'];

    if (title) {
      this.titleEl = document.createElement('h3');
      this.titleEl.className = styles['title'];
      this.titleEl.textContent = title;
      this.el.appendChild(this.titleEl);
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
    if (title !== undefined && this.titleEl) {
      this.titleEl.textContent = title;
    }
    if (body !== undefined) {
      this.bodyEl.textContent = body;
    }
  }
}
