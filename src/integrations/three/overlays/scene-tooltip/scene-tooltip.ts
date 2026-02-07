import styles from './scene-tooltip.module.css';

export type TooltipRow = {
  label: string;
  value: string;
};

const OFFSET = 12;

export class SceneTooltip {
  private el: HTMLDivElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = styles['tooltip'];
    this.el.style.display = 'none';
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  show(rows: TooltipRow[], screenX: number, screenY: number): void {
    this.el.innerHTML = '';

    for (const { label, value } of rows) {
      this.addRow(label, value);
    }

    this.el.style.display = 'block';
    this.el.style.left = `${screenX + OFFSET}px`;
    this.el.style.top = `${screenY + OFFSET}px`;

    // Edge clamping
    const box = this.el.getBoundingClientRect();
    if (box.right > window.innerWidth) {
      this.el.style.left = `${screenX - OFFSET - box.width}px`;
    }
    if (box.bottom > window.innerHeight) {
      this.el.style.top = `${screenY - OFFSET - box.height}px`;
    }
  }

  hide(): void {
    this.el.style.display = 'none';
    this.setInteractive(false);
  }

  setInteractive(value: boolean): void {
    this.el.style.pointerEvents = value ? 'auto' : '';
  }

  addLink(text: string, href: string): void {
    const link = document.createElement('a');
    link.className = styles['link'];
    link.href = href;
    link.textContent = text;
    this.el.appendChild(link);
  }

  private addRow(label: string, value: string): void {
    const row = document.createElement('div');
    row.className = styles['row'];

    const labelEl = document.createElement('span');
    labelEl.className = styles['label'];
    labelEl.textContent = label;

    const valueEl = document.createElement('span');
    valueEl.className = styles['value'];
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(valueEl);
    this.el.appendChild(row);
  }
}
