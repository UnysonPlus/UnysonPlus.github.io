/*
 * Sticky Card Stack — interactive playground.
 *
 * Ports the real runtime (modules/sticky-stack): each card is position:sticky with a staggered top,
 * and as you scroll, cover(i) = how much card i is covered by the next one drives a per-style
 * transform (11 styles). Here the "page scroll" is a real scroll inside the stage; the vertical
 * slider on the right edge scrubs it. Options (pin offset / stagger / intensity) map 1:1 to the atts.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Per-card transform recipes — verbatim from static/js/effects/*.js.
const FX = {
  stack: (i, cp, pp, ctx) => ({transform: `scale(${(1 - ctx.intensity * 0.12 * cp).toFixed(4)})`}),
  scale_fade: (i, cp, pp, ctx) => ({transform: `scale(${(1 - ctx.intensity * 0.1 * cp).toFixed(4)})`, opacity: 1 - Math.min(0.7, ctx.intensity * 0.8) * cp}),
  fade: (i, cp, pp, ctx) => ({opacity: 1 - Math.min(0.85, ctx.intensity) * cp}),
  blur: (i, cp, pp, ctx) => ({filter: `blur(${(ctx.intensity * 10 * cp).toFixed(2)}px)`, opacity: 1 - 0.15 * cp}),
  tilt: (i, cp, pp, ctx) => ({transform: `perspective(1200px) rotateX(${(-ctx.intensity * 55 * cp).toFixed(2)}deg) scale(${(1 - 0.05 * cp).toFixed(4)})`}),
  fan: (i, cp, pp, ctx) => ({origin: 'center bottom', transform: `rotate(${((i - ctx.center) * ctx.intensity * 10).toFixed(2)}deg) scale(${(1 - ctx.intensity * 0.06 * cp).toFixed(4)})`}),
  messy: (i, cp, pp, ctx) => ({transform: `rotate(${(((i % 2) ? 1 : -1) * ctx.intensity * 7 * (1 + (i % 3) * 0.35)).toFixed(2)}deg) scale(${(1 - ctx.intensity * 0.05 * cp).toFixed(4)})`}),
  side: (i, cp, pp, ctx) => ({transform: `translateX(${(i * ctx.intensity * 42).toFixed(1)}px) scale(${(1 - ctx.intensity * 0.05 * cp).toFixed(4)})`}),
  peel: (i, cp, pp, ctx) => ({transform: `translateY(${(-cp * 106).toFixed(2)}%)`, opacity: 1 - cp * 0.7}),
  push: (i, cp, pp, ctx) => ({transform: `translateY(${(-cp * 102).toFixed(2)}%)`}),
  grow: (i, cp, pp, ctx) => { const base = 1 - ctx.intensity * 0.5; return {transform: `scale(${(base + (1 - base) * pp).toFixed(4)})`}; },
};
const AWAY = {peel: 1, push: 1};

const STYLES = [
  ['stack', 'Card Stack'], ['scale_fade', 'Scale & Fade'], ['fade', 'Fade Under'], ['blur', 'Blur Under'],
  ['tilt', '3D Tilt Back'], ['fan', 'Fan Deck'], ['messy', 'Rotate Messy'], ['side', 'Side Offset'],
  ['peel', 'Peel Away'], ['push', 'Push Conveyor'], ['grow', 'Grow In'],
];
const CARDS = [
  {t: 'Discover', c: '#2f74e6'}, {t: 'Design', c: '#e0447d'}, {t: 'Build', c: '#17a34a'},
  {t: 'Refine', c: '#9333ea'}, {t: 'Ship', c: '#f59e0b'},
];
const DEFAULTS = {top_offset: 40, gap: 18, intensity: 0.5};

function buildPhp(mode, o) {
  return `// On the Section (Section → Animations → Sticky Card Stack), with 2+ column "cards":
'sticky_stack' => [
    'mode' => '${mode}',
    '${mode}' => [
        'top_offset' => ${o.top_offset},
        'gap'        => ${o.gap},
        'intensity'  => ${o.intensity},
    ],
],`;
}

export default function StickyStackPlayground() {
  const [mode, setMode] = useState('stack');
  const [o, setO] = useState(DEFAULTS);
  const [pos, setPos] = useState(0);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const sliderElRef = useRef(null);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));

  useEffect(() => {
    const scroller = scrollerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!scroller || cards.length < 2) return undefined;
    const n = cards.length, center = (n - 1) / 2, away = !!AWAY[mode];
    const fx = FX[mode];
    const ctx = {intensity: clamp(o.intensity, 0, 1), center};

    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      card.style.top = (o.top_offset + i * o.gap) + 'px';
      card.style.zIndex = String(away ? (n - i) : (i + 1));
      card.style.willChange = 'transform, opacity, filter';
    });

    const cover = (i) => {
      if (i < 0) return 1;
      if (i >= n - 1) return 0;
      const cr = cards[i].getBoundingClientRect(), nr = cards[i + 1].getBoundingClientRect();
      const visible = nr.top - cr.top;
      return 1 - clamp(cr.height ? visible / cr.height : 0, 0, 1);
    };

    let pending = false;
    const tick = () => {
      pending = false;
      const covers = [];
      for (let i = 0; i < n; i++) covers[i] = cover(i);
      let prev = 1;
      for (let j = 0; j < n; j++) {
        const s = fx(j, covers[j], prev, ctx) || {};
        const card = cards[j];
        card.style.transform = s.transform || 'none';
        card.style.transformOrigin = s.origin || 'center top';
        card.style.opacity = s.opacity == null ? '' : String(s.opacity.toFixed(3));
        card.style.filter = s.filter || '';
        prev = covers[j];
      }
      const max = scroller.scrollHeight - scroller.clientHeight;
      if (sliderElRef.current && max > 0) sliderElRef.current.value = String(Math.round((scroller.scrollTop / max) * 100));
    };
    const onScroll = () => { if (pending) return; pending = true; requestAnimationFrame(tick); };
    scroller.addEventListener('scroll', onScroll, {passive: true});
    tick();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [mode, o]);

  const onSlide = (v) => {
    setPos(v);
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = (v / 100) * (scroller.scrollHeight - scroller.clientHeight);
  };

  const php = useMemo(() => buildPhp(mode, o), [mode, o]);

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div ref={scrollerRef} className={styles.scroller}>
              {CARDS.map((c, i) => (
                <div key={i} ref={(el) => (cardRefs.current[i] = el)} className={styles.card} style={{background: c.c}}>
                  <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.cardTitle}>{c.t}</span>
                </div>
              ))}
              <div className={styles.spacer} />
            </div>
            <input ref={sliderElRef} type="range" className={styles.vscroll} min="0" max="100" step="1"
              defaultValue={pos} onChange={(e) => onSlide(Number(e.target.value))} aria-label="Scroll position" />
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Drag the vertical scroll on the right — each card pins in turn and the covered cards transform.</span>
          </div>

          <div className={styles.controls}>
            <h5>{STYLES.find((s) => s[0] === mode)[1]} — options</h5>
            <div className={styles.control}>
              <label>Pin offset (px) <span>{o.top_offset}</span></label>
              <input type="range" min="0" max="120" step="4" value={o.top_offset} onChange={(e) => set('top_offset', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Stagger (px) <span>{o.gap}</span></label>
              <input type="range" min="0" max="60" step="2" value={o.gap} onChange={(e) => set('gap', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Intensity <span>{o.intensity}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={o.intensity} onChange={(e) => set('intensity', Number(e.target.value))} />
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Stack effect</span>
              <div className={styles.tabPills}>
                {STYLES.map(([k, label]) => (
                  <button key={k} type="button" className={k === mode ? styles.tabActive : styles.tab} onClick={() => setMode(k)}>{label}</button>
                ))}
              </div>
            </div>
            <p className={styles.tip}>Section-level: each direct column of the Section becomes a pinned card.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Sticky Card Stack is a <strong>Section-level</strong> control — Section → <strong>Animations</strong>
          tab → <strong>Sticky Card Stack</strong>. Build the Section with 2+ full-width columns as the
          cards; each becomes <code>position: sticky</code> and pins in turn, transforming per style as
          it's covered. Pure CSS + one passive scroll listener; honours reduced motion (cards just stack).
        </p>
      </div>
    </div>
  );
}
