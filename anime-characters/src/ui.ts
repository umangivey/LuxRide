// Tiny DOM helpers for the side panel. Every control gets a stable id.

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | undefined> = {},
  ...children: (Node | string | null | undefined)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k === 'class') el.className = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of children) if (c != null) el.append(c);
  return el;
}

export function section(title: string, hint?: string): { el: HTMLElement; body: HTMLElement } {
  const body = h('div', { class: 'section-body' });
  const el = h('section', { class: 'section' }, h('h2', { class: 'section-title' }, title, hint ? h('span', { class: 'section-hint' }, hint) : null), body);
  return { el, body };
}

export interface ChipItem<T extends string> { id: T; label: string; key?: string }

/** Single-select chip group. Returns a setter for the active chip. */
export function chips<T extends string>(idPrefix: string, items: ChipItem<T>[], active: T | null, onSelect: (id: T) => void) {
  const wrap = h('div', { class: 'chips', role: 'radiogroup' });
  const buttons = new Map<T, HTMLButtonElement>();
  for (const it of items) {
    const b = h('button', { class: 'chip', id: `${idPrefix}-${it.id}`, type: 'button', role: 'radio', 'aria-checked': String(it.id === active) }, it.label, it.key ? h('kbd', {}, it.key) : null);
    b.addEventListener('click', () => onSelect(it.id));
    buttons.set(it.id, b);
    wrap.append(b);
  }
  const set = (id: T | null) => {
    for (const [k, b] of buttons) b.setAttribute('aria-checked', String(k === id));
  };
  return { el: wrap, set };
}

export function actionButtons(items: { id: string; label: string; key?: string; onClick: () => void }[]) {
  const wrap = h('div', { class: 'actions' });
  for (const it of items) {
    const b = h('button', { class: 'action', id: `act-${it.id}`, type: 'button' }, h('span', {}, it.label), it.key ? h('kbd', {}, it.key) : null);
    b.addEventListener('click', it.onClick);
    wrap.append(b);
  }
  return wrap;
}

export function segmented<T extends string>(id: string, label: string, items: { id: T; label: string }[], value: T, onChange: (v: T) => void) {
  const wrap = h('div', { class: 'segmented', role: 'radiogroup', 'aria-label': label, id });
  const buttons = items.map((it) => {
    const b = h('button', { type: 'button', role: 'radio', id: `${id}-${it.id}`, 'aria-checked': String(it.id === value) }, it.label);
    b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
      onChange(it.id);
    });
    wrap.append(b);
    return b;
  });
  const set = (v: T) => buttons.forEach((b, i) => b.setAttribute('aria-checked', String(items[i].id === v)));
  return { el: wrap, set };
}

export function toggle(id: string, label: string, value: boolean, onChange: (v: boolean) => void) {
  const input = h('input', { type: 'checkbox', id, role: 'switch' }) as HTMLInputElement;
  input.checked = value;
  input.addEventListener('change', () => onChange(input.checked));
  return h('label', { class: 'toggle', for: id }, input, h('span', { class: 'toggle-track', 'aria-hidden': 'true' }), h('span', {}, label));
}

let toastTimer = 0;
export function toast(message: string) {
  let el = document.getElementById('toast');
  if (!el) {
    el = h('div', { id: 'toast', class: 'toast', role: 'status', 'aria-live': 'polite' });
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el!.classList.remove('show'), 2600);
}

export interface Loading {
  show(label: string): void;
  progress(p: number): void;
  hide(): void;
}

export function loadingOverlay(): Loading {
  const el = document.getElementById('loading')!;
  const bar = el.querySelector('i') as HTMLElement;
  const text = el.querySelector('p') as HTMLElement;
  return {
    show(label) {
      text.textContent = label;
      bar.style.width = '4%';
      el.hidden = false;
    },
    progress(p) {
      bar.style.width = `${Math.round(4 + p * 96)}%`;
    },
    hide() {
      el.hidden = true;
    },
  };
}
