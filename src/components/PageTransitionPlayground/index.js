import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Page Transitions module.
 *
 * Ports the module's real overlay markup (page-transitions-enqueue.php) + the
 * reveal/cover mechanism (entrance is CSS-auto; navigation adds `.is-exiting`).
 * Uses the verbatim base.css + every effects/*.css and the exact data-attr / var
 * mapping from upw_pt_resolve(). The (full-screen, fixed) overlay is contained in
 * the demo stage and loops reveal → cover so both directions are shown.
 */

const TILES = [
  ['fade', 'Fade'], ['slide', 'Slide'], ['zoom', 'Zoom'], ['rotate', 'Rotate'], ['curtain', 'Curtain'],
  ['doors', 'Doors'], ['split', 'Split'], ['wipe', 'Wipe'], ['diagonal', 'Diagonal'], ['bars', 'Bars'],
  ['stripes', 'Stripes'], ['blinds', 'Blinds'], ['reveal', 'Circle Reveal'], ['shape', 'Shape'], ['iris', 'Iris'],
  ['glitch', 'Glitch'], ['flip', 'Flip 3D'], ['checkerboard', 'Checkerboard'], ['pixels', 'Pixel Dissolve'],
  ['ripple', 'Ripple'], ['conic', 'Conic Wipe'], ['morph', 'Morph Blob'], ['contentfade', 'Content Fade'],
];

