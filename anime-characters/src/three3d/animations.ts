// Procedural animation: every motion is a function of time that returns a pose
// (Euler rotations per bone, a hips offset and finger curls). Poses blend linearly, so
// locomotion, jumping and one-shot actions mix smoothly without baked clips.
//
// Axis conventions (character faces +Z, its left side is +X):
//   upperArm.L z+ raises the arm sideways (R uses z-), x- swings any limb forward,
//   lowerArm x- bends the elbow, lowerLeg x+ bends the knee, spine/head x+ leans forward,
//   y+ turns toward the character's left.

import type { Gender } from '../shared/roster';
import type { Mood } from '../shared/moods';

export const BONES = [
  'hips', 'spine', 'chest', 'neck', 'head',
  'shoulder.L', 'upperArm.L', 'lowerArm.L', 'hand.L',
  'shoulder.R', 'upperArm.R', 'lowerArm.R', 'hand.R',
  'upperLeg.L', 'lowerLeg.L', 'foot.L',
  'upperLeg.R', 'lowerLeg.R', 'foot.R',
] as const;
export type BoneName = (typeof BONES)[number];
export type E3 = [number, number, number];

export interface Pose {
  r: Record<BoneName, E3>;
  hips: E3;
  fingersL: number[]; // thumb, index, middle, ring, pinky (0 open .. 1 fist)
  fingersR: number[];
}
export type PartialPose = { r?: Partial<Record<BoneName, E3>>; hips?: E3; fingersL?: number[]; fingersR?: number[] };

export function emptyPose(): Pose {
  const r = {} as Record<BoneName, E3>;
  for (const b of BONES) r[b] = [0, 0, 0];
  return { r, hips: [0, 0, 0], fingersL: [0.2, 0.25, 0.3, 0.35, 0.4], fingersR: [0.2, 0.25, 0.3, 0.35, 0.4] };
}

export function copyPose(src: Pose, dst: Pose = emptyPose()): Pose {
  for (const b of BONES) {
    const s = src.r[b];
    const d = dst.r[b];
    d[0] = s[0]; d[1] = s[1]; d[2] = s[2];
  }
  dst.hips[0] = src.hips[0]; dst.hips[1] = src.hips[1]; dst.hips[2] = src.hips[2];
  for (let i = 0; i < 5; i++) {
    dst.fingersL[i] = src.fingersL[i];
    dst.fingersR[i] = src.fingersR[i];
  }
  return dst;
}

/** out = a + (b - a) * t (out may alias a). */
export function lerpPose(a: Pose, b: Pose, t: number, out: Pose): Pose {
  for (const bone of BONES) {
    const pa = a.r[bone];
    const pb = b.r[bone];
    const o = out.r[bone];
    o[0] = pa[0] + (pb[0] - pa[0]) * t;
    o[1] = pa[1] + (pb[1] - pa[1]) * t;
    o[2] = pa[2] + (pb[2] - pa[2]) * t;
  }
  for (let i = 0; i < 3; i++) out.hips[i] = a.hips[i] + (b.hips[i] - a.hips[i]) * t;
  for (let i = 0; i < 5; i++) {
    out.fingersL[i] = a.fingersL[i] + (b.fingersL[i] - a.fingersL[i]) * t;
    out.fingersR[i] = a.fingersR[i] + (b.fingersR[i] - a.fingersR[i]) * t;
  }
  return out;
}

function apply(p: Pose, part: PartialPose, w = 1) {
  if (part.r) {
    for (const k of Object.keys(part.r) as BoneName[]) {
      const v = part.r[k]!;
      const o = p.r[k];
      o[0] += (v[0] - o[0]) * w;
      o[1] += (v[1] - o[1]) * w;
      o[2] += (v[2] - o[2]) * w;
    }
  }
  if (part.hips) for (let i = 0; i < 3; i++) p.hips[i] += (part.hips[i] - p.hips[i]) * w;
  if (part.fingersL) for (let i = 0; i < 5; i++) p.fingersL[i] += (part.fingersL[i] - p.fingersL[i]) * w;
  if (part.fingersR) for (let i = 0; i < 5; i++) p.fingersR[i] += (part.fingersR[i] - p.fingersR[i]) * w;
}

