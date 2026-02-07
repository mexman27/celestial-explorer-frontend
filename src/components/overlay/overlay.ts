import styles from './overlay.module.css';

type OverlayProps = {
  visible?: boolean;
  message?: string;
};

export class Overlay {
  private el: HTMLDivElement;
  private spinnerEl: HTMLDivElement;
  private messageEl: HTMLSpanElement;

  constructor(props?: OverlayProps) {
    const { visible = false, message = '' } = props ?? {};

    this.el = document.createElement('div');
    this.el.className = styles['overlay'];
    this.el.style.display = visible ? '' : 'none';

    this.spinnerEl = document.createElement('div');
    this.spinnerEl.className = styles['spinner'];

    this.messageEl = document.createElement('span');
    this.messageEl.textContent = message;

    this.el.appendChild(this.spinnerEl);
    this.el.appendChild(this.messageEl);
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(message: string): void {
    this.messageEl.textContent = message;
  }

  show(): void {
    this.el.style.display = '';
  }

  hide(): void {
    this.el.style.display = 'none';
  }
}
