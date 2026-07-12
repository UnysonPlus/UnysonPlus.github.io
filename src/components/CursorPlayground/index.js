/*
 * Custom Cursor — interactive playground.
 *
 * Move your pointer over the stage: the chosen cursor style follows it, running the real plugin
 * runtime (see mount-cursor.js + cursor-css.js). Site-wide settings (size, color, trail, hover-grow,
 * magnetic, blend, click FX) and each style's own options are wired live, and the Theme-Settings
 * sample updates as you tweak. A few canvas/image-based styles (Magnify, Image Reveal, Metaball,
 * Ink/Fluid/Ripple, Word Trail, Contextual Label, Custom Image) need a real page and are listed on
 * the doc page rather than simulated here.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {CURSOR_CSS} from './cursor-css';
import {mountCursor} from './mount-cursor';

const GROUPS = [
  ['Shapes', ['dot', 'ring', 'dot_ring', 'crosshair', 'brackets', 'square', 'dashed', 'plus', 'star', 'diamond', 'arrow', 'glyph']],
  ['Targets & rings', ['dual_ring', 'bullseye', 'reticle', 'radar', 'elastic', 'sticky']],
  ['Glow & fills', ['glow', 'gradient', 'blob', 'invert', 'lens', 'spotlight']],
  ['Trails', ['comet', 'particles', 'streak', 'rope', 'echo', 'firefly', 'confetti', 'bubble']],
];
const LABELS = {
  dot: 'Dot', ring: 'Ring', dot_ring: 'Dot + Ring', crosshair: 'Crosshair', brackets: 'Brackets',
  square: 'Square', dashed: 'Dashed', plus: 'Plus', star: 'Sparkle', diamond: 'Diamond', arrow: 'Arrow',
  glyph: 'Glyph', dual_ring: 'Dual Ring', bullseye: 'Bullseye', reticle: 'Reticle', radar: 'Radar',
  elastic: 'Elastic', sticky: 'Sticky', glow: 'Glow', gradient: 'Gradient', blob: 'Blob', invert: 'Invert',
  lens: 'Glass Lens', spotlight: 'Spotlight', comet: 'Comet', particles: 'Particles', streak: 'Streak',
  rope: 'Rubber Band', echo: 'Afterimage', firefly: 'Firefly', confetti: 'Confetti', bubble: 'Bubbles',
};
const ALL = GROUPS.flatMap(([, ks]) => ks);

// Which extra controls each style shows (beyond the shared size/color/trail).
const EXTRAS = {
  spotlight: ['spotRadius', 'spotDim'],
  particles: ['count'], echo: ['count'], firefly: ['count'], confetti: ['count', 'confettiMulti'], bubble: ['count'],
  elastic: ['elastic'],
  lens: ['lensRadius', 'lensBlur'],
  radar: ['radarSpeed'],
  glyph: ['glyph'],
};

const DEFAULTS = {
  size: 8, color: '#2f74e6', trail: 0.18,
  hoverGrow: true, magnetic: false, blend: false, clickRipple: false, clickBurst: false,
  spotRadius: 160, spotDim: 0.6, count: 10, confettiMulti: true, elastic: 0.5,
  lensRadius: 70, lensBlur: 4, radarSpeed: 1.6, glyph: '→',
};

const phpBool = (b) => (b ? "'yes'" : "'no'");
function buildPhp(style, s) {
  const sub = {};
  if (['dot_ring', 'comet', 'particles', 'streak', 'rope', 'echo', 'firefly', 'confetti', 'bubble'].includes(style)) sub.trail = s.trail;
  (EXTRAS[style] || []).forEach((k) => {
    if (k === 'spotRadius') sub.spot_radius = s.spotRadius;
    else if (k === 'spotDim') sub.spot_dim = s.spotDim;
    else if (k === 'count') sub.count = s.count;
    else if (k === 'confettiMulti') sub.multicolor = s.confettiMulti ? 'yes' : 'no';
    else if (k === 'elastic') sub.elastic = s.elastic;
    else if (k === 'lensRadius') sub.lens_radius = s.lensRadius;
    else if (k === 'lensBlur') sub.lens_blur = s.lensBlur;
    else if (k === 'radarSpeed') sub.radar_speed = s.radarSpeed;
    else if (k === 'glyph') sub.glyph_char = s.glyph;
  });
  const subStr = Object.entries(sub).map(([k, v]) => `            '${k}' => ${typeof v === 'number' ? v : `'${v}'`},`).join('\n');
  const subBlock = subStr ? `\n${subStr}\n        ` : '';
  return `'animation_cursor' => [
    'enable'       => 'yes',
    'color'        => [ 'predefined' => '', 'custom' => '${s.color}' ],
    'size'         => ${s.size},
    'hover_grow'   => ${phpBool(s.hoverGrow)},
    'magnetic'     => ${phpBool(s.magnetic)},
    'blend'        => ${phpBool(s.blend)},
    'click_ripple' => ${phpBool(s.clickRipple)},
    'click_burst'  => ${phpBool(s.clickBurst)},
    'style' => [
        'shape' => '${style}',
        '${style}' => [${subBlock}],
    ],
],`;
}

export default function CursorPlayground() {
  const [style, setStyle] = useState('dot_ring');
  const [s, setS] = useState(DEFAULTS);
  const stageRef = useRef(null);
  const seedRef = useRef({x: null, y: null});
  const set = (k, v) => setS((st) => ({...st, [k]: v}));

  const cfg = useMemo(() => ({
    style, color: s.color, size: s.size, trail: s.trail,
    hoverGrow: s.hoverGrow, magnetic: s.magnetic, blend: s.blend,
    clickRipple: s.clickRipple, clickBurst: s.clickBurst,
    spotRadius: s.spotRadius, spotDim: s.spotDim, count: s.count, confettiMulti: s.confettiMulti,
    elastic: s.elastic, lensRadius: s.lensRadius, lensBlur: s.lensBlur, radarSpeed: s.radarSpeed, glyph: s.glyph,
  }), [style, s]);

  useEffect(() => {
    if (!stageRef.current) return undefined;
    const teardown = mountCursor(stageRef.current, cfg, seedRef.current);
    return teardown;
  }, [cfg]);

  const php = useMemo(() => buildPhp(style, s), [style, s]);
  const extras = EXTRAS[style] || [];
  const showTrail = ['dot_ring', 'comet', 'particles', 'streak', 'rope', 'echo', 'firefly', 'confetti', 'bubble'].includes(style);

  const num = (id, label, min, max, step) => (
    <div className={styles.control} key={id}>
      <label>{label} <span>{s[id]}</span></label>
      <input type="range" min={min} max={max} step={step} value={s[id]} onChange={(e) => set(id, Number(e.target.value))} />
    </div>
  );
  const toggle = (id, label) => (
    <div className={styles.control} key={id}>
      <label>{label}</label>
      <div className={styles.toggle}>
        <button type="button" className={!s[id] ? styles.on : ''} onClick={() => set(id, false)}>Off</button>
        <button type="button" className={s[id] ? styles.on : ''} onClick={() => set(id, true)}>On</button>
      </div>
    </div>
  );

  return (
    <div className={styles.playground}>
      <style>{CURSOR_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div ref={stageRef} className={`${styles.stage} mpcur`}>
            <div className={styles.demoRow}>
              <button type="button" className={styles.demoBtn} data-cursor-target>Hover me</button>
              <button type="button" className={styles.demoBtn} data-cursor-target>Magnetic</button>
              <span className={styles.demoCard} data-cursor-target>Sticky target</span>
            </div>
            <div className={styles.hint}>move your pointer here · click for ripple/burst · pick a style →</div>
          </div>

          <div className={styles.controls}>
            <h5>{LABELS[style]} — options</h5>
            {num('size', 'Size (px)', 4, 24, 1)}
            <div className={styles.control}>
              <label>Color <span>{s.color}</span></label>
              <input type="color" className={styles.color} value={s.color} onChange={(e) => set('color', e.target.value)} />
            </div>
            {showTrail && num('trail', 'Trail (lag)', 0.05, 1, 0.01)}
            {extras.includes('spotRadius') && num('spotRadius', 'Spotlight radius', 40, 400, 5)}
            {extras.includes('spotDim') && num('spotDim', 'Dim strength', 0, 0.9, 0.05)}
            {extras.includes('count') && num('count', 'Particle count', 3, style === 'particles' ? 24 : 30, 1)}
            {extras.includes('elastic') && num('elastic', 'Elasticity', 0, 1, 0.05)}
            {extras.includes('lensRadius') && num('lensRadius', 'Lens radius', 30, 140, 5)}
            {extras.includes('lensBlur') && num('lensBlur', 'Lens blur', 0, 12, 0.5)}
            {extras.includes('radarSpeed') && num('radarSpeed', 'Radar speed (s)', 0.6, 4, 0.1)}
            {extras.includes('confettiMulti') && toggle('confettiMulti', 'Multicolor')}
            {extras.includes('glyph') && (
              <div className={styles.control}>
                <label>Glyph / emoji</label>
                <input type="text" className={styles.text} maxLength={3} value={s.glyph} onChange={(e) => set('glyph', e.target.value)} />
              </div>
            )}

            <div className={styles.subhead}>Global</div>
            {toggle('hoverGrow', 'Hover grow')}
            {toggle('magnetic', 'Magnetic')}
            {toggle('blend', 'Blend (difference)')}
            {toggle('clickRipple', 'Click ripple')}
            {toggle('clickBurst', 'Click burst')}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map((k) => (
                    <button key={k} type="button" className={k === style ? styles.tabActive : styles.tab} onClick={() => setStyle(k)}>{LABELS[k]}</button>
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
          The Custom Cursor is <strong>site-wide</strong> — <strong>Theme Settings → Site-wide UX →
          Custom Cursor</strong>. <code>style</code> is a multi-picker (the shape + its own sub-options);
          <code>color</code> uses the theme color-preset picker (stored as <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code>).
          It auto-disables on touch / coarse pointers and honours reduced motion.
        </p>
      </div>
    </div>
  );
}
