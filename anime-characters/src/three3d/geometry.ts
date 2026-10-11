// Geometry builders for procedural characters.
//  - loft: rings of superellipse cross-sections stacked along +Y (torsos, limbs, shoes)
//  - strand: tapered, flattened tubes along a spline (hair clumps, ribbons, tails)

import * as THREE from 'three';

export interface Section {
  y: number;
  rx: number; // half width (x)
  rz: number; // half depth (z)
  cx?: number; // center offset x
  cz?: number; // center offset z
  p?: number; // superellipse exponent, 2 = ellipse, higher = boxier
  /** Optional radial modulation, e.g. skirt pleats. Returns a radius multiplier. */
  mod?: (angle: number) => number;
}

export interface LoftOptions {
  radial?: number;
  capBottom?: boolean;
  capTop?: boolean;
  /** Per-vertex sway weight from v (0 bottom .. 1 top). */
  sway?: (v: number) => number;
}

function sePoint(a: number, rx: number, rz: number, p: number): [number, number] {
  // a = 0 at the back (-z), pi/2 at +x, pi at the front (+z).
  const s = Math.sin(a);
  const c = Math.cos(a);
  const e = 2 / p;
  return [rx * Math.sign(s) * Math.pow(Math.abs(s), e), -rz * Math.sign(c) * Math.pow(Math.abs(c), e)];
}

export function loft(sections: Section[], opts: LoftOptions = {}): THREE.BufferGeometry {
  const radial = opts.radial ?? 28;
  const pos: number[] = [];
  const uv: number[] = [];
  const sway: number[] = [];
  const idx: number[] = [];
  const n = sections.length;
  // v follows arc length along the centerline so textures are not stretched.
  const lengths = [0];
  for (let i = 1; i < n; i++) {
    const a = sections[i - 1];
    const b = sections[i];
    lengths.push(lengths[i - 1] + Math.hypot(b.y - a.y, (b.cz ?? 0) - (a.cz ?? 0)) + 1e-6);
  }
  const total = lengths[n - 1] || 1;
  const row = radial + 1;
  for (let i = 0; i < n; i++) {
    const s = sections[i];
    const v = lengths[i] / total;
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const m = s.mod ? s.mod(a) : 1;
      const [x, z] = sePoint(a, s.rx * m, s.rz * m, s.p ?? 2);
      pos.push(x + (s.cx ?? 0), s.y, z + (s.cz ?? 0));
      uv.push(j / radial, v);
      sway.push(opts.sway ? opts.sway(v) : 0);
    }
  }
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * row + j;
      const b = (i + 1) * row + j;
      const c = (i + 1) * row + j + 1;
      const d = i * row + j + 1;
      idx.push(a, b, d, b, c, d);
    }
  }
  const addCap = (ring: number, top: boolean) => {
    const s = sections[ring];
    const center = pos.length / 3;
    pos.push(s.cx ?? 0, s.y, s.cz ?? 0);
    uv.push(0.5, top ? 1 : 0);
    sway.push(opts.sway ? opts.sway(top ? 1 : 0) : 0);
    for (let j = 0; j < radial; j++) {
      const a = ring * row + j;
      const b = ring * row + j + 1;
      if (top) idx.push(center, b, a);
      else idx.push(center, a, b);
    }
  };
  if (opts.capBottom) addCap(0, false);
  if (opts.capTop) addCap(n - 1, true);

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aSway', new THREE.Float32BufferAttribute(sway, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  // Weld the UV seam normals so the seam does not show as a crease.
  const nrm = g.getAttribute('normal') as THREE.BufferAttribute;
  for (let i = 0; i < n; i++) {
    const a = i * row;
    const b = i * row + radial;
    const x = nrm.getX(a) + nrm.getX(b);
    const y = nrm.getY(a) + nrm.getY(b);
    const z = nrm.getZ(a) + nrm.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    nrm.setXYZ(a, x / l, y / l, z / l);
    nrm.setXYZ(b, x / l, y / l, z / l);
  }
  return g;
}

/** Sections for a rounded limb segment hanging along -Y from y=0 to y=-len. */
export function limbSections(len: number, rTop: number, rBot: number, opts: { depth?: number; bulge?: number; bulgeAt?: number; flat?: number } = {}): Section[] {
  const depth = opts.depth ?? 1;
  const out: Section[] = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 bottom .. 1 top
    let r = rBot + (rTop - rBot) * t;
    if (opts.bulge) r += opts.bulge * Math.exp(-Math.pow((t - (opts.bulgeAt ?? 0.6)) / 0.25, 2));
    out.push({ y: -len + len * t, rx: r * (opts.flat ?? 1), rz: r * depth });
  }
  // Round the ends slightly so overlaps at the joints stay smooth.
  out.unshift({ y: -len - rBot * 0.55, rx: rBot * 0.6 * (opts.flat ?? 1), rz: rBot * 0.6 * depth });
  out.push({ y: rTop * 0.5, rx: rTop * 0.65 * (opts.flat ?? 1), rz: rTop * 0.65 * depth });
  return out;
}

