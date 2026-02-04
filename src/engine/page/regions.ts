import type {
  HeaderConfig,
  SidebarConfig,
  VisualizationConfig,
  DetailConfig,
} from './types';

export abstract class Region<TConfig> {
  protected container: HTMLElement;
  protected currentConfig: TConfig | null = null;

  constructor(parent: HTMLElement, className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
    parent.appendChild(this.container);
  }

  update(config: TConfig | null): void {
    if (this.shouldUpdate(this.currentConfig, config)) {
      this.render(config);
      this.currentConfig = config;
    }
  }

  protected shouldUpdate(
    prev: TConfig | null,
    next: TConfig | null
  ): boolean {
    return JSON.stringify(prev) !== JSON.stringify(next);
  }

  protected abstract render(config: TConfig | null): void;

  getContainer(): HTMLElement {
    return this.container;
  }
}

export class HeaderRegion extends Region<HeaderConfig> {
  constructor(parent: HTMLElement) {
    super(parent, 'region-header');
  }

  protected render(config: HeaderConfig | null): void {
    if (!config) {
      this.container.innerHTML = '';
      return;
    }

    const breadcrumbsHtml = config.breadcrumbs
      .map((b) => `<a href="${b.path}" class="breadcrumb">${b.label}</a>`)
      .join('<span class="breadcrumb-sep">/</span>');

    this.container.innerHTML = `
      <div class="header-content">
        <div class="header-left">
          <div class="header-breadcrumbs">${breadcrumbsHtml}</div>
          <h1 class="header-title">${config.title}</h1>
        </div>
        <nav class="header-nav">
          <a href="#/" class="header-nav__link">Explorer</a>
          <a href="#/portfolio" class="header-nav__link">Portfolio</a>
        </nav>
      </div>
    `;
  }
}

export class SidebarRegion extends Region<SidebarConfig> {
  constructor(parent: HTMLElement) {
    super(parent, 'region-sidebar');
  }

  protected render(config: SidebarConfig | null): void {
    this.container.innerHTML = '';
    if (!config) {
      this.container.style.display = 'none';
      return;
    }

    this.container.style.display = 'block';
    this.container.dataset.view = config.view;
  }
}

export class VisualizationRegion extends Region<VisualizationConfig> {
  constructor(parent: HTMLElement) {
    super(parent, 'region-visualization');
  }

  protected render(config: VisualizationConfig | null): void {
    this.container.innerHTML = '';
    if (!config) {
      this.container.style.display = 'none';
      return;
    }

    this.container.style.display = 'block';
    this.container.dataset.mode = config.mode;
  }
}

export class DetailRegion extends Region<DetailConfig> {
  constructor(parent: HTMLElement) {
    super(parent, 'region-detail');
  }

  protected render(config: DetailConfig | null): void {
    if (!config) {
      this.container.style.display = 'none';
      return;
    }

    this.container.style.display = 'block';
  }
}
