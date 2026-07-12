/*
 * Horizontal Scroll Section — interactive playground.
 *
 * Ports the real runtime (modules/horizontal-scroll): a pinned section translates its panel row
 * sideways as you scroll. Track-level styles (standard / reverse / snap / wall / skew) live in the
 * core; per-panel styles (coverflow / rotate3d / parallax / fade / blur / arc / wave / zigzag / grow)
 * are verbatim from the effect partials. Here the vertical "scroll" slider on the right scrubs the
 * horizontal travel; the Drag / Flick style is a grab-and-throw strip. Options map 1:1 to the atts.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Per-panel transform recipes — verbatim from static/js/effects/*.js (d = centre-distance / viewport).
const FX = {
  coverflow: (d, i, I) => ({tf: `scale(${(1 - clamp(Math.abs(d) * I * 1.1, 0, 0.4)).toFixed(3)})`, op: (1 - clamp(Math.abs(d) * I * 1.4, 0, 0.65)).toFixed(3)}),
  rotate3d: (d, i, I) => ({tf: `perspective(1200px) rotateY(${clamp(-d * I * 90, -55, 55).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.1).toFixed(3)})`}),
  parallax: (d, i, I, sc) => ({tf: `translate3d(${(((i % 2) ? 1 : -1) * sc * 0.08 * I).toFixed(1)}px,0,0)`}),
  fade: (d, i, I) => ({op: (1 - clamp(Math.abs(d) * I * 1.6, 0, 0.82)).toFixed(3)}),
  blur: (d, i, I) => ({fil: `blur(${clamp(Math.abs(d) * I * 9, 0, 10).toFixed(2)}px)`, op: (1 - clamp(Math.abs(d) * I * 0.5, 0, 0.4)).toFixed(3)}),
  arc: (d, i, I) => ({tf: `translate3d(0,${(-I * 60 * Math.max(0, 1 - (d * 2) * (d * 2))).toFixed(1)}px,0)`}),
  wave: (d, i, I) => ({tf: `translate3d(0,${(Math.sin(d * Math.PI * 3) * I * 40).toFixed(1)}px,0)`}),
  zigzag: (d, i, I) => ({tf: `translate3d(0,${(((i % 2) ? 1 : -1) * I * 40).toFixed(1)}px,0)`}),
  grow: (d, i, I) => { const g = Math.max(0, d); return {tf: `scale(${(1 - clamp(g * I * 1.2, 0, 0.4)).toFixed(3)})`, op: (1 - clamp(g * I * 1.5, 0, 0.7)).toFixed(3)}; },
};

const GROUPS = [
  ['Track', [['standard', 'Standard'], ['reverse', 'Reverse'], ['snap', 'Snap'], ['wall', 'Perspective Wall'], ['skew', 'Velocity Skew'], ['drag', 'Drag / Flick']]],
  ['Per-panel', [['coverflow', 'Center Focus'], ['rotate3d', '3D Carousel'], ['parallax', 'Parallax'], ['fade', 'Fade'], ['blur', 'Blur Focus'], ['grow', 'Grow In'], ['arc', 'Arc'], ['wave', 'Wave'], ['zigzag', 'Zigzag']]],
];
const LABEL = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const PANELS = [
  {t: 'Aurora', c: 'linear-gradient(135deg,#6a8dff,#c56cff)'},
  {t: 'Ember', c: 'linear-gradient(135deg,#f59e0b,#e0447d)'},
  {t: 'Forest', c: 'linear-gradient(135deg,#17a34a,#00c2b2)'},
  {t: 'Ocean', c: 'linear-gradient(135deg,#2f74e6,#00b2b2)'},
  {t: 'Plum', c: 'linear-gradient(135deg,#9333ea,#e0447d)'},
  {t: 'Slate', c: 'linear-gradient(135deg,#475569,#94a3b8)'},
];
const WIDTHS = [['auto', 'Natural'], ['60vw', 'Narrow (60%)'], ['80vw', 'Wide (80%)'], ['100vw', 'Full (100%)']];
const DEFAULTS = {panel_width: '80vw', intensity: 0.5};

function buildPhp(mode, o) {
  return `// On the Section (Section → Animations → Horizontal Scroll), with 2+ column "panels":
'horizontal_scroll' => [
    'mode' => '${mode}',
    '${mode}' => [
        'panel_width' => '${o.panel_width}',
        'intensity'   => ${o.intensity},
    ],
],`;
}

export default function HorizontalScrollPlayground() {
  const [mode, setMode] = useState('coverflow');
  const [o, setO] = useState(DEFAULTS);
  const [pos, setPos] = useState(0);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef([]);
  const posRef = useRef(0);
  const sliderElRef = useRef(null);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));
  const isDrag = mode === 'drag';

  // size the panels relative to the stage (vw → % of the stage viewport)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const applyWidths = () => {
      const w = stage.clientWidth;
      const frac = o.panel_width === '60vw' ? 0.6 : o.panel_width === '80vw' ? 0.8 : o.panel_width === '100vw' ? 1 : 0;
      const px = frac ? Math.round(w * frac) : 240;
      panelRefs.current.filter(Boolean).forEach((p) => { p.style.flex = `0 0 ${px}px`; });
    };
    applyWidths();
    window.addEventListener('resize', applyWidths);
    return () => window.removeEventListener('resize', applyWidths);
  }, [o.panel_width]);

  // the scroll → transform engine (all non-drag styles) or the drag strip
  useEffect(() => {
    const stage = stageRef.current, track = trackRef.current;
    if (!stage || !track) return undefined;
    const panels = panelRefs.current.filter(Boolean);
    const I = clamp(o.intensity, 0, 1);

    if (isDrag) {
      // free grab-and-throw strip (ported initDrag), horizontal only
      panels.forEach((p) => { p.style.transform = ''; p.style.opacity = ''; p.style.filter = ''; });
      let x = 0, min = 0, startX = 0, startPos = 0, dragging = false, vx = 0, last = 0, raf = 0;
      const bounds = () => { min = Math.min(0, stage.clientWidth - track.scrollWidth); };
      const apply = () => { x = clamp(x, min, 0); track.style.transform = `translate3d(${x}px,0,0)`; };
      const px = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
      const move = (e) => { if (!dragging) return; const cx = px(e); x = startPos + (cx - startX); vx = cx - last; last = cx; apply(); };
      const up = () => { if (!dragging) return; dragging = false; track.classList.remove(styles.grabbing); inertia(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
      const down = (e) => { dragging = true; track.classList.add(styles.grabbing); startX = px(e); startPos = x; vx = 0; last = startX; if (raf) cancelAnimationFrame(raf); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); };
      const inertia = () => { if (Math.abs(vx) < 0.4) return; x += vx; vx *= 0.94; apply(); raf = requestAnimationFrame(inertia); };
      track.addEventListener('pointerdown', down);
      bounds(); apply();
      const onResize = () => { bounds(); apply(); };
      window.addEventListener('resize', onResize);
      return () => { track.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); track.style.transform = ''; };
    }

    let raf = 0, cancelled = false, last = 0, curSkew = 0;
    const loop = () => {
      if (cancelled) return;
      const dist = Math.max(0, track.scrollWidth - stage.clientWidth);
      const scrolled = posRef.current * dist;
      const vel = scrolled - last; last = scrolled;
      let baseX;
      if (mode === 'reverse') baseX = -(dist - scrolled);
      else if (mode === 'snap') { const step = panels[0] ? panels[0].getBoundingClientRect().width || 1 : 1; baseX = clamp(-Math.round(scrolled / step) * step, -dist, 0); }
      else baseX = -scrolled;
      let t = `translate3d(${baseX.toFixed(1)}px,0,0)`;
      if (mode === 'skew') { const target = clamp(vel * I * 3, -16, 16); curSkew += (target - curSkew) * 0.15; if (Math.abs(curSkew) < 0.02) curSkew = 0; t += ` skewX(${curSkew.toFixed(2)}deg)`; }
      if (mode === 'wall') t = `perspective(1400px) rotateY(${(-I * 22).toFixed(1)}deg) ` + t;
      track.style.transform = t;

      const fx = FX[mode];
      if (fx) {
        const sr = stage.getBoundingClientRect(), cx = sr.left + sr.width / 2, vw = sr.width;
        for (let i = 0; i < panels.length; i++) {
          const r = panels[i].getBoundingClientRect();
          const d = ((r.left + r.width / 2) - cx) / vw;
          panels[i].style.transformOrigin = 'center center';
          const out = fx(d, i, I, scrolled) || {};
          panels[i].style.transform = out.tf || '';
          panels[i].style.opacity = (out.op !== undefined && out.op !== '') ? out.op : '';
          panels[i].style.filter = out.fil || '';
        }
      } else {
        panels.forEach((p) => { p.style.transform = ''; p.style.opacity = ''; p.style.filter = ''; });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelled = true; cancelAnimationFrame(raf); track.style.transform = ''; };
  }, [mode, o, isDrag]);

  const onSlide = (v) => { setPos(v); posRef.current = v / 100; };
  const php = useMemo(() => buildPhp(mode, o), [mode, o]);

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div ref={stageRef} className={styles.stage}>
            <div className={styles.pin}>
              <div ref={trackRef} className={`${styles.track} ${isDrag ? styles.trackDrag : ''}`}>
                {PANELS.map((p, i) => (
                  <div key={i} ref={(el) => (panelRefs.current[i] = el)} className={styles.panel} style={{background: p.c}}>
                    <span className={styles.panelNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.panelTitle}>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
            {!isDrag && (
              <input ref={sliderElRef} type="range" className={styles.vscroll} min="0" max="100" step="1"
                value={pos} onChange={(e) => onSlide(Number(e.target.value))} aria-label="Scroll position" />
            )}
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>{isDrag
              ? 'Grab the strip and throw it — free horizontal drag with inertia.'
              : 'Drag the vertical scroll on the right — the pinned panels travel sideways.'}</span>
          </div>

          <div className={styles.controls}>
            <h5>{LABEL[mode]} — options</h5>
            <div className={styles.control}>
              <label>Panel width</label>
              <select className={styles.select} value={o.panel_width} onChange={(e) => set('panel_width', e.target.value)}>
                {WIDTHS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className={styles.control}>
              <label>Intensity <span>{o.intensity}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={o.intensity} onChange={(e) => set('intensity', Number(e.target.value))} disabled={isDrag} />
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map(([k, l]) => (
                    <button key={k} type="button" className={k === mode ? styles.tabActive : styles.tab} onClick={() => setMode(k)}>{l}</button>
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
          Horizontal Scroll is a <strong>Section-level</strong> control — Section → <strong>Animations</strong>
          tab → <strong>Horizontal Scroll</strong>. Build the Section with 2+ columns as the panels; the
          Section pins and its row translates sideways as you scroll (or free-drag in Drag / Flick). Pure
          sticky + one passive scroll listener; honours reduced motion (panels flow normally).
        </p>
      </div>
    </div>
  );
}
