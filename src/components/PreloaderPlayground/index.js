import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Preloader module.
 *
 * Ports the module's real overlay markup (upw_preloader_inner) + runtime
 * (preloader.js): the loading screen shows, the counter / progress-ring ramp
 * toward 100%, then it fades (or the curtain slides) away to reveal the page.
 * Uses the verbatim preloader.css and the exact --pl-* variable mapping from
 * preloader-render.php. The (normally full-screen) overlay is contained in the
 * demo stage and loops so it always shows.
 */

const SAMPLE_LOGO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='190' height='48'><text x='0' y='36' font-family='Segoe UI,Roboto,Helvetica,Arial,sans-serif' font-size='34' font-weight='800' fill='#ffffff'>Unyson+</text></svg>`,
  );

const STYLE_LIST = [
  ['spinner', 'Spinner'], ['dual_ring', 'Dual ring'], ['gradient', 'Gradient ring'],
  ['dots', 'Bouncing dots'], ['dots_fade', 'Fading dots'], ['orbit', 'Orbit'],
  ['bars', 'Equalizer'], ['grid', 'Pulsing grid'], ['pulse', 'Pulse'], ['ripple', 'Ripple'],
  ['square', 'Flip square'], ['bar', 'Progress bar'], ['progress_ring', 'Progress ring'],
  ['counter', 'Counter'], ['curtain', 'Curtain'], ['logo', 'Logo pulse'],
];

/* Mirrors upw_preloader_inner() in preloader-helpers.php. */
function innerFor(style, hasLogo) {
  switch (style) {
    case 'dual_ring': return '<div class="upw-pl-dual"></div>';
    case 'gradient': return '<div class="upw-pl-grad"></div>';
    case 'dots': return '<div class="upw-pl-dots"><span></span><span></span><span></span></div>';
    case 'dots_fade': return '<div class="upw-pl-fade">' + '<i></i>'.repeat(8) + '</div>';
    case 'orbit': return '<div class="upw-pl-orbit"></div>';
    case 'bars': return '<div class="upw-pl-bars">' + '<i></i>'.repeat(5) + '</div>';
    case 'grid': return '<div class="upw-pl-grid">' + '<i></i>'.repeat(9) + '</div>';
    case 'pulse': return '<div class="upw-pl-pulse"></div>';
    case 'ripple': return '<div class="upw-pl-ripple"><i></i><i></i></div>';
    case 'square': return '<div class="upw-pl-square"></div>';
    case 'bar': return '<div class="upw-pl-track"><div class="upw-pl-bar"></div></div>';
    case 'progress_ring': return '<div class="upw-pl-ring"><span class="upw-pl-num">0</span></div>';
    case 'counter': return '<div class="upw-pl-count"><span class="upw-pl-num">0</span><span class="upw-pl-pct">%</span></div>';
    case 'curtain': return '<span class="upw-pl-panel upw-pl-panel--a"></span><span class="upw-pl-panel upw-pl-panel--b"></span>';
    case 'logo': return hasLogo ? '' : '<div class="upw-pl-spinner"></div>';
    default: return '<div class="upw-pl-spinner"></div>';
  }
}
function contentFor(style, hasLogo) {
  const inner = innerFor(style, hasLogo);
  const logo = hasLogo ? `<img class="upw-pl-logo" src="${SAMPLE_LOGO}" alt="" />` : '';
  return style === 'curtain' ? inner + `<div class="upw-pl-center">${logo}</div>` : `<div class="upw-pl-center">${logo}${inner}</div>`;
}

/* Loop the load → fade preview (mirrors preloader.js finish() + the counter ramp). */
function runPreloader(overlay, s) {
  const hasLogo = s.logo === 'yes';
  const fadeMs = (Number(s.fade) || 0.5) * 1000;
  const minMs = (Number(s.min) || 0) * 1000;
  const SIM_LOAD = 1500, PAUSE = 1400;
  let cancelled = false, ramp = null;
  const timers = [];
  const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };

  const startRamp = () => {
    const numEl = overlay.querySelector('.upw-pl-num'), ringEl = overlay.querySelector('.upw-pl-ring');
    if (!numEl && !ringEl) return;
    let pct = 0;
    ramp = setInterval(() => { pct += Math.max(0.6, (90 - pct) * 0.06); if (pct > 90) pct = 90; const v = Math.round(pct); if (numEl) numEl.textContent = v; if (ringEl) ringEl.style.setProperty('--pl-prog', v); }, 60);
  };
  const finish = () => {
    if (ramp) { clearInterval(ramp); ramp = null; }
    const numEl = overlay.querySelector('.upw-pl-num'), ringEl = overlay.querySelector('.upw-pl-ring');
    if (numEl) numEl.textContent = 100; if (ringEl) ringEl.style.setProperty('--pl-prog', 100);
    overlay.classList.add('is-done');
  };
  const cycle = () => {
    if (cancelled) return;
    overlay.classList.remove('is-done');
    overlay.innerHTML = contentFor(s.style, hasLogo);
    startRamp();
    later(() => { if (cancelled) return; finish(); later(cycle, fadeMs + PAUSE); }, Math.max(SIM_LOAD, minMs));
  };
  cycle();
  return () => { cancelled = true; if (ramp) clearInterval(ramp); timers.forEach(clearTimeout); };
}

/* ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val, note) => ({id, label, type: 'slider', min, max, step, default: val, note});
const GROUPS = [
  ['Appearance', [
    {id: 'bg', label: 'Background', type: 'color', default: '#0b1220'},
    {id: 'accent', label: 'Accent', type: 'color', default: '#2f74e6'},
    {id: 'logo', label: 'Show logo', type: 'switch', on: 'yes', off: 'no', default: 'no'},
  ]],
  ['Timing', [
    sl('min', 'Minimum display (s)', 0, 4, 0.1, 0.4, 'so it never just flashes'),
    sl('fade', 'Fade out (s)', 0.2, 1.5, 0.05, 0.5),
  ]],
];
const ALL = GROUPS.flatMap(([, c]) => c);
const isNum = (id) => (ALL.find((c) => c.id === id) || {}).type === 'slider';
const defaults = () => ({style: 'spinner', ...Object.fromEntries(ALL.map((c) => [c.id, c.default]))});

function buildPhp(s) {
  const line = (k, v) => `        '${k}' => ${v},`;
  return `// Theme Settings → Animations → Preloader
