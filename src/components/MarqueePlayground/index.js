import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Marquee module.
 *
 * Ports the module's real runtime (static/js/marquee.js): the seamless straight
 * ticker (cloned/doubled track translated per rAF), the curved SVG-arc text
 * mode, warp (skew / tilt / bend), wave bob, drag-with-momentum and
 * scroll-reactive speed — plus the verbatim stylesheet (static/css/marquee.css)
 * and the exact option → data mapping from marquee-render.php.
 */

const SVGNS = 'http://www.w3.org/2000/svg', XLINK = 'http://www.w3.org/1999/xlink';
const SPEED = {slow: 40, normal: 80, fast: 140};
let uid = 0;
const nowMs = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

const UNIT_HTML = '<span class="mq-unit-text">Build&nbsp;premium&nbsp;WordPress&nbsp;themes</span>';

/* Warp (skew / tilt / bend) — mirrors applyWarp() in marquee.js: perspective on
   the parent (the clip), transform on the inner target (the warp wrapper / svg). */
function applyWarp(parent, target, s, noBend) {
  const tf = [];
  const tilt = Number(s.tilt) || 0, sh = Number(s.skew_h) || 0, sv = Number(s.skew_v) || 0, bend = Number(s.bend) || 0;
  if (tilt) tf.push(`rotate(${(tilt / 100 * 18).toFixed(2)}deg)`);
  if (sh) tf.push(`skewX(${(sh / 100 * 25).toFixed(2)}deg)`);
  if (sv) tf.push(`skewY(${(sv / 100 * 25).toFixed(2)}deg)`);
  if (!noBend && bend) { parent.style.perspective = '700px'; tf.push(`rotateX(${(bend / 100 * 45).toFixed(2)}deg)`); }
  if (tf.length) target.style.transform = tf.join(' ');
}

function buildStraight(m, el, s) {
  const vertical = m.vertical, gap = Number(s.gap) || 0, sep = (s.separator || '').trim();
  const track = document.createElement('div'); track.className = 'sc-mq-track' + (vertical ? ' is-vertical' : '');
  const edge = vertical ? 'marginBottom' : 'marginRight';
  const addUnit = () => {
    const u = document.createElement('div'); u.className = 'sc-mq-unit'; u.style[edge] = gap + 'px'; u.innerHTML = UNIT_HTML; track.appendChild(u);
    if (sep) { const sp = document.createElement('div'); sp.className = 'sc-mq-sep'; sp.style[edge] = gap + 'px'; sp.textContent = sep; track.appendChild(sp); }
  };
  const warp = document.createElement('div'); warp.className = 'sc-mq-warp' + (vertical ? ' is-vertical' : ''); warp.appendChild(track);
  el.innerHTML = ''; el.appendChild(warp);
  const span = vertical ? el.clientHeight : el.clientWidth;
  const size = () => (vertical ? track.scrollHeight : track.scrollWidth);
  let g = 0;
  do { addUnit(); g++; } while (size() < Math.max(1, span) && g < 80);
  const fill = size(), pass = track.children.length;
  for (let i = 0; i < pass; i++) track.appendChild(track.children[i].cloneNode(true));
  m.apply = () => {
    const pos = ((m.offset % fill) + fill) % fill, v = m.reverse ? pos - fill : -pos;
    track.style.transform = (vertical ? 'translateY(' : 'translateX(') + v.toFixed(1) + 'px)';
  };
  applyWarp(el, warp, s, false);
  const wave = Number(s.wave) || 0;
  if (wave > 0) {
    const amp = (wave / 100 * 16).toFixed(1), us = track.querySelectorAll('.sc-mq-unit'), bd = 2.2;
    us.forEach((u, i) => { u.style.setProperty('--mq-amp', amp + 'px'); u.style.animation = `sc-mq-bob ${bd}s ease-in-out infinite`; u.style.animationDelay = (-i * (bd / 10)).toFixed(2) + 's'; });
  }
  if (s.edge_fade === 'yes') { const gr = `linear-gradient(${vertical ? '180deg' : '90deg'},transparent,#000 8%,#000 92%,transparent)`; el.style.webkitMaskImage = gr; el.style.maskImage = gr; }
}

