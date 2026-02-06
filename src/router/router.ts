export type Routes = Record<string, () => HTMLElement>;

export class Router {
  constructor(
    private outlet: HTMLElement,
    private routes: Routes,
    defaultPath?: string,
  ) {
    window.addEventListener('hashchange', () => this.resolve());

    if (!location.hash && defaultPath) location.hash = defaultPath;
    else this.resolve();
  }

  private resolve(): void {
    const viewFn = this.routes[location.hash];

    this.outlet.innerHTML = '';
    if (viewFn) this.outlet.appendChild(viewFn());
  }
}
