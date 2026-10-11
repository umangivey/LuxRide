// Weapons and combat effects. Props are authored in the right-hand frame used by
// VrmAvatar.attachProp: grip at the origin, pointing along +Z.

import * as THREE from 'three';
import { loft } from './geometry';
import { toonMesh } from './toon';

function alongZ(g: THREE.BufferGeometry) {
  // loft() builds along +Y; rotate so +Y maps to +Z (its depth axis becomes -Y).
  g.rotateX(Math.PI / 2);
  return g;
}

export function makeKatana(): THREE.Group {
  const g = new THREE.Group();
  const blade = loft(
    Array.from({ length: 14 }, (_, i) => {
      const t = i / 13;
      const curve = 0.05 * t * t;
      const h = 0.015 * (1 - Math.pow(t, 6) * 0.85);
      return { y: 0.06 + t * 0.74, rx: 0.0035, rz: h, cz: -curve, p: 2.4 };
    }),
    { radial: 10, capTop: true },
  );
  g.add(toonMesh(alongZ(blade), { color: '#DDE5F0', rim: 0.6, outline: 0.0012, outlineColor: '#4A5368' }));
  const guard = new THREE.CylinderGeometry(0.034, 0.034, 0.008, 20);
  guard.rotateX(Math.PI / 2);
  guard.translate(0, 0, 0.055);
  g.add(toonMesh(guard, { color: '#C9A445', outline: 0.0012 }));
  const grip = loft([{ y: -0.17, rx: 0.014, rz: 0.017 }, { y: 0.05, rx: 0.013, rz: 0.016 }], { radial: 12, capBottom: true, capTop: true });
  g.add(toonMesh(alongZ(grip), { color: '#2B2433', outline: 0.0012 }));
  const pommel = new THREE.SphereGeometry(0.016, 12, 10);
  pommel.translate(0, 0, -0.175);
  g.add(toonMesh(pommel, { color: '#C9A445', outline: 0.0012 }));
  return g;
}

export function makeWand(): THREE.Group {
  const g = new THREE.Group();
  const stick = loft([{ y: -0.12, rx: 0.008, rz: 0.008 }, { y: 0.26, rx: 0.006, rz: 0.006 }], { radial: 12, capBottom: true, capTop: true });
  g.add(toonMesh(alongZ(stick), { color: '#F6F1FF', rim: 0.3, outline: 0.0012, outlineColor: '#6D5FA8' }));
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    const r = i % 2 === 0 ? 0.05 : 0.022;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  const star = new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, bevelSegments: 2 });
  star.translate(0, 0, -0.006);
  star.rotateX(Math.PI / 2);
  star.translate(0, 0, 0.3);
  g.add(toonMesh(star, { color: '#FFD45C', emissive: '#4A3200', rim: 0.4, outline: 0.0014, outlineColor: '#9A6A12' }));
  const gem = new THREE.OctahedronGeometry(0.014);
  gem.translate(0, 0, 0.3);
  g.add(toonMesh(gem, { color: '#FF8FC8', emissive: '#5A1034', outline: false }));
  return g;
}

/** Short-lived effects: sword arcs and spell bursts. */
export class Effects {
  readonly group = new THREE.Group();
  private items: { obj: THREE.Object3D; t: number; life: number; update: (k: number, dt: number) => void }[] = [];
  private sparkTex: THREE.Texture;

  constructor() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,240,250,0.9)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(32, 0);
    ctx.lineTo(38, 26);
    ctx.lineTo(64, 32);
    ctx.lineTo(38, 38);
    ctx.lineTo(32, 64);
    ctx.lineTo(26, 38);
    ctx.lineTo(0, 32);
    ctx.lineTo(26, 26);
    ctx.closePath();
    ctx.fill();
    this.sparkTex = new THREE.CanvasTexture(c);
    this.sparkTex.colorSpace = THREE.SRGBColorSpace;
  }

  slash(origin: THREE.Vector3, yaw: number, color = '#BFD8FF') {
    const geo = new THREE.RingGeometry(0.45, 0.85, 40, 1, Math.PI * 0.15, Math.PI * 1.1);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(origin);
    m.rotation.set(0.4, yaw, -0.7, 'YXZ');
    this.group.add(m);
    this.items.push({
      obj: m, t: 0, life: 0.35,
      update: (k) => {
        mat.opacity = 0.85 * (1 - k);
        m.scale.setScalar(0.85 + 0.35 * k);
      },
    });
  }

  burst(origin: THREE.Vector3, dir: THREE.Vector3, colors = ['#FFD45C', '#FF8FC8', '#9FD8FF']) {
    const n = 60;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const vel: THREE.Vector3[] = [];
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      pos.set([origin.x, origin.y, origin.z], i * 3);
      c.set(colors[i % colors.length]);
      col.set([c.r, c.g, c.b], i * 3);
      const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.3, Math.random() - 0.5).multiplyScalar(1.6).addScaledVector(dir, 3 + Math.random() * 2.5);
      vel.push(v);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.12, map: this.sparkTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat);
    this.group.add(pts);
    this.items.push({
      obj: pts, t: 0, life: 1.1,
      update: (k, dt) => {
        const a = geo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < n; i++) {
          vel[i].multiplyScalar(1 - dt * 1.8);
          vel[i].y -= dt * 0.6;
          a.setXYZ(i, a.getX(i) + vel[i].x * dt, a.getY(i) + vel[i].y * dt, a.getZ(i) + vel[i].z * dt);
        }
        a.needsUpdate = true;
        mat.opacity = 1 - k * k;
        mat.size = 0.12 * (1 - 0.5 * k);
      },
    });
    // Expanding ring.
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.16, 48),
      new THREE.MeshBasicMaterial({ color: '#FFE9A8', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
    );
    ring.position.copy(origin);
    ring.lookAt(origin.clone().add(dir));
    this.group.add(ring);
    this.items.push({
      obj: ring, t: 0, life: 0.5,
      update: (k) => {
        ring.scale.setScalar(1 + k * 5);
        (ring.material as THREE.MeshBasicMaterial).opacity = 1 - k;
      },
    });
  }

  update(dt: number) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.t += dt;
      const k = Math.min(1, it.t / it.life);
      it.update(k, dt);
      if (k >= 1) {
        it.obj.removeFromParent();
        (it.obj as THREE.Mesh).geometry?.dispose();
        ((it.obj as THREE.Mesh).material as THREE.Material)?.dispose();
        this.items.splice(i, 1);
      }
    }
  }
}
