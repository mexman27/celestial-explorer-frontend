import styles from './text.module.css';

type Variant = 'body' | 'muted' | 'small';

type Props = {
  text: string;
  variant?: Variant;
};

export class Text {
  el: HTMLParagraphElement;

  constructor({ text, variant = 'body' }: Props) {
    this.el = document.createElement('p');
    this.el.className = styles[variant];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(text: string): void {
    this.el.textContent = text;
  }
}
