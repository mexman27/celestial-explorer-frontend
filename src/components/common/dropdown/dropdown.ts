import { Component } from '@/engine/dom/component';
import styles from './dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownConfig {
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export class Dropdown extends Component<DropdownConfig> {
  private config: DropdownConfig = { options: [] };
  private triggerEl: HTMLButtonElement = null!;
  private menuEl: HTMLElement = null!;
  private isOpen = false;

  protected createDOM(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = styles.dropdown ?? '';

    const trigger = document.createElement('button');
    trigger.className = styles.dropdown__trigger ?? '';
    trigger.type = 'button';
    this.triggerEl = trigger;

    const menu = document.createElement('div');
    menu.className = styles.dropdown__menu ?? '';
    this.menuEl = menu;

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    return wrapper;
  }

  protected bindEvents(): void {
    this.triggerEl.addEventListener('click', () => {
      if (!this.config.disabled) {
        this.toggle();
      }
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.el.contains(e.target as Node)) {
        this.close();
      }
    });

    this.menuEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const optionClass = styles.dropdown__option ?? '';
      const option = target.closest(`.${optionClass}`) as HTMLElement;
      if (option) {
        const value = option.dataset.value;
        if (value && this.config.onChange) {
          this.config.onChange(value);
        }
        this.close();
      }
    });
  }

  update(config: DropdownConfig): void {
    this.config = config;

    const selectedOption = config.options.find((o) => o.value === config.value);
    const displayText =
      selectedOption?.label ?? config.placeholder ?? 'Select...';

    this.triggerEl.innerHTML = `
      <span class="${styles.dropdown__value ?? ''}">${displayText}</span>
      <span class="${styles.dropdown__arrow ?? ''}">▾</span>
    `;

    const triggerClasses = [styles.dropdown__trigger];
    if (!selectedOption && config.placeholder) {
      triggerClasses.push(styles['dropdown__trigger--placeholder']);
    }
    this.triggerEl.className = triggerClasses.filter(Boolean).join(' ');
    this.triggerEl.disabled = config.disabled ?? false;

    const wrapperClasses = [styles.dropdown];
    if (config.disabled) {
      wrapperClasses.push(styles['dropdown--disabled']);
    }
    if (this.isOpen) {
      wrapperClasses.push(styles['dropdown--open']);
    }
    this.el.className = wrapperClasses.filter(Boolean).join(' ');

    this.menuEl.innerHTML = config.options
      .map((opt) => {
        const optClasses = [styles.dropdown__option];
        if (opt.value === config.value) {
          optClasses.push(styles['dropdown__option--selected']);
        }
        return `
          <div class="${optClasses.filter(Boolean).join(' ')}" data-value="${opt.value}">
            ${opt.label}
          </div>
        `;
      })
      .join('');
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.isOpen = true;
    const openClass = styles['dropdown--open'];
    if (openClass) {
      this.el.classList.add(openClass);
    }
  }

  private close(): void {
    this.isOpen = false;
    const openClass = styles['dropdown--open'];
    if (openClass) {
      this.el.classList.remove(openClass);
    }
  }
}

export function createDropdown(
  container: HTMLElement,
  config: DropdownConfig
): Dropdown {
  const dropdown = new Dropdown(container);
  dropdown.update(config);
  return dropdown;
}
