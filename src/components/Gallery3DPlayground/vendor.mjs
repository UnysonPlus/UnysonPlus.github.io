/*
 * Re-vendors the REAL Motion Gallery runtime (CSS + driver) from the plugin into gallery-engine.js.
 *
 *   node src/components/Gallery3DPlayground/vendor.mjs
 *
 * Run this whenever gallery-3d.css / gallery-3d.js changes in the plugin, so the playground keeps
 * running the actual module instead of a hand-copied fork that silently drifts.
 *
 * The only transform: the plugin ships an IIFE that auto-scans the page on DOMContentLoaded. Here we
 * strip that bootstrap and export initEl() / bumpGen() instead. bumpGen() + a shadowed
 * requestAnimationFrame let the playground kill the previous rAF loops when it rebuilds the scene
 * (the plugin's loops are designed to run for a page's lifetime and never stop).
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const PLUGIN = 'D:/Web Dev/unysonplus/framework/extensions/animation-engine/shortcodes/gallery-3d/static';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'gallery-engine.js');

const css = fs.readFileSync(path.join(PLUGIN, 'css/gallery-3d.css'), 'utf8');
let js = fs.readFileSync(path.join(PLUGIN, 'js/gallery-3d.js'), 'utf8');

// --- strip the IIFE head: everything before `function num(` (the reduced-motion probe AND the
// generation-guard shim, both of which we re-provide below) so they aren't declared twice. ---
const headAt = js.indexOf('function num(');
if (headAt < 0) throw new Error('vendor: could not find the body head (function num()');
const head = js.slice(0, headAt);
js = js.slice(headAt);

// Everything the stripped head declares (var / function) that the body still uses MUST be re-provided
// in the preamble below — otherwise the playground dies at runtime with "X is not defined" (this
// happened when the plugin added its Live Editor guard, IN_EDITOR, to the head). Checked after the
// preamble is assembled.
const headNames = [...new Set([...head.matchAll(/\b(?:var|function)\s+([A-Za-z_$][\w$]*)/g)].map((m) => m[1]))];

// --- strip the auto-scan bootstrap tail ---
const tailAt = js.indexOf('function scan()');
if (tailAt < 0) throw new Error('vendor: could not find the scan() bootstrap');
js = js.slice(0, tailAt).trimEnd();

const out = `/* eslint-disable */
/**
 * GENERATED — do not edit. Re-run: node src/components/Gallery3DPlayground/vendor.mjs
 *
 * The REAL Motion Gallery runtime (CSS + driver), vendored verbatim from the plugin
 * (framework/extensions/animation-engine/shortcodes/gallery-3d/static/). Only the auto-scan
 * bootstrap is replaced with the initEl() / bumpGen() exports below.
 */

export const GALLERY_CSS = ${JSON.stringify(css)};

// Reduced motion: the driver renders a static scene instead of animating.
var reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The playground rebuilds the scene on every option change, but the plugin's rAF loops never stop by
// design. Shadowing requestAnimationFrame here stamps each callback with the current generation, so
// bumpGen() lets every previous loop die instead of piling up.
var GEN = 0;
export function bumpGen() { GEN++; }

// Re-declare what the stripped plugin head defines and the body still uses. The playground never runs
// inside the Live Editor frame, so IN_EDITOR is always false; CUSTOM / dashed() back the child-theme
// design registry (unused here, but referenced by initCustom).
var IN_EDITOR = false;
var CUSTOM = {};
function dashed(key) { return String(key).replace(/_/g, '-'); }
function requestAnimationFrame(fn) {
  var g = GEN;
  return window.requestAnimationFrame(function (t) { if (g === GEN) { fn(t); } });
}

${js}

