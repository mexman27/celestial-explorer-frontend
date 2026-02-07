import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Viewport } from '../objects/viewport.ts';

type CameraControlsProps = {
  enableDamping?: boolean;
  dampingFactor?: number;
  minDistance?: number;
  maxDistance?: number;
};

export class CameraControls {
  private controls: OrbitControls;
  private unsubscribe: () => void;

  constructor(viewport: Viewport, props?: CameraControlsProps) {
    const {
      enableDamping = true,
      dampingFactor = 0.05,
      minDistance = 1,
      maxDistance = 500,
    } = props ?? {};

    this.controls = new OrbitControls(viewport.camera, viewport.renderer.domElement);
    this.controls.enableDamping = enableDamping;
    this.controls.dampingFactor = dampingFactor;
    this.controls.minDistance = minDistance;
    this.controls.maxDistance = maxDistance;

    this.unsubscribe = viewport.onTick(() => this.controls.update());
  }

  dispose(): void {
    this.unsubscribe();
    this.controls.dispose();
  }
}
