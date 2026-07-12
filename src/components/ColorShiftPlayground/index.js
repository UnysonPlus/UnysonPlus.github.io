/*
 * Scroll Color Shift — interactive playground.
 *
 * Ports the real runtime (modules/scroll-color-shift): each Section carries a target background (and
 * optional text) colour; as it crosses the middle of the viewport the page background morphs to it,
 * smoothed by a CSS transition. Here the "page" is the stage; a scroll viewport holds a stack of
 * full-height sections, and the section crossing the mid-line sets the stage colour. A vertical
 * "scroll" slider on the right edge scrubs the scroll. Options map 1:1 to the section atts.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

const INITIAL = [
  {label: 'Midnight', bg: '#0b1220', text: '#c7d2fe'},
  {label: 'Ember', bg: '#7c2d12', text: '#ffe4c4'},
  {label: 'Forest', bg: '#14532d', text: '#dcfce7'},
  {label: 'Plum', bg: '#4c1d95', text: '#ede9fe'},
  {label: 'Slate', bg: '#334155', text: '#e2e8f0'},
];

function buildPhp(s, dur) {
  return `// On EACH Section (Section → Animations → Scroll Color Shift):
'scroll_color_shift' => [
    'mode' => 'shift',
    'shift' => [
        'bg_color'   => [ 'predefined' => '', 'custom' => '${s.bg}' ],
        'text_color' => [ 'predefined' => '', 'custom' => '${s.text}' ],
        'duration'   => ${dur},
    ],
],`;
}

export default function ColorShiftPlayground() {
  const [sections, setSections] = useState(INITIAL);
  const [dur, setDur] = useState(0.6);
  const [sel, setSel] = useState(0);
  const [pos, setPos] = useState(0);
  const wrapRef = useRef(null);
  const scrollerRef = useRef(null);
  const sliderElRef = useRef(null);

  const setSecColor = (k, v) => setSections((arr) => arr.map((s, i) => (i === sel ? {...s, [k]: v} : s)));

  // Runtime — mirror pick(): the section whose top is just above the mid-line wins; morph the wrap.
  useEffect(() => {
    const wrap = wrapRef.current, scroller = scrollerRef.current;
    if (!wrap || !scroller) return undefined;
    const secs = Array.prototype.slice.call(scroller.querySelectorAll('[data-cs-bg]'));
    let ticking = false;

    const pick = () => {
      const r = scroller.getBoundingClientRect();
      const mid = r.top + r.height * 0.5;
      let active = null, bestTop = -Infinity;
      for (let i = 0; i < secs.length; i++) {
        const t = secs[i].getBoundingClientRect().top;
        if (t <= mid && t > bestTop) { bestTop = t; active = secs[i]; }
      }
      if (!active) active = secs[0];
      if (!active) return;
      wrap.style.setProperty('--cs-dur', (active.getAttribute('data-cs-dur') || '0.6') + 's');
      wrap.style.backgroundColor = active.getAttribute('data-cs-bg');
      wrap.style.color = active.getAttribute('data-cs-text') || '';
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pick();
        const max = scroller.scrollHeight - scroller.clientHeight;
        if (sliderElRef.current && max > 0) sliderElRef.current.value = String(Math.round((scroller.scrollTop / max) * 100));
        ticking = false;
      });
    };
    scroller.addEventListener('scroll', onScroll, {passive: true});
    pick();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [sections, dur]);

  const onSlide = (v) => {
    setPos(v);
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = (v / 100) * (scroller.scrollHeight - scroller.clientHeight);
  };

  const php = useMemo(() => buildPhp(sections[sel], dur), [sections, sel, dur]);

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div ref={wrapRef} className={styles.stage} style={{'--cs-dur': dur + 's'}}>
            <div ref={scrollerRef} className={styles.scroller}>
              {sections.map((s, i) => (
                <section key={i} className={`${styles.section} ${i === sel ? styles.sectionSel : ''}`}
                  data-cs-bg={s.bg} data-cs-text={s.text} data-cs-dur={dur}>
                  <div className={styles.secNum}>{String(i + 1).padStart(2, '0')}</div>
                  <div className={styles.secLabel}>{s.label}</div>
                  <div className={styles.secHex}>{s.bg}</div>
                </section>
              ))}
            </div>
            <div className={styles.midline}><span>page morphs to the section on this line</span></div>
            <input ref={sliderElRef} type="range" className={styles.vscroll} min="0" max="100" step="1"
              defaultValue={pos} onChange={(e) => onSlide(Number(e.target.value))} aria-label="Scroll position" />
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Drag the vertical scroll on the right — the stage background morphs to each section as it crosses the mid-line.</span>
          </div>

          <div className={styles.controls}>
            <h5>Section {sel + 1} ({sections[sel].label}) — colours</h5>
            <div className={styles.control}>
              <label>Page colour <span>{sections[sel].bg}</span></label>
              <input type="color" className={styles.color} value={sections[sel].bg} onChange={(e) => setSecColor('bg', e.target.value)} />
            </div>
            <div className={styles.control}>
              <label>Text colour <span>{sections[sel].text}</span></label>
              <input type="color" className={styles.color} value={sections[sel].text} onChange={(e) => setSecColor('text', e.target.value)} />
            </div>
            <div className={styles.control}>
              <label>Transition (s) <span>{dur}</span></label>
              <input type="range" min="0.2" max="2" step="0.1" value={dur} onChange={(e) => setDur(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Sections</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Top → bottom</span>
              <div className={styles.tabPills}>
                {sections.map((s, i) => (
                  <button key={i} type="button" className={i === sel ? styles.tabActive : styles.tab} onClick={() => setSel(i)}>
                    <span className={styles.swatch} style={{background: s.bg}} />
                    {String(i + 1).padStart(2, '0')} · {s.label}
                  </button>
                ))}
              </div>
            </div>
            <p className={styles.tip}>Each Section gets its own page colour; the background morphs between them as you scroll.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Scroll Color Shift is a <strong>Section-level</strong> control — Section → <strong>Animations</strong>
          tab → <strong>Scroll Color Shift</strong>. As each marked section crosses the middle of the
          screen, the page background (and optionally text) transitions to its colour. Best on
          full-bleed, transparent sections; colours use the theme color-preset picker. Honours reduced motion.
        </p>
      </div>
    </div>
  );
}
