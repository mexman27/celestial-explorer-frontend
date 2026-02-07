import styles from './section.module.css';
import { Title } from '../title/title';

type Props = {
  title?: Title;
};

export class Section {
  private el: HTMLElement;

  constructor({ title }: Props = {}) {
    this.el = document.createElement('section');
    this.el.className = styles['section'];
    if (title) {
      title.mount(this.el);
    }
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  append(child: HTMLElement): void {
    this.el.appendChild(child);
  }
}
