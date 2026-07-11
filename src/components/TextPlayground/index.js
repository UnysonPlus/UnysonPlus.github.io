import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Text Effects module.
 *
 * Ports the module's real runtime: the shared split engine (chars/words/lines)
 * and reveal presets from static/js/effects/_reveal.js, the per-effect drivers
 * from static/js/effects/*.js, and the exact stylesheet from static/css. Each
 * effect uses the real `.sc-text--*` / `.upw-text-*` classes and CSS variables
 * (from text-effects-render.php), so the demo matches the plugin. Play-once
 * effects run on mount / Replay; hover effects trigger on hover of the demo.
 */

const SAMPLE_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='160'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0' stop-color='#ff6b6b'/><stop offset='.5' stop-color='#f7b733'/><stop offset='1' stop-color='#4a90e2'/></linearGradient></defs>
<rect width='400' height='160' fill='url(#g)'/>
<circle cx='90' cy='60' r='55' fill='#ffffff' opacity='.35'/>
<circle cx='320' cy='110' r='70' fill='#2d2f7a' opacity='.45'/></svg>`,
  );

/* ------------------------------------------------------------------ *
 * Shared split engine (ported from text-effects-core.js + _reveal.js)
 * ------------------------------------------------------------------ */
function piece(txt) {
  const s = document.createElement('span');
  s.className = 'upw-text-piece';
  s.textContent = txt;
  return s;
}
function wrapPieces(target, mode) {
  const text = target.textContent, frag = document.createDocumentFragment(), out = [];
  target.textContent = '';
  if (mode === 'words') {
    text.split(/(\s+)/).forEach((part) => {
      if (part === '') return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
      const w = piece(part); frag.appendChild(w); out.push(w);
    });
  } else {
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
      const c = piece(text[i]); frag.appendChild(c); out.push(c);
    }
  }
  target.appendChild(frag);
  return out;
}
function wrapLines(target) {
  const words = wrapPieces(target, 'words');
  if (!words.length) return [];
  words.forEach((w) => (w._top = w.offsetTop));
  const nodes = Array.prototype.slice.call(target.childNodes);
  const lines = []; let cur = [], top = null;
  nodes.forEach((n) => {
    if (n.nodeType === 1 && n.classList && n.classList.contains('upw-text-piece')) {
      if (top === null) top = n._top;
      if (Math.abs(n._top - top) > 2) { lines.push(cur); cur = []; top = n._top; }
    }
    cur.push(n);
  });
  if (cur.length) lines.push(cur);
  return lines.map((line) => {
    const span = document.createElement('span');
    span.className = 'upw-text-line';
    line.forEach((n) => span.appendChild(n));
    target.appendChild(span);
    return span;
  });
}
const translateFrom = (dir, amt = '0.85em') =>
  dir === 'left' ? `translateX(-${amt})` : dir === 'right' ? `translateX(${amt})`
    : dir === 'down' ? `translateY(-${amt})` : `translateY(${amt})`;
const REVEAL = {
  split_reveal: (d) => ({tf: translateFrom(d || 'up'), ease: 'cubic-bezier(.2,.7,.2,1)'}),
  blur: () => ({tf: 'translateY(.3em)', filter: 'blur(8px)', ease: 'ease-out'}),
  flip3d: () => ({tf: 'perspective(500px) rotateX(-90deg)', origin: 'center bottom', ease: 'cubic-bezier(.2,.7,.2,1)'}),
  scale: () => ({tf: 'scale(.3)', ease: 'cubic-bezier(.34,1.56,.64,1)'}),
  slide: (d) => ({tf: translateFrom(d || 'left', '1.2em'), ease: 'cubic-bezier(.2,.7,.2,1)'}),
  bounce: () => ({tf: 'translateY(.9em)', ease: 'cubic-bezier(.28,1.6,.5,1)'}),
  random: () => ({tf: 'scale(.5) translateY(.3em)', ease: 'ease-out', shuffle: true}),
  skew: () => ({tf: 'skewY(7deg) translateY(.5em)', ease: 'cubic-bezier(.2,.7,.2,1)'}),
};
function playReveal(target, kind, s) {
  const mode = s.split_by || 'chars';
  const stagger = Number(s.stagger) || 0.03, dur = Number(s.duration) || 0.6;
  if (kind === 'mask') return playMask(target, mode, stagger, dur);
  const pieces = mode === 'lines' ? wrapLines(target) : wrapPieces(target, mode);
  if (!pieces.length) return;
  if (mode === 'lines') target.classList.add('upw-text-lines');
  const preset = REVEAL[kind](s.direction || '');
  const order = pieces.map((_, i) => i);
  if (preset.shuffle) for (let i = order.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [order[i], order[j]] = [order[j], order[i]]; }
  pieces.forEach((p, i) => {
    p.style.opacity = '0'; p.style.transform = preset.tf;
    if (preset.filter) p.style.filter = preset.filter;
    if (preset.origin) p.style.transformOrigin = preset.origin;
    p.style.transition = `opacity ${dur}s ease, transform ${dur}s ${preset.ease}${preset.filter ? `, filter ${dur}s ease` : ''}`;
    p.style.transitionDelay = `${order[i] * stagger}s`;
    p.style.willChange = 'opacity, transform';
  });
  requestAnimationFrame(() => requestAnimationFrame(() => pieces.forEach((p) => {
    p.style.opacity = '1'; p.style.transform = 'none'; if (preset.filter) p.style.filter = 'none';
  })));
}
function playMask(target, mode, stagger, dur) {
  const pieces = mode === 'lines' ? wrapLines(target) : wrapPieces(target, mode);
  if (!pieces.length) return;
  const inners = pieces.map((p) => {
    const inner = document.createElement('span'); inner.className = 'upw-text-inner';
    while (p.firstChild) inner.appendChild(p.firstChild);
    p.appendChild(inner);
    p.style.overflow = 'hidden';
    p.style.display = mode === 'lines' ? 'block' : 'inline-block';
    inner.style.display = 'inline-block';
    inner.style.transform = 'translateY(110%)';
    inner.style.transition = `transform ${dur}s cubic-bezier(.5,0,.1,1)`;
    return inner;
  });
  pieces.forEach((p, i) => (inners[i].style.transitionDelay = `${i * stagger}s`));
  requestAnimationFrame(() => requestAnimationFrame(() => inners.forEach((n) => (n.style.transform = 'translateY(0)'))));
}
const GLYPH = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789ABCDEF';
const FLAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/* ------------------------------------------------------------------ *
 * Effect registry
 * ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val) => ({id, label, type: 'slider', min, max, step, default: val});
const sel = (id, label, val, choices) => ({id, label, type: 'select', default: val, choices});
const col = (id, label, val) => ({id, label, type: 'color', default: val});
const sw = (id, label, val) => ({id, label, type: 'switch', on: 'yes', off: 'no', default: val});
const trigViewLoad = sel('trigger', 'Trigger', 'view', [['view', 'When scrolled into view'], ['load', 'On page load']]);
const trigHoverView = sel('trigger', 'Trigger', 'hover', [['hover', 'On hover'], ['view', 'When scrolled into view']]);
const revealCtl = (split, dir) => [
  sel('split_by', 'Split by', split, [['chars', 'Characters'], ['words', 'Words'], ['lines', 'Lines']]),
  ...(dir ? [sel('direction', 'From', 'left', [['left', 'Left'], ['right', 'Right'], ['up', 'Below'], ['down', 'Above']])] : []),
  sl('stagger', 'Stagger (s)', 0.005, 0.12, 0.005, 0.03),
  sl('duration', 'Duration (s)', 0.2, 1.6, 0.1, 0.6),
  trigViewLoad,
];

// helper drivers
const reveal = (kind) => (wrap, target, s) => { playReveal(target, kind, s); };
const addClass = (cls) => (wrap, target) => { target.classList.add(cls); };
const addClassView = (cls) => (wrap, target, s) => {
  target.classList.add(cls);
  if (s.trigger === 'view') requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-on')));
};
const perChar = (cls) => (wrap, target, s) => {
  target.classList.add(cls === 'upw-text-cwave-ch' ? 'upw-text-cwave' : cls + '-host');
  const pieces = wrapPieces(target, 'chars');
  pieces.forEach((p, i) => { p.classList.add(cls); p.style.setProperty('--i', i); });
  if (s.trigger === 'view') requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-on')));
};

const EFFECTS = {
  // -------- Reveal --------
  split_reveal: {label: 'Split Reveal', text: 'Bring your text to life',
    controls: [sel('split_by', 'Split by', 'words', [['chars', 'Characters'], ['words', 'Words'], ['lines', 'Lines']]),
      sel('direction', 'Rise from', 'up', [['up', 'Below'], ['down', 'Above'], ['left', 'Left'], ['right', 'Right']]),
      sl('stagger', 'Stagger (s)', 0.005, 0.12, 0.005, 0.03), sl('duration', 'Duration (s)', 0.2, 1.6, 0.1, 0.6), trigViewLoad],
    apply: reveal('split_reveal'), replay: true},
  blur: {label: 'Blur Reveal', controls: revealCtl('chars'), apply: reveal('blur'), replay: true},
  mask: {label: 'Mask Reveal', text: 'Reveal from behind a mask', controls: revealCtl('lines'), apply: reveal('mask'), replay: true},
  flip3d: {label: 'Flip 3D', controls: revealCtl('chars'), apply: reveal('flip3d'), replay: true},
  scale: {label: 'Scale Pop', controls: revealCtl('chars'), apply: reveal('scale'), replay: true},
  slide: {label: 'Slide', controls: revealCtl('words', true), apply: reveal('slide'), replay: true},
  bounce: {label: 'Bounce In', controls: revealCtl('chars'), apply: reveal('bounce'), replay: true},
  random: {label: 'Random Order', controls: revealCtl('chars'), apply: reveal('random'), replay: true},
  skew: {label: 'Skew Reveal', controls: revealCtl('words'), apply: reveal('skew'), replay: true},

  // -------- Kinetic (JS) --------
  scramble: {label: 'Scramble', text: 'DECODE THIS', controls: [sl('duration', 'Duration (s)', 0.4, 3, 0.1, 1.2), trigViewLoad], replay: true,
    apply: (wrap, target, s) => {
      const dur = (Number(s.duration) || 1.2) * 1000, final = target.textContent, len = final.length;
      const CH = '!<>-_\\/[]{}—=+*^?#abcdef0123456789'; let cancelled = false, start = null;
      const frame = (t) => { if (cancelled) return; if (!start) start = t; const p = Math.min(1, (t - start) / dur), rev = Math.floor(p * len);
        let out = ''; for (let i = 0; i < len; i++) out += final[i] === ' ' ? ' ' : i < rev ? final[i] : CH[(Math.random() * CH.length) | 0];
        target.textContent = out; if (p < 1) requestAnimationFrame(frame); else target.textContent = final; };
      requestAnimationFrame(frame); return () => (cancelled = true);
    }},
  typewriter: {label: 'Typewriter', text: 'You can type anything.', replay: true,
    controls: [sl('speed', 'Speed (ms/char)', 15, 200, 5, 55), sw('caret', 'Caret', 'yes'), sw('loop', 'Loop', 'no'), trigViewLoad],
    apply: (wrap, target, s) => {
      const speed = Number(s.speed) || 55, caret = s.caret !== 'no', loop = s.loop === 'yes';
      const full = target.textContent; target.textContent = ''; if (caret) target.classList.add('upw-text-caret');
      let timer = null, cancelled = false;
      const type = (cb) => { let i = 0; (function st() { if (cancelled) return; target.textContent = full.slice(0, i); if (i++ < full.length) timer = setTimeout(st, speed); else cb && cb(); })(); };
      const erase = (cb) => { let i = full.length; (function st() { if (cancelled) return; target.textContent = full.slice(0, i); if (i-- > 0) timer = setTimeout(st, speed / 1.7); else cb && cb(); })(); };
      const cycle = () => type(() => { if (loop) timer = setTimeout(() => erase(() => (timer = setTimeout(cycle, 350))), 1400); else if (caret) target.classList.add('upw-text-caret-done'); });
      cycle(); return () => { cancelled = true; clearTimeout(timer); };
    }},
  countup: {label: 'Count Up', text: '$12,480+', controls: [sl('duration', 'Duration (s)', 0.5, 5, 0.1, 1.6), trigViewLoad], replay: true,
    apply: (wrap, target, s) => {
      const raw = target.textContent.trim(), m = raw.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/); if (!m) return;
      const pre = m[1], numStr = m[2], suf = m[3], decimals = (numStr.split('.')[1] || '').length, hasComma = numStr.indexOf(',') >= 0;
      const goal = parseFloat(numStr.replace(/,/g, '')); if (isNaN(goal)) return;
      const dur = (Number(s.duration) || 1.6) * 1000;
      const fmt = (n) => { let str = decimals ? n.toFixed(decimals) : Math.round(n).toString(); if (hasComma) { const pp = str.split('.'); pp[0] = pp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); str = pp.join('.'); } return pre + str + suf; };
      target.textContent = fmt(0); let cancelled = false, start = null;
      const f = (t) => { if (cancelled) return; if (!start) start = t; const p = Math.min(1, (t - start) / dur); target.textContent = fmt(goal * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); else target.textContent = fmt(goal); };
      requestAnimationFrame(f); return () => (cancelled = true);
    }},
  splitflap: {label: 'Split-Flap', text: 'DEPARTURES', controls: [sl('duration', 'Duration (s)', 0.4, 3, 0.1, 1.4), trigViewLoad], replay: true,
    apply: (wrap, target) => {
      const pieces = wrapPieces(target, 'chars'); const timers = [];
      pieces.forEach((p, idx) => { const fin = p.textContent, total = 8 + idx * 2; let k = 0;
        const iv = setInterval(() => { k++; if (k >= total) { clearInterval(iv); p.textContent = fin; } else p.textContent = FLAP[(Math.random() * FLAP.length) | 0]; }, 45); timers.push(iv); });
      return () => timers.forEach(clearInterval);
    }},
  matrix: {label: 'Matrix Decode', text: 'DECODE', controls: [sl('duration', 'Duration (s)', 0.6, 3, 0.1, 1.4), trigViewLoad], replay: true,
    apply: (wrap, target, s) => {
      const pieces = wrapPieces(target, 'chars'), dur = (Number(s.duration) || 1.4) * 1000;
      pieces.forEach((p) => p.setAttribute('data-f', p.textContent));
      let cancelled = false, start = null; const len = pieces.length;
      pieces.forEach((p) => p.classList.add('upw-text-matrix'));
      const f = (t) => { if (cancelled) return; if (!start) start = t; const p = Math.min(1, (t - start) / dur), rev = Math.floor(p * len);
        for (let j = 0; j < len; j++) { if (j < rev) { pieces[j].textContent = pieces[j].getAttribute('data-f'); pieces[j].classList.remove('upw-text-matrix'); } else pieces[j].textContent = GLYPH[(Math.random() * GLYPH.length) | 0]; }
        if (p < 1) requestAnimationFrame(f); else pieces.forEach((pp) => { pp.textContent = pp.getAttribute('data-f'); pp.classList.remove('upw-text-matrix'); }); };
      requestAnimationFrame(f); return () => (cancelled = true);
    }},
  rotating_words: {label: 'Rotating Words', text: 'designer',
    controls: [{id: 'words', label: 'Words', type: 'text', default: 'developer, dreamer'}, sl('interval', 'Interval (s)', 0.6, 5, 0.2, 1.8)],
    apply: (wrap, target, s) => {
      const extra = (s.words || '').split(',').map((x) => x.trim()).filter(Boolean);
      const list = [target.textContent.trim()].concat(extra); if (list.length < 2) return;
      const interval = (Number(s.interval) || 1.8) * 1000; let i = 0;
      target.style.display = 'inline-block'; target.style.transition = 'opacity .3s ease, transform .3s ease';
      const iv = setInterval(() => { target.style.opacity = '0'; target.style.transform = 'translateY(-.25em)';
        setTimeout(() => { i = (i + 1) % list.length; target.textContent = list[i]; target.style.transform = 'translateY(.25em)';
          requestAnimationFrame(() => { target.style.opacity = '1'; target.style.transform = 'none'; }); }, 300); }, interval);
      return () => clearInterval(iv);
    }},
  magnetic: {label: 'Magnetic', text: 'Follow the cursor', controls: [sl('strength', 'Strength', 0.1, 1, 0.05, 0.4)],
    apply: (wrap, target, s) => {
      const pieces = wrapPieces(target, 'chars'), strength = Number(s.strength) || 0.4;
      pieces.forEach((p) => { p.style.transition = 'transform .2s ease-out'; p.style.willChange = 'transform'; });
      const move = (e) => pieces.forEach((p) => { const r = p.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy);
        if (d < 60) { p.style.transform = `translate(${dx * strength}px,${dy * strength}px)`; } else p.style.transform = 'none'; });
      const leave = () => pieces.forEach((p) => (p.style.transform = 'none'));
      wrap.addEventListener('pointermove', move); wrap.addEventListener('pointerleave', leave);
      return () => { wrap.removeEventListener('pointermove', move); wrap.removeEventListener('pointerleave', leave); };
    }},

  // -------- Continuous (CSS) --------
  shimmer: {label: 'Shimmer', controls: [col('color_a', 'Base color', '#8a8f98'), col('color_b', 'Sheen color', '#ffffff'), sl('speed', 'Speed (s)', 1, 6, 0.5, 3)],
    vars: (s) => ({'--text-c1': s.color_a, '--text-c2': s.color_b, '--text-speed': `${s.speed}s`}), apply: addClass('upw-text-shimmer')},
  gradient_flow: {label: 'Gradient Flow', controls: [col('color_a', 'Color 1', '#ff6b6b'), col('color_b', 'Color 2', '#6a8dff'), col('color_c', 'Color 3', '#17c964'), sl('speed', 'Speed (s)', 1, 8, 0.5, 4)],
    vars: (s) => ({'--text-c1': s.color_a, '--text-c2': s.color_b, '--text-c3': s.color_c, '--text-speed': `${s.speed}s`}), apply: addClass('upw-text-gradflow')},
  rainbow: {label: 'Rainbow', controls: [sl('speed', 'Speed (s)', 1, 8, 0.5, 4)], vars: (s) => ({'--text-speed': `${s.speed}s`}), apply: addClass('upw-text-rainbow')},
  neon: {label: 'Neon Flicker', controls: [col('glow_color', 'Glow color', '#6aa6ff'), sl('speed', 'Flicker speed (s)', 1, 5, 0.5, 2.5)],
    vars: (s) => ({'--text-neon': s.glow_color, '--text-speed': `${s.speed}s`}), apply: addClass('upw-text-neon')},
  breathing: {label: 'Breathing', controls: [sl('speed', 'Speed (s)', 1.5, 6, 0.5, 3)], vars: (s) => ({'--text-speed': `${s.speed}s`}), apply: addClass('upw-text-breathing')},
  float: {label: 'Float', controls: [sl('distance', 'Distance (px)', 3, 24, 1, 8), sl('speed', 'Speed (s)', 1.5, 6, 0.5, 3)],
    vars: (s) => ({'--text-float': `${s.distance}px`, '--text-speed': `${s.speed}s`}), apply: addClass('upw-text-float')},
  wave: {label: 'Wave', controls: [sl('amplitude', 'Amplitude (px)', 2, 16, 1, 6), sl('speed', 'Speed (s)', 0.5, 3, 0.1, 1.4)],
    vars: (s) => ({'--text-wave-amp': `${s.amplitude}px`, '--text-wave-speed': `${s.speed}s`}),
    apply: (wrap, target) => { const pieces = wrapPieces(target, 'chars'); pieces.forEach((p, i) => { p.classList.add('upw-text-wave-ch'); p.style.animationDelay = `${i * 0.06}s`; }); }},
  jitter: {label: 'Jitter', controls: [sl('intensity', 'Intensity (px)', 1, 6, 1, 2)], vars: (s) => ({'--text-jitter': `${s.intensity}px`}), apply: addClass('upw-text-jitter')},
  chromatic: {label: 'Chromatic', controls: [sl('intensity', 'Offset (px)', 1, 6, 1, 2)], vars: (s) => ({'--text-chroma': `${s.intensity}px`}), apply: addClass('upw-text-chromatic')},

  // -------- On hover / scroll --------
  marker: {label: 'Marker Highlight', controls: [col('color', 'Highlight color', '#ffe066'), sel('trigger', 'Trigger', 'view', [['view', 'When scrolled into view'], ['hover', 'On hover']])],
    vars: (s) => ({'--text-marker': s.color}), apply: addClassView('upw-text-marker')},
  strikebox: {label: 'Strike / Box', controls: [sel('shape', 'Shape', 'strike', [['strike', 'Strike-through'], ['underline', 'Underline'], ['box', 'Box']]), col('color', 'Line color', '#e5484d'), sel('trigger', 'Trigger', 'view', [['view', 'When scrolled into view'], ['hover', 'On hover']])],
    vars: (s) => ({'--text-line': s.color}), apply: (wrap, target, s) => { target.setAttribute('data-text-shape', s.shape || 'strike'); target.classList.add('upw-text-strikebox'); if (s.trigger === 'view') requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-on'))); }},
  outline_fill: {label: 'Outline → Fill', controls: [col('color', 'Fill color', '#2f74e6'), sel('trigger', 'Trigger', 'view', [['view', 'When scrolled into view'], ['hover', 'On hover']])],
    vars: (s) => ({'--text-fill': s.color}), apply: addClassView('upw-text-outline')},
  fill_sweep: {label: 'Fill Sweep', controls: [col('color', 'Fill color', '#2f74e6'), trigHoverView],
    vars: (s) => ({'--text-fill': s.color}), apply: (wrap, target, s) => { target.style.setProperty('--text-base', getComputedStyle(target).color); target.classList.add('upw-text-fillsweep'); if (s.trigger === 'view') requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-on'))); }},
  color_wave: {label: 'Color Wave', controls: [col('color', 'Wave color', '#2f74e6'), trigHoverView],
    vars: (s) => ({'--text-wavecolor': s.color}), apply: (wrap, target, s) => { target.classList.add('upw-text-cwave'); const pieces = wrapPieces(target, 'chars'); pieces.forEach((p, i) => { p.classList.add('upw-text-cwave-ch'); p.style.setProperty('--i', i); }); if (s.trigger === 'view') requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('is-on'))); }},
  letter_jump: {label: 'Letter Jump', controls: [sl('height', 'Jump height (px)', 2, 18, 1, 6)],
    vars: (s) => ({'--text-jump': `${s.height}px`}), apply: (wrap, target) => { const pieces = wrapPieces(target, 'chars'); pieces.forEach((p, i) => { p.classList.add('upw-text-jump-ch'); p.style.setProperty('--i', i); }); }},
  vf_weight: {label: 'Weight Sweep', controls: [sl('from', 'From weight', 100, 900, 50, 300), sl('to', 'To weight', 100, 900, 50, 800), sel('trigger', 'Trigger', 'hover', [['hover', 'On hover'], ['view', 'When scrolled into view']])],
    vars: (s) => ({'--text-wght-from': s.from, '--text-wght-to': s.to}), apply: addClassView('upw-text-vf')},
  width_sweep: {label: 'Width Sweep', controls: [sl('from', 'From width', 25, 200, 5, 75), sl('to', 'To width', 25, 200, 5, 125), sel('trigger', 'Trigger', 'hover', [['hover', 'On hover'], ['view', 'When scrolled into view']])],
    vars: (s) => ({'--text-wdth-from': s.from, '--text-wdth-to': s.to}), apply: addClassView('upw-text-width')},
  expand_spacing: {label: 'Expand Spacing', controls: [sl('amount', 'Extra spacing (px)', 1, 20, 1, 6)],
    vars: (s) => ({'--text-spacing': `${s.amount}px`}), apply: addClass('upw-text-expand')},

  // -------- Special --------
  glitch: {label: 'Glitch', controls: [sel('trigger', 'Trigger', 'hover', [['hover', 'On hover'], ['always', 'Always']]), sl('intensity', 'Intensity (px)', 1, 8, 1, 3)],
    vars: (s) => ({'--text-glitch': `${s.intensity}px`}), apply: (wrap, target, s) => { target.setAttribute('data-text-content', target.textContent); target.classList.add('upw-text-glitch'); if (s.trigger === 'always') target.classList.add('is-always'); }},
  image_mask: {label: 'Image Mask', text: 'MASK', controls: [], apply: (wrap, target) => { target.style.backgroundImage = `url("${SAMPLE_IMG}")`; target.classList.add('upw-text-imgmask'); }},
};

const GROUPS = [
  ['Reveal', ['split_reveal', 'blur', 'mask', 'flip3d', 'scale', 'slide', 'bounce', 'random', 'skew']],
  ['Kinetic', ['scramble', 'typewriter', 'countup', 'splitflap', 'matrix', 'rotating_words', 'magnetic']],
  ['Continuous', ['shimmer', 'gradient_flow', 'rainbow', 'neon', 'breathing', 'float', 'wave', 'jitter', 'chromatic']],
  ['On hover / scroll', ['marker', 'strikebox', 'outline_fill', 'fill_sweep', 'color_wave', 'letter_jump', 'vf_weight', 'width_sweep', 'expand_spacing']],
  ['Special', ['glitch', 'image_mask']],
];
const ALL = GROUPS.flatMap(([, k]) => k);
const HOVER_HINT = new Set(['marker', 'strikebox', 'outline_fill', 'fill_sweep', 'color_wave', 'letter_jump', 'vf_weight', 'width_sweep', 'expand_spacing', 'glitch', 'magnetic']);

const defaultsFor = (key) => Object.fromEntries((EFFECTS[key].controls || []).map((c) => [c.id, c.default]));
const isNum = (key, id) => (EFFECTS[key].controls.find((c) => c.id === id) || {}).type === 'slider';
function buildPhp(key, s) {
  const inner = Object.keys(s).map((k) => `'${k}' => ${isNum(key, k) ? Number(s[k]) : `'${s[k]}'`}`).join(', ');
  return `'text_effect' => [\n    'type'  => 'multi-picker',\n    'value' => [\n        'effect' => '${key}',${inner ? `\n        '${key}' => [ ${inner} ],` : ''}\n    ],\n],`;
}

export default function TextPlayground({only}) {
  const keys = only ? [only] : ALL;
  const [effect, setEffect] = useState(keys[0]);
  const [state, setState] = useState(() => defaultsFor(keys[0]));
  const [nonce, setNonce] = useState(0);
  const wrapRef = useRef(null);
  const targetRef = useRef(null);

  const cfg = EFFECTS[effect];
  const demoText = cfg.text || 'Bring text to life';
  const set = (id, v) => setState((p) => ({...p, [id]: v}));
  const pick = (k) => { setEffect(k); setState(defaultsFor(k)); setNonce((n) => n + 1); };

  useEffect(() => {
    const wrap = wrapRef.current, target = targetRef.current;
    if (!wrap || !target) return undefined;
    // reset the target to clean text, clear prior effect classes/styles/vars
    target.textContent = demoText;
    target.className = `sc-text-target ${styles.target}`;
    target.removeAttribute('style');
    target.removeAttribute('data-text-shape');
    Object.entries(cfg.vars ? cfg.vars(state) : {}).forEach(([k, v]) => wrap.style.setProperty(k, v));
    let cleanup;
    try { cleanup = cfg.apply(wrap, target, state); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, nonce, JSON.stringify(state)]);

  const usesColor = (cfg.controls || []).some((c) => c.type === 'color');

  return (
    <div className={styles.playground}>
      <style>{EFFECT_CSS}</style>

      {!only && (
        <div className={styles.tabs}>
          {GROUPS.map(([label, ks]) => (
            <div className={styles.tabGroup} key={label}>
              <span className={styles.tabGroupLabel}>{label}</span>
              <div className={styles.tabPills}>
                {ks.map((k) => (
                  <button key={k} type="button" className={k === effect ? styles.tabActive : styles.tab} onClick={() => pick(k)}>
                    {EFFECTS[k].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        <div className={`sc-text sc-text--${effect} ${styles.stage}`} ref={wrapRef} data-text={effect}>
          {cfg.replay && <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>}
          <div className={styles.stageInner}>
            <div className={`sc-text-target ${styles.target}`} ref={targetRef}>{demoText}</div>
          </div>
          <div className={styles.hint}>{HOVER_HINT.has(effect) ? '👆 hover the text' : cfg.replay ? 'plays on load — hit ↻ Replay' : 'runs continuously'}</div>
        </div>

        <div className={styles.controls}>
          <h5>{cfg.label} — options</h5>
          {(cfg.controls || []).length === 0 && <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)'}}>No options — the text becomes a window onto an image.</p>}
          {(cfg.controls || []).map((c) => (
            <div className={styles.control} key={c.id}>
              {c.type === 'slider' && (<><label>{c.label} <span>{state[c.id]}</span></label>
                <input type="range" min={c.min} max={c.max} step={c.step} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
              {c.type === 'select' && (<><label>{c.label}</label>
                <select className={styles.select} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
              {c.type === 'color' && (<><label>{c.label} <span>{state[c.id]}</span></label>
                <input type="color" className={styles.color} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
              {c.type === 'switch' && (<><label>{c.label}</label><div className={styles.toggle}>
                <button type="button" className={state[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                <button type="button" className={state[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button></div></>)}
              {c.type === 'text' && (<><label>{c.label}</label>
                <input type="text" className={styles.text} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{buildPhp(effect, state)}</code></pre>
        {usesColor && (<p className={styles.note}>Color fields use the theme <strong>color-preset picker</strong> (they store <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code>); the resolved color is shown here.</p>)}
      </div>
    </div>
  );
}

/* The module's real stylesheet (base.css + static/css/effects/*.css), verbatim. */
const EFFECT_CSS = `
.upw-text-piece { display: inline-block; }
.upw-text-line { display: block; }
.upw-text-shimmer { background: linear-gradient(100deg, var(--text-c1,#8a8f98) 0%, var(--text-c1,#8a8f98) 40%, var(--text-c2,#fff) 50%, var(--text-c1,#8a8f98) 60%, var(--text-c1,#8a8f98) 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: upw-text-shimmer var(--text-speed,3s) linear infinite; }
@keyframes upw-text-shimmer { to { background-position: -200% 0; } }
.upw-text-wave-ch { display: inline-block; animation: upw-text-wave var(--text-wave-speed,1.4s) ease-in-out infinite; }
@keyframes upw-text-wave { 0%,100% { transform: translateY(0);} 50% { transform: translateY(calc(var(--text-wave-amp,6px) * -1)); } }
.upw-text-glitch { position: relative; }
.upw-text-glitch::before, .upw-text-glitch::after { content: attr(data-text-content); position:absolute; left:0; top:0; width:100%; height:100%; pointer-events:none; opacity:0; overflow:hidden; }
.upw-text-glitch::before { color:#ff00e6; } .upw-text-glitch::after { color:#00fff0; }
.upw-text-glitch:hover::before, .upw-text-glitch.is-always::before { opacity:.85; animation: upw-text-glitch-a .38s steps(2,end) infinite; }
.upw-text-glitch:hover::after, .upw-text-glitch.is-always::after { opacity:.85; animation: upw-text-glitch-b .38s steps(2,end) infinite; }
@keyframes upw-text-glitch-a { 0%{transform:translate(0);clip-path:inset(0 0 0 0);} 25%{transform:translate(calc(var(--text-glitch,3px)*-1),1px);clip-path:inset(18% 0 46% 0);} 50%{transform:translate(var(--text-glitch,3px),-1px);clip-path:inset(58% 0 12% 0);} 75%{transform:translate(calc(var(--text-glitch,3px)*-0.6),0);clip-path:inset(8% 0 70% 0);} 100%{transform:translate(0);clip-path:inset(0 0 0 0);} }
@keyframes upw-text-glitch-b { 0%{transform:translate(0);clip-path:inset(0 0 0 0);} 25%{transform:translate(var(--text-glitch,3px),-1px);clip-path:inset(52% 0 20% 0);} 50%{transform:translate(calc(var(--text-glitch,3px)*-1),1px);clip-path:inset(10% 0 60% 0);} 75%{transform:translate(calc(var(--text-glitch,3px)*0.6),0);clip-path:inset(70% 0 8% 0);} 100%{transform:translate(0);clip-path:inset(0 0 0 0);} }
.upw-text-vf { font-variation-settings: 'wght' var(--text-wght-from,300); transition: font-variation-settings .45s ease, font-weight .45s ease; }
.sc-text--vf_weight:hover .upw-text-vf, .upw-text-vf.is-on { font-variation-settings: 'wght' var(--text-wght-to,800); }
.upw-text-gradflow, .upw-text-rainbow { background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: upw-text-gradflow var(--text-speed,4s) linear infinite; }
.upw-text-gradflow { background-image: linear-gradient(100deg, var(--text-c1,#ff6b6b), var(--text-c2,#6a8dff), var(--text-c3,#17c964), var(--text-c1,#ff6b6b)); }
.upw-text-rainbow { background-image: linear-gradient(90deg,#ff004c,#ff8a00,#ffd500,#48ff00,#00b3ff,#7a00ff,#ff004c); }
@keyframes upw-text-gradflow { to { background-position: -300% 0; } }
.upw-text-neon { text-shadow: 0 0 4px var(--text-neon,#6aa6ff), 0 0 10px var(--text-neon,#6aa6ff), 0 0 22px var(--text-neon,#6aa6ff); animation: upw-text-neon var(--text-speed,2.5s) linear infinite; }
@keyframes upw-text-neon { 0%,18%,22%,55%,57%,100% { opacity:1; } 20%,56% { opacity:.72; } }
.upw-text-breathing { animation: upw-text-breathing var(--text-speed,3s) ease-in-out infinite; }
@keyframes upw-text-breathing { 0%,100% { opacity:.78; transform: scale(.99);} 50% { opacity:1; transform: scale(1.02);} }
.upw-text-jitter { animation: upw-text-jitter .2s steps(2,end) infinite; }
@keyframes upw-text-jitter { 0%{transform:translate(0);} 25%{transform:translate(calc(var(--text-jitter,2px)*-1),1px);} 50%{transform:translate(var(--text-jitter,2px),-1px);} 75%{transform:translate(-1px,0);} 100%{transform:translate(0);} }
.upw-text-float { animation: upw-text-float var(--text-speed,3s) ease-in-out infinite; }
@keyframes upw-text-float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(calc(var(--text-float,8px)*-1)); } }
.upw-text-marker { background-image: linear-gradient(var(--text-marker,#ffe066), var(--text-marker,#ffe066)); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 42%; transition: background-size .6s cubic-bezier(.5,0,.1,1); -webkit-box-decoration-break: clone; box-decoration-break: clone; padding: 0 .05em; }
.upw-text-marker.is-on, .sc-text--marker:hover .upw-text-marker { background-size: 100% 42%; }
.upw-text-strikebox { position: relative; }
.upw-text-strikebox::after { content:""; position:absolute; background: var(--text-line, currentColor); transition: transform .5s cubic-bezier(.5,0,.1,1), opacity .3s ease; transform-origin: left center; }
.upw-text-strikebox[data-text-shape="strike"]::after { left:0; top:50%; height:2px; width:100%; transform: scaleX(0); }
.upw-text-strikebox[data-text-shape="underline"]::after { left:0; bottom:-2px; height:2px; width:100%; transform: scaleX(0); }
.upw-text-strikebox[data-text-shape="box"]::after { inset:-4px -6px; border:2px solid var(--text-line, currentColor); background:none; opacity:0; transform:none; }
.upw-text-strikebox.is-on[data-text-shape="strike"]::after, .sc-text--strikebox:hover .upw-text-strikebox[data-text-shape="strike"]::after, .upw-text-strikebox.is-on[data-text-shape="underline"]::after, .sc-text--strikebox:hover .upw-text-strikebox[data-text-shape="underline"]::after { transform: scaleX(1); }
.upw-text-strikebox.is-on[data-text-shape="box"]::after, .sc-text--strikebox:hover .upw-text-strikebox[data-text-shape="box"]::after { opacity:1; }
.upw-text-outline { -webkit-text-stroke: 1px var(--text-fill, currentColor); text-stroke: 1px var(--text-fill, currentColor); -webkit-text-fill-color: transparent; color: transparent; transition: -webkit-text-fill-color .5s ease, color .5s ease; }
.upw-text-outline.is-on, .sc-text--outline_fill:hover .upw-text-outline { -webkit-text-fill-color: var(--text-fill, currentColor); color: var(--text-fill, currentColor); }
.upw-text-chromatic { text-shadow: var(--text-chroma,2px) 0 rgba(255,0,80,.6), calc(var(--text-chroma,2px)*-1) 0 rgba(0,200,255,.6); }
.upw-text-width { font-variation-settings: 'wdth' var(--text-wdth-from,75); transition: font-variation-settings .5s ease; }
.sc-text--width_sweep:hover .upw-text-width, .upw-text-width.is-on { font-variation-settings: 'wdth' var(--text-wdth-to,125); }
.upw-text-expand { transition: letter-spacing .4s ease; }
.sc-text--expand_spacing:hover .upw-text-expand { letter-spacing: var(--text-spacing,6px); }
.upw-text-cwave-ch { transition: color .3s ease; }
.sc-text--color_wave:hover .upw-text-cwave-ch, .upw-text-cwave.is-on .upw-text-cwave-ch { color: var(--text-wavecolor,#2f74e6); transition-delay: calc(var(--i,0) * 40ms); }
.upw-text-jump-ch { display:inline-block; transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
.sc-text--letter_jump:hover .upw-text-jump-ch { transform: translateY(calc(var(--text-jump,6px)*-1)); transition-delay: calc(var(--i,0) * 30ms); }
.upw-text-fillsweep { background-image: linear-gradient(90deg, var(--text-fill,#2f74e6) 0 50%, var(--text-base,#111) 50% 100%); background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; transition: background-position .5s ease; }
.upw-text-fillsweep.is-on, .sc-text--fill_sweep:hover .upw-text-fillsweep { background-position: 0 0; }
.upw-text-matrix { color:#19ff7a; text-shadow: 0 0 6px #19ff7a; }
.upw-text-caret { border-right:.08em solid currentColor; padding-right:.04em; animation: upw-text-blink 1s step-end infinite; }
@keyframes upw-text-blink { 0%,100% { border-color: currentColor;} 50% { border-color: transparent;} }
.upw-text-imgmask { background-size: cover; background-position: center; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
@media (prefers-reduced-motion: reduce) { .upw-text-shimmer,.upw-text-wave-ch,.upw-text-gradflow,.upw-text-rainbow,.upw-text-neon,.upw-text-breathing,.upw-text-jitter,.upw-text-float,.upw-text-glitch::before,.upw-text-glitch::after,.upw-text-caret { animation: none; } }
`;
