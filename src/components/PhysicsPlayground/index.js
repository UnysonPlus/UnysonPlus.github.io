import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Physics Effects module.
 *
 * Ports the module's real runtime: the shared rAF integrator + spring/verlet
 * helpers (physics-core.js), the pointer helpers follow/drag/reactScale
 * (_pointer.js), and every per-effect driver (static/js/effects/*.js). Options
 * are read from data-phys-* attributes exactly as physics-render.php emits them.
 * Effects are interactive (drag / cursor / hover / click); entrance effects loop
 * so they're watchable, and ↻ Replay re-runs any effect.
 */

const TAU = Math.PI * 2;

/* One rAF scheduler per run; frame fns return false to unschedule. */
function makeRAF() {
  const fns = new Set();
  let raf = 0;
  const tick = (t) => {
    fns.forEach((fn) => { let keep; try { keep = fn(t); } catch (e) { keep = false; } if (keep === false) fns.delete(fn); });
    raf = fns.size ? requestAnimationFrame(tick) : 0;
  };
  return {
    add(fn) { fns.add(fn); if (!raf) raf = requestAnimationFrame(tick); },
    remove(fn) { fns.delete(fn); },
    stop() { if (raf) cancelAnimationFrame(raf); fns.clear(); raf = 0; },
  };
}

/* The API surface (upwPhysApi + _pointer helpers), bound to one rAF scheduler. */
function makeApi(raf) {
  const num = (el, attr, d) => { const v = parseFloat(el.getAttribute('data-phys-' + attr)); return isNaN(v) ? d : v; };
  const TF = (el, s) => { el.style.transform = s; };
  const add = (fn) => raf.add(fn);
  const remove = (fn) => raf.remove(fn);
  const observe = (el, fn) => { el.style.willChange = 'transform'; add(fn); };
  const entrance = (el, run) => { el.style.willChange = 'transform, opacity'; run(); };
  const springTo = (from, to, k, damp, apply, done) => {
    let x = from, v = 0;
    add(() => { v += (to - x) * k; v *= damp; x += v; apply(x); if (Math.abs(x - to) < 0.3 && Math.abs(v) < 0.05) { apply(to); if (done) done(); return false; } return true; });
  };
  const follow = (el, reach, k) => {
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, active = false;
    el.style.willChange = 'transform';
    const loop = () => {
      vx += (tx - x) * k; vx *= 0.75; x += vx; vy += (ty - y) * k; vy *= 0.75; y += vy;
      TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`);
      if (tx === 0 && ty === 0 && Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) { TF(el, 'translate(0,0)'); active = false; return false; }
      return true;
    };
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); tx = (e.clientX - (r.left + r.width / 2)) * reach; ty = (e.clientY - (r.top + r.height / 2)) * reach; if (!active) { active = true; add(loop); } });
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  };
  const drag = (el, slingshot) => {
    const ret = slingshot ? 'spring' : (el.getAttribute('data-phys-return') === 'free' ? 'free' : 'spring');
    const k = slingshot ? 0.1 : num(el, 'stiffness', 0.15);
    const damp = slingshot ? (0.72 + num(el, 'power', 0.7) * 0.22) : 0.8;
    const axis = el.getAttribute('data-phys-axis') || 'both';
    let x = 0, y = 0, vx = 0, vy = 0, dragging = false, ox = 0, oy = 0, lx = 0, ly = 0;
    el.style.willChange = 'transform'; el.style.cursor = 'grab';
    el.style.touchAction = axis === 'x' ? 'pan-y' : (axis === 'y' ? 'pan-x' : 'none');
    const apply = () => TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`);
    const loop = () => {
      if (ret === 'spring') {
        vx += (0 - x) * k; vx *= damp; x += vx; vy += (0 - y) * k; vy *= damp; y += vy; apply();
        if (Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) { x = 0; y = 0; apply(); return false; }
        return true;
      }
      x += vx; y += vy; vx *= 0.92; vy *= 0.92; apply(); return Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1;
    };
    el.addEventListener('pointerdown', (e) => { dragging = true; remove(loop); try { el.setPointerCapture(e.pointerId); } catch (err) {} el.style.cursor = 'grabbing'; ox = e.clientX - x; oy = e.clientY - y; lx = e.clientX; ly = e.clientY; vx = vy = 0; e.preventDefault(); });
    el.addEventListener('pointermove', (e) => { if (!dragging) return; if (axis !== 'y') { x = e.clientX - ox; vx = e.clientX - lx; } if (axis !== 'x') { y = e.clientY - oy; vy = e.clientY - ly; } lx = e.clientX; ly = e.clientY; apply(); });
    const endDrag = () => { if (!dragging) return; dragging = false; el.style.cursor = 'grab'; add(loop); };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
  };
  const reactScale = (el, ox, oy) => {
    let sx = 1, sy = 1, vx = 0, vy = 0, active = false;
    el.style.willChange = 'transform'; el.style.transformOrigin = ox + ' ' + oy;
    const loop = () => {
      vx += (1 - sx) * 0.22; vx *= 0.8; sx += vx; vy += (1 - sy) * 0.22; vy *= 0.8; sy += vy;
      TF(el, `scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
      if (Math.abs(vx) < 0.002 && Math.abs(vy) < 0.002 && Math.abs(sx - 1) < 0.003 && Math.abs(sy - 1) < 0.003) { sx = sy = 1; TF(el, 'scale(1,1)'); active = false; return false; }
      return true;
    };
    return (dx, dy) => { vx = dx; vy = dy; if (!active) { active = true; add(loop); } };
  };
  const bindTrigger = (el, poke) => el.addEventListener(el.getAttribute('data-phys-trigger') === 'click' ? 'click' : 'pointerenter', poke);
  return {num, TF, add, remove, observe, entrance, springTo, follow, drag, reactScale, bindTrigger, TAU};
}

/* Per-effect drivers — faithful ports of static/js/effects/*.js. */
const EFFECTS = {
  draggable: (el, A) => A.drag(el, false),
  slingshot: (el, A) => A.drag(el, true),
  attract: (el, A) => A.follow(el, A.num(el, 'strength', 0.6), A.num(el, 'stiffness', 0.15)),
  spring: (el, A) => A.follow(el, A.num(el, 'strength', 0.25), A.num(el, 'stiffness', 0.12)),
  tilt_inertia: (el, A) => {
    const max = A.num(el, 'max-tilt', 14);
    let rx = 0, ry = 0, vrx = 0, vry = 0, tx = 0, ty = 0, active = false;
    el.style.willChange = 'transform';
    const loop = () => { vrx += (tx - rx) * 0.15; vrx *= 0.75; rx += vrx; vry += (ty - ry) * 0.15; vry *= 0.75; ry += vry; A.TF(el, `perspective(600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`); if (tx === 0 && ty === 0 && Math.abs(rx) < 0.1 && Math.abs(ry) < 0.1 && Math.abs(vrx) < 0.02) { A.TF(el, 'perspective(600px)'); active = false; return false; } return true; };
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; tx = -py * max * 2; ty = px * max * 2; if (!active) { active = true; A.add(loop); } });
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  },
  orbit_cursor: (el, A) => {
    const rad = A.num(el, 'radius', 26), spd = A.num(el, 'speed', 1);
    let cx = 0, cy = 0, has = false, ang = 0, x = 0, y = 0, vx = 0, vy = 0, active = false;
    el.style.willChange = 'transform';
    const loop = () => { ang += 0.06 * spd; const tx = has ? cx + Math.cos(ang) * rad : 0, ty = has ? cy + Math.sin(ang) * rad : 0; vx += (tx - x) * 0.18; vx *= 0.8; x += vx; vy += (ty - y) * 0.18; vy *= 0.8; y += vy; A.TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`); if (!has && Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vx) < 0.05) { A.TF(el, 'translate(0,0)'); active = false; return false; } return true; };
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); cx = e.clientX - (r.left + r.width / 2); cy = e.clientY - (r.top + r.height / 2); has = true; if (!active) { active = true; A.add(loop); } });
    el.addEventListener('pointerleave', () => { has = false; });
  },
  repel: (el, A) => {
    const radius = A.num(el, 'radius', 120), strength = A.num(el, 'strength', 0.6);
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, active = false;
    el.style.willChange = 'transform';
    const loop = () => { vx += (tx - x) * 0.2; vx *= 0.7; x += vx; vy += (ty - y) * 0.2; vy *= 0.7; y += vy; A.TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`); if (tx === 0 && ty === 0 && Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vx) < 0.05) { A.TF(el, 'translate(0,0)'); active = false; return false; } return true; };
    document.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); const dx = (r.left + r.width / 2) - e.clientX, dy = (r.top + r.height / 2) - e.clientY, d = Math.sqrt(dx * dx + dy * dy); if (d < radius && d > 0.001) { const f = (1 - d / radius) * radius * strength * 0.5; tx = dx / d * f; ty = dy / d * f; } else { tx = 0; ty = 0; } if (!active) { active = true; A.add(loop); } }, {passive: true});
  },
  rubber_band: (el, A) => {
    const strength = A.num(el, 'strength', 0.4);
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, active = false;
    el.style.willChange = 'transform'; el.style.transformOrigin = 'center';
    const loop = () => { vx += (tx - x) * 0.12; vx *= 0.78; x += vx; vy += (ty - y) * 0.12; vy *= 0.78; y += vy; const st = 1 + Math.min(0.45, Math.sqrt(x * x + y * y) / 220 * (0.5 + strength)); A.TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${st.toFixed(3)},${(1 / st).toFixed(3)})`); if (tx === 0 && ty === 0 && Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vx) < 0.05) { A.TF(el, 'translate(0,0)'); active = false; return false; } return true; };
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); tx = (e.clientX - (r.left + r.width / 2)) * strength * 0.5; ty = (e.clientY - (r.top + r.height / 2)) * strength * 0.5; if (!active) { active = true; A.add(loop); } });
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  },
  // Ambient
  breathing: (el, A) => { const amt = A.num(el, 'amount', 0.06), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; el.style.transformOrigin = 'center'; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; A.TF(el, `scale(${(1 + Math.sin(s * 1.5 + ph) * amt).toFixed(3)})`); return true; }); },
  drift: (el, A) => { const amt = A.num(el, 'amount', 14), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; const x = (Math.sin(s * 0.7 + ph) + Math.sin(s * 0.31 + ph * 2) * 0.6) * amt * 0.6; const y = (Math.cos(s * 0.53 + ph) + Math.sin(s * 0.23) * 0.5) * amt * 0.6; A.TF(el, `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`); return true; }); },
  float: (el, A) => { const amt = A.num(el, 'amount', 12), spd = A.num(el, 'speed', 1), sway = el.getAttribute('data-phys-rotate') !== 'no', ph = Math.random() * TAU; let t0 = null; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; A.TF(el, `translateY(${(Math.sin(s * 1.6 + ph) * amt).toFixed(2)}px) rotate(${(sway ? Math.sin(s * 1.05 + ph) * amt * 0.14 : 0).toFixed(2)}deg)`); return true; }); },
  levitate: (el, A) => { const rise = A.num(el, 'rise', 20), bob = A.num(el, 'bob', 8), ph = Math.random() * TAU; let t0 = null; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000; const y = -rise * (1 - Math.exp(-s * 2.5)) + Math.sin(s * 1.6 + ph) * bob; A.TF(el, `translateY(${y.toFixed(2)}px)`); return true; }); },
  orbit: (el, A) => { const rad = A.num(el, 'radius', 20), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; A.observe(el, (t) => { if (t0 === null) t0 = t; const a = (t - t0) / 1000 * spd * 1.4 + ph; A.TF(el, `translate(${(Math.cos(a) * rad).toFixed(2)}px,${(Math.sin(a) * rad).toFixed(2)}px)`); return true; }); },
  pendulum: (el, A) => { const ang = A.num(el, 'angle', 8), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; el.style.transformOrigin = el.getAttribute('data-phys-anchor') === 'left' ? '0 0' : '50% 0'; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; A.TF(el, `rotate(${(Math.sin(s * 1.8 + ph) * ang).toFixed(2)}deg)`); return true; }); },
  sway: (el, A) => { const ang = A.num(el, 'angle', 6), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; el.style.transformOrigin = '50% 100%'; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; A.TF(el, `rotate(${(Math.sin(s * 1.5 + ph) * ang).toFixed(2)}deg)`); return true; }); },
  wobble: (el, A) => { const amt = A.num(el, 'amount', 3), spd = A.num(el, 'speed', 1), ph = Math.random() * TAU; let t0 = null; A.observe(el, (t) => { if (t0 === null) t0 = t; const s = (t - t0) / 1000 * spd; A.TF(el, `rotate(${((Math.sin(s * 7 + ph) + Math.sin(s * 11 + ph * 1.3) * 0.5) * amt * 0.7).toFixed(2)}deg)`); return true; }); },
  bounded: (el, A) => {
    const spd = A.num(el, 'speed', 1);
    el.style.willChange = 'transform';
    let x = 0, y = 0; const ang = Math.random() * TAU, v = (1.2 + Math.random()) * spd; let vx = Math.cos(ang) * v, vy = Math.sin(ang) * v;
    A.observe(el, () => { const p = el.parentElement; if (!p) return true; const er = el.getBoundingClientRect(), pr = p.getBoundingClientRect(); const maxX = (pr.width - er.width) / 2, maxY = (pr.height - er.height) / 2; if (maxX < 4 || maxY < 4) return true; x += vx; y += vy; if (x > maxX) { x = maxX; vx = -vx; } else if (x < -maxX) { x = -maxX; vx = -vx; } if (y > maxY) { y = maxY; vy = -vy; } else if (y < -maxY) { y = -maxY; vy = -vy; } A.TF(el, `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`); return true; });
  },
  // Entrance
  gravity: (el, A) => { const drop = A.num(el, 'drop', 120), bounce = A.num(el, 'bounce', 0.5); A.TF(el, `translateY(${-drop}px)`); el.style.opacity = '0'; A.entrance(el, () => { let y = -drop, v = 0, op = 0; const g = drop * 0.012 + 0.6; A.add(() => { v += g; y += v; if (y >= 0) { y = 0; v = -v * bounce; if (Math.abs(v) < 0.6) { A.TF(el, 'translateY(0)'); el.style.opacity = '1'; return false; } } op = Math.min(1, op + 0.14); A.TF(el, `translateY(${y.toFixed(2)}px)`); el.style.opacity = op.toFixed(2); return true; }); }); },
  rise: (el, A) => { const drop = A.num(el, 'drop', 120); A.TF(el, `translateY(${drop}px)`); el.style.opacity = '0'; let op = 0; A.entrance(el, () => A.springTo(drop, 0, 0.12, 0.84, (x) => { A.TF(el, `translateY(${x.toFixed(2)}px)`); op = Math.min(1, op + 0.12); el.style.opacity = op.toFixed(2); }, () => { el.style.opacity = '1'; })); },
  pop: (el, A) => { const bounce = A.num(el, 'bounce', 0.6); el.style.transformOrigin = 'center'; A.TF(el, 'scale(0)'); el.style.opacity = '0'; A.entrance(el, () => { el.style.opacity = '1'; A.springTo(0, 1, 0.14 + bounce * 0.12, 0.62 + bounce * 0.18, (x) => A.TF(el, `scale(${Math.max(0, x).toFixed(3)})`)); }); },
  ragdoll: (el, A) => { const drop = A.num(el, 'drop', 120); el.style.transformOrigin = 'center'; A.TF(el, `translateY(${-drop}px)`); el.style.opacity = '0'; A.entrance(el, () => { let y = -drop, v = 0, rot = 0, op = 0; const g = drop * 0.012 + 0.6; let rv = (Math.random() < 0.5 ? -1 : 1) * (5 + Math.random() * 5); const rest = (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 5); A.add(() => { v += g; y += v; rot += rv; if (y >= 0) { y = 0; v = -v * 0.32; rv *= 0.45; if (Math.abs(v) < 0.6) { rot += (rest - rot) * 0.2; if (Math.abs(rot - rest) < 0.4) { rot = rest; A.TF(el, `translateY(0) rotate(${rest.toFixed(1)}deg)`); el.style.opacity = '1'; return false; } } } op = Math.min(1, op + 0.14); A.TF(el, `translateY(${y.toFixed(2)}px) rotate(${rot.toFixed(1)}deg)`); el.style.opacity = op.toFixed(2); return true; }); }); },
  sag: (el, A) => { const drop = A.num(el, 'drop', 60); A.TF(el, `translateY(${-drop}px)`); el.style.opacity = '0'; let op = 0; A.entrance(el, () => A.springTo(-drop, 0, 0.06, 0.72, (x) => { A.TF(el, `translateY(${x.toFixed(2)}px)`); op = Math.min(1, op + 0.1); el.style.opacity = op.toFixed(2); }, () => { el.style.opacity = '1'; })); },
  // Reaction
  jelly: (el, A) => { const i = A.num(el, 'intensity', 0.5), poke = A.reactScale(el, 'center', 'center'); A.bindTrigger(el, () => poke(-i * 0.55, i * 0.55)); },
  squash: (el, A) => { const i = A.num(el, 'intensity', 0.5), poke = A.reactScale(el, 'center', 'bottom'); A.bindTrigger(el, () => poke(i * 0.4, -i * 0.6)); },
  recoil: (el, A) => { const dist = A.num(el, 'distance', 14); let x = 0, vx = 0, active = false; el.style.willChange = 'transform'; const loop = () => { vx += (0 - x) * 0.25; vx *= 0.7; x += vx; A.TF(el, `translate(${x.toFixed(2)}px,0)`); if (Math.abs(x) < 0.4 && Math.abs(vx) < 0.05) { A.TF(el, 'translate(0,0)'); active = false; return false; } return true; }; A.bindTrigger(el, () => { x = -dist; vx = 0; if (!active) { active = true; A.add(loop); } }); },
  shake: (el, A) => { const i = A.num(el, 'intensity', 0.5); let amp = 0, ph = 0, active = false; el.style.willChange = 'transform'; const loop = () => { ph += 0.85; amp *= 0.9; A.TF(el, `translateX(${(Math.sin(ph) * amp).toFixed(2)}px)`); if (amp < 0.3) { A.TF(el, 'translateX(0)'); active = false; return false; } return true; }; A.bindTrigger(el, () => { amp = 9 * i; ph = 0; if (!active) { active = true; A.add(loop); } }); },
  spin: (el, A) => { const spd = A.num(el, 'speed', 1); let ang = 0, av = 0, active = false; el.style.willChange = 'transform'; el.style.transformOrigin = 'center'; const loop = () => { ang += av; av *= 0.94; A.TF(el, `rotate(${ang.toFixed(2)}deg)`); if (Math.abs(av) < 0.05) { active = false; return false; } return true; }; A.bindTrigger(el, () => { av += 11 * spd; if (!active) { active = true; A.add(loop); } }); },
};

/* ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val, note) => ({id, label, type: 'slider', min, max, step, default: val, note});
const sel = (id, label, val, choices) => ({id, label, type: 'select', default: val, choices});
const trig = (val) => sel('trigger', 'Trigger', val, [['hover', 'On hover'], ['click', 'On click / tap']]);
const CTRL = {
  draggable: [sel('return', 'On release', 'spring', [['spring', 'Spring back'], ['free', 'Glide to a stop']]), sl('stiffness', 'Springiness', 0.03, 0.4, 0.01, 0.15), sel('axis', 'Axis', 'both', [['both', 'Both'], ['x', 'Horizontal'], ['y', 'Vertical']])],
  slingshot: [sl('power', 'Bounciness', 0.3, 0.95, 0.05, 0.7)],
  spring: [sl('strength', 'Reach', 0.05, 0.6, 0.05, 0.25), sl('stiffness', 'Springiness', 0.03, 0.35, 0.01, 0.12)],
  attract: [sl('strength', 'Pull', 0.2, 1, 0.05, 0.6), sl('stiffness', 'Springiness', 0.03, 0.4, 0.01, 0.15)],
  repel: [sl('radius', 'Radius (px)', 40, 300, 10, 120), sl('strength', 'Push strength', 0.1, 1.5, 0.1, 0.6)],
  orbit_cursor: [sl('radius', 'Radius (px)', 10, 80, 2, 26), sl('speed', 'Speed', 0.3, 3, 0.1, 1)],
  rubber_band: [sl('strength', 'Stretch', 0.1, 0.9, 0.05, 0.4)],
  tilt_inertia: [sl('max_tilt', 'Max tilt (°)', 4, 30, 1, 14)],
  float: [sl('amount', 'Amount (px)', 2, 40, 1, 12), sl('speed', 'Speed', 0.2, 2.5, 0.1, 1), {id: 'rotate', label: 'Gentle sway', type: 'switch', on: 'yes', off: 'no', default: 'yes'}],
  levitate: [sl('rise', 'Lift (px)', 6, 60, 2, 20), sl('bob', 'Bob (px)', 2, 24, 1, 8)],
  sway: [sl('angle', 'Sway (°)', 2, 20, 1, 6), sl('speed', 'Speed', 0.3, 2.5, 0.1, 1)],
  pendulum: [sl('angle', 'Swing (°)', 2, 30, 1, 8), sl('speed', 'Speed', 0.3, 2.5, 0.1, 1), sel('anchor', 'Hang from', 'top', [['top', 'Top center'], ['left', 'Top left']])],
  wobble: [sl('amount', 'Amount (°)', 1, 12, 0.5, 3), sl('speed', 'Speed', 0.3, 3, 0.1, 1)],
  breathing: [sl('amount', 'Amount', 0.02, 0.2, 0.01, 0.06), sl('speed', 'Speed', 0.3, 2.5, 0.1, 1)],
  drift: [sl('amount', 'Amount (px)', 4, 50, 1, 14), sl('speed', 'Speed', 0.3, 2.5, 0.1, 1)],
  orbit: [sl('radius', 'Radius (px)', 5, 60, 1, 20), sl('speed', 'Speed', 0.3, 3, 0.1, 1)],
  gravity: [sl('drop', 'Drop from (px)', 30, 400, 10, 120), sl('bounce', 'Bounciness', 0, 0.85, 0.05, 0.5)],
  rise: [sl('drop', 'Rise from (px)', 30, 400, 10, 120), sl('bounce', 'Bounciness', 0, 0.85, 0.05, 0.5)],
  sag: [sl('drop', 'Sag from (px)', 20, 300, 10, 60)],
  ragdoll: [sl('drop', 'Drop from (px)', 30, 400, 10, 120)],
  pop: [sl('bounce', 'Bounciness', 0.1, 1, 0.05, 0.6)],
  bounded: [sl('speed', 'Speed', 0.3, 3, 0.1, 1)],
  jelly: [sl('intensity', 'Wobble', 0.15, 1, 0.05, 0.5), trig('hover')],
  squash: [sl('intensity', 'Intensity', 0.15, 1, 0.05, 0.5), trig('hover')],
  recoil: [sl('distance', 'Kick (px)', 4, 40, 1, 14), trig('click')],
  shake: [sl('intensity', 'Intensity', 0.15, 1, 0.05, 0.5), trig('hover')],
  spin: [sl('speed', 'Spin speed', 0.3, 3, 0.1, 1), trig('hover')],
};
const GROUPS = [
  ['Drag', [['draggable', 'Draggable'], ['slingshot', 'Slingshot']]],
  ['Pointer', [['spring', 'Spring Follow'], ['attract', 'Attract'], ['repel', 'Repel'], ['orbit_cursor', 'Orbit Cursor'], ['rubber_band', 'Rubber Band'], ['tilt_inertia', 'Inertia Tilt']]],
  ['Ambient', [['float', 'Float'], ['drift', 'Drift'], ['breathing', 'Breathing'], ['levitate', 'Levitate'], ['orbit', 'Orbit Point'], ['pendulum', 'Pendulum'], ['sway', 'Wind Sway'], ['wobble', 'Wobble']]],
  ['Entrance', [['gravity', 'Gravity Drop'], ['rise', 'Gravity Rise'], ['pop', 'Pop In'], ['ragdoll', 'Ragdoll'], ['sag', 'Weight Sag']]],
  ['Container', [['bounded', 'Bounce Box']]],
  ['Reaction', [['jelly', 'Jelly'], ['squash', 'Squash & Stretch'], ['recoil', 'Recoil'], ['shake', 'Shake'], ['spin', 'Momentum Spin']]],
];
const LABELS = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const ENTRANCE = new Set(['gravity', 'rise', 'pop', 'ragdoll', 'sag']);
const DRAG = new Set(['draggable', 'slingshot']);
const CURSOR = new Set(['spring', 'attract', 'repel', 'orbit_cursor', 'rubber_band', 'tilt_inertia']);
const REACTION = new Set(['jelly', 'squash', 'recoil', 'shake', 'spin']);

const isNum = (effect, id) => (CTRL[effect].find((c) => c.id === id) || {}).type === 'slider';
const defaultsFor = (effect) => Object.fromEntries(CTRL[effect].map((c) => [c.id, c.default]));

function buildPhp(effect, s) {
  const inner = Object.keys(s).map((k) => `'${k}' => ${isNum(effect, k) ? Number(s[k]) : `'${s[k]}'`}`).join(', ');
  return `'physics' => [
    'type'  => 'multi-picker',
    'value' => [
        'effect' => '${effect}',
        '${effect}' => [ ${inner} ],
    ],
],`;
}

/* Runs one effect on the element; returns a cleanup (stop rAF + remove listeners). */
function runEffect(el, effect, s) {
  const raf = makeRAF();
  const A = makeApi(raf);
  const listeners = [];
  const patch = (target) => { const orig = target.addEventListener; target.addEventListener = function (t, h, o) { listeners.push([target, t, h, o]); return orig.call(target, t, h, o); }; return () => { target.addEventListener = orig; }; };
  const unEl = patch(el), unDoc = patch(document);
  try { EFFECTS[effect](el, A); } catch (e) { /* never break the page */ }
  unEl(); unDoc();
  return () => { raf.stop(); listeners.forEach(([tg, t, h, o]) => { try { tg.removeEventListener(t, h, o); } catch (e) {} }); };
}

