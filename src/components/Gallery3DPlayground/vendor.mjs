/*
 * Re-vendors the REAL 3D Gallery runtime (CSS + driver) from the plugin into gallery-engine.js.
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
js = js.slice(headAt);

// --- strip the auto-scan bootstrap tail ---
const tailAt = js.indexOf('function scan()');
if (tailAt < 0) throw new Error('vendor: could not find the scan() bootstrap');
js = js.slice(0, tailAt).trimEnd();

const out = `/* eslint-disable */
/**
 * GENERATED — do not edit. Re-run: node src/components/Gallery3DPlayground/vendor.mjs
 *
 * The REAL 3D Gallery runtime (CSS + driver), vendored verbatim from the plugin
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
}
`;

fs.writeFileSync(OUT, out);
console.log('wrote gallery-engine.js —', out.length, 'bytes');
