import { Matrix4, Vector3 } from 'three';
import type { Viewport } from '../objects/viewport.ts';
import type { StarField } from '../objects/star-field.ts';

export type StarHit = {
  instanceId: number;
  screenX: number;
  screenY: number;
};

type StarPickerProps = {
  onHover: (hit: StarHit | null) => void;
  throttleMs?: number;
  pickRadius?: number;
};

const matrix = new Matrix4();
const pos = new Vector3();
const projected = new Vector3();

export class StarPicker {
  private lastCall = 0;
  private throttleMs: number;
  private pickRadius: number;

  constructor(
    private viewport: Viewport,
    private starField: StarField,
    private props: StarPickerProps,
  ) {
    this.throttleMs = props.throttleMs ?? 50;
    this.pickRadius = props.pickRadius ?? 10;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    const el = viewport.renderer.domElement;
    el.addEventListener('mousemove', this.handleMouseMove);
    el.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private handleMouseMove(e: MouseEvent): void {
    const now = performance.now();
    if (now - this.lastCall < this.throttleMs) return;
    this.lastCall = now;

    const mesh = this.starField.currentMesh;
    if (!mesh) {
      this.props.onHover(null);
      return;
    }

    const rect = this.viewport.renderer.domElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const camera = this.viewport.camera;
    const threshold = this.pickRadius * this.pickRadius;

    let closestDist = Infinity;
    let closestId = -1;

    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, matrix);
      pos.setFromMatrixPosition(matrix);
      projected.copy(pos).project(camera);

      // Skip stars behind camera
      if (projected.z < 0 || projected.z > 1) continue;

      const sx = (projected.x * 0.5 + 0.5) * w;
      const sy = (-projected.y * 0.5 + 0.5) * h;

      const dx = sx - mouseX;
      const dy = sy - mouseY;
      const dist = dx * dx + dy * dy;

      if (dist < threshold && dist < closestDist) {
        closestDist = dist;
        closestId = i;
      }
    }

    if (closestId >= 0) {
      this.props.onHover({
        instanceId: closestId,
        screenX: e.clientX,
        screenY: e.clientY,
      });
    } else {
      this.props.onHover(null);
    }
  }

  private handleMouseLeave(): void {
    this.props.onHover(null);
  }

  dispose(): void {
    const el = this.viewport.renderer.domElement;
    el.removeEventListener('mousemove', this.handleMouseMove);
    el.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}
