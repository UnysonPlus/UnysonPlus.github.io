/*
 * 3D Gallery — interactive playground.
 *
 * Pick a design on the right: the scene is built exactly as the plugin's PHP emits it (scene.js) and
 * driven by the REAL runtime (gallery-engine.js — vendored verbatim from the plugin, see vendor.mjs).
 * Nothing here is simulated.
 *
 * Each design registers its OWN geometry controls below; the options every design shares (motion,
 * card, frame) are declared once in SHARED and appended — the same way the builder's Design picker
 * reveals per-design options while the Style tab stays common.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {GALLERY_CSS, initEl, bumpGen} from './gallery-engine';
import {buildScene, sphereInfo} from './scene';

// control helpers
const sl = (id, label, def, min, max, step = 1) => ({id, label, t: 'slider', def, min, max, step});
const se = (id, label, def, choices) => ({id, label, t: 'select', def, choices});

const RATIO_CHOICES = [['1-1', 'Square (1:1)'], ['4-3', 'Landscape (4:3)'], ['3-4', 'Portrait (3:4)'], ['16-9', 'Wide (16:9)'], ['9-16', 'Tall (9:16)']];
const HOVER_CHOICES = [['none', 'Keep rotating'], ['pause', 'Pause'], ['slow', 'Slow down']];
const DIR_CHOICES = [['left', 'Left'], ['right', 'Right']];

// Shared across every design (motion + card + frame), mirroring the element's common options.
const SHARED = (opts = {}) => [
  se('drive', 'Motion', opts.drive || 'auto', opts.driveChoices || [['auto', 'Auto-rotate'], ['static', 'Static']]),
  sl('speed', 'Loop Duration (s)', opts.speed || 16, 3, 60, 1),
  se('direction', 'Direction', 'left', opts.dirChoices || DIR_CHOICES),
  se('hover_behavior', 'On Hover', 'slow', HOVER_CHOICES),
  se('card_ratio', 'Card Ratio', opts.ratio || '1-1', RATIO_CHOICES),
  sl('corner_radius', 'Corner Radius (px)', opts.corner ?? 6, 0, 40, 1),
  sl('padding', 'Card Padding (%)', 0, 0, 20, 0.5),
];

const DESIGNS = {
  carousel_ring: {
    group: '3D & Perspective',
    label: 'Carousel Ring',
    blurb: 'A ring of cards revolving around you — tilt it back, roll it diagonal, open it up.',
    controls: [
      sl('tilt', 'Ring Tilt (°)', -28, -60, 60),
      sl('ring_opening', 'Ring Opening (%)', 55, 0, 100),
      sl('roll', 'Diagonal Tilt (°)', 0, -45, 45),
      sl('ring_size', 'Ring Size (%)', 80, 40, 140),
      sl('spacing', 'Card Spacing (%)', 100, 60, 180),
      sl('perspective', 'Perspective', 18, 8, 100),
      sl('back_fade', 'Back Fade (%)', 70, 0, 100),
      sl('card_size', 'Card Size (%)', 21, 6, 60),
      ...SHARED({drive: 'auto', speed: 16, ratio: '1-1', corner: 6}),
    ],
  },
  panorama_wall: {
    group: '3D & Perspective',
    label: 'Panorama Wall',
    blurb: 'A curved wall of cards wrapping around you and scrolling sideways. Curvature goes convex too.',
    controls: [
      sl('curvature', 'Curvature (%)', -100, -150, 150),
      sl('rows', 'Rows', 5, 1, 9),
      sl('columns', 'Columns', 11, 3, 24),
      sl('tilt', 'Tilt (°)', 0, -45, 45),
      sl('gap', 'Gap (%)', 5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      sl('perspective', 'Perspective', 68, 8, 100),
      sl('card_size', 'Card Size (%)', 20, 6, 40),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [...DIR_CHOICES, ['alternate', 'Alternate rows']]}),
    ],
  },
  card_sphere: {
    group: '3D & Perspective',
    label: 'Card Sphere',
    blurb: 'A spinning disco-ball of images. Globe Size zooms; Card Size sets how finely it tiles.',
    controls: [
      sl('globe_size', 'Globe Size (%)', 70, 40, 95),
      sl('card_size', 'Card Size (%)', 20, 8, 30),
      sl('gap', 'Gap (%)', 2.5, 0, 8, 0.5),
      sl('back_fade', 'Back Fade (%)', 55, 0, 90),
      sl('tilt', 'Tilt (°)', 0, -45, 45),
      sl('perspective', 'Perspective', 55, 8, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']]}),
    ],
  },
  orbit_globe: {
    group: '3D & Perspective',
    label: 'Orbit Globe',
    blurb: 'Cards float through a sphere VOLUME, each facing you, near ones big and far ones dim — a depth-of-field orbit (vs Card Sphere’s surface bands). Card Size is the density control.',
    controls: [
      sl('globe_size', 'Globe Size (%)', 50, 40, 95),
      sl('card_size', 'Card Size (%)', 28, 8, 30),
      sl('gap', 'Gap (%)', 2.5, 0.5, 8, 0.5),
      sl('back_fade', 'Back Fade (%)', 55, 0, 90),
      sl('tilt', 'Tilt (°)', 27, -45, 45),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 2,
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']]}),
    ],
  },
};

const GROUP_ORDER = ['3D & Perspective'];
const GROUPS = GROUP_ORDER.map((g) => [g, Object.keys(DESIGNS).filter((k) => DESIGNS[k].group === g)]);

const defaultsFor = (d) => Object.fromEntries(DESIGNS[d].controls.map((c) => [c.id, c.def]));

function buildPhp(design, vals) {
  // Motion is a NESTED multi-picker in the plugin (mode + that mode's own settings); everything else
  // stays flat under the design. Mirror that shape here so the sample is copy-paste accurate.
  const motionKeys = ['speed', 'direction', 'hover_behavior'];
  const line = (c, ind) => `${ind}'${c.id}' => ${c.t === 'select' ? `'${vals[c.id]}'` : vals[c.id]},`;
  const mode = vals.drive;
  const msub = DESIGNS[design].controls.filter((c) => motionKeys.includes(c.id))
    .map((c) => line(c, '                    ')).join('\n');
  const motion = mode === 'static'
    ? `            'motion' => [ 'mode' => 'static' ],`
    : `            'motion' => [
                'mode' => '${mode}',
                '${mode}' => [
${msub}
                ],
            ],`;
  const geo = DESIGNS[design].controls.filter((c) => c.id !== 'drive' && !motionKeys.includes(c.id))
    .map((c) => line(c, '            ')).join('\n');
  return `'design_settings' => [
    'design' => '${design}',
    '${design}' => [
${motion}
${geo}
    ],
],`;
}

export default function Gallery3DPlayground() {
  const [design, setDesign] = useState('carousel_ring');
  const [vals, setVals] = useState(() => defaultsFor('carousel_ring'));
  const hostRef = useRef(null);
  const set = (id, v) => setVals((s) => ({...s, [id]: v}));
  const pick = (k) => { setDesign(k); setVals(defaultsFor(k)); };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    bumpGen();                       // let the previous design's rAF loops die
    host.innerHTML = buildScene(design, vals);
    const el = host.firstElementChild;
    if (el) initEl(el);
    return () => { bumpGen(); };
  }, [design, vals]);

  const php = useMemo(() => buildPhp(design, vals), [design, vals]);
  const cfg = DESIGNS[design];
  const tiling = design === 'card_sphere' ? sphereInfo(vals) : null;

  return (
    <div className={styles.playground}>
      <style>{GALLERY_CSS}</style>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}><div ref={hostRef} className={styles.host} /></div>

          <div className={styles.controls}>
            <h5>
              {cfg.label} — options
              {tiling && <em className={styles.derived}>derived: {tiling.rows} bands · {Math.max(...tiling.bands)} around the equator</em>}
            </h5>
            {cfg.controls.map((c) => (
              <div className={styles.control} key={c.id}>
                {c.t === 'slider' && (<>
                  <label>{c.label} <span>{vals[c.id]}</span></label>
                  <input type="range" min={c.min} max={c.max} step={c.step} value={vals[c.id]}
                    onChange={(e) => set(c.id, Number(e.target.value))} />
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
            <div className={styles.sidebarTitle}>Design</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map((k) => (
                    <button key={k} type="button" className={k === design ? styles.tabActive : styles.tab}
                      onClick={() => pick(k)}>{DESIGNS[k].label}</button>
                  ))}
                </div>
              </div>
            ))}
            <p className={styles.blurb}>{cfg.blurb}</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          The 3D Gallery is a <strong>page-builder element</strong> (builder palette → <strong>Media
          Elements</strong>). <code>design_settings</code> is a multi-picker — the chosen design plus its
          own geometry options — while the shared card controls (Box Style, shadow, captions, lightbox,
          Use as Section Background) live on the <strong>Style</strong> tab. Only this element's small
          CSS/JS ships, and it honours <strong>reduce motion</strong> (a static scene, no spin).
        </p>
      </div>
    </div>
  );
}
