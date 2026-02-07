import {
  InstancedMesh,
  SphereGeometry,
  MeshBasicMaterial,
  Object3D,
  Color,
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

  clear(): void {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.dispose();
      this.mesh = null;
    }
  }

  dispose(): void {
    this.clear();
    this.geometry.dispose();
    this.material.dispose();
  }
}