export function initEl(el) {
  if (el.classList.contains('tdg--carousel-ring')) { initRing(el); }
  else if (el.classList.contains('tdg--panorama-wall')) { initWall(el); }
  else if (el.classList.contains('tdg--card-sphere')) { initGlobe(el); }
  else if (el.classList.contains('tdg--orbit-globe')) { initOrbit(el); }
  else if (el.classList.contains('tdg--totem-wall')) { initTotem(el); }
  else if (el.classList.contains('tdg--parallax-totem')) { initParallax(el); }
  else if (el.classList.contains('tdg--card-tunnel')) { initTunnel(el); }
  else if (el.classList.contains('tdg--spiral-stream')) { initSpiral(el); }
  else if (el.classList.contains('tdg--depth-stack')) { initDepthStack(el); }
  else if (el.classList.contains('tdg--tilt-deck')) { initTiltDeck(el); }
  else if (el.classList.contains('tdg--iso-orbit')) { initIsoOrbit(el); }
  else if (el.classList.contains('tdg--iso-stack')) { initIsoStack(el); }
  else if (el.classList.contains('tdg--iso-cascade')) { initIsoCascade(el); }
  else if (el.classList.contains('tdg--iso-fan')) { initIsoFan(el); }
  else if (el.classList.contains('tdg--orbit-bloom')) { initOrbitBloom(el); }
  else if (el.classList.contains('tdg--focus-orbit')) { initFocusOrbit(el); }
  else if (el.classList.contains('tdg--dual-orbit')) { initDualOrbit(el); }
  else if (el.classList.contains('tdg--comet-orbit')) { initCometOrbit(el); }
  else if (el.classList.contains('tdg--orbit-swarm')) { initOrbitSwarm(el); }
  else if (el.classList.contains('tdg--ring-tilt')) { initRingTilt(el); }
  else if (el.classList.contains('tdg--gyro-orbit')) { initGyroOrbit(el); }
  else if (el.classList.contains('tdg--infinity-orbit')) { initInfinityOrbit(el); }
  else if (el.classList.contains('tdg--vortex')) { initVortex(el); }
  else if (el.classList.contains('tdg--pendulum-orbit')) { initPendulumOrbit(el); }
  else if (el.classList.contains('tdg--moon-orbit')) { initMoonOrbit(el); }
  else if (el.classList.contains('tdg--tiered-orbit')) { initTieredOrbit(el); }
  else if (el.classList.contains('tdg--wave-grid')) { initWaveGrid(el); }
  else if (el.classList.contains('tdg--flip-grid')) { initFlipGrid(el); }
  else if (el.classList.contains('tdg--magnet-grid')) { initMagnetGrid(el); }
  else if (el.classList.contains('tdg--blind-reveal')) { initBlindReveal(el); }
  else if (el.classList.contains('tdg--iris-wipe')) { initIrisWipe(el); }
  else if (el.classList.contains('tdg--tile-dissolve')) { initTileDissolve(el); }
  else if (el.classList.contains('tdg--spotlight-wall')) { initSpotlightWall(el); }
  else if (el.classList.contains('tdg--focus-pull')) { initFocusPull(el); }
  else if (el.classList.contains('tdg--loupe')) { initLoupe(el); }
  else if (el.classList.contains('tdg--card-fan')) { initCardFan(el); }
  else if (el.classList.contains('tdg--shuffle-deck')) { initShuffleDeck(el); }
  else if (el.classList.contains('tdg--polaroid-drop')) { initPolaroidDrop(el); }
  else if (el.classList.contains('tdg--card-reel')) { initReel(el); }
  else if (el.classList.contains('tdg--film-strip')) { initReel(el); }
  else if (el.classList.contains('tdg--wheel-carousel')) { initWheel(el); }
  else if (el.classList.contains('tdg--cover-flow') || el.classList.contains('tdg--carousel-flow')) { initFlow(el); }
  else if (el.classList.contains('tdg--hero-reel')) { initHeroReel(el); }
  else if (el.classList.contains('tdg--focus-slider')) { initFocusSlider(el); }
  else if (el.classList.contains('tdg--mosaic-marquee')) { initMosaic(el); }
}
`;

// Guard: a name the stripped head declared, still used by the body, with no declaration in the preamble.
const preamble = out.slice(0, out.indexOf(js));
const missing = headNames.filter((n) => new RegExp('\\b' + n.replace(/\$/g, '\\$') + '\\b').test(js)
  && !new RegExp('\\b(?:var|function)\\s+' + n.replace(/\$/g, '\\$') + '\\b').test(preamble));
if (missing.length) {
  throw new Error('vendor: the plugin head declares ' + missing.join(', ') + ' and the body uses it, but the preamble does not re-provide it. Add it to the preamble in vendor.mjs.');
}

fs.writeFileSync(OUT, out);
console.log('wrote gallery-engine.js —', out.length, 'bytes');