export default function PhysicsPlayground() {
  const [effect, setEffect] = useState('float');
  const [state, setState] = useState(() => defaultsFor('float'));
  const [nonce, setNonce] = useState(0);
  const ref = useRef(null);
  const set = (id, v) => setState((p) => ({...p, [id]: v}));
  const pick = (e) => { setEffect(e); setState(defaultsFor(e)); setNonce((n) => n + 1); };

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let disposed = false, cleanup = null, loopTimer = null;
    const run = () => {
      if (disposed) return;
      if (cleanup) cleanup();
      el.style.cssText = ''; el.style.transform = ''; el.style.opacity = '';
      cleanup = runEffect(el, effect, state);
      if (ENTRANCE.has(effect)) loopTimer = setTimeout(run, 2800);
    };
    run();
    return () => { disposed = true; if (loopTimer) clearTimeout(loopTimer); if (cleanup) cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, nonce, JSON.stringify(state)]);

  const attrs = Object.fromEntries(Object.keys(state).map((k) => [`data-phys-${k.replace(/_/g, '-')}`, String(state[k])]));
  const hint = DRAG.has(effect) ? '👆 grab & fling the demo'
    : CURSOR.has(effect) ? '👆 move your cursor over / near the demo'
    : ENTRANCE.has(effect) ? 'plays on load — hit ↻ Replay'
    : REACTION.has(effect) ? `👆 ${state.trigger === 'click' ? 'click' : 'hover'} the demo`
    : 'runs continuously';

  return (
    <div className={styles.playground}>
      <style>{PHYS_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>
            <div className={`sc-phys sc-phys--${effect} ${styles.card}`} ref={ref} data-phys={effect} {...attrs}>
              <div className={styles.icon}>✦</div>
              <h4>{LABELS[effect]}</h4>
            </div>
            <div className={styles.hint}>{hint}</div>
          </div>

          <div className={styles.controls}>
            <h5>{LABELS[effect]} — options</h5>
            {CTRL[effect].map((c) => (
              <div className={styles.control} key={c.id}>
                {c.type === 'slider' && (<><label>{c.label} <span>{state[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                {c.type === 'select' && (<><label>{c.label}</label>
                  <select className={styles.select} value={state[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                {c.type === 'switch' && (<><label>{c.label}</label><div className={styles.toggle}>
                  <button type="button" className={state[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                  <button type="button" className={state[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button></div></>)}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Effect</div>
            {GROUPS.map(([label, ks]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {ks.map(([k, l]) => (
                    <button key={k} type="button" className={k === effect ? styles.tabActive : styles.tab} onClick={() => pick(k)}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{buildPhp(effect, state)}</code></pre>
      </div>
    </div>
  );
}

/* The module's tiny base stylesheet (physics.css) — drag affordances only. */
const PHYS_CSS = `
.sc-phys--draggable { cursor: grab; -webkit-user-select: none; user-select: none; touch-action: none; }
.sc-phys--draggable:active { cursor: grabbing; }
`;
