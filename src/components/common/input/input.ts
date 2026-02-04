import { Component } from '@/engine/dom/component';
import styles from './input.module.css';

export type InputType = 'text' | 'number' | 'search';

export interface InputConfig {
  type?: InputType;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export class Input extends Component<InputConfig> {
  private config: InputConfig = {};
  private inputEl: HTMLInputElement = null!;
  private errorEl: HTMLElement = null!;

  protected createDOM(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = styles['input-wrapper'] ?? '';

    const input = document.createElement('input');
    input.className = styles.input ?? '';
    this.inputEl = input;

    const error = document.createElement('span');
    error.className = styles.input__error ?? '';
    this.errorEl = error;

    wrapper.appendChild(input);
    wrapper.appendChild(error);

    return wrapper;
  }

  protected bindEvents(): void {
    this.inputEl.addEventListener('input', () => {
      if (this.config.onChange) {
        this.config.onChange(this.inputEl.value);
      }
    });

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.config.onSubmit) {
        this.config.onSubmit(this.inputEl.value);
      }
    });
  }

  update(config: InputConfig): void {
    this.config = config;

    this.inputEl.type = config.type ?? 'text';
    this.inputEl.placeholder = config.placeholder ?? '';
    this.inputEl.disabled = config.disabled ?? false;

    if (config.value !== undefined) {
      this.inputEl.value = config.value;
    }

    const wrapperClasses = [styles['input-wrapper']];
    if (config.disabled) {
      wrapperClasses.push(styles['input-wrapper--disabled']);
    }
    if (config.error) {
      wrapperClasses.push(styles['input-wrapper--error']);
    }
    this.el.className = wrapperClasses.filter(Boolean).join(' ');

    if (config.error) {
      this.errorEl.textContent = config.error;
      this.errorEl.style.display = 'block';
    } else {
      this.errorEl.style.display = 'none';
    }
  }

  getValue(): string {
    return this.inputEl.value;
  }

  setValue(value: string): void {
    this.inputEl.value = value;
  }

  focus(): void {
    this.inputEl.focus();
  }
}

export function createInput(
  container: HTMLElement,
  config: InputConfig
): Input {
  const input = new Input(container);
  input.update(config);
  return input;
}
