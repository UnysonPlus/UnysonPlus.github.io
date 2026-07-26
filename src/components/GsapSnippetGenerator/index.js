/*
 * GSAP Timeline Studio — for the Animation Engine's "Custom Code (Motion Snippet)" field.
 *
 * The plugin runs your snippet with `el` (this element), `tl` (a gsap.timeline already tied to a
 * ScrollTrigger) and `gsap`. This studio composes a chain of tl tweens that does what the built-in
 * Scroll Motion presets CAN'T: choreograph several targets on one timeline, full per-property control
 * (2D + real 3D transforms, filters, clip-path, colour), keyframe motion, loop/yoyo, and advanced
 * stagger — then previews it by running that exact code (`new Function('el','tl','gsap', code)`).
 *
 * Everything here is GSAP CORE (+ ScrollTrigger) — matching what the field guarantees. No SplitText /
 * MorphSVG / plugins (they aren't guaranteed loaded for a snippet).
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from './styles.module.css';

/* ---- property palette (the vars you can set) ---- */
const PROP = {
  x:            {label: 'x',            unit: 'px',  type: 'num', def: 60},
  y:            {label: 'y',            unit: 'px',  type: 'num', def: 60},
  rotation:     {label: 'rotation',     unit: 'deg', type: 'num', def: 15},
  scale:        {label: 'scale',        type: 'num', def: 0.8, step: 0.05},
  scaleX:       {label: 'scaleX',       type: 'num', def: 1,   step: 0.05},
  scaleY:       {label: 'scaleY',       type: 'num', def: 1,   step: 0.05},
  skewX:        {label: 'skewX',        unit: 'deg', type: 'num', def: 10},
  rotationX:    {label: 'rotationX',    unit: 'deg', type: 'num', def: -90},
  rotationY:    {label: 'rotationY',    unit: 'deg', type: 'num', def: 90},
  z:            {label: 'z',            unit: 'px',  type: 'num', def: 0},
  transformPerspective: {label: 'perspective', unit: 'px', type: 'num', def: 800},
  transformOrigin: {label: 'transformOrigin', type: 'text', def: '50% 50%'},
  opacity:      {label: 'opacity',      type: 'num', def: 0, min: 0, max: 1, step: 0.05},
  filter:       {label: 'blur',         unit: 'px',  type: 'num', def: 12, format: 'blur'},
  clipPath:     {label: 'clipPath',     type: 'clip', def: 'inset(0 0 100% 0)'},
  backgroundColor: {label: 'backgroundColor', type: 'color', def: '#2F74E6'},
  color:        {label: 'color',        type: 'color', def: '#ffffff'},
  borderRadius: {label: 'borderRadius', type: 'text', def: '16px'},
};
const PROP_GROUPS = [
  {label: 'Transform', keys: ['x', 'y', 'rotation', 'scale', 'scaleX', 'scaleY', 'skewX']},
  {label: '3D', keys: ['rotationX', 'rotationY', 'z', 'transformPerspective', 'transformOrigin']},
  {label: 'Appearance', keys: ['opacity', 'backgroundColor', 'color', 'borderRadius']},
  {label: 'Filter / Clip', keys: ['filter', 'clipPath']},
];
const CLIPS = [
  {v: 'inset(0 0 100% 0)', label: 'Reveal upward'},
  {v: 'inset(100% 0 0 0)', label: 'Reveal downward'},
  {v: 'inset(0 100% 0 0)', label: 'Reveal from left'},
  {v: 'inset(0 0 0 100%)', label: 'Reveal from right'},
  {v: 'circle(0% at 50% 50%)', label: 'Circle open'},
  {v: 'inset(50% 0 50% 0)', label: 'Bar (horizontal)'},
];

