import {
  InstancedMesh,
  SphereGeometry,
  MeshBasicMaterial,
  Object3D,
  Color,
  Matrix4,
} from 'three';
import type { Scene } from 'three';

export type StarPoint = {
  position: [number, number, number];
  color: [number, number, number];
  size: number;
};

export class StarField {
  private mesh: InstancedMesh | null = null;
  private geometry = new SphereGeometry(1, 8, 6);
  private material = new MeshBasicMaterial();
  private highlightedId: number | null = null;
  private savedColor: Color | null = null;
  private savedMatrix: Matrix4 | null = null;

  constructor(private scene: Scene) {}

  get currentMesh(): InstancedMesh | null {
    return this.mesh;
  }

  setData(stars: StarPoint[]): void {
    this.clear();

    if (stars.length === 0) return;

    const mesh = new InstancedMesh(this.geometry, this.material, stars.length);
    const dummy = new Object3D();
    const color = new Color();

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      dummy.position.set(star.position[0], star.position[1], star.position[2]);
      dummy.scale.setScalar(star.size);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setRGB(star.color[0], star.color[1], star.color[2]));
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    this.mesh = mesh;
    this.scene.add(mesh);
  }

  highlight(instanceId: number): void {
    if (!this.mesh) return;

    this.savedColor = new Color();
    this.mesh.getColorAt(instanceId, this.savedColor);

    this.savedMatrix = new Matrix4();
    this.mesh.getMatrixAt(instanceId, this.savedMatrix);

    this.highlightedId = instanceId;

    // Accent color from CSS
    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim();
    this.mesh.setColorAt(instanceId, new Color(hex));
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;

    // Scale up 2x from current matrix
    const dummy = new Object3D();
    dummy.applyMatrix4(this.savedMatrix);
    dummy.scale.multiplyScalar(2);
    dummy.updateMatrix();
    this.mesh.setMatrixAt(instanceId, dummy.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  clearHighlight(): void {
    if (!this.mesh || this.highlightedId == null) return;

    if (this.savedColor) {
      this.mesh.setColorAt(this.highlightedId, this.savedColor);
      if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    }
    if (this.savedMatrix) {
      this.mesh.setMatrixAt(this.highlightedId, this.savedMatrix);
      this.mesh.instanceMatrix.needsUpdate = true;
    }

    this.highlightedId = null;
    this.savedColor = null;
    this.savedMatrix = null;
  }

  clear(): void {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.dispose();
      this.mesh = null;
    }
    this.highlightedId = null;
    this.savedColor = null;
    this.savedMatrix = null;
  }

  dispose(): void {
    this.clear();
    this.geometry.dispose();
    this.material.dispose();
  }
}
