import { Router } from '@/engine/router/router';
import { PageRenderer } from '@/engine/page/page-renderer';
import { pages, pageRenderers } from '@/pages';

export class App {
  private router: Router;
  private pageRenderer: PageRenderer;

  constructor(container: HTMLElement) {
    this.router = new Router();
    this.pageRenderer = new PageRenderer(container);
  }

  start(): void {
    this.router.onChange(() => {
      const path = this.router.getPath();
      const page = pages[path] ?? pages['#/'];
      if (page) {
        this.pageRenderer.render(page);

        const renderers = pageRenderers[path];
        if (renderers) {
          if (renderers.content) {
            const vizRegion = this.pageRenderer.getRegion('visualization');
            renderers.content(vizRegion.getContainer());
          }
          if (renderers.sidebar) {
            const sidebarRegion = this.pageRenderer.getRegion('sidebar');
            renderers.sidebar(sidebarRegion.getContainer());
          }
        }
      }
    });
  }
}
