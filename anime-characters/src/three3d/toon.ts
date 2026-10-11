// Cel shading for the 3D characters and world.
//
// Colors are authored as sRGB hex; three's color management converts them, so the lit
// tone on screen matches the hex value. Each material has a lit color and a shade
// color (hue-shifted, see shared/color.ts) with a soft-edged two-tone ramp, a rim light,
// an optional "angel ring" hair highlight, and an inverted-hull outline.
//
// Hair and skirts bend in the vertex shader: `aSway` (0 at the root, 1 at the tip) scales
// a displacement vector driven by spring physics on the CPU.

import * as THREE from 'three';
import { hairShade, lineOf, shadeOf } from '../shared/color';


export const sceneUniforms = {
  uLightDir: { value: new THREE.Vector3(0.45, 0.85, 0.6).normalize() },
  uLightColor: { value: new THREE.Color(1, 1, 1) },
  uShadeTint: { value: new THREE.Color(1, 1, 1) },
  uRimTint: { value: new THREE.Color(1, 1, 1) },
  uTime: { value: 0 },
  uOutlineScale: { value: 1 },
};

const deformChunk = /* glsl */ `
  uniform vec3 uSway;
  uniform vec4 uLegs;
  attribute float aSway;
  vec3 deform(vec3 p) {
  #ifdef USE_SWAY
    p += uSway * (aSway * aSway);
  #endif
  #ifdef USE_SKIRT
    // Thighs push the hem where they swing into it, so legs do not poke through.
    float sideL = smoothstep(-0.03, 0.05, p.x);
    float fwd = uLegs.x * sideL + uLegs.y * (1.0 - sideL);
    float front = smoothstep(-0.03, 0.06, p.z);
    float back = 1.0 - smoothstep(-0.06, 0.03, p.z);
    float w = aSway * aSway;
    p.z += (max(fwd, 0.0) * front - max(-fwd, 0.0) * back) * w * 0.16;
    p.y += abs(fwd) * w * 0.05 * (front + back);
    // Lift the whole hem a little while jumping or running.
    p.xz *= 1.0 + uLegs.z * w * 0.25;
    p.y += uLegs.z * w * 0.03;
  #endif
    return p;
  }
`;

const toonVertex = /* glsl */ `
  ${deformChunk}
  varying vec3 vNormalV;
  varying vec3 vPosV;
  varying vec2 vUv;
  void main() {
    vec3 p = deform(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vPosV = mv.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * mv;
  }
`;

const toonFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uShade;
  uniform vec3 uLightDir;
  uniform vec3 uLightColor;
  uniform vec3 uShadeTint;
  uniform vec3 uRimTint;
  uniform float uThreshold;
  uniform float uSoft;
  uniform float uRim;
  uniform float uRing;
  uniform vec3 uRingColor;
  uniform vec3 uEmissive;
  uniform float uOpacity;
  uniform vec3 uTipColor;
  uniform vec3 uTipShade;
  #ifdef USE_MAP
    uniform sampler2D uMap;
  #endif
  varying vec3 vNormalV;
  varying vec3 vPosV;
  varying vec2 vUv;
  void main() {
    vec3 N = normalize(vNormalV);
    if (!gl_FrontFacing) N = -N;
    vec3 L = normalize((viewMatrix * vec4(uLightDir, 0.0)).xyz);
    vec3 V = normalize(-vPosV);
    float ndl = dot(N, L) * 0.5 + 0.5;
    float lit = smoothstep(uThreshold - uSoft, uThreshold + uSoft, ndl);
    vec3 base = uColor;
    vec3 shade = uShade;
    float alpha = uOpacity;
    #ifdef USE_MAP
      vec4 tex = texture2D(uMap, vUv);
      base *= tex.rgb;
      shade *= tex.rgb;
      alpha *= tex.a;
    #endif
    #ifdef USE_HAIR
      float along = smoothstep(0.12, 1.0, vUv.y);
      base = mix(base, uTipColor, along);
      shade = mix(shade, uTipShade, along);
      float streak = smoothstep(0.55, 1.0, 0.5 + 0.5 * sin(vUv.x * 43.98 + vUv.y * 2.0));
      base *= 1.0 - 0.07 * streak;
      shade *= 1.0 - 0.1 * streak;
    #endif
    vec3 col = mix(shade * uShadeTint, base * uLightColor, lit);
    float facing = clamp(dot(N, V), 0.0, 1.0);
    float rim = smoothstep(0.62, 0.9, 1.0 - facing);
    col += uRimTint * rim * uRim * (0.35 + 0.65 * lit);
    #ifdef USE_RING
      // Anime "angel ring": a jagged highlight band across the upper hair.
      float ang = atan(N.x, N.z);
      float band = N.y - 0.5;
      float edge = 0.07 + 0.03 * sin(vUv.x * 31.4 + ang * 5.0) + 0.015 * sin(ang * 37.0);
      float ring = (1.0 - smoothstep(edge - 0.03, edge, abs(band))) * smoothstep(0.25, 0.6, facing);
      col = mix(col, uRingColor * mix(uShadeTint, uLightColor, lit), ring * uRing);
    #endif
    col += uEmissive;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const outlineVertex = /* glsl */ `
  ${deformChunk}
  uniform float uWidth;
  uniform float uOutlineScale;
  void main() {
    vec3 p = deform(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    float dist = clamp(-mv.z, 0.8, 12.0);
    mv.xy += normalize(n.xy + 1e-5) * length(n.xy) * uWidth * uOutlineScale * dist;
    mv.z -= 0.0005 * dist;
    gl_Position = projectionMatrix * mv;
  }
`;

const outlineFragment = /* glsl */ `
  uniform vec3 uOutlineColor;
  void main() {
    gl_FragColor = vec4(uOutlineColor, 1.0);
    #include <colorspace_fragment>
  }
`;

export interface ToonOptions {
  color: string;
  shade?: string;
  map?: THREE.Texture;
  rim?: number;
  ring?: number;
  ringColor?: string;
  threshold?: number;
  soft?: number;
  sway?: { value: THREE.Vector3 };
  skirt?: { value: THREE.Vector4 };
  side?: THREE.Side;
  outline?: number | false;
  outlineColor?: string;
  emissive?: string;
  /** Hair: color the strands fade to at their tips. */
  hairTip?: string;
  opacity?: number;
  transparent?: boolean;
  /** Role used to recolor parts from the customization panel. */
  role?: string;
}

export interface ToonMaterial extends THREE.ShaderMaterial {
  userData: { role?: string; textured: boolean; baseHex: string; outline?: THREE.ShaderMaterial };
}

const zeroSway = () => ({ value: new THREE.Vector3() });
const zeroLegs = () => ({ value: new THREE.Vector4() });

export function makeToon(o: ToonOptions): ToonMaterial {
  const defines: Record<string, string> = {};
  if (o.map) defines.USE_MAP = '';
  if (o.sway) defines.USE_SWAY = '';
  if (o.skirt) defines.USE_SKIRT = '';
  if (o.ring) defines.USE_RING = '';
  if (o.hairTip) defines.USE_HAIR = '';
  const textured = !!o.map;
  const shade = o.shade ?? (textured ? '#C9BEDA' : shadeOf(o.color));
  const m = new THREE.ShaderMaterial({
    vertexShader: toonVertex,
    fragmentShader: toonFragment,
    defines,
    side: o.side ?? THREE.FrontSide,
    transparent: o.transparent ?? false,
    uniforms: {
      uLightDir: sceneUniforms.uLightDir,
      uLightColor: sceneUniforms.uLightColor,
      uShadeTint: sceneUniforms.uShadeTint,
      uRimTint: sceneUniforms.uRimTint,
      uColor: { value: new THREE.Color(textured ? '#ffffff' : o.color) },
      uShade: { value: new THREE.Color(shade) },
      uThreshold: { value: o.threshold ?? 0.5 },
      uSoft: { value: o.soft ?? 0.03 },
      uRim: { value: o.rim ?? 0.12 },
      uRing: { value: o.ring ?? 0 },
      uRingColor: { value: new THREE.Color(o.ringColor ?? '#ffffff') },
      uEmissive: { value: new THREE.Color(o.emissive ?? '#000000') },
      uTipColor: { value: new THREE.Color(o.hairTip ?? '#ffffff') },
      uTipShade: { value: new THREE.Color(o.hairTip ? hairShade(o.hairTip) : '#ffffff') },
      uOpacity: { value: o.opacity ?? 1 },
      uMap: { value: o.map ?? null },
      uSway: o.sway ?? zeroSway(),
      uLegs: o.skirt ?? zeroLegs(),
    },
  }) as ToonMaterial;
  m.userData = { role: o.role, textured, baseHex: o.color };
  return m;
}

export function makeOutline(o: ToonOptions): THREE.ShaderMaterial {
  const defines: Record<string, string> = {};
  if (o.sway) defines.USE_SWAY = '';
  if (o.skirt) defines.USE_SKIRT = '';
  return new THREE.ShaderMaterial({
    vertexShader: outlineVertex,
    fragmentShader: outlineFragment,
    defines,
    side: THREE.BackSide,
    uniforms: {
      uWidth: { value: typeof o.outline === 'number' ? o.outline : 0.0022 },
      uOutlineScale: sceneUniforms.uOutlineScale,
      uOutlineColor: { value: new THREE.Color(o.outlineColor ?? lineOf(o.color)) },
      uSway: o.sway ?? zeroSway(),
      uLegs: o.skirt ?? zeroLegs(),
    },
  });
}

/** A cel-shaded mesh with its outline hull as a child. */
export function toonMesh(geometry: THREE.BufferGeometry, o: ToonOptions): THREE.Mesh {
  const mat = makeToon(o);
  const mesh = new THREE.Mesh(geometry, mat);
  if (o.outline !== false) {
    const om = makeOutline(o);
    const outline = new THREE.Mesh(geometry, om);
    outline.userData.isOutline = true;
    outline.renderOrder = -1;
    mesh.add(outline);
    mat.userData.outline = om;
  }
  return mesh;
}

/** Recolor a toon material (and its outline) from a base hex color. */
export function setToonColor(m: ToonMaterial, hex: string, outlineHex?: string) {
  m.userData.baseHex = hex;
  if (!m.userData.textured) {
    (m.uniforms.uColor.value as THREE.Color).set(hex);
    (m.uniforms.uShade.value as THREE.Color).set(shadeOf(hex));
  }
  if (m.userData.outline) (m.userData.outline.uniforms.uOutlineColor.value as THREE.Color).set(outlineHex ?? lineOf(hex));
}
