/*
 * Animated Backgrounds — interactive playground.
 *
 * Pick an effect: it's built inside the stage host by the real engine (bg-engine.js), reading the
 * same data-bg-* attributes / CSS vars the plugin emits. Every effect's options are wired live and
 * the Theme-Settings sample updates as you tweak. All 35 effects are pure canvas/CSS, so the whole
 * module is reproduced here — nothing is simulated or stubbed.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {BG_CSS, mountBg} from './bg-engine';

// target helpers: V = CSS custom property (CSS-only effects); A = data-bg-* attribute (canvas).
const V = (n, u) => ({m: 'var', n, u});
const A = (n) => ({m: 'attr', n});
const col = (id, label, def, tgt) => ({id, label, t: 'color', def, tgt});
const sl = (id, label, def, min, max, step, tgt) => ({id, label, t: 'slider', def, min, max, step, tgt});
const va = (id, label, def, choices, tgt) => ({id, label, t: 'select', def, choices, tgt});

const SPEED = (def) => sl('speed', 'Speed', def, 0.5, 20, 0.5, V('--bg-speed', 's'));
const SPEEDA = (def, max = 12) => sl('speed', 'Speed', def, 0.5, max, 0.5, A('data-bg-speed'));

const EFFECTS = {
  // ---- Gradients (CSS) ----
  aurora: {group: 'Gradients', label: 'Aurora', controls: [col('color_a', 'Color 1', '#6a8dff', V('--bg-c1')), col('color_b', 'Color 2', '#c56cff', V('--bg-c2')), col('color_c', 'Color 3', '#00d4c8', V('--bg-c3')), SPEED(8)]},
  gradient: {group: 'Gradients', label: 'Gradient', controls: [col('color_a', 'Color 1', '#2f74e6', V('--bg-c1')), col('color_b', 'Color 2', '#7a3cff', V('--bg-c2')), col('color_c', 'Color 3', '#00b2b2', V('--bg-c3')), sl('angle', 'Angle', 120, 0, 360, 5, V('--bg-angle', 'deg')), SPEED(10)]},
  mesh: {group: 'Gradients', label: 'Mesh', controls: [col('color_a', 'Color 1', '#6a8dff', V('--bg-c1')), col('color_b', 'Color 2', '#ff6ac1', V('--bg-c2')), col('color_c', 'Color 3', '#ffd36a', V('--bg-c3')), col('color_d', 'Color 4', '#00d4c8', V('--bg-c4')), SPEED(12)]},
  conic: {group: 'Gradients', label: 'Conic', controls: [col('color_a', 'Color 1', '#2f74e6', V('--bg-c1')), col('color_b', 'Color 2', '#7a3cff', V('--bg-c2')), col('color_c', 'Color 3', '#00b2b2', V('--bg-c3')), SPEED(12)]},
  orbs: {group: 'Gradients', label: 'Orbs', controls: [col('color_a', 'Color 1', '#6a8dff', V('--bg-c1')), col('color_b', 'Color 2', '#c56cff', V('--bg-c2')), SPEED(10)]},
  // ---- Patterns (CSS) ----
  dots: {group: 'Patterns', label: 'Dots', controls: [col('color', 'Color', '#94a3b8', V('--bg-color')), sl('size', 'Dot size', 2, 1, 8, 1, V('--bg-dot', 'px')), sl('gap', 'Gap', 26, 8, 60, 1, V('--bg-gap', 'px'))]},
  grid: {group: 'Patterns', label: 'Grid', controls: [col('color', 'Color', '#94a3b8', V('--bg-color')), sl('gap', 'Gap', 40, 10, 100, 1, V('--bg-gap', 'px')), SPEED(12)]},
  scanlines: {group: 'Patterns', label: 'Scanlines', controls: [col('color', 'Color', '#000000', V('--bg-color')), sl('opacity', 'Opacity', 0.12, 0, 0.5, 0.02, V('--bg-opacity')), SPEED(6)]},
  rays: {group: 'Patterns', label: 'Rays', controls: [col('color', 'Color', '#ffffff', V('--bg-color')), sl('angle', 'Angle', 25, 0, 90, 1, V('--bg-angle', 'deg')), SPEED(10)]},
  // ---- Particles (canvas) ----
  particles: {group: 'Particles', label: 'Particles', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 60, 6, 200, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  constellation: {group: 'Particles', label: 'Constellation', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 55, 6, 160, 2, A('data-bg-density')), sl('link_dist', 'Link distance', 120, 40, 240, 5, A('data-bg-link'))]},
  starfield: {group: 'Particles', label: 'Starfield', controls: [col('color', 'Color', '#ffffff', A('data-bg-color')), sl('density', 'Stars', 120, 20, 500, 10, A('data-bg-density')), SPEEDA(4, 10)]},
  snow: {group: 'Particles', label: 'Snow', controls: [va('variant', 'Variant', 'snow', [['snow', 'Snow'], ['petals', 'Petals'], ['embers', 'Embers'], ['ash', 'Ash']], A('data-bg-variant')), sl('density', 'Density', 70, 6, 200, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  confetti: {group: 'Particles', label: 'Confetti', controls: [sl('density', 'Density', 60, 6, 200, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  bubbles: {group: 'Particles', label: 'Bubbles', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 40, 6, 160, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  fireflies: {group: 'Particles', label: 'Fireflies', controls: [col('color', 'Color', '#ffd36a', A('data-bg-color')), sl('density', 'Density', 40, 6, 160, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  bokeh: {group: 'Particles', label: 'Bokeh', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 40, 6, 120, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  rain: {group: 'Particles', label: 'Rain', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 40, 6, 200, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  shapes: {group: 'Particles', label: 'Shapes', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 40, 6, 120, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  meteors: {group: 'Particles', label: 'Meteors', controls: [col('color', 'Color', '#ffffff', A('data-bg-color')), sl('density', 'Density', 40, 6, 120, 2, A('data-bg-density')), SPEEDA(3, 10)]},
  flow: {group: 'Particles', label: 'Flow Field', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Density', 70, 6, 200, 2, A('data-bg-density')), SPEEDA(6)]},
  // ---- Structural (canvas) ----
  waves: {group: 'Structural', label: 'Waves', controls: [col('color', 'Color', '#2f74e6', A('data-bg-color')), sl('amplitude', 'Amplitude', 30, 5, 80, 1, A('data-bg-amp')), SPEEDA(6)]},
  pgrid: {group: 'Structural', label: 'Perspective Grid', controls: [col('color', 'Color', '#ff6ac1', A('data-bg-color')), SPEEDA(6)]},
  hexgrid: {group: 'Structural', label: 'Hex Grid', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), SPEEDA(6)]},
  topo: {group: 'Structural', label: 'Topographic', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), SPEEDA(6)]},
  circuit: {group: 'Structural', label: 'Circuit', controls: [col('color', 'Color', '#00e5a0', A('data-bg-color')), SPEEDA(6)]},
  halftone: {group: 'Structural', label: 'Halftone', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('gap', 'Gap', 16, 8, 40, 1, A('data-bg-gap')), SPEEDA(6)]},
  orbits: {group: 'Structural', label: 'Orbits', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('density', 'Systems', 4, 1, 6, 1, A('data-bg-density')), SPEEDA(6)]},
  ripple: {group: 'Structural', label: 'Ripple', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), SPEEDA(6)]},
  // ---- Atmospheric (canvas) ----
  noise: {group: 'Atmospheric', label: 'Noise', controls: [sl('opacity', 'Opacity', 0.06, 0, 0.3, 0.01, A('data-bg-opacity')), SPEEDA(1, 5)]},
  matrix: {group: 'Atmospheric', label: 'Matrix', controls: [col('color', 'Color', '#19ff7a', A('data-bg-color')), SPEEDA(6)]},
  blobs: {group: 'Atmospheric', label: 'Blobs', controls: [col('color', 'Color 1', '#6a8dff', A('data-bg-color')), col('color2', 'Color 2', '#c56cff', A('data-bg-color2')), SPEEDA(6)]},
  nebula: {group: 'Atmospheric', label: 'Nebula', controls: [col('color', 'Color 1', '#3b3fff', A('data-bg-color')), col('color2', 'Color 2', '#c56cff', A('data-bg-color2')), col('color3', 'Color 3', '#00d4c8', A('data-bg-color3')), SPEEDA(8)]},
  borealis: {group: 'Atmospheric', label: 'Borealis', controls: [col('color', 'Color 1', '#3bffb0', A('data-bg-color')), col('color2', 'Color 2', '#6a8dff', A('data-bg-color2')), SPEEDA(6)]},
  spotlight: {group: 'Atmospheric', label: 'Spotlight', controls: [col('color', 'Color', '#6aa6ff', A('data-bg-color')), sl('size', 'Radius', 260, 80, 500, 10, A('data-bg-size'))]},
};

const GROUP_ORDER = ['Gradients', 'Patterns', 'Particles', 'Structural', 'Atmospheric'];
const GROUPS = GROUP_ORDER.map((g) => [g, Object.keys(EFFECTS).filter((k) => EFFECTS[k].group === g)]);

const ALL_VARS = ['--bg-c1', '--bg-c2', '--bg-c3', '--bg-c4', '--bg-color', '--bg-speed', '--bg-angle', '--bg-dot', '--bg-gap', '--bg-opacity'];
const ALL_ATTRS = ['data-bg-color', 'data-bg-color2', 'data-bg-color3', 'data-bg-density', 'data-bg-speed', 'data-bg-link', 'data-bg-amp', 'data-bg-opacity', 'data-bg-gap', 'data-bg-size', 'data-bg-variant'];

function applyOptions(host, effect, vals) {
  ALL_VARS.forEach((v) => host.style.removeProperty(v));
  ALL_ATTRS.forEach((a) => host.removeAttribute(a));
  EFFECTS[effect].controls.forEach((c) => {
    const raw = vals[c.id];
    const out = c.tgt.u ? `${raw}${c.tgt.u}` : String(raw);
    if (c.tgt.m === 'var') host.style.setProperty(c.tgt.n, out);
    else host.setAttribute(c.tgt.n, out);
  });
}

const defaultsFor = (effect) => Object.fromEntries(EFFECTS[effect].controls.map((c) => [c.id, c.def]));

function buildPhp(effect, vals) {
  const lines = EFFECTS[effect].controls.map((c) => {
    const v = vals[c.id];
    let out;
    if (c.t === 'color') out = `[ 'predefined' => '', 'custom' => '${v}' ]`;
    else if (c.t === 'select') out = `'${v}'`;
    else out = String(v);
    return `            '${c.id}' => ${out},`;
  }).join('\n');
  return `'bg_effect' => [
    'effect' => '${effect}',
    '${effect}' => [
${lines}
    ],
],`;
}

export default function BackgroundsPlayground() {
  const [effect, setEffect] = useState('aurora');
  const [vals, setVals] = useState(() => defaultsFor('aurora'));
  const hostRef = useRef(null);
  const set = (id, v) => setVals((s) => ({...s, [id]: v}));
  const pick = (k) => { setEffect(k); setVals(defaultsFor(k)); };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    applyOptions(host, effect, vals);
    const teardown = mountBg(host, effect);
    return teardown;
  }, [effect, vals]);

  const php = useMemo(() => buildPhp(effect, vals), [effect, vals]);
  const cfg = EFFECTS[effect];

  return (
    <div className={styles.playground}>
      <style>{BG_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={`${styles.stage} bgstage`}>
            <div ref={hostRef} className={styles.host}>
              <div className={styles.content}>
                <h3>Your content sits on top</h3>
                <p>The effect renders behind — pick one on the right and tweak it.</p>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <h5>{cfg.label} — options</h5>
            {cfg.controls.map((c) => (
              <div className={styles.control} key={c.id}>
                {c.t === 'color' && (<>
                  <label>{c.label} <span>{vals[c.id]}</span></label>
                  <input type="color" className={styles.color} value={vals[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>)}
                {c.t === 'slider' && (<>
                  <label>{c.label} <span>{vals[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={vals[c.id]} onChange={(e) => set(c.id, Number(e.target.value))} />
                </>)}
                {c.t === 'select' && (<>
                  <label>{c.label}</label>
                  <select className={styles.select} value={vals[c.id]} onChange={(e) => set(c.id, e.target.value)}>
                    {c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </>)}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Effect</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map((k) => (
                    <button key={k} type="button" className={k === effect ? styles.tabActive : styles.tab} onClick={() => pick(k)}>{EFFECTS[k].label}</button>
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
          Animated Backgrounds attach to a <strong>container</strong> (Section, Bleed Section, Masonry
          Section or Row) — the <strong>Background Effect</strong> option on its <strong>Style</strong> tab.
          <code>bg_effect</code> is a multi-picker (the effect + its own sub-options); color fields use the
          theme color-preset picker (stored as <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code>).
          Only the one chosen effect's tiny JS/CSS ships, and it honours reduced motion.
        </p>
      </div>
    </div>
  );
}