const FIST = [0.9, 1, 1, 1, 1];
const OPEN = [0.05, 0.05, 0.05, 0.05, 0.08];
const ease = (t: number) => t * t * (3 - 2 * t);

// ---------- Base motions ----------

export function idlePose(t: number, g: Gender, out: Pose): Pose {
  const breath = Math.sin((t * Math.PI * 2) / 3.6);
  const sway = Math.sin((t * Math.PI * 2) / 7);
  const f = g === 'female';
  const p = out;
  const R = p.r;
  R.hips = [0, 0, (f ? 0.05 : 0) - 0.02 * sway];
  R.spine = [0.02, 0, (f ? -0.04 : 0) + 0.015 * sway];
  R.chest = [-0.015 * breath, 0, f ? -0.02 : 0];
  R.neck = [0.03, 0, 0];
  R.head = [-0.02 + 0.015 * Math.sin(t * 0.7), 0.05 * Math.sin(t * 0.37), (f ? 0.06 : 0.01) + 0.025 * sway];
  R['shoulder.L'] = [0, 0, 0.02 * breath];
  R['shoulder.R'] = [0, 0, -0.02 * breath];
  const armOut = f ? 0.085 : 0.13;
  R['upperArm.L'] = [(f ? -0.07 : -0.04) + 0.02 * breath, 0, armOut + 0.015 * breath];
  R['upperArm.R'] = [(f ? -0.07 : -0.04) + 0.02 * breath, 0, -armOut - 0.015 * breath];
  R['lowerArm.L'] = [(f ? -0.28 : -0.2) - 0.03 * breath, 0, 0];
  R['lowerArm.R'] = [(f ? -0.28 : -0.2) - 0.03 * breath, 0, 0];
  R['hand.L'] = [0, 0, f ? 0.15 : 0.05];
  R['hand.R'] = [0, 0, f ? -0.15 : -0.05];
  if (f) {
    R['upperLeg.L'] = [-0.06, 0, -0.02];
    R['lowerLeg.L'] = [0.16, 0, 0];
    R['foot.L'] = [-0.08, 0, 0];
    R['upperLeg.R'] = [0.02, 0, -0.07];
    R['lowerLeg.R'] = [0.02, 0, 0];
    R['foot.R'] = [-0.02, 0, 0.06];
  } else {
    R['upperLeg.L'] = [0, 0, 0.045];
    R['lowerLeg.L'] = [0.03, 0, 0];
    R['foot.L'] = [-0.03, 0, -0.045];
    R['upperLeg.R'] = [0, 0, -0.045];
    R['lowerLeg.R'] = [0.03, 0, 0];
    R['foot.R'] = [-0.03, 0, 0.045];
  }
  p.hips = [0, -0.004 * (1 - breath), 0];
  p.fingersL = [0.25, 0.3, 0.38, 0.45, 0.5];
  p.fingersR = [0.25, 0.3, 0.38, 0.45, 0.5];
  return p;
}

