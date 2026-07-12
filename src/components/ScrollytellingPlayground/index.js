/*
 * Scrollytelling — interactive playground.
 *
 * Ports the real module: one column is pinned as the media panel (its items become stacked
 * `.upw-story-layer`s) while the other column's `.upw-story-step`s scroll; as each step crosses the
 * trigger line the matching media layer gets `.is-active`, and the verbatim per-style CSS runs the
 * transition. The vertical scroll slider on the right scrubs the scroll. 23 CSS transition styles are
 * reproduced; the scrub/canvas ones (parallax, pixelate, color-shift, frame-sequence, horizontal
 * track, liquid) need real media / WebGL and are documented instead.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {SCROLLY_CSS} from './scrolly-css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const GROUPS = [
  ['Fade & zoom', [['crossfade', 'Crossfade'], ['zoom', 'Zoom'], ['zoom_blur', 'Zoom Blur'], ['blur', 'Blur Swap'], ['ken_burns', 'Ken Burns'], ['duotone', 'Duotone']]],
  ['Motion', [['slide', 'Slide'], ['push', 'Push'], ['cover', 'Cover'], ['curtain', 'Curtain'], ['split', 'Split']]],
  ['3D', [['flip', 'Flip'], ['cube', 'Cube'], ['tilt', 'Tilt'], ['page_turn', 'Page Turn']]],
  ['Reveal / mask', [['clip_wipe', 'Clip Wipe'], ['iris', 'Iris'], ['barn', 'Barn Doors'], ['blinds', 'Blinds'], ['dissolve', 'Dissolve']]],
  ['FX', [['glitch', 'Glitch'], ['flash', 'Flash'], ['scan', 'Scan (CRT)']]],
];
const LABEL = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const DIRECTIONAL = {slide: 1, push: 1, cover: 1, clip_wipe: 1, curtain: 1};

const SCENES = [
  {t: 'Capture', c: 'linear-gradient(140deg,#6a8dff,#c56cff)', cap: 'Start with the raw material — colour, light, a first idea.'},
  {t: 'Compose', c: 'linear-gradient(140deg,#f59e0b,#e0447d)', cap: 'Arrange the pieces; the pinned panel swaps to match this step.'},
  {t: 'Render', c: 'linear-gradient(140deg,#17a34a,#00c2b2)', cap: 'The transition style animates each media change as you scroll.'},
  {t: 'Deliver', c: 'linear-gradient(140deg,#9333ea,#2f74e6)', cap: 'Land on the final frame — a scrollytelling narrative.'},
];
const DEFAULTS = {pin_side: 'left', transition: 0.6, intensity: 0.5, progress: 'dots', direction: 'auto'};

function buildPhp(mode, o) {
  const dir = DIRECTIONAL[mode] ? `\n        'direction'  => '${o.direction}',` : '';
  return `// On the Section (Section → Animations → Scrollytelling), 2 columns: media layers + steps:
'scrollytelling' => [
    'mode' => '${mode}',
    '${mode}' => [
        'pin_side'   => '${o.pin_side}',
        'transition' => ${o.transition},
        'intensity'  => ${o.intensity},
        'progress'   => '${o.progress}',${dir}
    ],
],`;
}

export default function ScrollytellingPlayground() {
  const [mode, setMode] = useState('crossfade');
  const [o, setO] = useState(DEFAULTS);
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(0);
  const scrollerRef = useRef(null);
  const layerRefs = useRef([]);
  const stepRefs = useRef([]);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));
  const n = SCENES.length;
  const isDir = !!DIRECTIONAL[mode];

  // active-step detection (mirrors the core: the step crossing the trigger band at 50%)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    let pending = false;
    const compute = () => {
      pending = false;
      const h = scroller.clientHeight || 1;
      const triggerY = scroller.scrollTop + h * 0.5;
      const a = clamp(Math.floor(triggerY / h), 0, n - 1);
      setActive(a);
      const max = scroller.scrollHeight - scroller.clientHeight;
      if (max > 0) setPos(Math.round((scroller.scrollTop / max) * 100));
    };
    const onScroll = () => { if (pending) return; pending = true; requestAnimationFrame(compute); };
    scroller.addEventListener('scroll', onScroll, {passive: true});
    compute();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [n]);

  // toggle .is-active on the layers + steps
  useEffect(() => {
    layerRefs.current.forEach((l, i) => l && l.classList.toggle('is-active', i === active));
    stepRefs.current.forEach((s, i) => s && s.classList.toggle('is-active', i === active));
  }, [active, mode]);

  const scrollToStep = (i) => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTo({top: i * scroller.clientHeight, behavior: 'smooth'});
  };
  const onSlide = (v) => {
    setPos(v);
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = (v / 100) * (scroller.scrollHeight - scroller.clientHeight);
  };

  const php = useMemo(() => buildPhp(mode, o), [mode, o]);
  const dataDir = isDir && o.direction !== 'auto' ? o.direction : undefined;

  const media = (
    <div ref={(el) => (layerRefs.current.wrap = el)} className={`fw-col upw-story-media ${styles.mediaCol}`}>
      {SCENES.map((s, i) => (
        <div key={i} ref={(el) => (layerRefs.current[i] = el)} className={`upw-story-layer ${i === 0 ? 'is-active' : ''}`}>
          <div className={styles.panel} style={{background: s.c}}>
            <span className={styles.panelNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.panelTitle}>{s.t}</span>
          </div>
        </div>
      ))}
    </div>
  );
  const stepsCol = (
    <div className={`fw-col upw-story-steps ${styles.stepsCol}`}>
      {SCENES.map((s, i) => (
        <div key={i} ref={(el) => (stepRefs.current[i] = el)} className={`upw-story-step ${styles.step} ${i === 0 ? 'is-active' : ''}`}>
          <div className={styles.stepInner}>
            <span className={styles.stepNum}>Step {i + 1}</span>
            <h4>{s.t}</h4>
            <p>{s.cap}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.playground}>
      <style>{SCROLLY_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={`${styles.stage} storystage`}>
            <div ref={scrollerRef} className={styles.scroller}>
              <div className={styles.storyWrap}>
                <div className="upw-story" data-story-style={mode} data-story-dir={dataDir}
                  style={{'--story-h': '440px', '--story-step-min': '440px', '--story-top': '0px', '--story-trans': o.transition + 's', '--story-intensity': o.intensity}}>
                  <div className="fw-row" style={{flexDirection: o.pin_side === 'right' ? 'row-reverse' : 'row'}}>
                    {media}
                    {stepsCol}
                  </div>
                  {o.progress === 'dots' && (
                    <div className={`upw-story-progress upw-story-progress--dots ${styles.rail}`}>
                      {SCENES.map((s, i) => (
                        <button key={i} type="button" className={`upw-story-dot ${i === active ? 'is-active' : ''}`} onClick={() => scrollToStep(i)} aria-label={`Step ${i + 1}`} />
                      ))}
                    </div>
                  )}
                  {o.progress === 'bar' && (
                    <div className={`upw-story-progress upw-story-progress--bar ${styles.rail}`}>
                      <span className="upw-story-progress__fill" style={{transform: `scaleY(${active / Math.max(1, n - 1)})`}} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <input type="range" className={styles.vscroll} min="0" max="100" step="1"
              value={pos} onChange={(e) => onSlide(Number(e.target.value))} aria-label="Scroll position" />
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Drag the vertical scroll on the right — the pinned media swaps to each step with the {LABEL[mode]} transition.</span>
          </div>

          <div className={styles.controls}>
            <h5>{LABEL[mode]} — options</h5>
            <div className={styles.control}>
              <label>Media side</label>
              <select className={styles.select} value={o.pin_side} onChange={(e) => set('pin_side', e.target.value)}>
                <option value="left">Media Left</option>
                <option value="right">Media Right</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Transition (s) <span>{o.transition}</span></label>
              <input type="range" min="0.2" max="1.2" step="0.05" value={o.transition} onChange={(e) => set('transition', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Intensity <span>{o.intensity}</span></label>
              <input type="range" min="0" max="1" step="0.05" value={o.intensity} onChange={(e) => set('intensity', Number(e.target.value))} />
            </div>
            {isDir && (
              <div className={styles.control}>
                <label>Direction</label>
                <select className={styles.select} value={o.direction} onChange={(e) => set('direction', e.target.value)}>
                  <option value="auto">Default</option>
                  <option value="up">Up</option>
                  <option value="down">Down</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
            <div className={styles.control}>
              <label>Progress indicator</label>
              <select className={styles.select} value={o.progress} onChange={(e) => set('progress', e.target.value)}>
                <option value="dots">Dots</option>
                <option value="bar">Bar</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Transition</div>
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
            <p className={styles.tip}>Parallax, Pixelate, Color&nbsp;Shift, Frame&nbsp;Sequence, Horizontal&nbsp;Track and Liquid need real media / WebGL — see the doc.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Scrollytelling is a <strong>Section-level</strong> control — Section → <strong>Animations</strong>
          tab → <strong>Scrollytelling</strong>. Build the Section with two columns: one holds N media
          layers, the other N step blocks. The media column pins while the steps scroll, swapping to
          match the active step with the chosen transition. Pure CSS sticky + IntersectionObserver;
          honours reduced motion (media shows statically above each step).
        </p>
      </div>
    </div>
  );
}
