// Light/dark follows the viewer: an explicit data-theme on <html> wins, otherwise the
// OS preference. The 3D scene switches to night and the 2.5D stage to evening in dark.

const media = window.matchMedia('(prefers-color-scheme: dark)');

export function isDark(): boolean {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return media.matches;
}

export function onThemeChange(cb: (dark: boolean) => void): () => void {
  const fire = () => cb(isDark());
  media.addEventListener('change', fire);
  const mo = new MutationObserver(fire);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    media.removeEventListener('change', fire);
    mo.disconnect();
  };
}
