// A playable VRM avatar: drives the model's normalized humanoid bones with the
// procedural poses from animations.ts, layers expressions, blinking, lip sync and
// look-at on top, and lets three-vrm handle MToon shading and spring-bone physics
// (hair, skirts, ribbons).
//
// Pose convention (see animations.ts): character faces +Z, arms hang down at rest.
// VRM's normalized rest pose is a T-pose, so upper arms get a fixed -90deg / +90deg
// offset and the rest of each arm chain is conjugated by it. VRM 0.x models face -Z
// internally (rotateVRM0 turns the scene), so their rotations are mirrored about Y.

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils, type VRM, type VRMHumanBoneName } from '@pixiv/three-vrm';
import type { Gender } from '../shared/roster';
import type { Mood } from '../shared/moods';
import {
  ACTIONS, BONES, airPose, copyPose, emptyPose, idlePose, lerpPose, locoPose,
  type ActionName, type BoneName, type Pose,
} from './animations';

const BONE_MAP: Record<BoneName, VRMHumanBoneName> = {
  hips: 'hips', spine: 'spine', chest: 'chest', neck: 'neck', head: 'head',
  'shoulder.L': 'leftShoulder', 'upperArm.L': 'leftUpperArm', 'lowerArm.L': 'leftLowerArm', 'hand.L': 'leftHand',
  'shoulder.R': 'rightShoulder', 'upperArm.R': 'rightUpperArm', 'lowerArm.R': 'rightLowerArm', 'hand.R': 'rightHand',
  'upperLeg.L': 'leftUpperLeg', 'lowerLeg.L': 'leftLowerLeg', 'foot.L': 'leftFoot',
  'upperLeg.R': 'rightUpperLeg', 'lowerLeg.R': 'rightLowerLeg', 'foot.R': 'rightFoot',
};

const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Little'] as const;
const SEGMENTS: Record<(typeof FINGERS)[number], string[]> = {
  Thumb: ['Metacarpal', 'Proximal', 'Distal'],
  Index: ['Proximal', 'Intermediate', 'Distal'],
  Middle: ['Proximal', 'Intermediate', 'Distal'],
  Ring: ['Proximal', 'Intermediate', 'Distal'],
  Little: ['Proximal', 'Intermediate', 'Distal'],
};

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

export async function loadVrm(src: string | ArrayBuffer, onProgress?: (p: number) => void): Promise<VRM> {
  const gltf =
    typeof src === 'string'
      ? await loader.loadAsync(src, (e) => onProgress?.(e.total ? e.loaded / e.total : 0))
      : await loader.parseAsync(src, '');
  const vrm = gltf.userData.vrm as VRM | undefined;
  if (!vrm) throw new Error('This file is not a VRM avatar.');
  VRMUtils.removeUnnecessaryVertices(gltf.scene);
  VRMUtils.combineSkeletons(gltf.scene);
  VRMUtils.rotateVRM0(vrm);
  vrm.scene.traverse((o) => {
    o.frustumCulled = false;
  });
  return vrm;
}

type Mix = Partial<Record<string, number>>;

const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _e = new THREE.Euler();
const _v = new THREE.Vector3();

export class VrmAvatar {
  readonly root = new THREE.Group();
  readonly gender: Gender;
  readonly height: number;

  /** Horizontal speed in m/s, set by the controller. */
  speed = 0;
  airborne = false;
  vy = 0;
  /** Object the eyes and head follow (usually the camera). */
  lookTarget: THREE.Object3D | null = null;
  headFollow = 1;
  /** External mouth driver for lip sync, 0..1, or -1 when silent. */
  speech = -1;
  mood: Mood = 'neutral';
  onEvent?: (name: string) => void;

