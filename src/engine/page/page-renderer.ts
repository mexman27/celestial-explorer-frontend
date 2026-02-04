import type { PageDefinition, PageUpdate } from './types';
import {
  HeaderRegion,
  SidebarRegion,
  VisualizationRegion,
  DetailRegion,
} from './regions';
import './page-renderer.css';

const DEFAULT_PAGE: PageDefinition = {
  visualization: null,
  sidebar: null,
  detail: null,
  header: { title: 'Celestial Explorer', breadcrumbs: [] },
};

export class PageRenderer {
  private currentPage: PageDefinition;
  private layout: HTMLElement;
  private regions: {
    header: HeaderRegion;
    sidebar: SidebarRegion;
    visualization: VisualizationRegion;
    detail: DetailRegion;
  };

  constructor(container: HTMLElement) {
    this.currentPage = { ...DEFAULT_PAGE };

    this.layout = document.createElement('div');
    this.layout.className = 'layout';
    container.appendChild(this.layout);

    this.regions = {
      header: new HeaderRegion(this.layout),
      sidebar: new SidebarRegion(this.layout),
      visualization: new VisualizationRegion(this.layout),
      detail: new DetailRegion(this.layout),
    };

    this.render(DEFAULT_PAGE);
  }

  render(update: PageUpdate): void {
    if (update.header !== undefined) {
      this.regions.header.update(update.header);
      this.currentPage.header = update.header;
    }
    if (update.sidebar !== undefined) {
      this.regions.sidebar.update(update.sidebar);
      this.currentPage.sidebar = update.sidebar;
    }
    if (update.visualization !== undefined) {
      this.regions.visualization.update(update.visualization);
      this.currentPage.visualization = update.visualization;
    }
    if (update.detail !== undefined) {
      this.regions.detail.update(update.detail);
      this.currentPage.detail = update.detail;
    }
  }

  getState(): PageDefinition {
    return { ...this.currentPage };
  }

  getRegion<K extends keyof typeof this.regions>(
    name: K
  ): (typeof this.regions)[K] {
    return this.regions[name];
  }
}