function buildCurved(m, el, s) {
  const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize) || 32, W = el.clientWidth || 600;
  const text = (el.textContent || '').replace(/\s+/g, ' ').trim(), sep = (s.separator || '').trim();
  const curve = Number(s.curve) || 0;
  const peak = curve / 100 * (W * 0.32), absP = Math.abs(peak), up = peak >= 0;
  const H = Math.ceil(absP + fs * 1.7 + 16), y0 = up ? H - fs * 0.9 : fs * 0.9;
  const sag = Math.max(1, absP), R = (W * W / 4 + sag * sag) / (2 * sag);
  const id = 'mqpath' + ++uid;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('height', H);
  svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('class', 'sc-mq-svg');
  el.style.minHeight = H + 'px';
  const defs = document.createElementNS(SVGNS, 'defs'), path = document.createElementNS(SVGNS, 'path');
  path.setAttribute('id', id); path.setAttribute('fill', 'none');
  path.setAttribute('d', `M 0 ${y0.toFixed(1)} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 ${up ? 1 : 0} ${W} ${y0.toFixed(1)}`);
  defs.appendChild(path); svg.appendChild(defs);
  const t = document.createElementNS(SVGNS, 'text');
  t.setAttribute('fill', cs.color); t.setAttribute('font-family', cs.fontFamily);
  t.setAttribute('font-size', parseFloat(cs.fontSize)); t.setAttribute('font-weight', cs.fontWeight);
  t.setAttribute('dominant-baseline', 'middle'); t.setAttribute('letter-spacing', cs.letterSpacing === 'normal' ? '0' : cs.letterSpacing);
  if (s.text_style === 'outline') { t.setAttribute('fill', 'none'); t.setAttribute('stroke', cs.color); t.setAttribute('stroke-width', '1'); }
  const tp = document.createElementNS(SVGNS, 'textPath');
  tp.setAttributeNS(XLINK, 'href', '#' + id); tp.setAttribute('href', '#' + id);
  const unit = text + ' ' + (sep ? sep + ' ' : '');
  tp.textContent = unit; t.appendChild(tp); svg.appendChild(t);
  el.innerHTML = ''; el.appendChild(svg);
  const unitLen = (tp.getComputedTextLength && tp.getComputedTextLength()) || W * 0.5;
  const pathLen = (path.getTotalLength && path.getTotalLength()) || W;
  const reps = Math.ceil((pathLen + unitLen) / unitLen) + 1;
  let full = ''; for (let i = 0; i < reps; i++) full += unit; tp.textContent = full;
  m.apply = () => { const pos = ((m.offset % unitLen) + unitLen) % unitLen, so = m.reverse ? pos - unitLen : -pos; tp.setAttribute('startOffset', so.toFixed(1)); };
  applyWarp(el, svg, s, true);
  if (s.edge_fade === 'yes') { const gr = 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)'; el.style.webkitMaskImage = gr; el.style.maskImage = gr; }
}

