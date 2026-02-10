import styles from './view.module.css';

type Padding = 'p0' | 'p5' | 'p10' | 'p20';

type ViewProps = {
  padding?: Padding;
};

export class View {
  el: HTMLDivElement;

  constructor({ padding = 'p10' }: ViewProps = {}) {
    this.el = document.createElement('div');
    this.el.className = `${styles['view']} ${styles[padding]}`;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
