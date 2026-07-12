/*
 * Parallax Depth Layers — interactive playground.
 *
 * Ports the real runtime (modules/parallax/static/js/parallax.js): a Scene tracks the pointer (and/or
 * scroll), and each Layer drifts by its own depth — one shared rAF loop, scene-level pointer
 * smoothing, per-layer axis / direction / scale / depth-blur. The demo is a pre-composed depth scene
 * (sky → mountains → hills → foreground card → accents); pick a layer to tweak its options. The Scene
 * and Layer settings are read off the same data-pl-* attributes the plugin stamps.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

const LAYERS = [
  {id: 'sky', label: 'Sky', def: {depth: 6, axis: 'both', direction: 'against', scale_far: 'yes', blur_far: 'no'}},
  {id: 'sun', label: 'Sun', def: {depth: 16, axis: 'both', direction: 'against', scale_far: 'no', blur_far: 'no'}},
  {id: 'far', label: 'Far mountains', def: {depth: 30, axis: 'both', direction: 'against', scale_far: 'yes', blur_far: 'yes'}},
  {id: 'hills', label: 'Hills', def: {depth: 50, axis: 'both', direction: 'with', scale_far: 'no', blur_far: 'no'}},
  {id: 'card', label: 'Foreground card', def: {depth: 72, axis: 'both', direction: 'with', scale_far: 'no', blur_far: 'no'}},
  {id: 'accents', label: 'Accents', def: {depth: 92, axis: 'both', direction: 'with', scale_far: 'no', blur_far: 'no'}},
];
const LAYER_IDS = LAYERS.map((l) => l.id);
const layerDefaults = () => Object.fromEntries(LAYERS.map((l) => [l.id, {...l.def}]));

const SCENE_DEFAULTS = {source: 'mouse', intensity: 40, smoothing: 50};

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const easeFrom = (s) => clamp(0.06 + (1 - clamp(s, 0, 100) / 100) * 0.22, 0.05, 0.3);

const phpSwitch = (v) => `'${v}'`;
function buildPhp(scene, sel, lo) {
  return `// On the SCENE container (Animations → Parallax Layers → Scene):
'parallax' => [
    'role' => 'scene',
    'scene' => [
        'source'    => '${scene.source}',
        'intensity' => ${scene.intensity},
        'smoothing' => ${scene.smoothing},
    ],
],

// On the "${LAYERS.find((l) => l.id === sel).label}" child (role → Layer):
'parallax' => [
    'role' => 'layer',
    'layer' => [
        'depth'     => ${lo.depth},
        'axis'      => '${lo.axis}',
        'direction' => '${lo.direction}',
        'scale_far' => ${phpSwitch(lo.scale_far)},
        'blur_far'  => ${phpSwitch(lo.blur_far)},
    ],
],`;
}

// Layer visuals (absolutely positioned inside the scene; backgrounds overscan so edges never show).
function LayerArt({id}) {
  if (id === 'sky') return <div className={styles.artSky} />;
  if (id === 'sun') return <div className={styles.artSun} />;
  if (id === 'far') return (
    <svg className={styles.artFar} viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 300 L0 180 L160 90 L320 170 L470 70 L640 180 L800 100 L1000 190 L1000 300 Z" fill="#4a6a8a" />
    </svg>
  );
  if (id === 'hills') return (
    <svg className={styles.artHills} viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 300 L0 230 L200 170 L380 240 L560 160 L760 250 L1000 190 L1000 300 Z" fill="#22463f" />
    </svg>
  );
  if (id === 'card') return (
    <div className={styles.artCard}>
      <h4>Depth Layers</h4>
      <p>Move your pointer — each layer drifts by its own depth.</p>
    </div>
  );
  if (id === 'accents') return (
    <div className={styles.artAccents}>
      <span style={{left: '12%', top: '28%'}} />
      <span style={{left: '82%', top: '22%'}} />
      <span style={{left: '68%', top: '68%'}} />
      <span style={{left: '24%', top: '72%'}} />
      <span style={{left: '46%', top: '18%'}} />
    </div>
  );
  return null;
}

export default function ParallaxPlayground() {
  const [scene, setScene] = useState(SCENE_DEFAULTS);
  const [layers, setLayers] = useState(layerDefaults);
  const [sel, setSel] = useState('card');
  const [scrollPos, setScrollPos] = useState(50);
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const scrRef = useRef(0);

  const setS = (k, v) => setScene((s) => ({...s, [k]: v}));
  const setL = (k, v) => setLayers((ls) => ({...ls, [sel]: {...ls[sel], [k]: v}}));
  const lo = layers[sel];

  // Runtime — ported from parallax.js. The pointer drives mx/my (relative to the scene), and the
  // "Scroll position" slider drives `scr` in [-1,1] for the scroll / both sources.
  useEffect(() => {
    const stage = stageRef.current, scene0 = sceneRef.current;
    if (!stage || !scene0) return undefined;
    const els = Array.prototype.slice.call(scene0.querySelectorAll('[data-pl-depth]'));
    const source = scene.source;
    const intensity = scene.intensity;
    const ease = easeFrom(scene.smoothing);
    let tmx = 0, tmy = 0, mx = 0, my = 0;
    let raf = 0, cancelled = false;

    const items = els.map((el) => ({
      el,
      depth: Math.max(0, parseFloat(el.getAttribute('data-pl-depth')) || 30) / 100,
      axis: el.getAttribute('data-pl-axis') || 'both',
      dir: el.getAttribute('data-pl-dir') === 'against' ? -1 : 1,
      scale: el.getAttribute('data-pl-scale') === '1',
      blur: el.getAttribute('data-pl-blur') === '1',
    }));

    const onMove = (e) => {
      if (source === 'scroll') return;
      const r = scene0.getBoundingClientRect();
      tmx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
      tmy = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
    };
    const onLeave = () => { tmx = 0; tmy = 0; };
    stage.addEventListener('pointermove', onMove, {passive: true});
    stage.addEventListener('pointerleave', onLeave);

    const tick = () => {
      if (cancelled) return;
      mx += (tmx - mx) * ease; my += (tmy - my) * ease;
      const scr = source !== 'mouse' ? scrRef.current : 0;
      const useMx = source !== 'scroll' ? mx : 0;
      const useMy = source !== 'scroll' ? my : 0;
      for (let i = 0; i < items.length; i++) {
        const l = items[i], f = l.depth;
        const tx = l.axis !== 'y' ? useMx * f * intensity * l.dir : 0;
        const ty = l.axis !== 'x' ? (useMy * f * intensity * l.dir + scr * f * intensity) : 0;
        let t = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0)';
        if (l.scale) t += ' scale(' + (1 + f * 0.08).toFixed(3) + ')';
        l.el.style.transform = t;
        l.el.style.filter = l.blur ? 'blur(' + (f * 2.2).toFixed(2) + 'px)' : '';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelled = true; cancelAnimationFrame(raf); stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerleave', onLeave); };
  }, [scene, layers]);

  const onScroll = (v) => { setScrollPos(v); scrRef.current = (v / 100 - 0.5) * 2; };
  useEffect(() => { scrRef.current = (scrollPos / 100 - 0.5) * 2; }, []); // seed

  const php = useMemo(() => buildPhp(scene, sel, lo), [scene, sel, lo]);

  return (
    <div className={styles.playground}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div ref={stageRef} className={styles.stage}>
            <div ref={sceneRef} className={styles.scene}
              data-pl-scene={scene.source} data-pl-intensity={scene.intensity} data-pl-smooth={scene.smoothing}>
              {LAYERS.map((l) => {
                const o = layers[l.id];
                return (
                  <div key={l.id} className={`${styles.layer} ${sel === l.id ? styles.layerSel : ''}`}
                    data-pl-depth={o.depth} data-pl-axis={o.axis} data-pl-dir={o.direction}
                    data-pl-scale={o.scale_far === 'yes' ? '1' : '0'} data-pl-blur={o.blur_far === 'yes' ? '1' : '0'}>
                    <LayerArt id={l.id} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.demoBar}>
            <span className={styles.lbl}>
              {scene.source === 'mouse'
                ? 'Move your pointer over the scene — layers drift by depth.'
                : scene.source === 'scroll'
                  ? 'Drag Scroll position on the right — layers drift vertically by depth.'
                  : 'Move your pointer, and drag Scroll position on the right.'}
            </span>
          </div>

          <div className={styles.controls}>
            <h5>Scene — options</h5>
            <div className={styles.control}>
              <label>Driven by</label>
              <select className={styles.select} value={scene.source} onChange={(e) => setS('source', e.target.value)}>
                <option value="mouse">Pointer</option>
                <option value="scroll">Scroll</option>
                <option value="both">Pointer + Scroll</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Intensity (px) <span>{scene.intensity}</span></label>
              <input type="range" min="8" max="140" step="2" value={scene.intensity} onChange={(e) => setS('intensity', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Smoothing <span>{scene.smoothing}</span></label>
              <input type="range" min="0" max="100" step="5" value={scene.smoothing} onChange={(e) => setS('smoothing', Number(e.target.value))} />
            </div>

            <div className={styles.subhead}>{LAYERS.find((l) => l.id === sel).label} — layer options</div>
            <div className={styles.control}>
              <label>Depth <span>{lo.depth}</span></label>
              <input type="range" min="0" max="100" step="1" value={lo.depth} onChange={(e) => setL('depth', Number(e.target.value))} />
            </div>
            <div className={styles.control}>
              <label>Axis</label>
              <select className={styles.select} value={lo.axis} onChange={(e) => setL('axis', e.target.value)}>
                <option value="both">Both</option>
                <option value="x">Horizontal only</option>
                <option value="y">Vertical only</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Direction</label>
              <select className={styles.select} value={lo.direction} onChange={(e) => setL('direction', e.target.value)}>
                <option value="with">With the pointer</option>
                <option value="against">Against the pointer</option>
              </select>
            </div>
            <div className={styles.control}>
              <label>Scale with depth</label>
              <div className={styles.toggle}>
                <button type="button" className={lo.scale_far === 'no' ? styles.on : ''} onClick={() => setL('scale_far', 'no')}>Off</button>
                <button type="button" className={lo.scale_far === 'yes' ? styles.on : ''} onClick={() => setL('scale_far', 'yes')}>On</button>
              </div>
            </div>
            <div className={styles.control}>
              <label>Depth blur</label>
              <div className={styles.toggle}>
                <button type="button" className={lo.blur_far === 'no' ? styles.on : ''} onClick={() => setL('blur_far', 'no')}>Off</button>
                <button type="button" className={lo.blur_far === 'yes' ? styles.on : ''} onClick={() => setL('blur_far', 'yes')}>On</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            {scene.source !== 'mouse' && (
              <div className={styles.scrollBox}>
                <label className={styles.scrollLabel}>Scroll position <span>{scrollPos}%</span></label>
                <input type="range" min="0" max="100" step="1" value={scrollPos} onChange={(e) => onScroll(Number(e.target.value))} />
              </div>
            )}
            <div className={styles.sidebarTitle}>Layers</div>
            <div className={styles.tabGroup}>
              <span className={styles.tabGroupLabel}>Front → back</span>
              <div className={styles.tabPills}>
                {[...LAYERS].reverse().map((l) => (
                  <button key={l.id} type="button" className={l.id === sel ? styles.tabActive : styles.tab} onClick={() => setSel(l.id)}>
                    {l.label} <em>d{layers[l.id].depth}</em>
                  </button>
                ))}
              </div>
            </div>
            <p className={styles.tip}>Click a layer to edit its depth &amp; behaviour. The selected layer is outlined in the scene.</p>
          </div>
        </aside>
      </div>

      <div className={styles.code}>
        <div>Sample options — updates as you tweak</div>
        <pre><code>{php}</code></pre>
        <p className={styles.note}>
          Parallax is a <strong>per-element</strong> control on the <strong>Animations</strong> tab.
          Mark a container as a <strong>Scene</strong>, then give each child a <strong>Layer</strong>
          depth — they drift at different speeds from the pointer and/or scroll. One shared render loop,
          no library; skipped on touch for the pointer source, and honours reduced motion.
        </p>
      </div>
    </div>
  );
}
