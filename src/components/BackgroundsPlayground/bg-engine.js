/*
 * Animated Backgrounds engine — a faithful port of the plugin's canvas engine + every effect
 * builder (modules/backgrounds/static/js/backgrounds-core.js, _field.js, _blob.js, effects/*.js).
 *
 * mountBg(host, effect) reads the same data-bg-* attributes / CSS vars the plugin emits, builds the
 * chosen effect's layer inside `host`, and returns a teardown fn. Every builder's canvas math is
 * copied verbatim (reduced-motion is off here so it always animates); the shared frame scheduler is
 * replaced by one local rAF loop that teardown cancels.
 */

// Verbatim CSS for the CSS-only effects + the base layer, scoped to the stage `.bgstage`.
export const BG_CSS = `
.bgstage .upw-bg-layer { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.bgstage .upw-bg-canvas { display: block; width: 100%; height: 100%; }
.bgstage .upw-bg-aurora {
  background:
    radial-gradient(40% 50% at 20% 30%, var(--bg-c1, #6a8dff) 0%, transparent 60%),
    radial-gradient(45% 55% at 80% 25%, var(--bg-c2, #c56cff) 0%, transparent 60%),
    radial-gradient(50% 60% at 50% 80%, var(--bg-c3, #00d4c8) 0%, transparent 60%);
  filter: blur(40px) saturate(1.15); opacity: .7;
  animation: upw-bg-aurora var(--bg-speed, 8s) ease-in-out infinite alternate;
}
@keyframes upw-bg-aurora { 0% { transform: translate3d(-4%, -3%, 0) scale(1.1); } 100% { transform: translate3d(4%, 3%, 0) scale(1.25); } }
.bgstage .upw-bg-conic {
  background: conic-gradient(from 0deg, var(--bg-c1, #2f74e6), var(--bg-c2, #7a3cff), var(--bg-c3, #00b2b2), var(--bg-c1, #2f74e6));
  animation: upw-bg-conic var(--bg-speed, 12s) linear infinite; opacity: .9; transform: scale(1.6);
}
@keyframes upw-bg-conic { to { transform: rotate(360deg) scale(1.6); } }
.bgstage .upw-bg-dots {
  background-image: radial-gradient(var(--bg-color, #94a3b8) var(--bg-dot, 2px), transparent var(--bg-dot, 2px));
  background-size: var(--bg-gap, 26px) var(--bg-gap, 26px); opacity: .5; animation: upw-bg-dots 22s linear infinite;
}
@keyframes upw-bg-dots { from { background-position: 0 0; } to { background-position: var(--bg-gap, 26px) var(--bg-gap, 26px); } }
.bgstage .upw-bg-gradient {
  background: linear-gradient(var(--bg-angle, 120deg), var(--bg-c1, #2f74e6), var(--bg-c2, #7a3cff), var(--bg-c3, #00b2b2), var(--bg-c1, #2f74e6));
  background-size: 300% 300%; animation: upw-bg-gradient var(--bg-speed, 10s) ease infinite;
}
@keyframes upw-bg-gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.bgstage .upw-bg-grid {
  background-image: linear-gradient(var(--bg-color, #94a3b8) 1px, transparent 1px), linear-gradient(90deg, var(--bg-color, #94a3b8) 1px, transparent 1px);
  background-size: var(--bg-gap, 40px) var(--bg-gap, 40px); opacity: .35; animation: upw-bg-grid var(--bg-speed, 12s) linear infinite;
}
@keyframes upw-bg-grid { from { background-position: 0 0; } to { background-position: 0 var(--bg-gap, 40px); } }
.bgstage .upw-bg-mesh {
  background:
    radial-gradient(35% 45% at 25% 30%, var(--bg-c1, #6a8dff) 0%, transparent 55%),
    radial-gradient(40% 45% at 75% 25%, var(--bg-c2, #ff6ac1) 0%, transparent 55%),
    radial-gradient(45% 50% at 30% 80%, var(--bg-c3, #ffd36a) 0%, transparent 55%),
    radial-gradient(45% 50% at 80% 75%, var(--bg-c4, #00d4c8) 0%, transparent 55%);
  background-size: 200% 200%; animation: upw-bg-mesh var(--bg-speed, 12s) ease-in-out infinite alternate;
}
@keyframes upw-bg-mesh { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
.bgstage .upw-bg-orbs { filter: blur(30px); }
.bgstage .upw-bg-orbs > i { position: absolute; border-radius: 50%; opacity: .6; animation: upw-bg-orb var(--bg-speed, 10s) ease-in-out infinite alternate; }
.bgstage .upw-bg-orbs > i:nth-child(1) { width: 45%; padding-bottom: 45%; left: 8%; top: 10%; background: var(--bg-c1, #6a8dff); }
.bgstage .upw-bg-orbs > i:nth-child(2) { width: 50%; padding-bottom: 50%; right: 6%; top: 20%; background: var(--bg-c2, #c56cff); animation-delay: -3s; }
.bgstage .upw-bg-orbs > i:nth-child(3) { width: 40%; padding-bottom: 40%; left: 35%; bottom: 4%; background: var(--bg-c1, #6a8dff); animation-delay: -6s; }
@keyframes upw-bg-orb { 0% { transform: translate(-8%, -6%) scale(1); } 100% { transform: translate(10%, 8%) scale(1.25); } }
.bgstage .upw-bg-rays {
  background: repeating-linear-gradient(var(--bg-angle, 25deg), transparent 0 40px, color-mix(in srgb, var(--bg-color, #fff) 14%, transparent) 40px 80px);
  background-size: 200% 200%; animation: upw-bg-rays var(--bg-speed, 10s) linear infinite; mix-blend-mode: screen;
}
@keyframes upw-bg-rays { from { background-position: 0 0; } to { background-position: 200% 0; } }
.bgstage .upw-bg-scanlines {
  background-image: repeating-linear-gradient(0deg, color-mix(in srgb, var(--bg-color, #000) calc(var(--bg-opacity, .12) * 100%), transparent) 0 1px, transparent 1px 3px);
  animation: upw-bg-scan var(--bg-speed, 6s) linear infinite;
}
@keyframes upw-bg-scan { from { background-position: 0 0; } to { background-position: 0 100px; } }
`;

