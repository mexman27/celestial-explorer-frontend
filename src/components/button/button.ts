import styles from './button.module.css';

type Color = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

type Props = {
  label: string;
  color?: Color;
  disabled?: boolean;
  onClick?: () => void;
};

export class Button {
  private el: HTMLButtonElement;

  constructor({ label, color = 'primary', disabled = false, onClick }: Props) {
    this.el = document.createElement('button');
    this.el.className = `${styles['button']} ${styles[color]}`;
    this.el.textContent = label;
    this.el.disabled = disabled;

    if (onClick) {
      this.el.addEventListener('click', onClick);
    }
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(label: string): void {
    this.el.textContent = label;
  }

  disable(): void {
    this.el.disabled = true;
  }

  enable(): void {
    this.el.disabled = false;
  }
}