/** Walk (run = 0) to run (run = 1) cycle. `phase` in radians advances with distance. */
export function locoPose(phase: number, run: number, g: Gender, out: Pose): Pose {
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  const f = g === 'female';
  const legA = 0.42 + 0.42 * run;
  const kneeA = 0.65 + 0.85 * run;
  const armA = (f ? 0.28 : 0.38) + 0.35 * run;
  const R = out.r;
  const swingL = Math.pow(Math.max(0, c), 1.4);
  const swingR = Math.pow(Math.max(0, -c), 1.4);
  R['upperLeg.L'] = [-legA * s - 0.1 * run, 0, f ? -0.02 : 0.02];
  R['upperLeg.R'] = [legA * s - 0.1 * run, 0, f ? 0.02 : -0.02];
  R['lowerLeg.L'] = [0.08 + kneeA * swingL + 0.15 * run, 0, 0];
  R['lowerLeg.R'] = [0.08 + kneeA * swingR + 0.15 * run, 0, 0];
  R['foot.L'] = [0.25 * s * (1 - 0.3 * run) - 0.25 * swingL, 0, 0];
  R['foot.R'] = [-0.25 * s * (1 - 0.3 * run) - 0.25 * swingR, 0, 0];
  R.hips = [0.04 * run, -0.1 * s * (1 - 0.4 * run), (f ? 0.06 : 0.03) * c];
  R.spine = [0.04 + 0.16 * run, 0.12 * s, (f ? -0.04 : -0.02) * c];
  R.chest = [0.02 + 0.06 * run, 0.06 * s, 0];
  R.neck = [-0.02 - 0.08 * run, -0.08 * s, 0];
  R.head = [-0.02 - 0.06 * run, -0.06 * s, f ? 0.03 : 0];
  R['shoulder.L'] = [0, 0, 0];
  R['shoulder.R'] = [0, 0, 0];
  R['upperArm.L'] = [armA * s, 0, (f ? 0.12 : 0.15) + 0.1 * run];
  R['upperArm.R'] = [-armA * s, 0, -(f ? 0.12 : 0.15) - 0.1 * run];
  R['lowerArm.L'] = [-0.3 - 1.1 * run - 0.2 * Math.max(0, -s), 0, 0];
  R['lowerArm.R'] = [-0.3 - 1.1 * run - 0.2 * Math.max(0, s), 0, 0];
  R['hand.L'] = [0, 0, f ? 0.25 : 0.05];
  R['hand.R'] = [0, 0, f ? -0.25 : -0.05];
  const bob = (0.012 + 0.03 * run) * Math.abs(s);
  out.hips = [0, -bob + 0.01 - 0.03 * run, 0];
  const curl = 0.35 + 0.55 * run;
  out.fingersL = [curl, curl, curl + 0.05, curl + 0.08, curl + 0.1];
  out.fingersR = [curl, curl, curl + 0.05, curl + 0.08, curl + 0.1];
  return out;
}

/** In the air: vy > 0 rising, < 0 falling. */
export function airPose(vy: number, g: Gender, out: Pose): Pose {
  const rise = Math.max(0, Math.min(1, vy / 3));
  const R = out.r;
  const f = g === 'female';
  R['upperLeg.L'] = [-0.5 - 0.4 * rise, 0, 0.06];
  R['lowerLeg.L'] = [0.6 + 0.8 * rise, 0, 0];
  R['upperLeg.R'] = [-0.15 - 0.2 * rise, 0, -0.06];
  R['lowerLeg.R'] = [0.35 + 0.5 * rise, 0, 0];
  R['foot.L'] = [0.4, 0, 0];
  R['foot.R'] = [0.4, 0, 0];
  R['upperArm.L'] = [-0.4, 0, 0.9 + 0.4 * (1 - rise)];
  R['upperArm.R'] = [-0.4, 0, -0.9 - 0.4 * (1 - rise)];
  R['lowerArm.L'] = [-0.6, 0, 0];
  R['lowerArm.R'] = [-0.6, 0, 0];
  R.spine = [0.08 + 0.1 * rise, 0, 0];
  R.chest = [0, 0, 0];
  R.head = [-0.1, 0, f ? 0.05 : 0];
  out.hips = [0, 0, 0];
  out.fingersL = OPEN.slice();
  out.fingersR = OPEN.slice();
  return out;
}

// ---------- Actions ----------

export type ActionName = 'wave' | 'attack' | 'dance' | 'victory' | 'bow';

export interface ActionDef {
  label: string;
  duration: number;
  loop: boolean;
  /** Override pose (written on top of a copy of the base pose). */
  pose: (t: number, g: Gender, base: Pose, out: Pose) => void;
  expression?: (g: Gender) => Mood;
  events?: { t: number; name: string }[];
  weapon?: boolean;
}

type Key = [number, PartialPose];

