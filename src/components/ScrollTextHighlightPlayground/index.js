/*
 * Scroll Text Highlight — interactive playground.
 *
 * Ports the real runtime (modules/scroll-text-highlight): the text is split into word (or character)
 * `.sth-w` spans and an `.is-on` class is scrubbed across them by scroll progress — muted → full,
 * with four styles (fill / fade / blur / marker). On a live page the progress is the element's
 * passage through the viewport; here a vertical "scroll" slider on the right edge of the stage scrubs
 * it. Options map 1:1 to the shortcode atts and the sample updates as you tweak.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

// Verbatim base + per-style CSS, scoped to the stage `.sthstage`.
const STH_CSS = `
.sthstage .sc-sth .sth-w {
  display: inline-block;
  transition: color var(--sth-dur, .5s) ease, opacity var(--sth-dur, .5s) ease, filter var(--sth-dur, .5s) ease, background-size var(--sth-dur, .5s) ease;
  will-change: opacity, filter;
}
.sthstage .sc-sth .sth-sp { display: inline-block; white-space: pre; }
.sthstage .sc-sth--fill .sth-w { color: inherit; opacity: .26; }
.sthstage .sc-sth--fill .sth-w.is-on { opacity: 1; color: var(--sth-active, inherit); }
.sthstage .sc-sth--fade .sth-w { opacity: .16; }
.sthstage .sc-sth--fade .sth-w.is-on { opacity: 1; }
.sthstage .sc-sth--blur .sth-w { opacity: .4; filter: blur(5px); }
.sthstage .sc-sth--blur .sth-w.is-on { opacity: 1; filter: blur(0); }
.sthstage .sc-sth--marker .sth-w {
  background-image: linear-gradient(var(--sth-active, #ffe08a), var(--sth-active, #ffe08a));
  background-repeat: no-repeat; background-position: 0 86%; background-size: 0% 34%;
  border-radius: 2px; padding: 0 1px;
}
.sthstage .sc-sth--marker .sth-w.is-on { background-size: 100% 34%; }
`;

const SAMPLE = 'Great typography guides the eye. As you scroll, each word lights up in turn — a simple, focused reading rhythm that keeps attention exactly where you want it.';

const STYLES = [
  ['fill', 'Fill (colour)'],
  ['fade', 'Fade (opacity)'],
  ['blur', 'Blur to sharp'],
  ['marker', 'Marker sweep'],
];
const DEFAULTS = {split: 'word', active_color: '#2f74e6', duration: 0.5, once: 'yes'};

function buildPhp(mode, o) {
  return `'scroll_text_highlight' => [
    'mode' => '${mode}',
    '${mode}' => [
        'split'        => '${o.split}',
        'active_color' => [ 'predefined' => '', 'custom' => '${o.active_color}' ],
        'duration'     => ${o.duration},
        'once'         => '${o.once}',
    ],
],`;
}

export default function ScrollTextHighlightPlayground() {
  const [mode, setMode] = useState('fill');
  const [o, setO] = useState(DEFAULTS);
  const [pos, setPos] = useState(0); // vertical scroll slider 0..100
  const targetRef = useRef(null);
  const set = (k, v) => setO((s) => ({...s, [k]: v}));

  // tokenised content (rebuilt when the text or split mode changes)
  const tokens = useMemo(() => (SAMPLE.match(/\s+|\S+/g) || []).map((tok, i) => ({tok, i, space: /^\s+$/.test(tok)})), []);

  // toggle .is-on across the word spans by scroll progress (mirrors update() → active = round(p*n))
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const spans = el.querySelectorAll('.sth-w');
    const p = pos / 100;
    const active = Math.round(p * spans.length);
    const once = o.once === 'yes';
    spans.forEach((sp, i) => {
      const on = i < active;
      if (once) { if (on) sp.classList.add('is-on'); }
      else { sp.classList.toggle('is-on', on); }
    });
  }, [pos, o.once, mode, o.split]);

  // reset lit state when the style / split changes (spans are re-rendered by React on split change)
  useEffect(() => {
    const el = targetRef.current;
    if (el) el.querySelectorAll('.sth-w').forEach((sp) => sp.classList.remove('is-on'));
    setPos(0);
  }, [mode, o.split]);

  const php = useMemo(() => buildPhp(mode, o), [mode, o]);

  const renderTokens = () => tokens.map(({tok, i, space}) => {
    if (space) return <span key={i} className="sth-sp">{tok}</span>;
    if (o.split === 'char') {
      return (
        <span key={i} style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
          {Array.from(tok).map((c, j) => <span key={j} className="sth-w">{c}</span>)}
        </span>
      );
    }
    return <span key={i} className="sth-w">{tok}</span>;
  });

  return (
    <div className={styles.playground}>
      <style>{STH_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={`${styles.stage} sthstage`}>
            <p ref={targetRef} className={`${styles.target} sc-sth sc-sth--${mode}`}
              style={{'--sth-dur': o.duration + 's', '--sth-active': o.active_color}}>
              {renderTokens()}
            </p>
            <input type="range" className={styles.vscroll} min="0" max="100" step="1"
              value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Scroll position" />
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>Drag the vertical scroll on the right edge — each word lights up as it passes.</span>
          </div>

          <div className={styles.controls}>
            <h5>{STYLES.find((s) => s[0] === mode)[1]} — options</h5>
            <div className={styles.control}>
              <label>Reveal by</label>
              <select className={styles.select} value={o.split} onChange={(e) => set('split', e.target.value)}>
                <option value="word">Word</option>
                <option value="char">Character</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Highlight colour <span>{o.active_color}</span></label>
              <input type="color" className={styles.color} value={o.active_color} onChange={(e) => set('active_color', e.target.value)} />
            </div>
            <div className={styles.control}>
              <label>Per-word ease (s) <span>{o.duration}</span></label>
              <input type="range" min="0" max="1.5" step="0.05" value={o.duration} onChange={(e) => set('duration', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Keep highlighted</label>
              <div className={styles.toggle}>
                <button type="button" className={o.once === 'no' ? styles.on : ''} onClick={() => set('once', 'no')}>Off</button>
                <button type="button" className={o.once === 'yes' ? styles.on : ''} onClick={() => set('once', 'yes')}>On</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Highlight</span>
              <div className={styles.tabPills}>
                {STYLES.map(([k, label]) => (
                  <button key={k} type="button" className={k === mode ? styles.tabActive : styles.tab} onClick={() => setMode(k)}>{label}</button>
                ))}
              </div>
            </div>
            <p className={styles.tip}>Marker &amp; Fill use the highlight colour; Fade &amp; Blur ignore it.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Scroll Text Highlight is a <strong>per-element</strong> control on the <strong>Animations</strong>
          tab. The runtime splits the text into word (or character) spans and scrubs each from muted to
          full as it scrolls through the viewport — pure CSS transitions + one passive scroll check.
          Colours use the theme color-preset picker; it honours reduced motion (everything lit).
        </p>
      </div>
    </div>
  );
}
