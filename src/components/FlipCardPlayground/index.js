import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the 3D Flip Card module.
 *
 * Ports the module's real runtime (flip-card.js): the existing content becomes
 * the front face and a back face (heading / text / image / button) is built from
 * the data-flip-* attributes; hover flips via CSS, click / scroll / auto toggle
 * `.is-flipped` in JS; cube reads the card size into --flip-w/--flip-h. Uses the
 * verbatim flip-card.css and the exact class / var / data mapping from
 * flip-card-render.php.
 */

const SAMPLE_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='300'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0' stop-color='#3a1c71'/><stop offset='.5' stop-color='#d76d77'/><stop offset='1' stop-color='#ffaf7b'/></linearGradient></defs>
<rect width='320' height='300' fill='url(#g)'/></svg>`,
  );

const EASE = {
  smooth: 'cubic-bezier(0.4, 0.2, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  linear: 'linear',
};

const FRONT_HTML =
  '<div class="fc-front-demo"><div class="fc-front-icon">✦</div>' +
  '<div class="fc-front-h">UnysonPlus</div>' +
  '<div class="fc-front-p">Flip to reveal the back</div></div>';

/* Ported build(): wrap content into inner/front/back, wire triggers. Returns cleanup. */
function buildFlip(el) {
  el.innerHTML = FRONT_HTML;
  el.classList.remove('is-flipped');
  el.removeAttribute('aria-pressed');

  const inner = document.createElement('div'); inner.className = 'sc-flip-inner';
  const front = document.createElement('div'); front.className = 'sc-flip-front';
  while (el.firstChild) front.appendChild(el.firstChild);
  const back = document.createElement('div'); back.className = 'sc-flip-back';
  const bg = el.getAttribute('data-flip-bg'), col = el.getAttribute('data-flip-color');
  if (bg) back.style.background = bg;
  if (col) back.style.color = col;
  const img = el.getAttribute('data-flip-image');
  if (img) { back.style.backgroundImage = `url("${img}")`; const scrim = document.createElement('div'); scrim.className = 'sc-flip-back-scrim'; back.appendChild(scrim); }
  const heading = el.getAttribute('data-flip-heading');
  if (heading) { const h = document.createElement('h3'); h.className = 'sc-flip-back-title'; h.textContent = heading; back.appendChild(h); }
  const text = el.getAttribute('data-flip-text');
  if (text) { const t = document.createElement('div'); t.className = 'sc-flip-back-text'; text.split('\n').forEach((line, i) => { if (i) t.appendChild(document.createElement('br')); t.appendChild(document.createTextNode(line)); }); back.appendChild(t); }
  const btn = el.getAttribute('data-flip-btn');
  if (btn) { const url = el.getAttribute('data-flip-btn-url'); const a = document.createElement(url ? 'a' : 'span'); a.className = 'sc-flip-back-btn'; a.textContent = btn; if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; } back.appendChild(a); }
  inner.appendChild(front); inner.appendChild(back); el.appendChild(inner);

  const cleanups = [];
  if (el.classList.contains('sc-flip--cube')) {
    const setDims = () => { el.style.setProperty('--flip-w', el.offsetWidth + 'px'); el.style.setProperty('--flip-h', el.offsetHeight + 'px'); };
    setDims();
    if (window.ResizeObserver) { const ro = new ResizeObserver(setDims); ro.observe(el); cleanups.push(() => ro.disconnect()); }
    else { window.addEventListener('resize', setDims); cleanups.push(() => window.removeEventListener('resize', setDims)); }
  }

  const setFlipped = (on) => { el.classList.toggle('is-flipped', on); el.setAttribute('aria-pressed', on ? 'true' : 'false'); };

  if (el.classList.contains('sc-flip-click')) {
    el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); el.setAttribute('aria-pressed', 'false');
    const toggle = () => setFlipped(!el.classList.contains('is-flipped'));
    const key = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } };
    el.addEventListener('click', toggle); el.addEventListener('keydown', key);
    cleanups.push(() => { el.removeEventListener('click', toggle); el.removeEventListener('keydown', key); });
  }

  if (el.classList.contains('sc-flip-scroll')) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { el.classList.add('is-flipped'); io.disconnect(); } }), {threshold: 0.35});
      io.observe(el); cleanups.push(() => io.disconnect());
    } else el.classList.add('is-flipped');
  }

  if (el.classList.contains('sc-flip-auto')) {
    const iv = parseFloat(el.getAttribute('data-flip-interval')) || 3;
    let timer = null;
    const tick = () => setFlipped(!el.classList.contains('is-flipped'));
    timer = setInterval(tick, Math.max(500, iv * 1000));
    cleanups.push(() => clearInterval(timer));
  }

  return () => cleanups.forEach((c) => c());
}

/* ------------------------------------------------------------------ */
const sl = (id, label, min, max, step, val, note) => ({id, label, type: 'slider', min, max, step, default: val, note});
const STYLE_LIST = [['flip', 'Flip'], ['cube', 'Cube'], ['fold', 'Fold'], ['door', 'Door'], ['diagonal', 'Diagonal'], ['pop', 'Pop'], ['carousel', 'Carousel']];

const GROUPS = [
  ['Trigger & timing', [
    {id: 'trigger', label: 'Flip on', type: 'select', default: 'hover', choices: [['hover', 'Hover'], ['click', 'Click / tap'], ['scroll', 'Scroll into view'], ['auto', 'Auto (loop)']]},
    sl('auto_interval', 'Auto interval (s)', 1, 12, 0.5, 3, 'Auto trigger only'),
    sl('duration', 'Flip speed (s)', 0.2, 1.5, 0.05, 0.6),
  ]],
  ['3D', [
    {id: 'direction', label: 'Direction / axis', type: 'select', default: 'h', choices: [['h', 'Horizontal (Y axis)'], ['v', 'Vertical (X axis)']]},
    sl('perspective', '3D depth (perspective px)', 500, 2600, 50, 1400, 'lower = more dramatic'),
    {id: 'easing', label: 'Easing', type: 'select', default: 'smooth', choices: [['smooth', 'Smooth'], ['spring', 'Spring (overshoot)'], ['out', 'Ease out'], ['linear', 'Linear']]},
  ]],
  ['Card', [
    sl('min_height', 'Card height (px)', 80, 600, 10, 260),
    sl('radius', 'Corner radius (px)', 0, 48, 1, 16),
    {id: 'back_align', label: 'Back content align', type: 'select', default: 'center', choices: [['top', 'Top'], ['center', 'Center'], ['bottom', 'Bottom']]},
  ]],
  ['Back face', [
    {id: 'back_heading', label: 'Back heading', type: 'text', default: 'Build faster'},
    {id: 'back_text', label: 'Back text', type: 'textarea', default: 'Drag & drop page building.\nNo code required.'},
    {id: 'back_image', label: 'Back image', type: 'switch', on: 'yes', off: 'no', default: 'no'},
    {id: 'back_btn_text', label: 'Back button text', type: 'text', default: 'Learn more'},
    {id: 'back_bg', label: 'Back background', type: 'color', default: '#2f74e6'},
    {id: 'back_color', label: 'Back text color', type: 'color', default: '#ffffff'},
  ]],
];
const ALL = GROUPS.flatMap(([, c]) => c);
const isNum = (id) => (ALL.find((c) => c.id === id) || {}).type === 'slider';
const defaults = () => Object.fromEntries(ALL.map((c) => [c.id, c.default]));

function buildPhp(mode, s) {
  const order = ['trigger', 'auto_interval', 'direction', 'min_height', 'duration', 'perspective', 'easing', 'radius', 'back_align', 'back_heading', 'back_text', 'back_image', 'back_btn_text', 'back_bg', 'back_color'];
  const val = (k) => {
    if (k === 'back_image') return s.back_image === 'yes' ? `[ 'url' => '…/image.jpg' ]` : `[]`;
    if (k === 'back_bg' || k === 'back_color') return `[ 'predefined' => '', 'custom' => '${s[k]}' ]`;
    return isNum(k) ? Number(s[k]) : `'${String(s[k]).replace(/\n/g, '\\n')}'`;
  };
  const rows = order.map((k) => `            '${k}' => ${val(k)},`).join('\n');
  return `'flip_card' => [
    'type'  => 'multi-picker',
    'value' => [
        'mode' => '${mode}',
        '${mode}' => [
${rows}
        ],
    ],
],`;
}

export default function FlipCardPlayground() {
  const [mode, setMode] = useState('flip');
  const [s, setS] = useState(defaults);
  const [nonce, setNonce] = useState(0);
  const ref = useRef(null);
  const set = (id, v) => setS((p) => ({...p, [id]: v}));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let cleanup;
    try { cleanup = buildFlip(el); } catch (e) { /* never break the page */ }
    return () => { if (typeof cleanup === 'function') cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, nonce, JSON.stringify(s)]);

  const cls = `sc-flip sc-flip--${mode} sc-flip--${s.direction} sc-flip--balign-${s.back_align} sc-flip-${s.trigger}`;
  const style = {
    width: '100%', minHeight: `${s.min_height}px`,
    '--flip-dur': `${s.duration}s`, '--flip-persp': `${s.perspective}px`, '--flip-ease': EASE[s.easing], '--flip-radius': `${s.radius}px`,
  };
  const attrs = {
    'data-flip-bg': s.back_bg, 'data-flip-color': s.back_color,
    ...(s.back_heading ? {'data-flip-heading': s.back_heading} : {}),
    ...(s.back_text ? {'data-flip-text': s.back_text} : {}),
    ...(s.back_image === 'yes' ? {'data-flip-image': SAMPLE_IMG} : {}),
    ...(s.back_btn_text ? {'data-flip-btn': s.back_btn_text} : {}),
    ...(s.trigger === 'auto' ? {'data-flip-interval': s.auto_interval} : {}),
  };
  const hint = {hover: 'hover the card to flip', click: 'click / tap the card', scroll: 'flips on load (scroll trigger) — ↻ Replay', auto: 'flips on a loop'}[s.trigger];

  return (
    <div className={styles.playground}>
      <style>{FLIP_CSS}</style>

      <div className={styles.styles}>
        <span className={styles.lbl}>Style</span>
        {STYLE_LIST.map(([v, l]) => (
          <button key={v} type="button" className={v === mode ? styles.styleActive : styles.style} onClick={() => { setMode(v); setNonce((n) => n + 1); }}>{l}</button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.stage}>
          <button type="button" className={styles.replay} onClick={() => setNonce((n) => n + 1)}>↻ Replay</button>
          <div className={styles.cardWrap}>
            <div className={`${cls} fc-demo`} ref={ref} style={style} {...attrs} dangerouslySetInnerHTML={{__html: FRONT_HTML}} />
          </div>
          <div className={styles.hint}>{hint}</div>
        </div>

        <div className={styles.controls}>
          {GROUPS.map(([label, ctrls]) => (
            <div key={label}>
              <div className={styles.groupLbl}>{label}</div>
              {ctrls.map((c) => (
                <div className={styles.control} key={c.id}>
                  {c.type === 'slider' && (<><label>{c.label} <span>{s[c.id]}</span></label>
                    <input type="range" min={c.min} max={c.max} step={c.step} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                  {c.type === 'select' && (<><label>{c.label}</label>
                    <select className={styles.select} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)}>{c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>)}
                  {c.type === 'text' && (<><label>{c.label}</label>
                    <input type="text" className={styles.text} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
                  {c.type === 'textarea' && (<><label>{c.label}</label>
                    <textarea className={styles.textarea} value={s[c.id]} onChange={(e) => set(c.id, e.target.value)} /></>)}
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
        <div>Sample option — updates as you tweak</div>
        <pre><code>{buildPhp(mode, s)}</code></pre>
        <p style={{margin: '0 1.5rem 1.25rem', fontSize: '0.78rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Back colors use the theme color-preset picker; the resolved color is shown here.
        </p>
      </div>
    </div>
  );
}

/* The module's real stylesheet (flip-card.css), verbatim, plus the demo front face. */
const FLIP_CSS = `
.sc-flip { perspective: var(--flip-persp, 1400px); position: relative; border-radius: var(--flip-radius, 0); }
.sc-flip-inner { position: relative; width: 100%; min-height: inherit; transform-style: preserve-3d; transition: transform var(--flip-dur, 0.6s) var(--flip-ease, cubic-bezier(0.4,0.2,0.2,1)); }
.sc-flip-front, .sc-flip-back { border-radius: inherit; }
.sc-flip-front { position: relative; min-height: inherit; transform: var(--flip-front-t, none); }
.sc-flip-back { position: absolute; inset: 0; transform: var(--flip-back-t, none); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; box-sizing: border-box; background-size: cover; background-position: center; overflow: hidden; }
.sc-flip--balign-top .sc-flip-back { justify-content: flex-start; }
.sc-flip--balign-center .sc-flip-back { justify-content: center; }
.sc-flip--balign-bottom .sc-flip-back { justify-content: flex-end; }
.sc-flip-back-scrim { position: absolute; inset: 0; background: rgba(0,0,0,.34); z-index: 0; }
.sc-flip-back > .sc-flip-back-title, .sc-flip-back > .sc-flip-back-text, .sc-flip-back > .sc-flip-back-btn { position: relative; z-index: 1; }
.sc-flip-back-title { margin: 0 0 8px; font-size: 20px; line-height: 1.25; color: inherit; }
.sc-flip-back-text { font-size: 15px; line-height: 1.55; color: inherit; opacity: .95; }
.sc-flip-back-btn { display: inline-block; margin-top: 16px; padding: 9px 20px; border: 1px solid currentColor; border-radius: 6px; color: inherit; text-decoration: none; font-size: 14px; line-height: 1.2; transition: background-color .2s ease; }
.sc-flip-back-btn:hover { background: rgba(255,255,255,.16); }
.sc-flip--flip .sc-flip-front, .sc-flip--flip .sc-flip-back, .sc-flip--cube .sc-flip-front, .sc-flip--cube .sc-flip-back, .sc-flip--diagonal .sc-flip-front, .sc-flip--diagonal .sc-flip-back, .sc-flip--pop .sc-flip-front, .sc-flip--pop .sc-flip-back, .sc-flip--carousel .sc-flip-front, .sc-flip--carousel .sc-flip-back { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.sc-flip--flip.sc-flip-hover:hover .sc-flip-inner, .sc-flip--flip.is-flipped .sc-flip-inner, .sc-flip--cube.sc-flip-hover:hover .sc-flip-inner, .sc-flip--cube.is-flipped .sc-flip-inner, .sc-flip--diagonal.sc-flip-hover:hover .sc-flip-inner, .sc-flip--diagonal.is-flipped .sc-flip-inner, .sc-flip--pop.sc-flip-hover:hover .sc-flip-inner, .sc-flip--pop.is-flipped .sc-flip-inner, .sc-flip--carousel.sc-flip-hover:hover .sc-flip-inner, .sc-flip--carousel.is-flipped .sc-flip-inner { transform: var(--flip-t, none); }
.sc-flip--flip.sc-flip--h { --flip-back-t: rotateY(180deg); --flip-t: rotateY(180deg); }
.sc-flip--flip.sc-flip--v { --flip-back-t: rotateX(180deg); --flip-t: rotateX(180deg); }
.sc-flip--diagonal { --flip-back-t: rotate3d(1,1,0,180deg); --flip-t: rotate3d(1,1,0,180deg); }
.sc-flip--pop .sc-flip-inner { transition-timing-function: cubic-bezier(0.34,1.56,0.64,1); }
.sc-flip--pop.sc-flip--h { --flip-back-t: rotateY(180deg); --flip-t: rotateY(180deg) scale(1.06); }
.sc-flip--pop.sc-flip--v { --flip-back-t: rotateX(180deg); --flip-t: rotateX(180deg) scale(1.06); }
.sc-flip--carousel.sc-flip--h { --flip-front-t: translateZ(26px); --flip-back-t: rotateY(180deg) translateZ(26px); --flip-t: rotateY(180deg); }
.sc-flip--carousel.sc-flip--v { --flip-front-t: translateZ(26px); --flip-back-t: rotateX(180deg) translateZ(26px); --flip-t: rotateX(180deg); }
.sc-flip--cube.sc-flip--h { --flip-front-t: translateZ(calc(var(--flip-w,320px)/2)); --flip-back-t: rotateY(90deg) translateZ(calc(var(--flip-w,320px)/2)); --flip-t: rotateY(-90deg); }
.sc-flip--cube.sc-flip--v { --flip-front-t: translateZ(calc(var(--flip-h,260px)/2)); --flip-back-t: rotateX(-90deg) translateZ(calc(var(--flip-h,260px)/2)); --flip-t: rotateX(90deg); }
.sc-flip--fold .sc-flip-back, .sc-flip--door .sc-flip-back { --flip-back-t: translateZ(-2px); }
.sc-flip--fold .sc-flip-front { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.sc-flip--door .sc-flip-front { box-shadow: 0 0 24px rgba(0,0,0,.18); }
.sc-flip--fold .sc-flip-front, .sc-flip--door .sc-flip-front { transition: transform var(--flip-dur,0.6s) var(--flip-ease, cubic-bezier(0.4,0.2,0.2,1)); }
.sc-flip--fold.sc-flip--h .sc-flip-front, .sc-flip--door.sc-flip--h .sc-flip-front { transform-origin: left center; }
.sc-flip--fold.sc-flip--v .sc-flip-front, .sc-flip--door.sc-flip--v .sc-flip-front { transform-origin: center top; }
.sc-flip--fold.sc-flip-hover:hover .sc-flip-front, .sc-flip--fold.is-flipped .sc-flip-front, .sc-flip--door.sc-flip-hover:hover .sc-flip-front, .sc-flip--door.is-flipped .sc-flip-front { transform: var(--flip-ft, none); }
.sc-flip--fold.sc-flip--h { --flip-ft: rotateY(-180deg); }
.sc-flip--fold.sc-flip--v { --flip-ft: rotateX(180deg); }
.sc-flip--door.sc-flip--h { --flip-ft: rotateY(-158deg); }
.sc-flip--door.sc-flip--v { --flip-ft: rotateX(158deg); }
.sc-flip-click, .sc-flip-auto { cursor: pointer; }
@media (prefers-reduced-motion: reduce) { .sc-flip-inner, .sc-flip--fold .sc-flip-front, .sc-flip--door .sc-flip-front { transition: none; } }
/* demo front face */
.fc-demo .sc-flip-front { background: var(--ifm-background-surface-color); border: 1px solid var(--ifm-toc-border-color); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-sizing: border-box; padding: 24px; }
.fc-front-demo { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
.fc-front-icon { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 14px; font-size: 1.7rem; color: #fff; background: linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-dark)); margin-bottom: 0.85rem; }
.fc-front-h { font-size: 1.35rem; font-weight: 800; color: var(--ifm-heading-color); }
.fc-front-p { font-size: 0.9rem; color: var(--ifm-color-emphasis-600); margin-top: 0.25rem; }
`;
