// 3D mode: a shrine plaza where the VRM avatars can be shown off (orbit camera) or
// played in third person (WASD, sprint, jump, attacks, emotes).

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ROSTER_3D, type Avatar3D, type Gender } from '../shared/roster';
import { MOODS, type Mood } from '../shared/moods';
import { actionButtons, chips, h, section, segmented, toast, toggle, type Loading } from '../ui';
import { isDark, onThemeChange } from '../theme';
import { ACTIONS, type ActionName } from './animations';
import { Environment } from './environment';
import { Effects, makeKatana, makeWand } from './props';
import { loadVrm, VrmAvatar } from './VrmAvatar';

interface Slot {
  def: Avatar3D;
  avatar: VrmAvatar;
  home: THREE.Vector3;
  vel: THREE.Vector3;
  vy: number;
}

const WALK = 1.5;
const RUN = 4.2;
const GRAVITY = 17;
const JUMP = 5.4;

export class Mode3D {
  private renderer!: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.05, 200);
  private controls!: OrbitControls;
  private env!: Environment;
  private effects = new Effects();
  private clock = new THREE.Clock();
  private slots: Slot[] = [];
  private selected = 0;
  private play = false;
  private keys = new Set<string>();
  private joy = new THREE.Vector2();
  private raf = 0;
  private disposers: (() => void)[] = [];
  private mood: Mood = 'neutral';
  private eyesFollow = true;
  private autoRotate = false;
  private timeOfDay: 'auto' | 'day' | 'night' = 'auto';
  private ui!: {
    cards: Map<string, HTMLButtonElement>;
    mode: { set: (v: 'showcase' | 'play') => void };
    moods: { set: (m: Mood | null) => void };
  };

  constructor(private stage: HTMLElement, private panel: HTMLElement, private hud: HTMLElement, private loading: Loading) {}

  async mount() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.stage.append(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-label', '3D shrine plaza with the characters');

    this.env = new Environment(this.scene);
    this.scene.add(this.effects.group);
    this.camera.position.set(0.2, 1.5, 4.4);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.0, 0);
    this.controls.enableDamping = true;
    this.controls.minDistance = 1.0;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = 1.52;
    this.controls.autoRotateSpeed = 0.8;

    this.resize();
    const onResize = () => this.resize();
    window.addEventListener('resize', onResize);
    this.disposers.push(() => window.removeEventListener('resize', onResize));
    this.disposers.push(onThemeChange(() => this.applyTime()));
    this.applyTime(true);
    this.bindInput();
    this.buildPanel();

    this.loading.show('Loading Hana and Ren');
    const first = ROSTER_3D.slice(0, 2);
    const progress = first.map(() => 0);
    await Promise.all(
      first.map((def, i) =>
        this.addAvatar(def, (p) => {
          progress[i] = p;
          this.loading.progress(progress.reduce((a, b) => a + b, 0) / progress.length);
        }),
      ),
    );
    this.loading.hide();
    this.select(0);
    this.clock.start();
    this.loop();
  }

  unmount() {
    cancelAnimationFrame(this.raf);
    this.disposers.forEach((d) => d());
    this.disposers = [];
    for (const s of this.slots) s.avatar.dispose();
    this.slots = [];
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.panel.replaceChildren();
    this.hud.replaceChildren();
  }

  // ------------------------------------------------------------------ avatars

  private async addAvatar(def: Avatar3D, onProgress?: (p: number) => void, data?: ArrayBuffer): Promise<Slot> {
    const vrm = await loadVrm(data ?? def.file, onProgress);
    const avatar = new VrmAvatar(vrm, def.gender);
    avatar.weapon = def.weapon;
    avatar.attachProp('katana', makeKatana());
    avatar.attachProp('wand', makeWand());
    const slot: Slot = { def, avatar, home: new THREE.Vector3(), vel: new THREE.Vector3(), vy: 0 };
    avatar.onEvent = (name) => this.onAvatarEvent(slot, name);
    this.slots.push(slot);
    this.scene.add(avatar.root);
    this.layout();
    this.refreshCards();
    return slot;
  }

  private layout() {
    const n = this.slots.length;
    this.slots.forEach((s, i) => {
      s.home.set((i - (n - 1) / 2) * 1.05, 0, 0);
      if (!this.play || i !== this.selected) {
        s.avatar.root.position.copy(s.home);
        s.avatar.root.rotation.y = 0;
        s.avatar.resetPhysics();
      }
    });
  }

  private select(i: number) {
    this.selected = i;
    this.refreshCards();
    const s = this.slots[i];
    if (!s) return;
    this.ui.moods.set(s.avatar.mood);
    if (!this.play) {
      this.controls.target.set(s.avatar.root.position.x * 0.6, 1.0, 0);
    }
  }

  private get current(): Slot | undefined {
    return this.slots[this.selected];
  }

  private onAvatarEvent(slot: Slot, name: string) {
    if (name !== 'strike') return;
    const a = slot.avatar;
    const yaw = a.root.rotation.y;
    const fwd = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    if (a.weapon === 'katana') {
      const p = a.root.position.clone().addScaledVector(fwd, 0.55).add(new THREE.Vector3(0, a.height * 0.62, 0));
      this.effects.slash(p, yaw);
    } else {
      const p = a.handPosition(new THREE.Vector3()).addScaledVector(fwd, 0.25);
      this.effects.burst(p, fwd);
    }
  }

  // ------------------------------------------------------------------ input

  private bindInput() {
    const down = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('input, textarea, select')) return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'shift'].includes(k) && this.play) e.preventDefault();
      if (this.keys.has(k)) return;
      this.keys.add(k);
      const s = this.current;
      if (!s) return;
      const map: Record<string, ActionName> = { e: 'wave', j: 'attack', q: 'dance', v: 'victory', b: 'bow' };
      if (map[k]) this.doAction(map[k]);
      if (k === ' ' && this.play) this.jump();
      if (k === 'tab') {
        e.preventDefault();
        this.select((this.selected + 1) % this.slots.length);
      }
      const mood = MOODS.find((m) => m.key === k);
      if (mood) this.setMood(mood.id);
    };
    const up = (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase());
    const blur = () => this.keys.clear();
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    this.disposers.push(() => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    });

    // Click an avatar to select it (ignore drags).
    const canvas = this.renderer.domElement;
    let downAt: [number, number] | null = null;
    canvas.addEventListener('pointerdown', (e) => (downAt = [e.clientX, e.clientY]));
    canvas.addEventListener('pointerup', (e) => {
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
      const r = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, this.camera);
      let best = -1;
      let bestD = Infinity;
      this.slots.forEach((s, i) => {
        const hit = ray.intersectObject(s.avatar.vrm.scene, true)[0];
        if (hit && hit.distance < bestD) {
          bestD = hit.distance;
          best = i;
        }
      });
      if (best >= 0 && best !== this.selected) this.select(best);
    });
  }

  private doAction(name: ActionName) {
    const s = this.current;
    if (!s) return;
    s.avatar.play(name);
  }

  private jump() {
    const s = this.current;
    if (!s || s.avatar.root.position.y > 0.001 || s.avatar.busy) return;
    s.vy = JUMP;
  }

  private setMood(m: Mood) {
    this.mood = m;
    const s = this.current;
    if (s) s.avatar.mood = m;
    this.ui.moods.set(m);
  }

  private setPlay(play: boolean) {
    this.play = play;
    this.ui.mode.set(play ? 'play' : 'showcase');
    this.controls.autoRotate = !play && this.autoRotate;
    this.buildHud();
    if (!play) {
      for (const s of this.slots) {
        s.vel.set(0, 0, 0);
        s.vy = 0;
      }
      this.layout();
      this.controls.target.set(0, 1.0, 0);
      this.camera.position.set(0.2, 1.5, 4.4);
    } else {
      const s = this.current!;
      this.controls.target.copy(s.avatar.root.position).add(new THREE.Vector3(0, 1.1, 0));
      this.camera.position.copy(this.controls.target).add(new THREE.Vector3(0, 0.6, 3.4));
      toast(`Playing as ${s.def.name}. WASD to move, Space to jump.`);
    }
  }

  // ------------------------------------------------------------------ loop

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, this.clock.getDelta());
    const t = this.clock.elapsedTime;
    this.env.update(dt, t);
    this.updatePlayers(dt);
    for (const s of this.slots) s.avatar.update(dt);
    this.effects.update(dt);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private updatePlayers(dt: number) {
    const player = this.play ? this.current : undefined;
    for (const s of this.slots) {
      const a = s.avatar;
      a.lookTarget = this.eyesFollow ? (player && s !== player ? player.avatar.vrm.humanoid.getRawBoneNode('head') ?? this.camera : this.camera) : null;
      if (s !== player) {
        // Gravity for jumps started in showcase mode, too.
        this.integrateVertical(s, dt);
        a.speed = 0;
        continue;
      }
      // Input relative to the camera.
      let ix = 0;
      let iz = 0;
      const k = this.keys;
      if (k.has('w') || k.has('arrowup')) iz += 1;
      if (k.has('s') || k.has('arrowdown')) iz -= 1;
      if (k.has('a') || k.has('arrowleft')) ix -= 1;
      if (k.has('d') || k.has('arrowright')) ix += 1;
      ix += this.joy.x;
      iz += this.joy.y;
      const mag = Math.min(1, Math.hypot(ix, iz));
      const fwd = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).setY(0).normalize();
      const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0));
      const dir = fwd.multiplyScalar(iz).addScaledVector(right, ix);
      if (dir.lengthSq() > 0) dir.normalize();
      const walking = k.has('shift') || (this.joy.lengthSq() > 0 && this.joy.length() < 0.6);
      const speed = a.busy ? 0 : mag * (walking ? WALK : RUN);
      const goal = dir.multiplyScalar(speed);
      s.vel.lerp(goal, Math.min(1, dt * (goal.lengthSq() > s.vel.lengthSq() ? 8 : 12)));
      const pos = a.root.position;
      const before = pos.clone();
      pos.x += s.vel.x * dt;
      pos.z += s.vel.z * dt;
      this.collide(s);
      this.integrateVertical(s, dt);
      a.speed = Math.hypot(s.vel.x, s.vel.z);
      if (a.speed > 0.15) {
        const target = Math.atan2(s.vel.x, s.vel.z);
        let d = target - a.root.rotation.y;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        a.root.rotation.y += d * Math.min(1, dt * 12);
      }
      // Camera follows the player, keeping its orbit offset.
      const delta = pos.clone().sub(before);
      delta.y = 0;
      this.controls.target.add(delta);
      this.camera.position.add(delta);
      const desiredY = pos.y * 0.5 + 1.1;
      this.controls.target.y += (desiredY - this.controls.target.y) * Math.min(1, dt * 6);
    }
  }

  private integrateVertical(s: Slot, dt: number) {
    const pos = s.avatar.root.position;
    if (pos.y > 0 || s.vy > 0) {
      s.vy -= GRAVITY * dt;
      pos.y += s.vy * dt;
      if (pos.y <= 0) {
        pos.y = 0;
        s.vy = 0;
      }
    }
    s.avatar.airborne = pos.y > 0.02;
    s.avatar.vy = s.vy;
  }

  private collide(s: Slot) {
    const p = s.avatar.root.position;
    const r = 0.3;
    for (const c of this.env.colliders) {
      const dx = p.x - c.x;
      const dz = p.z - c.z;
      const d = Math.hypot(dx, dz);
      if (d < c.r + r && d > 1e-4) {
        p.x = c.x + (dx / d) * (c.r + r);
        p.z = c.z + (dz / d) * (c.r + r);
      }
    }
    for (const o of this.slots) {
      if (o === s) continue;
      const q = o.avatar.root.position;
      const dx = p.x - q.x;
      const dz = p.z - q.z;
      const d = Math.hypot(dx, dz);
      if (d < r * 2 && d > 1e-4) {
        p.x = q.x + (dx / d) * r * 2;
        p.z = q.z + (dz / d) * r * 2;
      }
    }
    const R = 20;
    const d = Math.hypot(p.x, p.z);
    if (d > R) {
      p.x *= R / d;
      p.z *= R / d;
    }
  }

  private resize() {
    const w = this.stage.clientWidth || window.innerWidth;
    const hgt = this.stage.clientHeight || window.innerHeight;
    this.renderer.setSize(w, hgt);
    this.camera.aspect = w / hgt;
    this.camera.updateProjectionMatrix();
  }

  private applyTime(instant = false) {
    const night = this.timeOfDay === 'night' || (this.timeOfDay === 'auto' && isDark());
    this.env.setNight(night, instant);
  }

  // ------------------------------------------------------------------ panel

  private buildPanel() {
    const p = this.panel;
    p.replaceChildren();

    const chars = section('Characters', 'Tab cycles');
    const grid = h('div', { class: 'cards' });
    const cards = new Map<string, HTMLButtonElement>();
    for (const def of ROSTER_3D) {
      const b = h(
        'button',
        { class: 'card', type: 'button', id: `char-${def.id}`, style: `--card-accent:${def.accent}` },
        h('span', { class: 'card-kana', 'aria-hidden': 'true' }, def.kana),
        h('span', { class: 'card-name' }, def.name),
        h('span', { class: 'card-role' }, def.role),
      );
      b.addEventListener('click', () => this.pickRoster(def));
      cards.set(def.id, b);
      grid.append(b);
    }
    const fileInput = h('input', { type: 'file', id: 'vrm-file', accept: '.vrm', class: 'visually-hidden' }) as HTMLInputElement;
    fileInput.addEventListener('change', () => {
      const f = fileInput.files?.[0];
      if (f) this.loadCustom(f);
      fileInput.value = '';
    });
    const custom = h('label', { class: 'card card-upload', for: 'vrm-file' }, h('span', { class: 'card-kana', 'aria-hidden': 'true' }, '＋'), h('span', { class: 'card-name' }, 'Your VRM'), h('span', { class: 'card-role' }, 'From VRoid Studio'));
    grid.append(custom, fileInput);
    chars.body.append(grid);

    const modeSec = section('Mode');
    const mode = segmented('mode3d', 'Mode', [{ id: 'showcase', label: 'Showcase' }, { id: 'play', label: 'Play' }], 'showcase', (v) => this.setPlay(v === 'play'));
    modeSec.body.append(mode.el);

    const moves = section('Moves');
    moves.body.append(
      actionButtons([
        ...(['wave', 'attack', 'dance', 'victory', 'bow'] as ActionName[]).map((n) => ({
          id: n,
          label: ACTIONS[n].label,
          key: { wave: 'E', attack: 'J', dance: 'Q', victory: 'V', bow: 'B' }[n],
          onClick: () => this.doAction(n),
        })),
        { id: 'jump', label: 'Jump', key: 'Space', onClick: () => this.jumpAny() },
      ]),
    );

    const face = section('Expression', 'Keys 1 to 9');
    const moods = chips('mood', MOODS.map((m) => ({ id: m.id, label: m.label, key: m.key })), this.mood, (m) => this.setMood(m));
    face.body.append(moods.el);

    const view = section('View');
    const time = segmented('time3d', 'Time of day', [{ id: 'auto', label: 'Auto' }, { id: 'day', label: 'Day' }, { id: 'night', label: 'Night' }], this.timeOfDay, (v) => {
      this.timeOfDay = v;
      this.applyTime();
    });
    view.body.append(
      time.el,
      toggle('eyes-follow', 'Characters look at the camera', this.eyesFollow, (v) => (this.eyesFollow = v)),
      toggle('auto-rotate', 'Slowly circle the camera', this.autoRotate, (v) => {
        this.autoRotate = v;
        this.controls.autoRotate = v && !this.play;
      }),
    );

    const credits = h('p', { class: 'credits' }, 'Models: VRoid sample avatars and VRM sample by pixiv Inc. Animation, gameplay and world built in Three.js.');
    p.append(chars.el, modeSec.el, moves.el, face.el, view.el, credits);
    this.ui = { cards, mode, moods };
    this.buildHud();
  }

  private jumpAny() {
    const s = this.current;
    if (!s || s.avatar.root.position.y > 0.001) return;
    s.vy = JUMP;
  }

  private async pickRoster(def: Avatar3D) {
    const i = this.slots.findIndex((s) => s.def.id === def.id);
    if (i >= 0) return this.select(i);
    if (this.slots.length >= 4) {
      // Swap out the oldest extra (keep Hana and Ren).
      const idx = this.slots.findIndex((s, k) => k >= 2 && k !== this.selected);
      if (idx >= 0) {
        this.slots[idx].avatar.dispose();
        this.slots.splice(idx, 1);
      }
    }
    toast(`Loading ${def.name}…`);
    try {
      await this.addAvatar(def);
      this.select(this.slots.length - 1);
      toast(`${def.name} joined the plaza.`);
    } catch (e) {
      toast(`Could not load ${def.name}: ${(e as Error).message}`);
    }
  }

  private async loadCustom(file: File) {
    toast(`Loading ${file.name}…`);
    try {
      const data = await file.arrayBuffer();
      const name = file.name.replace(/\.vrm$/i, '').slice(0, 18) || 'Custom';
      const def: Avatar3D = { id: `custom-${Date.now()}`, name, kana: '★', gender: 'female' as Gender, role: 'Your avatar', file: '', weapon: 'wand', accent: '#5B7BE0', credit: 'Your VRM' };
      if (this.slots.length >= 4) {
        const idx = this.slots.findIndex((s, k) => k >= 2 && k !== this.selected);
        if (idx >= 0) {
          this.slots[idx].avatar.dispose();
          this.slots.splice(idx, 1);
        }
      }
      await this.addAvatar(def, undefined, data);
      this.select(this.slots.length - 1);
      toast(`${name} joined the plaza.`);
    } catch (e) {
      toast(`That file did not load as a VRM avatar. ${(e as Error).message}`);
    }
  }

  private refreshCards() {
    if (!this.ui) return;
    const cur = this.current?.def.id;
    for (const [id, b] of this.ui.cards) {
      b.setAttribute('aria-pressed', String(id === cur));
      b.classList.toggle('in-scene', this.slots.some((s) => s.def.id === id));
    }
  }

  private buildHud() {
    const hud = this.hud;
    hud.replaceChildren();
    if (!this.play) {
      hud.append(h('div', { class: 'hint' }, 'Drag to orbit, scroll to zoom, click a character to select.'));
      return;
    }
    hud.append(
      h(
        'div',
        { class: 'hint keys' },
        h('span', {}, h('kbd', {}, 'WASD'), ' move'),
        h('span', {}, h('kbd', {}, 'Shift'), ' walk'),
        h('span', {}, h('kbd', {}, 'Space'), ' jump'),
        h('span', {}, h('kbd', {}, 'J'), ' attack'),
        h('span', {}, h('kbd', {}, 'E Q V B'), ' emotes'),
      ),
    );
    // Touch controls.
    const stick = h('div', { class: 'joystick', 'aria-label': 'Move', role: 'application' }, h('div', { class: 'joystick-knob' }));
    const knob = stick.firstElementChild as HTMLElement;
    let id: number | null = null;
    const move = (e: PointerEvent) => {
      const r = stick.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = (e.clientX - cx) / (r.width / 2);
      let dy = (e.clientY - cy) / (r.height / 2);
      const l = Math.hypot(dx, dy);
      if (l > 1) {
        dx /= l;
        dy /= l;
      }
      this.joy.set(dx, -dy);
      knob.style.transform = `translate(${dx * 34}px, ${dy * 34}px)`;
    };
    stick.addEventListener('pointerdown', (e) => {
      id = e.pointerId;
      stick.setPointerCapture(e.pointerId);
      move(e);
    });
    stick.addEventListener('pointermove', (e) => e.pointerId === id && move(e));
    const end = () => {
      id = null;
      this.joy.set(0, 0);
      knob.style.transform = '';
    };
    stick.addEventListener('pointerup', end);
    stick.addEventListener('pointercancel', end);
    const btns = h('div', { class: 'touch-buttons' });
    for (const [label, fn] of [['Jump', () => this.jump()], ['Attack', () => this.doAction('attack')]] as const) {
      const b = h('button', { type: 'button', class: 'touch-btn' }, label);
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        fn();
      });
      btns.append(b);
    }
    hud.append(h('div', { class: 'touch' }, stick, btns));
  }
}