  private nodes = {} as Record<BoneName, THREE.Object3D | null>;
  private fingerNodes: { L: (THREE.Object3D | null)[][]; R: (THREE.Object3D | null)[][] } = { L: [], R: [] };
  private restHips = new THREE.Vector3();
  private vrm0: boolean;
  private offL = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);
  private offR = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  private offLi = this.offL.clone().invert();
  private offRi = this.offR.clone().invert();

  private t = 0;
  private phase = 0;
  private runBlend = 0;
  private airBlend = 0;
  private landing = 0;
  private wasAirborne = false;
  private base = emptyPose();
  private loco = emptyPose();
  private air = emptyPose();
  private act = emptyPose();
  private pose = emptyPose();
  private action: { name: ActionName; t: number; weight: number; ending: boolean; fired: Set<string> } | null = null;

  private weights: Record<string, number> = {};
  private surpriseName: string | null = null;
  private blinkTimer = 2;
  private blinkPhase = -1;
  private lipT = 0;
  private props: { katana?: THREE.Object3D; wand?: THREE.Object3D } = {};
  private propScale = 0;
  weapon: 'katana' | 'wand' = 'katana';

  constructor(readonly vrm: VRM, gender: Gender) {
    this.gender = gender;
    this.vrm0 = (vrm.meta as { metaVersion?: string }).metaVersion === '0';
    this.root.add(vrm.scene);
    const h = vrm.humanoid;
    for (const b of BONES) this.nodes[b] = h.getNormalizedBoneNode(BONE_MAP[b]) ?? null;
    if (!this.nodes.chest) this.nodes.chest = h.getNormalizedBoneNode('upperChest') ?? null;
    for (const side of ['L', 'R'] as const) {
      const prefix = side === 'L' ? 'left' : 'right';
      this.fingerNodes[side] = FINGERS.map((f) =>
        SEGMENTS[f].map((s) => h.getNormalizedBoneNode(`${prefix}${f}${s}` as VRMHumanBoneName) ?? null),
      );
    }
    this.restHips.copy(this.nodes.hips!.position);
    const box = new THREE.Box3().setFromObject(vrm.scene);
    this.height = box.max.y - box.min.y;
    const exprs = vrm.expressionManager?.expressions ?? [];
    this.surpriseName = exprs.find((e) => /surpris/i.test(e.expressionName))?.expressionName ?? null;
    this.update(0);
  }

  // ---------------------------------------------------------------- props

  attachProp(kind: 'katana' | 'wand', prop: THREE.Object3D) {
    // Prop is authored in the normalized right-hand frame of our convention: fingers
    // along -X (T-pose), grip axis along Z. Convert that into the raw bone's frame.
    const h = this.vrm.humanoid;
    const norm = h.getNormalizedBoneNode('rightHand');
    const raw = h.getRawBoneNode('rightHand');
    if (!norm || !raw) return;
    const saved = this.captureNormalized();
    h.resetNormalizedPose();
    this.vrm.update(0);
    this.vrm.scene.updateMatrixWorld(true);
    const C = norm.matrixWorld.clone().invert().multiply(raw.matrixWorld); // raw = norm * C
    const local = new THREE.Matrix4().compose(
      this.conv(new THREE.Vector3(-0.075, -0.02, 0)),
      this.convQ(new THREE.Quaternion()),
      new THREE.Vector3(1, 1, 1),
    );
    const holder = new THREE.Group();
    holder.matrixAutoUpdate = false;
    holder.matrix.copy(C.invert().multiply(local));
    holder.add(prop);
    raw.add(holder);
    prop.scale.setScalar(0.0001);
    this.props[kind] = prop;
    this.restoreNormalized(saved);
  }

  private captureNormalized() {
    return BONES.map((b) => this.nodes[b]?.quaternion.clone());
  }
  private restoreNormalized(saved: (THREE.Quaternion | undefined)[]) {
    BONES.forEach((b, i) => saved[i] && this.nodes[b]?.quaternion.copy(saved[i]!));
  }

  // ---------------------------------------------------------------- control

  play(name: ActionName) {
    if (this.action && this.action.name === name && ACTIONS[name].loop) {
      this.action.ending = true;
      return;
    }
    this.action = { name, t: 0, weight: this.action ? this.action.weight : 0, ending: false, fired: new Set() };
  }

  stopAction() {
    if (this.action) this.action.ending = true;
  }

  get currentAction(): ActionName | null {
    return this.action && !this.action.ending ? this.action.name : null;
  }

  /** True while an action wants the character to stand still. */
  get busy(): boolean {
    return !!this.action && !this.action.ending && this.action.name !== 'dance' && this.action.name !== 'wave';
  }

  resetPhysics() {
    this.vrm.springBoneManager?.reset();
  }

  // ---------------------------------------------------------------- update

  update(dt: number) {
    this.t += dt;
    const g = this.gender;

    // Locomotion: walk -> run blend from speed, phase advances with distance.
    const run = THREE.MathUtils.clamp((this.speed - 1.6) / 2.6, 0, 1);
    this.runBlend += (run - this.runBlend) * Math.min(1, dt * 6);
    const stride = THREE.MathUtils.lerp(1.15, 2.2, this.runBlend);
    this.phase += (this.speed * dt * Math.PI * 2) / stride;
    const moving = THREE.MathUtils.clamp(this.speed / 0.6, 0, 1);

    idlePose(this.t, g, this.base);
    locoPose(this.phase, this.runBlend, g, this.loco);
    lerpPose(this.base, this.loco, moving, this.pose);

    // Air.
    if (this.airborne && !this.wasAirborne) this.airBlend = 0;
    if (!this.airborne && this.wasAirborne) this.landing = 1;
    this.wasAirborne = this.airborne;
    this.airBlend += ((this.airborne ? 1 : 0) - this.airBlend) * Math.min(1, dt * 10);
    if (this.airBlend > 0.001) {
      airPose(this.vy, g, this.air);
      lerpPose(this.pose, this.air, this.airBlend, this.pose);
    }
    if (this.landing > 0) {
      const l = this.landing;
      const P = this.pose.r;
      this.pose.hips[1] -= 0.09 * l;
      P['upperLeg.L'][0] -= 0.55 * l;
      P['upperLeg.R'][0] -= 0.55 * l;
      P['lowerLeg.L'][0] += 1.0 * l;
      P['lowerLeg.R'][0] += 1.0 * l;
      P['foot.L'][0] -= 0.45 * l;
      P['foot.R'][0] -= 0.45 * l;
      P.spine[0] += 0.25 * l;
      this.landing = Math.max(0, this.landing - dt * 4);
    }

    // One-shot / looping action layered on top.
    let actionMood: Mood | null = null;
    let showProp = false;
    if (this.action) {
      const a = this.action;
      const def = ACTIONS[a.name];
      a.t += dt;
      if (!def.loop && a.t >= def.duration) a.ending = true;
      a.weight += ((a.ending ? 0 : 1) - a.weight) * Math.min(1, dt * (a.ending ? 6 : 9));
      const at = def.loop ? a.t % def.duration : Math.min(a.t, def.duration);
      copyPose(this.pose, this.act);
      def.pose(at, g, this.pose, this.act);
      lerpPose(this.pose, this.act, a.weight, this.pose);
      for (const ev of def.events ?? []) {
        if (at >= ev.t && !a.fired.has(ev.name)) {
          a.fired.add(ev.name);
          this.onEvent?.(ev.name);
        }
      }
      if (!a.ending && def.expression) actionMood = def.expression(g);
      if (def.weapon && !a.ending) showProp = true;
      if (a.ending && a.weight < 0.01) this.action = null;
    }

    this.applyLook(dt);
    this.applyPose(this.pose);
    this.updateFace(dt, actionMood ?? this.mood);
    this.updateProps(dt, showProp);
    this.vrm.update(dt);
  }

  private lookYaw = 0;
  private lookPitch = 0;

  private applyLook(dt: number) {
    const lt = this.lookTarget;
    this.vrm.lookAt && (this.vrm.lookAt.target = lt ?? undefined);
    let yaw = 0;
    let pitch = 0;
    if (lt && this.nodes.head) {
      lt.getWorldPosition(_v);
      this.root.worldToLocal(_v);
      const headY = this.height * 0.88;
      const dx = _v.x;
      const dz = _v.z;
      const dy = _v.y - headY;
      yaw = Math.atan2(dx, dz);
      pitch = -Math.atan2(dy, Math.hypot(dx, dz));
      const facing = Math.abs(yaw) < 1.9 ? 1 : 0;
      const w = this.headFollow * facing * (1 - (this.action && !this.action.ending ? this.action.weight : 0)) * (1 - THREE.MathUtils.clamp(this.speed / 2, 0, 1) * 0.7);
      yaw = THREE.MathUtils.clamp(yaw, -0.9, 0.9) * w;
      pitch = THREE.MathUtils.clamp(pitch, -0.4, 0.35) * w;
    }
    const k = Math.min(1, dt * 5);
    this.lookYaw += (yaw - this.lookYaw) * k;
    this.lookPitch += (pitch - this.lookPitch) * k;
    const P = this.pose.r;
    P.head[1] += this.lookYaw * 0.55;
    P.neck[1] += this.lookYaw * 0.3;
    P.chest[1] += this.lookYaw * 0.1;
    P.head[0] += this.lookPitch * 0.6;
    P.neck[0] += this.lookPitch * 0.3;
  }

  /** Mirror a vector from our +Z-forward convention into a VRM 0.x internal frame. */
  private conv(v: THREE.Vector3): THREE.Vector3 {
    if (this.vrm0) v.set(-v.x, v.y, -v.z);
    return v;
  }
  private convQ(q: THREE.Quaternion): THREE.Quaternion {
    if (this.vrm0) q.set(-q.x, q.y, -q.z, q.w);
    return q;
  }

  private applyPose(p: Pose) {
    for (const b of BONES) {
      const node = this.nodes[b];
      if (!node) continue;
      const r = p.r[b];
      _q.setFromEuler(_e.set(r[0], r[1], r[2], 'XYZ'));
      if (b === 'upperArm.L') _q.multiply(this.offL);
      else if (b === 'upperArm.R') _q.multiply(this.offR);
      else if (b === 'lowerArm.L' || b === 'hand.L') _q.premultiply(this.offLi).multiply(this.offL);
      else if (b === 'lowerArm.R' || b === 'hand.R') _q.premultiply(this.offRi).multiply(this.offR);
      node.quaternion.copy(this.convQ(_q));
    }
    const hips = this.nodes.hips!;
    _v.set(p.hips[0], p.hips[1], p.hips[2]);
    hips.position.copy(this.restHips).add(this.conv(_v));
    for (const side of ['L', 'R'] as const) {
      const curls = side === 'L' ? p.fingersL : p.fingersR;
      const s = side === 'L' ? -1 : 1;
      this.fingerNodes[side].forEach((segs, fi) => {
        const c = curls[fi];
        segs.forEach((node, si) => {
          if (!node) return;
          if (fi === 0) {
            // Thumb folds down and across the palm.
            const k = [0.35, 0.55, 0.6][si] * c;
            _e.set(0, -s * k * 0.6, s * k, 'XYZ');
          } else {
            const k = [1.25, 1.45, 1.0][si] * c;
            _e.set(0, 0, s * k, 'XYZ');
          }
          _q2.setFromEuler(_e);
          node.quaternion.copy(this.convQ(_q2));
        });
      });
    }
  }

  // ---------------------------------------------------------------- face

  private updateFace(dt: number, mood: Mood) {
    const em = this.vrm.expressionManager;
    if (!em) return;
    const target: Mix = moodMix(mood, this.surpriseName);

    // Blink unless the expression already closes the eyes.
    let blink = 0;
    const eyesBusy = mood === 'happy' || mood === 'wink';
    this.blinkTimer -= dt;
    if (this.blinkTimer <= 0 && this.blinkPhase < 0 && !eyesBusy) {
      this.blinkPhase = 0;
      this.blinkTimer = 1.8 + Math.random() * 3.6;
    }
    if (this.blinkPhase >= 0) {
      this.blinkPhase += dt / 0.16;
      const ph = this.blinkPhase;
      blink = ph < 0.5 ? ph * 2 : Math.max(0, 2 - ph * 2);
      if (ph >= 1) this.blinkPhase = -1;
    }
    if (!eyesBusy) target.blink = Math.max(target.blink ?? 0, blink);

    // Lip sync: cycle mouth shapes while a sound drives the openness.
    if (this.speech >= 0) {
      this.lipT += dt;
      const v = THREE.MathUtils.clamp(this.speech, 0, 1);
      const cycle = Math.floor(this.lipT * 7) % 4;
      const shape = ['aa', 'oh', 'ih', 'ee'][cycle];
      target.aa = (target.aa ?? 0) * 0.3;
      target[shape] = Math.max(target[shape] ?? 0, v * (shape === 'aa' ? 1 : 0.8));
    }

    const k = Math.min(1, dt * 12);
    const keys = new Set([...Object.keys(this.weights), ...Object.keys(target)]);
    for (const key of keys) {
      const cur = this.weights[key] ?? 0;
      const goal = target[key] ?? 0;
      const fast = key === 'blink' || ['aa', 'oh', 'ih', 'ee', 'ou'].includes(key) ? 1 : k;
      const next = cur + (goal - cur) * fast;
      this.weights[key] = next;
      if (em.getExpression(key)) em.setValue(key, next);
    }
  }

  // ---------------------------------------------------------------- props

  private updateProps(dt: number, show: boolean) {
    const target = show ? 1 : 0;
    this.propScale += (target - this.propScale) * Math.min(1, dt * (show ? 14 : 8));
    for (const [kind, prop] of Object.entries(this.props)) {
      if (!prop) continue;
      const s = kind === this.weapon ? this.propScale : 0;
      prop.scale.setScalar(Math.max(0.0001, s));
      prop.visible = s > 0.01;
    }
  }

  /** World position of the right hand, for effects. */
  handPosition(out: THREE.Vector3): THREE.Vector3 {
    const raw = this.vrm.humanoid.getRawBoneNode('rightHand');
    return raw ? raw.getWorldPosition(out) : this.root.getWorldPosition(out);
  }

  dispose() {
    this.root.removeFromParent();
    VRMUtils.deepDispose(this.vrm.scene);
  }
}

function moodMix(mood: Mood, surprise: string | null): Mix {
  switch (mood) {
    case 'happy': return { happy: 1 };
    case 'joy': return { relaxed: 0.55, happy: 0.25, aa: 0.35 };
    case 'wink': return { blinkRight: 1, relaxed: 0.6 };
    case 'relaxed': return { relaxed: 1 };
    case 'shy': return { relaxed: 0.45, sad: 0.3 };
    case 'surprised': return surprise ? { [surprise]: 1 } : { aa: 0.7, ou: 0.2 };
    case 'sad': return { sad: 1 };
    case 'angry': return { angry: 1 };
    default: return {};
  }
}

