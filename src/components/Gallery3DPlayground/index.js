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

const RATIO_CHOICES = [['1-1', 'Square (1:1)'], ['4-3', 'Landscape (4:3)'], ['3-4', 'Portrait (3:4)'], ['4-5', 'Portrait (4:5)'], ['16-9', 'Wide (16:9)'], ['9-16', 'Tall (9:16)']];
const HOVER_CHOICES = [['none', 'Keep rotating'], ['pause', 'Pause'], ['slow', 'Slow down']];
const DIR_CHOICES = [['left', 'Left'], ['right', 'Right']];

// Shared across every design (motion + card + frame), mirroring the element's common options.
const SHARED = (opts = {}) => [
  se('drive', 'Motion', opts.drive || 'auto', opts.driveChoices || [['auto', 'Auto-rotate'], ['static', 'Static']]),
  sl('speed', 'Loop Duration (s)', opts.speed || 16, 3, 60, 1),
  se('direction', 'Direction', opts.dir || 'left', opts.dirChoices || DIR_CHOICES),
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
  totem_wall: {
    group: '3D & Perspective',
    label: 'Totem Wall',
    blurb: 'A flat row of INDEPENDENT vertical totems — each column wraps its cards around its own axis into a rounded pillar and cascades vertically. Curvature curls concave↔convex; Zoom sets totem size (fewer, larger totems as it rises).',
    controls: [
      sl('zoom', 'Zoom (%)', 10, 0, 100),
      sl('curvature', 'Curvature (%)', -150, -150, 150),
      sl('tilt', 'Tilt (°)', -45, -45, 45),
      sl('gap', 'Gap (%)', 0.5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down'], ['alternate', 'Alternate columns']]}),
    ],
  },
  parallax_totem: {
    group: '3D & Perspective',
    label: 'Parallax Totem',
    blurb: 'The depth-scatter sibling of Totem Wall — cards float at seeded depths & sizes and drift at depth-varied speeds (near ones faster: the parallax). All-variance-0 is a clean grid; raise Scatter / Size Variance / Parallax Depth for a floating depth field.',
    controls: [
      sl('zoom', 'Zoom (%)', 10, 0, 100),
      sl('scatter', 'Scatter (%)', 0, 0, 100),
      sl('size_variance', 'Size Variance (%)', 0, 0, 100),
      sl('parallax_depth', 'Parallax Depth (%)', 0, 0, 100),
      sl('curvature', 'Curvature (%)', -150, -150, 150),
      sl('gap', 'Gap (%)', 0.5, 0, 20, 0.5),
      sl('edge_fade', 'Edge Fade (%)', 0, 0, 100),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '16-9', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down']]}),
    ],
  },
  card_tunnel: {
    group: '3D & Perspective',
    label: 'Card Tunnel',
    blurb: 'An infinite perspective corridor — four walls of cards recede to a vanishing point and fly forward or backward. Tunnel Size widens the corridor; Card Length streaks the panels; Depth Fade dissolves the far end.',
    // Own control set (no card_ratio / card_size / padding — cards are sized to their wall).
    controls: [
      sl('tunnel_size', 'Tunnel Size (%)', 60, 20, 120),
      sl('card_length', 'Card Length (%)', 30, 5, 120),
      sl('gap', 'Gap (%)', 2, 0, 20, 0.5),
      sl('depth_fade', 'Depth Fade (%)', 0, 0, 100),
      sl('corner_radius', 'Corner Radius (px)', 0, 0, 60),
      se('drive', 'Motion', 'continuous', [['continuous', 'Continuous'], ['static', 'Static']]),
      sl('speed', 'Loop Duration (s)', 20, 3, 60),
      se('direction', 'Direction', 'forward', [['forward', 'Forward'], ['backward', 'Backward']]),
      se('hover_behavior', 'On Hover', 'slow', HOVER_CHOICES),
    ],
  },
  spiral_stream: {
    group: '3D & Perspective',
    label: 'Spiral Stream',
    blurb: 'Cards threaded along a 3D helix that streams past the camera — each rotates around its own vertical axis (fronts, edge-on slivers, mirrored backs). Taper narrows the coil into a vortex or flares it out; Card Count fills it.',
    controls: [
      sl('card_count', 'Card Count', 8, 3, 48, 1),
      sl('spiral_turns', 'Spiral Turns', 1, 0.25, 6, 0.25),
      sl('spiral_size', 'Spiral Size (%)', 35, 0, 100),
      sl('taper', 'Taper (%)', -90, -100, 100),
      sl('card_gap', 'Card Gap (%)', 0, 0, 100),
      sl('ring_tilt', 'Ring Tilt (°)', -45, -45, 45),
      sl('perspective', 'Perspective (%)', 0, 0, 100),
      sl('back_fade', 'Back Fade (%)', 10, 0, 100),
      sl('scale_pulse', 'Scale Pulse (%)', 0, 0, 100),
      sl('card_size', 'Card Size (%)', 12, 4, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '3-4', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  depth_stack: {
    group: '3D & Perspective',
    label: 'Depth Stack',
    blurb: 'A deck of cards receding into depth (front card the hero) that streams toward the camera — the front flies out and fades as the next comes forward. Spread/Scatter fans the deck out; Depth Fade + Depth Blur give a depth-of-field falloff. Best on Scroll-scrub.',
    controls: [
      sl('card_count', 'Card Count', 4, 3, 50, 1),
      sl('depth_gap', 'Depth Gap (%)', 18, 0, 80),
      sl('spread', 'Spread (%)', 0, 0, 120),
      sl('spread_angle', 'Spread Angle (°)', -180, -180, 180),
      sl('wobble', 'Wobble (%)', 0, 0, 100),
      sl('depth_fade', 'Depth Fade (%)', 0, 0, 100),
      sl('depth_blur', 'Depth Blur (%)', 0, 0, 100, 0.5),
      se('layout', 'Layout', 'fan', [['fan', 'Fan (angle)'], ['scatter', 'Scatter (random)']]),
      sl('card_size', 'Card Size (%)', 20, 4, 80),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '4-5', corner: 0, dir: 'forward',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['forward', 'Forward'], ['backward', 'Backward']]}),
    ],
  },
  card_reel: {
    group: 'Carousel & Flow',
    label: 'Card Reel',
    blurb: 'A vertical cover-flow carousel — a single column of cards wraps around a horizontal cylinder, the centre card flat and forward (the focus) while the neighbours tilt back. Flows up/down, or Stop at Centre snaps each card to the middle. 3D Curve bends the cylinder.',
    controls: [
      sl('curve_3d', '3D Curve (%)', -100, -100, 100),
      sl('card_size', 'Card Size (%)', 22, 6, 60),
      sl('gap', 'Gap (%)', 1, 0, 20, 0.5),
      se('snap', 'Stop at Centre', 'no', [['no', 'No'], ['yes', 'Yes']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'up',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['up', 'Up'], ['down', 'Down']]}),
    ],
  },
  film_strip: {
    group: 'Carousel & Flow',
    label: 'Film Strip',
    blurb: 'The horizontal sibling of Card Reel — a horizontal cover-flow carousel. A row of cards wraps around a vertical cylinder, the centre card flat and forward (the focus) while the sides tilt back. Flows left/right, or Stop at Centre snaps each card to the middle. 3D Curve bends the cylinder.',
    controls: [
      sl('curve_3d', '3D Curve (%)', -100, -100, 100),
      sl('card_size', 'Card Size (%)', 22, 6, 60),
      sl('gap', 'Gap (%)', 1, 0, 20, 0.5),
      se('snap', 'Stop at Centre', 'no', [['no', 'No'], ['yes', 'Yes']]),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'left',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['left', 'Left'], ['right', 'Right']]}),
    ],
  },
  wheel_carousel: {
    group: 'Carousel & Flow',
    label: 'Wheel Carousel',
    blurb: 'Cards fanned on a big Ferris-style wheel whose hub sits below the frame — only the top arc shows. Each card rotates tangent to the wheel (upright at the top = the focus) and the wheel steps around card by card. Overshoot sails past and settles, Anticipation winds back first, Hold pauses on each card.',
    controls: [
      sl('wheel_size', 'Wheel Size (%)', 70, 20, 160),
      sl('card_size', 'Card Size (%)', 40, 6, 90),
      sl('anticipation', 'Anticipation (%)', 0, 0, 40),
      sl('overshoot', 'Overshoot (%)', 0, 0, 30),
      sl('hold', 'Hold (%)', 0, 0, 60),
      ...SHARED({drive: 'continuous', speed: 20, ratio: '1-1', corner: 0, dir: 'cw',
        driveChoices: [['continuous', 'Continuous'], ['static', 'Static']],
        dirChoices: [['cw', 'Clockwise'], ['ccw', 'Counter-clockwise']]}),
    ],
  },
};

const GROUP_ORDER = ['3D & Perspective', 'Carousel & Flow'];
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
