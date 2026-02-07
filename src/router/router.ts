type ViewResult = HTMLElement | null | void;
export type Routes = Record<string, () => ViewResult | Promise<ViewResult>>;

export class Router {
  constructor(
    private outlet: HTMLElement,
    private routes: Routes,
    private defaultPath?: string,
  ) {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  private resolve(): void {
    const hash = location.hash.split('?')[0];

    if ((!hash || hash === '#/') && this.defaultPath) {
      location.hash = this.defaultPath;
      return;
    }

    const viewFn = this.routes[hash];
    this.outlet.innerHTML = '';
    if (!viewFn) return;

    const result = viewFn();
    if (result instanceof Promise) {
      result.then(el => { if (el) this.outlet.appendChild(el); });
    } else if (result) {
      this.outlet.appendChild(result);
    }
  }
}
