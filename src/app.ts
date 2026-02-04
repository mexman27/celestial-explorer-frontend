import { main } from '@/engine/main';

export class App {
  constructor(private container: HTMLElement) {}

  start(): void {
    main(this.container);
  }
}
