import styles from './nav.module.css';
import { SidebarLink } from '@/router/sidebar';

type Props = {
  links: Record<string, SidebarLink[]>;
};

export class SidebarNav {
  private el: HTMLElement;
  private links: Record<string, SidebarLink[]>;

  constructor({ links }: Props) {
    this.links = links;
    this.el = document.createElement('nav');
    this.el.className = styles['nav'];

    this.render();
    window.addEventListener('hashchange', () => this.render());
  }

  private getSection(): string {
    const hash = location.hash;
    // Find the section key whose prefix matches the current hash
    // E.g. '#/stars/brightest' starts with '#/stars'
    // Sort by length descending so '#/' doesn't match everything first
    const sections = Object.keys(this.links).sort((a, b) => b.length - a.length);
    for (const section of sections) {
      if (hash === section || hash.startsWith(section + '/')) return section;
    }
    return '';
  }

  private render(): void {
    const section = this.getSection();
    const currentLinks = this.links[section] ?? [];

    this.el.innerHTML = '';
    currentLinks.forEach(({ label, href }) => {
      const a = document.createElement('a');
      a.className = styles['link'];
      a.href = href;
      a.textContent = label;

      if (location.hash === href) {
        a.classList.add(styles['active']);
      }

      this.el.appendChild(a);
    });
  }

  mount(parent: HTMLElement): void {
    parent.appendChild(this.el);
  }
}
