export abstract class Component<TConfig = void> {
  protected el: HTMLElement;
  private unsubscribers: (() => void)[] = [];

  constructor(protected container: HTMLElement) {
    this.el = this.createDOM();
    this.container.appendChild(this.el);
    this.bindEvents();
    this.subscribeToStores();
  }

  protected abstract createDOM(): HTMLElement;

  protected bindEvents(): void {}

  protected subscribeToStores(): void {}

  protected addSubscription(unsubscribe: () => void): void {
    this.unsubscribers.push(unsubscribe);
  }

  update(_config: TConfig): void {}

  getElement(): HTMLElement {
    return this.el;
  }

  destroy(): void {
    this.unsubscribers.forEach((fn) => fn());
    this.unsubscribers = [];
    this.el.remove();
  }
}
