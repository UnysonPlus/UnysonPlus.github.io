import React, {useMemo, useState} from 'react';
import styles from './styles.module.css';

/**
 * Interactive playground for the Hover Interaction module.
 *
 * The EFFECTS registry describes each hover effect exactly as the plugin ships
 * it — the real `.sc-hover--*` CSS (scoped here to the demo card), the controls
 * from hover-settings.php, how the tweaked state maps onto the element (CSS vars
 * / data-attrs, mirroring hover-render.php), and the saved option object.
 *
 * Usage in MDX:
 *   <HoverPlayground />                       // full module switcher
 *   <HoverPlayground only="lift" />           // a single effect, no switcher
 */

// Scope a source effect stylesheet to the playground's demo card.
const scope = (css) => css.replace(/\.sc-hover--/g, '.upw-pg-card.sc-hover--');

const EFFECTS = {
  lift: {
    label: 'Lift',
    css: scope(`
.sc-hover--lift { transition: transform .25s ease, box-shadow .25s ease; }
.sc-hover--lift:hover { transform: translateY(calc(var(--hover-lift, 6px) * -1)); }
.sc-hover--lift:not([data-hover-noshadow]):hover { box-shadow: 0 12px 28px rgba(0,0,0,.18); }
@media (prefers-reduced-motion: reduce){ .sc-hover--lift{transition:none} .sc-hover--lift:hover{transform:none} }`),
    controls: [
      {id: 'distance', label: 'Lift distance (px)', type: 'slider', min: 2, max: 20, step: 1, default: 6},
      {id: 'shadow', label: 'Shadow', type: 'switch', on: 'yes', off: 'no', default: 'yes'},
    ],
    demo: (s) => ({
      cls: 'sc-hover--lift',
      style: {'--hover-lift': `${s.distance}px`},
      attrs: s.shadow === 'yes' ? {} : {'data-hover-noshadow': '1'},
    }),
    sample: (s) => ({effect: 'lift', distance: Number(s.distance), shadow: s.shadow}),
  },

  scale: {
    label: 'Scale / Zoom',
    css: scope(`
.sc-hover--scale { transition: transform .3s cubic-bezier(.22,.61,.36,1); }
.sc-hover--scale:hover { transform: scale(var(--hover-scale-to, 1.04)); }
@media (prefers-reduced-motion: reduce){ .sc-hover--scale:hover{transform:none} }`),
    controls: [
      {id: 'scale_to', label: 'Scale to', type: 'slider', min: 1, max: 1.2, step: 0.01, default: 1.04},
    ],
    demo: (s) => ({cls: 'sc-hover--scale', style: {'--hover-scale-to': s.scale_to}, attrs: {}}),
    sample: (s) => ({effect: 'scale', scale_to: Number(s.scale_to)}),
  },

  push: {
    label: 'Push (press-in)',
    css: scope(`
.sc-hover--push { transition: transform .18s ease; }
.sc-hover--push:hover { transform: translateY(var(--hover-push, 5px)); }
.sc-hover--push:active { transform: translateY(calc(var(--hover-push, 5px) * 1.4)); }
@media (prefers-reduced-motion: reduce){ .sc-hover--push:hover{transform:none} }`),
    controls: [
      {id: 'depth', label: 'Press depth (px)', type: 'slider', min: 1, max: 12, step: 1, default: 5},
    ],
    demo: (s) => ({cls: 'sc-hover--push', style: {'--hover-push': `${s.depth}px`}, attrs: {}}),
    sample: (s) => ({effect: 'push', depth: Number(s.depth)}),
  },

  pulse: {
    label: 'Pulse',
    css: scope(`
.sc-hover--pulse:hover { animation: sc-hover-pulse 1s ease-in-out infinite; }
@keyframes sc-hover-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(calc(1 + .06 * var(--hover-pulse,1)))} }
@media (prefers-reduced-motion: reduce){ .sc-hover--pulse:hover{animation:none} }`),
    controls: [
      {id: 'strength', label: 'Pulse size', type: 'slider', min: 0.3, max: 2, step: 0.1, default: 1},
    ],
    demo: (s) => ({cls: 'sc-hover--pulse', style: {'--hover-pulse': s.strength}, attrs: {}}),
    sample: (s) => ({effect: 'pulse', strength: Number(s.strength)}),
  },

  bounce: {
    label: 'Bounce',
    css: scope(`
.sc-hover--bounce:hover { animation: sc-hover-bounce .6s cubic-bezier(.28,.84,.42,1); }
@keyframes sc-hover-bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(calc(var(--hover-bounce,10px)*-1))} 60%{transform:translateY(calc(var(--hover-bounce,10px)*-0.4))} 80%{transform:translateY(calc(var(--hover-bounce,10px)*-0.15))} }
@media (prefers-reduced-motion: reduce){ .sc-hover--bounce:hover{animation:none} }`),
    controls: [
      {id: 'height', label: 'Bounce height (px)', type: 'slider', min: 4, max: 30, step: 1, default: 10},
    ],
    demo: (s) => ({cls: 'sc-hover--bounce', style: {'--hover-bounce': `${s.height}px`}, attrs: {}}),
    sample: (s) => ({effect: 'bounce', height: Number(s.height)}),
  },

  color_shift: {
    label: 'Color Shift',
    css: scope(`
.sc-hover--color_shift { transition: background-color .3s ease, color .3s ease; }
.sc-hover--color_shift:hover { background-color: var(--hover-shift, #6aa6ff); }`),
    controls: [
      {id: 'shift_color', label: 'Hover background', type: 'color', default: '#6aa6ff'},
    ],
    demo: (s) => ({cls: 'sc-hover--color_shift', style: {'--hover-shift': s.shift_color}, attrs: {}}),
    sample: (s) => ({effect: 'color_shift', shift_color: s.shift_color}),
  },

  glow_border: {
    label: 'Glow Border',
    css: scope(`
.sc-hover--glow_border { transition: box-shadow .3s ease; border-radius: inherit; }
.sc-hover--glow_border:hover { box-shadow: 0 0 0 1px var(--hover-glow, #6aa6ff), 0 0 18px 2px var(--hover-glow, #6aa6ff); }`),
    controls: [
      {id: 'glow_color', label: 'Glow color', type: 'color', default: '#6aa6ff'},
    ],
    demo: (s) => ({cls: 'sc-hover--glow_border', style: {'--hover-glow': s.glow_color}, attrs: {}}),
    sample: (s) => ({effect: 'glow_border', glow_color: s.glow_color}),
  },

  gradient_border: {
    label: 'Gradient Border',
    css: scope(`
.sc-hover--gradient_border { position: relative; border-radius: inherit; isolation: isolate; }
.sc-hover--gradient_border::after { content:""; position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: conic-gradient(from 0deg, var(--hover-grad-a,#6aa6ff), var(--hover-grad-b,#a06bff), var(--hover-grad-a,#6aa6ff));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
  opacity:0; transition: opacity .3s ease; pointer-events:none; }
.sc-hover--gradient_border:hover::after { opacity:1; animation: sc-hover-grad var(--hover-grad-speed,3s) linear infinite; }
@keyframes sc-hover-grad { to { transform: rotate(1turn); } }
@media (prefers-reduced-motion: reduce){ .sc-hover--gradient_border:hover::after{animation:none;opacity:1} }`),
    controls: [
      {id: 'color_a', label: 'Gradient color A', type: 'color', default: '#6aa6ff'},
      {id: 'color_b', label: 'Gradient color B', type: 'color', default: '#a06bff'},
      {id: 'speed', label: 'Flow speed (s)', type: 'slider', min: 1, max: 8, step: 0.5, default: 3},
    ],
    demo: (s) => ({
      cls: 'sc-hover--gradient_border',
      style: {'--hover-grad-a': s.color_a, '--hover-grad-b': s.color_b, '--hover-grad-speed': `${s.speed}s`},
      attrs: {},
    }),
    sample: (s) => ({effect: 'gradient_border', color_a: s.color_a, color_b: s.color_b, speed: Number(s.speed)}),
  },

  corner_brackets: {
    label: 'Corner Brackets',
    css: scope(`
.sc-hover--corner_brackets { position: relative; }
.sc-hover--corner_brackets::before, .sc-hover--corner_brackets::after { content:""; position:absolute;
  width: var(--hover-bracket-size,18px); height: var(--hover-bracket-size,18px);
  border: 2px solid var(--hover-bracket,#6aa6ff); pointer-events:none; opacity:0; transition: opacity .3s ease, transform .3s ease; }
.sc-hover--corner_brackets::before { top:4px; left:4px; border-right:0; border-bottom:0; transform: translate(-4px,-4px); }
.sc-hover--corner_brackets::after { bottom:4px; right:4px; border-left:0; border-top:0; transform: translate(4px,4px); }
.sc-hover--corner_brackets:hover::before, .sc-hover--corner_brackets:hover::after { opacity:1; transform: translate(0,0); }`),
    controls: [
      {id: 'bracket_color', label: 'Bracket color', type: 'color', default: '#6aa6ff'},
      {id: 'bracket_size', label: 'Bracket size (px)', type: 'slider', min: 8, max: 40, step: 2, default: 18},
    ],
    demo: (s) => ({
      cls: 'sc-hover--corner_brackets',
      style: {'--hover-bracket': s.bracket_color, '--hover-bracket-size': `${s.bracket_size}px`},
      attrs: {},
    }),
    sample: (s) => ({effect: 'corner_brackets', bracket_color: s.bracket_color, bracket_size: Number(s.bracket_size)}),
  },

  fill_sweep: {
    label: 'Fill Sweep',
    css: scope(`
.sc-hover--fill_sweep { position: relative; z-index: 0; overflow: hidden; }
.sc-hover--fill_sweep::before { content:""; position:absolute; inset:0; z-index:-1; background: var(--hover-fill,#2f74e6);
  transform: scaleX(0); transform-origin: left center; transition: transform .35s cubic-bezier(.22,.61,.36,1); pointer-events:none; }
.sc-hover--fill_sweep[data-hover-fill="right"]::before { transform-origin: right center; }
.sc-hover--fill_sweep[data-hover-fill="up"]::before { transform: scaleY(0); transform-origin: bottom center; }
.sc-hover--fill_sweep[data-hover-fill="center"]::before { transform: scale(0); transform-origin: center; }
.sc-hover--fill_sweep:hover::before { transform: scale(1); }`),
    controls: [
      {id: 'fill_color', label: 'Fill color', type: 'color', default: '#2f74e6'},
      {id: 'direction', label: 'Fill from', type: 'select', default: 'left',
        choices: [['left', 'Left'], ['right', 'Right'], ['up', 'Bottom'], ['center', 'Center']]},
    ],
    demo: (s) => ({
      cls: 'sc-hover--fill_sweep',
      style: {'--hover-fill': s.fill_color},
      attrs: {'data-hover-fill': s.direction},
    }),
    sample: (s) => ({effect: 'fill_sweep', fill_color: s.fill_color, direction: s.direction}),
  },
};

