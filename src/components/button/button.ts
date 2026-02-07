import styles from './button.module.css';

type Color = 'primary' | 'secondary' | 'danger';

type Props = {
  label: string;
  color?: Color;
  onClick?: () => void;
};

export class Button {
  private el: HTMLButtonElement;

  constructor({ label, color = 'primary', onClick }: Props) {
    this.el = document.createElement('button');
    this.el.className = `${styles['button']} ${styles[color]}`;
    this.el.textContent = label;

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

  setDisabled(disabled: boolean): void {
    this.el.disabled = disabled;
  }
}
