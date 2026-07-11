import React, {useMemo, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for a single Hover Interaction effect.
 *
 * Each effect is described in the EFFECTS registry below — its real CSS class,
 * the exact controls from the plugin's hover-settings.php, how the tweaked
 * state maps onto the demo element (class / CSS vars / data-attrs, mirroring
 * hover-render.php), and the sample option object a developer would save.
 *
 * Usage in MDX:  <HoverPlayground effect="lift" />
 */
const EFFECTS = {
  lift: {
    label: 'Lift',
    // Verbatim from modules/hover/static/css/effects/lift.css (scoped to .upw-pg-card).
    css: `
.upw-pg-card.sc-hover--lift { transition: transform .25s ease, box-shadow .25s ease; }
.upw-pg-card.sc-hover--lift:hover { transform: translateY(calc(var(--hover-lift, 6px) * -1)); }
.upw-pg-card.sc-hover--lift:not([data-hover-noshadow]):hover { box-shadow: 0 12px 28px rgba(0, 0, 0, .18); }
@media (prefers-reduced-motion: reduce) {
  .upw-pg-card.sc-hover--lift { transition: none; }
  .upw-pg-card.sc-hover--lift:hover { transform: none; }
}`,
    controls: [
      {id: 'distance', label: 'Lift distance (px)', type: 'slider', min: 2, max: 20, step: 1, default: 6},
      {id: 'shadow', label: 'Shadow', type: 'switch', on: 'yes', off: 'no', default: 'yes'},
    ],
    // state -> how the demo element renders (mirrors hover-render.php 'lift' case)
    demo: (s) => ({
      className: 'sc-hover--lift',
      style: {'--hover-lift': `${s.distance}px`},
      attrs: s.shadow === 'yes' ? {} : {'data-hover-noshadow': '1'},
    }),
    // state -> the saved option instance
    sample: (s) => ({effect: 'lift', distance: Number(s.distance), shadow: s.shadow}),
  },
};

function phpScalar(v) {
  return typeof v === 'number' ? String(v) : `'${v}'`;
}

function buildPhp(sample) {
  const inst = Object.entries(sample)
    .map(([k, v]) => `'${k}' => ${phpScalar(v)}`)
    .join(', ');
  return `'demo_hover' => [
    'type'  => 'hover',
    'value' => [
        [ ${inst} ],
    ],
],`;
}

export default function HoverPlayground({effect = 'lift'}) {
  const cfg = EFFECTS[effect];
  const initial = useMemo(
    () => Object.fromEntries(cfg.controls.map((c) => [c.id, c.default])),
    [cfg],
  );
  const [state, setState] = useState(initial);
  const set = (id, v) => setState((s) => ({...s, [id]: v}));

  const demo = cfg.demo(state);
  const php = buildPhp(cfg.sample(state));

  return (
    <div className={styles.playground}>
      <style>{cfg.css}</style>
      <div className={styles.grid}>
        <div className={styles.stage}>
          <div
            className={`upw-pg-card ${styles.card} ${demo.className}`}
            style={demo.style}
            {...demo.attrs}>
            <div className={styles.icon}>✦</div>
            <h4>{cfg.label}</h4>
            <p>Hover me to preview the effect</p>
          </div>
          <div className={styles.hint}>👆 hover the card — tweak the options on the right</div>
        </div>

        <div className={styles.controls}>
          <h5>Options</h5>
          {cfg.controls.map((c) => (
            <div className={styles.control} key={c.id}>
              {c.type === 'slider' && (
                <>
                  <label>
                    {c.label} <span>{state[c.id]}</span>
                  </label>
                  <input
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={state[c.id]}
                    onChange={(e) => set(c.id, e.target.value)}
                  />
                </>
              )}
              {c.type === 'switch' && (
                <>
                  <label>{c.label}</label>
                  <div className={styles.toggle}>
                    <button
                      type="button"
                      className={state[c.id] === c.off ? styles.on : ''}
                      onClick={() => set(c.id, c.off)}>
                      Off
                    </button>
                    <button
                      type="button"
                      className={state[c.id] === c.on ? styles.on : ''}
                      onClick={() => set(c.id, c.on)}>
                      On
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          <button type="button" className={styles.reset} onClick={() => setState(initial)}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre>
          <code>{php}</code>
        </pre>
      </div>
    </div>
  );
}