/* ---- quick presets: populate a step's props (+ method) ---- */
const QUICK = {
  fadeUp:    {label: 'Fade up',        method: 'from', props: {y: 60, opacity: 0}},
  slideLeft: {label: 'Slide from left',method: 'from', props: {x: -60, opacity: 0}},
  scaleIn:   {label: 'Scale in',       method: 'from', props: {scale: 0.8, opacity: 0}},
  zoomIn:    {label: 'Zoom in',        method: 'from', props: {scale: 0.4, opacity: 0}},
  flip3dX:   {label: '3D flip (X)',    method: 'from', props: {rotationX: -90, opacity: 0, transformPerspective: 800, transformOrigin: '50% 0%'}},
  flip3dY:   {label: '3D flip (Y)',    method: 'from', props: {rotationY: 90, opacity: 0, transformPerspective: 800}},
  spinIn:    {label: 'Spin in',        method: 'from', props: {rotation: -180, scale: 0, opacity: 0}},
  blurIn:    {label: 'Blur in',        method: 'from', props: {opacity: 0, filter: 12}},
  clipUp:    {label: 'Clip reveal',    method: 'from', props: {clipPath: 'inset(0 0 100% 0)'}},
};

/* ---- keyframe presets (force method 'to') ---- */
const KF = {
  bounce: {label: 'Bounce in', kf: {y: [60, 0, -18, 0], opacity: [0, 1, 1, 1]}, ease: 'power1.out', duration: 1},
  wobble: {label: 'Wobble',    kf: {rotation: [0, -8, 6, -4, 2, 0]}, ease: 'sine.inOut', duration: 0.9},
  shake:  {label: 'Shake',     kf: {x: [0, -10, 10, -8, 8, -4, 0]}, ease: 'sine.inOut', duration: 0.6},
  pulse:  {label: 'Pulse',     kf: {scale: [1, 1.12, 1]}, ease: 'sine.inOut', duration: 0.7},
  glitch: {label: 'Glitch',    kf: {x: [0, -6, 6, -4, 0], skewX: [0, 10, -8, 4, 0]}, ease: 'steps(5)', duration: 0.5},
};

const EASES = ['none', 'power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)',
  'back.in(1.7)', 'elastic.out(1, 0.4)', 'expo.out', 'circ.out', 'sine.inOut', 'steps(5)', 'bounce.out', 'power2.inOut'];
const POSITIONS = [{v: '', label: 'After previous'}, {v: '<', label: 'With previous'}, {v: '-=0.3', label: 'Overlap previous'}];
const STAGGER_FROM = ['start', 'center', 'end', 'edges', 'random'];
const LOOPS = [{v: 'none', label: 'No loop'}, {v: 'loop', label: 'Loop (repeat)'}, {v: 'pingpong', label: 'Ping-pong (yoyo)'}];
const START_CHOICES = [
  {v: 'top 100%', label: 'As soon as it enters'}, {v: 'top 80%', label: 'When 20% into view (default)'},
  {v: 'top 60%', label: 'When 40% into view'}, {v: 'top center', label: 'When it reaches the middle'}, {v: 'top 30%', label: 'Well into view'},
];
const SCRUB_CHOICES = [{v: 'no', label: 'Play once on enter'}, {v: 'yes', label: 'Scrub with scroll'}, {v: 'smooth', label: 'Smooth scrub (eased)'}];
const labelOf = (list, v) => (list.find((x) => x.v === v) || {}).label || v;

let sid = 1;
const newStep = (props) => ({
  id: sid++, targetKind: 'el', selector: '.card', method: 'from', mode: 'tween',
  props: props || {...QUICK.fadeUp.props}, kf: 'bounce',
  duration: 0.8, ease: 'power2.out', delay: 0, staggerAmount: 0.1, staggerFrom: 'start', position: '',
});

function serialize(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v}'`;
  if (Array.isArray(v)) return `[${v.map(serialize).join(', ')}]`;
  if (v && typeof v === 'object') return `{ ${Object.entries(v).map(([k, x]) => `${k}: ${serialize(x)}`).join(', ')} }`;
  return String(v);
}
function formatProp(key, val) {
  const d = PROP[key];
  if (d && d.format === 'blur') return `blur(${val}px)`;
  return val;
}

