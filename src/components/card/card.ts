import styles from './card.module.css';
import { Title } from '../title/title';

export type Row = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  body?: string;
  rows?: Row[];
};

export class Card {
  el: HTMLDivElement;
  body: HTMLDivElement;
  private title: Title | null = null;

  constructor({ title, body, rows }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['card'];

    if (title) {
      this.title = new Title({ text: title, type: 'card' });
      this.title.mount(this.el);
    }

    this.body = document.createElement('div');
    this.body.className = styles['body'];
    if (body) {
      this.body.textContent = body;
    } else if (rows) {
      for (const row of rows) {
        this.body.appendChild(this.buildRow(row));
      }
    }
    this.el.appendChild(this.body);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update({ title, body }: Partial<Pick<Props, 'title' | 'body'>>): void {
    if (title !== undefined && this.title) {
      this.title.update(title);
    }
    if (body !== undefined) {
      this.body.textContent = body;
    }
  }

  private buildRow({ label, value }: Row): HTMLDivElement {
    const row = document.createElement('div');
    row.className = styles['row'];

    const labelEl = document.createElement('span');
    labelEl.className = styles['row-label'];
    labelEl.textContent = label;

    const valueEl = document.createElement('span');
    valueEl.className = styles['row-value'];
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    return row;
  }
}