/** Interpolate keyframes; bones missing from a key fall back to the base pose. */
function keyed(t: number, keys: Key[], base: Pose, out: Pose) {
  copyPose(base, out);
  let i = 0;
  while (i < keys.length - 2 && t >= keys[i + 1][0]) i++;
  const [t0, a] = keys[i];
  const [t1, b] = keys[Math.min(i + 1, keys.length - 1)];
  const u = t1 > t0 ? ease(Math.max(0, Math.min(1, (t - t0) / (t1 - t0)))) : 1;
  const A = copyPose(base);
  apply(A, a);
  const B = copyPose(base);
  apply(B, b);
  lerpPose(A, B, u, out);
}

export const ACTIONS: Record<ActionName, ActionDef> = {
  wave: {
    label: 'Wave',
    duration: 2.6,
    loop: false,
    expression: () => 'joy',
    pose: (t, g, base, out) => {
      copyPose(base, out);
      const w = Math.sin(t * 9);
      apply(out, {
        r: {
          'upperArm.R': [-0.3, 0.2, -2.45],
          'lowerArm.R': [-0.45, 0, 0.38 * w],
          'hand.R': [0, 0, 0.15 * Math.sin(t * 9 - 0.6)],
          chest: [0, 0.05, -0.06],
          head: [0.02, 0.08, g === 'female' ? -0.14 : -0.08],
        },
        fingersR: OPEN,
      });
    },
  },
  attack: {
    label: 'Attack',
    duration: 1.0,
    loop: false,
    weapon: true,
    expression: () => 'angry',
    events: [{ t: 0.3, name: 'strike' }],
    pose: (t, g, base, out) => {
      if (g === 'male') {
        keyed(t, [
          [0, {}],
          [0.24, {
            r: {
              spine: [-0.05, -0.45, 0], chest: [-0.1, -0.2, 0], head: [0, 0.3, 0],
              'upperArm.R': [-2.5, 0.25, -0.45], 'lowerArm.R': [-1.0, 0, 0], 'hand.R': [-0.4, 0, 0],
              'upperArm.L': [-0.7, 0, 0.35], 'lowerArm.L': [-1.3, 0, 0],
              'upperLeg.R': [-0.25, 0, -0.05], 'lowerLeg.R': [0.35, 0, 0],
            },
            hips: [0, -0.03, 0], fingersR: FIST, fingersL: FIST,
          }],
          [0.42, {
            r: {
              spine: [0.22, 0.45, 0], chest: [0.12, 0.25, 0], head: [-0.15, -0.4, 0],
              'upperArm.R': [-0.85, -0.65, -0.25], 'lowerArm.R': [-0.15, 0, 0], 'hand.R': [0.35, 0, 0],
              'upperArm.L': [0.2, 0, 0.6], 'lowerArm.L': [-0.5, 0, 0],
              'upperLeg.R': [-0.75, 0, -0.05], 'lowerLeg.R': [0.7, 0, 0],
              'upperLeg.L': [0.45, 0, 0.05], 'lowerLeg.L': [0.4, 0, 0],
            },
            hips: [0, -0.08, 0.07], fingersR: FIST, fingersL: OPEN,
          }],
          [0.7, {
            r: {
              spine: [0.2, 0.4, 0], chest: [0.1, 0.2, 0], head: [-0.12, -0.35, 0],
              'upperArm.R': [-0.8, -0.6, -0.25], 'lowerArm.R': [-0.15, 0, 0], 'hand.R': [0.35, 0, 0],
              'upperArm.L': [0.15, 0, 0.55], 'lowerArm.L': [-0.5, 0, 0],
              'upperLeg.R': [-0.7, 0, -0.05], 'lowerLeg.R': [0.7, 0, 0],
              'upperLeg.L': [0.4, 0, 0.05], 'lowerLeg.L': [0.4, 0, 0],
            },
            hips: [0, -0.075, 0.07], fingersR: FIST, fingersL: OPEN,
          }],
          [1.0, {}],
        ], base, out);
      } else {
        keyed(t, [
          [0, {}],
          [0.24, {
            r: {
              spine: [-0.1, 0.25, 0], head: [0.08, 0.15, 0],
              'upperArm.R': [-0.7, 0, -0.35], 'lowerArm.R': [-1.95, 0, 0], 'hand.R': [0.2, 0, 0],
              'upperArm.L': [-0.6, 0, 0.3], 'lowerArm.L': [-1.8, 0, 0],
            },
            fingersR: FIST, fingersL: [0.3, 0.2, 0.2, 0.3, 0.3],
          }],
          [0.42, {
            r: {
              spine: [0.1, -0.2, 0], chest: [0.06, -0.1, 0], head: [-0.1, -0.1, 0],
              'upperArm.R': [-1.55, 0.2, -0.15], 'lowerArm.R': [-0.1, 0, 0], 'hand.R': [0.5, 0, 0],
              'upperArm.L': [0.25, 0, 0.75], 'lowerArm.L': [-0.3, 0, 0],
              'upperLeg.L': [-0.5, 0, 0.04], 'lowerLeg.L': [0.45, 0, 0],
              'upperLeg.R': [0.35, 0, -0.04], 'lowerLeg.R': [0.15, 0, 0],
            },
            hips: [0, -0.03, 0.05], fingersR: FIST, fingersL: OPEN,
          }],
          [0.72, {
            r: {
              spine: [0.08, -0.18, 0], chest: [0.05, -0.08, 0], head: [-0.08, -0.08, 0],
              'upperArm.R': [-1.5, 0.2, -0.15], 'lowerArm.R': [-0.12, 0, 0], 'hand.R': [0.5, 0, 0],
              'upperArm.L': [0.2, 0, 0.7], 'lowerArm.L': [-0.3, 0, 0],
              'upperLeg.L': [-0.45, 0, 0.04], 'lowerLeg.L': [0.45, 0, 0],
              'upperLeg.R': [0.3, 0, -0.04], 'lowerLeg.R': [0.15, 0, 0],
            },
            hips: [0, -0.03, 0.05], fingersR: FIST, fingersL: OPEN,
          }],
          [1.0, {}],
        ], base, out);
      }
    },
  },
  dance: {
    label: 'Dance',
    duration: 8,
    loop: true,
    expression: () => 'happy',
    pose: (t, g, base, out) => {
      copyPose(base, out);
      const beat = t * 2;
      const sb = Math.sin(Math.PI * beat);
      const bounce = Math.abs(sb);
      const partB = ease(Math.max(0, Math.min(1, ((t % 4) - 1.75) * 2))) * (1 - ease(Math.max(0, Math.min(1, ((t % 4) - 3.75) * 4))));
      const pump = Math.sin(Math.PI * beat);
      const f = g === 'female';
      const A: PartialPose = {
        r: {
          'upperArm.L': [-0.35, 0, 1.05 + 0.45 * pump], 'lowerArm.L': [-1.5 - 0.3 * pump, 0, 0],
          'upperArm.R': [-0.35, 0, -1.05 + 0.45 * pump], 'lowerArm.R': [-1.5 + 0.3 * pump, 0, 0],
        },
        fingersL: f ? [0.2, 0, 0, 0.1, 0.1] : FIST,
        fingersR: f ? [0.2, 0, 0, 0.1, 0.1] : FIST,
      };
      const B: PartialPose = {
        r: {
          'upperArm.L': [-0.15, 0, 2.55 + 0.22 * sb], 'lowerArm.L': [-0.35, 0, 0.3 * sb],
          'upperArm.R': [-0.15, 0, -2.55 + 0.22 * sb], 'lowerArm.R': [-0.35, 0, 0.3 * sb],
        },
        fingersL: OPEN, fingersR: OPEN,
      };
      apply(out, A, 1);
      apply(out, B, partB);
      apply(out, {
        r: {
          hips: [0, 0.18 * Math.sin(Math.PI * beat * 0.5), 0.09 * sb],
          spine: [0.04, 0, -0.07 * sb],
          chest: [0, 0, -0.04 * sb],
          head: [0.07 * Math.sin(2 * Math.PI * beat), 0, 0.12 * sb],
          'upperLeg.L': [-0.12 - 0.22 * Math.max(0, sb), 0, 0.08],
          'lowerLeg.L': [0.2 + 0.4 * Math.max(0, sb), 0, 0],
          'upperLeg.R': [-0.12 - 0.22 * Math.max(0, -sb), 0, -0.08],
          'lowerLeg.R': [0.2 + 0.4 * Math.max(0, -sb), 0, 0],
        },
        hips: [0.03 * sb, -0.04 * bounce, 0],
      });
    },
  },
  victory: {
    label: 'Victory',
    duration: 3.2,
    loop: false,
    expression: (g) => (g === 'female' ? 'wink' : 'joy'),
    pose: (t, g, base, out) => {
      const male: PartialPose = {
        r: {
          'upperArm.R': [-0.15, 0, -2.85], 'lowerArm.R': [-0.35, 0, 0], 'hand.R': [0, 0, 0],
          'upperArm.L': [0.25, -0.4, 0.55], 'lowerArm.L': [-1.75, 0, 0], 'hand.L': [0, 0, 0.5],
          head: [-0.18, 0.1, 0.05], spine: [-0.06, 0, 0], chest: [-0.06, 0, 0],
          'upperLeg.L': [0, 0, 0.1], 'upperLeg.R': [0, 0, -0.1],
        },
        hips: [0, 0.01, 0], fingersR: FIST, fingersL: FIST,
      };
      const female: PartialPose = {
        r: {
          'upperArm.R': [-0.6, -0.35, -0.75], 'lowerArm.R': [-2.25, 0, 0], 'hand.R': [0, 0.3, -0.15],
          'upperArm.L': [-0.2, 0, 0.3], 'lowerArm.L': [-1.2, 0, 0], 'hand.L': [0, 0, 0.3],
          head: [0, 0.1, 0.16], hips: [0, 0, 0.07], spine: [0, 0, -0.05],
          'upperLeg.L': [0.25, 0, 0.0], 'lowerLeg.L': [1.05, 0, 0], 'foot.L': [0.4, 0, 0],
        },
        fingersR: [1, 0, 0, 1, 1], fingersL: [0.3, 0.3, 0.35, 0.4, 0.45],
      };
      const pose = g === 'male' ? male : female;
      const crouch: PartialPose = {
        r: { 'upperLeg.L': [-0.35, 0, 0.05], 'upperLeg.R': [-0.35, 0, -0.05], 'lowerLeg.L': [0.7, 0, 0], 'lowerLeg.R': [0.7, 0, 0], spine: [0.15, 0, 0] },
        hips: [0, -0.07, 0],
      };
      keyed(t, [[0, {}], [0.22, crouch], [0.5, pose], [3.0, pose], [3.2, {}]], base, out);
      if (t > 0.5 && t < 3) out.hips[1] += 0.01 * Math.sin(t * 6);
    },
  },
  bow: {
    label: 'Bow',
    duration: 2.2,
    loop: false,
    expression: () => 'happy',
    pose: (t, _g, base, out) => {
      const down: PartialPose = {
        r: {
          spine: [0.42, 0, 0], chest: [0.2, 0, 0], neck: [0.12, 0, 0], head: [0.18, 0, 0],
          'upperArm.L': [-0.38, 0, 0.02], 'upperArm.R': [-0.38, 0, -0.02],
          'lowerArm.L': [-0.75, -0.2, 0], 'lowerArm.R': [-0.75, 0.2, 0],
          'hand.L': [0, 0, -0.35], 'hand.R': [0, 0, 0.35],
          'upperLeg.L': [0.05, 0, 0.02], 'upperLeg.R': [0.05, 0, -0.02],
          'lowerLeg.L': [0, 0, 0], 'lowerLeg.R': [0, 0, 0],
        },
        hips: [0, 0, -0.03], fingersL: OPEN, fingersR: OPEN,
      };
      keyed(t, [[0, {}], [0.55, down], [1.4, down], [2.2, {}]], base, out);
    },
  },
};

export const ACTION_LIST: ActionName[] = ['wave', 'attack', 'dance', 'victory', 'bow'];
