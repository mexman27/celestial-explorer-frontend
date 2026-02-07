import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Clock,
} from 'three';

type ViewportProps = {
  background?: number;
  fov?: number;
  near?: number;
  far?: number;
};

type TickCallback = (dt: number) => void;

export class Viewport {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;

  private clock: Clock;
  private frameId: number | null = null;
  private tickCallbacks = new Set<TickCallback>();
  private resizeObserver: ResizeObserver;

  constructor(
    private container: HTMLElement,
    props?: ViewportProps,
  ) {
    const { background = 0x000000, fov = 60, near = 0.1, far = 2000 } = props ?? {};

    this.scene = new Scene();
    this.scene.background = new Color(background);

    this.camera = new PerspectiveCamera(fov, 1, near, far);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    this.clock = new Clock(false);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }

  onTick(cb: TickCallback): () => void {
    this.tickCallbacks.add(cb);
    return () => this.tickCallbacks.delete(cb);
  }

  start(): void {
    if (this.frameId !== null) return;
    this.clock.start();
    this.loop();
  }

  stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.clock.stop();
  }

  dispose(): void {
    this.stop();
    this.resizeObserver.disconnect();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.tickCallbacks.clear();
  }

  private resize(): void {
    const { clientWidth: w, clientHeight: h } = this.container;
    if (w === 0 || h === 0) return;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private loop = (): void => {
    this.frameId = requestAnimationFrame(this.loop);
    const dt = this.clock.getDelta();

    for (const cb of this.tickCallbacks) cb(dt);

    this.renderer.render(this.scene, this.camera);
  };
}
