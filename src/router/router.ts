export type Routes = Record<string, () => HTMLElement>;

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
    if ((!location.hash || location.hash === '#/') && this.defaultPath) {
      location.hash = this.defaultPath;
      return;
    }

    const viewFn = this.routes[location.hash];

    this.outlet.innerHTML = '';
    if (viewFn) this.outlet.appendChild(viewFn());
  }
}
