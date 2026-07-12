/*
 * Scroll Reveal — interactive playground.
 *
 * Ports the real module: the clip-wipe directions (base.css + effects/*.css — an element starts
 * clipped and transitions clip-path to full when `.is-in` is added) and the canvas "Pixelate In"
 * (effects/pixelate.js — draw the <img> to a <canvas> with smoothing off, then step the resolution
 * up from blocks to sharp). On a live page the trigger is a scroll-into-view check; here the stage is
 * always in view, so it plays on mount and on Replay. Options map 1:1 to the shortcode atts.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

// Verbatim clip CSS (base + 6 directions), scoped to the stage `.srstage`.
const CLIP_CSS = `
.srstage .sc-clip-reveal {
  transition: clip-path var(--cr-dur, 0.7s) var(--cr-ease, cubic-bezier(0.22, 1, 0.36, 1)) var(--cr-delay, 0s),
              -webkit-clip-path var(--cr-dur, 0.7s) var(--cr-ease, cubic-bezier(0.22, 1, 0.36, 1)) var(--cr-delay, 0s);
  will-change: clip-path;
}
.srstage .sc-clip-reveal.is-in { clip-path: inset(0 0 0 0); -webkit-clip-path: inset(0 0 0 0); }
.srstage .sc-clip--up { clip-path: inset(100% 0 0 0); -webkit-clip-path: inset(100% 0 0 0); }
.srstage .sc-clip--down { clip-path: inset(0 0 100% 0); -webkit-clip-path: inset(0 0 100% 0); }
.srstage .sc-clip--left { clip-path: inset(0 100% 0 0); -webkit-clip-path: inset(0 100% 0 0); }
.srstage .sc-clip--right { clip-path: inset(0 0 0 100%); -webkit-clip-path: inset(0 0 0 100%); }
.srstage .sc-clip--diagonal { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); -webkit-clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
.srstage .sc-clip--diagonal.is-in { clip-path: polygon(0 0, 140% 0, 0 140%, 0 100%); -webkit-clip-path: polygon(0 0, 140% 0, 0 140%, 0 100%); }
.srstage .sc-clip--iris { clip-path: circle(0% at 50% 50%); -webkit-clip-path: circle(0% at 50% 50%); }
.srstage .sc-clip--iris.is-in { clip-path: circle(150% at 50% 50%); -webkit-clip-path: circle(150% at 50% 50%); }
.srstage .sc-pixel-reveal .sc-px-canvas { position: absolute; z-index: 1; display: block; pointer-events: none; }
.srstage .sc-pixel-reveal.sc-pixel-active > img, .srstage .sc-pixel-reveal.sc-pixel-active img { opacity: 0; }
`;

// A self-contained demo image (data-URI SVG) so the pixelate canvas has real pixels offline.
const DEMO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="280" viewBox="0 0 440 280">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b6ea5"/><stop offset="1" stop-color="#f6c177"/></linearGradient></defs>
<rect width="440" height="280" fill="url(#sky)"/>
<circle cx="330" cy="80" r="42" fill="#fff3c4"/>
<path d="M0 200 L90 120 L160 190 L250 100 L340 200 L440 150 L440 280 L0 280 Z" fill="#2f5d50"/>
<path d="M0 230 L120 170 L210 230 L320 160 L440 220 L440 280 L0 280 Z" fill="#1f3d36"/>
</svg>`;
const DEMO_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(DEMO_SVG);

const GROUPS = [
  ['Directions', ['up', 'down', 'left', 'right', 'iris', 'diagonal']],
  ['Special', ['pixelate']],
];
const LABELS = {up: 'Wipe Up', down: 'Wipe Down', left: 'Wipe Left', right: 'Wipe Right', iris: 'Iris', diagonal: 'Diagonal', pixelate: 'Pixelate In'};

const EASES = [
  ['ease', 'Ease'], ['ease-out', 'Ease Out'], ['ease-in-out', 'Ease In Out'], ['linear', 'Linear'],
  ['cubic-bezier(0.22, 1, 0.36, 1)', 'Smooth out (default)'], ['cubic-bezier(0.68, -0.55, 0.27, 1.55)', 'Overshoot'],
];

const CLIP_DEFAULTS = {duration: 0.7, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', replay: 'no'};
const PX_DEFAULTS = {coarseness: 100, steps: 5, speed: 80, replay: 'no'};

const phpColorless = (mode, o) => {
  const body = Object.entries(o).map(([k, v]) => `        '${k}' => ${typeof v === 'number' ? v : `'${v}'`},`).join('\n');
  return `'scroll_reveal' => [
    'mode' => '${mode}',
    '${mode}' => [
${body}
    ],
],`;
};

export default function ScrollRevealPlayground() {
  const [mode, setMode] = useState('up');
  const [clip, setClip] = useState(CLIP_DEFAULTS);
  const [px, setPx] = useState(PX_DEFAULTS);
  const [token, setToken] = useState(0);
  const elRef = useRef(null);
  const timersRef = useRef([]);
  const isPx = mode === 'pixelate';

  const clearTimers = () => { timersRef.current.forEach((t) => clearTimeout(t)); timersRef.current = []; };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return undefined;
    clearTimers();
    const img = el.querySelector('img');

    // reset element state
    el.className = styles.card;
    el.classList.remove('is-in', 'sc-pixel-active');
    const existing = el.querySelector('.sc-px-canvas');
    if (existing) existing.remove();
    el.style.removeProperty('--cr-dur'); el.style.removeProperty('--cr-delay'); el.style.removeProperty('--cr-ease');
    if (img) img.style.opacity = '';

    let cancelled = false;

    if (!isPx) {
      el.classList.add('sc-clip-reveal', 'sc-clip--' + mode);
      el.style.setProperty('--cr-dur', clip.duration + 's');
      if (clip.delay > 0) el.style.setProperty('--cr-delay', clip.delay + 's');
      el.style.setProperty('--cr-ease', clip.easing);
      void el.offsetWidth; // reflow so the starting clip applies before is-in
      const id = requestAnimationFrame(() => { if (!cancelled) el.classList.add('is-in'); });
      return () => { cancelled = true; cancelAnimationFrame(id); clearTimers(); };
    }

    // ---- Pixelate In (canvas pixel-resolve) — ported from effects/pixelate.js ----
    if (!img) return undefined;
    el.classList.add('sc-pixel-reveal');
    const coarse = px.coarseness || 100;
    const steps = Math.max(2, px.steps || 5);
    const speed = px.speed || 80;

    const run = () => {
      if (!img.naturalWidth) { img.addEventListener('load', run, {once: true}); return; }
      const canvas = document.createElement('canvas');
      canvas.className = 'sc-px-canvas';
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.appendChild(canvas);
      el.classList.add('sc-pixel-active');

      function fit() {
        const r = img.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(r.width * dpr));
        canvas.height = Math.max(1, Math.round(r.height * dpr));
        canvas.style.width = r.width + 'px'; canvas.style.height = r.height + 'px';
        canvas.style.left = (img.offsetLeft || 0) + 'px'; canvas.style.top = (img.offsetTop || 0) + 'px';
      }
      function draw(size) {
        const w = canvas.width, h = canvas.height; let cw = w, ch = h;
        if (w / h > ratio) ch = Math.round(w / ratio); else cw = Math.round(h * ratio);
        const cx = Math.round((w - cw) / 2), cy = Math.round((h - ch) / 2);
        const smooth = size >= 1;
        ctx.imageSmoothingEnabled = smooth;
        ctx.clearRect(0, 0, w, h);
        const sw = Math.max(1, Math.round(cw * size)), sh = Math.max(1, Math.round(ch * size));
        ctx.drawImage(img, 0, 0, sw, sh);
        ctx.drawImage(canvas, 0, 0, sw, sh, cx, cy, cw, ch);
      }
      const startSize = Math.min(0.5, Math.max(0.01, 1 / coarse));
      const sizes = [];
      for (let i = 0; i < steps; i++) sizes.push(startSize * Math.pow(1 / startSize, i / (steps - 1)));
      sizes[sizes.length - 1] = 1;
      fit(); draw(sizes[0]);
      let k = 0;
      const step = () => {
        if (cancelled || k >= sizes.length || !el.isConnected) return;
        draw(sizes[k]);
        const wait = (k === 0) ? speed * 3 : speed;
        k++;
        timersRef.current.push(setTimeout(() => requestAnimationFrame(step), wait));
      };
      timersRef.current.push(setTimeout(step, 260)); // brief blocky dwell first
    };
    run();
    return () => { cancelled = true; clearTimers(); const c = el.querySelector('.sc-px-canvas'); if (c) c.remove(); el.classList.remove('sc-pixel-active'); if (img) img.style.opacity = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isPx ? JSON.stringify(px) : JSON.stringify(clip), token]);

  const php = useMemo(() => phpColorless(mode, isPx ? px : clip), [mode, clip, px, isPx]);
  const setC = (k, v) => setClip((s) => ({...s, [k]: v}));
  const setP = (k, v) => setPx((s) => ({...s, [k]: v}));

  return (
    <div className={styles.playground}>
      <style>{CLIP_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={`${styles.stage} srstage`}>
            <div ref={elRef} className={styles.card}>
              <img className={styles.cardImg} src={DEMO_IMG} alt="" width="440" height="280" />
              <div className={styles.cardBody}>
                <h4>Reveal me</h4>
                <p>This element un-masks as it enters view.</p>
              </div>
            </div>
            <button type="button" className={styles.replay} onClick={() => setToken((t) => t + 1)}>↻ Replay</button>
            <div className={styles.hint}>{isPx ? 'image resolves from pixel blocks' : 'clip-path wipes open'} · hit Replay</div>
          </div>

          <div className={styles.controls}>
            <h5>{LABELS[mode]} — options</h5>
            {!isPx && (<>
              <div className={styles.control}>
                <label>Duration (s) <span>{clip.duration}</span></label>
                <input type="range" min="0.2" max="2" step="0.05" value={clip.duration} onChange={(e) => setC('duration', Number(e.target.value))} />
              </div>
              <div className={styles.control}>
                <label>Delay (s) <span>{clip.delay}</span></label>
                <input type="range" min="0" max="2" step="0.1" value={clip.delay} onChange={(e) => setC('delay', Number(e.target.value))} />
              </div>
              <div className={styles.control}>
                <label>Easing</label>
                <select className={styles.select} value={clip.easing} onChange={(e) => setC('easing', e.target.value)}>
                  {EASES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className={styles.control}>
                <label>Replay on scroll</label>
                <div className={styles.toggle}>
                  <button type="button" className={clip.replay === 'no' ? styles.on : ''} onClick={() => setC('replay', 'no')}>Off</button>
                  <button type="button" className={clip.replay === 'yes' ? styles.on : ''} onClick={() => setC('replay', 'yes')}>On</button>
                </div>
              </div>
            </>)}
            {isPx && (<>
              <div className={styles.control}>
                <label>Block coarseness (px) <span>{px.coarseness}</span></label>
                <input type="range" min="20" max="200" step="5" value={px.coarseness} onChange={(e) => setP('coarseness', Number(e.target.value))} />
              </div>
              <div className={styles.control}>
                <label>Steps <span>{px.steps}</span></label>
                <input type="range" min="3" max="8" step="1" value={px.steps} onChange={(e) => setP('steps', Number(e.target.value))} />
              </div>
              <div className={styles.control}>
                <label>Step speed (ms) <span>{px.speed}</span></label>
                <input type="range" min="40" max="300" step="10" value={px.speed} onChange={(e) => setP('speed', Number(e.target.value))} />
              </div>
              <div className={styles.control}>
                <label>Replay on scroll</label>
                <div className={styles.toggle}>
                  <button type="button" className={px.replay === 'no' ? styles.on : ''} onClick={() => setP('replay', 'no')}>Off</button>
                  <button type="button" className={px.replay === 'yes' ? styles.on : ''} onClick={() => setP('replay', 'yes')}>On</button>
                </div>
              </div>
            </>)}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Reveal</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map((k) => (
                    <button key={k} type="button" className={k === mode ? styles.tabActive : styles.tab} onClick={() => setMode(k)}>{LABELS[k]}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Scroll Reveal is a <strong>per-element</strong> control on the <strong>Animations</strong>
          tab — a clip-path wipe (up / down / left / right / iris / diagonal) or the Canvas
          <strong> Pixelate In</strong> for images. It fires on a passive scroll-into-view check and
          honours reduced motion (shown instantly). Only the one chosen style's CSS/JS ships.
        </p>
      </div>
    </div>
  );
}