function startMarquee(el, mode, s) {
  el.innerHTML = UNIT_HTML;
  el.style.cssText = '';
  const vertical = mode === 'up' || mode === 'down', reverse = mode === 'right' || mode === 'down';
  const cspeed = Number(s.custom_speed) || 0, pxs = cspeed > 0 ? cspeed : (SPEED[s.speed] || SPEED.normal);
  const curve = Number(s.curve) || 0, text = (el.textContent || '').trim();
  const m = {offset: 0, pxs, reverse, vertical, paused: false, dragging: false, momentum: 0, scrollReactive: s.scroll_reactive === 'yes', apply: () => {}};
  el.classList.add('sc-mq-live');
  if (curve !== 0 && !vertical && text) buildCurved(m, el, s);
  else buildStraight(m, el, s);

  const cleanups = [];
  if (s.pause_on_hover !== 'no') {
    const en = () => (m.paused = true), lv = () => (m.paused = false);
    el.addEventListener('mouseenter', en); el.addEventListener('mouseleave', lv);
    cleanups.push(() => { el.removeEventListener('mouseenter', en); el.removeEventListener('mouseleave', lv); });
  }
  if (s.draggable === 'yes') cleanups.push(setupDrag(m, el, vertical));

  let boost = 0, lastY = window.scrollY || 0;
  if (m.scrollReactive) {
    const onScroll = () => { const y = window.scrollY || 0; boost = Math.min(8, boost + Math.abs(y - lastY) * 0.06); lastY = y; };
    window.addEventListener('scroll', onScroll, {passive: true});
    cleanups.push(() => window.removeEventListener('scroll', onScroll));
  }

  let raf = 0, last = 0, alive = true;
  const tick = (t) => {
    if (!alive) return;
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016; last = t; boost *= 0.92;
    if (m.dragging) { m.apply(); }
    else if (!(m.paused && !m.momentum)) {
      if (m.momentum) { m.offset += m.momentum * dt; m.momentum *= 0.94; if (Math.abs(m.momentum) < 3) m.momentum = 0; }
      else m.offset += m.pxs * (1 + (m.scrollReactive ? boost : 0)) * dt;
      m.apply();
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  cleanups.push(() => cancelAnimationFrame(raf));
  return () => { alive = false; cleanups.forEach((c) => c()); };
}

function setupDrag(m, el, vertical) {
  el.classList.add('sc-mq-grab');
  let startPos = 0, startOff = 0, lastPos = 0, lastT = 0, vel = 0;
  const down = (e) => { m.dragging = true; m.momentum = 0; el.classList.add('sc-mq-grabbing');
    startPos = vertical ? e.clientY : e.clientX; startOff = m.offset; lastPos = startPos; lastT = nowMs(); vel = 0;
    if (e.pointerId != null && el.setPointerCapture) { try { el.setPointerCapture(e.pointerId); } catch (x) {} } };
  const move = (e) => { if (!m.dragging) return; const p = vertical ? e.clientY : e.clientX; m.offset = startOff - (p - startPos);
    const nt = nowMs(), d = nt - lastT; if (d > 0) { vel = -(p - lastPos) / d * 1000; lastPos = p; lastT = nt; } };
  const end = () => { if (!m.dragging) return; m.dragging = false; el.classList.remove('sc-mq-grabbing'); m.momentum = Math.max(-2500, Math.min(2500, vel)); };
  el.addEventListener('pointerdown', down); window.addEventListener('pointermove', move, {passive: true});
  window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end);
  return () => { el.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end); };
}

/* ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val, note) => ({id, label, type: 'slider', min, max, step, default: val, note});
const GROUPS = [
  ['Motion', [
    {id: 'speed', label: 'Speed', type: 'select', default: 'normal', choices: [['slow', 'Slow'], ['normal', 'Normal'], ['fast', 'Fast']]},
    sl('custom_speed', 'Custom speed (px/s)', 0, 400, 5, 0, '0 = use preset'),
    sl('gap', 'Gap (px)', 0, 200, 4, 40),
    {id: 'separator', label: 'Separator', type: 'text', default: ''},
    {id: 'text_style', label: 'Text style', type: 'select', default: 'normal', choices: [['normal', 'Normal'], ['outline', 'Outline (hollow)']]},
  ]],
  ['Behavior', [
    {id: 'pause_on_hover', label: 'Pause on hover', type: 'switch', on: 'yes', off: 'no', default: 'yes'},
    {id: 'edge_fade', label: 'Fade edges', type: 'switch', on: 'yes', off: 'no', default: 'no'},
    {id: 'scroll_reactive', label: 'React to scroll', type: 'switch', on: 'yes', off: 'no', default: 'no'},
    {id: 'draggable', label: 'Draggable', type: 'switch', on: 'yes', off: 'no', default: 'no'},
  ]],
  ['Warp & distortion', [
    sl('skew_h', 'Skew horizontal', -100, 100, 1, 0),
    sl('skew_v', 'Skew vertical', -100, 100, 1, 0),
    sl('tilt', 'Tilt (angle)', -100, 100, 1, 0),
    sl('bend', 'Bend (3D tilt)', -100, 100, 1, 0),
    sl('curve', 'Curve (arc text)', -100, 100, 1, 0, 'horizontal, text only'),
    sl('wave', 'Wave', 0, 100, 1, 0),
  ]],
];
const ALL_CONTROLS = GROUPS.flatMap(([, c]) => c);
const DIRS = [['left', 'Left'], ['right', 'Right'], ['up', 'Up'], ['down', 'Down']];
const isNum = (id) => (ALL_CONTROLS.find((c) => c.id === id) || {}).type === 'slider';
const defaults = () => Object.fromEntries(ALL_CONTROLS.map((c) => [c.id, c.default]));

function buildPhp(mode, s) {
  const rows = Object.keys(s).map((k) => {
    const v = isNum(k) ? Number(s[k]) : `'${s[k]}'`;
    return `            '${k}' => ${v},`;
  }).join('\n');
  return `'marquee' => [
    'type'  => 'multi-picker',
    'value' => [
        'mode' => '${mode}',
        '${mode}' => [
${rows}
        ],
    ],
],`;
}

export default function MarqueePlayground() {
  const [mode, setMode] = useState('left');
  const [s, setS] = useState(defaults);
  const [nonce, setNonce] = useState(0);
  const ref = useRef(null);
  const set = (id, v) => setS((p) => ({...p, [id]: v}));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cleanup;
    try { cleanup = startMarquee(el, mode, s); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, nonce, JSON.stringify(s)]);

  return (
    <div className={styles.playground}>
      <style>{MARQUEE_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div className={`sc-marquee mq-demo ${styles.marquee}`} ref={ref} />
            <div className={styles.hint}>hover to pause{s.draggable === 'yes' ? ' · drag to flick' : ''}</div>
          </div>

          <div className={styles.controls}>
          {GROUPS.map(([label, ctrls]) => (
            <div key={label}>
              <div className={styles.groupLbl}>{label}</div>
              {ctrls.map((c) => (
                <div className={styles.control} key={c.id}>
                  {c.type === 'slider' && (<><label>{c.label} <span>{s[c.id]}{c.note ? '' : ''}</span></label>
                    <input type="range" min={c.min} max={c.max} step={c.step} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                  {c.type === 'select' && (<><label>{c.label}</label>
                    <select className={styles.select} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                  {c.type === 'text' && (<><label>{c.label}</label>
                    <input type="text" className={styles.text} placeholder="e.g. •  —  ★" value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                  {c.type === 'switch' && (<><label>{c.label}</label><div className={styles.toggle}>
                    <button type="button" className={s[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                    <button type="button" className={s[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button></div></>)}
                  {c.note && <div style={{fontSize: '0.72rem', color: 'var(--ifm-color-emphasis-500)', marginTop: '0.25rem'}}>{c.note}</div>}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Direction</div>
            <div className={styles.tabPills}>
              {DIRS.map(([v, l]) => (
                <button key={v} type="button" className={v === mode ? styles.dirActive : styles.dir} onClick={() => { setMode(v); setNonce((n) => n + 1); }}>{l}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{buildPhp(mode, s)}</code></pre>
      </div>
    </div>
  );
}

/* The module's real stylesheet (static/css/marquee.css), verbatim, plus demo type sizing. */
const MARQUEE_CSS = `
.sc-marquee.sc-mq-live { overflow: hidden; display: block; }
.sc-mq-track { display: flex; flex-wrap: nowrap; width: max-content; will-change: transform; }
.sc-mq-track.is-vertical { flex-direction: column; width: auto; height: max-content; }
.sc-mq-unit, .sc-mq-sep { flex: 0 0 auto; white-space: nowrap; }
.sc-mq-sep { display: flex; align-items: center; opacity: .55; }
.sc-mq-unit > :first-child { margin-top: 0; }
.sc-mq-unit > :last-child { margin-bottom: 0; }
.sc-mq-warp { transform-origin: center center; will-change: transform; }
.sc-mq-svg { display: block; max-width: 100%; overflow: visible; }
.sc-marquee.sc-mq-grab { cursor: grab; }
.sc-marquee.sc-mq-grabbing { cursor: grabbing; user-select: none; }
.sc-marquee.sc-mq--outline .sc-mq-unit { -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px currentColor; }
@keyframes sc-mq-bob { 0%,100% { transform: translateY(calc(-1 * var(--mq-amp,0px))); } 50% { transform: translateY(var(--mq-amp,0px)); } }
.mq-demo .mq-unit-text { font-size: 2.1rem; font-weight: 800; letter-spacing: -0.01em; }
.mq-demo.sc-marquee--up, .mq-demo.sc-marquee--down { height: 220px; }
`;
