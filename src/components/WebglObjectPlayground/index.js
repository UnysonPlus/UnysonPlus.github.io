/*
 * WebGL Object — interactive playground (Three.js).
 *
 * Ports the real shortcode runtime (see webgl-engine.js): the procedural presets that need no external
 * asset — the full-screen shader presets (Gradient Mesh / Plasma / Aurora / Fluid / Dots) and the 3D
 * presets (Glass Blob / Liquid Metal / Distorted Sphere / Particle Field). three.js is dynamically
 * imported so it only loads on this page. Options map 1:1 to the shortcode atts; the pointer is
 * reactive and the vertical scroll slider feeds the scroll-link uniform / rotation.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {mountWebGL} from './webgl-engine';

const GROUPS = [
  ['3D Objects', [['glass', 'Glass Blob'], ['metal', 'Liquid Metal'], ['sphere', 'Distorted Sphere'], ['particles', 'Particle Field']]],
  ['Shaders (full-screen)', [['gradient_mesh', 'Gradient Mesh'], ['plasma', 'Plasma'], ['aurora', 'Aurora'], ['fluid', 'Fluid'], ['dots', 'Dot Matrix']]],
];
const LABEL = Object.fromEntries(GROUPS.flatMap(([, ks]) => ks));
const SHADERS = {gradient_mesh: 1, plasma: 1, aurora: 1, fluid: 1, dots: 1};
const is3D = (p) => !SHADERS[p];

// per-preset controls (id, label, min, max, step, default) or a select
const sl = (id, label, min, max, step, def) => ({id, label, type: 'slider', min, max, step, def});
const se = (id, label, def, choices) => ({id, label, type: 'select', def, choices});
const PRESET_CTRL = {
  glass: [sl('ior', 'Refraction (IOR)', 1, 2.5, 0.05, 1.45), sl('iridescence', 'Iridescence', 0, 1, 0.05, 0.3)],
  metal: [sl('metalness', 'Metalness', 0, 1, 0.05, 1), sl('roughness', 'Roughness', 0, 1, 0.05, 0.15)],
  sphere: [sl('roughness', 'Roughness', 0, 1, 0.05, 0.6)],
  particles: [sl('particle_count', 'Particle count', 500, 12000, 100, 4000), sl('particle_size', 'Particle size', 0.005, 0.08, 0.005, 0.02)],
  gradient_mesh: [sl('blend_speed', 'Blend speed', 0, 1, 0.05, 0.4), sl('grain', 'Grain', 0, 0.5, 0.02, 0.15)],
  plasma: [sl('scale', 'Scale', 1, 8, 0.5, 3), sl('flow_speed', 'Flow speed', 0, 1, 0.05, 0.5), sl('contrast', 'Contrast', 0, 1, 0.05, 0.6)],
  aurora: [sl('band_count', 'Bands', 1, 8, 0.5, 3), sl('drift_speed', 'Drift speed', 0, 1, 0.05, 0.4), sl('softness', 'Softness', 0, 1, 0.05, 0.5)],
  fluid: [sl('viscosity', 'Viscosity', 0, 1, 0.05, 0.5), sl('splat_strength', 'Pointer strength', 0, 1, 0.05, 0.6)],
  dots: [se('dot_style', 'Style', 'dot', [['dot', 'Dot matrix'], ['halftone', 'Halftone']]), sl('grid_density', 'Density', 10, 100, 2, 40), sl('dot_size', 'Dot size', 0, 1, 0.05, 0.5)],
};
const presetDefaults = (p) => Object.fromEntries(PRESET_CTRL[p].map((c) => [c.id, c.def]));

const MOTION = {colorA: '#6aa6ff', colorB: '#b388ff', autoRotate: 1, noiseAmount: 0.2, noiseSpeed: 0.4, pointerFollow: 'yes', pointerStrength: 0.5, parallax: 0.3, scrollLink: 'no'};

const php = (v) => (typeof v === 'number' ? String(v) : `'${v}'`);
function buildPhp(preset, po, m) {
  const sub = PRESET_CTRL[preset].map((c) => `            '${c.id}' => ${php(po[c.id])},`).join('\n');
  const motion3d = is3D(preset)
    ? `    'auto_rotate'     => ${m.autoRotate},
    'noise_amount'    => ${m.noiseAmount},
    'noise_speed'     => ${m.noiseSpeed},
    'pointer_follow'  => '${m.pointerFollow}',
    'pointer_strength'=> ${m.pointerStrength},
    'parallax'        => ${m.parallax},
`
    : '';
  return `'webgl_object' => [
    'object' => [
        'preset' => '${preset}',
        '${preset}' => [
${sub}
        ],
    ],
    'color_a' => [ 'predefined' => '', 'custom' => '${m.colorA}' ],
    'color_b' => [ 'predefined' => '', 'custom' => '${m.colorB}' ],
${motion3d}    'scroll_link'     => '${m.scrollLink}',
],`;
}

export default function WebglObjectPlayground() {
  const [preset, setPreset] = useState('glass');
  const [po, setPo] = useState(() => presetDefaults('glass'));
  const [m, setM] = useState(MOTION);
  const [scroll, setScroll] = useState(0);
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const setP = (id, v) => setPo((s) => ({...s, [id]: v}));
  const setMo = (id, v) => setM((s) => ({...s, [id]: v}));
  const pick = (p) => { setPreset(p); setPo(presetDefaults(p)); };
  const threeD = is3D(preset);

  const cfg = useMemo(() => ({
    preset, colorA: m.colorA, colorB: m.colorB, presetOpts: po,
    autoRotate: m.autoRotate, noiseAmount: m.noiseAmount, noiseSpeed: m.noiseSpeed,
    pointerFollow: m.pointerFollow === 'yes', pointerStrength: m.pointerStrength, parallax: m.parallax,
    scrollLink: m.scrollLink === 'yes', quality: 'auto', scale: 1, background: 'solid', bgColor: '#0b0f1a',
  }), [preset, po, m]);

  useEffect(() => {
    let api = null, cancelled = false;
    (async () => {
      const THREE = await import('three');
      if (cancelled || !hostRef.current) return;
      hostRef.current.innerHTML = '';
      api = mountWebGL(THREE, hostRef.current, cfg);
      api.setScroll(scroll / 100);
      apiRef.current = api;
    })();
    return () => { cancelled = true; if (api) api.dispose(); apiRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cfg)]);

  const onScroll = (v) => { setScroll(v); if (apiRef.current) apiRef.current.setScroll(v / 100); };
  const phpText = useMemo(() => buildPhp(preset, po, m), [preset, po, m]);

  const slider = (c, val, on) => (
    <div className={styles.control} key={c.id}>
      {c.type === 'select' ? (<>
        <label>{c.label}</label>
        <select className={styles.select} value={val} onChange={(e) => on(c.id, e.target.value)}>
          {c.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </>) : (<>
        <label>{c.label} <span>{val}</span></label>
        <input type="range" min={c.min} max={c.max} step={c.step} value={val} onChange={(e) => on(c.id, Number(e.target.value))} />
      </>)}
    </div>
  );

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.stage}>
            <div ref={hostRef} className={styles.host} />
            <div className={styles.hint}>move your pointer over the canvas{threeD ? ' to tilt / parallax' : ''}{m.scrollLink === 'yes' ? ' · drag the scroll on the right' : ''}</div>
            {m.scrollLink === 'yes' && (
              <input type="range" className={styles.vscroll} min="0" max="100" step="1"
                value={scroll} onChange={(e) => onScroll(Number(e.target.value))} aria-label="Scroll position" />
            )}
          </div>

          <div className={styles.controls}>
            <h5>{LABEL[preset]} — options</h5>
            <div className={styles.control}>
              <label>Primary color <span>{m.colorA}</span></label>
              <input type="color" className={styles.color} value={m.colorA} onChange={(e) => setMo('colorA', e.target.value)} />
            </div>
            <div className={styles.control}>
              <label>Secondary color <span>{m.colorB}</span></label>
              <input type="color" className={styles.color} value={m.colorB} onChange={(e) => setMo('colorB', e.target.value)} />
            </div>
            {PRESET_CTRL[preset].map((c) => slider(c, po[c.id], setP))}

            <div className={styles.subhead}>Motion</div>
            {threeD && slider(sl('autoRotate', 'Auto-rotate', 0, 3, 0.1), m.autoRotate, setMo)}
            {threeD && slider(sl('noiseAmount', 'Noise amount', 0, 1, 0.05), m.noiseAmount, setMo)}
            {threeD && slider(sl('noiseSpeed', 'Noise speed', 0, 1, 0.05), m.noiseSpeed, setMo)}
            {threeD && (
              <div className={styles.control}>
                <label>Pointer follow</label>
                <div className={styles.toggle}>
                  <button type="button" className={m.pointerFollow === 'no' ? styles.on : ''} onClick={() => setMo('pointerFollow', 'no')}>Off</button>
                  <button type="button" className={m.pointerFollow === 'yes' ? styles.on : ''} onClick={() => setMo('pointerFollow', 'yes')}>On</button>
                </div>
              </div>
            )}
            {threeD && m.pointerFollow === 'yes' && slider(sl('pointerStrength', 'Pointer strength', 0, 1, 0.05), m.pointerStrength, setMo)}
            {threeD && slider(sl('parallax', 'Parallax', 0, 1, 0.05), m.parallax, setMo)}
            <div className={styles.control}>
              <label>Scroll link</label>
              <div className={styles.toggle}>
                <button type="button" className={m.scrollLink === 'no' ? styles.on : ''} onClick={() => setMo('scrollLink', 'no')}>Off</button>
                <button type="button" className={m.scrollLink === 'yes' ? styles.on : ''} onClick={() => setMo('scrollLink', 'yes')}>On</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>Style</div>
            {GROUPS.map(([label, keys]) => (
              <div className={styles.tabGroup} key={label}>
                <span className={styles.tabGroupLabel}>{label}</span>
                <div className={styles.tabPills}>
                  {keys.map(([k, l]) => (
                    <button key={k} type="button" className={k === preset ? styles.tabActive : styles.tab} onClick={() => pick(k)}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
            <p className={styles.tip}>Image Particles &amp; Image Distortion need an uploaded image, so they run on a live page — see the doc.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample option — updates as you tweak</div>
        <pre><code>{phpText}</code></pre>
        <p className={styles.note}>
          WebGL Object is a <strong>page-builder element</strong> (Media Elements). It renders each
          preset with <strong>Three.js</strong> — 3D physical materials (glass / metal / sphere / points)
          or full-screen GLSL shaders — with a mouse-reactive, off-screen-paused, reduced-motion-aware
          render loop. Colours use the theme color-preset picker; three.js loads only on pages that use it.
        </p>
      </div>
    </div>
  );
}
