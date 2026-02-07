import styles from './label.module.css';
import { Toggle } from '../toggle/toggle';

type Props = {
  text: string;
  toggle?: Toggle;
};

export class Label {
  private el: HTMLDivElement;

  constructor({ text, toggle }: Props) {
    this.el = document.createElement('div');
    this.el.className = styles['label-row'];

    if (toggle) {
      toggle.mount(this.el);
    }

    const labelEl = document.createElement('label');
    labelEl.className = styles['label'];
    labelEl.textContent = text;
    this.el.appendChild(labelEl);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
