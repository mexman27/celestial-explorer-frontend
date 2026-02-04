import { Component } from '@/engine/dom/component';
import styles from './card.module.css';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardConfig {
  variant?: CardVariant;
  interactive?: boolean;
  onClick?: () => void;
}

export class Card extends Component<CardConfig> {
  private config: CardConfig = {};
  private clickHandler: (() => void) | null = null;
  private contentContainer: HTMLElement = null!;

  protected createDOM(): HTMLElement {
    const card = document.createElement('div');
    card.className = styles.card ?? '';

    const content = document.createElement('div');
    content.className = styles.card__content ?? '';
    card.appendChild(content);
    this.contentContainer = content;

    return card;
  }

  protected bindEvents(): void {
    this.el.addEventListener('click', () => {
      if (this.config.interactive && this.clickHandler) {
        this.clickHandler();
      }
    });
  }

  update(config: CardConfig): void {
    this.config = config;
    this.clickHandler = config.onClick ?? null;

    const variant = config.variant ?? 'default';
    const classes = [styles.card, styles[`card--${variant}`]];

    if (config.interactive) {
      classes.push(styles['card--interactive']);
    }

    this.el.className = classes.filter(Boolean).join(' ');
  }

  getContentContainer(): HTMLElement {
    return this.contentContainer;
  }

  setContent(content: string | HTMLElement): void {
    if (!this.contentContainer) {
      console.error('Card.setContent: contentContainer is undefined');
      return;
    }
    if (typeof content === 'string') {
      this.contentContainer.innerHTML = content;
    } else {
      this.contentContainer.innerHTML = '';
      this.contentContainer.appendChild(content);
    }
  }
}

export function createCard(container: HTMLElement, config: CardConfig): Card {
  const card = new Card(container);
  card.update(config);
  return card;
}
