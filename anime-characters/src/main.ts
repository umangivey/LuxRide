import './style.css';
import { loadingOverlay } from './ui';

interface Mode {
  mount(): Promise<void>;
  unmount(): void;
}

const stage = document.getElementById('stage')!;
const panel = document.getElementById('panel')!;
const hud = document.getElementById('hud')!;
const loading = loadingOverlay();
const tabs = [...document.querySelectorAll<HTMLButtonElement>('.modes [role="tab"]')];
const toggle = document.getElementById('panel-toggle') as HTMLButtonElement;

let current: Mode | null = null;
let currentId = '';
let switching: Promise<void> = Promise.resolve();

async function open(id: '3d' | 'live') {
  if (id === currentId) return;
  currentId = id;
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.mode === id)));
  document.body.dataset.mode = id;
  current?.unmount();
  current = null;
  stage.replaceChildren();
  try {
    if (id === '3d') {
      const { Mode3D } = await import('./three3d/Mode3D');
      current = new Mode3D(stage, panel, hud, loading);
    } else {
      const { ModeLive } = await import('./live2d/ModeLive');
      current = new ModeLive(stage, panel, hud, loading);
    }
    await current.mount();
  } catch (e) {
    console.error(e);
    loading.hide();
    stage.replaceChildren();
    const msg = document.createElement('div');
    msg.className = 'error';
    msg.textContent = `This mode could not start: ${(e as Error).message}. If the models are missing, run "npm run models" and reload.`;
    stage.append(msg);
  }
}

for (const t of tabs) {
  t.addEventListener('click', () => {
    const id = t.dataset.mode as '3d' | 'live';
    switching = switching.then(() => open(id));
    try {
      history.replaceState(null, '', `#${id}`);
    } catch {
      /* sandboxed frames may refuse history changes */
    }
  });
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('panel-closed', !open);
  window.dispatchEvent(new Event('resize'));
});
if (window.matchMedia('(max-width: 760px)').matches) {
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.add('panel-closed');
}

const start = location.hash === '#live' ? 'live' : '3d';
switching = open(start);
