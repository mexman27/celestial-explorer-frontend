import { main } from '@/pages/main';

export class App {
  constructor(private container: HTMLElement) {}

  start(): void {
    this.container.appendChild(main());
  }
}
