/*
 * Infinite Scroll Loop — interactive playground.
 *
 * Ports the real technique (modules/scroll-loop): a run of full-height sections is turned into a
 * TERMINAL infinite loop by appending a CLONE of the first section after the last, and — when the
 * smoothed scroll reaches the clone (one full cycle past the top) — jumping back by exactly one cycle.
 * Because the clone is pixel-identical to the first section, the wrap is invisible → seamless infinite
 * scroll. Optional mandatory snapping advances one section per gesture. Here the stage is the scroll
 * container; Auto-scroll (or your mouse wheel over the stage) drives the loop.
 */
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const easeInOut = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

const SECTIONS = [
  {t: 'Aurora', c: 'linear-gradient(160deg,#6a8dff,#c56cff)'},
  {t: 'Ember', c: 'linear-gradient(160deg,#f59e0b,#e0447d)'},
  {t: 'Forest', c: 'linear-gradient(160deg,#17a34a,#00c2b2)'},
  {t: 'Plum', c: 'linear-gradient(160deg,#9333ea,#2f74e6)'},
];
const N = SECTIONS.length;

function buildPhp(o) {
  const dur = o.snap === 'yes' ? `\n        'snap_duration' => ${o.snap_duration},` : '';
  return `// On the FIRST section of the run (Section → Animations → Infinite Scroll Loop);
// mark each full-height section of the loop group:
'scroll_loop' => [
    'mode' => 'loop',
    'loop' => [
        'snap'          => '${o.snap}',${dur}
        'run_on_mobile' => '${o.run_on_mobile}',
    ],
],`;
}

export default function ScrollLoopPlayground() {
  const [playing, setPlaying] = useState(true);
  const [o, setO] = useState({snap: 'no', snap_duration: 0.8, run_on_mobile: 'yes'});
  const [cur, setCur] = useState(0);
  const scrollerRef = useRef(null);
  const runRef = useRef(true);
  const snapRef = useRef(false);
  const durRef = useRef(0.8);
  const speedRef = useRef(1.4);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));

  useEffect(() => { runRef.current = playing; }, [playing]);
  useEffect(() => { snapRef.current = o.snap === 'yes'; durRef.current = o.snap_duration; }, [o.snap, o.snap_duration]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    let raf = 0, cancelled = false, wrapping = false;
    const phase = {mode: 'dwell', t0: 0, startTop: 0, target: 0};
    const H = () => scroller.clientHeight || 1;
    const cycle = () => N * H();

    const wrap = () => {
      if (wrapping) return;
      const c = cycle();
      if (scroller.scrollTop >= c - 0.5) { wrapping = true; scroller.scrollTop -= c; requestAnimationFrame(() => { wrapping = false; }); }
    };
    const onScroll = () => {
      wrap();
      const h = H();
      setCur(((Math.round(scroller.scrollTop / h) % N) + N) % N);
    };
    scroller.addEventListener('scroll', onScroll, {passive: true});

    const loop = (now) => {
      if (cancelled) return;
      if (runRef.current) {
        if (snapRef.current) {
          if (phase.mode === 'dwell') {
            if (now - phase.t0 >= 750) { phase.mode = 'move'; phase.startTop = scroller.scrollTop; phase.target = phase.startTop + H(); phase.t0 = now; }
          } else {
            const p = clamp((now - phase.t0) / (durRef.current * 1000), 0, 1);
            scroller.scrollTop = phase.startTop + (phase.target - phase.startTop) * easeInOut(p);
            if (p >= 1) { phase.mode = 'dwell'; phase.t0 = now; wrap(); }
          }
        } else {
          scroller.scrollTop += speedRef.current;
          wrap();
        }
      } else {
        phase.mode = 'dwell'; phase.t0 = now; // reset the snap clock while paused
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelled = true; cancelAnimationFrame(raf); scroller.removeEventListener('scroll', onScroll); };
  }, []);

  const php = buildPhp(o);

  const section = (s, i, clone) => (
    <div key={clone ? 'clone' : i} className={styles.section} style={{background: s.c}} aria-hidden={clone ? 'true' : undefined}>
      <span className={styles.secNum}>{String((clone ? 0 : i) + 1).padStart(2, '0')}</span>
      <span className={styles.secTitle}>{s.t}</span>
      {clone && <span className={styles.seamTag}>clone of §1 — the invisible seam</span>}
    </div>
  );

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div ref={scrollerRef} className={styles.scroller}>
              {SECTIONS.map((s, i) => section(s, i, false))}
              {section(SECTIONS[0], 0, true)}
            </div>
            <div className={styles.badge}>§{cur + 1} / {N} · loops forever ↻</div>
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Auto-scrolling — reaching the clone jumps back one cycle, so it loops seamlessly. Wheel-scroll over the stage works too.</span>
            <button type="button" className={styles.play} onClick={() => setPlaying((p) => !p)}>{playing ? '❚❚ Pause' : '▶ Play'}</button>
          </div>

          <div className={styles.controls}>
            <h5>Infinite Scroll Loop — options</h5>
            <div className={styles.control}>
              <label>Section snapping</label>
              <div className={styles.toggle}>
                <button type="button" className={o.snap === 'no' ? styles.on : ''} onClick={() => set('snap', 'no')}>Off</button>
                <button type="button" className={o.snap === 'yes' ? styles.on : ''} onClick={() => set('snap', 'yes')}>On</button>
              </div>
            </div>
            {o.snap === 'yes' ? (
              <div className={styles.control}>
                <label>Snap duration (s) <span>{o.snap_duration}</span></label>
                <input type="range" min="0.3" max="1.6" step="0.1" value={o.snap_duration} onChange={(e) => set('snap_duration', Number(e.target.value))} />
              </div>
            ) : (
              <div className={styles.control}>
                <label>Auto-scroll speed <span>{speedRef.current}</span></label>
                <input type="range" min="0.4" max="4" step="0.2" defaultValue={speedRef.current} onChange={(e) => { speedRef.current = Number(e.target.value); }} />
              </div>
            )}
            <div className={styles.control}>
              <label>Run on mobile</label>
              <div className={styles.toggle}>
                <button type="button" className={o.run_on_mobile === 'no' ? styles.on : ''} onClick={() => set('run_on_mobile', 'no')}>Off</button>
                <button type="button" className={o.run_on_mobile === 'yes' ? styles.on : ''} onClick={() => set('run_on_mobile', 'yes')}>On</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>How it loops</div>
            <ol className={styles.steps}>
              <li>Mark a run of full-height sections as the loop group.</li>
              <li>A <strong>clone of section&nbsp;1</strong> is appended after the last.</li>
              <li>When the smoothed scroll reaches the clone (one full <em>cycle</em> past the top), it jumps back by exactly one cycle.</li>
              <li>The clone is pixel-identical to section&nbsp;1, so the wrap is <strong>invisible</strong> — seamless infinite scroll.</li>
            </ol>
            <p className={styles.tip}>On a live site the smooth scroll is driven by <strong>Lenis</strong>; optional <strong>snapping</strong> gives the "one section per gesture" feel.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Infinite Scroll Loop is a <strong>Section-level</strong> control — mark each full-height
          Section of the run under its <strong>Animations</strong> tab. Everything <em>above</em> the
          group scrolls normally; the group sits at the bottom and loops forever downward. Smooth scroll
          is powered by <strong>Lenis</strong> (loaded only where used); it honours reduced motion (plain
          native scroll, no clone).
        </p>
      </div>
    </div>
  );
}
