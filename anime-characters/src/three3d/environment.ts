// A small shrine plaza: sky dome, grass, stone circle, torii gate, cherry trees,
// stone lanterns, falling petals and (at night) fireflies. Day or night follows the
// viewer's light/dark theme.

import * as THREE from 'three';
import { loft } from './geometry';
import { sceneUniforms, toonMesh, type ToonMaterial } from './toon';

interface Palette {
  skyTop: string; skyMid: string; horizon: string; ground: string; groundShade: string;
  sun: string; sunIntensity: number; ambient: string; ambientIntensity: number;
  shadeTint: string; fog: string; lantern: number; fireflies: number; stars: number;
}

const DAY: Palette = {
  skyTop: '#5DB2EC', skyMid: '#A9D8F5', horizon: '#FCE6EF', ground: '#9AD27F', groundShade: '#6FAE6C',
  sun: '#FFF6E8', sunIntensity: 2.4, ambient: '#E6EEFF', ambientIntensity: 1.25,
  shadeTint: '#FFFFFF', fog: '#F3E6F2', lantern: 0, fireflies: 0, stars: 0,
};
const NIGHT: Palette = {
  skyTop: '#070B22', skyMid: '#1A1F4A', horizon: '#4A3566', ground: '#3C5E58', groundShade: '#22383C',
  sun: '#AFC2FF', sunIntensity: 1.1, ambient: '#5865A8', ambientIntensity: 0.85,
  shadeTint: '#7C7FB8', fog: '#2A2448', lantern: 1, fireflies: 1, stars: 1,
};

export interface Collider { x: number; z: number; r: number }

export class Environment {
  readonly group = new THREE.Group();
  readonly sun = new THREE.DirectionalLight('#ffffff', 2);
  readonly ambient = new THREE.HemisphereLight('#ffffff', '#88aa88', 1);
  readonly colliders: Collider[] = [];
  private sky: THREE.Mesh;
  private skyMat: THREE.ShaderMaterial;
  private groundMat!: ToonMaterial;
  private lanternLights: THREE.PointLight[] = [];
  private lanternGlow: THREE.MeshBasicMaterial[] = [];
  private petals!: THREE.InstancedMesh;
  private petalState: { p: THREE.Vector3; v: THREE.Vector3; spin: THREE.Vector3; r: THREE.Euler }[] = [];
  private flies!: THREE.Points;
  private flyBase: Float32Array = new Float32Array(0);
  private pal: Palette = DAY;
  private night = 0;
  private nightTarget = 0;

