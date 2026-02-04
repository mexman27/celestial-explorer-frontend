import type { RouteChangeCallback } from './types';

export class Router {
  navigate(path: string): void {
    window.location.hash = path;
  }

  getPath(): string {
    return window.location.hash || '#/';
  }

  getParams(): URLSearchParams {
    const [, query] = window.location.hash.split('?');
    return new URLSearchParams(query);
  }

  onChange(callback: RouteChangeCallback): void {
    const handler = () => callback(this.getPath());
    window.addEventListener('hashchange', handler);
    handler();
  }
}
