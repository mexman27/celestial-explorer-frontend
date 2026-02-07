import styles from './grid.module.css';

type ColumnWidth = '1fr' | '2fr' | '3fr' | '100px' | '200px' | '250px';

type Props = {
  columns?: ColumnWidth[];
};

export class Grid {
  private el: HTMLDivElement;

  constructor({ columns }: Props = {}) {
    this.el = document.createElement('div');
    this.el.className = styles['grid'];
    if (columns) {
      this.el.style.gridTemplateColumns = columns.join(' ');
    }
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getEl(): HTMLDivElement {
    return this.el;
  }
}