  constructor(private scene: THREE.Scene) {
    this.sun.position.set(4, 8, 5);
    this.group.add(this.sun, this.sun.target, this.ambient);

    this.skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTop: { value: new THREE.Color() }, uMid: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() },
        uSunDir: { value: new THREE.Vector3(0.45, 0.6, -0.6).normalize() }, uStars: { value: 0 }, uTime: sceneUniforms.uTime,
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop, uMid, uHorizon, uSunDir;
        uniform float uStars, uTime;
        varying vec3 vDir;
        float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        void main() {
          float h = clamp(vDir.y, -0.2, 1.0);
          vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.25, h));
          col = mix(col, uTop, smoothstep(0.25, 0.9, h));
          float s = max(dot(vDir, uSunDir), 0.0);
          col += vec3(1.0, 0.95, 0.85) * (pow(s, 600.0) * 1.5 + pow(s, 12.0) * 0.12) * (1.0 - uStars * 0.3);
          if (uStars > 0.0) {
            vec3 cell = floor(vDir * 160.0);
            float star = step(0.9965, hash(cell)) * smoothstep(0.05, 0.3, h);
            star *= 0.6 + 0.4 * sin(uTime * 2.0 + hash(cell + 1.0) * 30.0);
            col += vec3(star) * uStars;
          }
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
        }`,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(90, 32, 16), this.skyMat);
    this.sky.renderOrder = -10;
    this.group.add(this.sky);

    this.buildGround();
    this.buildTorii();
    this.buildTrees();
    this.buildLanterns();
    this.buildPetals();
    this.buildFireflies();
    this.buildClouds();
    scene.add(this.group);
    scene.fog = new THREE.Fog('#ffffff', 22, 70);
    this.setNight(false, true);
  }

  private buildGround() {
    const ground = new THREE.CircleGeometry(60, 64);
    ground.rotateX(-Math.PI / 2);
    const g = toonMesh(ground, { color: DAY.ground, shade: DAY.groundShade, outline: false, rim: 0 });
    this.groundMat = g.material as ToonMaterial;
    this.group.add(g);

    // Stone plaza with a carved ring pattern.
    const c = document.createElement('canvas');
    c.width = c.height = 1024;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#D9D2C8';
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.strokeStyle = '#B9AFA3';
    ctx.lineWidth = 6;
    for (let r = 80; r < 520; r += 90) {
      ctx.beginPath();
      ctx.arc(512, 512, r, 0, Math.PI * 2);
      ctx.stroke();
      const n = Math.round(r / 18);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + r;
        ctx.beginPath();
        ctx.moveTo(512 + Math.cos(a) * r, 512 + Math.sin(a) * r);
        ctx.lineTo(512 + Math.cos(a) * (r + 90), 512 + Math.sin(a) * (r + 90));
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#E8B4C4';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      ctx.ellipse(512 + Math.cos(a) * 34, 512 + Math.sin(a) * 34, 30, 18, a, 0, Math.PI * 2);
    }
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const plaza = new THREE.CylinderGeometry(5.2, 5.4, 0.08, 64);
    plaza.translate(0, 0.04, 0);
    // Planar UVs on the top face.
    const pos = plaza.getAttribute('position') as THREE.BufferAttribute;
    const uv = plaza.getAttribute('uv') as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / 10.8 + 0.5, pos.getZ(i) / 10.8 + 0.5);
    this.group.add(toonMesh(plaza, { color: '#ffffff', map: tex, shade: '#B8B0C6', outline: false, rim: 0 }));

    // Path toward the gate.
    const path = new THREE.PlaneGeometry(2.2, 9);
    path.rotateX(-Math.PI / 2);
    path.translate(0, 0.012, -9.2);
    this.group.add(toonMesh(path, { color: '#D8CFC2', outline: false, rim: 0 }));
  }

  private buildTorii() {
    const red = '#D8402F';
    const z = -12;
    const torii = new THREE.Group();
    for (const x of [-1.9, 1.9]) {
      const pillar = loft([{ y: 0, rx: 0.17, rz: 0.17 }, { y: 4.2, rx: 0.14, rz: 0.14 }], { radial: 20, capTop: true });
      const m = toonMesh(pillar, { color: red, outline: 0.0015, outlineColor: '#4A1410' });
      m.position.set(x, 0, 0);
      torii.add(m);
      const base = new THREE.CylinderGeometry(0.22, 0.24, 0.35, 20);
      base.translate(x, 0.175, 0);
      torii.add(toonMesh(base, { color: '#2A2326', outline: 0.0015 }));
      this.colliders.push({ x, z, r: 0.35 });
    }
    // Upper lintel with upturned ends (kasagi) and the tie beam (nuki).
    const beam = (y: number, half: number, h: number, d: number, lift: number, color: string) => {
      // Built along +Y, then turned so +Y runs along +X; a negative x offset becomes lift.
      const secs = Array.from({ length: 21 }, (_, i) => {
        const t = i / 20;
        const up = lift * Math.pow(Math.abs(t - 0.5) * 2, 3);
        return { y: -half + t * half * 2, rx: h / 2, rz: d / 2, p: 3.5, cx: -up };
      });
      const g = loft(secs, { radial: 16, capBottom: true, capTop: true });
      g.rotateZ(-Math.PI / 2);
      const m = toonMesh(g, { color, outline: 0.0015, outlineColor: '#2A0E0C' });
      m.position.y = y;
      torii.add(m);
    };
    beam(4.25, 2.8, 0.22, 0.42, 0.3, '#1F1A1C');
    beam(4.02, 2.6, 0.2, 0.32, 0.22, red);
    beam(3.3, 2.35, 0.16, 0.18, 0, red);
    const plaque = new THREE.BoxGeometry(0.45, 0.6, 0.08);
    plaque.translate(0, 3.66, 0.12);
    torii.add(toonMesh(plaque, { color: '#1F1A1C', outline: 0.0015 }));
    torii.position.z = z;
    this.group.add(torii);
  }

  private buildTrees() {
    const spots: [number, number, number][] = [
      [-7, -6, 1.1], [7.5, -5, 1.2], [-10, 2, 1], [10.5, 3, 1.15], [-5.5, -14, 1.3], [6, -15, 1.25],
      [-14, -9, 1.2], [15, -10, 1.3], [-16, 8, 1.1], [14, 12, 1.2], [-6, 13, 1], [4, 16, 1.1],
    ];
    const blossom = ['#F9C6D8', '#F5B3CC', '#FBD7E4', '#F2A7C3'];
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const [x, z, s] of spots) {
      const tree = new THREE.Group();
      const bend = (rnd() - 0.5) * 0.6;
      const trunk = loft(
        Array.from({ length: 8 }, (_, i) => {
          const t = i / 7;
          return { y: t * 2.6, rx: 0.2 - 0.1 * t, rz: 0.2 - 0.1 * t, cx: bend * t * t };
        }),
        { radial: 12, capTop: true },
      );
      tree.add(toonMesh(trunk, { color: '#6B4A44', shade: '#4A2F33', outline: 0.0016, outlineColor: '#2A1A1C' }));
      for (let k = 0; k < 7; k++) {
        const r = 0.8 + rnd() * 0.6;
        const geo = new THREE.IcosahedronGeometry(r, 2);
        const a = rnd() * Math.PI * 2;
        const d = k === 0 ? 0 : 0.6 + rnd() * 0.6;
        geo.scale(1, 0.75, 1);
        geo.translate(bend + Math.cos(a) * d, 2.9 + rnd() * 0.8 - (k === 0 ? -0.3 : 0), Math.sin(a) * d);
        tree.add(toonMesh(geo, { color: blossom[k % blossom.length], shade: '#D88AAE', outline: 0.0012, outlineColor: '#A05A7A', rim: 0.25 }));
      }
      tree.position.set(x, 0, z);
      tree.scale.setScalar(s);
      tree.rotation.y = rnd() * Math.PI * 2;
      this.group.add(tree);
      this.colliders.push({ x, z, r: 0.45 * s });
    }
  }

  private buildLanterns() {
    const spots: [number, number][] = [[-3.2, -6.6], [3.2, -6.6], [-6.2, 0.6], [6.2, 0.6]];
    for (const [x, z] of spots) {
      const l = new THREE.Group();
      const stone = '#B6AFA6';
      const part = (geo: THREE.BufferGeometry, y: number, color = stone) => {
        geo.translate(0, y, 0);
        l.add(toonMesh(geo, { color, outline: 0.0014, outlineColor: '#4A443F' }));
      };
      part(new THREE.CylinderGeometry(0.32, 0.38, 0.18, 8), 0.09);
      part(new THREE.CylinderGeometry(0.1, 0.12, 0.7, 10), 0.53);
      part(new THREE.CylinderGeometry(0.28, 0.22, 0.12, 8), 0.94);
      const glowMat = new THREE.MeshBasicMaterial({ color: '#FFD9A0' });
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.34), glowMat);
      box.position.y = 1.15;
      l.add(box);
      this.lanternGlow.push(glowMat);
      part(new THREE.ConeGeometry(0.42, 0.3, 8), 1.45);
      part(new THREE.SphereGeometry(0.07, 10, 8), 1.63);
      const light = new THREE.PointLight('#FFB36B', 0, 6, 1.6);
      light.position.y = 1.15;
      l.add(light);
      this.lanternLights.push(light);
      l.position.set(x, 0, z);
      this.group.add(l);
      this.colliders.push({ x, z, r: 0.42 });
    }
  }

  private buildClouds() {
    const mat = { color: '#FFFFFF', shade: '#E4DDF2', outline: false as const, rim: 0.2 };
    for (let i = 0; i < 7; i++) {
      const cloud = new THREE.Group();
      for (let k = 0; k < 5; k++) {
        const geo = new THREE.SphereGeometry(1.6 + Math.random() * 1.4, 16, 10);
        geo.translate(k * 2.2 - 4.4, Math.random() * 0.8, Math.random() * 1.2);
        cloud.add(toonMesh(geo, mat));
      }
      const a = (i / 7) * Math.PI * 2 + 0.4;
      cloud.position.set(Math.cos(a) * 60, 16 + Math.random() * 8, Math.sin(a) * 60);
      cloud.lookAt(0, cloud.position.y, 0);
      cloud.userData.cloud = true;
      this.group.add(cloud);
    }
  }

  private buildPetals() {
    const n = 420;
    const geo = new THREE.PlaneGeometry(0.06, 0.045);
    const mat = new THREE.MeshBasicMaterial({ color: '#FFC1D6', side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    this.petals = new THREE.InstancedMesh(geo, mat, n);
    for (let i = 0; i < n; i++) {
      this.petalState.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 36, Math.random() * 9, (Math.random() - 0.5) * 36),
        v: new THREE.Vector3(0.4 + Math.random() * 0.4, -0.35 - Math.random() * 0.35, 0.15),
        spin: new THREE.Vector3(Math.random() * 3, Math.random() * 3, Math.random() * 3),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      });
    }
    this.petals.frustumCulled = false;
    this.group.add(this.petals);
  }

  private buildFireflies() {
    const n = 90;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 14;
      pos.set([Math.cos(a) * r, 0.4 + Math.random() * 2.5, Math.sin(a) * r], i * 3);
    }
    this.flyBase = pos.slice();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const ctx = c.getContext('2d')!;
    const grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0, 'rgba(255,255,200,1)');
    grd.addColorStop(1, 'rgba(255,240,150,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(c);
    this.flies = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.22, map: tex, color: '#E8FF9A', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    this.group.add(this.flies);
  }

  setNight(night: boolean, instant = false) {
    this.nightTarget = night ? 1 : 0;
    if (instant) this.night = this.nightTarget;
    this.applyPalette();
  }

  private applyPalette() {
    const k = this.night;
    const mixc = (a: string, b: string) => new THREE.Color(a).lerp(new THREE.Color(b), k);
    const u = this.skyMat.uniforms;
    (u.uTop.value as THREE.Color).copy(mixc(DAY.skyTop, NIGHT.skyTop));
    (u.uMid.value as THREE.Color).copy(mixc(DAY.skyMid, NIGHT.skyMid));
    (u.uHorizon.value as THREE.Color).copy(mixc(DAY.horizon, NIGHT.horizon));
    u.uStars.value = k;
    this.sun.color.copy(mixc(DAY.sun, NIGHT.sun));
    this.sun.intensity = THREE.MathUtils.lerp(DAY.sunIntensity, NIGHT.sunIntensity, k);
    this.ambient.color.copy(mixc(DAY.ambient, NIGHT.ambient));
    this.ambient.groundColor.copy(mixc('#8FB68A', '#2A3550'));
    this.ambient.intensity = THREE.MathUtils.lerp(DAY.ambientIntensity, NIGHT.ambientIntensity, k);
    sceneUniforms.uLightColor.value.copy(mixc('#FFFFFF', '#B9C2F0'));
    sceneUniforms.uShadeTint.value.copy(mixc(DAY.shadeTint, NIGHT.shadeTint));
    (this.scene.fog as THREE.Fog | null)?.color.copy(mixc(DAY.fog, NIGHT.fog));
    for (const l of this.lanternLights) l.intensity = 4 * k;
    for (const m of this.lanternGlow) m.color.copy(mixc('#E9E2D6', '#FFD08A'));
    (this.flies.material as THREE.PointsMaterial).opacity = k;
    void this.groundMat;
    this.pal = k > 0.5 ? NIGHT : DAY;
  }

  update(dt: number, t: number) {
    if (Math.abs(this.night - this.nightTarget) > 0.001) {
      this.night += Math.sign(this.nightTarget - this.night) * Math.min(Math.abs(this.nightTarget - this.night), dt * 1.5);
      this.applyPalette();
    }
    const lightDir = this.sun.position.clone().sub(this.sun.target.position).normalize();
    sceneUniforms.uLightDir.value.copy(lightDir);
    sceneUniforms.uTime.value = t;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3(1, 1, 1);
    const wind = Math.sin(t * 0.3) * 0.3;
    this.petalState.forEach((st, i) => {
      st.p.addScaledVector(st.v, dt);
      st.p.x += wind * dt;
      st.p.y += Math.sin(t * 2 + i) * dt * 0.1;
      st.r.x += st.spin.x * dt;
      st.r.y += st.spin.y * dt;
      if (st.p.y < 0.02) {
        st.p.set((Math.random() - 0.5) * 36 - 6, 6 + Math.random() * 4, (Math.random() - 0.5) * 36);
      }
      q.setFromEuler(st.r);
      m.compose(st.p, q, s);
      this.petals.setMatrixAt(i, m);
    });
    this.petals.instanceMatrix.needsUpdate = true;

    if (this.night > 0.01) {
      const a = this.flies.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < a.count; i++) {
        a.setXYZ(
          i,
          this.flyBase[i * 3] + Math.sin(t * 0.5 + i) * 0.4,
          this.flyBase[i * 3 + 1] + Math.sin(t * 0.9 + i * 1.7) * 0.25,
          this.flyBase[i * 3 + 2] + Math.cos(t * 0.4 + i * 0.7) * 0.4,
        );
      }
      a.needsUpdate = true;
    }
    for (const c of this.group.children) if (c.userData.cloud) c.rotation.y += dt * 0.002;
  }

  get palette() {
    return this.pal;
  }
}
