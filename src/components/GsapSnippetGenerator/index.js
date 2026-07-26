/*
 * GSAP Timeline Studio — composes a scroll-tied GSAP timeline for the Custom Code (Motion Snippet)
 * field. Multi-target choreography, full per-property control (2D + real 3D, filters, clip, colour),
 * keyframes, loop/yoyo, advanced stagger, random values and fromTo — all GSAP CORE, contract-faithful.
 *
 * Previews by running the exact generated code (new Function('el','tl','gsap', code)) against a
 * switchable demo (cards / text / single / device), with a visual timeline strip + draggable playhead.
 * State round-trips through the URL hash so a composition is shareable.
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from './styles.module.css';

const PROP = {
  x: {label: 'x', unit: 'px', type: 'num', def: 60},
  y: {label: 'y', unit: 'px', type: 'num', def: 60},
  xPercent: {label: 'xPercent', unit: '%', type: 'num', def: 0},
  yPercent: {label: 'yPercent', unit: '%', type: 'num', def: 100},
  rotation: {label: 'rotation', unit: 'deg', type: 'num', def: 15},
  scale: {label: 'scale', type: 'num', def: 0.8, step: 0.05},
  scaleX: {label: 'scaleX', type: 'num', def: 1, step: 0.05},
  scaleY: {label: 'scaleY', type: 'num', def: 1, step: 0.05},
  skewX: {label: 'skewX', unit: 'deg', type: 'num', def: 10},
  rotationX: {label: 'rotationX', unit: 'deg', type: 'num', def: -90},
  rotationY: {label: 'rotationY', unit: 'deg', type: 'num', def: 90},
  z: {label: 'z', unit: 'px', type: 'num', def: 0},
  transformPerspective: {label: 'perspective', unit: 'px', type: 'num', def: 800},
  transformOrigin: {label: 'transformOrigin', type: 'text', def: '50% 50%'},
  opacity: {label: 'opacity', type: 'num', def: 0, min: 0, max: 1, step: 0.05},
  filter: {label: 'blur', unit: 'px', type: 'num', def: 12, format: 'blur'},
  clipPath: {label: 'clipPath', type: 'clip', def: 'inset(0 0 100% 0)'},
  backgroundColor: {label: 'backgroundColor', type: 'color', def: '#2F74E6'},
  color: {label: 'color', type: 'color', def: '#ffffff'},
  borderRadius: {label: 'borderRadius', type: 'text', def: '16px'},
};
const PROP_GROUPS = [
  {label: 'Transform', keys: ['x', 'y', 'xPercent', 'yPercent', 'rotation', 'scale', 'scaleX', 'scaleY', 'skewX']},
  {label: '3D', keys: ['rotationX', 'rotationY', 'z', 'transformPerspective', 'transformOrigin']},
  {label: 'Appearance', keys: ['opacity', 'backgroundColor', 'color', 'borderRadius']},
  {label: 'Filter / Clip', keys: ['filter', 'clipPath']},
];
const CLIPS = [
  {v: 'inset(0 0 100% 0)', label: 'Reveal upward'}, {v: 'inset(100% 0 0 0)', label: 'Reveal downward'},
  {v: 'inset(0 100% 0 0)', label: 'Reveal from left'}, {v: 'inset(0 0 0 100%)', label: 'Reveal from right'},
  {v: 'circle(0% at 50% 50%)', label: 'Circle open'}, {v: 'inset(50% 0 50% 0)', label: 'Bar (horizontal)'},
];
const QUICK = {
  fadeUp: {label: 'Fade up', method: 'from', props: {y: 60, opacity: 0}},
  slideLeft: {label: 'Slide from left', method: 'from', props: {x: -60, opacity: 0}},
  scaleIn: {label: 'Scale in', method: 'from', props: {scale: 0.8, opacity: 0}},
  zoomIn: {label: 'Zoom in', method: 'from', props: {scale: 0.4, opacity: 0}},
  flip3dX: {label: '3D flip (X)', method: 'from', props: {rotationX: -90, opacity: 0, transformPerspective: 800, transformOrigin: '50% 0%'}},
  flip3dY: {label: '3D flip (Y)', method: 'from', props: {rotationY: 90, opacity: 0, transformPerspective: 800}},
  spinIn: {label: 'Spin in', method: 'from', props: {rotation: -180, scale: 0, opacity: 0}},
  blurIn: {label: 'Blur in', method: 'from', props: {opacity: 0, filter: 12}},
  clipUp: {label: 'Clip reveal', method: 'from', props: {clipPath: 'inset(0 0 100% 0)'}},
};
const KF = {
  bounce: {label: 'Bounce in', kf: {y: [60, 0, -18, 0], opacity: [0, 1, 1, 1]}, ease: 'power1.out', duration: 1},
  wobble: {label: 'Wobble', kf: {rotation: [0, -8, 6, -4, 2, 0]}, ease: 'sine.inOut', duration: 0.9},
  shake: {label: 'Shake', kf: {x: [0, -10, 10, -8, 8, -4, 0]}, ease: 'sine.inOut', duration: 0.6},
  pulse: {label: 'Pulse', kf: {scale: [1, 1.12, 1]}, ease: 'sine.inOut', duration: 0.7},
  glitch: {label: 'Glitch', kf: {x: [0, -6, 6, -4, 0], skewX: [0, 10, -8, 4, 0]}, ease: 'steps(5)', duration: 0.5},
};
const EASES = ['none', 'power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'back.in(1.7)',
  'elastic.out(1, 0.4)', 'expo.out', 'circ.out', 'sine.inOut', 'steps(5)', 'bounce.out', 'power2.inOut'];
const POSITIONS = [{v: '', label: 'After previous'}, {v: '<', label: 'With previous'}, {v: '-=0.3', label: 'Overlap previous'}, {v: 'custom', label: 'Custom offset…'}];
const STAGGER_FROM = ['start', 'center', 'end', 'edges', 'random'];
const LOOPS = [{v: 'none', label: 'No loop'}, {v: 'loop', label: 'Loop (repeat)'}, {v: 'pingpong', label: 'Ping-pong (yoyo)'}];
const LAYOUTS = [{v: 'cards', label: 'Cards'}, {v: 'text', label: 'Text lines'}, {v: 'single', label: 'Single block'}, {v: 'device', label: 'Device'}];
const START_CHOICES = [
  {v: 'top 100%', label: 'As soon as it enters'}, {v: 'top 80%', label: 'When 20% into view (default)'},
  {v: 'top 60%', label: 'When 40% into view'}, {v: 'top center', label: 'When it reaches the middle'}, {v: 'top 30%', label: 'Well into view'},
];
const SCRUB_CHOICES = [{v: 'no', label: 'Play once on enter'}, {v: 'yes', label: 'Scrub with scroll'}, {v: 'smooth', label: 'Smooth scrub (eased)'}];
const labelOf = (list, v) => (list.find((x) => x.v === v) || {}).label || v;

let sid = 1;
const mkStep = (p = {}) => ({
  id: sid++, targetKind: 'el', selector: '.card', method: 'from', mode: 'tween',
  props: {y: 60, opacity: 0}, rand: {}, toProps: {}, kf: 'bounce',
  duration: 0.8, ease: 'power2.out', delay: 0, staggerAmount: 0.1, staggerFrom: 'start',
  position: '', positionCustom: '-=0.2', ...p,
});

const TEMPLATES = {
  cardGrid: {label: 'Card grid reveal', layout: 'cards', loop: 'none', steps: [
    {targetKind: 'el', method: 'from', props: {y: 40, opacity: 0}, duration: 0.6, ease: 'power3.out'},
    {targetKind: 'children', selector: '.card', method: 'from', props: {scale: 0, opacity: 0, transformOrigin: 'center'}, duration: 0.6, ease: 'back.out(1.7)', staggerAmount: 0.08, staggerFrom: 'center', position: '-=0.3'},
  ]},
  flip3d: {label: '3D flip sequence', layout: 'cards', loop: 'none', steps: [
    {targetKind: 'el', method: 'from', props: {rotationX: -90, opacity: 0, transformPerspective: 800, transformOrigin: '50% 0%'}, duration: 0.8, ease: 'power3.out'},
    {targetKind: 'children', selector: '.card', method: 'from', props: {rotationY: 70, opacity: 0, transformPerspective: 1000}, duration: 0.7, ease: 'power2.out', staggerAmount: 0.1, position: '-=0.2'},
  ]},
  cascade: {label: 'Letter cascade', layout: 'text', loop: 'none', steps: [
    {targetKind: 'children', selector: '.ch', method: 'from', props: {yPercent: 120, opacity: 0}, duration: 0.7, ease: 'power4.out', staggerAmount: 0.04},
  ]},
  hero: {label: 'Hero rise + fade', layout: 'text', loop: 'none', steps: [
    {targetKind: 'children', selector: '.line', method: 'from', props: {y: 30, opacity: 0}, duration: 0.7, ease: 'power2.out', staggerAmount: 0.12},
  ]},
  float: {label: 'Ambient float', layout: 'single', loop: 'pingpong', steps: [
    {targetKind: 'el', method: 'to', props: {y: -12}, duration: 1.6, ease: 'sine.inOut'},
  ]},
};

function serialize(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v}'`;
  if (Array.isArray(v)) return `[${v.map(serialize).join(', ')}]`;
  if (v && typeof v === 'object') return `{ ${Object.entries(v).map(([k, x]) => `${k}: ${serialize(x)}`).join(', ')} }`;
  return String(v);
}
function propVal(key, val, rand) {
  const d = PROP[key];
  if (rand && d && d.type === 'num') { const a = Math.abs(val); return `random(${-a}, ${a})`; }
  if (d && d.format === 'blur') return `blur(${val}px)`;
  return val;
}

export default function GsapSnippetGenerator() {
  const [steps, setSteps] = useState(() => [mkStep(), mkStep({targetKind: 'children', props: {rotationY: 60, opacity: 0, transformPerspective: 1000}, position: '<'})]);
  const [loop, setLoop] = useState('none');
  const [layout, setLayout] = useState('cards');
  const [triggerStart, setTriggerStart] = useState('top 80%');
  const [scrub, setScrub] = useState('no');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [timing, setTiming] = useState({items: [], total: 1});
  const [playing, setPlaying] = useState(true);

  const previewRef = useRef(null);
  const tlRef = useRef(null);
  const restartRef = useRef(null);
  const stripRef = useRef(null);
  const headRef = useRef(null);
  const hydrated = useRef(false);

  /* ---- URL-hash round-trip ---- */
  useEffect(() => {
    if (typeof window === 'undefined' || hydrated.current) return;
    hydrated.current = true;
    try {
      const h = window.location.hash.replace(/^#s=/, '');
      if (!h) return;
      const o = JSON.parse(decodeURIComponent(escape(window.atob(decodeURIComponent(h)))));
      if (o.steps) { sid = 1; setSteps(o.steps.map((s) => mkStep(s))); }
      if (o.loop) setLoop(o.loop);
      if (o.layout) setLayout(o.layout);
      if (o.start) setTriggerStart(o.start);
      if (o.scrub) setScrub(o.scrub);
    } catch (e) {}
  }, []);
  const share = () => {
    const strip = (s) => ({targetKind: s.targetKind, selector: s.selector, method: s.method, mode: s.mode, props: s.props, rand: s.rand, toProps: s.toProps, kf: s.kf, duration: s.duration, ease: s.ease, delay: s.delay, staggerAmount: s.staggerAmount, staggerFrom: s.staggerFrom, position: s.position, positionCustom: s.positionCustom});
    const json = JSON.stringify({steps: steps.map(strip), loop, layout, start: triggerStart, scrub});
    const hash = '#s=' + encodeURIComponent(window.btoa(unescape(encodeURIComponent(json))));
    window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
    setShared(true); setTimeout(() => setShared(false), 1600);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(window.location.href).catch(() => {});
  };

  const childClasses = useMemo(() => {
    const set = new Set(['card']);
    steps.forEach((s) => { if (s.targetKind === 'children') { const m = (s.selector || '').match(/\.([A-Za-z0-9_-]+)/g); if (m) m.forEach((t) => set.add(t.slice(1))); } });
    return Array.from(set).join(' ');
  }, [steps]);

  const targetExpr = (s) => (s.targetKind === 'children' ? `el.querySelectorAll('${s.selector || '.card'}')` : 'el');
  const posArgOf = (s, i) => {
    if (i === 0) return '';
    const p = s.position === 'custom' ? s.positionCustom : s.position;
    return p ? `, ${serialize(p)}` : '';
  };
  const varsFor = (s, withTiming) => {
    const v = {};
    if (s.mode === 'keyframes') v.keyframes = KF[s.kf].kf;
    else Object.entries(s.props).forEach(([k, val]) => { v[k] = propVal(k, val, s.rand[k]); });
    if (withTiming) {
      v.duration = s.duration;
      if (s.delay) v.delay = s.delay;
      if (s.ease && s.ease !== 'none') v.ease = s.ease;
      if (s.targetKind === 'children' && s.staggerAmount > 0) v.stagger = s.staggerFrom !== 'start' ? {each: s.staggerAmount, from: s.staggerFrom} : s.staggerAmount;
    }
    return v;
  };

  const code = useMemo(() => {
    let out = '';
    if (loop === 'loop') out += 'tl.repeat(-1);\n\n';
    else if (loop === 'pingpong') out += 'tl.repeat(-1).yoyo(true);\n\n';
    const lines = steps.map((s, i) => {
      if (s.mode !== 'keyframes' && s.method === 'fromTo') {
        return `  .fromTo(${targetExpr(s)}, ${serialize(varsFor(s, false))}, ${serialize({...varsFor({...s, props: s.toProps}, false), ...pickTiming(s)})}${posArgOf(s, i)})`;
      }
      const method = s.mode === 'keyframes' ? 'to' : s.method;
      return `  .${method}(${targetExpr(s)}, ${serialize(varsFor(s, true))}${posArgOf(s, i)})`;
    });
    return out + 'tl\n' + lines.join('\n') + ';';
  }, [steps, loop]);

  function pickTiming(s) {
    const t = {duration: s.duration};
    if (s.delay) t.delay = s.delay;
    if (s.ease && s.ease !== 'none') t.ease = s.ease;
    if (s.targetKind === 'children' && s.staggerAmount > 0) t.stagger = s.staggerFrom !== 'start' ? {each: s.staggerAmount, from: s.staggerFrom} : s.staggerAmount;
    return t;
  }

  const readTiming = (tl) => {
    try {
      const kids = tl.getChildren(false, true, false);
      const total = isFinite(tl.duration()) && tl.duration() > 0 ? tl.duration() : Math.max(1, ...kids.map((t) => t.startTime() + (isFinite(t.duration()) ? t.duration() : 1)));
      setTiming({items: kids.map((t) => ({start: t.startTime(), dur: isFinite(t.duration()) ? t.duration() : total})), total});
    } catch (e) { setTiming({items: [], total: 1}); }
  };

  const build = useCallback((autoplay) => {
    const el = previewRef.current;
    if (!el || typeof window === 'undefined') return null;
    clearTimeout(restartRef.current);
    const all = [el, ...el.querySelectorAll('*')];
    gsap.killTweensOf(all);
    gsap.set(all, {clearProps: 'all'});
    const tl = gsap.timeline({paused: !autoplay});
    try { new Function('el', 'tl', 'gsap', code)(el, tl, gsap); } catch (e) { if (typeof console !== 'undefined') console.warn('[GSAP preview]', e); }
    tlRef.current = tl;
    readTiming(tl);
    tl.eventCallback('onUpdate', () => { if (headRef.current) headRef.current.style.left = (tl.progress() * 100) + '%'; });
    if (autoplay && loop === 'none') tl.eventCallback('onComplete', () => { restartRef.current = setTimeout(() => build(true), 1100); });
    return tl;
  }, [code, loop, layout]);

  useEffect(() => {
    const t = setTimeout(() => { build(scrub === 'no' && playing); }, 130);
    return () => { clearTimeout(t); clearTimeout(restartRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build, scrub]);
  useEffect(() => () => clearTimeout(restartRef.current), []);

  const scrubTo = (clientX) => {
    const tl = tlRef.current, strip = stripRef.current;
    if (!tl || !strip) return;
    const r = strip.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    tl.pause(); setPlaying(false); tl.progress(pct);
    if (headRef.current) headRef.current.style.left = (pct * 100) + '%';
  };
  const onStripDown = (e) => { scrubTo(e.clientX); const mv = (ev) => scrubTo(ev.clientX); const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); }; window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); };
  const playPause = () => { const tl = tlRef.current; if (!tl) return; if (tl.paused()) { if (tl.progress() >= 1) tl.progress(0); tl.play(); setPlaying(true); } else { tl.pause(); setPlaying(false); } };
  const replay = () => { const tl = build(true); if (tl) setPlaying(true); };

  const patch = (id, p) => setSteps((s) => s.map((x) => (x.id === id ? {...x, ...p} : x)));
  const setProp = (id, key, val) => setSteps((s) => s.map((x) => (x.id === id ? {...x, props: {...x.props, [key]: val}} : x)));
  const setToProp = (id, key, val) => setSteps((s) => s.map((x) => (x.id === id ? {...x, toProps: {...x.toProps, [key]: val}} : x)));
  const toggleRand = (id, key) => setSteps((s) => s.map((x) => (x.id === id ? {...x, rand: {...x.rand, [key]: !x.rand[key]}} : x)));
  const addProp = (id, key, to) => { if (!key) return; setSteps((s) => s.map((x) => { if (x.id !== id) return x; const which = to ? 'toProps' : 'props'; return {...x, [which]: {...x[which], [key]: PROP[key].def}}; })); };
  const rmProp = (id, key, to) => setSteps((s) => s.map((x) => { if (x.id !== id) return x; const which = to ? 'toProps' : 'props'; const p = {...x[which]}; delete p[key]; return {...x, [which]: p}; }));
  const applyQuick = (id, k) => { if (QUICK[k]) patch(id, {method: QUICK[k].method, mode: 'tween', props: {...QUICK[k].props}, rand: {}}); };
  const addStep = () => setSteps((s) => [...s, mkStep({props: {y: 30, opacity: 0}, position: '<'})]);
  const rmStep = (id) => setSteps((s) => (s.length > 1 ? s.filter((x) => x.id !== id) : s));
  const dupStep = (id) => setSteps((s) => { const i = s.findIndex((x) => x.id === id); if (i < 0) return s; const c = mkStep({...s[i]}); const n = [...s]; n.splice(i + 1, 0, c); return n; });
  const move = (id, d) => setSteps((s) => { const i = s.findIndex((x) => x.id === id); const j = i + d; if (i < 0 || j < 0 || j >= s.length) return s; const n = [...s]; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const loadTemplate = (k) => { const t = TEMPLATES[k]; if (!t) return; sid = 1; setSteps(t.steps.map((s) => mkStep(s))); setLoop(t.loop); setLayout(t.layout); setPlaying(true); };

  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) {} };

  const propRow = (s, k, val, to) => (
    <div key={(to ? 't-' : '') + k} className={styles.propRow}>
      <span className={styles.propName}>{PROP[k] ? PROP[k].label : k}</span>
      {PROP[k] && PROP[k].type === 'color' ? (
        <input type="color" value={val} onChange={(e) => (to ? setToProp(s.id, k, e.target.value) : setProp(s.id, k, e.target.value))} className={styles.color} />
      ) : PROP[k] && PROP[k].type === 'clip' ? (
        <select className={styles.input} value={val} onChange={(e) => (to ? setToProp(s.id, k, e.target.value) : setProp(s.id, k, e.target.value))}>{CLIPS.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}</select>
      ) : PROP[k] && PROP[k].type === 'text' ? (
        <input className={styles.input} value={val} onChange={(e) => (to ? setToProp(s.id, k, e.target.value) : setProp(s.id, k, e.target.value))} />
      ) : (
        <input className={styles.input} type="number" value={val} step={(PROP[k] && PROP[k].step) || 1} min={PROP[k] && PROP[k].min} max={PROP[k] && PROP[k].max}
          onChange={(e) => (to ? setToProp(s.id, k, parseFloat(e.target.value)) : setProp(s.id, k, parseFloat(e.target.value)))} />
      )}
      {PROP[k] && PROP[k].unit && <span className={styles.unit}>{PROP[k].unit}</span>}
      {!to && PROP[k] && PROP[k].type === 'num' && (
        <button className={clsx(styles.rand, s.rand[k] && styles.randOn)} onClick={() => toggleRand(s.id, k)} title="Randomize (±value)">🎲</button>
      )}
      <button className={styles.rmProp} onClick={() => rmProp(s.id, k, to)} aria-label="Remove">×</button>
    </div>
  );
  const addPropSelect = (s, to) => (
    <select className={styles.addProp} value="" onChange={(e) => { addProp(s.id, e.target.value, to); e.target.value = ''; }}>
      <option value="">+ property…</option>
      {PROP_GROUPS.map((g) => <optgroup key={g.label} label={g.label}>{g.keys.filter((k) => !((to ? s.toProps : s.props)[k] != null)).map((k) => <option key={k} value={k}>{PROP[k].label}</option>)}</optgroup>)}
    </select>
  );

  const demo = () => {
    if (layout === 'text') return (<>
      <h3 className={styles.demoHeading}>{'ANIMATE'.split('').map((c, i) => <span key={i} className={clsx('ch', styles.ch)}>{c}</span>)}</h3>
      <p className={clsx('line', styles.line)}>A line of copy that rises in.</p>
      <p className={clsx('line', styles.line)}>Then a second line follows.</p>
    </>);
    if (layout === 'single') return <div className={clsx(styles.block, childClasses)} />;
    const cards = <div className={styles.demoCards}>{[0, 1, 2].map((c) => <div key={c} className={clsx(styles.card, childClasses)}>Card {c + 1}</div>)}</div>;
    if (layout === 'device') return <div className={styles.device}><div className={styles.deviceScreen}><div className={styles.demoTitle}>Your app</div>{cards}</div></div>;
    return (<><div className={styles.demoTitle}>Your element</div>{cards}</>);
  };

  const isScrub = scrub !== 'no';

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.topbar}>
          <select className={styles.input} value="" onChange={(e) => { loadTemplate(e.target.value); e.target.value = ''; }}>
            <option value="">Load a composition…</option>
            {Object.entries(TEMPLATES).map(([k, t]) => <option key={k} value={k}>{t.label}</option>)}
          </select>
          <button className={styles.share} onClick={share}>{shared ? '✓ Link copied' : '🔗 Share'}</button>
        </div>

        {steps.map((s, i) => (
          <div key={s.id} className={styles.stepCard}>
            <div className={styles.stepHead}>
              <span className={styles.stepNo}>{i + 1}</span>
              <select className={styles.input} value={s.targetKind} onChange={(e) => patch(s.id, {targetKind: e.target.value})}>
                <option value="el">This element</option><option value="children">Children…</option>
              </select>
              {s.targetKind === 'children' && <input className={styles.input} style={{maxWidth: '5.5rem'}} value={s.selector} onChange={(e) => patch(s.id, {selector: e.target.value})} placeholder=".card" />}
              <label className={styles.kf}><input type="checkbox" checked={s.mode === 'keyframes'} onChange={(e) => patch(s.id, {mode: e.target.checked ? 'keyframes' : 'tween'})} />keyframes</label>
              <div className={styles.stepBtns}>
                <button onClick={() => move(s.id, -1)} disabled={i === 0} title="Move up">↑</button>
                <button onClick={() => move(s.id, 1)} disabled={i === steps.length - 1} title="Move down">↓</button>
                <button onClick={() => dupStep(s.id)} title="Duplicate">⧉</button>
                {steps.length > 1 && <button onClick={() => rmStep(s.id)} title="Remove" className={styles.rmX}>×</button>}
              </div>
            </div>

            {s.mode === 'keyframes' ? (
              <div className={styles.row}><label className={styles.field}><span>Motion</span>
                <select className={styles.input} value={s.kf} onChange={(e) => patch(s.id, {kf: e.target.value})}>{Object.entries(KF).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
              </label></div>
            ) : (<>
              <div className={styles.row}>
                <label className={styles.field}><span>Method</span>
                  <select className={styles.input} value={s.method} onChange={(e) => patch(s.id, {method: e.target.value})}>
                    <option value="from">from (entrance)</option><option value="to">to (exit / move)</option><option value="fromTo">fromTo</option>
                  </select>
                </label>
                <label className={styles.field}><span>Quick preset</span>
                  <select className={styles.input} value="" onChange={(e) => applyQuick(s.id, e.target.value)}><option value="">choose…</option>{Object.entries(QUICK).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
                </label>
              </div>
              <div className={styles.props}>
                {s.method === 'fromTo' && <div className={styles.propsLabel}>from</div>}
                {Object.entries(s.props).map(([k, val]) => propRow(s, k, val, false))}
                {addPropSelect(s, false)}
                {s.method === 'fromTo' && <>
                  <div className={styles.propsLabel}>to</div>
                  {Object.entries(s.toProps).map(([k, val]) => propRow(s, k, val, true))}
                  {addPropSelect(s, true)}
                </>}
              </div>
            </>)}

            <div className={styles.row}>
              <label className={styles.field}><span>Duration (s)</span><input className={styles.input} type="number" min="0.1" max="6" step="0.1" value={s.duration} onChange={(e) => patch(s.id, {duration: parseFloat(e.target.value) || 0.1})} /></label>
              <label className={styles.field}><span>Ease</span><select className={styles.input} value={s.ease} onChange={(e) => patch(s.id, {ease: e.target.value})}>{EASES.map((e2) => <option key={e2} value={e2}>{e2}</option>)}</select></label>
              <label className={styles.field}><span>Delay (s)</span><input className={styles.input} type="number" min="0" max="4" step="0.1" value={s.delay} onChange={(e) => patch(s.id, {delay: parseFloat(e.target.value) || 0})} /></label>
              {i > 0 && <label className={styles.field}><span>Sequence</span><select className={styles.input} value={s.position} onChange={(e) => patch(s.id, {position: e.target.value})}>{POSITIONS.map((p) => <option key={p.v} value={p.v}>{p.label}</option>)}</select></label>}
              {i > 0 && s.position === 'custom' && <label className={styles.field}><span>Offset</span><input className={styles.input} value={s.positionCustom} onChange={(e) => patch(s.id, {positionCustom: e.target.value})} placeholder="-=0.2" /></label>}
            </div>
            {s.targetKind === 'children' && s.mode !== 'keyframes' && (
              <div className={styles.row}>
                <label className={styles.field}><span>Stagger (s)</span><input className={styles.input} type="number" min="0" max="0.6" step="0.02" value={s.staggerAmount} onChange={(e) => patch(s.id, {staggerAmount: parseFloat(e.target.value) || 0})} /></label>
                <label className={styles.field}><span>Stagger from</span><select className={styles.input} value={s.staggerFrom} onChange={(e) => patch(s.id, {staggerFrom: e.target.value})}>{STAGGER_FROM.map((f) => <option key={f} value={f}>{f}</option>)}</select></label>
              </div>
            )}
          </div>
        ))}
        <button className={styles.addBtn} onClick={addStep}>+ Add step</button>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Timeline & trigger</div>
          <div className={styles.row}>
            <label className={styles.field}><span>Loop</span><select className={styles.input} value={loop} onChange={(e) => setLoop(e.target.value)}>{LOOPS.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}</select></label>
            <label className={styles.field}><span>Trigger start</span><select className={styles.input} value={triggerStart} onChange={(e) => setTriggerStart(e.target.value)}>{START_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}</select></label>
            <label className={styles.field}><span>Scrub</span><select className={styles.input} value={scrub} onChange={(e) => setScrub(e.target.value)}>{SCRUB_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}</select></label>
          </div>
          <p className={styles.hint}>Trigger start & Scrub are options <em>next to the code field</em> in the builder. Loop is written into the snippet.</p>
        </div>
      </div>

      <div className={styles.output}>
        <div className={styles.stageBar}>
          <span>Preview</span>
          <span className={styles.stageTools}>
            <select className={styles.layoutSel} value={layout} onChange={(e) => setLayout(e.target.value)}>{LAYOUTS.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}</select>
            <button className={styles.replay} onClick={replay}>↻ Replay</button>
          </span>
        </div>
        <div className={styles.stage}><div className={styles.demoEl} ref={previewRef}>{demo()}</div></div>

        {/* visual timeline strip */}
        <div className={styles.tl}>
          <button className={styles.playBtn} onClick={playPause} aria-label="Play/pause">{playing ? '❚❚' : '►'}</button>
          <div className={styles.strip} ref={stripRef} onPointerDown={onStripDown}>
            {timing.items.map((it, i) => (
              <div key={i} className={styles.bar} title={`Step ${i + 1}`}
                style={{left: (it.start / timing.total * 100) + '%', width: Math.max(2, it.dur / timing.total * 100) + '%'}}>{i + 1}</div>
            ))}
            <div className={styles.head} ref={headRef} />
          </div>
          <span className={styles.dur}>{timing.total.toFixed(1)}s</span>
        </div>

        <div className={styles.codeBar}>
          <span>Paste into <strong>Motion Snippet (GSAP)</strong></span>
          <button className={styles.copy} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre className={styles.code}><code>{code}</code></pre>

        <div className={styles.builderNote}>
          <strong>Also set next to the code field in the builder:</strong>
          <div className={styles.builderRow}><span>Trigger start → <code>{labelOf(START_CHOICES, triggerStart)}</code></span><span>Scrub → <code>{labelOf(SCRUB_CHOICES, scrub)}</code></span></div>
        </div>
        <p className={styles.note}>One <code>tl</code> (already ScrollTrigger-tied), your <code>el</code> and its children — composed into a single scroll timeline. All GSAP <strong>core</strong>, so every snippet pastes and runs as-is.</p>
      </div>
    </div>
  );
}
