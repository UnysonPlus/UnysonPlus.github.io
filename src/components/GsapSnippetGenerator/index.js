/*
 * GSAP Snippet Generator — for the Animation Engine's "Custom Code (Motion Snippet)" field.
 *
 * The plugin runs your snippet with three variables already in scope — `el` (this element),
 * `tl` (a gsap.timeline already tied to a ScrollTrigger on el) and `gsap`. This tool builds a chain
 * of `tl.from/to(...)` calls from simple controls, shows the exact code to paste, and PREVIEWS it by
 * running that same code the same way the plugin does — `new Function('el','tl','gsap', code)`.
 *
 * Trigger controls (start + scrub) are FIELD options, not code — they configure the timeline the
 * field provides, so they change the preview + the "set these in the builder" hint, not the snippet.
 * Scoped to the real runtime contract: GSAP core only; the preview replays (play mode) or scrubs.
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from './styles.module.css';

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

// Match the plugin's Custom Code trigger options exactly.
const START_CHOICES = [
  {v: 'top 100%', label: 'As soon as it enters'},
  {v: 'top 80%', label: 'When 20% into view (default)'},
  {v: 'top 60%', label: 'When 40% into view'},
  {v: 'top center', label: 'When it reaches the middle'},
  {v: 'top 30%', label: 'Well into view'},
];
const SCRUB_CHOICES = [
  {v: 'no', label: 'Play once on enter'},
  {v: 'yes', label: 'Scrub with scroll'},
  {v: 'smooth', label: 'Smooth scrub (eased)'},
];
const labelOf = (list, v) => (list.find((x) => x.v === v) || {}).label || v;

let stepId = 1;
const newStep = () => ({id: stepId++, method: 'from', preset: 'fadeUp', duration: 0.8, ease: 'power2.out', position: ''});

function serialize(val) {
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return `'${val}'`;
  if (val && typeof val === 'object') {
    return `{ ${Object.entries(val).map(([k, v]) => `${k}: ${serialize(v)}`).join(', ')} }`;
  }
  return String(val);
}

export default function GsapSnippetGenerator() {
  const [target, setTarget] = useState('el');
  const [childSelector, setChildSelector] = useState('.card');
  const [stagger, setStagger] = useState(0.1);
  const [staggerFrom, setStaggerFrom] = useState('start');
  const [steps, setSteps] = useState([newStep()]);
  const [triggerStart, setTriggerStart] = useState('top 80%');
  const [scrub, setScrub] = useState('no');
  const [scrubPos, setScrubPos] = useState(0);
  const [copied, setCopied] = useState(false);

  const previewRef = useRef(null);
  const tlRef = useRef(null);

  const childClass = useMemo(() => {
    const m = (childSelector || '.card').match(/\.([A-Za-z0-9_-]+)/);
    return m ? m[1] : 'card';
  }, [childSelector]);

  const targetExpr = target === 'children'
    ? `el.querySelectorAll('${childSelector || '.card'}')`
    : 'el';

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

  // Build a timeline from the generated code the way the plugin does. paused=true for scrub mode.
  const build = useCallback((paused) => {
    const el = previewRef.current;
    if (!el || typeof window === 'undefined') return null;
    const all = [el, ...el.querySelectorAll('*')];
    gsap.killTweensOf(all);
    gsap.set(all, {clearProps: 'all'});
    const tl = gsap.timeline({paused});
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('el', 'tl', 'gsap', code);
      fn(el, tl, gsap);
    } catch (e) {
      if (typeof console !== 'undefined') console.warn('[GSAP preview]', e);
    }
    tlRef.current = tl;
    return tl;
  }, [code]);

  const replay = useCallback(() => { build(false); }, [build]);

  // Rebuild when the code or the play/scrub mode changes. Scrubbing the slider only sets progress.
  useEffect(() => {
    const t = setTimeout(() => {
      if (scrub === 'no') { build(false); }
      else { const tl = build(true); if (tl) tl.progress(scrubPos); }
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build, scrub]);

  const onScrub = (v) => { setScrubPos(v); if (tlRef.current) tlRef.current.progress(v); };

  const updateStep = (id, patch) => setSteps((s) => s.map((st) => (st.id === id ? {...st, ...patch} : st)));
  const removeStep = (id) => setSteps((s) => (s.length > 1 ? s.filter((st) => st.id !== id) : s));
  const addStep = () => setSteps((s) => [...s, newStep()]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) { /* clipboard blocked */ }
  };

  const cards = [0, 1, 2];
  const isScrub = scrub !== 'no';

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

        {/* Trigger — FIELD options, set in the builder (not part of the snippet) */}
        <div className={styles.group}>
          <div className={styles.groupTitle}>Trigger — set in the builder</div>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Trigger start</span>
              <select className={styles.input} value={triggerStart} onChange={(e) => setTriggerStart(e.target.value)}>
                {START_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
              </select>
            </label>
            <label className={styles.field}>
              <span>Scrub</span>
              <select className={styles.input} value={scrub} onChange={(e) => setScrub(e.target.value)}>
                {SCRUB_CHOICES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
              </select>
            </label>
          </div>
          <p className={styles.hint}>These are options <em>next to the code field</em> in the builder — not part of the snippet. They change how the preview plays here.</p>
        </div>
      </div>

      {/* Preview + code */}
      <div className={styles.output}>
        <div className={styles.stageBar}>
          <span>Preview {isScrub ? '(drag to scrub)' : ''}</span>
          {!isScrub && <button className={styles.replay} onClick={replay}>↻ Replay</button>}
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
        {isScrub && (
          <div className={styles.scrubRow}>
            <span>Scroll</span>
            <input type="range" min="0" max="1" step="0.005" value={scrubPos}
              onChange={(e) => onScrub(parseFloat(e.target.value))} className={styles.scrubSlider} />
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
          You get <code>el</code> (this element), <code>tl</code> (a timeline already tied to a
          ScrollTrigger), and <code>gsap</code>. The <strong>snippet</strong> is only the tween chain
          above; the <strong>trigger start / scrub</strong> are picked from the field's own options.
          GSAP <strong>core</strong> only (no SplitText/plugins) — matching what the field guarantees.
        </p>
      </div>
    </div>
  );
}
