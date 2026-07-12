/*
 * Scroll Reveal — interactive playground.
 *
 * Ports the real module: the clip-wipe directions (base.css + effects/*.css — an element starts
 * clipped and transitions clip-path to full when `.is-in` is added) and the canvas "Pixelate In"
 * (effects/pixelate.js — draw the <img> to a <canvas> with smoothing off, then step the resolution
 * up from blocks to sharp). The stage is a real scroll viewport: the card starts BELOW the fold and
 * reveals when you scroll it into view (mirroring the runtime's scroll-into-view check against the
 * stage instead of the window). Reset scrolls back to the top. Options map 1:1 to the atts.
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

const CLIP_DEFAULTS = {duration: 0.7, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', replay: 'yes'};
const PX_DEFAULTS = {coarseness: 100, steps: 5, speed: 80, replay: 'yes'};

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
  const stageRef = useRef(null);
  const elRef = useRef(null);
  const timersRef = useRef([]);
  const isPx = mode === 'pixelate';

  const clearTimers = () => { timersRef.current.forEach((t) => clearTimeout(t)); timersRef.current = []; };

  useEffect(() => {
    const stage = stageRef.current;
    const el = elRef.current;
    if (!stage || !el) return undefined;
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
    let revealed = false;
    const replay = (isPx ? px.replay : clip.replay) === 'yes';

    // Is the card within the stage's scroll viewport? (mirrors the runtime's threshold check,
    // measured against the stage box instead of the window.)
    function inView() {
      const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
      return r.top < s.top + s.height * 0.9 && r.bottom > s.top + s.height * 0.1;
    }

    let reveal, hide;

    if (!isPx) {
      el.classList.add('sc-clip-reveal', 'sc-clip--' + mode);
      el.style.setProperty('--cr-dur', clip.duration + 's');
      if (clip.delay > 0) el.style.setProperty('--cr-delay', clip.delay + 's');
      el.style.setProperty('--cr-ease', clip.easing);
      void el.offsetWidth;
      reveal = () => el.classList.add('is-in');
      hide = () => el.classList.remove('is-in');
    } else if (img) {
      el.classList.add('sc-pixel-reveal');
      const coarse = px.coarseness || 100;
      const steps = Math.max(2, px.steps || 5);
      const speed = px.speed || 80;

      let ctx, canvas, ratio, sizes;
      const buildCanvas = () => {
        if (!img.naturalWidth) { img.addEventListener('load', buildCanvas, {once: true}); return; }
        canvas = document.createElement('canvas');
        canvas.className = 'sc-px-canvas';
        ctx = canvas.getContext('2d');
        if (!ctx) return;
        ratio = img.naturalWidth / img.naturalHeight;
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.appendChild(canvas);
        el.classList.add('sc-pixel-active');
        const startSize = Math.min(0.5, Math.max(0.01, 1 / coarse));
        sizes = [];
        for (let i = 0; i < steps; i++) sizes.push(startSize * Math.pow(1 / startSize, i / (steps - 1)));
        sizes[sizes.length - 1] = 1;
        fit(); draw(sizes[0]); // blocky initial state (shown below the fold)
      };
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
        ctx.imageSmoothingEnabled = size >= 1;
        ctx.clearRect(0, 0, w, h);
        const sw = Math.max(1, Math.round(cw * size)), sh = Math.max(1, Math.round(ch * size));
        ctx.drawImage(img, 0, 0, sw, sh);
        ctx.drawImage(canvas, 0, 0, sw, sh, cx, cy, cw, ch);
      }
      buildCanvas();
      reveal = () => {
        if (!ctx || !sizes) return;
        fit();
        let k = 0;
        const stepFn = () => {
          if (cancelled || k >= sizes.length || !el.isConnected) return;
          draw(sizes[k]);
          const wait = (k === 0) ? speed * 3 : speed;
          k++;
          timersRef.current.push(setTimeout(() => requestAnimationFrame(stepFn), wait));
        };
        stepFn();
      };
      hide = () => { if (ctx && sizes) { clearTimers(); fit(); draw(sizes[0]); } };
    }

    // scroll-into-view driver against the stage viewport
    let pending = false;
    function onScroll() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        if (cancelled) return;
        const v = inView();
        if (v && !revealed) { revealed = true; reveal && reveal(); }
        else if (!v && revealed && replay) { revealed = false; hide && hide(); }
      });
    }
    stage.addEventListener('scroll', onScroll, {passive: true});
    // initial check (card is below the fold on load, so this stays hidden until the user scrolls)
    const id = requestAnimationFrame(onScroll);

    return () => { cancelled = true; cancelAnimationFrame(id); clearTimers(); stage.removeEventListener('scroll', onScroll); const c = el.querySelector('.sc-px-canvas'); if (c) c.remove(); if (img) img.style.opacity = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isPx ? JSON.stringify(px) : JSON.stringify(clip)]);

  const reset = () => { const st = stageRef.current; if (st) st.scrollTo({top: 0, behavior: 'smooth'}); };

  const php = useMemo(() => phpColorless(mode, isPx ? px : clip), [mode, clip, px, isPx]);
  const setC = (k, v) => setClip((s) => ({...s, [k]: v}));
  const setP = (k, v) => setPx((s) => ({...s, [k]: v}));

  return (
    <div className={styles.playground}>
      <style>{CLIP_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div ref={stageRef} className={`${styles.stage} srstage`}>
            <div className={styles.scrollArea}>
              <div className={styles.prompt}><span className={styles.arrow}>↓</span> Scroll down to reveal</div>
              <div className={styles.cardWrap}>
                <div ref={elRef} className={styles.card}>
                  <img className={styles.cardImg} src={DEMO_IMG} alt="" width="440" height="280" />
                  <div className={styles.cardBody}>
                    <h4>Reveal me</h4>
                    <p>This element un-masks as it enters view.</p>
                  </div>
                </div>
              </div>
              <div className={styles.spacer} />
            </div>
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Scroll inside the stage to reveal the {LABELS[mode]} effect.</span>
            <button type="button" className={styles.replay} onClick={reset}>↻ Reset (scroll to top)</button>
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
