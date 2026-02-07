import styles from './title.module.css';

type TitleType = 'page' | 'section' | 'card';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const levelMap: Record<TitleType, Level> = {
  page: 'h2',
  section: 'h3',
  card: 'h3',
};

type Props = {
  text: string;
  type?: TitleType;
};

export class Title {
  private el: HTMLHeadingElement;

  constructor({ text, type = 'page' }: Props) {
    this.el = document.createElement(levelMap[type]);
    this.el.className = styles[type];
    this.el.textContent = text;
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }

  update(text: string): void {
    this.el.textContent = text;
  }
}
