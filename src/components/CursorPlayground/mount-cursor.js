/*
 * Custom Cursor engine — a faithful port of the plugin's per-style runtimes
 * (modules/cursor/static/js/styles/*.js), adapted to run inside a stage box instead of the whole
 * window: the pointer is tracked relative to the stage, cursor elements are appended to the stage
 * (position:absolute), and the `upw-cursor-*` state classes ride on the stage element.
 *
 * mountCursor(stage, cfg, seed) builds the chosen style and returns a teardown fn. Every builder's
 * math (lerp trail, spring, elastic squash, comet chain, particle pool, swarm, rope, sticky…) is
 * copied from the corresponding plugin driver.
 */
export function mountCursor(stage, cfg, seed) {
  const style = cfg.style || 'dot_ring';
  const reduce = false; // playground always animates
  const trail = cfg.trail != null ? cfg.trail : 0.18;

  stage.style.setProperty('--upw-cursor-color', cfg.color || '#2f74e6');
  stage.style.setProperty('--upw-cursor-size', (cfg.size || 8) + 'px');
  stage.style.setProperty('--upw-lens-r', (cfg.lensRadius || 70) + 'px');
  stage.style.setProperty('--upw-lens-blur', (cfg.lensBlur != null ? cfg.lensBlur : 4) + 'px');
  stage.style.setProperty('--upw-radar-speed', (cfg.radarSpeed || 1.6) + 's');
  if (cfg.blend) stage.classList.add('upw-cursor-blend'); else stage.classList.remove('upw-cursor-blend');

  const added = [];
  function make(cls, base) {
    const d = document.createElement('div');
    d.className = (base === false ? '' : 'upw-cursor ') + cls;
    d.setAttribute('aria-hidden', 'true');
    stage.appendChild(d);
    added.push(d);
    return d;
  }
  function place(el, x, y) {
    el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-50%)';
  }

  const rect = () => stage.getBoundingClientRect();
  let r0 = rect();
  let mx = seed.x != null ? seed.x : r0.width / 2;
  let my = seed.y != null ? seed.y : r0.height / 2;

  const onMove = (e) => {
    r0 = rect();
    mx = e.clientX - r0.left; my = e.clientY - r0.top;
    seed.x = mx; seed.y = my;
    stage.classList.add('upw-cursor-active');
  };
  const onEnter = () => stage.classList.add('upw-cursor-active');
  const onLeave = () => stage.classList.remove('upw-cursor-active');
  stage.addEventListener('pointermove', onMove, {passive: true});
  stage.addEventListener('pointerenter', onEnter);
  stage.addEventListener('pointerleave', onLeave);

  // Hover-grow + magnetic over the demo targets inside the stage.
  const SEL = '[data-cursor-target]';
  let magEl = null;
  const onOver = (e) => {
    const t = e.target.closest ? e.target.closest(SEL) : null;
    if (t) { if (cfg.hoverGrow) stage.classList.add('upw-cursor-hover'); if (cfg.magnetic) magEl = t; }
  };
  const onOut = (e) => {
    const t = e.target.closest ? e.target.closest(SEL) : null;
    if (t) { if (cfg.hoverGrow) stage.classList.remove('upw-cursor-hover'); if (cfg.magnetic) magEl = null; }
  };
  if (cfg.hoverGrow || cfg.magnetic) {
    stage.addEventListener('pointerover', onOver, {passive: true});
    stage.addEventListener('pointerout', onOut, {passive: true});
  }
  function relRect(el) { const r = el.getBoundingClientRect(); const s = rect(); return {left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height}; }
  function pos() {
    if (cfg.magnetic && magEl) {
      const r = relRect(magEl);
      return {x: mx + (r.left + r.width / 2 - mx) * 0.35, y: my + (r.top + r.height / 2 - my) * 0.35};
    }
    return {x: mx, y: my};
  }

  let raf = 0;
  const loop = (fn) => { const run = (t) => { fn(t); raf = requestAnimationFrame(run); }; raf = requestAnimationFrame(run); };

  const dash = style.replace(/_/g, '-');
  const SWARM = {echo: 1, firefly: 1, confetti: 1, bubble: 1};

  if (style === 'spring') spring();
  else if (style === 'elastic') elastic();
  else if (style === 'comet') comet();
  else if (style === 'particles') particles();
  else if (style === 'streak') streak();
  else if (style === 'rope') rope();
  else if (style === 'arrow') arrow();
  else if (style === 'spotlight') spotlight();
  else if (style === 'sticky') sticky();
  else if (SWARM[style]) swarm(style);
  else shapes();

  // click FX
  const onDown = (e) => {
    r0 = rect();
    const x = e.clientX - r0.left, y = e.clientY - r0.top;
    if (cfg.clickRipple) { const rp = make('upw-cursor-click-ripple', false); rp.style.left = x + 'px'; rp.style.top = y + 'px'; rp.addEventListener('animationend', () => rp.remove()); }
    if (cfg.clickBurst) {
      for (let i = 0; i < 8; i++) {
        const ang = Math.PI * 2 * i / 8;
        const s = make('upw-cursor-click-spark', false);
        const dist = 18 + Math.random() * 14;
        s.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
        s.style.setProperty('--dy', (Math.sin(ang) * dist).toFixed(1) + 'px');
        s.style.left = x + 'px'; s.style.top = y + 'px';
        s.addEventListener('animationend', () => s.remove());
      }
    }
  };
  if (cfg.clickRipple || cfg.clickBurst) stage.addEventListener('pointerdown', onDown, {passive: true});

  // ---- builders (verbatim math) ----
  function shapes() {
    const primary = make('upw-cursor--' + dash + ' upw-cursor-primary');
    if (style === 'glyph') primary.textContent = cfg.glyph || '→';
    const ring = (style === 'dot_ring') ? make('upw-cursor-ring upw-cursor-secondary') : null;
    let rx = mx, ry = my;
    loop(() => {
      const p = pos(); place(primary, p.x, p.y);
      if (ring) { rx += (p.x - rx) * trail; ry += (p.y - ry) * trail; place(ring, rx, ry); }
    });
  }
  function spring() {
    const el = make('upw-cursor--dot upw-cursor-primary');
    let x = mx, y = my, vx = 0, vy = 0; const k = 0.18, damp = 0.72;
    loop(() => { const p = pos(); vx = (vx + (p.x - x) * k) * damp; vy = (vy + (p.y - y) * k) * damp; x += vx; y += vy; place(el, x, y); });
  }
  function elastic() {
    const el = make('upw-cursor--elastic upw-cursor-primary');
    let cx = mx, cy = my, px = mx, py = my; const amt = cfg.elastic != null ? cfg.elastic : 0.5;
    loop(() => {
      const p = pos(); cx += (p.x - cx) * 0.2; cy += (p.y - cy) * 0.2;
      const dx = cx - px, dy = cy - py; px = cx; py = cy;
      const d = Math.min(0.6, (Math.sqrt(dx * dx + dy * dy) / 40) * (0.5 + amt));
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      el.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg) scale(' + (1 + d).toFixed(2) + ',' + (1 - d * 0.6).toFixed(2) + ')';
    });
  }
  function comet() {
    const head = make('upw-cursor--dot upw-cursor-primary');
    const segs = []; const N = 10;
    for (let i = 0; i < N; i++) { const s = make('upw-cursor-comet-seg'); s.style.opacity = String((1 - i / N) * 0.5); segs.push({el: s, x: mx, y: my}); }
    loop(() => {
      const p = pos(); place(head, p.x, p.y); let px = p.x, py = p.y;
      for (let i = 0; i < segs.length; i++) { const k = Math.max(0.08, 0.35 - i * 0.025); segs[i].x += (px - segs[i].x) * k; segs[i].y += (py - segs[i].y) * k; place(segs[i].el, segs[i].x, segs[i].y); px = segs[i].x; py = segs[i].y; }
    });
  }
  function particles() {
    const head = make('upw-cursor--dot upw-cursor-primary');
    const N = Math.max(3, Math.min(24, cfg.count || 8)), pool = [];
    for (let i = 0; i < N; i++) { pool.push({el: make('upw-cursor-particle'), life: 0, x: mx, y: my, vx: 0, vy: 0}); }
    let idx = 0, last = 0;
    loop((t) => {
      const pp = pos(); place(head, pp.x, pp.y);
      if (!last) last = t;
      if (t - last > 38) { last = t; const q = pool[idx % N]; idx++; q.x = pp.x; q.y = pp.y; q.life = 1; q.vx = (Math.random() - 0.5) * 0.7; q.vy = (Math.random() - 0.5) * 0.7 - 0.15; }
      for (let i = 0; i < N; i++) { const s = pool[i]; if (s.life > 0) { s.life = Math.max(0, s.life - 0.03); s.x += s.vx; s.y += s.vy; s.el.style.opacity = String(s.life * 0.8); s.el.style.transform = 'translate(' + s.x.toFixed(1) + 'px,' + s.y.toFixed(1) + 'px) translate(-50%,-50%) scale(' + (0.3 + s.life * 0.7).toFixed(2) + ')'; } }
    });
  }
  function streak() {
    const el = make('upw-cursor--streak upw-cursor-primary');
    let cx = mx, cy = my, px = mx, py = my;
    loop(() => {
      const p = pos(); cx += (p.x - cx) * 0.25; cy += (p.y - cy) * 0.25;
      const dx = cx - px, dy = cy - py; px = cx; py = cy;
      const spd = Math.min(1.4, Math.sqrt(dx * dx + dy * dy) / 22);
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      el.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg) scale(' + (1 + spd).toFixed(2) + ',' + (1 - spd * 0.4).toFixed(2) + ')';
    });
  }
  function rope() {
    const line = make('upw-cursor--rope', false);
    const head = make('upw-cursor--dot upw-cursor-primary');
    let tx = mx, ty = my;
    loop(() => {
      const p = pos(); place(head, p.x, p.y);
      tx += (p.x - tx) * 0.2; ty += (p.y - ty) * 0.2;
      const dx = p.x - tx, dy = p.y - ty, len = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
      line.style.width = len.toFixed(1) + 'px';
      line.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + ang.toFixed(1) + 'deg)';
    });
  }
  function arrow() {
    const el = make('upw-cursor--arrow upw-cursor-primary');
    let cx = mx, cy = my, ang = 0;
    loop(() => {
      const p = pos(); const dx = p.x - cx, dy = p.y - cy; cx += dx * 0.25; cy += dy * 0.25;
      if (Math.abs(dx) + Math.abs(dy) > 0.6) ang = Math.atan2(dy, dx) * 180 / Math.PI;
      el.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg)';
    });
  }
  function spotlight() {
    const ov = make('upw-cursor-spotlight', false);
    ov.style.setProperty('--spot-r', (cfg.spotRadius || 160) + 'px');
    ov.style.setProperty('--spot-dim', String(cfg.spotDim != null ? cfg.spotDim : 0.6));
    loop(() => { ov.style.setProperty('--spot-x', mx + 'px'); ov.style.setProperty('--spot-y', my + 'px'); });
  }
  function sticky() {
    const el = make('upw-cursor--sticky upw-cursor-primary');
    let target = null;
    const so = (e) => { const t = e.target.closest ? e.target.closest(SEL) : null; if (t) target = t; };
    const sx = (e) => { const t = e.target.closest ? e.target.closest(SEL) : null; if (t) target = null; };
    stage.addEventListener('pointerover', so, {passive: true});
    stage.addEventListener('pointerout', sx, {passive: true});
    added.push({remove: () => { stage.removeEventListener('pointerover', so); stage.removeEventListener('pointerout', sx); }});
    let x = mx, y = my;
    loop(() => {
      if (target) {
        const r = relRect(target);
        x += (r.left + r.width / 2 - x) * 0.2; y += (r.top + r.height / 2 - y) * 0.2;
        el.style.width = (r.width + 14) + 'px'; el.style.height = (r.height + 14) + 'px';
        el.style.borderRadius = (parseFloat(getComputedStyle(target).borderRadius) || 6) + 6 + 'px';
        el.classList.add('is-stuck');
      } else {
        x += (mx - x) * 0.3; y += (my - y) * 0.3;
        el.style.width = ''; el.style.height = ''; el.style.borderRadius = ''; el.classList.remove('is-stuck');
      }
      place(el, x, y);
    });
  }
  function swarm(kind) {
    const PALETTE = ['#2f74e6', '#e0447d', '#f5a524', '#17c964', '#9353d3', '#ff6b6b', '#00c2b2'];
    const head = make('upw-cursor--dot upw-cursor-primary');
    if (kind === 'firefly' || kind === 'bubble') head.style.opacity = '0';
    const N = Math.max(3, Math.min(30, cfg.count || 10)), pool = [];
    for (let i = 0; i < N; i++) pool.push({el: make('upw-cursor-p upw-cursor-p-' + kind), life: 0, x: mx, y: my, vx: 0, vy: 0, rot: 0, vr: 0});
    let idx = 0, last = 0; const spawnMs = (kind === 'confetti') ? 30 : 45;
    loop((t) => {
      const pp = pos(); if (kind === 'echo') place(head, pp.x, pp.y);
      if (!last) last = t;
      if (t - last > spawnMs) {
        last = t; const q = pool[idx % N]; idx++;
        q.x = pp.x; q.y = pp.y; q.life = 1; q.rot = Math.random() * 360;
        if (kind === 'echo') { q.vx = 0; q.vy = 0; q.vr = 0; }
        else if (kind === 'firefly') { q.vx = (Math.random() - 0.5) * 1.2; q.vy = (Math.random() - 0.5) * 1.2; q.vr = 0; }
        else if (kind === 'confetti') { q.vx = (Math.random() - 0.5) * 3; q.vy = -Math.random() * 2 - 0.5; q.vr = (Math.random() - 0.5) * 24; if (cfg.confettiMulti) q.el.style.backgroundColor = PALETTE[(Math.random() * PALETTE.length) | 0]; }
        else if (kind === 'bubble') { q.vx = (Math.random() - 0.5) * 0.8; q.vy = -Math.random() * 1.2 - 0.4; q.vr = 0; }
      }
      for (let i = 0; i < N; i++) {
        const s = pool[i]; if (s.life <= 0) continue;
        s.life = Math.max(0, s.life - (kind === 'confetti' ? 0.018 : 0.028));
        if (kind === 'confetti') s.vy += 0.12;
        s.x += s.vx; s.y += s.vy; s.rot += s.vr;
        const sc = kind === 'echo' ? (0.4 + s.life * 0.9) : (0.4 + s.life * 0.6);
        const flick = kind === 'firefly' ? (0.55 + 0.45 * Math.abs(Math.sin((s.life + i) * 6))) : 1;
        s.el.style.opacity = String(s.life * (kind === 'echo' ? 0.55 : 0.85) * flick);
        s.el.style.transform = 'translate(' + s.x.toFixed(1) + 'px,' + s.y.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + s.rot.toFixed(0) + 'deg) scale(' + sc.toFixed(2) + ')';
      }
    });
  }

  return function teardown() {
    cancelAnimationFrame(raf);
    stage.removeEventListener('pointermove', onMove);
    stage.removeEventListener('pointerenter', onEnter);
    stage.removeEventListener('pointerleave', onLeave);
    stage.removeEventListener('pointerover', onOver);
    stage.removeEventListener('pointerout', onOut);
    stage.removeEventListener('pointerdown', onDown);
    added.forEach((el) => el.remove());
    stage.classList.remove('upw-cursor-active', 'upw-cursor-hover', 'upw-cursor-blend');
  };
}