// Per-type reveal options (mirrors the multi-picker `choices` + upw_pt_resolve()).
const TYPE_OPTS = {
  slide: {dir: {label: 'Direction', def: 'up', choices: [['up', 'Up'], ['down', 'Down'], ['left', 'Left'], ['right', 'Right']]}},
  wipe: {dir: {label: 'Direction', def: 'left', choices: [['left', 'Left'], ['right', 'Right'], ['up', 'Up'], ['down', 'Down']]}},
  curtain: {dir: {label: 'Split', def: 'vertical', choices: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']]}},
  split: {dir: {label: 'Split', def: 'vertical', choices: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']]}},
  reveal: {dir: {label: 'Origin', def: 'center', choices: [['center', 'Center'], ['tl', 'Top-left'], ['tr', 'Top-right'], ['bl', 'Bottom-left'], ['br', 'Bottom-right']]}},
  diagonal: {dir: {label: 'Direction', def: 'tlbr', choices: [['tlbr', 'Top-left → Bottom-right'], ['trbl', 'Top-right → Bottom-left']]}},
  shape: {dir: {label: 'Shape', def: 'circle', choices: [['circle', 'Circle'], ['square', 'Square'], ['diamond', 'Diamond']]}},
  flip: {dir: {label: 'Axis', def: 'y', choices: [['y', 'Vertical (Y)'], ['x', 'Horizontal (X)']]}},
  blinds: {dir: {label: 'Orientation', def: 'vertical', choices: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']]}, count: {label: 'Strips', min: 3, max: 10, step: 1, def: 6}},
  checkerboard: {density: {label: 'Columns', min: 8, max: 20, step: 1, def: 12}},
  pixels: {density: {label: 'Columns', min: 8, max: 20, step: 1, def: 14}},
};

/* Normalize state → { type, dir, count, cols, rows, total } (mirrors upw_pt_resolve). */
function resolve(s) {
  const type = s.type, dur = Number(s.duration) || 0.6, cfg = TYPE_OPTS[type] || {};
  const dir = cfg.dir ? s.dir : '';
  let count = 0, cols = 0, rows = 0, total = dur;
  if (type === 'blinds') { count = Math.max(3, Math.min(10, Number(s.count) || 6)); total = dur + (count - 1) * 0.07; }
  else if (type === 'checkerboard' || type === 'pixels') { cols = Math.max(8, Math.min(20, Number(s.density) || 12)); rows = Math.max(4, Math.ceil(cols * 9 / 16)); count = cols; total = dur + 0.5; }
  return {type, dir, count, cols, rows, total};
}

/* Build the overlay's inner markup (mirrors the PHP builder). */
function buildInner(r) {
  if (r.type === 'blinds') { let h = ''; for (let i = 0; i < r.count; i++) h += `<span class="upw-pt__strip" style="--i:${i};"></span>`; return h; }
  if (r.type === 'checkerboard' || r.type === 'pixels') {
    const n = r.cols * r.rows; let h = '';
    for (let i = 0; i < n; i++) {
      const d = r.type === 'pixels' ? (Math.random()).toFixed(2) : (((i % r.cols) + Math.floor(i / r.cols)) % 2 ? 0.14 : 0);
      h += `<span class="upw-pt__cell" style="--d:${d}s;"></span>`;
    }
    return h;
  }
  return '<span class="upw-pt__p upw-pt__p1"></span><span class="upw-pt__p upw-pt__p2"></span>';
}

/* Loop reveal → hold → cover → hold (entrance is CSS-auto on rebuild; cover = .is-exiting). */
function runPT(overlay, r, setPhase) {
  const totalMs = r.total * 1000, PAUSE = 1100;
  let cancelled = false;
  const timers = [];
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
  const reveal = () => { overlay.classList.remove('is-exiting'); overlay.innerHTML = buildInner(r); if (setPhase) setPhase('revealing'); };
  const cover = () => { overlay.classList.add('is-exiting'); if (setPhase) setPhase('covering'); };
  const cycle = () => {
    if (cancelled) return;
    reveal();
    later(() => { if (cancelled) return; cover(); later(cycle, totalMs + PAUSE); }, totalMs + PAUSE);
  };
  cycle();
  return () => { cancelled = true; timers.forEach(clearTimeout); };
}

/* ------------------------------------------------------------------ */
const defaults = () => ({type: 'fade', dir: 'up', count: 6, density: 12, color: '#0e1524', duration: 0.6});

function buildPhp(s, r) {
  const cfg = TYPE_OPTS[s.type] || {};
  const sub = [];
  if (cfg.dir) sub.push(`'${subKey(s.type)}' => '${s.dir}'`);
  if (cfg.count) sub.push(`'count' => ${r.count}`);
  if (cfg.density) sub.push(`'density' => ${r.cols}`);
  const subLine = sub.length ? `\n        '${s.type}' => [ ${sub.join(', ')} ],` : '';
  return `'animation_pt' => [
    'enable'     => 'yes',
    'transition' => [
        'transition' => '${s.type}',${subLine}
    ],
    'color'      => [ 'predefined' => '', 'custom' => '${s.color}' ],
    'duration'   => ${Number(s.duration)},
],`;
}
function subKey(type) { return type === 'curtain' || type === 'split' ? 'split' : type === 'reveal' ? 'origin' : type === 'shape' ? 'shape' : type === 'flip' ? 'axis' : type === 'blinds' ? 'direction' : 'direction'; }

export default function PageTransitionPlayground() {
  const [s, setS] = useState(defaults);
  const [nonce, setNonce] = useState(0);
  const [phase, setPhase] = useState('revealing');
  const ref = useRef(null);
  const set = (id, v) => setS((p) => ({...p, [id]: v}));
  const pickType = (t) => { const cfg = TYPE_OPTS[t] || {}; setS((p) => ({...p, type: t, dir: cfg.dir ? cfg.dir.def : p.dir, count: cfg.count ? cfg.count.def : p.count, density: cfg.density ? cfg.density.def : p.density})); setNonce((n) => n + 1); };

  const r = resolve(s);
  const overlayStyle = {'--pt-color': s.color, '--pt-dur': `${s.duration}s`};
  if (r.type === 'blinds') overlayStyle['--pt-cells'] = r.count;
  if (r.type === 'checkerboard' || r.type === 'pixels') { overlayStyle['--pt-cols'] = r.cols; overlayStyle['--pt-rows'] = r.rows; }
  const attrs = {'data-pt-type': r.type, ...(r.dir ? {'data-pt-dir': r.dir} : {}), ...(r.count ? {'data-pt-count': r.count} : {})};

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cleanup;
    try { cleanup = runPT(el, r, setPhase); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, JSON.stringify(s)]);

  const cfg = TYPE_OPTS[s.type] || {};

  return (
    <div className={styles.playground}>
      <style>{PT_CSS}</style>

      <div className={styles.styles}>
        <span className={styles.lbl}>Transition</span>
        {TILES.map(([v, l]) => (
          <button key={v} type="button" className={v === s.type ? styles.styleActive : styles.style} onClick={() => pickType(v)}>{l}</button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={`${styles.stage} pt-demo`}>
          <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>
          <div className={styles.page}>
            <div className={styles.pageTitle} />
            <div className={styles.pageBar} style={{width: '90%'}} />
            <div className={styles.pageBar} style={{width: '80%'}} />
            <div className={styles.pageBar} style={{width: '60%'}} />
          </div>
          <div className="upw-pt" ref={ref} style={overlayStyle} aria-hidden="true" {...attrs} />
          <div className={styles.phase}>{phase === 'covering' ? '← covering (navigate)' : 'revealing (page load) →'}</div>
        </div>

        <div className={styles.controls}>
          <div className={styles.groupLbl}>Transition</div>
          {cfg.dir && (
            <div className={styles.control}>
              <label>{cfg.dir.label}</label>
              <select className={styles.select} value={s.dir} onChange={(e) => { set('dir', e.target.value); setNonce((n) => n + 1); }}>
                {cfg.dir.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          )}
          {cfg.count && (
            <div className={styles.control}>
              <label>{cfg.count.label} <span>{s.count}</span></label>
              <input type="range" min={cfg.count.min} max={cfg.count.max} step={cfg.count.step} value={s.count} onChange={(e) => { set('count', e.target.value); setNonce((n) => n + 1); }} />
            </div>
          )}
          {cfg.density && (
            <div className={styles.control}>
              <label>{cfg.density.label} <span>{s.density}</span></label>
              <input type="range" min={cfg.density.min} max={cfg.density.max} step={cfg.density.step} value={s.density} onChange={(e) => { set('density', e.target.value); setNonce((n) => n + 1); }} />
            </div>
          )}
          {!cfg.dir && !cfg.count && !cfg.density && (
            <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: 0}}>This transition has no extra options.</p>
          )}

          <div className={styles.groupLbl}>Overlay</div>
          <div className={styles.control}>
            <label>Overlay color <span>{s.color}</span></label>
            <input type="color" className={styles.color} value={s.color} onChange={(e) => set('color', e.target.value)} />
          </div>
          <div className={styles.control}>
            <label>Duration (s) <span>{s.duration}</span></label>
            <input type="range" min={0.2} max={1.5} step={0.1} value={s.duration} onChange={(e) => set('duration', e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.code}>
        <div>Theme Settings values — update as you tweak</div>
        <pre><code>{buildPhp(s, r)}</code></pre>
      </div>
    </div>
  );
}

/* base.css + every effects/*.css, verbatim; the (fixed) overlay is scoped to the stage. */
const PT_CSS = `
@property --pt-ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
.pt-demo .upw-pt { position: absolute; inset: 0; z-index: 3; pointer-events: none; --e: cubic-bezier(.7,0,.2,1); }
.upw-pt__p, .upw-pt__strip, .upw-pt__cell { position: absolute; background: var(--pt-color,#0e1524); }
.upw-pt__p1 { inset: 0; }
.upw-pt__p2 { display: none; }
.upw-pt__cell { position: static; transform: scale(1); animation: pt-cell-in var(--pt-dur,.5s) ease backwards; animation-delay: var(--d,0s); }
.is-exiting .upw-pt__cell { animation: pt-cell-out var(--pt-dur,.5s) ease forwards; animation-delay: var(--d,0s); }
@keyframes pt-fade-in { from { opacity: 1; } }
@keyframes pt-fade-out { to { opacity: 1; } }
@keyframes pt-rev-in { from { clip-path: circle(150% at var(--o,50% 50%)); } }
@keyframes pt-rev-out { from { clip-path: circle(0% at var(--o,50% 50%)); } to { clip-path: circle(150% at var(--o,50% 50%)); } }
@keyframes pt-cell-in { to { transform: scale(0); } }
@keyframes pt-cell-out { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes pt-spin { to { transform: rotate(360deg); } }
[data-pt-type="fade"] .upw-pt__p1 { opacity: 0; animation: pt-fade-in var(--pt-dur,.6s) ease backwards; }
.is-exiting[data-pt-type="fade"] .upw-pt__p1 { animation: pt-fade-out var(--pt-dur,.6s) ease forwards; }
[data-pt-type="slide"] .upw-pt__p1 { transform: translate(var(--sx,0), var(--sy,-101%)); animation: pt-slide-in var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="slide"][data-pt-dir="up"] { --sx:0; --sy:-101%; --ex:0; --ey:101%; }
[data-pt-type="slide"][data-pt-dir="down"] { --sx:0; --sy:101%; --ex:0; --ey:-101%; }
[data-pt-type="slide"][data-pt-dir="left"] { --sx:-101%; --sy:0; --ex:101%; --ey:0; }
[data-pt-type="slide"][data-pt-dir="right"] { --sx:101%; --sy:0; --ex:-101%; --ey:0; }
.is-exiting[data-pt-type="slide"] .upw-pt__p1 { animation: pt-slide-out var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-slide-in { from { transform: translate(0,0); } }
@keyframes pt-slide-out { from { transform: translate(var(--ex,0), var(--ey,101%)); } to { transform: translate(0,0); } }
[data-pt-type="zoom"] .upw-pt__p1 { opacity: 0; transform: scale(1.5); animation: pt-zoom-in var(--pt-dur,.6s) ease backwards; }
.is-exiting[data-pt-type="zoom"] .upw-pt__p1 { animation: pt-zoom-out var(--pt-dur,.6s) ease forwards; }
@keyframes pt-zoom-in { from { opacity: 1; transform: scale(1); } }
@keyframes pt-zoom-out { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
[data-pt-type="rotate"] .upw-pt__p1 { opacity: 0; transform: rotate(30deg) scale(1.8); animation: pt-rot-in var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="rotate"] .upw-pt__p1 { animation: pt-rot-out var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-rot-in { from { opacity: 1; transform: rotate(0) scale(1); } }
@keyframes pt-rot-out { from { opacity: 0; transform: rotate(-30deg) scale(1.8); } to { opacity: 1; transform: rotate(0) scale(1); } }
[data-pt-type="curtain"] .upw-pt__p2 { display: block; }
[data-pt-type="curtain"][data-pt-dir="vertical"] .upw-pt__p1 { left: 0; right: 0; top: 0; height: 50.5%; transform: translateY(-101%); animation: pt-c-v1 var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="curtain"][data-pt-dir="vertical"] .upw-pt__p2 { left: 0; right: 0; bottom: 0; height: 50.5%; transform: translateY(101%); animation: pt-c-v2 var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="curtain"][data-pt-dir="horizontal"] .upw-pt__p1 { top: 0; bottom: 0; left: 0; width: 50.5%; transform: translateX(-101%); animation: pt-c-h1 var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="curtain"][data-pt-dir="horizontal"] .upw-pt__p2 { top: 0; bottom: 0; right: 0; width: 50.5%; transform: translateX(101%); animation: pt-c-h2 var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="curtain"][data-pt-dir="vertical"] .upw-pt__p1 { animation: pt-c-v1o var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="curtain"][data-pt-dir="vertical"] .upw-pt__p2 { animation: pt-c-v2o var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="curtain"][data-pt-dir="horizontal"] .upw-pt__p1 { animation: pt-c-h1o var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="curtain"][data-pt-dir="horizontal"] .upw-pt__p2 { animation: pt-c-h2o var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-c-v1 { from { transform: translateY(0); } } @keyframes pt-c-v2 { from { transform: translateY(0); } }
@keyframes pt-c-h1 { from { transform: translateX(0); } } @keyframes pt-c-h2 { from { transform: translateX(0); } }
@keyframes pt-c-v1o { from { transform: translateY(-101%); } } @keyframes pt-c-v2o { from { transform: translateY(101%); } }
@keyframes pt-c-h1o { from { transform: translateX(-101%); } } @keyframes pt-c-h2o { from { transform: translateX(101%); } }
[data-pt-type="doors"] { perspective: 1400px; }
[data-pt-type="doors"] .upw-pt__p2 { display: block; }
[data-pt-type="doors"] .upw-pt__p1 { top: 0; bottom: 0; left: 0; width: 50.5%; transform-origin: left; transform: rotateY(-100deg); animation: pt-d1 var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="doors"] .upw-pt__p2 { top: 0; bottom: 0; right: 0; width: 50.5%; transform-origin: right; transform: rotateY(100deg); animation: pt-d2 var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="doors"] .upw-pt__p1 { animation: pt-d1o var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="doors"] .upw-pt__p2 { animation: pt-d2o var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-d1 { from { transform: rotateY(0); } } @keyframes pt-d2 { from { transform: rotateY(0); } }
@keyframes pt-d1o { from { transform: rotateY(-100deg); } } @keyframes pt-d2o { from { transform: rotateY(100deg); } }
[data-pt-type="split"] .upw-pt__p2 { display: block; }
[data-pt-type="split"][data-pt-dir="vertical"] .upw-pt__p1 { left: 0; right: 0; top: 0; height: 50.5%; transform-origin: top; transform: scaleY(0); animation: pt-sp-v var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="split"][data-pt-dir="vertical"] .upw-pt__p2 { left: 0; right: 0; bottom: 0; height: 50.5%; transform-origin: bottom; transform: scaleY(0); animation: pt-sp-v var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="split"][data-pt-dir="horizontal"] .upw-pt__p1 { top: 0; bottom: 0; left: 0; width: 50.5%; transform-origin: left; transform: scaleX(0); animation: pt-sp-h var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="split"][data-pt-dir="horizontal"] .upw-pt__p2 { top: 0; bottom: 0; right: 0; width: 50.5%; transform-origin: right; transform: scaleX(0); animation: pt-sp-h var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="split"][data-pt-dir="vertical"] .upw-pt__p { animation: pt-sp-vo var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="split"][data-pt-dir="horizontal"] .upw-pt__p { animation: pt-sp-ho var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-sp-v { from { transform: scaleY(1); } } @keyframes pt-sp-h { from { transform: scaleX(1); } }
@keyframes pt-sp-vo { from { transform: scaleY(0); } to { transform: scaleY(1); } } @keyframes pt-sp-ho { from { transform: scaleX(0); } to { transform: scaleX(1); } }
[data-pt-type="wipe"] .upw-pt__p1 { transform: scale(0); animation: pt-wipe-in var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="wipe"][data-pt-dir="left"] { --wo: left; --ws: scaleX(0); }
[data-pt-type="wipe"][data-pt-dir="right"] { --wo: right; --ws: scaleX(0); }
[data-pt-type="wipe"][data-pt-dir="up"] { --wo: top; --ws: scaleY(0); }
[data-pt-type="wipe"][data-pt-dir="down"] { --wo: bottom; --ws: scaleY(0); }
[data-pt-type="wipe"] .upw-pt__p1 { transform-origin: var(--wo,left); transform: var(--ws,scaleX(0)); }
.is-exiting[data-pt-type="wipe"] .upw-pt__p1 { animation: pt-wipe-out var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-wipe-in { from { transform: scale(1); } }
@keyframes pt-wipe-out { from { transform: var(--ws,scaleX(0)); } to { transform: scale(1); } }
[data-pt-type="diagonal"] .upw-pt__p1 { top: -20%; bottom: -20%; left: -40%; width: 180%; transform-origin: center; animation: pt-diag-in var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="diagonal"][data-pt-dir="tlbr"] .upw-pt__p1 { transform: skewX(-18deg) translateX(-190%); }
[data-pt-type="diagonal"][data-pt-dir="trbl"] .upw-pt__p1 { transform: skewX(18deg) translateX(190%); }
[data-pt-type="diagonal"][data-pt-dir="tlbr"] { --dsk: -18deg; } [data-pt-type="diagonal"][data-pt-dir="trbl"] { --dsk: 18deg; }
.is-exiting[data-pt-type="diagonal"] .upw-pt__p1 { animation: pt-diag-out var(--pt-dur,.6s) var(--e) forwards; }
[data-pt-type="diagonal"][data-pt-dir="tlbr"].is-exiting .upw-pt__p1 { --dfrom: 190%; }
[data-pt-type="diagonal"][data-pt-dir="trbl"].is-exiting .upw-pt__p1 { --dfrom: -190%; }
@keyframes pt-diag-in { from { transform: skewX(var(--dsk,-18deg)) translateX(0); } }
@keyframes pt-diag-out { from { transform: skewX(var(--dsk,-18deg)) translateX(var(--dfrom,190%)); } to { transform: skewX(var(--dsk,-18deg)) translateX(0); } }
[data-pt-type="bars"] .upw-pt__p2 { display: block; }
[data-pt-type="bars"] .upw-pt__p1 { top: 0; bottom: 0; left: 0; width: 50.5%; transform-origin: left; transform: scaleX(0); animation: pt-bar var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="bars"] .upw-pt__p2 { top: 0; bottom: 0; right: 0; width: 50.5%; transform-origin: right; transform: scaleX(0); animation: pt-bar var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="bars"] .upw-pt__p { animation: pt-bar-o var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-bar { from { transform: scaleX(1); } } @keyframes pt-bar-o { from { transform: scaleX(0); } to { transform: scaleX(1); } }
[data-pt-type="stripes"] .upw-pt__p1 { top: -10%; bottom: -10%; left: -10%; right: -10%; width: auto; background: repeating-linear-gradient(45deg, var(--pt-color,#0e1524) 0 22px, color-mix(in srgb, var(--pt-color,#0e1524) 62%, #000) 22px 44px); transform: translateX(0); animation: pt-stripe-in var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="stripes"] .upw-pt__p1 { animation: pt-stripe-out var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-stripe-in { from { transform: translateX(0); } to { transform: translateX(-130%); } }
@keyframes pt-stripe-out { from { transform: translateX(130%); } to { transform: translateX(0); } }
[data-pt-type="blinds"][data-pt-dir="vertical"] .upw-pt__strip { top: 0; bottom: 0; width: calc(100% / var(--pt-cells,6) + 1px); left: calc(var(--i) * 100% / var(--pt-cells,6)); transform: scaleX(0); transform-origin: top; animation: pt-blind-v var(--pt-dur,.5s) var(--e) backwards; animation-delay: calc(var(--i) * .07s); }
[data-pt-type="blinds"][data-pt-dir="horizontal"] .upw-pt__strip { left: 0; right: 0; height: calc(100% / var(--pt-cells,6) + 1px); top: calc(var(--i) * 100% / var(--pt-cells,6)); transform: scaleY(0); transform-origin: left; animation: pt-blind-h var(--pt-dur,.5s) var(--e) backwards; animation-delay: calc(var(--i) * .07s); }
.is-exiting[data-pt-type="blinds"][data-pt-dir="vertical"] .upw-pt__strip { animation: pt-blind-vo var(--pt-dur,.5s) var(--e) forwards; animation-delay: calc(var(--i) * .07s); }
.is-exiting[data-pt-type="blinds"][data-pt-dir="horizontal"] .upw-pt__strip { animation: pt-blind-ho var(--pt-dur,.5s) var(--e) forwards; animation-delay: calc(var(--i) * .07s); }
@keyframes pt-blind-v { from { transform: scaleX(1); } } @keyframes pt-blind-h { from { transform: scaleY(1); } }
@keyframes pt-blind-vo { from { transform: scaleX(0); } to { transform: scaleX(1); } } @keyframes pt-blind-ho { from { transform: scaleY(0); } to { transform: scaleY(1); } }
[data-pt-type="reveal"] .upw-pt__p1 { clip-path: circle(0% at var(--o,50% 50%)); animation: pt-rev-in var(--pt-dur,.6s) ease backwards; }
[data-pt-type="reveal"][data-pt-dir="tl"] { --o: 0% 0%; } [data-pt-type="reveal"][data-pt-dir="tr"] { --o: 100% 0%; }
[data-pt-type="reveal"][data-pt-dir="bl"] { --o: 0% 100%; } [data-pt-type="reveal"][data-pt-dir="br"] { --o: 100% 100%; }
.is-exiting[data-pt-type="reveal"] .upw-pt__p1 { animation: pt-rev-out var(--pt-dur,.6s) ease forwards; }
[data-pt-type="shape"][data-pt-dir="circle"] .upw-pt__p1 { clip-path: circle(0% at 50% 50%); animation: pt-rev-in var(--pt-dur,.6s) ease backwards; }
[data-pt-type="shape"][data-pt-dir="circle"].is-exiting .upw-pt__p1 { animation: pt-rev-out var(--pt-dur,.6s) ease forwards; }
[data-pt-type="shape"][data-pt-dir="square"] .upw-pt__p1 { clip-path: inset(50% 50%); animation: pt-sq-in var(--pt-dur,.6s) ease backwards; }
[data-pt-type="shape"][data-pt-dir="square"].is-exiting .upw-pt__p1 { animation: pt-sq-out var(--pt-dur,.6s) ease forwards; }
[data-pt-type="shape"][data-pt-dir="diamond"] .upw-pt__p1 { clip-path: polygon(50% 50%,50% 50%,50% 50%,50% 50%); animation: pt-di-in var(--pt-dur,.6s) ease backwards; }
[data-pt-type="shape"][data-pt-dir="diamond"].is-exiting .upw-pt__p1 { animation: pt-di-out var(--pt-dur,.6s) ease forwards; }
@keyframes pt-sq-in { from { clip-path: inset(0 0); } } @keyframes pt-sq-out { from { clip-path: inset(50% 50%); } to { clip-path: inset(0 0); } }
@keyframes pt-di-in { from { clip-path: polygon(50% -60%,160% 50%,50% 160%,-60% 50%); } }
@keyframes pt-di-out { from { clip-path: polygon(50% 50%,50% 50%,50% 50%,50% 50%); } to { clip-path: polygon(50% -60%,160% 50%,50% 160%,-60% 50%); } }
[data-pt-type="iris"] .upw-pt__p1 { clip-path: circle(0% at 50% 50%); box-shadow: inset 0 0 0 4px color-mix(in srgb, var(--pt-color,#0e1524) 40%, #fff); animation: pt-rev-in var(--pt-dur,.6s) cubic-bezier(.5,0,.1,1) backwards; }
.is-exiting[data-pt-type="iris"] .upw-pt__p1 { animation: pt-rev-out var(--pt-dur,.6s) cubic-bezier(.5,0,.1,1) forwards; }
[data-pt-type="glitch"] .upw-pt__p2 { display: block; inset: 0; background: #ff00e6; mix-blend-mode: screen; opacity: 0; }
[data-pt-type="glitch"] .upw-pt__p1 { opacity: 0; animation: pt-glitch-in var(--pt-dur,.6s) steps(1) backwards; }
[data-pt-type="glitch"] .upw-pt__p2 { animation: pt-glitch-g var(--pt-dur,.6s) steps(1) backwards; }
.is-exiting[data-pt-type="glitch"] .upw-pt__p1 { animation: pt-glitch-out var(--pt-dur,.6s) steps(1) forwards; }
@keyframes pt-glitch-in { 0% { opacity: 1; transform: translateX(0); } 20% { opacity: 1; transform: translateX(-6px); } 40% { opacity: .8; transform: translateX(5px); } 60% { opacity: .6; } 80% { opacity: .3; transform: translateX(-3px); } 100% { opacity: 0; } }
@keyframes pt-glitch-g { 0%,100% { opacity: 0; } 25% { opacity: .5; transform: translateX(8px); } 55% { opacity: .35; transform: translateX(-6px); } }
@keyframes pt-glitch-out { 0% { opacity: 0; } 40% { opacity: .4; transform: translateX(6px); } 70% { opacity: .8; transform: translateX(-5px); } 100% { opacity: 1; transform: translateX(0); } }
[data-pt-type="flip"] { perspective: 1600px; }
[data-pt-type="flip"] .upw-pt__p1 { opacity: 1; backface-visibility: hidden; transform: rotateY(-95deg); animation: pt-flip-y-in var(--pt-dur,.6s) var(--e) backwards; }
[data-pt-type="flip"][data-pt-dir="x"] .upw-pt__p1 { transform: rotateX(95deg); animation-name: pt-flip-x-in; }
.is-exiting[data-pt-type="flip"] .upw-pt__p1 { animation: pt-flip-y-out var(--pt-dur,.6s) var(--e) forwards; }
.is-exiting[data-pt-type="flip"][data-pt-dir="x"] .upw-pt__p1 { animation-name: pt-flip-x-out; }
@keyframes pt-flip-y-in { from { transform: rotateY(0); } } @keyframes pt-flip-x-in { from { transform: rotateX(0); } }
@keyframes pt-flip-y-out { from { transform: rotateY(95deg); } to { transform: rotateY(0); } }
@keyframes pt-flip-x-out { from { transform: rotateX(-95deg); } to { transform: rotateX(0); } }
[data-pt-type="checkerboard"], [data-pt-type="pixels"] { display: grid; grid-template-columns: repeat(var(--pt-cols,12), 1fr); grid-template-rows: repeat(var(--pt-rows,7), 1fr); }
[data-pt-type="ripple"] .upw-pt__p1 { clip-path: circle(0% at var(--px,50%) var(--py,50%)); animation: pt-ripple-in var(--pt-dur,.6s) ease backwards; }
.is-exiting[data-pt-type="ripple"] .upw-pt__p1 { animation: pt-ripple-out var(--pt-dur,.6s) ease forwards; }
@keyframes pt-ripple-in { from { clip-path: circle(160% at 50% 50%); } }
@keyframes pt-ripple-out { from { clip-path: circle(0% at var(--px,50%) var(--py,50%)); } to { clip-path: circle(160% at var(--px,50%) var(--py,50%)); } }
[data-pt-type="conic"] .upw-pt__p1 { --pt-ang: 0deg; -webkit-mask: conic-gradient(from -90deg, #000 var(--pt-ang), transparent 0); mask: conic-gradient(from -90deg, #000 var(--pt-ang), transparent 0); animation: pt-conic-in var(--pt-dur,.6s) linear backwards; }
.is-exiting[data-pt-type="conic"] .upw-pt__p1 { animation: pt-conic-out var(--pt-dur,.6s) linear forwards; }
@keyframes pt-conic-in { from { --pt-ang: 360deg; } to { --pt-ang: 0deg; } }
@keyframes pt-conic-out { from { --pt-ang: 0deg; } to { --pt-ang: 360deg; } }
[data-pt-type="morph"] .upw-pt__p1 { inset: -25%; border-radius: 42% 58% 55% 45% / 45% 42% 58% 55%; transform: scale(0); animation: pt-morph-in var(--pt-dur,.6s) var(--e) backwards; }
.is-exiting[data-pt-type="morph"] .upw-pt__p1 { animation: pt-morph-out var(--pt-dur,.6s) var(--e) forwards; }
@keyframes pt-morph-in { from { transform: scale(1.7) rotate(0); } to { transform: scale(0) rotate(60deg); } }
@keyframes pt-morph-out { from { transform: scale(0) rotate(60deg); } to { transform: scale(1.7) rotate(0); } }
[data-pt-type="contentfade"] .upw-pt__p1 { opacity: 0; animation: pt-fade-in calc(var(--pt-dur,.6s) * .7) ease backwards; }
.is-exiting[data-pt-type="contentfade"] .upw-pt__p1 { animation: pt-fade-out calc(var(--pt-dur,.6s) * .7) ease forwards; }
`;