export interface StrandOptions {
  width: number;
  thick: number;
  segments?: number;
  radial?: number;
  /** Width profile along the strand, t: 0 root .. 1 tip. */
  profile?: (t: number) => number;
  /** Direction treated as "away from the scalp" for orienting the flat side. */
  outward?: (p: THREE.Vector3) => THREE.Vector3;
  flex?: number;
  flexStart?: number;
}

const defaultProfile = (t: number) => Math.pow(1 - t, 0.85) * (0.82 + 0.38 * Math.sin(Math.PI * Math.min(1, t * 1.6)));

export function strand(points: THREE.Vector3[], o: StrandOptions): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const segs = o.segments ?? 14;
  const radial = o.radial ?? 7;
  const profile = o.profile ?? defaultProfile;
  const pos: number[] = [];
  const uv: number[] = [];
  const sway: number[] = [];
  const idx: number[] = [];
  const T = new THREE.Vector3();
  const N = new THREE.Vector3();
  const B = new THREE.Vector3();
  const flex = o.flex ?? 1;
  const flexStart = o.flexStart ?? 0;
  let prevN: THREE.Vector3 | null = null;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const c = curve.getPointAt(t);
    curve.getTangentAt(t, T).normalize();
    const out = o.outward ? o.outward(c) : new THREE.Vector3(0, 0, 1);
    N.copy(out).addScaledVector(T, -out.dot(T));
    if (N.lengthSq() < 1e-6) N.copy(prevN ?? new THREE.Vector3(0, 0, 1));
    N.normalize();
    // Keep the frame continuous along the strand.
    if (prevN && N.dot(prevN) < 0) N.negate();
    prevN = N.clone();
    B.crossVectors(T, N).normalize();
    const w = o.width * profile(t);
    const th = o.thick * profile(t);
    const sw = Math.max(0, (t - flexStart) / (1 - flexStart)) * flex;
    for (let k = 0; k < radial; k++) {
      const a = (k / radial) * Math.PI * 2;
      const x = c.x + B.x * Math.cos(a) * w + N.x * Math.sin(a) * th;
      const y = c.y + B.y * Math.cos(a) * w + N.y * Math.sin(a) * th;
      const z = c.z + B.z * Math.cos(a) * w + N.z * Math.sin(a) * th;
      pos.push(x, y, z);
      uv.push(k / radial, t);
      sway.push(sw);
    }
  }
  for (let i = 0; i < segs; i++) {
    for (let k = 0; k < radial; k++) {
      const a = i * radial + k;
      const b = (i + 1) * radial + k;
      const c = (i + 1) * radial + ((k + 1) % radial);
      const d = i * radial + ((k + 1) % radial);
      idx.push(a, b, d, b, c, d);
    }
  }
  // Root cap.
  const root = curve.getPointAt(0);
  const ci = pos.length / 3;
  pos.push(root.x, root.y, root.z);
  uv.push(0.5, 0);
  sway.push(0);
  for (let k = 0; k < radial; k++) idx.push(ci, k, (k + 1) % radial);

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aSway', new THREE.Float32BufferAttribute(sway, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Make sure a geometry has the attribute set our toon shader expects. */
export function prepare(g: THREE.BufferGeometry, swayValue = 0): THREE.BufferGeometry {
  if (!g.getAttribute('uv')) {
    const n = g.getAttribute('position').count;
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  }
  if (!g.getAttribute('aSway')) {
    const n = g.getAttribute('position').count;
    g.setAttribute('aSway', new THREE.Float32BufferAttribute(new Float32Array(n).fill(swayValue), 1));
  }
  if (!g.getAttribute('normal')) g.computeVertexNormals();
  return g;
}

export function ellipsoid(rx: number, ry: number, rz: number, ws = 20, hs = 14): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(1, ws, hs);
  g.scale(rx, ry, rz);
  return prepare(g);
}

export function capsule(r: number, len: number, segs = 10): THREE.BufferGeometry {
  // Hanging along -Y from the origin.
  const g = new THREE.CapsuleGeometry(r, len, 4, segs);
  g.translate(0, -len / 2, 0);
  return prepare(g);
}
