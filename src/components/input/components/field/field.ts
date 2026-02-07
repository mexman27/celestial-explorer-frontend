import styles from './field.module.css';

type Props = {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export class Field {
  private el: HTMLInputElement;

  constructor({ placeholder, value, disabled = false, onChange }: Props = {}) {
    this.el = document.createElement('input');
    this.el.className = styles['field'];
    this.el.type = 'text';

    if (placeholder) this.el.placeholder = placeholder;
    if (value) this.el.value = value;
    this.el.disabled = disabled;

    if (onChange) {
      this.el.addEventListener('input', () => onChange(this.el.value));
    }
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  getValue(): string {
    return this.el.value;
  }

  disable(): void {
    this.el.disabled = true;
  }

  enable(): void {
    this.el.disabled = false;
  }
}