// Default order in the switcher.
const ORDER = [
  'lift', 'scale', 'push', 'pulse', 'bounce',
  'color_shift', 'glow_border', 'gradient_border', 'corner_brackets', 'fill_sweep',
];

const phpScalar = (v) => (typeof v === 'number' ? String(v) : `'${v}'`);

function buildPhp(sample) {
  const inst = Object.entries(sample).map(([k, v]) => `'${k}' => ${phpScalar(v)}`).join(', ');
  return `'demo_hover' => [
    'type'  => 'hover',
    'value' => [
        [ ${inst} ],
    ],
],`;
}

function defaultsFor(key) {
  return Object.fromEntries(EFFECTS[key].controls.map((c) => [c.id, c.default]));
}

export default function HoverPlayground({only}) {
  const keys = only ? [only] : ORDER;
  const [effect, setEffect] = useState(keys[0]);
  const [state, setState] = useState(() => defaultsFor(keys[0]));

  const cfg = EFFECTS[effect];
  const set = (id, v) => setState((s) => ({...s, [id]: v}));
  const pick = (key) => {
    setEffect(key);
    setState(defaultsFor(key));
  };

  const demo = cfg.demo(state);
  const php = buildPhp(cfg.sample(state));
  const allCss = useMemo(() => keys.map((k) => EFFECTS[k].css).join('\n'), [only]);
  const usesColor = cfg.controls.some((c) => c.type === 'color');

  return (
    <div className={styles.playground}>
      <style>{allCss}</style>

      {!only && (
        <div className={styles.tabs}>
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              className={k === effect ? styles.tabActive : styles.tab}
              onClick={() => pick(k)}>
              {EFFECTS[k].label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.stage}>
          <div
            className={`upw-pg-card ${styles.card} ${demo.cls}`}
            style={demo.style}
            {...demo.attrs}>
            <div className={styles.icon}>✦</div>
            <h4>{cfg.label}</h4>
            <p>Hover me to preview</p>
          </div>
          <div className={styles.hint}>👆 hover the card — tweak the options on the right</div>
        </div>

        <div className={styles.controls}>
          <h5>Options</h5>
          {cfg.controls.map((c) => (
            <div className={styles.control} key={c.id}>
              {c.type === 'slider' && (
                <>
                  <label>{c.label} <span>{state[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step}
                    value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>
              )}
              {c.type === 'switch' && (
                <>
                  <label>{c.label}</label>
                  <div className={styles.toggle}>
                    <button type="button" className={state[c.id] === c.off ? styles.on : ''}
                      onClick={() => set(c.id, c.off)}>Off</button>
                    <button type="button" className={state[c.id] === c.on ? styles.on : ''}
                      onClick={() => set(c.id, c.on)}>On</button>
                  </div>
                </>
              )}
              {c.type === 'select' && (
                <>
                  <label>{c.label}</label>
                  <select className={styles.select} value={state[c.id]}
                    onChange={(e) => set(c.id, e.target.value)}>
                    {c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </>
              )}
              {c.type === 'color' && (
                <>
                  <label>{c.label} <span>{state[c.id]}</span></label>
                  <input type="color" className={styles.color}
                    value={state[c.id]} onChange={(e) => set(c.id, e.target.value)} />
                </>
              )}
            </div>
          ))}
          <button type="button" className={styles.reset} onClick={() => setState(defaultsFor(effect))}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        {usesColor && (
          <p className={styles.note}>
            Color fields use the theme <strong>color-preset picker</strong>, so they actually
            store <code>{`[ 'predefined' => '', 'custom' => '#hex' ]`}</code> — the resolved
            color is shown here for clarity.
          </p>
        )}
      </div>
    </div>
  );
}
