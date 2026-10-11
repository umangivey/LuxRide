// Small color helpers used by both renderers. Anime cel shading never just darkens a
// color: shadows shift hue toward red/violet and gain saturation, so we derive the
// shade and line colors from a base color instead of hard-coding them.

export interface HSL { h: number; s: number; l: number }

export function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map((c) => c + c).join('') : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (x: number) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function hexToHsl(hex: string): HSL {
  const [r, g, b] = hexToRgb(hex).map((x) => x / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslToHex({ h, s, l }: HSL): string {
  h = ((h % 360) + 360) % 360 / 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return rgbToHex(hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255);
}

/** Rotate a hue toward 300deg (violet) by up to `amount` degrees, whichever way is shorter. */
function hueTowardViolet(h: number, amount: number): number {
  const target = 300;
  let d = target - h;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return h + Math.sign(d) * Math.min(Math.abs(d), amount);
}

/** Cel-shadow tone for a base color. */
export function shadeOf(hex: string, depth = 1): string {
  const c = hexToHsl(hex);
  return hslToHex({
    h: hueTowardViolet(c.h, 12 * depth),
    s: Math.min(1, c.s * (1 + 0.04 * depth) + 0.02 * depth),
    l: c.l * (1 - 0.17 * depth),
  });
}

/** Hair shadow: deeper and slightly cooler, but less saturated than shadeOf so bright
 * hair colors (pink, mint) do not turn neon in shadow. */
export function hairShade(hex: string): string {
  const c = hexToHsl(hex);
  return hslToHex({ h: hueTowardViolet(c.h, 10), s: c.s * 0.82, l: c.l * 0.84 });
}

/** Lighter, warmer color toward the hair tips (VRoid-style root-to-tip gradient). */
export function hairTip(hex: string): string {
  const c = hexToHsl(hex);
  return hslToHex({ h: c.h - 8, s: Math.min(1, c.s * 1.05), l: c.l + (1 - c.l) * (c.l < 0.35 ? 0.22 : 0.18) });
}

/** Line-art color: a much darker, saturated version of the fill (anime "colored lines"). */
export function lineOf(hex: string): string {
  const c = hexToHsl(hex);
  return hslToHex({ h: hueTowardViolet(c.h, 20), s: Math.min(1, c.s * 0.9 + 0.15), l: Math.max(0.08, c.l * 0.38) });
}

export function lighten(hex: string, amount: number): string {
  const c = hexToHsl(hex);
  return hslToHex({ h: c.h, s: c.s, l: c.l + (1 - c.l) * amount });
}

export function darken(hex: string, amount: number): string {
  const c = hexToHsl(hex);
  return hslToHex({ h: c.h, s: c.s, l: c.l * (1 - amount) });
}

export function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex(ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t);
}

export function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
