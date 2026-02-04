import { Component } from '@/engine/dom/component';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonConfig {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export class Button extends Component<ButtonConfig> {
  private config: ButtonConfig = { label: '' };
  private clickHandler: (() => void) | null = null;

  protected createDOM(): HTMLElement {
    const button = document.createElement('button');
    button.className = styles.btn ?? '';
    return button;
  }

  protected bindEvents(): void {
    this.el.addEventListener('click', () => {
      if (!this.config.disabled && !this.config.loading && this.clickHandler) {
        this.clickHandler();
      }
    });
  }

  update(config: ButtonConfig): void {
    this.config = config;
    this.clickHandler = config.onClick ?? null;

    const variant = config.variant ?? 'primary';
    const size = config.size ?? 'medium';

    const classes = [
      styles.btn,
      styles[`btn--${variant}`],
      styles[`btn--${size}`],
    ];

    if (config.disabled) {
      this.el.setAttribute('disabled', 'true');
    } else {
      this.el.removeAttribute('disabled');
    }

    if (config.loading) {
      this.el.setAttribute('data-loading', 'true');
      this.el.innerHTML = `<span class="${styles.btn__spinner ?? ''}"></span>`;
    } else {
      this.el.removeAttribute('data-loading');
      this.el.textContent = config.label;
    }

    this.el.className = classes.filter(Boolean).join(' ');
  }
}

export function createButton(
  container: HTMLElement,
  config: ButtonConfig
): Button {
  const button = new Button(container);
  button.update(config);
  return button;
}
