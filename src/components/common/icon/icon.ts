import { Component } from '@/engine/dom/component';
import styles from './icon.module.css';

export type IconName =
  | 'star'
  | 'search'
  | 'filter'
  | 'close'
  | 'chevron-right'
  | 'chevron-down'
  | 'info'
  | 'settings'
  | 'ruler'
  | 'globe'
  | 'sun'
  | 'moon';

export type IconSize = 'small' | 'medium' | 'large';

export interface IconConfig {
  name: IconName;
  size?: IconSize;
  label?: string;
}

const ICONS: Record<IconName, string> = {
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  filter:
    '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  ruler:
    '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
};

export class Icon extends Component<IconConfig> {
  protected createDOM(): HTMLElement {
    const span = document.createElement('span');
    span.className = styles.icon ?? '';
    return span;
  }

  update(config: IconConfig): void {
    const size = config.size ?? 'medium';
    const svgContent = ICONS[config.name] ?? '';

    const classes = [styles.icon, styles[`icon--${size}`]];
    if (config.label) {
      classes.push(styles['icon--with-label']);
    }
    this.el.className = classes.filter(Boolean).join(' ');

    this.el.innerHTML = `
      <svg
        class="${styles.icon__svg ?? ''}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        ${svgContent}
      </svg>
      ${config.label ? `<span class="${styles.icon__label ?? ''}">${config.label}</span>` : ''}
    `;
  }
}

export function createIcon(container: HTMLElement, config: IconConfig): Icon {
  const icon = new Icon(container);
  icon.update(config);
  return icon;
}
