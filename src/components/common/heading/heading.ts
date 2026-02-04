import { Component } from '@/engine/dom/component';
import styles from './heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'default' | 'muted';

export interface HeadingConfig {
  text: string;
  level?: HeadingLevel;
  variant?: HeadingVariant;
}

export class Heading extends Component<HeadingConfig> {
  private headingEl: HTMLHeadingElement | null = null;

  protected createDOM(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = styles['heading-wrapper'] ?? '';
    return wrapper;
  }

  update(config: HeadingConfig): void {
    const level = config.level ?? 2;
    const variant = config.variant ?? 'default';
    const tagName = `h${level}` as keyof HTMLElementTagNameMap;

    if (this.headingEl) {
      this.headingEl.remove();
    }

    this.headingEl = document.createElement(tagName) as HTMLHeadingElement;
    const classes = [
      styles.heading,
      styles[`heading--${level}`],
      styles[`heading--${variant}`],
    ];
    this.headingEl.className = classes.filter(Boolean).join(' ');
    this.headingEl.textContent = config.text;

    this.el.appendChild(this.headingEl);
  }
}

export function createHeading(
  container: HTMLElement,
  config: HeadingConfig
): Heading {
  const heading = new Heading(container);
  heading.update(config);
  return heading;
}