export function mountBg(host, effect) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const observers = [];
  const cbs = [];
  let raf = 0;
  let dead = false;

  function cssLayer(cls) {
    const d = document.createElement('div');
    d.className = 'upw-bg-layer ' + cls; d.setAttribute('aria-hidden', 'true');
    host.insertBefore(d, host.firstChild);
    return d;
  }
  function canvasLayer() {
    const cv = document.createElement('canvas');
    cv.className = 'upw-bg-layer upw-bg-canvas'; cv.setAttribute('aria-hidden', 'true');
    host.insertBefore(cv, host.firstChild);
    const ctx = cv.getContext('2d');
    const L = {cv, ctx, w: 1, h: 1, seed: null};
    function size() {
      const r = host.getBoundingClientRect();
      L.w = Math.max(1, r.width); L.h = Math.max(1, r.height);
      cv.width = L.w * dpr; cv.height = L.h * dpr; cv.style.width = L.w + 'px'; cv.style.height = L.h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (L.seed) L.seed();
    }
    size();
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(size); ro.observe(host); observers.push(ro); }
    return L;
  }
  function loop(cb) { cbs.push(cb); }
  function num(attr, def) { const v = parseFloat(host.getAttribute(attr)); return isNaN(v) ? def : v; }
  function areaCount(density, w, h) { return Math.max(6, Math.min(400, Math.round(density * (w * h) / (1280 * 720)))); }
  function rnd(a, b) { return a + (b - a) * Math.random(); }
  const reduce = false;

  // ---------- shared field engine (_field.js) ----------
  function field(kind) {
    if (kind === 'meteors') return meteorField();
    const L = canvasLayer();
    const color = host.getAttribute('data-bg-color') || '#ffffff';
    const density = num('data-bg-density', 60), speed = num('data-bg-speed', 3);
    const variant = host.getAttribute('data-bg-variant') || 'snow';
    const PAL = ['#ff6b6b', '#f5a524', '#17c964', '#2f74e6', '#c56cff', '#00c2b2'];
    const R = (a, b) => a + (b - a) * Math.random();
    let ps = [];
    function spawn() {
      const p = {x: R(0, L.w), y: R(0, L.h), r: R(1, 3), vx: 0, vy: 0, rot: R(0, 6.28), vr: R(-0.05, 0.05), ph: R(0, 6.28), col: color};
      if (kind === 'snow') {
        if (variant === 'embers') { p.vy = -(0.3 + R(0, 0.6)) * speed * 0.4; p.r = R(1, 2.4); p.col = '#ff8a3c'; }
        else if (variant === 'petals') { p.vy = (0.25 + R(0, 0.5)) * speed * 0.4; p.r = R(3, 5); p.col = '#ff9ec7'; }
        else if (variant === 'ash') { p.vy = (0.2 + R(0, 0.4)) * speed * 0.4; p.r = R(0.8, 1.8); p.col = '#9aa4b2'; }
        else { p.vy = (0.3 + R(0, 0.6)) * speed * 0.4; p.col = '#ffffff'; }
        p.vx = R(-0.3, 0.3);
      } else if (kind === 'confetti') { p.vy = (0.5 + R(0, 1)) * speed * 0.5; p.vx = R(-1, 1); p.vr = R(-0.2, 0.2); p.w = R(4, 8); p.h = R(3, 5); p.col = PAL[(Math.random() * PAL.length) | 0]; }
      else if (kind === 'bubbles') { p.vy = -(0.3 + R(0, 0.6)) * speed * 0.4; p.vx = R(-0.2, 0.2); p.r = R(3, 10); }
      else if (kind === 'fireflies') { p.vx = R(-0.4, 0.4) * speed * 0.3; p.vy = R(-0.4, 0.4) * speed * 0.3; p.r = R(1, 2.2); }
      else if (kind === 'bokeh') { p.vx = R(-0.15, 0.15); p.vy = R(-0.15, 0.15); p.r = R(14, 42); }
      else if (kind === 'rain') { p.vy = (4 + R(0, 4)) * speed * 0.5; p.len = R(8, 18); p.x = R(-20, L.w); }
      else if (kind === 'shapes') { p.vx = R(-0.25, 0.25); p.vy = R(-0.25, 0.25); p.r = R(6, 16); p.sh = (Math.random() * 3) | 0; }
      return p;
    }
    L.seed = function () {
      ps = []; let n = areaCount(density, L.w, L.h);
      if (kind === 'bokeh') n = Math.min(n, 26);
      if (kind === 'shapes') n = Math.min(n, 44);
      for (let i = 0; i < n; i++) ps.push(spawn());
    };
    L.seed();
    function move(p) {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.ph += 0.05;
      if (kind === 'snow' || kind === 'confetti') { p.x += Math.sin(p.ph) * 0.4; if (p.y > L.h + 8) { p.y = -8; p.x = R(0, L.w); } if (p.x < -10) p.x = L.w + 10; if (p.x > L.w + 10) p.x = -10; }
      else if (kind === 'bubbles') { p.x += Math.sin(p.ph) * 0.3; if (p.y < -12) { p.y = L.h + 12; p.x = R(0, L.w); } }
      else if (kind === 'fireflies' || kind === 'bokeh' || kind === 'shapes') { if (p.x < -20) p.x = L.w + 20; if (p.x > L.w + 20) p.x = -20; if (p.y < -20) p.y = L.h + 20; if (p.y > L.h + 20) p.y = -20; }
      else if (kind === 'rain') { if (p.y > L.h + 20) { p.y = -20; p.x = R(-20, L.w); } }
    }
    function render(ctx, p) {
      ctx.fillStyle = p.col; ctx.strokeStyle = p.col;
      if (kind === 'confetti') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); }
      else if (kind === 'bubbles') { ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.stroke(); ctx.globalAlpha = 0.1; ctx.fill(); ctx.globalAlpha = 1; }
      else if (kind === 'fireflies') { ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(p.ph)); ctx.shadowColor = p.col; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
      else if (kind === 'bokeh') { ctx.globalAlpha = 0.12; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1; }
      else if (kind === 'rain') { ctx.globalAlpha = 0.4; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 1, p.y + p.len); ctx.stroke(); ctx.globalAlpha = 1; }
      else if (kind === 'shapes') { ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); if (p.sh === 0) { ctx.rect(-p.r / 2, -p.r / 2, p.r, p.r); } else if (p.sh === 1) { ctx.moveTo(0, -p.r / 2); ctx.lineTo(p.r / 2, p.r / 2); ctx.lineTo(-p.r / 2, p.r / 2); ctx.closePath(); } else { ctx.moveTo(-p.r / 2, 0); ctx.lineTo(p.r / 2, 0); ctx.moveTo(0, -p.r / 2); ctx.lineTo(0, p.r / 2); } ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1; }
      else { ctx.globalAlpha = (variant === 'ash') ? 0.5 : 0.85; if (variant === 'embers') { ctx.shadowColor = p.col; ctx.shadowBlur = 6; } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
    }
    function drawAll(anim) { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); for (let i = 0; i < ps.length; i++) { if (anim) move(ps[i]); render(ctx, ps[i]); } }
    loop(() => drawAll(true));
  }
  function meteorField() {
    const L = canvasLayer();
    const color = host.getAttribute('data-bg-color') || '#ffffff';
    const density = num('data-bg-density', 50), speed = num('data-bg-speed', 4);
    const R = (a, b) => a + (b - a) * Math.random();
    let list = [], last = 0; const interval = Math.max(280, 3200 / (density / 25));
    function draw(t) {
      const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h);
      if (t - last > interval) { last = t; list.push({x: R(0, L.w), y: -10, vx: R(2, 4) * (Math.random() < 0.5 ? -1 : 1), vy: R(4, 7) * speed * 0.4, len: R(30, 70)}); }
      for (let i = list.length - 1; i >= 0; i--) {
        const m = list[i]; m.x += m.vx * speed * 0.3; m.y += m.vy;
        const gx = m.x - m.vx * m.len * 0.12, gy = m.y - m.vy * m.len * 0.12;
        const g = ctx.createLinearGradient(m.x, m.y, gx, gy); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(gx, gy); ctx.stroke();
        if (m.y > L.h + 20) list.splice(i, 1);
      }
    }
    loop(draw);
  }
  // ---------- shared blob engine (_blob.js) ----------
  function blobField(cols, count, rmin, rmax) {
    const L = canvasLayer(), speed = num('data-bg-speed', 6); let bl = [];
    L.seed = function () { bl = []; for (let i = 0; i < count; i++) bl.push({x: rnd(0, L.w), y: rnd(0, L.h), r: rnd(rmin, rmax), vx: rnd(-0.3, 0.3) * speed * 0.25, vy: rnd(-0.3, 0.3) * speed * 0.25, c: cols[i % cols.length]}); };
    L.seed();
    function draw(anim) {
      const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < bl.length; i++) { const b = bl[i]; if (anim) { b.x += b.vx; b.y += b.vy; if (b.x < 0 || b.x > L.w) b.vx *= -1; if (b.y < 0 || b.y > L.h) b.vy *= -1; } const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.2832); ctx.fill(); }
      ctx.globalCompositeOperation = 'source-over';
    }
    loop(() => draw(true));
  }

  // ---------- per-effect builders ----------
  const ga = (a, d) => host.getAttribute(a) || d;
  const BUILD = {
    aurora: () => cssLayer('upw-bg-aurora'),
    conic: () => cssLayer('upw-bg-conic'),
    dots: () => cssLayer('upw-bg-dots'),
    gradient: () => cssLayer('upw-bg-gradient'),
    grid: () => cssLayer('upw-bg-grid'),
    mesh: () => cssLayer('upw-bg-mesh'),
    orbs: () => { const l = cssLayer('upw-bg-orbs'); l.innerHTML = '<i></i><i></i><i></i>'; },
    rays: () => cssLayer('upw-bg-rays'),
    scanlines: () => cssLayer('upw-bg-scanlines'),
    snow: () => field('snow'), confetti: () => field('confetti'), bubbles: () => field('bubbles'),
    fireflies: () => field('fireflies'), bokeh: () => field('bokeh'), rain: () => field('rain'),
    shapes: () => field('shapes'), meteors: () => field('meteors'),
    blobs: () => blobField([ga('data-bg-color', '#6a8dff'), ga('data-bg-color2', '#c56cff')], 5, 40, 90),
    nebula: () => blobField([ga('data-bg-color', '#3b3fff'), ga('data-bg-color2', '#c56cff'), ga('data-bg-color3', '#00d4c8')], 4, 70, 140),
    particles: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'); const density = num('data-bg-density', 60), speed = num('data-bg-speed', 3); let parts = [];
      L.seed = function () { parts = []; const n = areaCount(density, L.w, L.h); for (let i = 0; i < n; i++) parts.push({x: Math.random() * L.w, y: Math.random() * L.h, vx: (Math.random() - .5) * speed * .18, vy: (Math.random() - .5) * speed * .18, r: Math.random() * 1.6 + .6}); };
      L.seed();
      loop(() => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.fillStyle = color; ctx.globalAlpha = .6; for (let i = 0; i < parts.length; i++) { const p = parts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > L.w) p.vx *= -1; if (p.y < 0 || p.y > L.h) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); } ctx.globalAlpha = 1; });
    },
    constellation: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'); const density = num('data-bg-density', 55), link = num('data-bg-link', 120); let parts = [];
      L.seed = function () { parts = []; const n = areaCount(density, L.w, L.h); for (let i = 0; i < n; i++) parts.push({x: Math.random() * L.w, y: Math.random() * L.h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35}); };
      L.seed();
      loop(() => {
        const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h);
        for (let i = 0; i < parts.length; i++) { const p = parts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > L.w) p.vx *= -1; if (p.y < 0 || p.y > L.h) p.vy *= -1; }
        ctx.strokeStyle = color; ctx.lineWidth = 1;
        for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) { const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < link) { ctx.globalAlpha = (1 - d / link) * .5; ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.stroke(); } }
        ctx.globalAlpha = .8; ctx.fillStyle = color;
        for (let i = 0; i < parts.length; i++) { ctx.beginPath(); ctx.arc(parts[i].x, parts[i].y, 1.5, 0, 6.2832); ctx.fill(); }
        ctx.globalAlpha = 1;
      });
    },
    waves: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#2f74e6'); const amp = num('data-bg-amp', 30), speed = num('data-bg-speed', 6);
      loop((t) => {
        const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h);
        const layers = [{a: amp, y: .68, o: .18, s: 1}, {a: amp * .7, y: .78, o: .22, s: 1.4}, {a: amp * .5, y: .88, o: .3, s: .8}];
        for (let k = 0; k < layers.length; k++) { const ly = layers[k], base = L.h * ly.y, ph = (t / 1000) * (speed / 6) * ly.s; ctx.beginPath(); ctx.moveTo(0, L.h); for (let x = 0; x <= L.w; x += 8) ctx.lineTo(x, base + Math.sin(x / 90 + ph + k) * ly.a); ctx.lineTo(L.w, L.h); ctx.closePath(); ctx.fillStyle = color; ctx.globalAlpha = ly.o; ctx.fill(); }
        ctx.globalAlpha = 1;
      });
    },
    starfield: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#ffffff'); const density = num('data-bg-density', 120), speed = num('data-bg-speed', 4); let stars = [];
      L.seed = function () { stars = []; const n = Math.max(20, Math.min(500, density)); for (let i = 0; i < n; i++) stars.push({x: (Math.random() - .5) * L.w, y: (Math.random() - .5) * L.h, z: Math.random() * L.w}); };
      L.seed();
      loop(() => {
        const ctx = L.ctx, cx = L.w / 2, cy = L.h / 2; ctx.clearRect(0, 0, L.w, L.h); ctx.fillStyle = color;
        for (let i = 0; i < stars.length; i++) { const s = stars[i]; s.z -= speed * .6; if (s.z < 1) { s.x = (Math.random() - .5) * L.w; s.y = (Math.random() - .5) * L.h; s.z = L.w; } const k = 128 / s.z, sx = cx + s.x * k, sy = cy + s.y * k, r = (1 - s.z / L.w) * 1.8; if (sx > 0 && sx < L.w && sy > 0 && sy < L.h) { ctx.globalAlpha = Math.min(1, (1 - s.z / L.w) + .2); ctx.beginPath(); ctx.arc(sx, sy, Math.max(.4, r), 0, 6.2832); ctx.fill(); } }
        ctx.globalAlpha = 1;
      });
    },
    noise: () => {
      const L = canvasLayer(), opacity = num('data-bg-opacity', .06), speed = num('data-bg-speed', 1);
      const tile = document.createElement('canvas'); tile.width = tile.height = 90; const tctx = tile.getContext('2d');
      function regen() { const img = tctx.createImageData(90, 90), d = img.data; for (let i = 0; i < d.length; i += 4) { const v = (Math.random() * 255) | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; } tctx.putImageData(img, 0, 0); }
      regen();
      function draw() { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.globalAlpha = opacity; ctx.fillStyle = ctx.createPattern(tile, 'repeat'); ctx.fillRect(0, 0, L.w, L.h); ctx.globalAlpha = 1; }
      let last = 0; const interval = Math.max(40, 140 / speed);
      loop((t) => { if (t - last > interval) { last = t; regen(); } draw(); });
    },
    matrix: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#19ff7a'), speed = num('data-bg-speed', 6); let cols = [];
      const GL = 'ｱｲｳｴｵｶｷｸ0123456789ABCDEF';
      L.seed = function () { cols = []; const n = Math.floor(L.w / 12); for (let i = 0; i < n; i++) cols.push({y: rnd(-L.h, 0), v: rnd(2, 6) * speed * 0.3}); };
      L.seed();
      loop(() => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.font = '12px monospace'; for (let i = 0; i < cols.length; i++) { const c = cols[i]; c.y += c.v; if (c.y > L.h + 60) c.y = rnd(-L.h, 0); const x = i * 12 + 2; for (let k = 0; k < 8; k++) { const y = c.y - k * 13; if (y < 0 || y > L.h) continue; ctx.globalAlpha = Math.max(0, 1 - k / 8); ctx.fillStyle = k === 0 ? '#d6ffe6' : color; ctx.fillText(GL[(Math.random() * GL.length) | 0], x, y); } } ctx.globalAlpha = 1; });
    },
    ripple: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), speed = num('data-bg-speed', 6); let rs = [], last = 0;
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); if (t - last > 900 / (speed / 4)) { last = t; rs.push({x: rnd(0, L.w), y: rnd(0, L.h), r: 0}); } ctx.strokeStyle = color; ctx.lineWidth = 1.5; const max = Math.max(L.w, L.h); for (let i = rs.length - 1; i >= 0; i--) { const r = rs[i]; r.r += speed * 0.4; ctx.globalAlpha = Math.max(0, 1 - r.r / (max * 1.3)); ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.2832); ctx.stroke(); if (r.r > max * 1.3) rs.splice(i, 1); } ctx.globalAlpha = 1; });
    },
    flow: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), density = num('data-bg-density', 60), speed = num('data-bg-speed', 6); let ps = [];
      L.seed = function () { ps = []; const n = areaCount(density, L.w, L.h); for (let i = 0; i < n; i++) ps.push({x: rnd(0, L.w), y: rnd(0, L.h)}); };
      L.seed();
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.fillStyle = color; ctx.globalAlpha = 0.55; const tt = t * speed * 0.0002; for (let i = 0; i < ps.length; i++) { const p = ps[i], a = (Math.sin(p.x / 90 + tt) + Math.cos(p.y / 70 - tt)) * Math.PI; p.x += Math.cos(a) * 0.8; p.y += Math.sin(a) * 0.8; if (p.x < 0 || p.x > L.w || p.y < 0 || p.y > L.h) { p.x = rnd(0, L.w); p.y = rnd(0, L.h); } ctx.fillRect(p.x, p.y, 1.6, 1.6); } ctx.globalAlpha = 1; });
    },
    hexgrid: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), speed = num('data-bg-speed', 6);
      function hx(ctx, cx, cy, r) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.closePath(); }
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.strokeStyle = color; ctx.lineWidth = 1; const r = 16, dx = r * 1.5, dy = r * 1.732, cxm = L.w / 2, cym = L.h / 2; for (let col = 0; col * dx < L.w + r; col++) for (let row = 0; row * dy < L.h + r; row++) { const cx = col * dx, cy = row * dy + (col % 2 ? dy / 2 : 0), d = Math.sqrt((cx - cxm) * (cx - cxm) + (cy - cym) * (cy - cym)); ctx.globalAlpha = Math.max(0.05, 0.32 + 0.3 * Math.sin(t * speed * 0.0004 - d / 40)); hx(ctx, cx, cy, r * 0.9); ctx.stroke(); } ctx.globalAlpha = 1; });
    },
    pgrid: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#ff6ac1'), speed = num('data-bg-speed', 6); let off = 0;
      function draw() { const ctx = L.ctx, hz = L.h * 0.42, vx = L.w / 2; ctx.clearRect(0, 0, L.w, L.h); ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = 0.35; for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(vx, hz); ctx.lineTo(vx + i * (L.w / 12), L.h); ctx.stroke(); } for (let j = 0; j < 22; j++) { const t = ((j + off) % 22) / 22, y = hz + (L.h - hz) * t * t; ctx.globalAlpha = 0.5 * t + 0.05; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(L.w, y); ctx.stroke(); } ctx.globalAlpha = 1; }
      loop(() => { off = (off + speed * 0.02) % 22; draw(); });
    },
    topo: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), speed = num('data-bg-speed', 6);
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.strokeStyle = color; ctx.globalAlpha = 0.35; ctx.lineWidth = 1; const ph = t * speed * 0.0003; for (let k = 1; k <= 9; k++) { ctx.beginPath(); for (let x = 0; x <= L.w; x += 6) { const y = L.h / 2 + Math.sin(x / 70 + ph + k) * 22 + Math.sin(x / 33 + ph * 1.5) * 8 + (k - 5) * 15; if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); } ctx.globalAlpha = 1; });
    },
    circuit: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#00e5a0'); let segs = [], dots = [];
      L.seed = function () { segs = []; dots = []; const g = 34; for (let x = g; x < L.w; x += g) for (let y = g; y < L.h; y += g) { if (Math.random() < 0.5) segs.push([x, y, x + g, y]); if (Math.random() < 0.5) segs.push([x, y, x, y + g]); } for (let i = 0; i < Math.min(30, segs.length); i++) dots.push({s: (Math.random() * segs.length) | 0, p: Math.random(), v: rnd(0.01, 0.03)}); };
      L.seed();
      loop(() => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.globalAlpha = 0.16; ctx.lineWidth = 1; for (let i = 0; i < segs.length; i++) { ctx.beginPath(); ctx.moveTo(segs[i][0], segs[i][1]); ctx.lineTo(segs[i][2], segs[i][3]); ctx.stroke(); } for (let i = 0; i < segs.length; i += 3) { ctx.beginPath(); ctx.arc(segs[i][0], segs[i][1], 1.4, 0, 6.2832); ctx.fill(); } ctx.globalAlpha = 1; ctx.shadowColor = color; for (let i = 0; i < dots.length; i++) { const d = dots[i]; d.p += d.v; if (d.p > 1) { d.p = 0; d.s = (Math.random() * segs.length) | 0; } const s = segs[d.s]; if (!s) continue; ctx.shadowBlur = 6; ctx.beginPath(); ctx.arc(s[0] + (s[2] - s[0]) * d.p, s[1] + (s[3] - s[1]) * d.p, 2, 0, 6.2832); ctx.fill(); } ctx.shadowBlur = 0; });
    },
    halftone: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), gap = num('data-bg-gap', 16), speed = num('data-bg-speed', 6);
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.fillStyle = color; ctx.globalAlpha = 0.5; const ph = t * speed * 0.0006; for (let x = gap / 2; x < L.w; x += gap) for (let y = gap / 2; y < L.h; y += gap) { const d = Math.sqrt((x - L.w / 2) * (x - L.w / 2) + (y - L.h / 2) * (y - L.h / 2)), r = (gap * 0.42) * (0.5 + 0.5 * Math.sin(ph - d / 40)); ctx.beginPath(); ctx.arc(x, y, Math.max(0.3, r), 0, 6.2832); ctx.fill(); } ctx.globalAlpha = 1; });
    },
    borealis: () => {
      const L = canvasLayer(), c1 = ga('data-bg-color', '#3bffb0'), c2 = ga('data-bg-color2', '#6a8dff'), speed = num('data-bg-speed', 6);
      loop((t) => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); const ph = t * speed * 0.0003; for (let b = 0; b < 3; b++) { const baseY = L.h * (0.28 + b * 0.16); ctx.beginPath(); ctx.moveTo(0, 0); for (let x = 0; x <= L.w; x += 8) ctx.lineTo(x, baseY + Math.sin(x / 80 + ph + b) * 26 + Math.sin(x / 38 + ph * 1.4) * 10); ctx.lineTo(L.w, 0); ctx.closePath(); const g = ctx.createLinearGradient(0, baseY - 50, 0, baseY + 40); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, b % 2 ? c2 : c1); ctx.globalAlpha = 0.22; ctx.fillStyle = g; ctx.fill(); } ctx.globalAlpha = 1; });
    },
    orbits: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), count = num('data-bg-density', 4); let centers = [];
      L.seed = function () { centers = []; for (let i = 0; i < Math.min(6, count); i++) { const c = {x: rnd(L.w * 0.2, L.w * 0.8), y: rnd(L.h * 0.2, L.h * 0.8), s: []}; for (let j = 0; j < ((Math.random() * 3) | 0) + 2; j++) c.s.push({r: rnd(14, 42), a: rnd(0, 6.28), v: rnd(0.005, 0.02) * (Math.random() < 0.5 ? -1 : 1)}); centers.push(c); } };
      L.seed();
      loop(() => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); ctx.strokeStyle = color; ctx.fillStyle = color; for (let i = 0; i < centers.length; i++) { const c = centers[i]; ctx.globalAlpha = 0.15; for (let j = 0; j < c.s.length; j++) { ctx.beginPath(); ctx.arc(c.x, c.y, c.s[j].r, 0, 6.2832); ctx.stroke(); } ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(c.x, c.y, 2, 0, 6.2832); ctx.fill(); for (let j = 0; j < c.s.length; j++) { const s = c.s[j]; s.a += s.v; ctx.beginPath(); ctx.arc(c.x + s.r * Math.cos(s.a), c.y + s.r * Math.sin(s.a), 2.2, 0, 6.2832); ctx.fill(); } } ctx.globalAlpha = 1; });
    },
    spotlight: () => {
      const L = canvasLayer(), color = ga('data-bg-color', '#6aa6ff'), size = num('data-bg-size', 260);
      let mx = L.w / 2, my = L.h / 2;
      const mv = (e) => { const r = host.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
      host.addEventListener('pointermove', mv, {passive: true});
      observers.push({disconnect: () => host.removeEventListener('pointermove', mv)});
      loop(() => { const ctx = L.ctx; ctx.clearRect(0, 0, L.w, L.h); const g = ctx.createRadialGradient(mx, my, 0, mx, my, size); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha = 0.4; ctx.fillStyle = g; ctx.fillRect(0, 0, L.w, L.h); ctx.globalAlpha = 1; });
    },
  };

  const fn = BUILD[effect];
  if (fn) { try { fn(); } catch (e) { /* never break */ } }

  if (cbs.length) {
    const tick = (t) => { if (dead) return; for (let i = 0; i < cbs.length; i++) cbs[i](t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }

  return function teardown() {
    dead = true;
    cancelAnimationFrame(raf);
    observers.forEach((o) => o.disconnect());
    Array.prototype.slice.call(host.querySelectorAll('.upw-bg-layer')).forEach((el) => el.remove());
  };
}
