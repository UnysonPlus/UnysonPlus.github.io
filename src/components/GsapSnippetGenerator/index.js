/*
 * GSAP Snippet Generator — for the Animation Engine's "Custom Code (Motion Snippet)" field.
 *
 * The plugin runs your snippet with three variables already in scope — `el` (this element),
 * `tl` (a gsap.timeline already tied to a ScrollTrigger on el, start "top 80%"), and `gsap`.
 * This tool builds a chain of `tl.from/to(...)` calls against `el` (or its children) from simple
 * controls, shows the exact code to paste, and PREVIEWS it by running that same code the same way
 * the plugin does — `new Function('el','tl','gsap', code)(el, tl, gsap)` — on a demo element.
 *
 * Scoped to the real runtime contract: GSAP core only (no SplitText/plugins), timeline provided,
 * trigger fixed. The preview replays on a button/edit instead of on scroll.
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from './styles.module.css';

// FROM-state presets (used as-is for `from`; become target/EXIT states for `to`).
const PRESETS = {
  fadeUp:    {label: 'Fade up',              vars: {y: 60, opacity: 0}},
  fadeDown:  {label: 'Fade down',            vars: {y: -60, opacity: 0}},
  slideLeft: {label: 'Slide in (from left)', vars: {x: -60, opacity: 0}},
  slideRight:{label: 'Slide in (from right)',vars: {x: 60, opacity: 0}},
  fade:      {label: 'Fade in',              vars: {opacity: 0}},
  scaleIn:   {label: 'Scale in',             vars: {scale: 0.8, opacity: 0}},
  zoomIn:    {label: 'Zoom in',              vars: {scale: 0.5, opacity: 0}},
  rotateIn:  {label: 'Rotate in',            vars: {rotation: -8, opacity: 0}},
  skewIn:    {label: 'Skew in',              vars: {skewX: 10, opacity: 0}},
  blurIn:    {label: 'Blur in',              vars: {opacity: 0, filter: 'blur(12px)'}},
  flipInX:   {label: 'Flip in (X axis)',     vars: {rotationX: -90, opacity: 0, transformPerspective: 600}},
  clipUp:    {label: 'Clip reveal (upward)', vars: {clipPath: 'inset(0 0 100% 0)'}},
};

const EASES = ['none', 'power1.out', 'power2.out', 'power3.out', 'power4.out',
  'back.out(1.7)', 'elastic.out(1, 0.4)', 'expo.out', 'circ.out', 'sine.inOut', 'power2.inOut'];

const POSITIONS = [
  {v: '', label: 'After previous'},
  {v: '<', label: 'With previous (same time)'},
  {v: '-=0.3', label: 'Overlap previous (−0.3s)'},
];

let stepId = 1;
const newStep = () => ({id: stepId++, method: 'from', preset: 'fadeUp', duration: 0.8, ease: 'power2.out', position: ''});

// Serialize a JS value to source (numbers bare, strings single-quoted, nested objects recursed).
function serialize(val) {
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return `'${val}'`;
  if (val && typeof val === 'object') {
    return `{ ${Object.entries(val).map(([k, v]) => `${k}: ${serialize(v)}`).join(', ')} }`;
  }
  return String(val);
}

export default function GsapSnippetGenerator() {
  const [target, setTarget] = useState('el');           // 'el' | 'children'
  const [childSelector, setChildSelector] = useState('.card');
  const [stagger, setStagger] = useState(0.1);
  const [staggerFrom, setStaggerFrom] = useState('start');
  const [steps, setSteps] = useState([newStep()]);
  const [copied, setCopied] = useState(false);

  const previewRef = useRef(null);

  // A class the demo children carry so `el.querySelectorAll(childSelector)` matches in the preview.
  const childClass = useMemo(() => {
    const m = (childSelector || '.card').match(/\.([A-Za-z0-9_-]+)/);
    return m ? m[1] : 'card';
  }, [childSelector]);

  const targetExpr = target === 'children'
    ? `el.querySelectorAll('${childSelector || '.card'}')`
    : 'el';

  // Build the paste-ready snippet.
  const code = useMemo(() => {
    const lines = steps.map((step, i) => {
      const varObj = {...(PRESETS[step.preset] ? PRESETS[step.preset].vars : {})};
      varObj.duration = step.duration;
      if (step.ease && step.ease !== 'none') varObj.ease = step.ease;
      if (target === 'children' && stagger > 0) {
        varObj.stagger = staggerFrom !== 'start' ? {each: stagger, from: staggerFrom} : stagger;
      }
      const pos = i === 0 ? '' : step.position;
      const posArg = pos ? `, ${serialize(pos)}` : '';
      return `  .${step.method}(${targetExpr}, ${serialize(varObj)}${posArg})`;
    });
    return 'tl\n' + lines.join('\n') + ';';
  }, [steps, target, childSelector, stagger, staggerFrom, targetExpr]);

  // Preview: run the generated code exactly as the plugin does, on a fresh timeline.
  const replay = useCallback(() => {
    const el = previewRef.current;
    if (!el || typeof window === 'undefined') return;
    const all = [el, ...el.querySelectorAll('*')];
    gsap.killTweensOf(all);
    gsap.set(all, {clearProps: 'all'});
    const tl = gsap.timeline();
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('el', 'tl', 'gsap', code);
      fn(el, tl, gsap);
    } catch (e) {
      // Malformed intermediate state while editing — ignore; the code box still shows it.
      if (typeof console !== 'undefined') console.warn('[GSAP preview]', e);
    }
  }, [code]);

  // Auto-replay whenever the generated code changes (live feedback), debounced a touch.
  useEffect(() => {
    const t = setTimeout(replay, 120);
    return () => clearTimeout(t);
  }, [replay]);

  const updateStep = (id, patch) => setSteps((s) => s.map((st) => (st.id === id ? {...st, ...patch} : st)));
  const removeStep = (id) => setSteps((s) => (s.length > 1 ? s.filter((st) => st.id !== id) : s));
  const addStep = () => setSteps((s) => [...s, newStep()]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) { /* clipboard blocked — user can select manually */ }
  };

  const cards = [0, 1, 2];

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        {/* Target */}
        <div className={styles.group}>
          <div className={styles.groupTitle}>What to animate</div>
          <div className={styles.row}>
            <label className={styles.seg}>
              <input type="radio" name="tg" checked={target === 'el'} onChange={() => setTarget('el')} />
              <span>This element (<code>el</code>)</span>
            </label>
            <label className={styles.seg}>
              <input type="radio" name="tg" checked={target === 'children'} onChange={() => setTarget('children')} />
              <span>Children</span>
            </label>
          </div>
          {target === 'children' && (
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Match selector</span>
                <input className={styles.input} value={childSelector}
                  onChange={(e) => setChildSelector(e.target.value)} placeholder=".card" />
              </label>
              <label className={styles.field}>
                <span>Stagger (s)</span>
                <input className={styles.input} type="number" min="0" max="0.5" step="0.02"
                  value={stagger} onChange={(e) => setStagger(parseFloat(e.target.value) || 0)} />
              </label>
              <label className={styles.field}>
                <span>Stagger from</span>
                <select className={styles.input} value={staggerFrom} onChange={(e) => setStaggerFrom(e.target.value)}>
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="edges">edges</option>
                  <option value="end">end</option>
                </select>
              </label>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className={styles.group}>
          <div className={styles.groupTitle}>Timeline steps</div>
          {steps.map((step, i) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepNo}>{i + 1}</div>
              <div className={styles.stepBody}>
                <label className={styles.field}>
                  <span>Effect</span>
                  <select className={styles.input} value={step.preset} onChange={(e) => updateStep(step.id, {preset: e.target.value})}>
                    {Object.entries(PRESETS).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Method</span>
                  <select className={styles.input} value={step.method} onChange={(e) => updateStep(step.id, {method: e.target.value})}>
                    <option value="from">from (entrance)</option>
                    <option value="to">to (exit / move to)</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Duration (s)</span>
                  <input className={styles.input} type="number" min="0.1" max="3" step="0.1"
                    value={step.duration} onChange={(e) => updateStep(step.id, {duration: parseFloat(e.target.value) || 0.1})} />
                </label>
                <label className={styles.field}>
                  <span>Ease</span>
                  <select className={styles.input} value={step.ease} onChange={(e) => updateStep(step.id, {ease: e.target.value})}>
                    {EASES.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </label>
                {i > 0 && (
                  <label className={styles.field}>
                    <span>Sequence</span>
                    <select className={styles.input} value={step.position} onChange={(e) => updateStep(step.id, {position: e.target.value})}>
                      {POSITIONS.map((p) => <option key={p.v} value={p.v}>{p.label}</option>)}
                    </select>
                  </label>
                )}
              </div>
              {steps.length > 1 && (
                <button className={styles.remove} onClick={() => removeStep(step.id)} title="Remove step" aria-label="Remove step">×</button>
              )}
            </div>
          ))}
          <button className={styles.addBtn} onClick={addStep}>+ Add step</button>
        </div>
      </div>

      {/* Preview + code */}
      <div className={styles.output}>
        <div className={styles.stageBar}>
          <span>Preview</span>
          <button className={styles.replay} onClick={replay}>↻ Replay</button>
        </div>
        <div className={styles.stage}>
          <div className={styles.demoEl} ref={previewRef}>
            <div className={styles.demoTitle}>Your element</div>
            <div className={styles.demoCards}>
              {cards.map((c) => (
                <div key={c} className={clsx(styles.card, childClass)}>Card {c + 1}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.codeBar}>
          <span>Paste into <strong>Motion Snippet (GSAP)</strong></span>
          <button className={styles.copy} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre className={styles.code}><code>{code}</code></pre>
        <p className={styles.note}>
          You get <code>el</code> (this element), <code>tl</code> (a timeline already tied to a
          ScrollTrigger, start <code>top 80%</code>), and <code>gsap</code>. On the real page it plays
          as the element scrolls into view; here, press <em>Replay</em>. GSAP <strong>core</strong> only
          (no SplitText/plugins) — matching what the field guarantees.
        </p>
      </div>
    </div>
  );
}
