import { h, type Loading } from '../ui';

// Placeholder until the Live2D stage (Hiyori and Natori) is built.
export class ModeLive {
  constructor(private stage: HTMLElement, private panel: HTMLElement, private hud: HTMLElement, private loading: Loading) {}
  async mount() {
    this.loading.hide();
    this.stage.append(h('div', { class: 'error' }, '2.5D Live is being built next: Live2D characters Hiyori and Natori with cursor tracking, expressions and lip sync.'));
    this.panel.replaceChildren(h('p', { class: 'credits' }, 'Switch to 3D World to play with Hana and Ren.'));
    this.hud.replaceChildren();
  }
  unmount() {
    this.stage.replaceChildren();
    this.panel.replaceChildren();
  }
}