'animation_preloader' => [ 'enable' => 'yes' ],
'preloader_style'  => [ 'style' => '${s.style}' ],
'preloader_bg'     => [ 'predefined' => '', 'custom' => '${s.bg}' ],
'preloader_accent' => [ 'predefined' => '', 'custom' => '${s.accent}' ],
${s.logo === 'yes' ? "'preloader_logo'   => [ 'url' => '…/logo.svg' ],\n" : ''}'preloader_min'    => ${Number(s.min)},
'preloader_fade'   => ${Number(s.fade)},`;
}

export default function PreloaderPlayground() {
  const [s, setS] = useState(defaults);
  const [nonce, setNonce] = useState(0);
  const ref = useRef(null);
  const set = (id, v) => setS((p) => ({...p, [id]: v}));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cleanup;
    try { cleanup = runPreloader(el, s); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, JSON.stringify(s)]);

  const overlayStyle = {'--pl-bg': s.bg, '--pl-accent': s.accent, '--pl-fade': `${s.fade}s`};

  return (
    <div className={styles.playground}>
      <style>{PRELOADER_CSS}</style>

      <div className={styles.styles}>
        <span className={styles.lbl}>Style</span>
        {STYLE_LIST.map(([v, l]) => (
          <button key={v} type="button" className={v === s.style ? styles.styleActive : styles.style} onClick={() => { set('style', v); setNonce((n) => n + 1); }}>{l}</button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={`${styles.stage} pl-demo`}>
          <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>
          <div className={styles.page}>
            <div className={styles.pageTitle} />
            <div className={styles.pageBar} style={{width: '90%'}} />
            <div className={styles.pageBar} style={{width: '80%'}} />
            <div className={styles.pageBar} style={{width: '60%'}} />
          </div>
          <div className={`upw-preloader upw-pl--${s.style}`} ref={ref} style={overlayStyle} role="status" aria-label="Loading" />
        </div>

        <div className={styles.controls}>
          {GROUPS.map(([label, ctrls]) => (
            <div key={label}>
              <div className={styles.groupLbl}>{label}</div>
              {ctrls.map((c) => (
                <div className={styles.control} key={c.id}>
                  {c.type === 'slider' && (<><label>{c.label} <span>{s[c.id]}</span></label>
                    <input type="range" min={c.min} max={c.max} step={c.step} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                  {c.type === 'color' && (<><label>{c.label} <span>{s[c.id]}</span></label>
                    <input type="color" className={styles.color} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
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

      <div className={styles.code}>
        <div>Theme Settings values — update as you tweak</div>
        <pre><code>{buildPhp(s)}</code></pre>
      </div>
    </div>
  );
}

/* The module's real stylesheet (preloader.css), verbatim, plus demo containment
   (the overlay/panels are position:fixed in production — scope them to the stage). */
const PRELOADER_CSS = `
.upw-preloader { position: absolute; inset: 0; z-index: 3; display: flex; align-items: center; justify-content: center; background: var(--pl-bg,#0b1220); opacity: 1; visibility: visible; transition: opacity var(--pl-fade,.5s) ease, visibility var(--pl-fade,.5s) ease; }
.upw-preloader.is-done { opacity: 0; visibility: hidden; pointer-events: none; }
.upw-pl-center { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.upw-pl-logo { max-width: 170px; max-height: 92px; height: auto; width: auto; display: block; }
.upw-pl-spinner { width: 46px; height: 46px; border: 4px solid rgba(255,255,255,.18); border-top-color: var(--pl-accent,#2f74e6); border-radius: 50%; animation: upw-pl-spin .8s linear infinite; }
@keyframes upw-pl-spin { to { transform: rotate(360deg); } }
.upw-pl-dual { position: relative; width: 52px; height: 52px; }
.upw-pl-dual::before, .upw-pl-dual::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 4px solid transparent; }
.upw-pl-dual::before { border-top-color: var(--pl-accent,#2f74e6); border-bottom-color: var(--pl-accent,#2f74e6); animation: upw-pl-spin 1s linear infinite; }
.upw-pl-dual::after { inset: 8px; border-left-color: rgba(255,255,255,.5); border-right-color: rgba(255,255,255,.5); animation: upw-pl-spin .7s linear infinite reverse; }
.upw-pl-grad { width: 50px; height: 50px; border-radius: 50%; background: conic-gradient(from 0deg, rgba(255,255,255,0), var(--pl-accent,#2f74e6)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 0); mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 0); animation: upw-pl-spin .9s linear infinite; }
.upw-pl-dots { display: flex; gap: 11px; }
.upw-pl-dots span { width: 12px; height: 12px; border-radius: 50%; background: var(--pl-accent,#2f74e6); animation: upw-pl-dot .6s ease-in-out infinite; }
.upw-pl-dots span:nth-child(2) { animation-delay: .12s; } .upw-pl-dots span:nth-child(3) { animation-delay: .24s; }
@keyframes upw-pl-dot { 0%,100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(-13px); opacity: 1; } }
.upw-pl-fade { position: relative; width: 52px; height: 52px; }
.upw-pl-fade i { position: absolute; top: 0; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--pl-accent,#2f74e6); transform-origin: 4px 26px; opacity: .15; animation: upw-pl-fadedot 1s linear infinite; }
.upw-pl-fade i:nth-child(1){transform:rotate(0);animation-delay:-1s}.upw-pl-fade i:nth-child(2){transform:rotate(45deg);animation-delay:-.875s}.upw-pl-fade i:nth-child(3){transform:rotate(90deg);animation-delay:-.75s}.upw-pl-fade i:nth-child(4){transform:rotate(135deg);animation-delay:-.625s}.upw-pl-fade i:nth-child(5){transform:rotate(180deg);animation-delay:-.5s}.upw-pl-fade i:nth-child(6){transform:rotate(225deg);animation-delay:-.375s}.upw-pl-fade i:nth-child(7){transform:rotate(270deg);animation-delay:-.25s}.upw-pl-fade i:nth-child(8){transform:rotate(315deg);animation-delay:-.125s}
@keyframes upw-pl-fadedot { 0% { opacity: 1; } 100% { opacity: .15; } }
.upw-pl-orbit { position: relative; width: 50px; height: 50px; border-radius: 50%; border: 3px solid rgba(255,255,255,.16); animation: upw-pl-spin 1.1s linear infinite; }
.upw-pl-orbit::after { content: ""; position: absolute; top: -6px; left: 50%; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: var(--pl-accent,#2f74e6); }
.upw-pl-bars { display: flex; align-items: center; gap: 5px; height: 40px; }
.upw-pl-bars i { width: 6px; height: 100%; border-radius: 3px; background: var(--pl-accent,#2f74e6); transform: scaleY(.35); transform-origin: center; animation: upw-pl-bars .9s ease-in-out infinite; }
.upw-pl-bars i:nth-child(2){animation-delay:.15s}.upw-pl-bars i:nth-child(3){animation-delay:.3s}.upw-pl-bars i:nth-child(4){animation-delay:.45s}.upw-pl-bars i:nth-child(5){animation-delay:.6s}
@keyframes upw-pl-bars { 0%,100% { transform: scaleY(.35); } 50% { transform: scaleY(1); } }
.upw-pl-grid { display: grid; grid-template-columns: repeat(3,12px); gap: 6px; }
.upw-pl-grid i { width: 12px; height: 12px; border-radius: 3px; background: var(--pl-accent,#2f74e6); animation: upw-pl-gridp 1.3s ease-in-out infinite; }
.upw-pl-grid i:nth-child(1){animation-delay:0s}.upw-pl-grid i:nth-child(2){animation-delay:.1s}.upw-pl-grid i:nth-child(3){animation-delay:.2s}.upw-pl-grid i:nth-child(4){animation-delay:.1s}.upw-pl-grid i:nth-child(5){animation-delay:.2s}.upw-pl-grid i:nth-child(6){animation-delay:.3s}.upw-pl-grid i:nth-child(7){animation-delay:.2s}.upw-pl-grid i:nth-child(8){animation-delay:.3s}.upw-pl-grid i:nth-child(9){animation-delay:.4s}
@keyframes upw-pl-gridp { 0%,70%,100% { transform: scale(.5); opacity: .4; } 35% { transform: scale(1); opacity: 1; } }
.upw-pl-pulse { width: 46px; height: 46px; border-radius: 50%; background: var(--pl-accent,#2f74e6); animation: upw-pl-pulsek 1.1s ease-in-out infinite; }
@keyframes upw-pl-pulsek { 0%,100% { transform: scale(.4); opacity: .5; } 50% { transform: scale(1); opacity: 1; } }
.upw-pl-ripple { position: relative; width: 56px; height: 56px; }
.upw-pl-ripple i { position: absolute; inset: 50%; border: 3px solid var(--pl-accent,#2f74e6); border-radius: 50%; animation: upw-pl-ripplek 1.2s cubic-bezier(0,.2,.8,1) infinite; }
.upw-pl-ripple i:nth-child(2) { animation-delay: -.6s; }
@keyframes upw-pl-ripplek { 0% { inset: 50%; opacity: 1; } 100% { inset: 0; opacity: 0; } }
.upw-pl-square { width: 40px; height: 40px; background: var(--pl-accent,#2f74e6); animation: upw-pl-sq 1.2s ease-in-out infinite; }
@keyframes upw-pl-sq { 0% { transform: perspective(120px) rotateX(0) rotateY(0); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }
.upw-pl-track { width: 210px; height: 4px; border-radius: 4px; background: rgba(255,255,255,.16); overflow: hidden; }
.upw-pl-bar { width: 40%; height: 100%; border-radius: 4px; background: var(--pl-accent,#2f74e6); animation: upw-pl-bar 1.1s ease-in-out infinite; }
@keyframes upw-pl-bar { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
.upw-pl-ring { position: relative; width: 88px; height: 88px; border-radius: 50%; background: conic-gradient(var(--pl-accent,#2f74e6) calc(var(--pl-prog,0)*1%), rgba(255,255,255,.14) 0); display: flex; align-items: center; justify-content: center; }
.upw-pl-ring::before { content: ""; position: absolute; inset: 8px; border-radius: 50%; background: var(--pl-bg,#0b1220); }
.upw-pl-ring .upw-pl-num { position: relative; color: #fff; font: 700 24px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-variant-numeric: tabular-nums; }
.upw-pl-count { color: #fff; font: 700 clamp(40px,9vw,84px)/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; display: flex; align-items: baseline; }
.upw-pl-count .upw-pl-num { font-variant-numeric: tabular-nums; }
.upw-pl-count .upw-pl-pct { font-size: .42em; margin-left: 4px; color: var(--pl-accent,#2f74e6); }
.upw-pl--curtain { background: transparent; }
.pl-demo .upw-pl-panel { position: absolute; left: 0; width: 100%; height: 50%; background: var(--pl-bg,#0b1220); transition: transform var(--pl-fade,.5s) cubic-bezier(.7,0,.3,1); }
.upw-pl-panel--a { top: 0; } .upw-pl-panel--b { bottom: 0; }
.upw-preloader.is-done .upw-pl-panel--a { transform: translateY(-100%); }
.upw-preloader.is-done .upw-pl-panel--b { transform: translateY(100%); }
.upw-pl--curtain.is-done { opacity: 1; visibility: visible; }
.upw-pl--curtain .upw-pl-center { position: relative; z-index: 1; transition: opacity var(--pl-fade,.5s) ease; }
.upw-pl--curtain.is-done .upw-pl-center { opacity: 0; }
.upw-pl--logo .upw-pl-logo { animation: upw-pl-pulse 1.2s ease-in-out infinite; }
@keyframes upw-pl-pulse { 0%,100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.06); opacity: 1; } }
`;