export default function GsapSnippetGenerator() {
  const [steps, setSteps] = useState([newStep(), {...newStep({rotationY: 60, opacity: 0, transformPerspective: 1000}), targetKind: 'children', position: '<'}]);
  const [loop, setLoop] = useState('none');
  const [triggerStart, setTriggerStart] = useState('top 80%');
  const [scrub, setScrub] = useState('no');
  const [scrubPos, setScrubPos] = useState(0);
  const [copied, setCopied] = useState(false);

  const previewRef = useRef(null);
  const tlRef = useRef(null);
  const restartRef = useRef(null);

  // Class tokens the demo children should carry so any typed selector matches in the preview.
  const childClasses = useMemo(() => {
    const set = new Set(['card']);
    steps.forEach((s) => {
      if (s.targetKind === 'children') {
        const m = (s.selector || '').match(/\.([A-Za-z0-9_-]+)/g);
        if (m) m.forEach((t) => set.add(t.slice(1)));
      }
    });
    return Array.from(set).join(' ');
  }, [steps]);

  const targetExpr = (s) => (s.targetKind === 'children' ? `el.querySelectorAll('${s.selector || '.card'}')` : 'el');

  const stepVars = (s) => {
    const v = {};
    if (s.mode === 'keyframes') {
      v.keyframes = KF[s.kf].kf;
    } else {
      Object.entries(s.props).forEach(([k, val]) => { v[k] = formatProp(k, val); });
    }
    v.duration = s.duration;
    if (s.delay) v.delay = s.delay;
    if (s.ease && s.ease !== 'none') v.ease = s.ease;
    if (s.targetKind === 'children' && s.staggerAmount > 0) {
      v.stagger = s.staggerFrom !== 'start' ? {each: s.staggerAmount, from: s.staggerFrom} : s.staggerAmount;
    }
    return v;
  };

  const code = useMemo(() => {
    let out = '';
    if (loop === 'loop') out += 'tl.repeat(-1);\n\n';
    else if (loop === 'pingpong') out += 'tl.repeat(-1).yoyo(true);\n\n';
    const lines = steps.map((s, i) => {
      const method = s.mode === 'keyframes' ? 'to' : s.method;
      const pos = i === 0 ? '' : s.position;
      const posArg = pos ? `, ${serialize(pos)}` : '';
      return `  .${method}(${targetExpr(s)}, ${serialize(stepVars(s))}${posArg})`;
    });
    return out + 'tl\n' + lines.join('\n') + ';';
  }, [steps, loop]);

  const build = useCallback((paused) => {
    const el = previewRef.current;
    if (!el || typeof window === 'undefined') return null;
    clearTimeout(restartRef.current);
    const all = [el, ...el.querySelectorAll('*')];
    gsap.killTweensOf(all);
    gsap.set(all, {clearProps: 'all'});
    const tl = gsap.timeline({paused});
    try { new Function('el', 'tl', 'gsap', code)(el, tl, gsap); } // eslint-disable-line no-new-func
    catch (e) { if (typeof console !== 'undefined') console.warn('[GSAP preview]', e); }
    tlRef.current = tl;
    if (!paused && loop === 'none') {
      tl.eventCallback('onComplete', () => { restartRef.current = setTimeout(() => build(false), 1100); });
    }
    return tl;
  }, [code, loop]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (scrub === 'no') build(false);
      else { const tl = build(true); if (tl) tl.progress(scrubPos); }
    }, 130);
    return () => { clearTimeout(t); clearTimeout(restartRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build, scrub]);

  const onScrub = (v) => { setScrubPos(v); if (tlRef.current) tlRef.current.progress(v); };
  const patch = (id, p) => setSteps((s) => s.map((x) => (x.id === id ? {...x, ...p} : x)));
  const setProp = (id, key, val) => setSteps((s) => s.map((x) => (x.id === id ? {...x, props: {...x.props, [key]: val}} : x)));
  const addProp = (id, key) => { if (key) setProp(id, key, PROP[key].def); };
  const rmProp = (id, key) => setSteps((s) => s.map((x) => { if (x.id !== id) return x; const p = {...x.props}; delete p[key]; return {...x, props: p}; }));
  const applyQuick = (id, k) => { if (QUICK[k]) patch(id, {method: QUICK[k].method, mode: 'tween', props: {...QUICK[k].props}}); };
  const addStep = () => setSteps((s) => [...s, {...newStep({y: 30, opacity: 0}), position: '<'}]);
  const rmStep = (id) => setSteps((s) => (s.length > 1 ? s.filter((x) => x.id !== id) : s));

  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (e) {} };

  const isScrub = scrub !== 'no';

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        {steps.map((s, i) => (
          <div key={s.id} className={styles.stepCard}>
            <div className={styles.stepHead}>
              <span className={styles.stepNo}>{i + 1}</span>
              <select className={styles.input} value={s.targetKind} onChange={(e) => patch(s.id, {targetKind: e.target.value})}>
                <option value="el">This element</option>
                <option value="children">Children…</option>
              </select>
              {s.targetKind === 'children' && (
                <input className={styles.input} style={{maxWidth: '6rem'}} value={s.selector}
                  onChange={(e) => patch(s.id, {selector: e.target.value})} placeholder=".card" />
              )}
              <label className={styles.kf}>
                <input type="checkbox" checked={s.mode === 'keyframes'} onChange={(e) => patch(s.id, {mode: e.target.checked ? 'keyframes' : 'tween'})} />
                keyframes
              </label>
              {steps.length > 1 && <button className={styles.remove} onClick={() => rmStep(s.id)} aria-label="Remove step">×</button>}
            </div>

            {s.mode === 'keyframes' ? (
              <div className={styles.row}>
                <label className={styles.field}><span>Motion</span>
                  <select className={styles.input} value={s.kf} onChange={(e) => patch(s.id, {kf: e.target.value})}>
                    {Object.entries(KF).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </label>
              </div>
            ) : (
              <>
                <div className={styles.row}>
                  <label className={styles.field}><span>Method</span>
                    <select className={styles.input} value={s.method} onChange={(e) => patch(s.id, {method: e.target.value})}>
                      <option value="from">from (entrance)</option>
                      <option value="to">to (exit / move to)</option>
                      <option value="fromTo">fromTo</option>
                    </select>
                  </label>
                  <label className={styles.field}><span>Quick preset</span>
                    <select className={styles.input} value="" onChange={(e) => applyQuick(s.id, e.target.value)}>
                      <option value="">choose…</option>
                      {Object.entries(QUICK).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </label>
                </div>
                <div className={styles.props}>
                  {Object.entries(s.props).map(([k, val]) => (
                    <div key={k} className={styles.propRow}>
                      <span className={styles.propName}>{PROP[k] ? PROP[k].label : k}</span>
                      {PROP[k] && PROP[k].type === 'color' ? (
                        <input type="color" value={val} onChange={(e) => setProp(s.id, k, e.target.value)} className={styles.color} />
                      ) : PROP[k] && PROP[k].type === 'clip' ? (
                        <select className={styles.input} value={val} onChange={(e) => setProp(s.id, k, e.target.value)}>
                          {CLIPS.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
                        </select>
                      ) : PROP[k] && PROP[k].type === 'text' ? (
                        <input className={styles.input} value={val} onChange={(e) => setProp(s.id, k, e.target.value)} />
                      ) : (
                        <input className={styles.input} type="number" value={val}
                          min={PROP[k] && PROP[k].min} max={PROP[k] && PROP[k].max} step={(PROP[k] && PROP[k].step) || 1}
                          onChange={(e) => setProp(s.id, k, parseFloat(e.target.value))} />
                      )}
                      {PROP[k] && PROP[k].unit && <span className={styles.unit}>{PROP[k].unit}</span>}
                      <button className={styles.rmProp} onClick={() => rmProp(s.id, k)} aria-label="Remove property">×</button>
                    </div>
                  ))}
                  <select className={styles.addProp} value="" onChange={(e) => { addProp(s.id, e.target.value); e.target.value = ''; }}>
                    <option value="">+ property…</option>
                    {PROP_GROUPS.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.keys.filter((k) => !(k in s.props)).map((k) => <option key={k} value={k}>{PROP[k].label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className={styles.row}>
              <label className={styles.field}><span>Duration (s)</span>
                <input className={styles.input} type="number" min="0.1" max="6" step="0.1" value={s.duration} onChange={(e) => patch(s.id, {duration: parseFloat(e.target.value) || 0.1})} />
              </label>
              <label className={styles.field}><span>Ease</span>
                <select className={styles.input} value={s.ease} onChange={(e) => patch(s.id, {ease: e.target.value})}>{EASES.map((e2) => <option key={e2} value={e2}>{e2}</option>)}</select>
              </label>
              <label className={styles.field}><span>Delay (s)</span>
                <input className={styles.input} type="number" min="0" max="4" step="0.1" value={s.delay} onChange={(e) => patch(s.id, {delay: parseFloat(e.target.value) || 0})} />
              </label>
              {i > 0 && (
                <label className={styles.field}><span>Sequence</span>
                  <select className={styles.input} value={s.position} onChange={(e) => patch(s.id, {position: e.target.value})}>{POSITIONS.map((p) => <option key={p.v} value={p.v}>{p.label}</option>)}</select>
                </label>
              )}
            </div>
            {s.targetKind === 'children' && s.mode !== 'keyframes' && (
              <div className={styles.row}>
                <label className={styles.field}><span>Stagger (s)</span>
                  <input className={styles.input} type="number" min="0" max="0.6" step="0.02" value={s.staggerAmount} onChange={(e) => patch(s.id, {staggerAmount: parseFloat(e.target.value) || 0})} />
                </label>
                <label className={styles.field}><span>Stagger from</span>
                  <select className={styles.input} value={s.staggerFrom} onChange={(e) => patch(s.id, {staggerFrom: e.target.value})}>{STAGGER_FROM.map((f) => <option key={f} value={f}>{f}</option>)}</select>
                </label>
              </div>
            )}
          </div>
        ))}
        <button className={styles.addBtn} onClick={addStep}>+ Add step</button>

        <div className={styles.group}>
          <div className={styles.groupTitle}>Timeline & trigger</div>
          <div className={styles.row}>
            <label className={styles.field}><span>Loop</span>
              <select className={styles.input} value={loop} onChange={(e) => setLoop(e.target.value)}>{LOOPS.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}</select>
            </label>
            <label className={styles.field}><span>Trigger start</span>
              <select className={styles.input} value={triggerStart} onChange={(e) => setTriggerStart(e.target.value)}>{START_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}</select>
            </label>
            <label className={styles.field}><span>Scrub</span>
              <select className={styles.input} value={scrub} onChange={(e) => setScrub(e.target.value)}>{SCRUB_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}</select>
            </label>
          </div>
          <p className={styles.hint}>Trigger start & Scrub are options <em>next to the code field</em> in the builder — not part of the snippet. Loop is written into the snippet.</p>
        </div>
      </div>

      <div className={styles.output}>
        <div className={styles.stageBar}>
          <span>Preview {isScrub ? '(drag to scrub)' : ''}</span>
          {!isScrub && <button className={styles.replay} onClick={() => build(false)}>↻ Replay</button>}
        </div>
        <div className={styles.stage}>
          <div className={styles.demoEl} ref={previewRef}>
            <div className={styles.demoTitle}>Your element</div>
            <div className={styles.demoCards}>
              {[0, 1, 2].map((c) => <div key={c} className={clsx(styles.card, childClasses)}>Card {c + 1}</div>)}
            </div>
          </div>
        </div>
        {isScrub && (
          <div className={styles.scrubRow}>
            <span>Scroll</span>
            <input type="range" min="0" max="1" step="0.005" value={scrubPos} onChange={(e) => onScrub(parseFloat(e.target.value))} className={styles.scrubSlider} />
          </div>
        )}

        <div className={styles.codeBar}>
          <span>Paste into <strong>Motion Snippet (GSAP)</strong></span>
          <button className={styles.copy} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre className={styles.code}><code>{code}</code></pre>

        <div className={styles.builderNote}>
          <strong>Also set next to the code field in the builder:</strong>
          <div className={styles.builderRow}>
            <span>Trigger start → <code>{labelOf(START_CHOICES, triggerStart)}</code></span>
            <span>Scrub → <code>{labelOf(SCRUB_CHOICES, scrub)}</code></span>
          </div>
        </div>
        <p className={styles.note}>
          One <code>tl</code> (already ScrollTrigger-tied), your <code>el</code> and its children — composed into a
          single scroll timeline. All GSAP <strong>core</strong> (no plugins), so every snippet pastes and runs as-is.
        </p>
      </div>
    </div>
  );
}
