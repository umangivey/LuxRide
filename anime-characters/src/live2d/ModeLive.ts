import type { Loading } from '../ui';

export class ModeLive {
  constructor(private stage: HTMLElement, private panel: HTMLElement, private hud: HTMLElement, private loading: Loading) {}
  async mount() {
    void this.stage;
    void this.panel;
    void this.hud;
    void this.loading;
  }
  unmount() {}
}
