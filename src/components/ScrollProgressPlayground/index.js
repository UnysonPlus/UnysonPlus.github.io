import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Scroll Progress module.
 *
 * Ports each family's real builder (static/js/families/*.js) — the DOM + the
 * update(progress) function — and the verbatim CSS. On a real site the progress
 * is the page-scroll fraction; here a "Scroll position" slider (or an auto-scroll
 * ramp) drives update(), and the (fixed) indicator is contained in the stage.
 */

const el = (cls, tag) => { const e = document.createElement(tag || 'div'); if (cls) e.className = cls; return e; };
const corner = (p) => 'upw-sp--' + (({br: 'br', bl: 'bl', tr: 'tr', tl: 'tl'})[p] || 'br');
const DOTS_N = 5, RT_WORDS = 1400;

/* build(kind, cfg) → { root, update(progress) }. Faithful port of the family builders. */
function build(kind, cfg) {
  const color = cfg.color || '#2f74e6', pos = cfg.position || '';
  if (['bar', 'gradient', 'glow', 'segments', 'pill', 'labeled', 'liquid'].indexOf(kind) >= 0) {
    const p = pos === 'bottom' ? 'bottom' : 'top';
    const root = el('upw-sp upw-sp--bar upw-sp--' + p + ' upw-sp--' + kind);
    root.style.height = (cfg.thickness || 4) + 'px';
    const fill = el('upw-sp-fill'); root.appendChild(fill);
    fill.style.background = kind === 'gradient' ? `linear-gradient(90deg,${color},${cfg.color2 || '#c56cff'})` : color;
    let glow, label;
    if (kind === 'glow') { glow = el('upw-sp-glow'); glow.style.background = color; glow.style.color = color; root.appendChild(glow); }
    if (kind === 'labeled') { label = el('upw-sp-label'); root.appendChild(label); }
    if (kind === 'segments') { root.style.setProperty('--seg-w', (100 / Math.max(2, cfg.segments || 12)) + '%'); }
    return {root, update: (prog) => {
      if (kind === 'segments') { const n = Math.max(2, cfg.segments || 12); fill.style.width = (Math.round(prog * n) / n * 100).toFixed(2) + '%'; }
      else fill.style.width = (prog * 100).toFixed(2) + '%';
      if (glow) glow.style.left = `calc(${(prog * 100).toFixed(2)}% - 4px)`;
      if (label) { label.textContent = Math.round(prog * 100) + '%'; label.style.left = `calc(${(prog * 100).toFixed(2)}% + 8px)`; }
    }};
  }
  if (kind === 'under_nav') {
    const r1 = el('upw-sp upw-sp--bar upw-sp--top'); r1.style.height = (cfg.thickness || 4) + 'px'; r1.style.top = (cfg.offset || 60) + 'px';
    const f1 = el('upw-sp-fill'); f1.style.background = color; r1.appendChild(f1);
    return {root: r1, update: (prog) => { f1.style.width = (prog * 100).toFixed(2) + '%'; }};
  }
  if (kind === 'edge') {
    const side = pos === 'left' ? 'left' : 'right';
    const r2 = el('upw-sp upw-sp--edge upw-sp--' + side); r2.style.width = (cfg.thickness || 4) + 'px';
    const f2 = el('upw-sp-fill-v'); f2.style.background = color; r2.appendChild(f2);
    return {root: r2, update: (prog) => { f2.style.height = (prog * 100).toFixed(2) + '%'; }};
  }
  if (kind === 'ring' || kind === 'ring_number') {
    const sz = cfg.size || 56, r = (sz - 8) / 2, c = sz / 2, circ = 2 * Math.PI * r;
    const root = el('upw-sp upw-sp--circle ' + corner(pos)); root.style.width = sz + 'px'; root.style.height = sz + 'px'; root.style.color = color;
    root.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}"><circle class="upw-sp-track" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="5"/><circle class="upw-sp-ring" cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" transform="rotate(-90 ${c} ${c})" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${circ.toFixed(1)}"/></svg>` + (kind === 'ring_number' ? '<span class="upw-sp-num">0</span>' : '<span class="upw-sp-arrow">&#8593;</span>');
    const ring = root.querySelector('.upw-sp-ring'), num = root.querySelector('.upw-sp-num');
    if (cfg.clickTop) { root.style.cursor = 'pointer'; root.setAttribute('role', 'button'); }
    return {root, update: (prog) => { ring.setAttribute('stroke-dashoffset', (circ * (1 - prog)).toFixed(1)); if (num) num.textContent = Math.round(prog * 100); }};
  }
  if (kind === 'gauge') {
    const gs = cfg.size || 56, gr = (gs - 12) / 2, gc = gs / 2, half = Math.PI * gr, gy = gr + 6, gh = Math.round(gs * 0.62);
    const root = el('upw-sp upw-sp--gauge ' + corner(pos)); root.style.width = gs + 'px'; root.style.height = gh + 'px'; root.style.color = color;
    const d = `M6 ${gy} A ${gr} ${gr} 0 0 1 ${gs - 6} ${gy}`;
    root.innerHTML = `<svg width="${gs}" height="${gh}" viewBox="0 0 ${gs} ${gh}"><path class="upw-sp-track" d="${d}" fill="none" stroke-width="6" stroke-linecap="round"/><path class="upw-sp-arc" d="${d}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${half.toFixed(1)}" stroke-dashoffset="${half.toFixed(1)}"/></svg>`;
    const arc = root.querySelector('.upw-sp-arc');
    return {root, update: (prog) => { arc.setAttribute('stroke-dashoffset', (half * (1 - prog)).toFixed(1)); }};
  }
  if (kind === 'battery') {
    const root = el('upw-sp upw-sp--battery ' + corner(pos)); root.style.color = color;
    root.innerHTML = `<span class="upw-sp-bat"><span class="upw-sp-bat-fill" style="background:${color}"></span></span><span class="upw-sp-bat-tip"></span>`;
    const bf = root.querySelector('.upw-sp-bat-fill');
    return {root, update: (prog) => { bf.style.width = (prog * 100).toFixed(1) + '%'; }};
  }
  if (kind === 'counter') {
    const root = el('upw-sp upw-sp--chip ' + corner(pos)); root.style.background = color; root.textContent = '0%';
    return {root, update: (prog) => { root.textContent = Math.round(prog * 100) + '%'; }};
  }
  if (kind === 'reading_time') {
    const root = el('upw-sp upw-sp--chip upw-sp--time ' + corner(pos)); root.style.background = color;
    const wpm = cfg.wpm || 220;
    root.innerHTML = '<span class="upw-sp-clock"></span><span class="upw-sp-t"></span>';
    const tt = root.querySelector('.upw-sp-t');
    return {root, update: (prog) => { const rem = Math.ceil(RT_WORDS * (1 - prog) / wpm); tt.textContent = rem <= 0 ? 'Done' : `~${rem} min left`; }};
  }
  if (kind === 'dots') {
    const side = pos === 'left' ? 'left' : 'right';
    const root = el('upw-sp upw-sp--dots upw-sp--' + side); root.style.color = color;
    const dots = []; for (let i = 0; i < DOTS_N; i++) { const dd = el('upw-sp-dot'); root.appendChild(dd); dots.push(dd); }
    return {root, update: (prog) => { const active = Math.min(DOTS_N - 1, Math.floor(prog * DOTS_N)); dots.forEach((dd, i) => { dd.classList.toggle('is-active', i === active); dd.style.background = i <= active ? color : ''; }); }};
  }
  return null;
}

/* ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val) => ({id, label, type: 'slider', min, max, step, default: val});
const sel = (id, label, val, choices) => ({id, label, type: 'select', default: val, choices});
const col = (val) => ({id: 'color', label: 'Color', type: 'color', default: val});
const hideTop = {id: 'hide_top', label: 'Hide at top', type: 'switch', on: 'yes', off: 'no', default: 'yes'};
const clickTop = {id: 'click_top', label: 'Click → top', type: 'switch', on: 'yes', off: 'no', default: 'yes'};
const posTB = sel('position', 'Position', 'top', [['top', 'Top of page'], ['bottom', 'Bottom of page']]);
const posLR = sel('position', 'Side', 'right', [['right', 'Right edge'], ['left', 'Left edge']]);
const posCnr = sel('position', 'Position', 'br', [['br', 'Bottom-right'], ['bl', 'Bottom-left']]);
const posCnr4 = sel('position', 'Position', 'br', [['br', 'Bottom-right'], ['bl', 'Bottom-left'], ['tr', 'Top-right'], ['tl', 'Top-left']]);
const thick = sl('thickness', 'Thickness (px)', 2, 14, 1, 4);
const size = sl('size', 'Size (px)', 32, 96, 2, 56);
const bar = [posTB, col('#2f74e6'), thick, hideTop];

const CTRL = {
  bar, glow: bar, pill: bar, labeled: bar, liquid: bar,
  gradient: [posTB, {id: 'color', label: 'Color (start)', type: 'color', default: '#6a8dff'}, {id: 'color2', label: 'Color (end)', type: 'color', default: '#c56cff'}, thick, hideTop],
  segments: [posTB, col('#2f74e6'), thick, sl('segments', 'Segments', 4, 30, 1, 12), hideTop],
  under_nav: [col('#2f74e6'), thick, sl('offset', 'Top offset (px)', 0, 200, 2, 60), hideTop],
  edge: [posLR, col('#2f74e6'), thick, hideTop],
  ring: [col('#2f74e6'), size, posCnr, clickTop, hideTop],
  ring_number: [col('#2f74e6'), size, posCnr, clickTop, hideTop],
  gauge: [col('#2f74e6'), size, posCnr, hideTop],
  battery: [col('#2f74e6'), size, posCnr, hideTop],
  counter: [col('#2f74e6'), posCnr4, hideTop],
  reading_time: [col('#0e1524'), posCnr4, sl('wpm', 'Words per minute', 120, 400, 10, 220), hideTop],
  dots: [posLR, col('#2f74e6'), hideTop],
};
const GROUPS = [
  ['Bars', [['bar', 'Bar'], ['gradient', 'Gradient bar'], ['glow', 'Glow edge'], ['segments', 'Segments'], ['pill', 'Pill'], ['labeled', '% label bar'], ['liquid', 'Liquid bar'], ['under_nav', 'Under-nav bar'], ['edge', 'Side edge']]],
  ['Rings', [['ring', 'Ring'], ['ring_number', 'Ring + %'], ['gauge', 'Gauge']]],
  ['Chips & battery', [['battery', 'Battery'], ['counter', '% Counter'], ['reading_time', 'Time left']]],
  ['Sections', [['dots', 'Section dots']]],
];
const LABELS = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const isNum = (kind, id) => (CTRL[kind].find((c) => c.id === id) || {}).type === 'slider';
const defaultsFor = (kind) => Object.fromEntries(CTRL[kind].map((c) => [c.id, c.default]));

function cfgFrom(kind, o) {
  return {kind, color: o.color, color2: o.color2, thickness: Number(o.thickness) || 4, size: Number(o.size) || 56, segments: Number(o.segments) || 12, offset: Number(o.offset) || 60, wpm: Number(o.wpm) || 220, position: o.position || '', clickTop: o.click_top !== 'no'};
}
function buildPhp(kind, o) {
  const val = (k) => (k === 'color' || k === 'color2') ? `[ 'predefined' => '', 'custom' => '${o[k]}' ]` : (isNum(kind, k) ? Number(o[k]) : `'${o[k]}'`);
  const inner = Object.keys(o).map((k) => `            '${k}' => ${val(k)},`).join('\n');
  return `// Theme Settings → Animations → Scroll Progress
'animation_scrollprog' => [ 'enable' => 'yes' ],
'scrollprog' => [
    'kind' => '${kind}',
    '${kind}' => [
${inner}
    ],
],`;
}

export default function ScrollProgressPlayground() {
  const [kind, setKind] = useState('bar');
  const [o, setO] = useState(() => defaultsFor('bar'));
  const [auto, setAuto] = useState('yes');
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const progRef = useRef(0.35);
  const autoRef = useRef(true);
  const sliderRef = useRef(null);
  const set = (id, v) => setO((p) => ({...p, [id]: v}));
  const pick = (k) => { setKind(k); setO(defaultsFor(k)); };

  // (Re)build the indicator when the style or its options change.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    host.innerHTML = '';
    const api = build(kind, cfgFrom(kind, o));
    if (api) { host.appendChild(api.root); apiRef.current = api; api.update(progRef.current); }
    return () => { host.innerHTML = ''; apiRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, JSON.stringify(o)]);

  // One rAF loop: advance progress when auto, and drive the indicator every frame.
  useEffect(() => {
    let raf = 0, last = 0, cancelled = false;
    const tick = (t) => {
      if (cancelled) return;
      if (!last) last = t;
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      if (autoRef.current) { let n = progRef.current + dt * 0.16; if (n > 1) n = 0; progRef.current = n; if (sliderRef.current) sliderRef.current.value = Math.round(n * 100); }
      if (apiRef.current) apiRef.current.update(progRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, []);

  const onScrub = (e) => { progRef.current = Number(e.target.value) / 100; autoRef.current = false; setAuto('no'); if (apiRef.current) apiRef.current.update(progRef.current); };
  const setAutoMode = (v) => { setAuto(v); autoRef.current = v === 'yes'; };

  return (
    <div className={styles.playground}>
      <style>{SP_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div className={styles.mock}>
              <div className={styles.mockTitle} />
              <div className={styles.mockBar} style={{width: '92%'}} />
              <div className={styles.mockBar} style={{width: '85%'}} />
              <div className={styles.mockBar} style={{width: '70%'}} />
              <div className={styles.mockBar} style={{width: '80%'}} />
            </div>
            <div className={`${styles.host} sp-demo`} ref={hostRef} />
            <div className={styles.hint}>{kind === 'dots' ? 'section scroll-spy (5 sample sections)' : 'drag “Scroll position” below to simulate scrolling'}</div>
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Scroll position</span>
            <input type="range" min={0} max={100} step={1} defaultValue={35} ref={sliderRef} onInput={onScrub} onChange={onScrub} />
            <div className={styles.toggle}>
              <button type="button" className={auto === 'no' ? styles.on : ''} onClick={() => setAutoMode('no')}>Manual</button>
              <button type="button" className={auto === 'yes' ? styles.on : ''} onClick={() => setAutoMode('yes')}>Auto</button>
            </div>
          </div>

          <div className={styles.controls}>
            <h5>{LABELS[kind]} — options</h5>
            {CTRL[kind].map((c) => (
              <div className={styles.control} key={c.id}>
                {c.type === 'slider' && (<><label>{c.label} <span>{o[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={o[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                {c.type === 'select' && (<><label>{c.label}</label>
                  <select className={styles.select} value={o[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                {c.type === 'color' && (<><label>{c.label} <span>{o[c.id]}</span></label>
                  <input type="color" className={styles.color} value={o[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                {c.type === 'switch' && (<><label>{c.label}</label><div className={styles.toggle}>
                  <button type="button" className={o[c.id] === c.off ? styles.on : ''} onClick={() => set(c.id, c.off)}>Off</button>
                  <button type="button" className={o[c.id] === c.on ? styles.on : ''} onClick={() => set(c.id, c.on)}>On</button></div></>)}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            {GROUPS.map(([label, ks]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {ks.map(([k, l]) => (
                    <button key={k} type="button" className={k === kind ? styles.tabActive : styles.tab} onClick={() => pick(k)}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Theme Settings values — update as you tweak</div>
        <pre><code>{buildPhp(kind, o)}</code></pre>
        <p className={styles.note}>Colors use the theme <strong>color-preset picker</strong> (they store <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code>); the resolved color is shown here.</p>
      </div>
    </div>
  );
}

/* base.css + every family CSS, verbatim; the (fixed) indicator is contained in the stage. */
const SP_CSS = `
.sp-demo .upw-sp { position: absolute; z-index: 3; }
.sp-demo .upw-sp--edge { height: 100%; }
.upw-sp--top { top: 0; } .upw-sp--bottom { bottom: 0; }
.upw-sp--br { right: 22px; bottom: 22px; } .upw-sp--bl { left: 22px; bottom: 22px; } .upw-sp--tr { right: 22px; top: 22px; } .upw-sp--tl { left: 22px; top: 22px; }
.upw-sp--bar { left: 0; width: 100%; }
.upw-sp-fill { height: 100%; width: 0; transition: width .08s linear; }
.upw-sp--glow { overflow: visible; }
.upw-sp-glow { position: absolute; top: 50%; width: 10px; height: 10px; border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 10px 2px currentColor; }
.upw-sp-label { position: absolute; top: 50%; transform: translateY(-50%); font: 700 11px/1 -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #334; background: #fff; padding: 2px 6px; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,.15); white-space: nowrap; }
.upw-sp--segments { -webkit-mask: repeating-linear-gradient(90deg, #000 0 calc(var(--seg-w,8%) - 3px), transparent calc(var(--seg-w,8%) - 3px) var(--seg-w,8%)); mask: repeating-linear-gradient(90deg, #000 0 calc(var(--seg-w,8%) - 3px), transparent calc(var(--seg-w,8%) - 3px) var(--seg-w,8%)); }
.upw-sp--pill { left: 12px; right: 12px; width: auto; border-radius: 999px; background: rgba(120,130,150,.18); }
.upw-sp--pill.upw-sp--top { top: 10px; } .upw-sp--pill.upw-sp--bottom { bottom: 10px; }
.upw-sp--pill .upw-sp-fill { border-radius: 999px; }
.upw-sp--liquid .upw-sp-fill { border-radius: 0 999px 999px 0; position: relative; overflow: hidden; }
.upw-sp--liquid .upw-sp-fill::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent); background-size: 50px 100%; animation: upw-sp-liquid 1.3s linear infinite; }
@keyframes upw-sp-liquid { to { background-position: 50px 0; } }
.upw-sp--edge { top: 0; background: rgba(120,130,150,.14); }
.upw-sp--edge.upw-sp--left { left: 0; } .upw-sp--edge.upw-sp--right { right: 0; }
.upw-sp-fill-v { position: absolute; bottom: 0; left: 0; width: 100%; height: 0; transition: height .08s linear; }
.upw-sp--circle { display: grid; place-items: center; background: #fff; border-radius: 50%; box-shadow: 0 6px 18px rgba(0,0,0,.16); }
.upw-sp--circle svg { position: absolute; inset: 0; }
.upw-sp-track { stroke: rgba(0,0,0,.12); }
.upw-sp-arrow { font-size: 15px; line-height: 1; color: currentColor; }
.upw-sp-num { font: 700 14px/1 -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #334; }
.upw-sp--gauge { background: #fff; border-radius: 10px; padding: 6px; box-shadow: 0 6px 18px rgba(0,0,0,.16); }
.upw-sp--gauge .upw-sp-track { stroke: rgba(0,0,0,.12); }
.upw-sp--battery { display: flex; align-items: center; }
.upw-sp-bat { width: 46px; height: 20px; border: 2px solid currentColor; border-radius: 4px; padding: 2px; box-sizing: border-box; background: #fff; }
.upw-sp-bat-fill { display: block; height: 100%; width: 0; border-radius: 1px; transition: width .1s linear; }
.upw-sp-bat-tip { width: 4px; height: 9px; border-radius: 0 2px 2px 0; background: currentColor; }
.upw-sp--chip { display: inline-flex; align-items: center; gap: 6px; color: #fff; font: 700 12px/1 -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 18px rgba(0,0,0,.18); }
.upw-sp--time { font-weight: 600; }
.upw-sp-clock { width: 12px; height: 12px; border: 2px solid currentColor; border-radius: 50%; position: relative; opacity: .85; }
.upw-sp-clock::after { content: ''; position: absolute; left: 50%; top: 2px; width: 1.5px; height: 4px; background: currentColor; }
.upw-sp--dots { top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; }
.upw-sp--dots.upw-sp--right { right: 16px; } .upw-sp--dots.upw-sp--left { left: 16px; }
.upw-sp-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(120,130,150,.4); cursor: pointer; transition: transform .2s ease, background .2s ease; }
.upw-sp-dot.is-active { transform: scale(1.5); }
`;
